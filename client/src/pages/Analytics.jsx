import { useEffect, useState } from 'react';
import api from '../services/api';

function Analytics() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/tasks')
            .then((res) => setTasks(res.data.tasks || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-12 text-center text-slate-400">Loading analytics...</div>;

    const total = tasks.length;
    const byStatus = {
        TODO: tasks.filter((t) => t.status === 'TODO').length,
        IN_PROGRESS: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
        COMPLETED: tasks.filter((t) => t.status === 'COMPLETED').length,
        CANCELLED: tasks.filter((t) => t.status === 'CANCELLED').length,
    };
    const byPriority = {
        LOW: tasks.filter((t) => t.priority === 'LOW').length,
        MEDIUM: tasks.filter((t) => t.priority === 'MEDIUM').length,
        HIGH: tasks.filter((t) => t.priority === 'HIGH').length,
        URGENT: tasks.filter((t) => t.priority === 'URGENT').length,
    };

    const completionRate = total === 0 ? 0 : Math.round((byStatus.COMPLETED / total) * 100);

    const statusData = [
        { label: 'Todo', value: byStatus.TODO, color: 'bg-blue-500' },
        { label: 'In Progress', value: byStatus.IN_PROGRESS, color: 'bg-yellow-500' },
        { label: 'Completed', value: byStatus.COMPLETED, color: 'bg-green-500' },
        { label: 'Cancelled', value: byStatus.CANCELLED, color: 'bg-red-500' },
    ];

    const priorityData = [
        { label: 'Low', value: byPriority.LOW, color: 'bg-slate-500' },
        { label: 'Medium', value: byPriority.MEDIUM, color: 'bg-cyan-500' },
        { label: 'High', value: byPriority.HIGH, color: 'bg-orange-500' },
        { label: 'Urgent', value: byPriority.URGENT, color: 'bg-red-500' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Analytics</h1>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                    <p className="text-slate-400 text-sm mb-2">Total Tasks</p>
                    <p className="text-3xl font-bold text-white">{total}</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                    <p className="text-slate-400 text-sm mb-2">Completion Rate</p>
                    <p className="text-3xl font-bold text-green-400">{completionRate}%</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                    <p className="text-slate-400 text-sm mb-2">Active</p>
                    <p className="text-3xl font-bold text-yellow-400">{byStatus.TODO + byStatus.IN_PROGRESS}</p>
                </div>
            </div>

            {/* By Status */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">By Status</h2>
                <div className="space-y-4">
                    {statusData.map((row) => (
                        <BarRow key={row.label} label={row.label} value={row.value} total={total} color={row.color} />
                    ))}
                </div>
            </div>

            {/* By Priority */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">By Priority</h2>
                <div className="space-y-4">
                    {priorityData.map((row) => (
                        <BarRow key={row.label} label={row.label} value={row.value} total={total} color={row.color} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function BarRow({ label, value, total, color }) {
    const pct = total === 0 ? 0 : Math.round((value / total) * 100);
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">{label}</span>
                <span className="text-slate-400 text-sm">{value} ({pct}%)</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

export default Analytics;