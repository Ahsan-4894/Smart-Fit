import { StatusCodes } from "http-status-codes";
import AdminService from "../services/admin.service.js";

class AdminController {
  static loginAdmin = async (req, res, next) => {
    try {
      const adminCredentials = req.body;
      const admin = await AdminService.loginAdmin(adminCredentials, res);

      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Admin Login Successful",
        user: admin,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };

  static logoutAdmin = async (req, res, next) => {
    try {
      await AdminService.logoutAdmin(res);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Admin logged out successfully",
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };

  static dashboard = async (req, res, next) => {
    try {
      const dashboard = await AdminService.dashboard();
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Admin Dashboard Data Fetched Successfully",
        dashboard,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };
}

export default AdminController;
