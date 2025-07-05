import React, { useState, useRef, useEffect } from "react";
import "./ChatbotBubble.css";

const getAIResponse = async (message) => {
  try {
    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: "Bearer NMqsN8gQn2PGbaoJkz9QnTWC4O4V8xsSyGM7ZQDG", // Thay bằng key thật
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        model: "command",
        preamble:
          "Bạn là trợ lý AI chuyên về hiến máu. Luôn trả lời bằng tiếng Việt.",
        temperature: 0.7,
        max_tokens: 150,
      }),
    });
    const data = await res.json();
    return data.text || "Không có phản hồi từ AI";
  } catch {
    return "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.";
  }
};

export default function ChatbotBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Xin chào! Tôi là trợ lý AI. Bạn cần hỗ trợ gì về hiến máu?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const aiReply = await getAIResponse(input);
      setMessages((msgs) => [...msgs, { from: "ai", text: aiReply }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", text: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="chatbot-bubble"
        onClick={() => setOpen(true)}
        style={{ display: open ? "none" : "flex" }}
      >
        <span role="img" aria-label="chat">
          💬
        </span>
      </div>
      {open && (
        <div className="chatbot-popup chatbot-popup-wide">
          <div className="chatbot-header">
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                alt="AI"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#fff",
                  marginRight: 4,
                }}
              />
              Trợ lý AI
            </span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-msg chatbot-msg-${msg.from}`}
                style={
                  msg.from === "ai"
                    ? { display: "flex", alignItems: "flex-start", gap: 8 }
                    : {}
                }
              >
                {msg.from === "ai" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                    alt="AI"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#fff",
                      marginRight: 4,
                      marginTop: 2,
                    }}
                  />
                )}
                <span>{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div
                className="chatbot-msg chatbot-msg-ai"
                style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                  alt="AI"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#fff",
                    marginRight: 4,
                    marginTop: 2,
                  }}
                />
                <span>Đang trả lời...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-input-row">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
