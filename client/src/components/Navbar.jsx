import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ lang, setLang, t }) {
    const location = useLocation();

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="topbar"
        >
            <div className="logo">
                <Link to="/">
                    <h1>{t.title}</h1>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div className="nav-links" style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
                    {[
                        { path: "/", label: lang === 'hi' ? 'घर' : 'Home' },
                        { path: "/dashboard", label: lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard' },
                        { path: "/history", label: lang === 'hi' ? 'इतिहास' : 'History' }
                    ].map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)',
                                textDecoration: 'none',
                                fontWeight: location.pathname === link.path ? 700 : 500,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'color 0.3s'
                            }}
                        >
                            {link.label}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    style={{
                                        width: '100%',
                                        height: '3px',
                                        background: 'var(--primary)',
                                        borderRadius: '10px',
                                        position: 'absolute',
                                        bottom: '-5px',
                                        boxShadow: '0 0 10px var(--primary)'
                                    }}
                                />
                            )}
                        </Link>
                    ))}
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
