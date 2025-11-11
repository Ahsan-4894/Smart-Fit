import express from "express";
const router = express.Router();

import ChatController from "../controllers/chat.controller.js";

router.post("/", ChatController.chat);
export default router;
