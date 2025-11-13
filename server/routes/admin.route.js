import express from "express";
const router = express.Router();

import AdminController from "../controllers/admin.controller.js";
import { validateIncomingRequest } from "../middlewares/requestValidation.middleware.js";
import { adminLoginDto } from "../dto/admin.dtos.js";
import { isLoggedInAsAdmin } from "../middlewares/auth.middleware.js";

router.post(
  "/login",
  validateIncomingRequest(adminLoginDto),
  AdminController.loginAdmin
);

router.use(isLoggedInAsAdmin);
router.post("/logout", AdminController.logoutAdmin);
router.get("/dashboard", AdminController.dashboard);
export default router;
