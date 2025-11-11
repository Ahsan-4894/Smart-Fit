import { StatusCodes } from "http-status-codes";
import { GlobalErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
class AuthService {
  static getCurrentLoggedInUser = async (req) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const { loggedUser } = req.cookies;
    if (!loggedUser)
      throw new GlobalErrorHandler("Access Denied", StatusCodes.UNAUTHORIZED);
    const { id } = jwt.verify(loggedUser, JWT_SECRET_KEY);

    // Now check in db wether any user exists corresponding to this id
    const user = await UserModel.findById(id);
    if (!user)
      throw new GlobalErrorHandler("Access Denied", StatusCodes.UNAUTHORIZED);

    return {
      id: user._id,
      name: user.name,
      role: user.role,
    };
  };
}

export default AuthService;
