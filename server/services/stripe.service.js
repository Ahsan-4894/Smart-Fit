import { stripe } from "../configuration/stripeConfiguration.js";
import { BookingModel } from "../models/booking.model.js";
import { PlanModel } from "../models/plan.model.js";
import { UserModel } from "../models/user.model.js";
import { GlobalErrorHandler } from "../utils/utility.js";
import { StatusCodes } from "http-status-codes";
class StripeService {
  static createCheckoutSession = async (userId, planId, userDetails) => {
    try {
      // Fetch plan details
      const plan = await PlanModel.findById(planId);
      if (!plan)
        throw new GlobalErrorHandler("Plan not found", StatusCodes.NOT_FOUND);

      // Fetch user details
      const user = await UserModel.findById(userId);
      if (!user)
        throw new GlobalErrorHandler("User not found", StatusCodes.NOT_FOUND);
      // Check if user has already paid for this plan
      const existingBooking = await BookingModel.findOne({
        user: userId,
        plan: planId,
        status: "paid",
      });
      if (existingBooking)
        throw new GlobalErrorHandler(
          "You are already enrolled in this plan",
          StatusCodes.BAD_REQUEST
        );
      // Create a pending booking
      const booking = await BookingModel.create({
        user: userId,
        plan: planId,
        amount: plan.price,
        status: "pending",
        stripeSessionId: "", // Will update after session creation
        paymentIntentId: "", // Will update after payment
      });

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: plan.title,
                description: plan.description,
                images: [plan.image], // Stripe supports image URLs
              },
              unit_amount: Math.round(plan.price * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
        metadata: {
          bookingId: booking._id.toString(),
          userId: userId.toString(),
          planId: planId.toString(),
          userName: userDetails.name,
          userEmail: userDetails.email,
          userPhone: userDetails.phone,
        },
        customer_email: userDetails.email,
      });

      // Update booking with session ID
      booking.stripeSessionId = session.id;
      await booking.save();

      return {
        sessionId: session.id,
        sessionUrl: session.url,
        bookingId: booking._id,
      };
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  static handleWebhook = async (event) => {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;

          // Update booking status to paid
          const booking = await BookingModel.findOne({
            stripeSessionId: session.id,
          });

          if (booking) {
            booking.status = "paid";
            booking.paymentIntentId = session.payment_intent;
            await booking.save();
          }
          break;

        case "checkout.session.expired":
          const expiredSession = event.data.object;

          // Update booking status to failed
          const expiredBooking = await BookingModel.findOne({
            stripeSessionId: expiredSession.id,
          });

          if (expiredBooking) {
            expiredBooking.status = "failed";
            await expiredBooking.save();
          }
          break;

        case "payment_intent.payment_failed":
          const failedPayment = event.data.object;

          // Handle failed payment
          const failedBooking = await BookingModel.findOne({
            paymentIntentId: failedPayment.id,
          });

          if (failedBooking) {
            failedBooking.status = "failed";
            await failedBooking.save();
          }
          break;

        default:
          throw new GlobalErrorHandler(
            `Unhandled event type: ${event.type}`,
            StatusCodes.BAD_REQUEST
          );
      }

      return { received: true };
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  static verifySession = async (sessionId) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const booking = await BookingModel.findOne({
        stripeSessionId: sessionId,
      }).populate("plan");
      if (!booking)
        throw new GlobalErrorHandler(
          "Booking not found",
          StatusCodes.NOT_FOUND
        );

      return {
        session,
        booking,
      };
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}
export default StripeService;
