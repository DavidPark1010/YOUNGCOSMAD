function OrderDetail({
  selectedOrder, setSelectedOrder, orders, setOrders,
  t, trackingInput, setTrackingInput, notificationSent,
  formatDate, onBack, onOpenInvoice, onOpenCI
}) {
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
          {/* Order Info */}
          <div className="order-info-card">
            <div className="order-info-header">
              <div>
                <span className="order-detail-id">{selectedOrder.id}</span>
                <span className={`status-badge order-${selectedOrder.status}`}>
                  {t.orders.statuses[selectedOrder.status]}
                </span>
              </div>
              <span className="order-detail-date">{formatDate(selectedOrder.createdAt)}</span>
            </div>

            <div className="order-customer-info">
              <h4>{t.orders.customer}</h4>
              <div className="info-display-field">
                <label>이름</label>
                <p>{selectedOrder.customerName || '-'}</p>
              </div>
              <div className="info-display-field">
                <label>회사명</label>
                <p>{selectedOrder.customerCompany || '-'}</p>
              </div>
              <div className="info-display-field">
                <label>이메일</label>
                <p>{selectedOrder.customerEmail || '-'}</p>
              </div>
              <div className="info-display-field">
                <label>전화번호</label>
                <p>{selectedOrder.customerPhone || '-'}</p>
              </div>
              <div className="info-display-field">
                <label>국가</label>
                <p>{selectedOrder.customerCountry || '-'}</p>
              </div>
              {selectedOrder.customerNotes && (
                <div className="info-display-field">
                  <label>고객 메모</label>
                  <p className="customer-note">{selectedOrder.customerNotes}</p>
                </div>
              )}
            </div>

            <div className="order-shipping-info">
              <h4>{t.orders.shippingAddress}</h4>
              <div className="info-display-field">
                <p>{selectedOrder.shippingAddress || '-'}</p>
              </div>
            </div>

            <div className="order-items-info">
              <h4>{t.orders.items}</h4>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="order-item-row editable">
                  <div className="item-name-edit">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...selectedOrder.items]
                        newItems[idx] = { ...newItems[idx], name: e.target.value }
                        const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                        setOrders(prev => prev.map(o =>
                          o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                        ))
                        setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                      }}
                      placeholder="제품명"
                    />
                  </div>
                  <div className="item-qty-edit">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...selectedOrder.items]
                        newItems[idx] = { ...newItems[idx], quantity: parseInt(e.target.value) || 0 }
                        const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                        setOrders(prev => prev.map(o =>
                          o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                        ))
                        setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                      }}
                      placeholder="수량"
                      min="0"
                    />
                    <span className="qty-label">개</span>
                  </div>
                  <div className="item-price-edit">
                    <span className="price-prefix">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => {
                        const newItems = [...selectedOrder.items]
                        newItems[idx] = { ...newItems[idx], price: parseFloat(e.target.value) || 0 }
                        const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                        setOrders(prev => prev.map(o =>
                          o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                        ))
                        setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                      }}
                      placeholder="단가"
                      min="0"
                    />
                  </div>
                  <span className="item-subtotal">
                    ${(item.quantity * item.price).toLocaleString()}
                  </span>
                  <button
                    className="item-remove-btn"
                    onClick={() => {
                      const newItems = selectedOrder.items.filter((_, i) => i !== idx)
                      const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                      setOrders(prev => prev.map(o =>
                        o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                      ))
                      setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {/* 품목 추가 버튼 */}
              <button
                className="add-item-btn"
                onClick={() => {
                  const newItems = [...selectedOrder.items, { name: '', nameKr: '', quantity: 0, price: 0 }]
                  setOrders(prev => prev.map(o =>
                    o.id === selectedOrder.id ? { ...o, items: newItems } : o
                  ))
                  setSelectedOrder(prev => ({ ...prev, items: newItems }))
                }}
              >
                + 품목 추가
              </button>

              {/* 배송비 */}
              <div className="order-item-row delivery-fee-row editable">
                <span className="item-name">Delivery Fee</span>
                <div className="item-price-edit delivery-fee-edit">
                  <span className="price-prefix">$</span>
                  <input
                    type="number"
                    value={selectedOrder.deliveryFee || 0}
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value) || 0
                      setOrders(prev => prev.map(o =>
                        o.id === selectedOrder.id ? { ...o, deliveryFee: newValue } : o
                      ))
                      setSelectedOrder(prev => ({ ...prev, deliveryFee: newValue }))
                    }}
                    min="0"
                  />
                </div>
              </div>

              <div className="order-total-row">
                <span>{t.orders.totalLabel}</span>
                <span className="total-value">${(selectedOrder.total + (selectedOrder.deliveryFee || 0)).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 진행사항 체크리스트 */}
          <div className="order-checklist-card">
            <h4>진행사항 체크리스트</h4>
            <div className="checklist-grid">
              {[
                { key: 'contactConfirmed', label: '연락처 확인됨' },
                { key: 'priceAgreed', label: '가격 협의 완료' },
                { key: 'invoiceSent', label: '인보이스 발송' },
                { key: 'paymentConfirmed', label: '입금 확인' },
                { key: 'productPrepared', label: '상품 준비 완료' },
                { key: 'ciCreated', label: 'CI 작성 완료' },
                { key: 'shipped', label: '배송 시작' },
                { key: 'delivered', label: '배송 완료' }
              ].map(item => (
                <label key={item.key} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={selectedOrder.checklist?.[item.key] || false}
                    onChange={(e) => {
                      const newChecklist = {
                        ...selectedOrder.checklist,
                        [item.key]: e.target.checked
                      }
                      setOrders(prev => prev.map(o =>
                        o.id === selectedOrder.id
                          ? { ...o, checklist: newChecklist }
                          : o
                      ))
                      setSelectedOrder(prev => ({ ...prev, checklist: newChecklist }))
                    }}
                  />
                  <span className="checklist-label">{item.label}</span>
                </label>
              ))}
            </div>

            {/* 운송장 번호 입력 */}
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

          {/* 인보이스 / CI 생성 버튼 */}
          <div className="invoice-ci-card">
            <h4>서류 생성</h4>
            <p className="invoice-ci-desc">
              주문 정보를 기반으로 PROFORMA INVOICE 또는 COMMERCIAL INVOICE를 생성합니다.
            </p>
            <div className="invoice-ci-buttons">
              <button
                className="invoice-btn proforma"
                onClick={() => onOpenInvoice(selectedOrder)}
              >
                <span className="btn-icon">📄</span>
                <span className="btn-text">
                  <strong>PROFORMA INVOICE</strong>
                  <small>견적 인보이스 생성</small>
                </span>
              </button>
              <button
                className="invoice-btn commercial"
                onClick={() => onOpenCI(selectedOrder)}
              >
                <span className="btn-icon">📋</span>
                <span className="btn-text">
                  <strong>COMMERCIAL INVOICE</strong>
                  <small>상업 인보이스 (CI) 생성</small>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="order-timeline-card">
          <h4>{t.orders.orderTimeline}</h4>
          <div className="order-timeline-list">
            {selectedOrder.timeline.map((event, idx) => (
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
