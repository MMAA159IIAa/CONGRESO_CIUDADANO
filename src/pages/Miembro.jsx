import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Shield, Vote, FileText, UserCircle, Calendar, LogOut, Video, Activity, Crown, Users, Settings, Eye, EyeOff, Bell } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './Pages.css';

// ─────────────────────────────────────────────
// Admin Video Config
// ─────────────────────────────────────────────
const AdminVideoConfig = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        supabase.from('platform_settings').select('value').eq('key', 'home_video_url').single()
            .then(({ data }) => { if (data) setVideoUrl(data.value); });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const { error } = await supabase.from('platform_settings').upsert({ key: 'home_video_url', value: videoUrl });
        setIsSaving(false);
        setMessage(error ? 'Error al guardar. Verifica las tablas en Supabase.' : '¡Video actualizado! Se reflejará en el inicio.');
        setTimeout(() => setMessage(''), 4000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>
                <Video size={18} /> URL de YouTube del video principal:
            </div>
            <input type="text" className="form-control" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            <button onClick={handleSave} className="btn btn-primary" disabled={isSaving} style={{ alignSelf: 'flex-start' }}>
                {isSaving ? 'Guardando...' : 'Actualizar Video en Inicio'}
            </button>
            {message && <p style={{ fontSize: '0.9rem', color: message.includes('Error') ? '#DC2626' : '#1E8E3E', fontWeight: 600 }}>{message}</p>}
        </div>
    );
};

// ─────────────────────────────────────────────
// Admin: Gestión de Roles de Miembros
// ─────────────────────────────────────────────
const AdminRoleManager = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(null);

    useEffect(() => {
        supabase.from('profiles').select('id, name, state, role, can_upload_video, is_active, created_at')
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
                if (!error && data) setMembers(data);
                setLoading(false);
            });
    }, []);

    const updateRole = async (memberId, field, value) => {
        setSaving(memberId);
        await supabase.from('profiles').update({ [field]: value }).eq('id', memberId);
        setMembers(prev => prev.map(m => m.id === memberId ? { ...m, [field]: value } : m));
        setSaving(null);
    };

    const roleColors = { fundador: '#C9A227', parlamento: '#3182CE', ciudadano: '#6B7280' };
    const roleLabels = { fundador: '👑 Fundador', parlamento: '🏛️ Parlamento', ciudadano: '🇲🇽 Ciudadano' };

    if (loading) return <p style={{ color: 'var(--color-text-muted)' }}>Cargando miembros...</p>;

    return (
        <div>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {members.length} ciudadano{members.length !== 1 ? 's' : ''} registrado{members.length !== 1 ? 's' : ''}. Cambia roles y permisos de video aquí.
            </p>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border-light)' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 600 }}>Nombre</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 600 }}>Estado</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 600 }}>Rol</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--color-text-muted)', fontWeight: 600 }}>Video</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--color-text-muted)', fontWeight: 600 }}>Activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(m => (
                            <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border-light)', opacity: saving === m.id ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                                <td style={{ padding: '0.75rem', fontWeight: 500 }}>{m.name || 'Sin nombre'}</td>
                                <td style={{ padding: '0.75rem', color: 'var(--color-text-muted)' }}>{m.state || '—'}</td>
                                <td style={{ padding: '0.75rem' }}>
                                    <select
                                        value={m.role}
                                        onChange={(e) => updateRole(m.id, 'role', e.target.value)}
                                        style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)', fontSize: '0.85rem', color: roleColors[m.role] || '#6B7280', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        <option value="ciudadano">🇲🇽 Ciudadano</option>
                                        <option value="parlamento">🏛️ Parlamento</option>
                                        <option value="fundador">👑 Fundador</option>
                                    </select>
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    <button
                                        onClick={() => updateRole(m.id, 'can_upload_video', !m.can_upload_video)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: m.can_upload_video ? '#1E8E3E' : '#D1D5DB' }}
                                        title={m.can_upload_video ? 'Quitar permiso de video' : 'Dar permiso de video'}
                                    >
                                        {m.can_upload_video ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    <button
                                        onClick={() => updateRole(m.id, 'is_active', !m.is_active)}
                                        style={{ padding: '0.2rem 0.6rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem', backgroundColor: m.is_active ? '#E6F4EA' : '#FEE2E2', color: m.is_active ? '#1E8E3E' : '#DC2626' }}
                                    >
                                        {m.is_active ? 'Activo' : 'Inactivo'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// Admin: Anuncio del Sitio
// ─────────────────────────────────────────────
const AdminAnnouncement = () => {
    const [text, setText] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        supabase.from('platform_settings').select('value').eq('key', 'site_announcement').single()
            .then(({ data }) => { if (data) setText(data.value); });
    }, []);

    const saveAnnouncement = async () => {
        await supabase.from('platform_settings').upsert({ key: 'site_announcement', value: text });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Aparece como un banner en todas las páginas. Deja vacío para ocultar.</p>
            <textarea className="form-control" style={{ minHeight: '80px' }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ej: Bienvenidos al Congreso Ciudadano. Hoy hay nueva votación abierta. ¡Participa!" />
            <button onClick={saveAnnouncement} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                {saved ? '✓ Guardado' : 'Publicar Anuncio'}
            </button>
        </div>
    );
};

// ─────────────────────────────────────────────
// Admin: Gestión de Votaciones (Iniciativas del Senado)
// ─────────────────────────────────────────────
const AdminVotacionesManager = () => {
    const [title, setTitle] = useState('');
    const [area, setArea] = useState('Vigilancia');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const { error } = await supabase.from('votaciones').insert([{
            title,
            area,
            description,
            closing_date: date
        }]);
        setIsSaving(false);
        if (error) {
            setMessage('Error al guardar: ' + error.message);
        } else {
            setMessage('¡Iniciativa publicada con éxito!');
            setTitle(''); setArea('Vigilancia'); setDescription(''); setDate('');
        }
        setTimeout(() => setMessage(''), 4000);
    };

    return (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Usa este formulario para subir propuestas oficiales o del Senado que el pueblo deba votar.</p>

            <div className="form-group">
                <label className="form-label">Título de la Iniciativa</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ej: Reforma al Artículo 27..." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Área / Comisión</label>
                    <select className="form-control" value={area} onChange={(e) => setArea(e.target.value)}>
                        <option value="Vigilancia">Vigilancia</option>
                        <option value="Anticorrupción">Anticorrupción</option>
                        <option value="Salud Pública">Salud Pública</option>
                        <option value="Educación">Educación</option>
                        <option value="Economía">Economía</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Fecha de Cierre</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Descripción Detallada (Explicación para el pueblo)</label>
                <textarea className="form-control" style={{ minHeight: '120px' }} value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Explica de qué trata la ley en términos sencillos..." />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSaving} style={{ alignSelf: 'flex-start' }}>
                {isSaving ? 'Publicando...' : '🚀 Publicar en Cabildo Digital'}
            </button>

            {message && <p style={{ fontSize: '0.9rem', color: message.includes('Error') ? '#DC2626' : '#1E8E3E', fontWeight: 600 }}>{message}</p>}
        </form>
    );
};

