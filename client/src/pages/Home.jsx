import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home({ t }) {
    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{
                    fontSize: '4rem',
                    background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                    fontWeight: 800
                }}>
                    {t.title}
                </h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                    {t.welcomeSub || "Access government schemes easily with AI assistance. Simplifed for every citizen."}
                </p>

                <Link to="/dashboard">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="submit-btn"
                        style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
                    >
                        {t.btnSubmit || "Get Started 🚀"}
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
