import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Search, Users, Landmark } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './Home.css';

const Home = () => {
    const [citizenCount, setCitizenCount] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');

    const quotes = [
        "El verdadero poder de una nación vive en sus ciudadanos.",
        "Un pueblo informado es un pueblo libre.",
        "Cuando los ciudadanos participan, la democracia se fortalece.",
        "El futuro de México se construye con la voz de su gente."
    ];
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        // Fetch citizen count limit temporarily relying on local storage
        const count = parseInt(localStorage.getItem('cc_citizen_count') || '14285', 10);
        setCitizenCount(count);

        // Fetch the video URL from settings table
        const fetchSettings = async () => {
            const { data } = await supabase.from('platform_settings').select('value').eq('key', 'home_video_url').single();
            if (data) {
                setVideoUrl(data.value);
            }
        };
        fetchSettings();

        // Rotate Quotes
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);

        // Scroll Reveal Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);

    // Func to parse normal youtube URLs to embed format automatically
    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/');
        }
        if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'youtube.com/embed/');
        }
        return url;
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero section-dark">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Congreso Ciudadano <br />de México</h1>
                        <h2 className="hero-subtitle">Participación real. Vigilancia democrática. Propuestas con fundamento.</h2>
                        <p className="hero-text">
                            "Un espacio ciudadano organizado, independiente y legal que fortalece la democracia
                            mediante análisis técnico, participación estructurada y vigilancia institucional."
                        </p>
                        <div className="hero-actions">
                            <Link to="/participa" className="btn btn-primary hero-btn">
                                Únete al Congreso Ciudadano
                            </Link>
                            <Link to="/iniciativas" className="btn btn-outline hero-btn hero-btn-outline">
                                Presentar Iniciativa Ciudadana
                            </Link>
                            <Link to="/quienes-somos" className="btn btn-outline hero-btn hero-btn-outline">
                                Conoce el Proyecto
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manifiesto Ciudadano Section */}
            <section className="manifiesto-section">
                <div className="manifiesto-ornament"></div>
                <div className="container">
                    <h2 className="manifiesto-title">MANIFIESTO CIUDADANO</h2>
                    <div className="manifiesto-text">
                        <p className="strong-opening">El futuro de México no pertenece a unos cuantos.<br />Pertenece a todos.</p>
                        <p>Durante generaciones, los mexicanos han construido esta nación con trabajo, dignidad y esperanza.</p>
                        <p>El Congreso Ciudadano de México nace como un espacio donde la voz de cada ciudadano puede ser escuchada, donde las ideas se transforman en propuestas y donde la participación se convierte en fuerza democrática.</p>
                        <p>No somos un partido.<br />No somos una institución de poder.</p>
                        <p className="manifiesto-identity">Somos ciudadanos organizados.</p>
                        <p>Creemos en un México donde la ley se respeta, donde el gobierno escucha y donde la participación ciudadana fortalece la democracia.</p>
                        <p>México no es solo su historia.</p>
                        <p>México es su gente.</p>
                        <p className="manifiesto-highlight">Y cuando su gente participa, la nación avanza.</p>
                    </div>
                </div>
            </section>

            {/* Video Admin Section */}
            {videoUrl && (
                <section className="video-section section" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-primary-dark)' }}>Mensaje a la Nación</h2>
                        <div className="video-wrapper" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', borderRadius: '12px', boxShadow: 'var(--shadow-xl)' }}>
                            <iframe
                                src={getEmbedUrl(videoUrl)}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Mensaje Oficial"
                            ></iframe>
                        </div>
                    </div>
                </section>
            )}

            {/* ¿Por qué nace? Section */}
            <section className="why-section section reveal">
                <div className="container">
                    <div className="why-content">
                        <h2>¿Por qué nace?</h2>
                        <p className="lead-text">
                            México necesita participación ciudadana organizada, técnica y responsable.
                        </p>
                        <p>
                            El Congreso Ciudadano de México surge como un mecanismo de vigilancia democrática
                            y propuesta institucional que fortalece el Estado de Derecho mediante herramientas
                            constitucionales existentes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Live Counter Section */}
            <section className="counter-section reveal">
                <div className="container">
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
                        <Users size={40} color="var(--color-accent)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>Ciudadanos Registrados</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <span className="live-dot" style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff4b2b', boxShadow: '0 0 10px #ff4b2b' }}></span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)', letterSpacing: '1px' }}>CONTEO EN VIVO</span>
                    </div>
                    <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem' }}>Fuerza ciudadana verificada respaldando nuestras iniciativas estructuradas a nivel nacional.</p>


                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '4rem', fontWeight: 800, fontFamily: 'monospace', lineHeight: 1, flexWrap: 'wrap' }}>
                        {citizenCount.toString().padStart(6, '0').split('').map((digit, i) => (
                            <span key={i} className="counter-digit">
                                {digit}
                            </span>
                        ))}
                    </div>
                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/participa" className="btn btn-primary" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-primary)', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                            Sumar mi Voz por México
                        </Link>
                        <Link to="/votaciones" className="btn btn-outline" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                            Ver Iniciativas en Discusión
                        </Link>
                    </div>
                </div>
            </section>

            {/* El Poder de México (Quotes) - New Section */}
            <section className="quotes-section reveal">
                <div className="quotes-overlay"></div>
                <div className="container quotes-container">
                    <h2 className="quotes-title">El poder de México</h2>
                    <div className="quote-wrapper">
                        {quotes.map((quote, index) => (
                            <p
                                key={index}
                                className={`quote-text ${currentQuote === index ? 'active' : ''}`}
                            >
                                "{quote}"
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nuestros Ejes Section */}
            <section className="axes-section section section-gray reveal">
                <div className="container">
                    <h2 className="section-title text-center">Nuestros Ejes</h2>
                    <div className="axes-grid">

                        <div className="axis-card reveal-delay-1">
                            <div className="axis-icon-wrapper">
                                <Landmark className="axis-icon" size={32} />
                            </div>
                            <h3>Vigilancia Legislativa</h3>
                            <p>Seguimiento técnico y evaluación objetiva del trabajo legislativo federal y local.</p>
                        </div>

                        <div className="axis-card reveal-delay-2">
                            <div className="axis-icon-wrapper">
                                <FileText className="axis-icon" size={32} />
                            </div>
                            <h3>Iniciativa Ciudadana</h3>
                            <p>Formulación y respaldo de propuestas de ley construidas con rigor metodológico.</p>
                        </div>

                        <div className="axis-card reveal-delay-3">
                            <div className="axis-icon-wrapper">
                                <Search className="axis-icon" size={32} />
                            </div>
                            <h3>Observatorio Anticorrupción</h3>
                            <p>Análisis documental y técnico de procesos públicos basado en transparencia.</p>
                        </div>

                        <div className="axis-card">
                            <div className="axis-icon-wrapper">
                                <Users className="axis-icon" size={32} />
                            </div>
                            <h3>Cabildo Digital</h3>
                            <p>Plataforma para la participación estructurada y la toma de decisiones ciudadanas.</p>
                        </div>

                        <div className="axis-card">
                            <div className="axis-icon-wrapper">
                                <ShieldCheck className="axis-icon" size={32} />
                            </div>
                            <h3>Transparencia Pública</h3>
                            <p>Promoción activa de la rendición de cuentas en todos los niveles de gobierno.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section - New */}
            <section className="cta-section reveal">
                <div className="container text-center">
                    <h2 className="cta-title">Este es tu momento de participar</h2>
                    <p className="cta-text">
                        El Congreso Ciudadano de México abre sus puertas a todos los ciudadanos que creen en la participación, la transparencia y el futuro democrático del país.
                    </p>
                    <div className="cta-highlight-box">
                        <p>Cada voz cuenta.</p>
                        <p>Cada propuesta importa.</p>
                        <p>Cada ciudadano puede marcar la diferencia.</p>
                    </div>
                    <div className="cta-buttons">
                        <Link to="/participa" className="btn btn-primary cta-btn">Unirme al Congreso Ciudadano</Link>
                        <Link to="/iniciativas" className="btn btn-outline cta-btn">Presentar Iniciativa Ciudadana</Link>
                        <Link to="/votaciones" className="btn btn-outline cta-btn">Explorar el Cabildo Digital</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
