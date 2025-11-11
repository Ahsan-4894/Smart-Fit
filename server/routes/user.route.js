import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";
import { validateIncomingRequest } from "../middlewares/requestValidation.middleware.js";
import { userLoginDto, userSignupDto } from "../dto/user.dtos.js";
import { isLoggedInAsUser } from "../middlewares/auth.middleware.js";

// Public Routes
router.post(
  "/login",
  validateIncomingRequest(userLoginDto),
  UserController.login
);
router.post(
  "/register",
  validateIncomingRequest(userSignupDto),
  UserController.register
);

// Protected Routes
router.use(isLoggedInAsUser);
router.post("/logout", UserController.logout);

export default router;
