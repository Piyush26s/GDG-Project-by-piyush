import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar({ lang, setLang, t }) {
    const location = useLocation();

    const navItems = [
        { path: "/", label: lang === 'hi' ? 'घर' : 'Home', icon: '🏠' },
        { path: "/dashboard", label: lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: '🚀' },
        { path: "/history", label: lang === 'hi' ? 'इतिहास' : 'History', icon: '📜' }
    ];

    return (
        <motion.div
            className="sidebar"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="sidebar-header">
                <img
                    src="/logo.png"
                    alt="Sarkar Sahayak"
                    style={{
                        width: '180px',
                        height: 'auto',
                        filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))',
                        animation: 'logo-float 4s ease-in-out infinite'
                    }}
                />
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                        {/* Removed active-indicator to rely on cleaner background styles */}
                    </Link>
                ))}
            </nav>
            {/* Lang toggle moved to top right header */}
        </motion.div>
    );
}
