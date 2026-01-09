import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";

export default function Dashboard({ t, lang }) {
    // User details
    const [category, setCategory] = useState(""); // Interest/Scheme Category moved to top
    const [profile, setProfile] = useState("");
    const [caste, setCaste] = useState("");
    const [gender, setGender] = useState("");
    const [state, setState] = useState("");
    const [age, setAge] = useState("");
    const [income, setIncome] = useState("");

    // Dynamic Fields
    const [locationType, setLocationType] = useState("");
    const [landSize, setLandSize] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [disability, setDisability] = useState("");

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);
    const location = useLocation();

    // Mapping helper to identify category type regardless of language
    // Order in App.jsx: ["Education", "Agriculture", "Housing", "Health", "Employment", "Pension"]
    const getCategoryType = () => {
        if (!category) return "";
        const idx = t.categories.indexOf(category);
        const keys = ["education", "agriculture", "housing", "health", "employment", "pension"];
        return keys[idx] || "";
    };

    const catType = getCategoryType();

    // Check for history restoration
    useEffect(() => {
        if (location.state?.restore) {
            const { query, summary } = location.state.restore;
            setMessages([
                { role: "user", text: query },
                { role: "ai", text: summary }
            ]);
        }
    }, [location.state]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const saveToHistory = (query, response) => {
        const newEntry = {
            date: new Date().toLocaleDateString(),
            query: query,
            profile: profile || "General",
            summary: response
        };
        const existing = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        const updated = [...existing, newEntry].slice(-10);
        localStorage.setItem("searchHistory", JSON.stringify(updated));
    };

    const send = async (text) => {
        if (!text.trim()) return;

        const userMsg = { role: "user", text };
        setMessages((m) => [...m, userMsg]);
        setLoading(true);

        // Construct detailed profile string
        let profileDetails = `
- **Profile**: ${profile || "Not specified"}
- **Category (Field)**: ${category || "General"}
- **Social Category (Caste)**: ${caste || "General"}
- **Gender**: ${gender || "Not specified"}
- **State**: ${state || "Not specified"}
- **Age**: ${age || "Not specified"}
- **Income**: ${income || "Not specified"}`;

        if (catType === 'housing' || catType === 'agriculture') {
            profileDetails += `\n- **Location Type**: ${locationType || "Not specified"}`;
        }
        if (catType === 'agriculture') {
            profileDetails += `\n- **Land Holding**: ${landSize || "0"} acres`;
        }
        if (catType === 'education') {
            profileDetails += `\n- **Education Level**: ${educationLevel || "Not specified"}`;
        }
        if (catType === 'health') {
            profileDetails += `\n- **Disability**: ${disability || "None"}`;
        }

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lang,
                    query: text + `\n\nUser Details:\n${profileDetails}\n\n(Format: Markdown. Use '###' for Scheme Heading. Sections: **Description**, **Benefits**, **Eligibility**, **Apply Link**. Use bullet points.)`,
                }),
            });

            const data = await res.json();
            setMessages((m) => [...m, { role: "ai", text: data.reply }]);
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
        <div className="dashboard-container">

            {/* FORM PANEL */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="panel form-panel"
                style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}
            >
                <h2>{t.profileHeader}</h2>

                {/* 1. SCHEME CATEGORY - PRIMARY FILTER */}
                <div className="input-group" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
                    <label style={{ color: 'var(--primary)', fontWeight: 600 }}>{t.lblInterest}</label>
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

                {/* 2. PERSONAL DETAILS */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                        <label>{t.lblCaste}</label>
                        <select value={caste} onChange={(e) => setCaste(e.target.value)}>
                            <option value="">{t.selectCaste}</option>
                            {Object.keys(t.castes).map((key) => (
                                <option key={key} value={key}>{t.castes[key]}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>{t.lblGender}</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">{t.selectGender}</option>
                            {Object.keys(t.genders).map((key) => (
                                <option key={key} value={key}>{t.genders[key]}</option>
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
                </div>

                {/* 3. DYNAMIC FIELDS */}
                <AnimatePresence>
                    {/* HOUSING & AGRICULTURE: Location Type */}
                    {(catType === 'housing' || catType === 'agriculture') && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="input-group"
                            style={{ marginTop: '1rem' }}
                        >
                            <label>{t.dynamic.locationType}</label>
                            <select value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                                <option value="">Select...</option>
                                <option value="Rural">{t.dynamic.rural}</option>
                                <option value="Urban">{t.dynamic.urban}</option>
                            </select>
                        </motion.div>
                    )}

                    {/* AGRICULTURE: Land Size */}
                    {catType === 'agriculture' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="input-group"
                        >
                            <label>{t.dynamic.landSize}</label>
                            <input type="number" placeholder="e.g. 2.5" value={landSize} onChange={(e) => setLandSize(e.target.value)} />
                        </motion.div>
                    )}

                    {/* EDUCATION: Current Level */}
                    {catType === 'education' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="input-group"
                            style={{ marginTop: '1rem' }}
                        >
                            <label>{t.dynamic.educationLevel}</label>
                            <input placeholder="e.g. 10th Pass, Graduate" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} />
                        </motion.div>
                    )}

                    {/* HEALTH: Disability */}
                    {catType === 'health' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="input-group"
                            style={{ marginTop: '1rem' }}
                        >
                            <label>{t.dynamic.disability}</label>
                            <input type="number" placeholder="0 if none" value={disability} onChange={(e) => setDisability(e.target.value)} />
                        </motion.div>
                    )}
                </AnimatePresence>


                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="submit-btn"
                    onClick={handleApply}
                    style={{ marginTop: '2rem' }}
                >
                    {t.btnSubmit}
                </motion.button>
            </motion.div>

            {/* CHAT PANEL */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="panel chat-panel"
            >
                <div className="chat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>
                        {t.chatHeader.toUpperCase()}
                    </h2>
                    {messages.length > 0 && (
                        <button
                            onClick={() => setMessages([])}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-muted)',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--text-faint)'; e.target.style.color = 'var(--text-main)'; }}
                            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.color = 'var(--text-muted)'; }}
                        >
                            + New Chat
                        </button>
                    )}
                </div>

                <div className="messages-area">
                    {messages.length === 0 && (
                        <div style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "8rem" }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>⌘</div>
                            <p style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-main)' }}>{t.welcomeTitle}</p>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{t.welcomeSub}</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className="loading-dots">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Processing</span>
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
