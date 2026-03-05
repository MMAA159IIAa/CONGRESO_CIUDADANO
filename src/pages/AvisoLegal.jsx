import { Scale } from 'lucide-react';
import './Pages.css';

const AvisoLegal = () => {
    return (
        <div className="page">
            <header className="page-header">
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Scale size={48} style={{ marginBottom: '1.5rem', opacity: 0.9 }} />
                    <h1 className="page-title">Aviso Legal y Transparencia</h1>
                    <p className="page-subtitle">
                        Marco normativo, privacidad y declaración de independencia.
                    </p>
                </div>
            </header>

            <section className="content-section">
                <div className="container">

                    <div className="content-block">
                        <h2>Declaración de Legalidad</h2>
                        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-sm)' }}>
                            <p style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.125rem', marginBottom: '1rem' }}>
                                El Congreso Ciudadano de México opera bajo el marco constitucional vigente,
                                respetando plenamente la legalidad, las instituciones y el orden democrático.
                            </p>
                            <p>
                                No recibe financiamiento partidista ni responde a intereses políticos. Su actuación se basa en la participación pacífica, el análisis técnico y los mecanismos jurídicos establecidos en la Constitución Política de los Estados Unidos Mexicanos.
                            </p>
                        </div>
                    </div>

                    <div className="content-block">
                        <h2>Independencia Partidista</h2>
                        <p>
                            Nuestra organización prohíbe el uso de su plataforma, nombre y recursos para la promoción del voto a favor o en contra de cualquier partido político o candidato. Cualquier iniciativa promovida desde este espacio tiene un fin estrictamente técnico, social y apartidista.
                        </p>
                    </div>

                    <div className="content-block">
                        <h2>Aviso de Privacidad</h2>
                        <p>
                            En cumplimento a lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, sus datos personales serán utilizados exclusivamente para los fines de comunicación, registro en el padrón ciudadano y organización interna del Congreso Ciudadano de México.
                        </p>
                        <p>
                            Nos comprometemos a garantizar el uso responsable de sus datos, así como implementar las medidas de seguridad administrativas, técnicas y físicas necesarias para proteger sus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
                        </p>
                    </div>

                    <div className="content-block">
                        <h2>Política de Transparencia</h2>
                        <p>
                            La transparencia es uno de nuestros ejes rectores, no solo como exigencia hacia las instituciones gubernamentales, sino como práctica interna. Los reportes técnicos, las iniciativas y la estructura organizacional serán de carácter público y accesible para consulta general.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default AvisoLegal;
