import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm your AI fitness coach. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(text),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((m) => [...m, botMsg]);
    }, 1500);
  };

  const getBotResponse = (userText) => {
    const lower = userText.toLowerCase();
    if (lower.includes("workout") || lower.includes("exercise")) {
      return "I'd be happy to help with your workout! What's your fitness goal? Weight loss, muscle gain, or general fitness?";
    }
    if (
      lower.includes("diet") ||
      lower.includes("nutrition") ||
      lower.includes("food")
    ) {
      return "Nutrition is key to fitness! Are you looking for meal plans, calorie tracking, or specific dietary advice?";
    }
    if (lower.includes("progress") || lower.includes("track")) {
      return "You can track your progress in the Dashboard section. I can also help you set specific goals. What would you like to focus on?";
    }
    if (lower.includes("motivation") || lower.includes("help")) {
      return "Remember, every workout counts! Consistency is more important than intensity. You've got this! 💪 What specific support do you need?";
    }
    return `I understand you're asking about "${userText}". I'm here to help with workouts, nutrition, progress tracking, and motivation. What would you like to know more about?`;
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    "Create a workout plan",
    "Track my progress",
    "Nutrition tips",
    "Motivation boost",
  ];

  const handleQuickReply = (reply) => {
    setInput(reply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="min-h-screen flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] flex flex-col">
            {/* Chat Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col h-full overflow-hidden">
              {/* Header */}
              <header className="px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      AI Fitness Coach
                    </h2>
                    <div className="flex items-center gap-1 text-xs text-orange-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Online & Ready</span>
                    </div>
                  </div>
                </div>
                <button className="text-white hover:bg-white/20 rounded-lg px-3 py-1.5 text-sm transition-colors">
                  Clear Chat
                </button>
              </header>

              {/* Messages Area */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4 bg-gray-50"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    } animate-fadeIn`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${
                        m.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          m.sender === "user"
                            ? "bg-orange-600"
                            : "bg-gradient-to-br from-purple-500 to-blue-500"
                        }`}
                      >
                        <span className="text-white text-sm font-semibold">
                          {m.sender === "user" ? "You" : "AI"}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div className="flex flex-col">
                        <div
                          className={`${
                            m.sender === "user"
                              ? "bg-orange-600 text-white rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl"
                              : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-sm"
                          } px-4 py-3 break-words`}
                        >
                          <p className="text-sm leading-relaxed">{m.text}</p>
                        </div>
                        <span
                          className={`text-xs text-gray-400 mt-1 ${
                            m.sender === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {m.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="flex gap-3 max-w-[75%]">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500">
                        <span className="text-white text-sm font-semibold">
                          AI
                        </span>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-sm px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-6 py-3 border-t border-gray-200 bg-white">
                  <p className="text-xs text-gray-500 mb-2">
                    Quick suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-medium rounded-full border border-orange-200 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex items-end gap-3">
                  {/* Input Field */}
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="Ask me anything about fitness, nutrition, or workouts..."
                      rows="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none max-h-32"
                      style={{ minHeight: "44px" }}
                    />
                    <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                      Press Enter to send
                    </div>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="flex-shrink-0 w-10 h-10 md:w-auto md:px-6 md:h-11 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="hidden md:inline">Send</span>
                    <span className="text-lg">➤</span>
                  </button>
                </div>

                {/* Helper Text */}
                <p className="text-xs text-gray-400 mt-2 text-center">
                  AI Coach can make mistakes. Consider checking important
                  information.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
