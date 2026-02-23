function OrderDetail({ t, order, formatDate, trackingInput, setTrackingInput, notificationSent, onUpdateStatus, onBack }) {
  const statusFlow = ['pending', 'paid', 'preparing', 'shipped', 'delivered']
  const currentIdx = statusFlow.indexOf(order.status)

  return (
    <div className="order-detail">
      <button className="detail-back-btn" onClick={onBack}>
        ← {t.detail.back}
      </button>

      {notificationSent && (
        <div className="notification-toast">
          {t.orders.notificationSent}
        </div>
      )}

      <div className="order-detail-content">
        <div className="order-detail-main">
          <div className="order-info-card">
            <div className="order-info-header">
              <div>
                <span className="order-detail-id">{order.id}</span>
                <span className={`status-badge order-${order.status}`}>
                  {t.orders.statuses[order.status]}
                </span>
              </div>
              <span className="order-detail-date">{formatDate(order.createdAt)}</span>
            </div>

            <div className="order-customer-info">
              <h4>{t.orders.customerDetail}</h4>
              <p className="customer-detail-name">{order.customerName}</p>
              <p className="customer-detail-company">{order.customerCompany}</p>
              <p className="customer-detail-email">{order.customerEmail}</p>
            </div>

            <div className="order-shipping-info">
              <h4>{t.orders.shippingAddress}</h4>
              <p>{order.shippingAddress}</p>
            </div>

            <div className="order-items-info">
              <h4>{t.orders.itemsDetail}</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">x {item.quantity}</span>
                  <span className="item-price">${(item.quantity * item.price).toLocaleString()}</span>
                </div>
              ))}
              <div className="order-total-row">
                <span>{t.orders.totalLabel}</span>
                <span className="total-value">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="order-status-card">
            <h4>{t.orders.updateStatus}</h4>
            <div className="status-flow">
              {statusFlow.map((status, idx) => {
                const isActive = order.status === status
                const isPast = currentIdx >= idx
                return (
                  <div key={status} className={`status-flow-item ${isPast ? 'past' : ''} ${isActive ? 'active' : ''}`}>
                    <button
                      className={`status-flow-btn ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (status === 'shipped' && !trackingInput) {
                          alert(t.orders.trackingAlert)
                          return
                        }
                        onUpdateStatus(order.id, status, status === 'shipped' ? trackingInput : null)
                      }}
                      disabled={isPast && !isActive}
                    >
                      {t.orders.statuses[status]}
                    </button>
                    {idx < 4 && <div className={`status-flow-line ${isPast && idx < currentIdx ? 'active' : ''}`} />}
                  </div>
                )
              })}
            </div>

            <div className="tracking-input-section">
              <label>{t.orders.trackingNumber}</label>
              <input
                type="text"
                value={trackingInput}
                onChange={e => setTrackingInput(e.target.value)}
                placeholder={t.orders.trackingPlaceholder}
              />
            </div>
          </div>
        </div>

        <div className="order-timeline-card">
          <h4>{t.orders.orderTimeline}</h4>
          <div className="order-timeline-list">
            {order.timeline.map((event, idx) => (
              <div key={idx} className="timeline-event">
                <div className={`timeline-event-dot ${event.status}`} />
                <div className="timeline-event-content">
                  <span className="timeline-event-status">{t.orders.statuses[event.status]}</span>
                  <span className="timeline-event-message">{event.message}</span>
                  <span className="timeline-event-date">{formatDate(event.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
