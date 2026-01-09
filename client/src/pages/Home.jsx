import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home({ t }) {
    const features = [
        { icon: "🤖", title: "AI Powered", desc: "Advanced AI to understand your profile and needs." },
        { icon: "⚡", title: "Instant Results", desc: "Get tailored scheme recommendations in seconds." },
        { icon: "🗣️", title: "Multilingual", desc: "Full support for English and Hindi languages." }
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.3 + i * 0.1, duration: 0.5 }
        })
    };

    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            overflowY: 'auto'
        }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{ marginBottom: '4rem' }}
            >
                <div style={{ fontSize: '5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.5))' }}>
                    🏛️
                </div>

                <h1 style={{
                    fontSize: '4.5rem',
                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1
                }}>
                    {t.title}
                </h1>

                <p style={{
                    fontSize: '1.4rem',
                    color: 'var(--text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto 2.5rem auto',
                    lineHeight: 1.6
                }}>
                    {t.welcomeSub || "Unlock the benefits of government schemes with the power of AI. Simple, fast, and personalized for every citizen."}
                </p>

                <Link to="/dashboard">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="submit-btn"
                        style={{
                            fontSize: '1.3rem',
                            padding: '1.2rem 4rem',
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px'
                        }}
                    >
                        {t.btnSubmit || "Get Started 🚀"}
                    </motion.button>
                </Link>
            </motion.div>

            {/* Feature Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '1200px',
                marginTop: '1rem'
            }}>
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--border-subtle)',
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'left',
                            cursor: 'default',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{f.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
