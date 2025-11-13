import { StatusCodes } from "http-status-codes";
import { GlobalErrorHandler } from "../utils/utility.js";
import { generateToken } from "../utils/jwt.js";
import { UserModel } from "../models/user.model.js";
import { BookingModel } from "../models/booking.model.js";
import mongoose from "mongoose";

class UserService {
  static userLogin = async (userCredentials, res) => {
    try {
      // Check wether user exists.
      const { email, password } = userCredentials;
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
          "Wrong credentials",
          StatusCodes.NOT_FOUND
        );
      // Check if user's role is ROLE_USER.
      if (user.role !== "ROLE_USER")
        return new GlobalErrorHandler("Access Denied", StatusCodes.FORBIDDEN);

      //   Generate JWT Token for the user.
      const token = generateToken({ id: user._id, ttl: "2d" });

      //   Now save this token in browser's cookie.
      res.cookie("loggedUser", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: "None", // allow cross-site cookie
        secure: true,
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

  static registerUser = async (userDetails, res) => {
    try {
      // Check if user already exists.
      const { email, name, password, age, gender, height, weight } =
        userDetails;

      const isUserExists = await UserModel.findOne({ where: { email: email } });
      if (isUserExists)
        throw new GlobalErrorHandler(
          "User already exists",
          StatusCodes.CONFLICT
        );
      // Create new user.
      const newUser = await UserModel.create({
        name,
        email,
        password,
        age,
        gender,
        height,
        weight,
        role: "ROLE_USER",
      });
      await newUser.save();

      //   Set JWT in browser's cookie.
      const token = generateToken({ id: newUser._id, ttl: "2d" });
      res.cookie("loggedUser", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: "None", // allow cross-site cookie
        secure: true,
      });

      return {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      };
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  static logoutUser = async (res) => {
    res.clearCookie("loggedUser");
    return;
  };

  static dashboard = async (userId) => {
    try {
      const enrolledPrograms = await BookingModel.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            status: "paid",
          },
        },
        {
          $lookup: {
            from: "plans",
            localField: "plan",
            foreignField: "_id",
            as: "planDetails",
          },
        },
        {
          $unwind: "$planDetails",
        },
      ]);

      // Count of enrolled programs
      const enrolledCount = enrolledPrograms.length;

      // Calculate total hours trained
      let totalMinutes = 0;
      enrolledPrograms.forEach((booking) => {
        const duration = booking.planDetails.duration.toLowerCase();
        const match = duration.match(/(\d+\.?\d*)\s*(hour|hr|minute|min)/i);
        if (match) {
          const value = parseFloat(match[1]);
          const unit = match[2];
          if (unit.includes("hour") || unit.includes("hr")) {
            totalMinutes += value * 60;
          } else {
            totalMinutes += value;
          }
        }
      });
      const totalHours = (totalMinutes / 60).toFixed(1);

      // Next session timing (from most recent booking)
      const nextSession =
        enrolledPrograms.length > 0
          ? enrolledPrograms[0].planDetails.availability
          : "No upcoming sessions";

      // All enrolled programs
      const allEnrolledPrograms = enrolledPrograms.map((booking) => ({
        id: booking._id,
        planId: booking.planDetails._id,
        title: booking.planDetails.title,
        type: booking.planDetails.type,
        imageUrl: booking.planDetails.image,
        difficulty: booking.planDetails.difficulty,
        duration: booking.planDetails.duration,
        price: booking.planDetails.price,
        features: booking.planDetails.features,
        availability: booking.planDetails.availability,
        bookingDate: booking.bookingDate,
        progress: 0, // will figure this out later.
        completedSessions: 0, // will figure this out later.
      }));

      // Average duration
      const avgDurationMinutes =
        enrolledCount > 0 ? totalMinutes / enrolledCount : 0;
      const avgDuration = `${Math.round(avgDurationMinutes)} min`;

      // Goal progress [completed, left]
      const completedPrograms = 0; // TODO: Add completion tracking
      const leftPrograms = enrolledCount - completedPrograms;
      const goalProgress = [completedPrograms, leftPrograms];

      return {
        enrolledCount,
        totalHours,
        nextSession,
        allEnrolledPrograms,
        totalProgramsCount: enrolledCount,
        avgDuration,
        goalProgress,
      };
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default UserService;
