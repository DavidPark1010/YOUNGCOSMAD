const PRODUCT_IMAGE_MAP = {
  'Hydra Glow Serum': '/product1.png',
  'Velvet Matte Lip Tint': '/product2.png',
  'Cica Repair Cream': '/product3.png',
  'Double Cleansing Oil': '/product4.png',
  'Peptide Eye Contour': '/product5.png',
  'Tone-Up Sun Shield': '/product6.png',
}

function OrderDetail({
  selectedOrder, setSelectedOrder, orders, setOrders,
  t, trackingInput, setTrackingInput, notificationSent,
  formatDate, onBack, onOpenInvoice, onOpenCI
}) {
  const getProductImage = (name) => {
    return PRODUCT_IMAGE_MAP[name] || null
  }

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

          {/* 주문 헤더 + 상품 프리뷰 */}
          <div className="order-detail-header-card">
            <div className="order-detail-header-top">
              <div className="order-detail-header-left">
                <span className="order-detail-id">{selectedOrder.id}</span>
                <span className={`status-badge order-${selectedOrder.status}`}>
                  {t.orders.statuses[selectedOrder.status]}
                </span>
              </div>
              <span className="order-detail-date">{formatDate(selectedOrder.createdAt)}</span>
            </div>
            {selectedOrder.refNo && (
              <div className="order-detail-ref">
                <span className="ref-label">Ref.</span>
                <span className="ref-value">{selectedOrder.refNo}</span>
              </div>
            )}
            <div className="header-products-preview">
              {selectedOrder.items.map((item, idx) => {
                const img = getProductImage(item.name)
                return (
                  <div key={idx} className="header-product-chip">
                    {img ? (
                      <img src={img} alt={item.name} className="header-product-thumb" />
                    ) : (
                      <div className="header-product-thumb placeholder">{item.name.charAt(0)}</div>
                    )}
                    <div className="header-product-info">
                      <span className="header-product-name">{item.name}</span>
                      <span className="header-product-qty">x{item.quantity}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 고객 정보 */}
          <div className="order-section-card">
            <div className="order-section-header">
              <div className="section-icon-wrap customer">
                <span className="section-icon-text">C</span>
              </div>
              <h4>{t.orders.customer}</h4>
            </div>
            <div className="customer-info-grid">
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
                <div className="info-display-field full-width">
                  <label>고객 메모</label>
                  <p className="customer-note">{selectedOrder.customerNotes}</p>
                </div>
              )}
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="order-section-card">
            <div className="order-section-header">
              <div className="section-icon-wrap shipping">
                <span className="section-icon-text">S</span>
              </div>
              <h4>{t.orders.shippingAddress}</h4>
            </div>
            <div className="shipping-address-box">
              <p>{selectedOrder.shippingAddress || '-'}</p>
            </div>
          </div>

          {/* 주문 상품 (읽기 전용) */}
          <div className="order-section-card order-items-section">
            <div className="order-section-header">
              <div className="section-icon-wrap items">
                <span className="section-icon-text">P</span>
              </div>
              <div className="section-header-right">
                <h4>{t.orders.items}</h4>
                <span className="items-count">{selectedOrder.items.length}개 품목</span>
              </div>
            </div>

            {/* 테이블 헤더 */}
            <div className="items-table-header">
              <span className="col-idx"></span>
              <span className="col-name">제품명</span>
              <span className="col-qty">수량</span>
              <span className="col-price">단가</span>
              <span className="col-subtotal">소계</span>
            </div>

            <div className="items-list-wrap">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="order-item-row readonly">
                  <div className="item-index">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="item-name-display">{item.name || '-'}</div>
                  <div className="item-qty-display">{item.quantity}<span className="qty-unit">개</span></div>
                  <div className="item-price-display">${item.price.toLocaleString()}</div>
                  <div className="item-subtotal">${(item.quantity * item.price).toLocaleString()}</div>
                </div>
              ))}
            </div>

            {/* 배송비 */}
            {(selectedOrder.deliveryFee > 0) && (
              <div className="delivery-fee-row readonly">
                <span className="delivery-fee-label">Delivery Fee</span>
                <span className="delivery-fee-value">${(selectedOrder.deliveryFee || 0).toLocaleString()}</span>
              </div>
            )}

            {/* 합계 */}
            <div className="order-total-row">
              <span className="total-label">{t.orders.totalLabel}</span>
              <span className="total-value">${(selectedOrder.total + (selectedOrder.deliveryFee || 0)).toLocaleString()}</span>
            </div>
          </div>

          {/* 진행사항 체크리스트 */}
          <div className="order-checklist-card">
            <div className="order-section-header">
              <div className="section-icon-wrap checklist">
                <span className="section-icon-text">&#x2713;</span>
              </div>
              <h4>진행사항 체크리스트</h4>
            </div>
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
            <div className="order-section-header">
              <div className="section-icon-wrap invoice">
                <span className="section-icon-text">D</span>
              </div>
              <h4>서류 생성</h4>
            </div>
            <p className="invoice-ci-desc">
              주문 정보를 기반으로 PROFORMA INVOICE 또는 COMMERCIAL INVOICE를 생성합니다.
            </p>
            <div className="invoice-ci-buttons">
              <button
                className="invoice-btn proforma"
                onClick={() => onOpenInvoice(selectedOrder)}
              >
                <span className="btn-icon">PI</span>
                <span className="btn-text">
                  <strong>PROFORMA INVOICE</strong>
                  <small>견적 인보이스 생성</small>
                </span>
              </button>
              <button
                className="invoice-btn commercial"
                onClick={() => onOpenCI(selectedOrder)}
              >
                <span className="btn-icon">CI</span>
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
          <div className="order-section-header">
            <div className="section-icon-wrap timeline">
              <span className="section-icon-text">T</span>
            </div>
            <h4>{t.orders.orderTimeline}</h4>
          </div>
          <div className="order-timeline-list">
            {selectedOrder.timeline.map((event, idx) => (
              <div key={idx} className={`timeline-event ${idx === 0 ? 'latest' : ''}`}>
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
