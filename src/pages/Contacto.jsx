import { useState } from 'react';
import { Mail, Send, CheckCircle, Info } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './Pages.css';

const Contacto = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const { error: insertError } = await supabase
                .from('contact_messages')
                .insert([formData]);

            if (insertError) throw insertError;

            setSent(true);
        } catch (err) {
            console.error('[Contacto] Error al enviar:', err);
            setError('Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page contact-page">
            <section className="section-dark" style={{ padding: '4rem 0', textAlign: 'center', background: 'linear-gradient(rgba(10, 28, 62, 0.9), rgba(10, 28, 62, 0.9)), url("https://images.unsplash.com/photo-1555848962-6e79363ec18f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80") center/cover' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '1rem' }}>Contacto Directo</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Tus inquietudes, propuestas y comentarios son la base de este Congreso. Escríbenos y nuestro equipo te responderá a la brevedad.
                    </p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'var(--color-background)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

                    {/* Info Column */}
                    <div className="contact-info">
                        <div style={{ backgroundColor: 'var(--color-white)', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', borderTop: '4px solid var(--color-accent)' }}>
                            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Canales Oficiales</h2>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ minWidth: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: 'rgba(49, 130, 206, 0.1)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Correo Institucional</h4>
                                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 0 }}>contacto@congresociudadano.mx</p>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#EBF8FF', padding: '1.5rem', borderRadius: '8px', display: 'flex', gap: '1rem', border: '1px solid #BEE3F8' }}>
                                <Info size={20} color="#3182CE" style={{ flexShrink: 0 }} />
                                <p style={{ fontSize: '0.9rem', color: '#2C5282', margin: 0 }}>
                                    <strong>Atención Ciudadana:</strong> Estamos procesando un alto volumen de iniciativas. Agradecemos tu paciencia mientras revisamos cada mensaje con el rigor técnico necesario.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="contact-form-container">
                        {sent ? (
                            <div style={{ backgroundColor: 'var(--color-white)', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', textAlign: 'center' }}>
                                <CheckCircle size={60} color="#38A169" style={{ margin: '0 auto 1.5rem' }} />
                                <h2 style={{ color: '#2F855A' }}>¡Mensaje Enviado!</h2>
                                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                                    Gracias por contactar al Congreso Ciudadano de México. Hemos recibido tus datos y te contactaremos pronto.
                                </p>
                                <button onClick={() => setSent(false)} className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-white)', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}>
                                <h3 style={{ marginBottom: '2rem' }}>Envíanos un Mensaje</h3>

                                {error && (
                                    <div style={{ backgroundColor: '#FFF5F5', color: '#C53030', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid #FEB2B2' }}>
                                        {error}
                                    </div>
                                )}

                                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                    <label className="form-label">Nombre Completo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                    <label className="form-label">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                    <label className="form-label">Asunto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '2rem' }}>
                                    <label className="form-label">Tu Mensaje o Propuesta</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        required
                                        style={{ resize: 'none' }}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                            <Send size={18} />
                                            Enviar Mensaje Oficial
                                        </div>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contacto;
