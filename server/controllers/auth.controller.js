import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service.js";
class AuthController {
  static getCurrentLoggedInUser = async (req, res, next) => {
    try {
      const user = await AuthService.getCurrentLoggedInUser(req);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Current logged in user",
        user,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };
}

export default AuthController;
