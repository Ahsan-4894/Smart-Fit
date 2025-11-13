import { StatusCodes } from "http-status-codes";
import { GlobalErrorHandler } from "../utils/utility.js";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
const isLoggedInAsUser = async (req, res, next) => {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const { loggedUser } = req.cookies;
    if (!loggedUser)
      return next(
        new GlobalErrorHandler("Please login first", StatusCodes.UNAUTHORIZED)
      );

    const { id } = jwt.verify(loggedUser, JWT_SECRET_KEY);
    // Check if user exists
    const user = await UserModel.findById(id);
    if (!user)
      return next(
        new GlobalErrorHandler("User not found", StatusCodes.UNAUTHORIZED)
      );

    // Check if user role is 'user'
    if (user.role !== "ROLE_USER")
      return next(
        new GlobalErrorHandler("Access denied", StatusCodes.FORBIDDEN)
      );
    const userObj = {
      id: user._id,
    };
    req.user = userObj;
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedInAsAdmin = async (req, res, next) => {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const { loggedUser } = req.cookies;
    if (!loggedUser)
      return next(
        new GlobalErrorHandler("Please login first", StatusCodes.UNAUTHORIZED)
      );

    const { id } = jwt.verify(loggedUser, JWT_SECRET_KEY);
    // Check if user exists
    const user = await UserModel.findById(id);
    if (!user)
      return next(
        new GlobalErrorHandler("User not found", StatusCodes.UNAUTHORIZED)
      );
    // Check if user role is 'admin'
    if (user.role !== "ROLE_ADMIN")
      return next(
        new GlobalErrorHandler("Access denied", StatusCodes.FORBIDDEN)
      );
    const userObj = {
      id: user._id,
    };

    req.user = userObj;
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const { loggedUser } = req.cookies;
    if (!loggedUser)
      return next(
        new GlobalErrorHandler("Please login first", StatusCodes.UNAUTHORIZED)
      );

    const { id } = jwt.verify(loggedUser, JWT_SECRET_KEY);
    // Check if user exists
    const user = await UserModel.findById(id);
    if (!user)
      return next(
        new GlobalErrorHandler("User not found", StatusCodes.UNAUTHORIZED)
      );

    const userObj = {
      id: user._id,
    };
    req.user = userObj;
    next();
  } catch (error) {
    next(error);
  }
};

export { isLoggedInAsUser, isLoggedInAsAdmin, isLoggedIn };
