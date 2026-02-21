function OrdersList({ orders, orderStats, t, lang, onSelectOrder, onDeleteOrder, formatDateShort }) {
  return (
    <>
      <div className="admin-summary orders-summary">
        <div className="summary-card">
          <span className="summary-label">{t.orders.total}</span>
          <span className="summary-value">{orderStats.total}</span>
        </div>
        <div className="summary-card highlight">
          <span className="summary-label">{t.orders.pending}</span>
          <span className="summary-value">{orderStats.pending}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">{t.orders.processing}</span>
          <span className="summary-value">{orderStats.processing}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">{t.orders.shipped}</span>
          <span className="summary-value">{orderStats.shipped}</span>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t.orders.status}</th>
              <th>{t.orders.orderId}</th>
              <th>{t.orders.customer}</th>
              <th>{t.orders.items}</th>
              <th>{t.orders.total}</th>
              <th>{t.orders.date}</th>
              <th>{t.orders.actions}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="table-row">
                <td>
                  <span className={`status-badge order-${order.status}`}>
                    {t.orders.statuses[order.status]}
                  </span>
                </td>
                <td>
                  <span className="order-id-cell">{order.id}</span>
                </td>
                <td className="customer-cell">
                  <span className="customer-name">{order.customerName}</span>
                  <span className="customer-company">{order.customerPhone || order.customerEmail}</span>
                </td>
                <td>{order.items.length}{lang === 'ko' ? t.orders.itemsCount : ` ${t.orders.itemsCount}`}</td>
                <td className="total-cell">${order.total.toLocaleString()}</td>
                <td className="date-cell">{formatDateShort(order.createdAt)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
                    <button
                      className="action-btn view"
                      onClick={() => onSelectOrder(order)}
                    >
                      {t.orders.viewDetails}
                    </button>
                    <button
                      className="order-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteOrder(order.id)
                      }}
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrdersList
