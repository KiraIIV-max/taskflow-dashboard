import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/tasks', label: 'My Tasks', icon: '✅' },
    { to: '/analytics', label: 'Analytics', icon: '📈' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
];

function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-2xl font-bold text-cyan-400">TASKFLOW</h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                            }`
                        }
                    >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
                >
                    <span>🚪</span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;