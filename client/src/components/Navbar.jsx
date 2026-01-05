import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ lang, setLang, t }) {
    const location = useLocation();

    const links = [
        { path: "/", label: "Home" }, // Helper label, actual text from props if needed or hardcoded
        { path: "/dashboard", label: "Dashboard" },
        { path: "/history", label: "History" },
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="topbar"
        >
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>{t.title}</h1>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div className="nav-links" style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>
                        {lang === 'hi' ? 'घर' : 'Home'}
                    </Link>
                    <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>
                        {lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
                    </Link>
                    <Link to="/history" className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>
                        {lang === 'hi' ? 'इतिहास' : 'History'}
                    </Link>
                </div>

                <select
                    className="lang-select"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                >
                    <option value="en">English (EN)</option>
                    <option value="hi">हिंदी (HI)</option>
                </select>
            </div>
        </motion.nav>
    );
}
