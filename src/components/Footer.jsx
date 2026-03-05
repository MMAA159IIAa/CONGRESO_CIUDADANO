import { Link } from 'react-router-dom';
import { Landmark, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/" className="brand footer-brand-logo">
                        <Landmark size={32} />
                        <div className="brand-text">
                            <span className="brand-title">Congreso Ciudadano</span>
                            <span className="brand-subtitle">de México</span>
                        </div>
                    </Link>
                    <p className="footer-description">
                        Un espacio ciudadano organizado, independiente y legal que fortalece la democracia
                        mediante análisis técnico y vigilancia institucional.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Legales</h4>
                    <ul>
                        <li><Link to="/aviso-legal">Aviso Legal</Link></li>
                        <li><Link to="/donaciones">Donaciones</Link></li>
                        <li><Link to="/contacto">Contacto Oficial</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Comunidad</h4>
                    <ul>
                        <li><Link to="/participa">Únete al Proyecto</Link></li>
                        <li><Link to="/votaciones">Cabildo Digital</Link></li>
                        <li className="contact-item">
                            <Mail size={16} />
                            <a href="mailto:contacto@congresociudadano.mx">contacto@congresociudadano.mx</a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>
                        El Congreso Ciudadano de México es un espacio de participación libre, pacífica y apartidista, construido por ciudadanos que creen en la fuerza de la democracia y en el futuro de México.
                    </p>
                    <p className="footer-copyright">
                        &copy; {new Date().getFullYear()} Congreso Ciudadano de México. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
