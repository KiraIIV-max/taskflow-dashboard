import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;
    if (user) return <Navigate to="/dashboard" replace />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

                    {/* Protected + Layout مشترك */}
                    <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="tasks" element={<Tasks />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;