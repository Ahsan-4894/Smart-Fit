import { StatusCodes } from "http-status-codes";
import StripeService from "../services/stripe.service.js";
import { stripe } from "../configuration/stripeConfiguration.js";

class StripeController {
  static async createCheckoutSession(req, res, next) {
    try {
      const userId = req.user.id;
      const { planId, userDetails } = req.body;

      if (!planId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          ok: false,
          message: "Plan ID is required",
        });
      }

      if (!userDetails) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          ok: false,
          message: "User details are required",
        });
      }

      const result = await StripeService.createCheckoutSession(
        userId,
        planId,
        userDetails
      );

      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Checkout session created successfully",
        result,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  }

  static async handleWebhook(req, res, next) {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(`Webhook Error: ${err.message}`);
    }

    try {
      await StripeService.handleWebhook(event);
      res.json({ received: true });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  }

  static async verifyPayment(req, res, next) {
    try {
      const { sessionId } = req.query;

      if (!sessionId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          ok: false,
          message: "Session ID is required",
        });
      }

      const result = await StripeService.verifySession(sessionId);

      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Payment verified successfully",
        result,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  }
}
export default StripeController;
