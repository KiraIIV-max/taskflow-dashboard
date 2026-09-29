import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-2xl font-bold text-white">Settings</h1>

            {/* Profile */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Name</label>
                        <p className="text-white">{user?.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Email</label>
                        <p className="text-white">{user?.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Member since</label>
                        <p className="text-white">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-slate-800 border border-red-500/30 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
                <p className="text-slate-400 text-sm mb-4">Log out from this device.</p>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Settings;