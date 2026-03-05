import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, LogIn, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './Pages.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetMode, setResetMode] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        console.log('[Login] Intentando acceder con:', email);

        try {
            const { data, error: loginError } = await login(email, password);

            if (loginError) {
                console.error('[Login] Error de credenciales:', loginError.message);

                let userFriendlyError = loginError.message;

                if (loginError.message === 'Invalid login credentials') {
                    userFriendlyError = 'El correo o la contraseña son incorrectos.';
                } else if (loginError.message.includes('Email not confirmed')) {
                    userFriendlyError = '⚠️ Tu correo aún no ha sido confirmado. Por favor, revisa tu bandeja de entrada o intenta registrarte de nuevo en unos minutos.';
                }

                setError(userFriendlyError);
                setIsSubmitting(false);
                return;
            }

            console.log('[Login] ¡Acceso concedido! Redirigiendo...');

            // Redirección inmediata a nivel de navegador para asegurar limpieza de estado
            window.location.href = '/miembro';

        } catch (err) {
            console.error('[Login] Error inesperado:', err);
            setError('Error de comunicación con el servidor.');
            setIsSubmitting(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!email) { setError('Escribe tu correo primero.'); return; }
        setIsSubmitting(true);
        setError('');
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });
            if (error) throw error;
            setResetSent(true);
        } catch (error) {
            setError('Error al enviar recuperación: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page" style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
            <div className="form-container" style={{ width: '100%', maxWidth: '450px', borderTop: '4px solid var(--color-primary)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'rgba(10, 28, 62, 0.1)', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        <Lock size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                        {resetMode ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                        {resetMode ? 'Te enviaremos un enlace para crear una nueva contraseña.' : 'Ingresa al panel del Congreso Ciudadano'}
                    </p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', borderLeft: '4px solid #EF4444' }}>
                        {error}
                    </div>
                )}

                {resetSent ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <CheckCircle size={48} color="#1E8E3E" style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ color: '#1E8E3E', marginBottom: '0.5rem' }}>¡Correo enviado!</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                            Revisa tu bandeja de <strong>{email}</strong>.
                        </p>
                        <button onClick={() => { setResetMode(false); setResetSent(false); }} className="btn btn-outline">
                            Volver al Login
                        </button>
                    </div>
                ) : resetMode ? (
                    <form onSubmit={handlePasswordReset}>
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label">Tu correo electrónico</label>
                            <input type="email" className="form-control" required placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1rem' }} disabled={isSubmitting}>
                            <Mail size={20} style={{ marginRight: '0.5rem' }} />
                            {isSubmitting ? 'Enviando...' : 'Enviar Enlace'}
                        </button>
                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <button type="button" onClick={() => { setResetMode(false); setError(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                Volver al inicio de sesión
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" id="email" className="form-control" required placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" id="password" className="form-control" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div style={{ textAlign: 'right', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>
                            <button type="button" onClick={() => { setResetMode(true); setError(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 600 }}>
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1rem' }} disabled={isSubmitting}>
                            {isSubmitting ? 'Verificando...' : (
                                <><LogIn size={20} style={{ marginRight: '0.5rem' }} /> Acceder</>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
