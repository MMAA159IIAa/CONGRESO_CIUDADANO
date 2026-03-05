import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Vote, FileText, Calendar, CheckCircle, ChevronDown, ChevronUp, Loader2, Share2, Link2, Trophy } from 'lucide-react';
import './Pages.css';

// --- VIRAL SHARE MODAL (shown after voting) ---
const InviteModal = ({ iniciativa, onClose }) => {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;
    const text = `🇲🇽 Estoy votando en el Congreso Ciudadano de México.\n\nUna plataforma donde el pueblo analiza iniciativas de ley con información real y equilibrada.\n\n📌 Iniciativa: "${iniciativa}"\n\n¡Participa y expresa tu opinión! 👇\n${url}`;

    const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    const shareTelegram = () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    const copyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '2.5rem', maxWidth: '480px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🇲🇽</div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>¡Tu voto fue registrado!</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Invita a <strong>3 personas</strong> a participar en esta iniciativa. Cuantos más ciudadanos informados, más fuerte es nuestra democracia.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <button onClick={shareWhatsApp} style={{ padding: '0.85rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', backgroundColor: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        📱 Enviar por WhatsApp
                    </button>
                    <button onClick={shareFacebook} style={{ padding: '0.85rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', backgroundColor: '#1877F2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        📘 Compartir en Facebook
                    </button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <button onClick={shareTwitter} style={{ padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: '#000', color: '#fff' }}>
                            𝕏 Twitter / X
                        </button>
                        <button onClick={shareTelegram} style={{ padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: '#26A5E4', color: '#fff' }}>
                            ✈️ Telegram
                        </button>
                    </div>
                    <button onClick={copyLink} style={{ padding: '0.85rem 1.5rem', borderRadius: '8px', border: '2px solid var(--color-border)', cursor: 'pointer', fontWeight: 600, backgroundColor: 'transparent', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Link2 size={18} />
                        {copied ? '¡Enlace copiado! ✓' : 'Copiar enlace'}
                    </button>
                </div>
                <button onClick={onClose} style={{ color: 'var(--color-text-light)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>
                    No por ahora, continuar
                </button>
            </div>
        </div>
    );
};

// --- INLINE SHARE BAR (inside each card) ---
const ShareBar = ({ title }) => {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;
    const text = `🇲🇽 "${title}" - Estoy participando en el Congreso Ciudadano de México. ¿Qué opinas tú?\n${url}`;

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--color-border-light)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Share2 size={14} /> Compartir:
            </span>
            <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')} style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', backgroundColor: '#25D366', color: '#fff' }}>WhatsApp</button>
            <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')} style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', backgroundColor: '#000', color: '#fff' }}>𝕏 Twitter</button>
            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')} style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', backgroundColor: '#1877F2', color: '#fff' }}>Facebook</button>
            <button onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')} style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', backgroundColor: '#26A5E4', color: '#fff' }}>Telegram</button>
            <button onClick={copyLink} style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', border: '1px solid var(--color-border)', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', backgroundColor: 'transparent', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Link2 size={12} /> {copied ? '¡Copiado!' : 'Copiar enlace'}
            </button>
        </div>
    );
};

// --- STATE RANKING ---
const stateRanking = [
    { pos: 1, estado: 'Ciudad de México', votos: 3241, emoji: '🥇' },
    { pos: 2, estado: 'Jalisco', votos: 2874, emoji: '🥈' },
    { pos: 3, estado: 'Nuevo León', votos: 2610, emoji: '🥉' },
    { pos: 4, estado: 'Estado de México', votos: 2201, emoji: '4️⃣' },
    { pos: 5, estado: 'Sonora', votos: 1980, emoji: '5️⃣' },
    { pos: 6, estado: 'Puebla', votos: 1703, emoji: '6️⃣' },
    { pos: 7, estado: 'Veracruz', votos: 1540, emoji: '7️⃣' },
    { pos: 8, estado: 'Guanajuato', votos: 1398, emoji: '8️⃣' },
    { pos: 9, estado: 'Baja California', votos: 1187, emoji: '9️⃣' },
    { pos: 10, estado: 'Coahuila', votos: 987, emoji: '🔟' },
];