// ─────────────────────────────────────────────
// MAIN MIEMBRO COMPONENT
// ─────────────────────────────────────────────
const Miembro = () => {
    const { user, logout, isFounder, isParlamento } = useAuth();
    const [myVotes, setMyVotes] = useState([]);
    const [isLoadingVotes, setIsLoadingVotes] = useState(true);
    const [adminTab, setAdminTab] = useState('video');

    useEffect(() => {
        if (!user) return;
        supabase.from('votos')
            .select('vote_type, created_at, votaciones(id, title)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
                if (!error && data) setMyVotes(data);
                setIsLoadingVotes(false);
            });
    }, [user]);

    const roleBadge = {
        fundador: { bg: '#FEF3C7', color: '#92400E', label: '👑 Fundador', icon: <Crown size={14} /> },
        parlamento: { bg: '#DBEAFE', color: '#1E40AF', label: '🏛️ Miembro del Parlamento', icon: <Shield size={14} /> },
        ciudadano: { bg: '#E6F4EA', color: '#1E8E3E', label: '🇲🇽 Ciudadano Verificado', icon: <Shield size={14} /> },
    };
    const badge = roleBadge[user?.role] || roleBadge.ciudadano;

    const adminTabs = [
        { key: 'video', label: '🎬 Video', component: <AdminVideoConfig /> },
        { key: 'votaciones', label: '🗳️ Votaciones', component: <AdminVotacionesManager /> },
        { key: 'miembros', label: '👥 Miembros', component: <AdminRoleManager /> },
        { key: 'anuncio', label: '📣 Anuncio', component: <AdminAnnouncement /> },
    ];

    return (
        <div className="page" style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - var(--header-height))' }}>

            {/* Dashboard Header */}
            <div style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-border)', padding: '2rem 0' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: isFounder ? 'linear-gradient(135deg, #C9A227, #006847)' : 'var(--color-primary-light)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isFounder ? <Crown size={36} color="#fff" /> : <UserCircle size={48} />}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                            Hola, {user?.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: badge.bg, color: badge.color, padding: '0.25rem 0.75rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem' }}>
                                {badge.label}
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                <Calendar size={14} /> Miembro desde {new Date(user?.joinedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long' })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 1.5rem' }}>

                {/* Quick Nav Cards */}
                <h2 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Tu Cabildo Digital</h2>
                <div className="axes-grid" style={{ marginBottom: '3rem' }}>
                    <div className="axis-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textAlign: 'left', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '8px', backgroundColor: 'rgba(49,130,206,0.1)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Vote size={24} /></div>
                            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Votaciones Activas</h3>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', flexGrow: 1, fontSize: '0.9rem' }}>Analiza y vota en las iniciativas abiertas del Congreso Ciudadano.</p>
                        <Link to="/votaciones" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Ver Votaciones</Link>
                    </div>
                    <div className="axis-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textAlign: 'left', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '8px', backgroundColor: 'rgba(10,28,62,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={24} /></div>
                            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Iniciativas Ciudadanas</h3>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', flexGrow: 1, fontSize: '0.9rem' }}>Propón y sigue el estado de tus propuestas de ley al Congreso.</p>
                        <Link to="/iniciativas" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Gestionar Iniciativas</Link>
                    </div>
                    <div className="axis-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textAlign: 'left', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '8px', backgroundColor: 'rgba(0,104,71,0.1)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={24} /></div>
                            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Representantes</h3>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', flexGrow: 1, fontSize: '0.9rem' }}>Conoce a los representantes ciudadanos activos en cada estado.</p>
                        <Link to="/representantes" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Ver Representantes</Link>
                    </div>
                </div>

                {/* Historial de Voto */}
                <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '8px', padding: '2rem', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'rgba(0,104,71,0.1)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Activity size={20} />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Mi Historial de Voto</h3>
                    </div>
                    {isLoadingVotes ? (
                        <p style={{ color: 'var(--color-text-muted)' }}>Cargando actividad...</p>
                    ) : myVotes.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--color-background)', borderRadius: '8px' }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Aún no has votado en ninguna iniciativa.</p>
                            <Link to="/votaciones" className="btn btn-outline">Ir a Votaciones Activas</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {myVotes.map((vote, idx) => (
                                <div key={idx} style={{ padding: '1rem', border: '1px solid var(--color-border-light)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 0.2rem 0', fontSize: '0.95rem' }}>{vote.votaciones?.title}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', margin: 0 }}>Votaste el {new Date(vote.created_at).toLocaleDateString('es-MX')}</p>
                                    </div>
                                    <div style={{ padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, backgroundColor: vote.vote_type === 'for' ? '#E6F4EA' : vote.vote_type === 'against' ? '#FEE2E2' : '#FEF08A', color: vote.vote_type === 'for' ? '#1E8E3E' : vote.vote_type === 'against' ? '#DC2626' : '#854D0E' }}>
                                        {vote.vote_type === 'for' ? '🟢 A Favor' : vote.vote_type === 'against' ? '🔴 En Contra' : '🟡 Necesita Cambios'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '8px', padding: '2rem', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>Datos de tu Perfil</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Correo</label><div style={{ fontWeight: 500 }}>{user?.email}</div></div>
                        <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Estado</label><div style={{ fontWeight: 500 }}>{user?.state || '—'}</div></div>
                        <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Área de Interés</label><div style={{ fontWeight: 500, textTransform: 'capitalize' }}>{user?.interestArea || '—'}</div></div>
                        <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Permiso de Video</label><div style={{ fontWeight: 500 }}>{user?.canUploadVideo ? '✅ Autorizado' : '🔒 Solo Admin'}</div></div>
                    </div>
                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-light)' }}>
                        <button onClick={logout} className="btn" style={{ padding: 0, color: '#DC2626', backgroundColor: 'transparent', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LogOut size={18} /> Cerrar Sesión Segura
                        </button>
                    </div>
                </div>

                {/* ADMIN PANEL — solo fundador */}
                {isFounder && (
                    <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-md)', borderLeft: '5px solid #C9A227' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Crown size={24} color="#C9A227" />
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#92400E' }}>Panel de Administración — Fundador</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Control exclusivo del Congreso Ciudadano de México</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--color-border-light)', paddingBottom: '0' }}>
                            {adminTabs.map(tab => (
                                <button key={tab.key} onClick={() => setAdminTab(tab.key)} style={{ padding: '0.5rem 1.25rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', backgroundColor: 'transparent', color: adminTab === tab.key ? '#C9A227' : 'var(--color-text-muted)', borderBottom: adminTab === tab.key ? '3px solid #C9A227' : '3px solid transparent', marginBottom: '-2px', transition: 'all 0.2s' }}>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        {adminTabs.find(t => t.key === adminTab)?.component}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Miembro;
