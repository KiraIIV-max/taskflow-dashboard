function Filters({ status, priority, sort, onStatusChange, onPriorityChange, onSortChange }) {
    const selectClass =
        'px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition';

    return (
        <div className="flex flex-wrap gap-3">
            <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={selectClass}>
                <option value="All">All Status</option>
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
            </select>

            <select value={priority} onChange={(e) => onPriorityChange(e.target.value)} className={selectClass}>
                <option value="All">All Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
            </select>

            <select value={sort} onChange={(e) => onSortChange(e.target.value)} className={selectClass}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
}

export default Filters;