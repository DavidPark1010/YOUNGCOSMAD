const PRODUCT_IMAGE_MAP = {
  'Hydra Glow Serum': '/product1.png',
  'Velvet Matte Lip Tint': '/product2.png',
  'Cica Repair Cream': '/product3.png',
  'Double Cleansing Oil': '/product4.png',
  'Peptide Eye Contour': '/product5.png',
  'Tone-Up Sun Shield': '/product6.png',
}

const STATUS_ACTIONS = {
  pending: {
    label: '입금 확인 완료',
    nextStatus: 'paid',
    message: '입금 확인 완료',
    hint: '입금 확인 시 다음 단계로 진행됩니다.',
  },
  paid: {
    label: '배송 시작',
    nextStatus: 'shipped',
    message: '배송 시작',
    hint: '배송이 시작되면 바이어에게 알림됩니다.',
  },
  shipped: {
    label: '배송 완료 처리',
    nextStatus: 'delivered',
    message: '배송 완료',
    hint: '배송 완료 처리 시 주문이 최종 완료됩니다.',
  }
}

const STEPPER_STEPS = [
  { key: 'pending', label: '결제대기', desc: '주문이 접수되었습니다' },
  { key: 'paid', label: '입금확인완료', desc: '입금 확인 시 다음 단계로' },
  { key: 'shipped', label: '배송중', desc: '배송이 시작되면 바이어에게 알림됩니다' },
  { key: 'delivered', label: '배송완료', desc: '최종 배송 완료 처리' },
]

function getStepState(stepKey, currentStatus) {
  const order = ['pending', 'paid', 'shipped', 'delivered']
  const stepIdx = order.indexOf(stepKey)
  const currentIdx = order.indexOf(currentStatus)
  if (stepIdx < currentIdx) return 'completed'
  if (stepIdx === currentIdx) return 'active'
  return 'pending'
}

function getStepDate(stepKey, timeline) {
  const event = timeline.find(e => e.status === stepKey)
  return event ? event.date : null
}

function OrderDetail({
  selectedOrder, setSelectedOrder, orders, setOrders,
  t, notificationSent,
  formatDate, onBack, onOpenInvoice, onOpenCI,
  updateOrderStatus
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
                <label>국가</label>
                <p>{selectedOrder.customerCountry || '-'}</p>
              </div>
              <div className="info-display-field">
                <label>이메일</label>
                <p>{selectedOrder.customerEmail || '-'}</p>
              </div>
              <div className="info-display-field">
                <label>전화번호</label>
                <p>{selectedOrder.customerPhone || '-'}</p>
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

          {/* 서류 확인 */}
          <div className="doc-buttons-row">
            <button className="doc-open-btn pi" onClick={() => onOpenInvoice(selectedOrder)}>
              INVOICE 확인
            </button>
            <button className="doc-open-btn ci" onClick={() => onOpenCI(selectedOrder)}>
              CI 확인
            </button>
          </div>
        </div>

        {/* 주문 진행 스텝퍼 */}
        <div className="order-stepper-card">
          <div className="order-section-header">
            <div className="section-icon-wrap timeline">
              <span className="section-icon-text">T</span>
            </div>
            <h4>주문 진행 상태</h4>
          </div>

          <div className="stepper-steps">
            {STEPPER_STEPS.map((step, idx) => {
              const state = getStepState(step.key, selectedOrder.status)
              const stepDate = getStepDate(step.key, selectedOrder.timeline)
              const isLast = idx === STEPPER_STEPS.length - 1
              const action = STATUS_ACTIONS[selectedOrder.status]
              const isCurrentStep = state === 'active'
              const canAct = isCurrentStep && action

              return (
                <div key={step.key} className={`stepper-step ${state}`}>
                  <div className="stepper-rail">
                    <div className={`stepper-dot ${state}`}>
                      {state === 'completed' && <span className="stepper-check">&#x2713;</span>}
                    </div>
                    {!isLast && <div className={`stepper-line ${state === 'completed' ? 'completed' : ''}`} />}
                  </div>
                  <div className="stepper-content">
                    <span className={`stepper-label ${state}`}>{step.label}</span>
                    {state === 'completed' && stepDate && (
                      <span className="stepper-date">{formatDate(stepDate)}</span>
                    )}
                    {state === 'active' && (
                      <span className="stepper-hint">{step.desc}</span>
                    )}
                    {state === 'pending' && (
                      <span className="stepper-desc">{step.desc}</span>
                    )}
                    {canAct && (
                      <button
                        className="stepper-action-btn"
                        onClick={() => {
                          const confirmMsg = `주문 상태를 '${action.label}'(으)로 변경하시겠습니까?`
                          if (!window.confirm(confirmMsg)) return
                          updateOrderStatus(
                            selectedOrder.id,
                            action.nextStatus,
                            action.message
                          )
                        }}
                      >
                        {action.label} →
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 모든 단계 완료 배너 */}
          {selectedOrder.status === 'delivered' && (
            <div className="stepper-complete-banner">
              <span className="stepper-complete-icon">&#x2713;</span>
              <div className="stepper-complete-text">
                <strong>주문 처리 완료</strong>
                <span>모든 단계가 정상적으로 완료되었습니다.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default OrderDetail
