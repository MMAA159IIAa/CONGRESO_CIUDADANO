import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { FileText, Plus, Search, CheckCircle, Loader2, Clock, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
import './Pages.css';

const statusConfig = {
    'Recibida - Pendiente Revisión': { bg: '#FEF08A', color: '#854D0E', label: '⏳ En Moderación' },
    'En evaluación técnica': { bg: '#DBEAFE', color: '#1E40AF', label: '🔬 En Evaluación' },
    'Aprobada para Votación': { bg: '#E6F4EA', color: '#1E8E3E', label: '✅ Publicada' },
    'Rechazada': { bg: '#FEE2E2', color: '#DC2626', label: '❌ No Aprobada' },
};

const getStatus = (status) => statusConfig[status] || { bg: '#F3F4F6', color: '#6B7280', label: status };

const Iniciativas = () => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // New Initiative Form State — 4 blocks
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [benefits, setBenefits] = useState('');
    const [risks, setRisks] = useState('');

    const [iniciativasList, setIniciativasList] = useState([]);

    useEffect(() => {
        const fetchIniciativas = async () => {
            const { data, error } = await supabase.from('iniciativas').select('*').order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching from Supabase:", error);
                setIniciativasList([
                    { id: 'i1', title: 'Transparencia Obligatoria en Compras Médicas (Datos de prueba)', status: 'En evaluación técnica', date: '02 Mar 2026' },
                    { id: 'i2', title: 'Regulación del uso de IA en campañas electorales (Datos de prueba)', status: 'Aprobada para Votación', date: '28 Feb 2026' }
                ]);
            } else {
                setIniciativasList(data.map(d => ({
                    id: d.id,
                    title: d.title,
                    status: d.status,
                    date: new Date(d.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
                })));
            }
            setIsLoadingData(false);
        };
        fetchIniciativas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const fullDescription = `¿Qué propone?\n${description}\n\n👍 Beneficios\n${benefits}\n\n⚠️ Posibles riesgos\n${risks}`;

        const { data, error } = await supabase.from('iniciativas').insert([{
            title,
            description: fullDescription,
            user_id: user.id
        }]).select();

        setIsSubmitting(false);

        if (error) {
            console.error("Error al guardar", error);
            const newIni = { id: `i_${Date.now()}`, title, status: 'Recibida - Pendiente Revisión', date: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) };
            setIniciativasList([newIni, ...iniciativasList]);
        } else if (data && data.length > 0) {
            const newIni = { id: data[0].id, title: data[0].title, status: data[0].status, date: new Date(data[0].created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) };
            setIniciativasList([newIni, ...iniciativasList]);
        }

        setIsSubmitted(true);
        setTimeout(() => {
            setShowModal(false);
            setIsSubmitted(false);
            setTitle(''); setDescription(''); setBenefits(''); setRisks('');
        }, 3000);
    };

    const filtered = iniciativasList.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="page" style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - var(--header-height))' }}>

            <header className="page-header" style={{
                padding: '3rem 0',
                background: `linear-gradient(to bottom right, rgba(10, 28, 62, 0.85), rgba(206, 17, 38, 0.5)), url('/poder_pueblo.png') center/cover no-repeat`
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📜</div>
                    <h1 className="page-title" style={{ fontSize: '2rem' }}>Iniciativas Ciudadanas</h1>
                    <p className="page-subtitle" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        El "Parlamento Digital del Pueblo". Propón nuevas leyes, comparte tus ideas y ayuda a construir una mejor democracia.
                    </p>
                </div>
            </header>

            {/* How it works strip */}
            <div style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-white)', padding: '1rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                    <span>📝 <strong>1.</strong> Escribe tu propuesta</span>
                    <span>➡️</span>
                    <span>🔬 <strong>2.</strong> Pasa a moderación</span>
                    <span>➡️</span>
                    <span>✅ <strong>3.</strong> Se publica en Votaciones</span>
                    <span>➡️</span>
                    <span>🗳️ <strong>4.</strong> El pueblo decide</span>
                </div>
            </div>

            <section className="container" style={{ padding: '3rem 1.5rem' }}>

                {/* Actions Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.4rem' }}>Iniciativas Enviadas por el Pueblo</h2>
                        <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{filtered.length} propuesta{filtered.length !== 1 ? 's' : ''} registrada{filtered.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="form-control"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ paddingLeft: '2.5rem', backgroundColor: 'var(--color-white)', width: '220px' }}
                            />
                        </div>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={20} /> Proponer Ley
                        </button>
                    </div>
                </div>

                {/* Initiatives List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {isLoadingData ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            <Loader2 size={32} style={{ margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
                            Cargando propuestas ciudadanas...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-light)', backgroundColor: 'var(--color-surface)', borderRadius: '8px' }}>
                            {searchQuery ? `No se encontraron resultados para "${searchQuery}"` : '¡No hay iniciativas aún! Sé el primero en proponer una ley.'}
                        </div>
                    ) : (
                        filtered.map((ini) => {
                            const st = getStatus(ini.status);
                            return (
                                <div key={ini.id} style={{ backgroundColor: 'var(--color-surface)', borderRadius: '8px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderLeft: '4px solid var(--color-primary-light)' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', backgroundColor: 'rgba(10,28,62,0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem', color: 'var(--color-text-main)' }}>{ini.title}</h3>
                                            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                <Clock size={12} /> Enviada el {ini.date}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.3rem 0.85rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 700, backgroundColor: st.bg, color: st.color, whiteSpace: 'nowrap' }}>
                                        {st.label}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>

            {/* Submit Modal — 4-block form */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '640px', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>

                        {isSubmitted ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                <CheckCircle size={48} color="#1E8E3E" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>¡Propuesta Recibida!</h3>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Tu iniciativa ha sido enviada al comité de revisión del Congreso Ciudadano. Si es aprobada, aparecerá en el Cabildo Digital para que el pueblo vote. ¡Gracias por participar!</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h2 style={{ color: 'var(--color-primary-dark)', margin: '0 0 0.5rem' }}>📜 Proponer Nueva Ley</h2>
                                    <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem' }}>
                                        Completa los 4 bloques. Recuerda la Regla de los 60 segundos: <strong>si un ciudadano común no lo entiende, no está bien explicado.</strong>
                                    </p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {/* Block 1 */}
                                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Lightbulb size={16} color="var(--color-accent)" /> 1️⃣ Título de la propuesta
                                        </label>
                                        <input type="text" className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Cárcel automática por corrupción política" disabled={isSubmitting} />
                                    </div>

                                    {/* Block 2 */}
                                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FileText size={16} color="var(--color-primary-light)" /> 2️⃣ ¿Qué propone y por qué?
                                        </label>
                                        <textarea className="form-control" style={{ minHeight: '110px', resize: 'vertical' }} required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Explica de forma simple qué quieres cambiar y cuál es el problema que busca resolver..." disabled={isSubmitting} />
                                    </div>

                                    {/* Block 3 */}
                                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <ThumbsUp size={16} color="#1E8E3E" /> 3️⃣ ¿Cuáles son los beneficios?
                                        </label>
                                        <textarea className="form-control" style={{ minHeight: '90px', resize: 'vertical' }} required value={benefits} onChange={(e) => setBenefits(e.target.value)} placeholder="• Beneficio 1&#10;• Beneficio 2&#10;• Beneficio 3" disabled={isSubmitting} />
                                    </div>

                                    {/* Block 4 */}
                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <ThumbsDown size={16} color="#DC2626" /> 4️⃣ ¿Cuáles son los posibles riesgos?
                                        </label>
                                        <textarea className="form-control" style={{ minHeight: '90px', resize: 'vertical' }} required value={risks} onChange={(e) => setRisks(e.target.value)} placeholder="• Riesgo 1&#10;• Riesgo 2&#10;(Sé honesto, esto da credibilidad a la propuesta)" disabled={isSubmitting} />
                                    </div>

                                    <div style={{ backgroundColor: '#FEF9E7', border: '1px solid #F9E79F', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#854D0E' }}>
                                        ⚖️ <strong>Moderación:</strong> Tu propuesta será revisada antes de publicarse. Rechazamos contenido ofensivo, propaganda partidista o información falsa.
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                        <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ border: 'none' }} disabled={isSubmitting}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {isSubmitting ? 'Enviando...' : '📨 Enviar a Revisión'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default Iniciativas;
