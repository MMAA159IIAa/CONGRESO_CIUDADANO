import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import './Pages.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSession, setHasSession] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // More robust session detection using onAuthStateChange
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth Event in Reset:', event, session);
            if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && !success)) {
                setHasSession(true);
            }
        });

        // Initial check
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setHasSession(true);
        });

        return () => subscription.unsubscribe();
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!hasSession) {
            setError('No se detectó el permiso de seguridad para cambiar contraseña. Por favor, asegúrate de haber abierto el link más reciente de tu correo.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setIsUpdating(true);
        try {
            // This is the core call that allows password update when a recovery link is active
            const { error: updateError } = await supabase.auth.updateUser({ password });

            if (updateError) {
                setError('Error al actualizar: ' + updateError.message);
            } else {
                setSuccess(true);
                // Clear session to force fresh login
                await supabase.auth.signOut();
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            setError('Ocurrió un error inesperado al conectar con el servidor.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="page" style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
            <div className="form-container" style={{ width: '100%', maxWidth: '450px', borderTop: '4px solid var(--color-accent)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'rgba(201, 162, 39, 0.1)', color: 'var(--color-accent)', marginBottom: '1rem' }}>
                        <Lock size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Nueva Contraseña</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Define una nueva clave de acceso para tu cuenta.</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', borderLeft: '4px solid #EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                {success ? (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <CheckCircle size={48} color="#1E8E3E" style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ color: '#1E8E3E' }}>¡Contraseña Actualizada!</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Inicia sesión con tu nueva contraseña en 3 segundos...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Escribe tu nueva clave</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                placeholder="Mínimo 6 caracteres"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isUpdating}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label">Confirma tu clave</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                placeholder="Repite la clave"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isUpdating}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                fontSize: '1rem',
                                backgroundColor: 'var(--color-accent)',
                                borderColor: 'var(--color-accent)',
                                opacity: !hasSession || isUpdating ? 0.6 : 1,
                                cursor: !hasSession || isUpdating ? 'not-allowed' : 'pointer'
                            }}
                            disabled={!hasSession || isUpdating}
                        >
                            <Save size={20} style={{ marginRight: '0.5rem' }} />
                            {isUpdating ? 'Guardando...' : 'Cambiar Contraseña Ahora'}
                        </button>

                        {!hasSession && !error && (
                            <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                Esperando validación del link de seguridad...
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
