import { useState, useEffect } from 'react'
import './App.css'
import AdminPage from './components/AdminPage'
import AuthPage from './components/AuthPage'
import BuyerDashboard from './components/BuyerDashboard'
import ChatRoom from './components/ChatRoom'
import OrderLookup from './components/OrderLookup'
import ProductDetail from './components/ProductDetail'
import CustomerOrderFlow from './components/CustomerOrderFlow'
import OrderStatusPage from './components/OrderStatusPage'

// 다국어 콘텐츠 - 각 언어를 원문처럼 설계
const content = {
  en: {
    nav: {
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      cta: 'Wholesale Inquiry',
      signIn: 'Sign In',
      myAccount: 'My Account',
      trackOrder: 'Track Order'
    },
    why: {
      title: 'Why Young Cosmed',
      cards: [
        {
          title: 'Global-Ready Products',
          desc: 'Export-ready formulations and packaging compliant with international regulations.'
        },
        {
          title: 'Clear MOQ & Pricing',
          desc: 'Transparent wholesale conditions with no hidden costs or complicated tiers.'
        },
        {
          title: 'Direct Communication',
          desc: 'No middleman. Direct response from our sourcing team within 24 hours.'
        },
        {
          title: 'Curated Selection',
          desc: 'Only verified Korean beauty products from trusted manufacturers.'
        }
      ]
    },
    products: {
      title: 'Young Cosmed Products',
      inquiryBtn: 'Request Bulk Pricing',
      inquiryHint: 'MOQ, pricing and shipping details instantly.',
      viewDetails: 'View Details',
      startInquiry: 'Start Inquiry',
      btnCatalog: 'View Full Catalog',
      medicalNotice: 'Medical aesthetic products are available for licensed buyers only.',
      licensedBadge: 'Licensed buyers only',
      categories: [
        { key: 'all', label: 'All' },
        { key: 'skincare', label: 'Skincare' },
        { key: 'makeup', label: 'Makeup' },
        { key: 'filler', label: 'Dermal Fillers' },
        { key: 'botox', label: 'Botulinum Toxin' }
      ],
      items: [
        { id: 1, name: 'Hydra Glow Serum', category: 'Skincare', categoryKey: 'skincare', moq: '500 units', region: 'EU, US, ASIA', image: '/product1.png' },
        { id: 2, name: 'Velvet Matte Lip Tint', category: 'Makeup', categoryKey: 'makeup', moq: '300 units', region: 'Global', image: '/product2.png' },
        { id: 3, name: 'Cica Repair Cream', category: 'Skincare', categoryKey: 'skincare', moq: '400 units', region: 'EU, ASIA', image: '/product3.png' },
        { id: 4, name: 'Double Cleansing Oil', category: 'Skincare', categoryKey: 'skincare', moq: '600 units', region: 'Global', image: '/product4.png' },
        { id: 5, name: 'Peptide Eye Contour', category: 'Skincare', categoryKey: 'skincare', moq: '350 units', region: 'US, EU', image: '/product5.png' },
        { id: 6, name: 'Tone-Up Sun Shield', category: 'Skincare', categoryKey: 'skincare', moq: '500 units', region: 'Global', image: '/product6.png' },
        { id: 7, name: 'Hyaluronic Filler 1ml', category: 'Dermal Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/product7.png', medical: true },
        { id: 8, name: 'Deep Volume Filler 2ml', category: 'Dermal Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/product8.png', medical: true },
        { id: 9, name: 'Botulinum Type A 100U', category: 'Botulinum Toxin', categoryKey: 'botox', moq: '50 units', region: 'Licensed Only', image: '/product9.png', medical: true },
        { id: 10, name: 'Premium Botox 200U', category: 'Botulinum Toxin', categoryKey: 'botox', moq: '50 units', region: 'Licensed Only', image: '/product10.png', medical: true },
      ]
    },
    cta: {
      title: 'Start your wholesale sourcing with confidence.',
      desc: 'Get in touch with our team for pricing, samples, and partnership opportunities.',
      btn: 'Contact for Wholesale'
    },
    footer: {
      tagline: 'K-Beauty B2B Wholesale Platform',
      platform: 'Platform',
      support: 'Support',
      contact: 'Contact',
      products: 'Products',
      about: 'About Us',
      contactLink: 'Contact',
      guide: 'Wholesale Guide',
      shipping: 'Shipping Info',
      faq: 'FAQ',
      location: 'Seoul, South Korea',
      copyright: '© 2024 Young Cosmed. All rights reserved.'
    }
  },
  ko: {
    nav: {
      products: '제품',
      about: '소개',
      contact: '문의',
      cta: '도매 문의',
      signIn: '로그인',
      myAccount: '마이페이지',
      trackOrder: '주문조회'
    },
    why: {
      title: 'Why Young Cosmed',
      cards: [
        {
          title: '글로벌 규격 충족',
          desc: '국제 규정을 준수하는 수출용 포뮬러와 패키징을 제공합니다.'
        },
        {
          title: '투명한 MOQ와 가격',
          desc: '숨겨진 비용이나 복잡한 단계 없이 명확한 도매 조건을 안내합니다.'
        },
        {
          title: '다이렉트 소통',
          desc: '중간 유통 없이 소싱팀이 24시간 내 직접 응대합니다.'
        },
        {
          title: '검증된 셀렉션',
          desc: '신뢰할 수 있는 제조사의 검증된 K-뷰티 제품만 취급합니다.'
        }
      ]
    },
    products: {
      title: 'Young Cosmed Products',
      inquiryBtn: '대량 견적 요청',
      inquiryHint: 'MOQ, 가격, 배송 정보를 바로 확인하세요.',
      viewDetails: '상세 보기',
      startInquiry: '문의하기',
      btnCatalog: '전체 카탈로그 보기',
      medicalNotice: '의료 미용 제품은 자격을 갖춘 바이어만 구매 가능합니다.',
      licensedBadge: '자격 바이어 전용',
      categories: [
        { key: 'all', label: '전체' },
        { key: 'skincare', label: '스킨케어' },
        { key: 'makeup', label: '메이크업' },
        { key: 'filler', label: '더말 필러' },
        { key: 'botox', label: '보툴리눔 톡신' }
      ],
      items: [
        { id: 1, name: '하이드라 글로우 세럼', category: '스킨케어', categoryKey: 'skincare', moq: '500개', region: 'EU, US, ASIA', image: '/product1.png' },
        { id: 2, name: '벨벳 매트 립틴트', category: '메이크업', categoryKey: 'makeup', moq: '300개', region: 'Global', image: '/product2.png' },
        { id: 3, name: '시카 리페어 크림', category: '스킨케어', categoryKey: 'skincare', moq: '400개', region: 'EU, ASIA', image: '/product3.png' },
        { id: 4, name: '더블 클렌징 오일', category: '스킨케어', categoryKey: 'skincare', moq: '600개', region: 'Global', image: '/product4.png' },
        { id: 5, name: '펩타이드 아이 컨투어', category: '스킨케어', categoryKey: 'skincare', moq: '350개', region: 'US, EU', image: '/product5.png' },
        { id: 6, name: '톤업 선쉴드', category: '스킨케어', categoryKey: 'skincare', moq: '500개', region: 'Global', image: '/product6.png' },
        { id: 7, name: '히알루론 필러 1ml', category: '더말 필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/product7.png', medical: true },
        { id: 8, name: '딥 볼륨 필러 2ml', category: '더말 필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/product8.png', medical: true },
        { id: 9, name: '보툴리눔 타입A 100U', category: '보툴리눔 톡신', categoryKey: 'botox', moq: '50개', region: 'Licensed Only', image: '/product9.png', medical: true },
        { id: 10, name: '프리미엄 보톡스 200U', category: '보툴리눔 톡신', categoryKey: 'botox', moq: '50개', region: 'Licensed Only', image: '/product10.png', medical: true },
      ]
    },
    cta: {
      title: '신뢰할 수 있는 도매 소싱을 시작하세요.',
      desc: '가격, 샘플, 파트너십 기회에 대해 팀에 문의하세요.',
      btn: '도매 문의하기'
    },
    footer: {
      tagline: 'K-뷰티 B2B 도매 플랫폼',
      platform: '플랫폼',
      support: '지원',
      contact: '연락처',
      products: '제품',
      about: '회사 소개',
      contactLink: '문의하기',
      guide: '도매 가이드',
      shipping: '배송 안내',
      faq: '자주 묻는 질문',
      location: '대한민국 서울',
      copyright: '© 2024 Young Cosmed. All rights reserved.'
    }
  }
}

