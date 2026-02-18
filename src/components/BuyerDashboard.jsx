import { useState } from 'react'
import './BuyerDashboard.css'

const uiText = {
  en: {
    title: 'My Account',
    tabs: {
      overview: 'Overview',
      orders: 'Orders',
      inquiries: 'Inquiries',
      profile: 'Profile'
    },
    overview: {
      welcome: 'Welcome back',
      tier: 'Your Tier',
      tierStandard: 'Standard',
      tierVip: 'VIP',
      tierPremium: 'Premium VIP',
      totalSpent: 'Total Spent',
      nextTier: 'until next tier',
      tierProgress: 'Progress to',
      tierReached: 'Highest tier reached',
      activeOrders: 'Active Orders',
      recentInquiries: 'Recent Inquiries',
      noActiveOrders: 'No active orders',
      noRecentInquiries: 'No recent inquiries',
      viewAll: 'View All',
      quickActions: 'Quick Actions',
      browseProducts: 'Browse Products',
      newInquiry: 'New Inquiry'
    },
    tierBenefits: {
      title: 'Your Tier Benefits',
      standard: {
        name: 'Standard',
        threshold: '$0+',
        benefits: [
          'Access to full product catalog',
          'Standard inquiry response (24-48h)',
          'Basic order tracking'
        ]
      },
      vip: {
        name: 'VIP',
        threshold: '$5,000+',
        benefits: [
          'Priority inquiry response (12-24h)',
          'Sample requests with reduced fees',
          'Dedicated account manager',
          'Early access to new products'
        ]
      },
      premium: {
        name: 'Premium VIP',
        threshold: '$15,000+',
        benefits: [
          'Priority inquiry response (under 12h)',
          'Complimentary samples (conditions apply)',
          'Priority shipping & lead times',
          'Exclusive deals & promotions',
          'Custom product recommendations'
        ]
      },
      currentBenefits: 'Your Current Benefits',
      nextTierBenefits: 'Unlock at Next Tier'
    },
    orders: {
      title: 'Order History',
      orderNumber: 'Order #',
      date: 'Date',
      status: 'Status',
      total: 'Total',
      items: 'items',
      noOrders: 'No orders yet',
      noOrdersDesc: 'Your order history will appear here once you make a purchase.',
      viewDetails: 'View Details',
      trackShipment: 'Track Shipment',
      reorder: 'Reorder',
      downloadInvoice: 'Download Invoice',
      statuses: {
        pending: 'Pending Payment',
        paid: 'Paid',
        preparing: 'Preparing',
        shipped: 'Shipped',
        delivered: 'Delivered'
      }
    },
    inquiries: {
      title: 'Inquiries & Quotes',
      inquiryId: 'Inquiry #',
      product: 'Product',
      type: 'Type',
      date: 'Date',
      status: 'Status',
      noInquiries: 'No inquiries yet',
      noInquiriesDesc: 'Your pricing inquiries and quote requests will appear here.',
      types: {
        price: 'Price Inquiry',
        sample: 'Sample Request',
        moq: 'MOQ Inquiry',
        custom: 'Custom Request'
      },
      statuses: {
        received: 'Received',
        reviewing: 'Reviewing',
        quoted: 'Quoted',
        confirmed: 'Confirmed',
        closed: 'Closed'
      }
    },
    profile: {
      title: 'Profile Settings',
      personalInfo: 'Personal Information',
      companyInfo: 'Company Information',
      shippingAddresses: 'Shipping Addresses',
      name: 'Full Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      phonePlaceholder: 'Enter phone number',
      companyName: 'Company Name',
      companyPlaceholder: 'Enter company name',
      businessType: 'Business Type',
      businessTypes: {
        reseller: 'Reseller',
        salon: 'Salon / Spa',
        distributor: 'Distributor',
        online: 'Online Seller',
        other: 'Other'
      },
      country: 'Country',
      countryPlaceholder: 'Select country',
      city: 'City',
      cityPlaceholder: 'Enter city',
      address: 'Address',
      addressPlaceholder: 'Enter full address',
      postalCode: 'Postal Code',
      postalPlaceholder: 'Enter postal code',
      customsNote: 'Customs / Import Notes',
      customsPlaceholder: 'Any special requirements for customs clearance',
      addAddress: 'Add New Address',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      saved: 'Changes saved successfully',
      setDefault: 'Set as Default',
      default: 'Default'
    },
    logout: 'Sign Out',
    back: 'Back'
  },
  ko: {
    title: '마이페이지',
    tabs: {
      overview: '대시보드',
      orders: '주문내역',
      inquiries: '문의내역',
      profile: '프로필'
    },
    overview: {
      welcome: '환영합니다',
      tier: '회원 등급',
      tierStandard: 'Standard',
      tierVip: 'VIP',
      tierPremium: 'Premium VIP',
      totalSpent: '총 구매액',
      nextTier: '다음 등급까지',
      tierProgress: '까지 진행률',
      tierReached: '최고 등급 달성',
      activeOrders: '진행 중인 주문',
      recentInquiries: '최근 문의',
      noActiveOrders: '진행 중인 주문이 없습니다',
      noRecentInquiries: '최근 문의가 없습니다',
      viewAll: '전체 보기',
      quickActions: '빠른 메뉴',
      browseProducts: '제품 둘러보기',
      newInquiry: '새 문의하기'
    },
    tierBenefits: {
      title: '등급별 혜택',
      standard: {
        name: 'Standard',
        threshold: '$0+',
        benefits: [
          '전체 제품 카탈로그 접근',
          '일반 문의 응대 (24-48시간)',
          '기본 주문 추적'
        ]
      },
      vip: {
        name: 'VIP',
        threshold: '$5,000+',
        benefits: [
          '우선 문의 응대 (12-24시간)',
          '샘플 요청 수수료 할인',
          '전담 담당자 배정',
          '신제품 우선 접근'
        ]
      },
      premium: {
        name: 'Premium VIP',
        threshold: '$15,000+',
        benefits: [
          '최우선 문의 응대 (12시간 이내)',
          '무료 샘플 제공 (조건부)',
          '배송 및 리드타임 우선 처리',
          '단독 프로모션 및 특가',
          '맞춤 제품 추천'
        ]
      },
      currentBenefits: '현재 혜택',
      nextTierBenefits: '다음 등급 혜택'
    },
    orders: {
      title: '주문 내역',
      orderNumber: '주문번호',
      date: '날짜',
      status: '상태',
      total: '합계',
      items: '개 상품',
      noOrders: '주문 내역이 없습니다',
      noOrdersDesc: '구매하시면 주문 내역이 여기에 표시됩니다.',
      viewDetails: '상세 보기',
      trackShipment: '배송 추적',
      reorder: '재주문',
      downloadInvoice: '인보이스 다운로드',
      statuses: {
        pending: '결제 대기',
        paid: '결제 완료',
        preparing: '준비 중',
        shipped: '배송 중',
        delivered: '배송 완료'
      }
    },
    inquiries: {
      title: '문의 및 견적',
      inquiryId: '문의번호',
      product: '제품',
      type: '유형',
      date: '날짜',
      status: '상태',
      noInquiries: '문의 내역이 없습니다',
      noInquiriesDesc: '가격 문의 및 견적 요청 내역이 여기에 표시됩니다.',
      types: {
        price: '가격 문의',
        sample: '샘플 요청',
        moq: 'MOQ 문의',
        custom: '기타 요청'
      },
      statuses: {
        received: '접수됨',
        reviewing: '검토 중',
        quoted: '견적 완료',
        confirmed: '확정',
        closed: '종료'
      }
    },
    profile: {
      title: '프로필 설정',
      personalInfo: '개인 정보',
      companyInfo: '회사 정보',
      shippingAddresses: '배송지 관리',
      name: '이름',
      namePlaceholder: '이름을 입력하세요',
      email: '이메일',
      phone: '연락처 / WhatsApp',
      phonePlaceholder: '연락처를 입력하세요',
      companyName: '회사명',
      companyPlaceholder: '회사명을 입력하세요',
      businessType: '사업 유형',
      businessTypes: {
        reseller: '리셀러',
        salon: '살롱 / 스파',
        distributor: '유통업체',
        online: '온라인 셀러',
        other: '기타'
      },
      country: '국가',
      countryPlaceholder: '국가 선택',
      city: '도시',
      cityPlaceholder: '도시를 입력하세요',
      address: '주소',
      addressPlaceholder: '상세 주소를 입력하세요',
      postalCode: '우편번호',
      postalPlaceholder: '우편번호를 입력하세요',
      customsNote: '통관 메모',
      customsPlaceholder: '통관 시 특별 요청 사항',
      addAddress: '새 배송지 추가',
      saveChanges: '변경사항 저장',
      saving: '저장 중...',
      saved: '변경사항이 저장되었습니다',
      setDefault: '기본 배송지로 설정',
      default: '기본'
    },
    logout: '로그아웃',
    back: '뒤로'
  }
}

