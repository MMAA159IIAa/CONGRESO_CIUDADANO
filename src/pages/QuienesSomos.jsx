import './Pages.css';

const QuienesSomos = () => {
    return (
        <div className="page">
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">Quiénes Somos</h1>
                    <p className="page-subtitle">
                        Conoce la naturaleza, misión y visión del Congreso Ciudadano de México.
                    </p>
                </div>
            </header>

            <section className="content-section">
                <div className="container">
                    <div className="content-block">
                        <h2>Nuestra Naturaleza</h2>
                        <p>
                            El Congreso Ciudadano de México es una organización nacional independiente integrada por
                            ciudadanos comprometidos con el fortalecimiento democrático, la legalidad y la transparencia pública.
                        </p>
                        <p>
                            <strong>No representa intereses partidistas ni responde a estructuras políticas tradicionales.</strong>
                            Su naturaleza es estrictamente técnica, ciudadana y constitucional.
                        </p>
                    </div>

                    <div className="content-block">
                        <h2>Misión</h2>
                        <p>
                            Fortalecer el Estado de Derecho mediante mecanismos de participación ciudadana organizada,
                            análisis técnico de iniciativas legislativas y vigilancia institucional responsable.
                        </p>
                    </div>

                    <div className="content-block">
                        <h2>Visión</h2>
                        <p>
                            Convertirse en el principal observatorio ciudadano técnico del país, reconocido por su
                            independencia, rigor académico y contribución activa al fortalecimiento democrático
                            en México.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuienesSomos;
