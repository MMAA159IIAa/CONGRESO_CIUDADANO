import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Auth User
    const [profile, setProfile] = useState(null); // DB Data
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async (supabaseUser) => {
        if (!supabaseUser) return null;

        try {
            console.log('[AuthContext] Consultando perfil para UID:', supabaseUser.id);

            // ChatGPT Pro-Tip: .maybeSingle() evita errores si no hay fila aún
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', supabaseUser.id)
                .maybeSingle();

            if (error) {
                console.error('[AuthContext] Error en query RLS:', error.message);
                return null;
            }

            if (!data) {
                console.warn('[AuthContext] RLS bloqueó el dato o la fila no existe.');
                return {
                    id: supabaseUser.id,
                    role: 'ciudadano',
                    name: supabaseUser.user_metadata?.name || 'Ciudadano'
                };
            }

            console.log('[AuthContext] ¡DATOS RECUPERADOS! Rol:', data.role);
            return data;
        } catch (e) {
            console.error('[AuthContext] Excepción en fetchProfile:', e);
            return null;
        }
    }, []);

    const resolveUser = useCallback(async (session) => {
        if (!session?.user) {
            setUser(null);
            setProfile(null);
            setLoading(false);
            return;
        }

        console.log('[AuthContext] Sesión detectada. Desbloqueando UI inmediata.');

        // 1. DESBLOQUEO INSTANTÁNEO (User auth listo)
        setUser(session.user);
        setLoading(false);

        // 2. ChatGPT Pro-Tip: Pequeño delay para que RLS "respire" y reconozca el token
        setTimeout(async () => {
            console.log('[AuthContext] Iniciando carga de perfil en background...');
            const profileData = await fetchProfile(session.user);
            if (profileData) {
                setProfile(profileData);
            }
        }, 100);
    }, [fetchProfile]);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (mounted) await resolveUser(session);
            } catch (err) {
                if (mounted) setLoading(false);
            }
        };

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('[AuthContext] Evento Supabase:', event);
            if (!mounted) return;

            if (event === 'SIGNED_OUT') {
                setUser(null);
                setProfile(null);
                setLoading(false);
            } else if (session) {
                resolveUser(session);
            }
        });

        init();

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [resolveUser]);

    const login = async (email, password) => {
        return await supabase.auth.signInWithPassword({ email, password });
    };

    const register = async ({ email, password, name, state, interestArea, isPostulating }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
                data: {
                    name,
                    state,
                    interestArea,
                    is_postulating: isPostulating || false
                }
            }
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        setUser(null);
        setProfile(null);
        setLoading(false);
        await supabase.auth.signOut();

        // Limpiamos rastro
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('supabase.auth') || key.includes('sb-'))) {
                localStorage.removeItem(key);
            }
        }
        window.location.replace('/');
    };

    // Objeto de usuario enriquecido para la UI
    const finalUser = user ? {
        ...user,
        name: profile?.name || user.user_metadata?.name || 'Ciudadano',
        role: profile?.role || 'ciudadano',
        state: profile?.state || user.user_metadata?.state || '',
        joinedAt: profile?.created_at || user.created_at,
        canUploadVideo: profile?.can_upload_video || false,
        isProfileLoaded: !!profile,
        isPostulating: profile?.is_postulating || user.user_metadata?.is_postulating || false
    } : null;

    const value = {
        user: finalUser,
        isAuthenticated: !!user,
        profile,
        isFounder: profile?.role === 'fundador',
        isParlamento: profile?.role === 'parlamento' || profile?.role === 'fundador',
        loading,
        login,
        register,
        logout,
        refreshProfile: async () => {
            if (user) {
                const p = await fetchProfile(user);
                setProfile(p);
            }
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
