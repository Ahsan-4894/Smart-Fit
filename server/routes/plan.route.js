import express from "express";
import PlanController from "../controllers/plan.controller.js";
const router = express.Router();
import { validateIncomingRequest } from "../middlewares/requestValidation.middleware.js";
import { uploadSingleAvatar } from "../middlewares/multer.middleware.js";
import { addPlanDto } from "../dto/plan.dto.js";
import {
  isLoggedIn,
  isLoggedInAsAdmin,
} from "../middlewares/auth.middleware.js";

// Only authenticated subject can acaces these routes.
router.use(isLoggedIn);
router.get("/getPlans", PlanController.getAllPlans);

// Only User Routes.

// Only Admin Routes.
router.use(isLoggedInAsAdmin);
router.post(
  "/addplan",
  uploadSingleAvatar,
  validateIncomingRequest(addPlanDto),
  PlanController.addPlan
);
router.put("/editplan", PlanController.editPlan);
export default router;
