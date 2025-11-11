import { StatusCodes } from "http-status-codes";
import { GlobalErrorHandler } from "../utils/utility.js";
import { generateToken } from "../utils/jwt.js";
import { UserModel } from "../models/user.model.js";

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
          "Wrong creentials",
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
}

export default UserService;
