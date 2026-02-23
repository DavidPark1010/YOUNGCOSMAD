import { useState, useEffect } from 'react'
import './OrderLookup.css'

const uiText = {
  en: {
    title: 'Track Your Order',
    subtitle: 'Enter your order number and email to check your order status.',
    orderNumber: 'Order Number',
    orderPlaceholder: 'e.g., ORD-2024-001',
    email: 'Email Address',
    emailPlaceholder: 'Email used for the order',
    orText: 'or',
    whatsapp: 'WhatsApp Number',
    whatsappPlaceholder: 'WhatsApp used for the order',
    useEmail: 'Use Email',
    useWhatsapp: 'Use WhatsApp',
    search: 'Track Order',
    searching: 'Searching...',
    back: 'Back',
    tryAgain: 'Try Again',
    errors: {
      orderRequired: 'Please enter your order number',
      contactRequired: 'Please enter your email or WhatsApp number',
      invalidEmail: 'Please enter a valid email address',
      notFound: 'Order not found. Please check your order number and contact information.',
      networkError: 'Network error. Please try again.'
    },
    result: {
      orderNumber: 'Order Number',
      status: 'Status',
      orderDate: 'Order Date',
      estimatedDelivery: 'Estimated Delivery',
      shippingAddress: 'Shipping Address',
      items: 'Items',
      total: 'Total',
      trackingNumber: 'Tracking Number',
      copyTracking: 'Copy',
      copied: 'Copied!',
      timeline: 'Order Timeline',
      needHelp: 'Need help with this order?',
      contactSupport: 'Contact Support'
    },
    statuses: {
      pending: 'Pending Payment',
      paid: 'Payment Confirmed',
      preparing: 'Preparing Shipment',
      shipped: 'Shipped',
      delivered: 'Delivered'
    },
    createAccount: {
      title: 'Want easier order tracking?',
      desc: 'Create an account to track all your orders in one place.',
      btn: 'Create Account'
    }
  },
  ko: {
    title: '주문 조회',
    subtitle: '주문번호와 이메일을 입력하여 주문 상태를 확인하세요.',
    orderNumber: '주문번호',
    orderPlaceholder: '예: ORD-2024-001',
    email: '이메일 주소',
    emailPlaceholder: '주문 시 사용한 이메일',
    orText: '또는',
    whatsapp: 'WhatsApp 번호',
    whatsappPlaceholder: '주문 시 사용한 WhatsApp 번호',
    useEmail: '이메일로 조회',
    useWhatsapp: 'WhatsApp으로 조회',
    search: '주문 조회',
    searching: '조회 중...',
    back: '뒤로',
    tryAgain: '다시 조회',
    errors: {
      orderRequired: '주문번호를 입력해주세요',
      contactRequired: '이메일 또는 WhatsApp 번호를 입력해주세요',
      invalidEmail: '유효한 이메일 주소를 입력해주세요',
      notFound: '주문을 찾을 수 없습니다. 주문번호와 연락처 정보를 확인해주세요.',
      networkError: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
    },
    result: {
      orderNumber: '주문번호',
      status: '상태',
      orderDate: '주문일',
      estimatedDelivery: '예상 배송일',
      shippingAddress: '배송지',
      items: '주문 상품',
      total: '합계',
      trackingNumber: '운송장 번호',
      copyTracking: '복사',
      copied: '복사됨!',
      timeline: '주문 진행 상황',
      needHelp: '이 주문에 대해 도움이 필요하신가요?',
      contactSupport: '고객지원 문의'
    },
    statuses: {
      pending: '결제 대기',
      paid: '결제 완료',
      preparing: '배송 준비 중',
      shipped: '배송 중',
      delivered: '배송 완료'
    },
    createAccount: {
      title: '더 쉬운 주문 조회를 원하시나요?',
      desc: '계정을 만들어 모든 주문을 한 곳에서 관리하세요.',
      btn: '회원가입'
    }
  }
}

