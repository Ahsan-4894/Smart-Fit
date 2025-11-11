import express from "express";
const router = express.Router();
import AuthController from "../controllers/auth.controller.js";

router.get("/getCurrentLoggedInUser", AuthController.getCurrentLoggedInUser);

export default router;
