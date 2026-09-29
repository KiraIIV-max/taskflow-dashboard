import { useState, useEffect } from 'react';

const emptyForm = {
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '',
};

function TaskForm({ initialData, onSubmit, onCancel, loading, mode }) {
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    // لو بنعدّل: نحمّل البيانات
    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || '',
                description: initialData.description || '',
                status: initialData.status || 'TODO',
                priority: initialData.priority || 'MEDIUM',
                dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : '',
            });
        } else {
            setForm(emptyForm);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (form.title.trim().length < 3) {
            setError('Title must be at least 3 characters');
            return;
        }

        const payload = {
            title: form.title.trim(),
            description: form.description.trim() || null,
            status: form.status,
            priority: form.priority,
            dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        };

        onSubmit(payload);
    };

    const inputClass =
        'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition';
    const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div>
                <label className={labelClass}>Title *</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="Build REST API"
                    className={inputClass}
                />
            </div>

            <div>
                <label className={labelClass}>Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Optional details..."
                    className={inputClass + ' resize-none'}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                        <option value="TODO">Todo</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Priority</label>
                    <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                    </select>
                </div>
            </div>

            <div>
                <label className={labelClass}>Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition disabled:opacity-50"
                >
                    {loading ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Task'}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;