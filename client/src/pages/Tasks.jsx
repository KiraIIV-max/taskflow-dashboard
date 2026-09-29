import { useEffect, useState } from 'react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [priority, setPriority] = useState('All');
    const [sort, setSort] = useState('newest');

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [saving, setSaving] = useState(false);

    const [deletingTask, setDeletingTask] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (status !== 'All') params.append('status', status);
            if (priority !== 'All') params.append('priority', priority);
            if (search.trim()) params.append('search', search.trim());
            if (sort) params.append('sort', sort);

            const res = await api.get(`/tasks?${params.toString()}`);
            setTasks(res.data.tasks || []);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchTasks, 300);
        return () => clearTimeout(timer);
    }, [search, status, priority, sort]);

    const handleCreateOrUpdate = async (payload) => {
        setSaving(true);
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask.id}`, payload);
            } else {
                await api.post('/tasks', payload);
            }
            setModalOpen(false);
            setEditingTask(null);
            await fetchTasks();
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingTask) return;
        setDeleting(true);
        try {
            await api.delete(`/tasks/${deletingTask.id}`);
            setDeletingTask(null);
            await fetchTasks();
        } catch (err) {
            alert(err.message);
        } finally {
            setDeleting(false);
        }
    };

    const openCreate = () => {
        setEditingTask(null);
        setModalOpen(true);
    };

    const openEdit = (task) => {
        setEditingTask(task);
        setModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white">My Tasks</h1>
                <button
                    onClick={openCreate}
                    className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition flex items-center gap-2"
                >
                    <span>+</span>
                    <span>New Task</span>
                </button>
            </div>

            <div className="space-y-3">
                <SearchBar value={search} onChange={setSearch} />
                <Filters
                    status={status}
                    priority={priority}
                    sort={sort}
                    onStatusChange={setStatus}
                    onPriorityChange={setPriority}
                    onSortChange={setSort}
                />
            </div>

            {loading ? (
                <div className="p-12 text-center text-slate-400">Loading tasks...</div>
            ) : error ? (
                <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">{error}</div>
            ) : tasks.length === 0 ? (
                <div className="p-12 text-center bg-slate-800 border border-slate-700 rounded-xl">
                    <p className="text-slate-400 mb-2">No tasks found.</p>
                    <button onClick={openCreate} className="text-cyan-400 hover:underline">
                        Create your first task →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={openEdit}
                            onDelete={setDeletingTask}
                        />
                    ))}
                </div>
            )}

            <TaskModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingTask(null);
                }}
                onSubmit={handleCreateOrUpdate}
                initialData={editingTask}
                loading={saving}
            />

            <ConfirmModal
                open={!!deletingTask}
                title="Delete Task?"
                message={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeletingTask(null)}
                loading={deleting}
            />
        </div>
    );
}

export default Tasks;