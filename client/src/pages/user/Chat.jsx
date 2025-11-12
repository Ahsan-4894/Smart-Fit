import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import { chat } from "../../api/chat";
import toast from "react-hot-toast";

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
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

  const sendMessage = async () => {
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

    try {
      const formattedMessages = messages.map((msg) => ({
        role: msg.sender === "bot" ? "assistant" : msg.sender, // replace bot → assistant
        content: msg.text,
      }));

      // include current user message
      formattedMessages.push({ role: "user", content: text });

      const payload = {
        userId: user?.id,
        messages: formattedMessages,
      };

      const data = await chat(payload);
      console.log(data);
      if (data?.ok) {
        const botMsg = {
          id: Date.now() + 1,
          sender: "bot",
          text: data?.reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((m) => [...m, botMsg]);
      } else {
        toast.error(data?.message || "Failed to get reply");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error — please try again later.");
    } finally {
      setIsTyping(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
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
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: 1,
                        sender: "bot",
                        text: "Hello! I'm your AI fitness coach. How can I help you today?",
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      },
                    ])
                  }
                  className="text-white hover:bg-white/20 rounded-lg px-3 py-1.5 text-sm transition-colors"
                >
                  Clear Chat
                </button>
              </header>

              {/* Messages */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4 bg-gray-50"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] ${
                        m.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
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

                {isTyping && (
                  <div className="flex justify-start">
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

              {/* Input */}
              <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="Ask me anything about fitness, nutrition, or workouts..."
                      rows="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none max-h-32"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="flex-shrink-0 w-10 h-10 md:px-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span className="hidden md:inline">Send</span>
                    <span className="text-lg">➤</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
