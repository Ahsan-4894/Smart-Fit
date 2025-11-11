import ChatService from "../services/chat.service.js";
import { StatusCodes } from "http-status-codes";
class ChatController {
  static chat = async (req, res, next) => {
    try {
      const { messages, userId } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ ok: false, error: "Messages array is required." });
      }

      if (!userId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ ok: false, error: "User ID is required." });
      }

      // System persona
      const systemPrompt = {
        role: "system",
        content:
          "You are SmartFit AI, a friendly wellness coach helping users with fitness goals, workout planning, and platform support. Always respond in a positive and motivational tone.",
      };
      const fullConversation = [systemPrompt, ...messages];
      const aiReply = await ChatService.getGroqResponse(fullConversation);
      const messagesToSave = [
        ...messages.filter((m) => m.role === "user"),
        { role: "bot", content: aiReply },
      ];
      await ChatService.saveChatMessages(userId, messagesToSave);

      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Chat successful",
        reply: aiReply,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };
}

export default ChatController;
