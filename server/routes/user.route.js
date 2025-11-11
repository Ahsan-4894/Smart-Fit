import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";
import { validateIncomingRequest } from "../middlewares/requestValidation.middleware.js";
import { userLoginDto, userSignupDto } from "../dto/user.dtos.js";

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
router.post("/logout", UserController.logout);

export default router;
