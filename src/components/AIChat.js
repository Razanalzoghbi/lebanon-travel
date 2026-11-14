import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { API } from "../auth";

const WELCOME = {
  role: "assistant",
  content:
    "Hi! I am your Lebanon travel assistant. Ask me about places to visit, restaurants, cafes, hotels, or a trip plan. You can write in English or Arabic.",
};

const QUICK = [
  "Plan 3 days in Lebanon",
  "Best restaurants in Beirut",
  "A beach near Tyre",
  "Where can I go for snow?",
];

function AIChat() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  // the dashboards do not need the assistant
  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/owner")) return null;

  const send = async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages([...next, { role: "assistant", content: data.message || "Something went wrong." }]);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply, places: data.places }]);
      }
    } catch (err) {
      setMessages([...next, { role: "assistant", content: "I cannot reach the server. Is the backend running?" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div
          className="shadow-lg bg-white d-flex flex-column"
          style={{
            position: "fixed",
            right: 24,
            bottom: 92,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(520px, calc(100vh - 130px))",
            borderRadius: 18,
            overflow: "hidden",
            zIndex: 1050,
          }}
        >
          <div className="d-flex justify-content-between align-items-center text-white px-3 py-2" style={{ background: "#1c4f8f" }}>
            <div>
              <strong>Lebanon Travel AI</strong>
              <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>Ask me about your trip</div>
            </div>
            <button className="btn btn-sm text-white" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="flex-grow-1 p-3" style={{ overflowY: "auto", background: "#f4f6f9" }}>
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 d-flex ${m.role === "user" ? "justify-content-end" : "justify-content-start"}`}>
                <div style={{ maxWidth: "85%" }}>
                  <div
                    className="px-3 py-2"
                    style={{
                      borderRadius: 16,
                      whiteSpace: "pre-wrap",
                      fontSize: "0.92rem",
                      background: m.role === "user" ? "#1f7fc9" : "#ffffff",
                      color: m.role === "user" ? "#fff" : "#222",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                  >
                    {m.content}
                  </div>
                  {m.places && m.places.length > 0 && (
                    <div className="mt-2 d-flex flex-wrap gap-1">
                      {m.places.map((p) => (
                        <Link
                          key={p.id}
                          to={`/places/${p.id}`}
                          onClick={() => setOpen(false)}
                          className="badge rounded-pill text-decoration-none"
                          style={{ background: "#e3f1fb", color: "#1f5f95", fontWeight: 500 }}
                        >
                          📍 {p.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="d-flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button key={q} className="btn btn-sm btn-outline-primary rounded-pill" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && <div className="text-muted small">Thinking...</div>}
            <div ref={bottomRef} />
          </div>

          <form
            className="d-flex gap-2 p-2 border-top"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              className="form-control rounded-pill"
              placeholder="Type your question..."
              value={input}
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary rounded-pill px-3" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Open AI assistant"
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "none",
          background: "#1c4f8f",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.1rem",
          boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
          zIndex: 1050,
        }}
      >
        {open ? "✕" : "AI"}
      </button>
    </>
  );
}

export default AIChat;