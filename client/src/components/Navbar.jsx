import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user } = useAuth();

    // greeting حسب الوقت
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
                <p className="text-slate-400 text-sm">
                    {greeting}, <span className="text-white font-medium">{user?.name}</span> 👋
                </p>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-lg hover:bg-slate-700 transition">
                    <span className="text-xl">🔔</span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                    <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold">
                        {user?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="text-slate-200 font-medium hidden sm:block">{user?.name}</span>
                </div>
            </div>
        </header>
    );
}

export default Navbar;