function App() {
  const [lang, setLang] = useState('en')
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatInitialProduct, setChatInitialProduct] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [user, setUser] = useState(null)
  const [isOrderFlowOpen, setIsOrderFlowOpen] = useState(false)
  const [orderFlowProduct, setOrderFlowProduct] = useState(null)
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState(null)
  const t = content[lang]

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('beautylab_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('beautylab_user')
      }
    }
  }, [])

  // Load category from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get('category')
    const validCategories = ['skincare', 'makeup', 'filler', 'botox']
    if (categoryParam && validCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [])

  const toggleLang = (newLang) => {
    setLang(newLang)
  }

  const openChat = (product = null) => {
    setChatInitialProduct(product)
    setIsChatOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeChat = () => {
    setIsChatOpen(false)
    setChatInitialProduct(null)
    document.body.style.overflow = ''
  }

  const openAdmin = () => {
    setIsAdminOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeAdmin = () => {
    setIsAdminOpen(false)
    document.body.style.overflow = ''
  }

  const openAuth = () => {
    setIsAuthOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeAuth = () => {
    setIsAuthOpen(false)
    document.body.style.overflow = ''
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('beautylab_user')
  }

  const openDashboard = () => {
    setIsDashboardOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeDashboard = () => {
    setIsDashboardOpen(false)
    document.body.style.overflow = ''
  }

  const handleAccountClick = () => {
    if (user) {
      openDashboard()
    } else {
      openAuth()
    }
  }

  const navigateToProducts = () => {
    // Scroll to products section
    setTimeout(() => {
      const productsSection = document.getElementById('products')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 0)
  }

  const openOrderLookup = () => {
    setIsOrderLookupOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeOrderLookup = () => {
    setIsOrderLookupOpen(false)
    document.body.style.overflow = ''
  }

  const handleCreateAccountFromLookup = () => {
    closeOrderLookup()
    openAuth()
  }

  const openProductDetail = (productId) => {
    setSelectedProductId(productId)
    document.body.style.overflow = 'hidden'
    // 브라우저 히스토리에 상태 추가
    window.history.pushState({ productId }, '', `#product-${productId}`)
  }

  const closeProductDetail = () => {
    setSelectedProductId(null)
    document.body.style.overflow = ''
    // Product Catalog 섹션으로 스크롤
    setTimeout(() => {
      const productsSection = document.getElementById('products')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 0)
  }

  // 브라우저 뒤로가기 감지
  useEffect(() => {
    const handlePopState = (event) => {
      if (selectedProductId && !event.state?.productId) {
        // 뒤로가기 시 ProductDetail 닫기
        setSelectedProductId(null)
        document.body.style.overflow = ''
        // Product Catalog 섹션으로 스크롤
        setTimeout(() => {
          const productsSection = document.getElementById('products')
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 0)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [selectedProductId])

  // Admin 페이지가 열려있으면 Admin만 렌더링
  if (isAdminOpen) {
    return <AdminPage onClose={closeAdmin} />
  }

  // Auth 페이지가 열려있으면 Auth만 렌더링
  if (isAuthOpen) {
    return <AuthPage lang={lang} onClose={closeAuth} onLogin={handleLogin} />
  }

  // Dashboard가 열려있으면 Dashboard만 렌더링
  if (isDashboardOpen && user) {
    return (
      <BuyerDashboard
        lang={lang}
        user={user}
        onClose={closeDashboard}
        onLogout={handleLogout}
        onNavigateToProducts={() => {
          closeDashboard()
          navigateToProducts()
        }}
      />
    )
  }

  // OrderLookup이 열려있으면 OrderLookup만 렌더링
  if (isOrderLookupOpen) {
    return (
      <OrderLookup
        lang={lang}
        onClose={closeOrderLookup}
        onCreateAccount={handleCreateAccountFromLookup}
      />
    )
  }

  // ChatRoom이 열려있으면 ChatRoom만 렌더링
  if (isChatOpen) {
    return <ChatRoom lang={lang} onClose={closeChat} initialProduct={chatInitialProduct} onNavigateToProducts={() => { closeChat(); navigateToProducts(); }} />
  }

  // 주문 플로우 핸들러
  const openOrderFlow = (product) => {
    setOrderFlowProduct(product)
    setIsOrderFlowOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeOrderFlow = () => {
    setIsOrderFlowOpen(false)
    setOrderFlowProduct(null)
    document.body.style.overflow = ''
  }

  const handleOrderComplete = (orderData) => {
    // 주문 완료 후 주문 상태 페이지로 이동
    closeOrderFlow()
    setCurrentOrderId(orderData.orderId)
    setIsOrderStatusOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeOrderStatus = () => {
    setIsOrderStatusOpen(false)
    setCurrentOrderId(null)
    document.body.style.overflow = ''
  }

  // 제품 상세에서 주문하기 클릭 시
  const handleProductOrder = (productId, productInfo) => {
    // 상세 페이지 닫기
    setSelectedProductId(null)
    document.body.style.overflow = ''
    // 주문 플로우 열기
    openOrderFlow({ id: productId, ...productInfo })
  }

  // 제품 상세에서 문의하기 클릭 시
  const handleProductInquiry = (productId, productInfo) => {
    // 상세 페이지 닫기
    setSelectedProductId(null)
    document.body.style.overflow = ''
    // 채팅창 열기 (제품 정보와 함께)
    openChat({ id: productId, ...productInfo })
  }

  // OrderFlow가 열려있으면 OrderFlow만 렌더링
  if (isOrderFlowOpen && orderFlowProduct) {
    return (
      <CustomerOrderFlow
        product={orderFlowProduct}
        lang={lang}
        onClose={closeOrderFlow}
        onOrderComplete={handleOrderComplete}
      />
    )
  }

  // OrderStatus가 열려있으면 OrderStatus만 렌더링
  if (isOrderStatusOpen && currentOrderId) {
    return (
      <OrderStatusPage
        orderId={currentOrderId}
        lang={lang}
        onClose={closeOrderStatus}
      />
    )
  }

  // ProductDetail이 열려있으면 ProductDetail만 렌더링
  if (selectedProductId) {
    return (
      <ProductDetail
        productId={selectedProductId}
        lang={lang}
        onClose={closeProductDetail}
        onNavigateToProducts={closeProductDetail}
        onInquiry={handleProductInquiry}
        onOrder={handleProductOrder}
      />
    )
  }

  return (
    <div className="app" lang={lang}>
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">Young Cosmed</div>
          <nav className="nav">
            <a href="#products">{t.nav.products}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="header-right">
            <div className="lang-switch">
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => toggleLang('en')}
              >
                EN
              </button>
              <span className="lang-divider">|</span>
              <button
                className={`lang-btn ${lang === 'ko' ? 'active' : ''}`}
                onClick={() => toggleLang('ko')}
              >
                KR
              </button>
            </div>
            <button className="header-track-btn" onClick={openOrderLookup}>
              {t.nav.trackOrder}
            </button>
            {user ? (
              <button className="header-account-btn" onClick={handleAccountClick}>
                {t.nav.myAccount}
              </button>
            ) : (
              <button className="header-account-btn" onClick={handleAccountClick}>
                {t.nav.signIn}
              </button>
            )}
            <button className="header-cta" onClick={openAdmin}>Inquiry Dashboard</button>
          </div>
        </div>
      </header>

      {/* Products Section - First Fold */}
      <section className="products-section products-section-hero" id="products">
        <div className="section-inner">
          <div className="products-header-wrapper">
            <h1 className="products-main-title">{t.products.title}</h1>
            <div className="products-cta-wrapper">
              <button className="products-inquiry-btn" onClick={() => openChat()}>
                <span className="inquiry-btn-text">{t.products.inquiryBtn}</span>
                <span className="inquiry-btn-arrow">→</span>
              </button>
              <span className="products-inquiry-hint">{t.products.inquiryHint}</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {t.products.categories.map((cat) => (
              <button
                key={cat.key}
                className={`category-tab ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.key)
                  // Update URL parameter
                  const url = new URL(window.location.href)
                  if (cat.key === 'all') {
                    url.searchParams.delete('category')
                  } else {
                    url.searchParams.set('category', cat.key)
                  }
                  window.history.replaceState({}, '', url)
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Medical Notice */}
          {(selectedCategory === 'filler' || selectedCategory === 'botox') && (
            <div className="medical-notice">
              {t.products.medicalNotice}
            </div>
          )}

          <div className="products-grid">
            {t.products.items
              .filter(product => selectedCategory === 'all' || product.categoryKey === selectedCategory)
              .map((product) => (
              <div
                className={`product-card ${product.medical ? 'product-card-medical' : ''}`}
                key={product.id}
                onClick={() => openProductDetail(product.id)}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} className="product-img" />
                  {product.medical && (
                    <span className="overlay-licensed">{t.products.licensedBadge}</span>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="why-section" id="about">
        <div className="section-inner">
          <h2 className="section-title">{t.why.title}</h2>
          <div className="why-grid">
            {t.why.cards.map((card, index) => (
              <div className="why-card" key={index}>
                <span className="why-number">0{index + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact">
        <div className="cta-inner">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.desc}</p>
          <a href="mailto:wholesale@youngcosmed.com" className="btn btn-cta">{t.cta.btn}</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo">Young Cosmed</div>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>{t.footer.platform}</h4>
              <a href="#products">{t.footer.products}</a>
              <a href="#about">{t.footer.about}</a>
              <a href="#contact">{t.footer.contactLink}</a>
            </div>
            <div className="footer-col">
              <h4>{t.footer.support}</h4>
              <a href="#">{t.footer.guide}</a>
              <a href="#">{t.footer.shipping}</a>
              <a href="#">{t.footer.faq}</a>
            </div>
            <div className="footer-col">
              <h4>{t.footer.contact}</h4>
              <a href="mailto:wholesale@youngcosmed.com">wholesale@youngcosmed.com</a>
              <p className="footer-address">{t.footer.location}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t.footer.copyright}</p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="https://instagram.com/young_cosmed" aria-label="Instagram" target="_blank" rel="noopener noreferrer">ig</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
