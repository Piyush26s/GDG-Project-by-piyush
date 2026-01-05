import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function History({ t }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        setHistory(saved.reverse()); // Show newest first
    }, []);

    const clearHistory = () => {
        localStorage.removeItem("searchHistory");
        setHistory([]);
    };

    return (
        <div className="panel" style={{ maxWidth: '1000px', margin: '0 auto', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>{t.langName === "हिंदी (HI)" ? "पुराना खोज इतिहास" : "Search History"}</h2>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#f87171',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear All
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                    <p>No history found. Try searching for schemes in the Dashboard!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {history.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '1.5rem'
                            }}
                        >
                            <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.date}</span>
                                <span style={{ background: 'var(--glass-highlight)', padding: '0.2rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem' }}>{item.profile}</span>
                            </div>
                            <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>"{item.query}"</h3>
                            <div className="message ai" style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.9rem' }}>
                                <ReactMarkdown>{item.summary}</ReactMarkdown>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
