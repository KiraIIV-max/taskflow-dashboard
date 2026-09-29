const statusStyles = {
    TODO: { label: '🔵 Todo', cls: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
    IN_PROGRESS: { label: '🟡 In Progress', cls: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
    COMPLETED: { label: '🟢 Completed', cls: 'text-green-400 bg-green-400/10 border-green-400/30' },
    CANCELLED: { label: '🔴 Cancelled', cls: 'text-red-400 bg-red-400/10 border-red-400/30' },
};

const priorityStyles = {
    LOW: 'text-slate-400 bg-slate-400/10 border-slate-400/30',
    MEDIUM: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    HIGH: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    URGENT: 'text-red-400 bg-red-400/10 border-red-400/30',
};

function TaskCard({ task, onEdit, onDelete }) {
    const status = statusStyles[task.status] || statusStyles.TODO;

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition group">
            <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-white font-semibold text-lg flex-1 min-w-0 break-words">
                    {task.title}
                </h3>
                <span className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium border ${priorityStyles[task.priority]}`}>
                    {task.priority}
                </span>
            </div>

            {task.description && (
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${status.cls}`}>
                        {status.label}
                    </span>
                    {task.dueDate && (
                        <span className="text-slate-500 text-xs">
                            📅 {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={() => onEdit(task)}
                        className="px-3 py-1 rounded-md text-xs text-cyan-400 hover:bg-cyan-400/10 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task)}
                        className="px-3 py-1 rounded-md text-xs text-red-400 hover:bg-red-400/10 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;