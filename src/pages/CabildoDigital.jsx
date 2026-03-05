import { Users, Vote, MessageSquare, AlertCircle } from 'lucide-react';
import './Pages.css';

const CabildoDigital = () => {
    return (
        <div className="page">
            <header className="page-header" style={{ backgroundColor: 'var(--color-text-muted)' }}>
                <div className="container">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                        <AlertCircle size={16} /> Fase de Desarrollo
                    </div>
                    <h1 className="page-title">Cabildo Digital</h1>
                    <p className="page-subtitle">
                        Plataforma interactiva para la toma de decisiones y participación estructurada.
                    </p>
                </div>
            </header>

            <section className="content-section">
                <div className="container">
                    <div className="content-block text-center mb-5">
                        <p className="lead-text">
                            El Cabildo Digital será el núcleo de la participación ciudadana directa dentro del Congreso.
                        </p>
                        <p>
                            Actualmente nos encontramos desarrollando la infraestructura tecnológica necesaria para
                            garantizar un entorno seguro, verificable y estructurado para todos los participantes.
                        </p>
                    </div>

                    <h2 className="text-center" style={{ marginBottom: '3rem', color: 'var(--color-primary)' }}>Próximas Funcionalidades</h2>

                    <div className="axes-grid">
                        <div className="axis-card" style={{ opacity: 0.7 }}>
                            <div className="axis-icon-wrapper" style={{ backgroundColor: 'var(--color-border)' }}>
                                <Users size={32} color="var(--color-text-muted)" />
                            </div>
                            <h3>Registro Verificado</h3>
                            <p>Sistema de validación de identidad ciudadana para asegurar la legitimidad de la plataforma.</p>
                        </div>
                        <div className="axis-card" style={{ opacity: 0.7 }}>
                            <div className="axis-icon-wrapper" style={{ backgroundColor: 'var(--color-border)' }}>
                                <Vote size={32} color="var(--color-text-muted)" />
                            </div>
                            <h3>Votación Estructurada</h3>
                            <p>Mecanismos seguros para respaldar iniciativas y aprobar planes de acción.</p>
                        </div>
                        <div className="axis-card" style={{ opacity: 0.7 }}>
                            <div className="axis-icon-wrapper" style={{ backgroundColor: 'var(--color-border)' }}>
                                <MessageSquare size={32} color="var(--color-text-muted)" />
                            </div>
                            <h3>Foros Moderados</h3>
                            <p>Espacios de debate técnico y propuestas constructivas sin polarización.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CabildoDigital;