const ParticipationRanking = () => {
    const maxVotos = stateRanking[0].votos;
    return (
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #C9A227, #006847)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trophy size={18} color="#fff" />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>Participación por Estado</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Los estados más activos del Congreso Ciudadano</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {stateRanking.map((item) => (
                    <div key={item.pos}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: item.pos <= 3 ? 700 : 500, color: item.pos <= 3 ? 'var(--color-primary-dark)' : 'var(--color-text-main)' }}>
                                {item.emoji} {item.estado}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{item.votos.toLocaleString()} votos</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${(item.votos / maxVotos) * 100}%`, height: '100%', background: item.pos === 1 ? 'linear-gradient(to right, #C9A227, #006847)' : item.pos === 2 ? '#006847' : item.pos === 3 ? '#CE1126' : 'var(--color-primary-light)', borderRadius: '3px', transition: 'width 1s ease' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const Votaciones = () => {
    const { user } = useAuth();
    const [expandedId, setExpandedId] = useState(null);
    const [votedItems, setVotedItems] = useState({});
    const [votacionesList, setVotacionesList] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [inviteModal, setInviteModal] = useState(null); // title of the votacion just voted

    useEffect(() => {
        const fetchRemoteData = async () => {
            const { data: vots, error: votsError } = await supabase.from('votaciones').select('*').order('closing_date', { ascending: true });

            if (votsError) {
                console.error("Votaciones table likely missing, using mock.");
                setVotacionesList([
                    { id: 'v1', title: 'Iniciativa para la Reducción del Financiamiento (Datos Prueba)', area: 'Vigilancia', description: 'Propuesta ciudadana de prueba...', date: '15 Mar 2026', votesFor: 8452, votesAgainst: 124, abstentions: 89 },
                    { id: 'v2', title: 'Auditoría en Tiempo Real (Datos Prueba)', area: 'Anticorrupción', description: 'Prueba de panel técnico...', date: '22 Mar 2026', votesFor: 12503, votesAgainst: 45, abstentions: 211 }
                ]);
            } else {
                const list = await Promise.all(vots.map(async (v) => {
                    const { count: countFor } = await supabase.from('votos').select('*', { count: 'exact', head: true }).eq('votacion_id', v.id).eq('vote_type', 'for');
                    const { count: countAgainst } = await supabase.from('votos').select('*', { count: 'exact', head: true }).eq('votacion_id', v.id).eq('vote_type', 'against');
                    const { count: countAbs } = await supabase.from('votos').select('*', { count: 'exact', head: true }).eq('votacion_id', v.id).eq('vote_type', 'abs');

                    return {
                        id: v.id,
                        title: v.title,
                        area: v.area,
                        description: v.description,
                        date: new Date(v.closing_date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
                        votesFor: countFor || 0,
                        votesAgainst: countAgainst || 0,
                        abstentions: countAbs || 0
                    };
                }));
                setVotacionesList(list);

                if (user) {
                    const { data: userVotes } = await supabase.from('votos').select('*').eq('user_id', user.id);
                    if (userVotes) {
                        const userVotesMap = {};
                        userVotes.forEach(uv => { userVotesMap[uv.votacion_id] = uv.vote_type; });
                        setVotedItems(userVotesMap);
                    }
                }
            }
            setIsLoadingData(false);
        };
        fetchRemoteData();
    }, [user]);

    const handleVote = async (votacion, type) => {
        if (votedItems[votacion.id]) return;

        setVotedItems(prev => ({ ...prev, [votacion.id]: type }));

        const { error } = await supabase.from('votos').insert([{
            votacion_id: votacion.id,
            user_id: user.id,
            vote_type: type
        }]);

        if (error) {
            console.error("No se pudo registrar el voto en Supabase", error);
        } else {
            // Show invite modal after successful vote
            setInviteModal(votacion.title);
        }
    };

    const calculatePercentage = (forV, against, abs) => {
        const total = forV + against + abs;
        if (total === 0) return 0;
        return Math.round((forV / total) * 100);
    };

    return (
        <div className="page" style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - var(--header-height))' }}>

            {/* Post-vote share modal */}
            {inviteModal && <InviteModal iniciativa={inviteModal} onClose={() => setInviteModal(null)} />}

            <header className="page-header" style={{
                padding: '3rem 0',
                background: `linear-gradient(to bottom right, rgba(10, 28, 62, 0.8), rgba(0, 104, 71, 0.7)), url('/mexico_cielo.png') center/cover no-repeat`
            }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Vote size={40} color="var(--color-accent)" />
                    </div>
                    <h1 className="page-title" style={{ fontSize: '2rem' }}>Cabildo Digital</h1>
                    <p className="page-subtitle" style={{ fontSize: '1.1rem' }}>
                        El lugar donde México entiende las leyes que el Congreso discute. Analiza, reflexiona y participa.
                    </p>
                </div>
            </header>

            <section className="container" style={{ padding: '3rem 1.5rem' }}>

                {/* Participation Ranking */}
                <ParticipationRanking />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', margin: 0 }}>🗳️ Votaciones Activas</h2>
                    <span style={{ backgroundColor: 'var(--color-white)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
                        Votante: {user?.name || user?.email?.split('@')[0]}
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {isLoadingData ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
                            Consultando Votaciones en Base de Datos...
                        </div>
                    ) : (
                        votacionesList.length === 0 ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-light)' }}>
                                No hay votaciones activas en este momento.
                            </div>
                        ) : (
                            votacionesList.map((votacion) => {
                                const isExpanded = expandedId === votacion.id;
                                const hasVoted = votedItems[votacion.id] !== undefined;
                                const userVote = votedItems[votacion.id];

                                const displayFor = hasVoted && userVote === 'for' ? votacion.votesFor + 1 : votacion.votesFor;
                                const displayAgainst = hasVoted && userVote === 'against' ? votacion.votesAgainst + 1 : votacion.votesAgainst;
                                const displayAbs = hasVoted && userVote === 'abs' ? votacion.abstentions + 1 : votacion.abstentions;

                                const percentFor = calculatePercentage(displayFor, displayAgainst, displayAbs);
                                const percentAgainst = calculatePercentage(displayAgainst, displayFor, displayAbs);
                                const percentAbs = 100 - percentFor - percentAgainst;

                                return (
                                    <div key={votacion.id} style={{ backgroundColor: 'var(--color-surface)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', borderLeft: '4px solid var(--color-accent)' }}>
                                        {/* Card Header */}
                                        <div
                                            style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}
                                            onClick={() => setExpandedId(isExpanded ? null : votacion.id)}
                                        >
                                            <div style={{ flexGrow: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary-light)', backgroundColor: 'var(--color-background)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                                        {votacion.area}
                                                    </span>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <Calendar size={14} /> Cierra: {votacion.date}
                                                    </span>
                                                    {hasVoted && (
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E8E3E', backgroundColor: '#E6F4EA', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                            ✓ Votado
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-text-main)' }}>{votacion.title}</h3>
                                            </div>
                                            <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-background)', borderRadius: '50%', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </div>

                                        {/* Expanded Content */}
                                        {isExpanded && (
                                            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid var(--color-border-light)', paddingTop: '1.5rem' }}>

                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
                                                    <FileText style={{ flexShrink: 0, color: 'var(--color-text-light)', marginTop: '0.25rem' }} />
                                                    <div style={{ margin: 0, color: 'var(--color-text-main)', lineHeight: 1.7, fontSize: '1.02rem', whiteSpace: 'pre-line' }}>
                                                        {votacion.description}
                                                    </div>
                                                </div>

                                                {/* Results bar */}
                                                <div style={{ backgroundColor: 'var(--color-background)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                                        <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>📊 Resultado Ciudadano Actual</span>
                                                        <span style={{ fontWeight: 700, color: '#1E8E3E' }}>A favor: {percentFor}%</span>
                                                    </div>
                                                    <div style={{ display: 'flex', height: '20px', borderRadius: '10px', overflow: 'hidden', gap: '2px' }}>
                                                        <div style={{ width: `${percentFor}%`, backgroundColor: '#1E8E3E', transition: 'width 0.8s ease' }} title={`A favor: ${percentFor}%`} />
                                                        <div style={{ width: `${percentAgainst}%`, backgroundColor: '#DC2626', transition: 'width 0.8s ease' }} title={`En contra: ${percentAgainst}%`} />
                                                        <div style={{ width: `${percentAbs}%`, backgroundColor: '#D97706', transition: 'width 0.8s ease' }} title={`Necesita cambios: ${percentAbs}%`} />
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        <span style={{ color: '#1E8E3E', fontWeight: 600 }}>🟢 A favor: {displayFor.toLocaleString()} ({percentFor}%)</span>
                                                        <span style={{ color: '#DC2626', fontWeight: 600 }}>🔴 En contra: {displayAgainst.toLocaleString()} ({percentAgainst}%)</span>
                                                        <span style={{ color: '#D97706', fontWeight: 600 }}>🟡 Necesita cambios: {displayAbs.toLocaleString()} ({percentAbs}%)</span>
                                                    </div>
                                                </div>

                                                {/* Voting Actions */}
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <p style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1rem', textAlign: 'center', fontSize: '1rem' }}>
                                                        🗳️ ¿Qué opinas de esta iniciativa?
                                                    </p>
                                                    {hasVoted ? (
                                                        <div style={{ padding: '1rem', backgroundColor: '#E6F4EA', color: '#1E8E3E', borderRadius: '8px', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                            <CheckCircle size={20} />
                                                            Tu voto: {userVote === 'for' ? '🟢 A Favor' : userVote === 'against' ? '🔴 En Contra' : '🟡 Necesita Cambios'}. ¡Gracias por participar!
                                                        </div>
                                                    ) : (
                                                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                            <button
                                                                onClick={() => handleVote(votacion, 'for')}
                                                                className="btn btn-primary"
                                                                style={{ flex: 1, minWidth: '140px', backgroundColor: '#1E8E3E', borderColor: '#1E8E3E', justifyContent: 'center' }}
                                                            >
                                                                🟢 A Favor
                                                            </button>
                                                            <button
                                                                onClick={() => handleVote(votacion, 'against')}
                                                                className="btn btn-primary"
                                                                style={{ flex: 1, minWidth: '140px', backgroundColor: '#DC2626', borderColor: '#DC2626', justifyContent: 'center' }}
                                                            >
                                                                🔴 En Contra
                                                            </button>
                                                            <button
                                                                onClick={() => handleVote(votacion, 'abs')}
                                                                className="btn btn-primary"
                                                                style={{ flex: 1, minWidth: '140px', backgroundColor: '#D97706', borderColor: '#D97706', justifyContent: 'center' }}
                                                            >
                                                                🟡 Necesita Cambios
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Share bar */}
                                                <ShareBar title={votacion.title} />

                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )
                    )}
                </div>
            </section>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default Votaciones;
