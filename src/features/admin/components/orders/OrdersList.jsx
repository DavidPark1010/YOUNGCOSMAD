import { useState } from 'react'

function OrdersList({ orders, orderStats, t, lang, onSelectOrder, onDeleteOrder, formatDateShort }) {
  const [activeFilter, setActiveFilter] = useState(null)

  const filterStatuses = ['pending', 'paid', 'shipped', 'delivered']

  const filteredOrders = activeFilter
    ? orders.filter(o => o.status === activeFilter)
    : orders

  return (
    <>
      <div className="admin-summary orders-summary">
        <div className="summary-card">
          <span className="summary-label">{t.orders.statuses.pending}</span>
          <span className="summary-value">{orderStats.pending}</span>
        </div>
        <div className="summary-card highlight">
          <span className="summary-label">{t.orders.statuses.paid}</span>
          <span className="summary-value">{orderStats.paid}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">{t.orders.statuses.delivered}</span>
          <span className="summary-value">{orderStats.delivered}</span>
        </div>
      </div>

      <div className="order-filter-bar">
        <button
          className={`order-filter-chip ${!activeFilter ? 'active' : ''}`}
          onClick={() => setActiveFilter(null)}
        >
          {t.orders.total}
        </button>
        {filterStatuses.map(status => (
          <button
            key={status}
            className={`order-filter-chip ${activeFilter === status ? 'active' : ''}`}
            onClick={() => setActiveFilter(activeFilter === status ? null : status)}
          >
            {t.orders.statuses[status]}
          </button>
        ))}
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
            {filteredOrders.map(order => (
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
