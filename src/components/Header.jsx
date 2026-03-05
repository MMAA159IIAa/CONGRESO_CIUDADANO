import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Landmark, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Quiénes Somos', path: '/quienes-somos' },
    { name: 'Cómo Funciona', path: '/como-funciona' },
    { name: 'Cabildo Digital', path: '/cabildo-digital' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        console.log('[Header] Solicitando Logout...');
        closeMenu();
        logout(); // Logout en AuthContext hará el redirect duro
    };

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="brand" onClick={closeMenu}>
                    <img src="/logo.png" alt="Logo Congreso Ciudadano" style={{ height: '48px', width: 'auto', marginRight: '12px', objectFit: 'contain' }} />
                    <div className="brand-text">
                        <span className="brand-title">Congreso Ciudadano</span>
                        <span className="brand-subtitle">de México</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <ul className="nav-list" style={{ alignItems: 'center' }}>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="nav-link">
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/miembro" className="btn btn-primary nav-btn" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <UserCircle size={18} /> Mi Panel
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                                        Salir
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="nav-link" style={{ fontWeight: 600 }}>
                                        Ingresar
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/participa" className="btn btn-primary nav-btn" style={{ padding: '0.5rem 1rem' }}>
                                        Únete
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="mobile-nav">
                    <ul className="mobile-nav-list">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="mobile-nav-link" onClick={closeMenu}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        <li style={{ padding: '1rem', borderTop: '1px solid var(--color-border-light)' }}>
                            {isAuthenticated ? (
                                <>
                                    <div style={{ marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                                        Hola, {user?.name}
                                    </div>
                                    <Link to="/miembro" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} onClick={closeMenu}>
                                        Mi Panel de Miembro
                                    </Link>
                                    <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%' }}>
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-outline" style={{ width: '100%', marginBottom: '1rem' }} onClick={closeMenu}>
                                        Iniciar Sesión
                                    </Link>
                                    <Link to="/participa" className="btn btn-primary" style={{ width: '100%' }} onClick={closeMenu}>
                                        Únete al Congreso
                                    </Link>
                                </>
                            )}
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
