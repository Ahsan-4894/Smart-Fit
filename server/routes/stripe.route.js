import express from "express";
const router = express.Router();

import StripeController from "../controllers/stripe.controller.js";
import { isLoggedInAsUser } from "../middlewares/auth.middleware.js";

// Webhook endpoint (NO AUTH - Stripe calls this)
router.post(
  "/webhookHandler",
  express.raw({ type: "application/json" }),
  StripeController.handleWebhook
);

router.use(isLoggedInAsUser);
router.post("/create-checkout-session", StripeController.createCheckoutSession);
router.get("/verify-payment", StripeController.verifyPayment);

export default router;
