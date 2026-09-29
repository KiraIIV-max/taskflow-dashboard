import TaskForm from './TaskForm';

function TaskModal({ open, onClose, onSubmit, initialData, loading }) {
    if (!open) return null;

    const mode = initialData ? 'edit' : 'create';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-6 my-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">
                        ×
                    </button>
                </div>
                <TaskForm
                    initialData={initialData}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    loading={loading}
                    mode={mode}
                />
            </div>
        </div>
    );
}

export default TaskModal;