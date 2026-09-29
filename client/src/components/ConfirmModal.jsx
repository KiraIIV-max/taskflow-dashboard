function ConfirmModal({ open, title, message, onConfirm, onCancel, loading }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
                <p className="text-slate-300 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;