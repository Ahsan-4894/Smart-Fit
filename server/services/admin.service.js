import { GlobalErrorHandler } from "../utils/utility.js";
import { UserModel } from "../models/user.model.js";
import { BookingModel } from "../models/booking.model.js";
import { PlanModel } from "../models/plan.model.js";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../utils/jwt.js";

class AdminService {
  static loginAdmin = async (adminCredentials, res) => {
    try {
      // Check wether user exists.
      const { email, password } = adminCredentials;
      const user = await UserModel.findOne({ email: email });
      if (!user)
        throw new GlobalErrorHandler(
          "Wrong credentials",
          StatusCodes.NOT_FOUND
        );

      // Check if password is same or not.
      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched)
        return new GlobalErrorHandler(
          "Wrong creentials",
          StatusCodes.NOT_FOUND
        );
      // Check if user's role is ROLE_ADMIN.
      if (user.role !== "ROLE_ADMIN")
        return new GlobalErrorHandler("Access Denied", StatusCodes.FORBIDDEN);

      //   Generate JWT Token for the user.
      const token = generateToken({ id: user._id, ttl: "2d" });

      //   Now save this token in browser's cookie.
      res.cookie("loggedUser", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });

      return {
        id: user._id,
        name: user.name,
        role: user.role,
      };
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  static logoutAdmin = async (res) => {
    res.clearCookie("loggedUser");
    return;
  };

  static dashboard = async () => {
    try {
      // Total users.
      const totalUsers = await UserModel.countDocuments({ role: "ROLE_USER" });

      // Active sessions.
      const distinctUsers = await BookingModel.distinct("user", {
        status: "paid",
      }).count();

      // Total revenue.
      const totalRevenueAgg = await BookingModel.aggregate([
        {
          $match: {
            status: "paid",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$price",
            },
          },
        },
      ]);
      const totalRevenue =
        totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

      // Weekly sales.
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Aggregate total sales per day from last 7 days
      const salesData = await BookingModel.aggregate([
        {
          $match: {
            status: "paid",
            createdAt: { $gte: oneWeekAgo },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // 1 = Sunday, 7 = Saturday
            total: { $sum: "$price" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // Prepare day mapping
      const dayMap = {
        1: "Sunday",
        2: "Monday",
        3: "Tuesday",
        4: "Wednesday",
        5: "Thursday",
        6: "Friday",
        7: "Saturday",
      };

      // Create response arrays
      const days = [];
      const sales = [];

      // Fill all 7 days
      for (let i = 1; i <= 7; i++) {
        const found = salesData.find((d) => d._id === i);
        days.push(dayMap[i]);
        sales.push(found ? found.total : 0);
      }

      // Count users for each type of the plan.
      const allSessionTypes = await PlanModel.distinct("type");
      const sessionTypes = [];
      const usersPerSessionType = [];
      for (const type of allSessionTypes) {
        // Find all plan IDs under this session type
        const plans = await PlanModel.find({ category: type }).select("_id");

        const planIds = plans.map((p) => p._id);

        // Count distinct users who booked any of these plans
        const users = await BookingModel.distinct("user", {
          plan: { $in: planIds },
          status: "paid", // only count confirmed bookings
        });
        sessionTypes.push(type);
        usersPerSessionType.push(users.length);
      }

      return {
        totalUsers,
        distinctUsers,
        totalRevenue,
        weeklySales: { days, sales },
        usersPerSessionType: { sessionTypes, usersPerSessionType },
      };
    } catch (err) {
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default AdminService;