// Demo order data
const demoOrders = {
  'ORD-2024-001': {
    email: 'buyer@example.com',
    whatsapp: '+1234567890',
    status: 'shipped',
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-25',
    shippingAddress: '123 Business St, Suite 100, New York, NY 10001, USA',
    items: [
      { name: 'Hydra Glow Serum', quantity: 500, price: 4.50 },
      { name: 'Cica Repair Cream', quantity: 400, price: 3.80 },
      { name: 'Tone-Up Sun Shield', quantity: 300, price: 3.20 }
    ],
    total: 4810.00,
    trackingNumber: 'KR1234567890',
    timeline: [
      { status: 'pending', date: '2024-01-15 09:00', completed: true },
      { status: 'paid', date: '2024-01-15 14:30', completed: true },
      { status: 'preparing', date: '2024-01-17 10:00', completed: true },
      { status: 'shipped', date: '2024-01-19 16:00', completed: true },
      { status: 'delivered', date: null, completed: false }
    ]
  },
  'ORD-2024-002': {
    email: 'test@example.com',
    whatsapp: '+9876543210',
    status: 'preparing',
    orderDate: '2024-01-28',
    estimatedDelivery: '2024-02-07',
    shippingAddress: '456 Commerce Ave, Los Angeles, CA 90001, USA',
    items: [
      { name: 'Velvet Matte Lip Tint', quantity: 300, price: 2.90 },
      { name: 'Double Cleansing Oil', quantity: 200, price: 4.40 }
    ],
    total: 1750.00,
    trackingNumber: null,
    timeline: [
      { status: 'pending', date: '2024-01-28 11:00', completed: true },
      { status: 'paid', date: '2024-01-28 15:00', completed: true },
      { status: 'preparing', date: '2024-01-30 09:00', completed: true },
      { status: 'shipped', date: null, completed: false },
      { status: 'delivered', date: null, completed: false }
    ]
  }
}

