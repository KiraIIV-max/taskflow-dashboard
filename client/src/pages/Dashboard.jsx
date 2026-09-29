import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get('/tasks');
                setTasks(res.data.tasks || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const stats = {
        total: tasks.length,
        todo: tasks.filter((t) => t.status === 'TODO').length,
        inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
        completed: tasks.filter((t) => t.status === 'COMPLETED').length,
    };

    const recentTasks = tasks.slice(0, 5);

    const statusColor = {
        TODO: 'text-blue-400 bg-blue-400/10',
        IN_PROGRESS: 'text-yellow-400 bg-yellow-400/10',
        COMPLETED: 'text-green-400 bg-green-400/10',
        CANCELLED: 'text-red-400 bg-red-400/10',
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Tasks" value={stats.total} color="cyan" />
                <StatCard label="Todo" value={stats.todo} color="blue" />
                <StatCard label="In Progress" value={stats.inProgress} color="yellow" />
                <StatCard label="Completed" value={stats.completed} color="green" />
            </div>

            {/* Recent Tasks */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-5 border-b border-slate-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>
                    <Link to="/tasks" className="text-cyan-400 hover:underline text-sm">View all →</Link>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-slate-400">Loading...</div>
                ) : error ? (
                    <div className="p-8 text-center text-red-400">{error}</div>
                ) : recentTasks.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                        No tasks yet.{' '}
                        <Link to="/tasks" className="text-cyan-400 hover:underline">Create your first task</Link>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-700">
                        {recentTasks.map((task) => (
                            <li key={task.id} className="p-4 hover:bg-slate-700/30 transition flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-white font-medium truncate">{task.title}</p>
                                    <p className="text-sm text-slate-400 truncate">{task.description || '—'}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[task.status] || 'text-slate-400 bg-slate-400/10'}`}>
                                    {task.status.replace('_', ' ')}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function StatCard({ label, value, color }) {
    const colors = {
        cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
        blue: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
        yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
        green: 'text-green-400 bg-green-400/10 border-green-400/30',
    };

    return (
        <div className={`rounded-xl border p-5 bg-slate-800 ${colors[color] || ''}`}>
            <p className="text-slate-400 text-sm mb-2">{label}</p>
            <p className={`text-3xl font-bold ${colors[color]?.split(' ')[0] || 'text-white'}`}>{value}</p>
        </div>
    );
}

export default Dashboard;