// Demo data
const demoOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'shipped',
    total: 2450.00,
    itemCount: 3,
    items: ['Hydra Glow Serum x 500', 'Cica Repair Cream x 400', 'Tone-Up Sun Shield x 300']
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-28',
    status: 'preparing',
    total: 1820.00,
    itemCount: 2,
    items: ['Velvet Matte Lip Tint x 300', 'Double Cleansing Oil x 200']
  }
]

const demoInquiries = [
  {
    id: 'INQ-2024-015',
    product: 'Hydra Glow Serum',
    type: 'price',
    date: '2024-02-01',
    status: 'quoted'
  },
  {
    id: 'INQ-2024-016',
    product: 'Peptide Eye Contour',
    type: 'sample',
    date: '2024-02-05',
    status: 'reviewing'
  }
]

function BuyerDashboard({ lang, user, onClose, onLogout, onNavigateToProducts }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    companyName: user?.companyName || '',
    businessType: user?.businessType || '',
    country: user?.country || '',
    city: user?.city || '',
    address: user?.address || '',
    postalCode: user?.postalCode || '',
    customsNote: user?.customsNote || ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const text = uiText[lang]

  // Calculate tier info (demo)
  const totalSpent = 4270 // Demo value
  const tierThresholds = { standard: 0, vip: 5000, premium: 15000 }
  const currentTier = totalSpent >= tierThresholds.premium ? 'premium' : totalSpent >= tierThresholds.vip ? 'vip' : 'standard'
  const nextTier = currentTier === 'standard' ? 'vip' : currentTier === 'vip' ? 'premium' : null
  const nextTierThreshold = nextTier ? tierThresholds[nextTier] : null
  const nextTierAmount = nextTierThreshold ? nextTierThreshold - totalSpent : 0

  // Progress calculation
  const currentTierThreshold = tierThresholds[currentTier]
  const progressStart = currentTier === 'standard' ? 0 : currentTier === 'vip' ? tierThresholds.vip : tierThresholds.premium
  const progressEnd = nextTierThreshold || tierThresholds.premium
  const progressPercent = nextTier
    ? Math.min(100, Math.round(((totalSpent - progressStart) / (progressEnd - progressStart)) * 100))
    : 100

  const getTierLabel = (tier) => {
    switch(tier) {
      case 'vip': return text.overview.tierVip
      case 'premium': return text.overview.tierPremium
      default: return text.overview.tierStandard
    }
  }

  const getTierBenefits = (tier) => {
    switch(tier) {
      case 'vip': return text.tierBenefits.vip
      case 'premium': return text.tierBenefits.premium
      default: return text.tierBenefits.standard
    }
  }

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setSaveMessage('')
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setSaveMessage('')

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update localStorage
    const updatedUser = { ...user, ...profile }
    localStorage.setItem('beautylab_user', JSON.stringify(updatedUser))

    setIsSaving(false)
    setSaveMessage(text.profile.saved)

    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleLogoutClick = () => {
    onLogout()
    onClose()
  }

  const getStatusClass = (status) => {
    switch(status) {
      case 'delivered':
      case 'confirmed':
      case 'quoted':
        return 'success'
      case 'shipped':
      case 'paid':
      case 'reviewing':
        return 'progress'
      case 'pending':
      case 'received':
        return 'pending'
      default:
        return ''
    }
  }

  return (
    <div className="dashboard-overlay">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <button className="dashboard-back" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 10H5M5 10l5-5M5 10l5 5" />
            </svg>
            {text.back}
          </button>
          <h1 className="dashboard-title">{text.title}</h1>
          <button className="dashboard-logout" onClick={handleLogoutClick}>
            {text.logout}
          </button>
        </header>

        {/* Mobile Tab Navigation */}
        <nav className="dashboard-mobile-nav">
          {Object.entries(text.tabs).map(([key, label]) => (
            <button
              key={key}
              className={`mobile-nav-item ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="dashboard-content">
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <nav className="dashboard-nav">
              {Object.entries(text.tabs).map(([key, label]) => (
                <button
                  key={key}
                  className={`nav-item ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {key === 'overview' && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="6" height="6" rx="1" />
                      <rect x="11" y="3" width="6" height="6" rx="1" />
                      <rect x="3" y="11" width="6" height="6" rx="1" />
                      <rect x="11" y="11" width="6" height="6" rx="1" />
                    </svg>
                  )}
                  {key === 'orders' && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 6h14M3 10h14M3 14h10" />
                    </svg>
                  )}
                  {key === 'inquiries' && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h12v12H4z" />
                      <path d="M7 8h6M7 12h4" />
                    </svg>
                  )}
                  {key === 'profile' && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="10" cy="7" r="3" />
                      <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                    </svg>
                  )}
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="dashboard-main">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content overview">
                {/* Welcome & Tier */}
                <div className="overview-header">
                  <div className="welcome-section">
                    <h2>{text.overview.welcome}, {profile.name || user?.email?.split('@')[0]}</h2>
                  </div>
                </div>

                {/* VIP Tier Card */}
                <div className="tier-card" data-tier={currentTier}>
                  <div className="tier-card-header">
                    <div className="tier-info">
                      <span className="tier-label">{text.overview.tier}</span>
                      <div className="tier-name-badge">
                        <span className="tier-name">{getTierLabel(currentTier)}</span>
                        {currentTier === 'premium' && (
                          <svg className="tier-crown" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2 12h12l-1-7-3 3-2-4-2 4-3-3-1 7z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="tier-spent">
                      <span className="spent-label">{text.overview.totalSpent}</span>
                      <span className="spent-value">${totalSpent.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {nextTier ? (
                    <div className="tier-progress-section">
                      <div className="progress-header">
                        <span className="progress-text">
                          {text.overview.tierProgress} {getTierLabel(nextTier)}
                        </span>
                        <span className="progress-amount">
                          ${nextTierAmount.toLocaleString()} {text.overview.nextTier}
                        </span>
                      </div>
                      <div className="tier-progress-bar">
                        <div
                          className="tier-progress-fill"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="progress-labels">
                        <span>${progressStart.toLocaleString()}</span>
                        <span>${progressEnd.toLocaleString()}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="tier-max-reached">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="10" cy="10" r="8" />
                        <path d="M6 10l3 3 5-6" />
                      </svg>
                      <span>{text.overview.tierReached}</span>
                    </div>
                  )}
                </div>

                {/* Tier Benefits */}
                <div className="tier-benefits-section">
                  <h3 className="benefits-section-title">{text.tierBenefits.title}</h3>
                  <div className="tier-benefits-grid">
                    {['standard', 'vip', 'premium'].map((tier) => {
                      const tierData = getTierBenefits(tier)
                      const isCurrentTier = currentTier === tier
                      const isLocked = (tier === 'vip' && currentTier === 'standard') ||
                                       (tier === 'premium' && currentTier !== 'premium')
                      return (
                        <div
                          key={tier}
                          className={`benefit-card ${isCurrentTier ? 'current' : ''} ${isLocked ? 'locked' : ''}`}
                          data-tier={tier}
                        >
                          <div className="benefit-card-header">
                            <span className="benefit-tier-name">{tierData.name}</span>
                            <span className="benefit-threshold">{tierData.threshold}</span>
                            {isCurrentTier && (
                              <span className="current-label">{text.tierBenefits.currentBenefits}</span>
                            )}
                          </div>
                          <ul className="benefit-list">
                            {tierData.benefits.map((benefit, idx) => (
                              <li key={idx}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M2 7l3 3 7-7" />
                                </svg>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Active Orders */}
                <section className="overview-section">
                  <div className="section-header">
                    <h3>{text.overview.activeOrders}</h3>
                    <button className="view-all-btn" onClick={() => setActiveTab('orders')}>
                      {text.overview.viewAll}
                    </button>
                  </div>
                  {demoOrders.filter(o => o.status !== 'delivered').length > 0 ? (
                    <div className="mini-order-list">
                      {demoOrders.filter(o => o.status !== 'delivered').map(order => (
                        <div key={order.id} className="mini-order-card">
                          <div className="order-info">
                            <span className="order-id">{order.id}</span>
                            <span className={`order-status ${getStatusClass(order.status)}`}>
                              {text.orders.statuses[order.status]}
                            </span>
                          </div>
                          <div className="order-meta">
                            <span>${order.total.toLocaleString()}</span>
                            <span>{order.itemCount} {text.orders.items}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-message">{text.overview.noActiveOrders}</p>
                  )}
                </section>

                {/* Recent Inquiries */}
                <section className="overview-section">
                  <div className="section-header">
                    <h3>{text.overview.recentInquiries}</h3>
                    <button className="view-all-btn" onClick={() => setActiveTab('inquiries')}>
                      {text.overview.viewAll}
                    </button>
                  </div>
                  {demoInquiries.length > 0 ? (
                    <div className="mini-inquiry-list">
                      {demoInquiries.slice(0, 2).map(inq => (
                        <div key={inq.id} className="mini-inquiry-card">
                          <div className="inquiry-info">
                            <span className="inquiry-product">{inq.product}</span>
                            <span className="inquiry-type">{text.inquiries.types[inq.type]}</span>
                          </div>
                          <span className={`inquiry-status ${getStatusClass(inq.status)}`}>
                            {text.inquiries.statuses[inq.status]}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-message">{text.overview.noRecentInquiries}</p>
                  )}
                </section>

                {/* Quick Actions */}
                <section className="overview-section">
                  <h3>{text.overview.quickActions}</h3>
                  <div className="quick-actions">
                    <button className="quick-action-btn" onClick={() => {
                      onClose()
                      if (onNavigateToProducts) onNavigateToProducts()
                    }}>
                      {text.overview.browseProducts}
                    </button>
                    <button className="quick-action-btn secondary">
                      {text.overview.newInquiry}
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="tab-content orders">
                <h2 className="tab-title">{text.orders.title}</h2>

                {demoOrders.length > 0 ? (
                  <div className="orders-list">
                    {demoOrders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-id-date">
                            <span className="order-id">{text.orders.orderNumber}{order.id}</span>
                            <span className="order-date">{order.date}</span>
                          </div>
                          <span className={`order-status ${getStatusClass(order.status)}`}>
                            {text.orders.statuses[order.status]}
                          </span>
                        </div>
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="order-item">{item}</span>
                          ))}
                        </div>
                        <div className="order-footer">
                          <span className="order-total">{text.orders.total}: ${order.total.toLocaleString()}</span>
                          <div className="order-actions">
                            {order.status === 'shipped' && (
                              <button className="order-action-btn">{text.orders.trackShipment}</button>
                            )}
                            <button className="order-action-btn">{text.orders.downloadInvoice}</button>
                            {order.status === 'delivered' && (
                              <button className="order-action-btn primary">{text.orders.reorder}</button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 12h32v28H8z" />
                        <path d="M16 12V8h16v4" />
                        <path d="M16 24h16M16 32h10" />
                      </svg>
                    </div>
                    <h3>{text.orders.noOrders}</h3>
                    <p>{text.orders.noOrdersDesc}</p>
                  </div>
                )}
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div className="tab-content inquiries">
                <h2 className="tab-title">{text.inquiries.title}</h2>

                {demoInquiries.length > 0 ? (
                  <div className="inquiries-list">
                    {demoInquiries.map(inq => (
                      <div key={inq.id} className="inquiry-card">
                        <div className="inquiry-header">
                          <span className="inquiry-id">{text.inquiries.inquiryId}{inq.id}</span>
                          <span className={`inquiry-status ${getStatusClass(inq.status)}`}>
                            {text.inquiries.statuses[inq.status]}
                          </span>
                        </div>
                        <div className="inquiry-body">
                          <div className="inquiry-detail">
                            <span className="detail-label">{text.inquiries.product}</span>
                            <span className="detail-value">{inq.product}</span>
                          </div>
                          <div className="inquiry-detail">
                            <span className="detail-label">{text.inquiries.type}</span>
                            <span className="detail-value">{text.inquiries.types[inq.type]}</span>
                          </div>
                          <div className="inquiry-detail">
                            <span className="detail-label">{text.inquiries.date}</span>
                            <span className="detail-value">{inq.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="8" y="8" width="32" height="32" rx="2" />
                        <path d="M16 18h16M16 26h12M16 34h8" />
                      </svg>
                    </div>
                    <h3>{text.inquiries.noInquiries}</h3>
                    <p>{text.inquiries.noInquiriesDesc}</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content profile">
                <h2 className="tab-title">{text.profile.title}</h2>

                {/* Personal Info */}
                <section className="profile-section">
                  <h3>{text.profile.personalInfo}</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>{text.profile.name}</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder={text.profile.namePlaceholder}
                      />
                    </div>
                    <div className="form-field">
                      <label>{text.profile.email}</label>
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="disabled"
                      />
                    </div>
                    <div className="form-field">
                      <label>{text.profile.phone}</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        placeholder={text.profile.phonePlaceholder}
                      />
                    </div>
                  </div>
                </section>

                {/* Company Info */}
                <section className="profile-section">
                  <h3>{text.profile.companyInfo}</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>{text.profile.companyName}</label>
                      <input
                        type="text"
                        value={profile.companyName}
                        onChange={(e) => handleProfileChange('companyName', e.target.value)}
                        placeholder={text.profile.companyPlaceholder}
                      />
                    </div>
                    <div className="form-field">
                      <label>{text.profile.businessType}</label>
                      <select
                        value={profile.businessType}
                        onChange={(e) => handleProfileChange('businessType', e.target.value)}
                      >
                        <option value="">Select...</option>
                        {Object.entries(text.profile.businessTypes).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* Shipping Address */}
                <section className="profile-section">
                  <h3>{text.profile.shippingAddresses}</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>{text.profile.country}</label>
                      <input
                        type="text"
                        value={profile.country}
                        onChange={(e) => handleProfileChange('country', e.target.value)}
                        placeholder={text.profile.countryPlaceholder}
                      />
                    </div>
                    <div className="form-field">
                      <label>{text.profile.city}</label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => handleProfileChange('city', e.target.value)}
                        placeholder={text.profile.cityPlaceholder}
                      />
                    </div>
                    <div className="form-field full-width">
                      <label>{text.profile.address}</label>
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleProfileChange('address', e.target.value)}
                        placeholder={text.profile.addressPlaceholder}
                      />
                    </div>
                    <div className="form-field">
                      <label>{text.profile.postalCode}</label>
                      <input
                        type="text"
                        value={profile.postalCode}
                        onChange={(e) => handleProfileChange('postalCode', e.target.value)}
                        placeholder={text.profile.postalPlaceholder}
                      />
                    </div>
                    <div className="form-field full-width">
                      <label>{text.profile.customsNote}</label>
                      <textarea
                        value={profile.customsNote}
                        onChange={(e) => handleProfileChange('customsNote', e.target.value)}
                        placeholder={text.profile.customsPlaceholder}
                        rows={3}
                      />
                    </div>
                  </div>
                </section>

                {/* Save Button */}
                <div className="profile-actions">
                  {saveMessage && <span className="save-message">{saveMessage}</span>}
                  <button
                    className="save-btn"
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? text.profile.saving : text.profile.saveChanges}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default BuyerDashboard
