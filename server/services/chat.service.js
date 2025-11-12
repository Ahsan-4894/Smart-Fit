import axios from "axios";
import { ChatModel } from "../models/chat.model.js";
import { GlobalErrorHandler } from "../utils/utility.js";
import { StatusCodes } from "http-status-codes";

class ChatService {
  static getGroqResponse = async (messages) => {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          messages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
        }
      );

      return (
        response.data.choices[0]?.message?.content ||
        "Sorry, I couldn't understand that."
      );
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  static saveChatMessages = async (userId, messages) => {
    try {
      const docs = messages.map((msg) => ({
        user: userId,
        role: msg.role,
        message: msg.content,
      }));

      await ChatModel.insertMany(docs);
    } catch (error) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default ChatService;
