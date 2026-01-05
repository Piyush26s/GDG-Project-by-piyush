import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function Dashboard({ t, lang }) {
    // User details
    const [profile, setProfile] = useState("");
    const [state, setState] = useState("");
    const [age, setAge] = useState("");
    const [income, setIncome] = useState("");
    const [category, setCategory] = useState("");

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const saveToHistory = (query, response) => {
        const newEntry = {
            date: new Date().toLocaleDateString(),
            query: query,
            profile: profile || "General",
            summary: response.substring(0, 300) + "..." // Store a snippet or full? Storing full for now.
        };

        // Actually let's store full response so they can read it.
        newEntry.summary = response;

        const existing = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        // Limit to last 10
        const updated = [...existing, newEntry].slice(-10);
        localStorage.setItem("searchHistory", JSON.stringify(updated));
    };

    const send = async (text) => {
        if (!text.trim()) return;

        const userMsg = { role: "user", text };
        setMessages((m) => [...m, userMsg]);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lang,
                    profile,
                    state,
                    age,
                    income,
                    category,
                    query: text,
                }),
            });

            const data = await res.json();
            setMessages((m) => [...m, { role: "ai", text: data.reply }]);

            // SAVE HISTORY
            saveToHistory(text, data.reply);

        } catch {
            setMessages((m) => [...m, { role: "ai", text: t.errServer }]);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {
        send(t.aiQuery);
    };

    return (
        <div className="main-content">

            {/* FORM PANEL */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="panel form-panel"
            >
                <h2>{t.profileHeader}</h2>

                <div className="input-group">
                    <label>{t.lblProfile}</label>
                    <select value={profile} onChange={(e) => setProfile(e.target.value)}>
                        <option value="">{t.selectProfile}</option>
                        {Object.keys(t.profiles).map((key) => (
                            <option key={key} value={key}>{t.profiles[key]}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label>{t.lblState}</label>
                    <input
                        placeholder={t.phState}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>{t.lblAge}</label>
                    <input
                        type="number"
                        placeholder={t.phAge}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>{t.lblIncome}</label>
                    <input
                        type="number"
                        placeholder={t.phIncome}
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>{t.lblInterest}</label>
                    <div className="category-grid">
                        {t.categories.map((c) => (
                            <button
                                key={c}
                                className={`category-btn ${category === c ? "active" : ""}`}
                                onClick={() => setCategory(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="submit-btn"
                    onClick={handleApply}
                >
                    {t.btnSubmit}
                </motion.button>
            </motion.div>

            {/* CHAT PANEL */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="panel chat-panel"
            >
                <div className="chat-header">
                    <h2>{t.chatHeader}</h2>
                </div>

                <div className="messages-area">
                    {messages.length === 0 && (
                        <div style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "4rem" }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>👋</h3>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t.welcomeTitle}</p>
                            <p style={{ marginTop: '0.5rem' }}>{t.welcomeSub}</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={`message ${m.role}`}
                            >
                                {m.role === "ai" ? (
                                    <ReactMarkdown>{m.text}</ReactMarkdown>
                                ) : (
                                    m.text
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="message ai"
                        >
                            <div className="loading-dots">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={bottomRef} />
                </div>

                <div className="chat-input-area">
                    <input
                        placeholder={t.phInput}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (send(input), setInput(""))}
                    />
                    <button
                        className="send-btn"
                        onClick={() => { send(input); setInput(""); }}
                        title="Send"
                    >
                        ➤
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
