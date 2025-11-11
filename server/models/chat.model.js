import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["user", "bot"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const ChatModel =
  mongoose.models.Chat || mongoose.model("Chat", chatSchema);
