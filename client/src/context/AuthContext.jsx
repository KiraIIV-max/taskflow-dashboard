import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (!token) {
                setLoading(false);
                return;
            }

            if (savedUser) {
                try { setUser(JSON.parse(savedUser)); } catch {}
            }

            try {
                const res = await api.get('/auth/me');
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
            } catch {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return res;
    };

    const register = async (name, email, password, confirmPassword) => {
        const res = await api.post('/auth/register', { name, email, password, confirmPassword });
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return res;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};