function OrderLookup({ lang, onClose, onCreateAccount }) {
  const [step, setStep] = useState('search') // 'search' or 'result'
  const [contactMethod, setContactMethod] = useState('email')
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderResult, setOrderResult] = useState(null)
  const [copiedTracking, setCopiedTracking] = useState(false)

  const text = uiText[lang]

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSearch = async () => {
    setError('')

    // Demo mode: skip order number validation
    // In production, uncomment the validation below
    /*
    if (!orderNumber.trim()) {
      setError(text.errors.orderRequired)
      return
    }
    */

    // Demo mode: skip contact validation
    // In production, uncomment the validation below
    /*
    if (contactMethod === 'email') {
      if (!email.trim()) {
        setError(text.errors.contactRequired)
        return
      }
      if (!validateEmail(email)) {
        setError(text.errors.invalidEmail)
        return
      }
    } else {
      if (!whatsapp.trim()) {
        setError(text.errors.contactRequired)
        return
      }
    }
    */

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Demo lookup - accept any input for testing
    // Try to find exact match first, otherwise return first demo order
    let order = demoOrders[orderNumber.toUpperCase()]
    let displayOrderNumber = orderNumber.toUpperCase()

    if (!order) {
      // For demo: return first demo order with user's input as order number
      order = demoOrders['ORD-2024-001']
      displayOrderNumber = orderNumber.trim() || 'ORD-2024-001'
    }

    setOrderResult({ ...order, orderNumber: displayOrderNumber })
    setStep('result')

    setIsLoading(false)
  }

  const handleTryAgain = () => {
    setStep('search')
    setOrderResult(null)
    setError('')
  }

  const handleCopyTracking = () => {
    if (orderResult?.trackingNumber) {
      navigator.clipboard.writeText(orderResult.trackingNumber)
      setCopiedTracking(true)
      setTimeout(() => setCopiedTracking(false), 2000)
    }
  }

  const getStatusIndex = (status) => {
    const statuses = ['pending', 'paid', 'preparing', 'shipped', 'delivered']
    return statuses.indexOf(status)
  }

  return (
    <div className="order-lookup-overlay">
      <div className="order-lookup-container">
        {/* Header */}
        <header className="order-lookup-header">
          <button className="lookup-back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 10H5M5 10l5-5M5 10l5 5" />
            </svg>
            {text.back}
          </button>
        </header>

        <div className="order-lookup-content">
          {step === 'search' ? (
            <div className="lookup-search-section">
              <div className="lookup-search-header">
                <h1 className="lookup-title">{text.title}</h1>
                <p className="lookup-subtitle">{text.subtitle}</p>
              </div>

              <div className="lookup-form">
                {/* Order Number */}
                <div className="lookup-field">
                  <label>{text.orderNumber}</label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => {
                      setOrderNumber(e.target.value)
                      setError('')
                    }}
                    placeholder={text.orderPlaceholder}
                    autoFocus
                  />
                </div>

                {/* Contact Method Toggle */}
                <div className="contact-method-toggle">
                  <button
                    className={`method-btn ${contactMethod === 'email' ? 'active' : ''}`}
                    onClick={() => setContactMethod('email')}
                  >
                    {text.useEmail}
                  </button>
                  <button
                    className={`method-btn ${contactMethod === 'whatsapp' ? 'active' : ''}`}
                    onClick={() => setContactMethod('whatsapp')}
                  >
                    {text.useWhatsapp}
                  </button>
                </div>

                {/* Email or WhatsApp */}
                {contactMethod === 'email' ? (
                  <div className="lookup-field">
                    <label>{text.email}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      placeholder={text.emailPlaceholder}
                    />
                  </div>
                ) : (
                  <div className="lookup-field">
                    <label>{text.whatsapp}</label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(e.target.value)
                        setError('')
                      }}
                      placeholder={text.whatsappPlaceholder}
                    />
                  </div>
                )}

                {error && <p className="lookup-error">{error}</p>}

                <button
                  className="lookup-submit-btn"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? text.searching : text.search}
                </button>
              </div>

              {/* Create Account CTA */}
              <div className="lookup-create-account">
                <h4>{text.createAccount.title}</h4>
                <p>{text.createAccount.desc}</p>
                <button className="create-account-btn" onClick={onCreateAccount}>
                  {text.createAccount.btn}
                </button>
              </div>
            </div>
          ) : (
            <div className="lookup-result-section">
              {/* Order Status Card */}
              <div className="order-status-card">
                <div className="status-header">
                  <div className="status-order-info">
                    <span className="status-label">{text.result.orderNumber}</span>
                    <span className="status-order-number">{orderResult.orderNumber}</span>
                  </div>
                  <div className={`status-badge ${orderResult.status}`}>
                    {text.statuses[orderResult.status]}
                  </div>
                </div>

                {/* Timeline */}
                <div className="order-timeline">
                  <h4>{text.result.timeline}</h4>
                  <div className="timeline-steps">
                    {orderResult.timeline.map((step, index) => (
                      <div
                        key={step.status}
                        className={`timeline-step ${step.completed ? 'completed' : ''} ${orderResult.status === step.status ? 'current' : ''}`}
                      >
                        <div className="timeline-dot">
                          {step.completed && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div className="timeline-content">
                          <span className="timeline-status">{text.statuses[step.status]}</span>
                          {step.date && <span className="timeline-date">{step.date}</span>}
                        </div>
                        {index < orderResult.timeline.length - 1 && (
                          <div className={`timeline-line ${step.completed ? 'completed' : ''}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Number */}
                {orderResult.trackingNumber && (
                  <div className="tracking-info">
                    <span className="tracking-label">{text.result.trackingNumber}</span>
                    <div className="tracking-value">
                      <span>{orderResult.trackingNumber}</span>
                      <button className="copy-btn" onClick={handleCopyTracking}>
                        {copiedTracking ? text.result.copied : text.result.copyTracking}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Details */}
              <div className="order-details-card">
                <div className="detail-row">
                  <span className="detail-label">{text.result.orderDate}</span>
                  <span className="detail-value">{orderResult.orderDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{text.result.estimatedDelivery}</span>
                  <span className="detail-value">{orderResult.estimatedDelivery}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{text.result.shippingAddress}</span>
                  <span className="detail-value">{orderResult.shippingAddress}</span>
                </div>

                <div className="order-items-section">
                  <span className="detail-label">{text.result.items}</span>
                  <div className="order-items-list">
                    {orderResult.items.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">x {item.quantity}</span>
                        <span className="item-price">${(item.quantity * item.price).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-total-row">
                    <span className="total-label">{text.result.total}</span>
                    <span className="total-value">${orderResult.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="result-actions">
                <button className="try-again-btn" onClick={handleTryAgain}>
                  {text.tryAgain}
                </button>
                <div className="support-link">
                  <span>{text.result.needHelp}</span>
                  <a href="mailto:support@youngcosmed.com">{text.result.contactSupport}</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderLookup
