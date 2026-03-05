import { FileSearch, CheckCircle, UploadCloud, Rocket, BarChart } from 'lucide-react';
import './Pages.css';
import './ComoFunciona.css'; // specific styles for the steps

const ComoFunciona = () => {
    return (
        <div className="page">
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">Cómo Funciona</h1>
                    <p className="page-subtitle">
                        El proceso institucional a través del cual la vigilancia y las propuestas ciudadanas cobran vida.
                    </p>
                </div>
            </header>

            <section className="content-section section-gray">
                <div className="container">
                    <div className="process-timeline">

                        <div className="process-step">
                            <div className="step-number">1</div>
                            <div className="step-icon-wrapper">
                                <UploadCloud size={32} />
                            </div>
                            <div className="step-content">
                                <h3>Recepción de propuestas ciudadanas</h3>
                                <p>Las ciudadanas y ciudadanos presentan propuestas sustentadas a través de nuestra plataforma, enfocadas en mejorar el marco jurídico o denunciar irregularidades de forma documental.</p>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">2</div>
                            <div className="step-icon-wrapper">
                                <FileSearch size={32} />
                            </div>
                            <div className="step-content">
                                <h3>Análisis técnico y jurídico</h3>
                                <p>Equipos de especialistas independientes evalúan la viabilidad técnica, el fundamento legal y el impacto social de cada iniciativa o reporte.</p>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">3</div>
                            <div className="step-icon-wrapper">
                                <CheckCircle size={32} />
                            </div>
                            <div className="step-content">
                                <h3>Publicación de evaluación</h3>
                                <p>Se emite un dictamen técnico de carácter ciudadano que se publica abiertamente para el escrutinio público, garantizando absoluta transparencia.</p>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">4</div>
                            <div className="step-icon-wrapper">
                                <Rocket size={32} />
                            </div>
                            <div className="step-content">
                                <h3>Impulso mediante mecanismos constitucionales</h3>
                                <p>Las propuestas viables y sólidas se canalizan hacia las instituciones y representantes oficiales correspondientes, haciendo uso de herramientas constitucionales vigentes.</p>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">5</div>
                            <div className="step-icon-wrapper">
                                <BarChart size={32} />
                            </div>
                            <div className="step-content">
                                <h3>Seguimiento y transparencia pública</h3>
                                <p>El Congreso Ciudadano monitorea el avance de las propuestas e informa periódicamente a la ciudadanía sobre los resultados y las respuestas institucionales obtenidas.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ComoFunciona;
