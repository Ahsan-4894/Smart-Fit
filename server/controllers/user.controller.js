import { StatusCodes } from "http-status-codes";
import UserService from "../services/user.service.js";

class UserController {
  static login = async (req, res, next) => {
    try {
      const userCredentials = req.body;
      const user = await UserService.userLogin(userCredentials, res);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Login Successful",
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };

  static register = async (req, res, next) => {
    try {
      const userDetails = req.body;
      const newUser = await UserService.registerUser(userDetails, res);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Registration Successful",
        user: newUser,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };

  static logout = async (req, res, next) => {
    try {
      await UserService.logoutUser(res);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Logout Successful",
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
      const userId = req?.user?.id;
      const dashboard = await UserService.dashboard(userId);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Dashboard Data Fetched Successfully",
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

export default UserController;
