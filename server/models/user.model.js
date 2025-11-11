import mongoose, { Schema } from "mongoose";
import argon2 from "argon2";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ROLE_USER", "ROLE_ADMIN"],
    },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashed = await argon2.hash(this.password);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (err) {
    return false;
  }
};

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
