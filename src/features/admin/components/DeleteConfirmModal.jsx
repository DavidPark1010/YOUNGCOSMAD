function DeleteConfirmModal({ t, onCancel, onDelete }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <p className="modal-message">{t.products.deleteConfirm}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>
            {t.products.cancel}
          </button>
          <button className="modal-delete" onClick={onDelete}>
            {t.products.delete}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
