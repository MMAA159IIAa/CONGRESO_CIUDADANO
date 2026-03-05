import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Pages.css';

const Participa = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        state: '',
        interestArea: '',
        isPostulating: false
    });

    const { register, loading: isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await register(formData);
            setIsSubmitted(true);
            // Wait to show the success message
            setTimeout(() => {
                navigate('/miembro');
            }, 4000);
        } catch (err) {
            setError(err.message || 'Hubo un error al registrarse. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="page">
            <header className="page-header" style={{
                background: `linear-gradient(to bottom right, rgba(10, 28, 62, 0.8), rgba(0, 104, 71, 0.7)), url('/diversidad_mexico.png') center/cover no-repeat`
            }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <UserPlus size={48} />
                    </div>
                    <h1 className="page-title">Únete al Congreso Ciudadano</h1>
                    <p className="page-subtitle">
                        Súmate al esfuerzo estructurado por el fortalecimiento de nuestra democracia.
                    </p>
                </div>
            </header>

            <section className="content-section section-gray">
                <div className="container">

                    {isSubmitted ? (
                        <div className="form-container text-center" style={{ padding: '4rem 2rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: '#E6F4EA', color: '#1E8E3E', marginBottom: '1.5rem', boxShadow: '0 4px 14px rgba(30,142,62,0.2)' }}>
                                <Send size={32} />
                            </div>
                            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>¡Registro Exitoso!</h2>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2rem' }}>
                                Te hemos enviado un correo de confirmación a <strong>{formData.email}</strong>.
                            </p>
                            <div style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-accent)' }}>
                                <Loader2 className="animate-spin" size={20} style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                                <span>Redirigiendo a tu perfil de ciudadano...</span>
                                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                            </div>
                        </div>
                    ) : (
                        <div className="form-container">
                            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>Formulario de Registro</h2>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', textAlign: 'center' }}>
                                Completa tus datos para integrarte a nuestras comisiones de trabajo, votar y proponer iniciativas.
                            </p>

                            {error && (
                                <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', borderLeft: '4px solid #EF4444' }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Nombre completo</label>
                                    <input type="text" id="name" value={formData.name} onChange={handleChange} className="form-control" required placeholder="Ej. Juan Pérez" disabled={isLoading} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input type="email" id="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="correo@ejemplo.com" disabled={isLoading} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Contraseña (para tu panel de miembro)</label>
                                    <input type="password" id="password" value={formData.password} onChange={handleChange} className="form-control" required placeholder="Crea una contraseña segura" disabled={isLoading} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state" className="form-label">Estado de residencia</label>
                                    <select id="state" value={formData.state} onChange={handleChange} className="form-control" required disabled={isLoading}>
                                        <option value="">Selecciona tu estado</option>
                                        <option value="AGUASCALIENTES">Aguascalientes</option>
                                        <option value="BAJA_CALIFORNIA">Baja California</option>
                                        <option value="BAJA_CALIFORNIA_SUR">Baja California Sur</option>
                                        <option value="CAMPECHE">Campeche</option>
                                        <option value="CHIAPAS">Chiapas</option>
                                        <option value="CHIHUAHUA">Chihuahua</option>
                                        <option value="CDMX">Ciudad de México</option>
                                        <option value="COAHUILA">Coahuila</option>
                                        <option value="COLIMA">Colima</option>
                                        <option value="DURANGO">Durango</option>
                                        <option value="ESTADO_DE_MEXICO">Estado de México</option>
                                        <option value="GUANAJUATO">Guanajuato</option>
                                        <option value="GUERRERO">Guerrero</option>
                                        <option value="HIDALGO">Hidalgo</option>
                                        <option value="JALISCO">Jalisco</option>
                                        <option value="MICHOACAN">Michoacán</option>
                                        <option value="MORELOS">Morelos</option>
                                        <option value="NAYARIT">Nayarit</option>
                                        <option value="NUEVO_LEON">Nuevo León</option>
                                        <option value="OAXACA">Oaxaca</option>
                                        <option value="PUEBLA">Puebla</option>
                                        <option value="QUERETARO">Querétaro</option>
                                        <option value="QUINTANA_ROO">Quintana Roo</option>
                                        <option value="SAN_LUIS_POTOSI">San Luis Potosí</option>
                                        <option value="SINALOA">Sinaloa</option>
                                        <option value="SONORA">Sonora</option>
                                        <option value="TABASCO">Tabasco</option>
                                        <option value="TAMAULIPAS">Tamaulipas</option>
                                        <option value="TLAXCALA">Tlaxcala</option>
                                        <option value="VERACRUZ">Veracruz</option>
                                        <option value="YUCATAN">Yucatán</option>
                                        <option value="ZACATECAS">Zacatecas</option>
                                        <option value="EXTRANJERO">Mexicano en el Extranjero</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="interestArea" className="form-label">Área de interés principal</label>
                                    <select id="interestArea" value={formData.interestArea} onChange={handleChange} className="form-control" required disabled={isLoading}>
                                        <option value="">Selecciona un área</option>
                                        <option value="vigilancia">Vigilancia Legislativa</option>
                                        <option value="iniciativa">Iniciativa Ciudadana</option>
                                        <option value="observatorio">Observatorio Anticorrupción</option>
                                        <option value="transparencia">Transparencia Pública</option>
                                        <option value="general">Participación General</option>
                                    </select>
                                </div>

                                <div className="form-group checkbox-group" style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                                    <input type="checkbox" id="isPostulating" checked={formData.isPostulating} onChange={handleChange} className="checkbox-input" disabled={isLoading} />
                                    <label htmlFor="isPostulating" className="checkbox-label" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                                        🏛️ Deseo postularme como Miembro del Parlamento por mi estado.
                                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                            Tu perfil será revisado por el comité de fundadores para validar tu participación activa.
                                        </span>
                                    </label>
                                </div>

                                <div className="form-group checkbox-group" style={{ marginTop: '2rem' }}>
                                    <input type="checkbox" id="privacy" className="checkbox-input" required disabled={isLoading} />
                                    <label htmlFor="privacy" className="checkbox-label">
                                        He leído y acepto el <a href="/aviso-legal" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Aviso de Privacidad</a> y confirmo que mi participación es a título ciudadano, pacífica y apartidista.
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', fontSize: '1.125rem', padding: '1rem' }} disabled={isLoading}>
                                    {isLoading ? 'Enviando y Creando Perfil...' : 'Registrarme'}
                                </button>
                            </form>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
};

export default Participa;
