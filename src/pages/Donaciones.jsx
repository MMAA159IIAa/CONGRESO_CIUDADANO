import { Heart, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';
import './Pages.css';

const Donaciones = () => {
    return (
        <div className="page donations-page">
            <section className="section-dark" style={{ padding: '5rem 0', textAlign: 'center', background: 'linear-gradient(rgba(6, 17, 37, 0.9), rgba(6, 17, 37, 0.9)), url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80") center/cover' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Apoya el Futuro de México</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.6 }}>
                        El Congreso Ciudadano es una iniciativa independiente. No recibimos fondos públicos ni de partidos políticos. Tu apoyo garantiza nuestra autonomía y rigor técnico.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="intro-text" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem' }}>¿Por qué donar?</h2>
                        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-accent)', margin: '1.5rem auto' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--color-white)', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                            <ShieldCheck size={40} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                            <div>
                                <h4 style={{ marginBottom: '0.5rem' }}>Independencia Total</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Para auditar al poder, debemos estar fuera de su alcance financiero.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--color-white)', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                            <TrendingUp size={40} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                            <div>
                                <h4 style={{ marginBottom: '0.5rem' }}>Rigor Metodológico</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Tus donaciones financian análisis técnicos y plataformas de transparencia.</p>
                            </div>
                        </div>
                    </div>

                    {/* Donation Options */}
                    <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '16px', padding: '3.5rem', textAlign: 'center', boxShadow: '0 20px 40px rgba(10, 28, 62, 0.2)' }}>
                        <Heart size={48} color="#FF6B6B" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Suma tu esfuerzo</h2>
                        <p style={{ opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.1rem' }}>Toda aportación, por pequeña que sea, fortalece la voz del ciudadano.</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <a
                                href="https://paypal.me/CONGRESOCIUDADANO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ backgroundColor: '#0070BA', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', minWidth: '200px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                Apoyar vía PayPal
                            </a>
                            <a
                                href="https://buy.stripe.com/test_aFa8wR3GjcS3g0yfwP3cc00"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ backgroundColor: '#6772E5', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', minWidth: '200px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                Donar con Tarjeta
                            </a>
                        </div>
                        <p style={{ marginTop: '2rem', fontSize: '0.85rem', opacity: 0.7 }}>
                            🔐 Todas las transacciones son seguras y cifradas. Al ser una iniciativa en crecimiento, <br />estamos en proceso de obtener deducibilidad fiscal completa.
                        </p>
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2.5rem', border: '2px dashed var(--color-border)', borderRadius: '12px' }}>
                        <Handshake size={32} color="var(--color-text-light)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ marginBottom: '0.5rem' }}>Transparencia Proactiva</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                            Publicaremos un informe semestral de ingresos y aplicación de fondos en el panel de transparencia del Congreso Ciudadano.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Donaciones;
