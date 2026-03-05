import { Search, FileText, Database, Shield } from 'lucide-react';
import './Pages.css';

const Observatorio = () => {
    return (
        <div className="page">
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">Observatorio Anticorrupción</h1>
                    <p className="page-subtitle">
                        Revisión técnica, documental e independiente de procesos públicos.
                    </p>
                </div>
            </header>

            <section className="content-section">
                <div className="container">
                    <div className="content-block text-center">
                        <Shield size={48} className="axis-icon" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }} />
                        <p className="lead-text" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                            Espacio técnico de revisión de contratos públicos, presupuestos y procesos administrativos
                            con base en transparencia y acceso a información pública.
                        </p>
                        <p>
                            El Observatorio del Congreso Ciudadano de México tiene un carácter estrictamente analítico
                            y no acusatorio. Su enfoque es técnico y documental, buscando siempre el fortalecimiento
                            institucional mediante la detección de áreas de mejora en la gestión gubernamental.
                        </p>
                    </div>

                    <div className="axes-grid" style={{ marginTop: '4rem' }}>
                        <div className="axis-card">
                            <div className="axis-icon-wrapper">
                                <FileText size={32} />
                            </div>
                            <h3>Análisis de Contratos</h3>
                            <p>Revisión detallada de licitaciones y adjudicaciones públicas.</p>
                        </div>
                        <div className="axis-card">
                            <div className="axis-icon-wrapper">
                                <Database size={32} />
                            </div>
                            <h3>Seguimiento Presupuestal</h3>
                            <p>Monitoreo del ejercicio del gasto público en programas clave.</p>
                        </div>
                        <div className="axis-card">
                            <div className="axis-icon-wrapper">
                                <Search size={32} />
                            </div>
                            <h3>Auditoría Ciudadana</h3>
                            <p>Evaluación técnica de resultados de la gestión administrativa.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Observatorio;
