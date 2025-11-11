import mongoose, { Schema } from "mongoose";

const planSchema = new Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    public_id: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    features: { type: [String], required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    availability: { type: String, required: true },
  },
  { timestamps: true }
);

export const PlanModel =
  mongoose.models.Plan || mongoose.model("Plan", planSchema);
