import mongoose, { Schema } from "mongoose";
const bookingSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    amount: { type: Number },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
    },
    stripeSessionId: { type: String },
    paymentIntentId: { type: String },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const BookingModel =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

//   MAYBE we can add planDetails as well which includes no of tasks in each plan.
// And we could also add a field to check how many tasks user has completed for this plan.
