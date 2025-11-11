import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    address: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    profileImage: { type: String, required: false },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
