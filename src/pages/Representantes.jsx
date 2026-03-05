import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Users, MapPin, Shield } from 'lucide-react';
import './Pages.css';

const areaColors = {
    'Transparencia': '#3182CE',
    'Salud Pública': '#1E8E3E',
    'Tecnología Cívica': '#6D28D9',
    'Educación': '#D97706',
    'Seguridad': '#DC2626',
    'Anticorrupción': '#0F766E',
    'Economía': '#C9A227',
    'Medioambiente': '#16A34A',
};

const getAreaColor = (area) => areaColors[area] || '#6B7280';

const Representantes = () => {
    const [representantes, setRepresentantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterState, setFilterState] = useState('');

    useEffect(() => {
        supabase.from('representantes')
            .select('nombre, estado, area, descripcion, foto_url')
            .eq('is_active', true)
            .order('estado', { ascending: true })
            .then(({ data, error }) => {
                if (!error && data) setRepresentantes(data);
                setLoading(false);
            });
    }, []);

    const estados = [...new Set(representantes.map(r => r.estado))].sort();
    const filtered = filterState ? representantes.filter(r => r.estado === filterState) : representantes;

    return (
        <div className="page" style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - var(--header-height))' }}>

            <header className="page-header" style={{
                padding: '3.5rem 0',
                background: `linear-gradient(to bottom right, rgba(10, 28, 62, 0.88), rgba(201, 162, 39, 0.5)), url('/poder_pueblo.png') center/cover no-repeat`
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏛️</div>
                    <h1 className="page-title" style={{ fontSize: '2rem' }}>Representantes Ciudadanos</h1>
                    <p className="page-subtitle" style={{ maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Ciudadanos comprometidos que representan su estado en el Congreso Ciudadano de México. Por tu privacidad, solo mostramos tu nombre y área.
                    </p>
                </div>
            </header>

            {/* Privacy banner */}
            <div style={{ backgroundColor: '#F0FDF4', borderBottom: '1px solid #BBF7D0', padding: '0.85rem 0' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#166534' }}>
                    <Shield size={16} />
                    <span><strong>Privacidad protegida:</strong> Solo se muestra nombre y área de especialización. Los datos personales están encriptados y son privados.</span>
                </div>
            </div>

            <section className="container" style={{ padding: '3rem 1.5rem' }}>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{representantes.length}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Representantes Activos</div>
                    </div>
                    <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)' }}>{estados.length}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Estados Representados</div>
                    </div>
                    <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#C9A227' }}>32</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Meta de Cobertura</div>
                    </div>
                </div>

                {/* Filter */}
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <select
                        value={filterState}
                        onChange={(e) => setFilterState(e.target.value)}
                        className="form-control"
                        style={{ maxWidth: '260px', backgroundColor: 'var(--color-white)' }}
                    >
                        <option value="">🇲🇽 Todos los estados</option>
                        {estados.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{filtered.length} representante{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Cargando representantes...</div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-light)' }}>
                        <p>No hay representantes registrados aún en esta sección.</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Si estás interesado en representar tu estado, contáctanos.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {filtered.map((rep, idx) => (
                            <div key={idx} style={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'transform 0.2s, box-shadow 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                            >
                                {/* Avatar */}
                                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: `linear-gradient(135deg, ${getAreaColor(rep.area)}, var(--color-primary-dark))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.6rem', fontWeight: 700 }}>
                                    {rep.nombre?.charAt(0) || '?'}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-text-main)', fontWeight: 700 }}>{rep.nombre}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                        <MapPin size={13} /> {rep.estado}
                                    </div>
                                </div>
                                {rep.area && (
                                    <span style={{ alignSelf: 'flex-start', padding: '0.2rem 0.7rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, color: getAreaColor(rep.area), backgroundColor: `${getAreaColor(rep.area)}18` }}>
                                        {rep.area}
                                    </span>
                                )}
                                {rep.descripcion && (
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{rep.descripcion}</p>
                                )}
                                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1E8E3E', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Shield size={13} /> Ciudadano Verificado
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Selection Process Explanation */}
                <div style={{ marginTop: '4rem', padding: '2.5rem', backgroundColor: 'var(--color-white)', borderRadius: '12px', border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', textAlign: 'center' }}>¿Cómo se eligen los Representantes?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flexShrink: 0, width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>1</div>
                            <div>
                                <h4 style={{ marginBottom: '0.5rem' }}>Postulación Ciudadana</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Cualquier ciudadano puede postularse al registrarse, indicando su estado y área de especialidad técnica o social.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flexShrink: 0, width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>2</div>
                            <div>
                                <h4 style={{ marginBottom: '0.5rem' }}>Validación de Mérito</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>El comité de fundadores revisa la trayectoria y la participación activa del postulante en las votaciones del Cabildo Digital.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flexShrink: 0, width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>3</div>
                            <div>
                                <h4 style={{ marginBottom: '0.5rem' }}>Representación Estatal</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Se busca tener al menos un representante verificado por cada estado de la República para garantizar una visión federalista.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Join CTA */}
                <div style={{ marginTop: '3rem', textAlign: 'center', backgroundColor: 'var(--color-primary-dark)', color: '#fff', borderRadius: '12px', padding: '3rem 2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🤝</div>
                    <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem' }}>¿Quieres representar tu estado?</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                        El Congreso Ciudadano busca ciudadanos comprometidos en cada estado de México. Tus datos personales siempre estarán protegidos.
                    </p>
                    <Link to="/participa" className="btn btn-primary" style={{ backgroundColor: '#C9A227', borderColor: '#C9A227', fontSize: '1rem', padding: '0.85rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
                        Unirme y Representar mi Estado
                    </Link>
                </div>

            </section>
        </div>
    );
};

export default Representantes;
