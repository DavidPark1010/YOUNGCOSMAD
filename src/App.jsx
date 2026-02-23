import { useState, useEffect } from 'react'
import './App.css'
import AdminPage from './components/Admin/AdminPage'
import AuthPage from './components/Auth/AuthPage'
import BuyerDashboard from './components/Buyer/BuyerDashboard'
import ChatRoom from './components/Chat/ChatRoom'
import OrderLookup from './components/Order/OrderLookup'
import ProductDetail from './components/Product/ProductDetail'

// 다국어 콘텐츠 - 각 언어를 원문처럼 설계
const content = {
  en: {
    nav: {
      products: 'Products',
      about: 'About',
      contact: 'Contact'
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
          desc: 'Only verified Korean medical aesthetic products from trusted manufacturers.'
        }
      ]
    },
    products: {
      title: 'Products',
      inquiryBtn: 'Request Bulk Pricing',
      viewDetails: 'View Details',
      startInquiry: 'Start Inquiry',
      btnCatalog: 'View Full Catalog',
      medicalNotice: 'All products are available for licensed medical professionals and authorized distributors only.',
      licensedBadge: 'Licensed buyers only',
      categories: [
        { key: 'all', label: 'All' },
        { key: 'filler', label: 'Fillers' },
        { key: 'skinbooster', label: 'Skin Boosters' }
      ],
      items: [
        { id: 1, name: 'Revolax', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/revolax1.png', medical: true },
        { id: 2, name: 'Elasty', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/ELASTY1.png', medical: true },
        { id: 3, name: 'Rejeunesse', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/REJEUNESSE.png', medical: true },
        { id: 4, name: 'Neuramis', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/NEURAMIS.png', medical: true },
        { id: 5, name: 'Regenovue', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/REGENOVUE.png', medical: true },
        { id: 6, name: 'Dermalax', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/DERMALAX.png', medical: true },
        { id: 7, name: 'E.P.T.Q', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/E.P.T.Q.png', medical: true },
        { id: 8, name: 'Sosum', category: 'Skin Boosters', categoryKey: 'skinbooster', moq: '100 units', region: 'Licensed Only', image: '/SOSUM.png', medical: true },
        { id: 9, name: 'Starfill', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/STARFILL.png', medical: true },
        { id: 10, name: 'Line Fill', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/LINE FILL.png', medical: true },
        { id: 11, name: 'Priere', category: 'Skin Boosters', categoryKey: 'skinbooster', moq: '100 units', region: 'Licensed Only', image: '/PRIERE.png', medical: true },
        { id: 12, name: 'Lip Star', category: 'Fillers', categoryKey: 'filler', moq: '100 units', region: 'Licensed Only', image: '/LIP STAR.png', medical: true },
      ]
    },
    cta: {
      title: 'Start your wholesale sourcing with confidence.',
      desc: 'Get in touch with our team for pricing, samples, and partnership opportunities.',
      btn: 'Contact for Wholesale'
    },
    footer: {
      companyName: 'Young Cosmed',
      tagline: 'Medical Aesthetic Products — B2B Wholesale',
      ceo: 'CEO',
      ceoName: 'Eun Young Kwak',
      bizNo: 'Business Reg. No.',
      bizNoValue: '763-58-00698',
      address: 'Address',
      addressValue: '69, Seongsui-ro, Seongdong-gu, Seoul, Republic of Korea',
      email: 'Email',
      emailValue: 'wholesale@youngcosmed.com',
      copyright: '© 2025 Young Cosmed. All rights reserved.'
    }
  },
  ko: {
    nav: {
      products: '제품',
      about: '소개',
      contact: '문의'
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
          desc: '신뢰할 수 있는 제조사의 검증된 의료 미용 제품만 취급합니다.'
        }
      ]
    },
    products: {
      title: 'Products',
      inquiryBtn: '대량 견적 요청',
      viewDetails: '상세 보기',
      startInquiry: '문의하기',
      btnCatalog: '전체 카탈로그 보기',
      medicalNotice: '모든 제품은 의료 전문가 및 인가된 유통업체만 구매 가능합니다.',
      licensedBadge: '자격 바이어 전용',
      categories: [
        { key: 'all', label: '전체' },
        { key: 'filler', label: '필러' },
        { key: 'skinbooster', label: '스킨부스터' }
      ],
      items: [
        { id: 1, name: 'Revolax', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/revolax1.png', medical: true },
        { id: 2, name: 'Elasty', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/ELASTY1.png', medical: true },
        { id: 3, name: 'Rejeunesse', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/REJEUNESSE.png', medical: true },
        { id: 4, name: 'Neuramis', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/NEURAMIS.png', medical: true },
        { id: 5, name: 'Regenovue', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/REGENOVUE.png', medical: true },
        { id: 6, name: 'Dermalax', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/DERMALAX.png', medical: true },
        { id: 7, name: 'E.P.T.Q', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/E.P.T.Q.png', medical: true },
        { id: 8, name: 'Sosum', category: '스킨부스터', categoryKey: 'skinbooster', moq: '100개', region: 'Licensed Only', image: '/SOSUM.png', medical: true },
        { id: 9, name: 'Starfill', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/STARFILL.png', medical: true },
        { id: 10, name: 'Line Fill', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/LINE FILL.png', medical: true },
        { id: 11, name: 'Priere', category: '스킨부스터', categoryKey: 'skinbooster', moq: '100개', region: 'Licensed Only', image: '/PRIERE.png', medical: true },
        { id: 12, name: 'Lip Star', category: '필러', categoryKey: 'filler', moq: '100개', region: 'Licensed Only', image: '/LIP STAR.png', medical: true },
      ]
    },
    cta: {
      title: '신뢰할 수 있는 도매 소싱을 시작하세요.',
      desc: '가격, 샘플, 파트너십 기회에 대해 팀에 문의하세요.',
      btn: '도매 문의하기'
    },
    footer: {
      companyName: 'Young Cosmed',
      tagline: '의료 미용 제품 — B2B 도매',
      ceo: '대표',
      ceoName: '곽은영',
      bizNo: '사업자등록번호',
      bizNoValue: '763-58-00698',
      address: '주소',
      addressValue: '서울특별시 성동구 성수이로 69',
      email: '이메일',
      emailValue: 'wholesale@youngcosmed.com',
      copyright: '© 2025 Young Cosmed. All rights reserved.'
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
    const validCategories = ['filler', 'skinbooster']
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

  // 제품 상세에서 문의하기 클릭 시
  const handleProductInquiry = (productId, productInfo) => {
    // 상세 페이지 닫기
    setSelectedProductId(null)
    document.body.style.overflow = ''
    // 채팅창 열기 (제품 정보와 함께)
    openChat({ id: productId, ...productInfo })
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
            <button className="header-cta" onClick={openAdmin}>
              {lang === 'en' ? 'Dashboard' : '관리자'}
            </button>
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
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">Young Cosmed</div>
              <p className="footer-tagline">{t.footer.tagline}</p>
            </div>
            <div className="footer-nav">
              <a href="#products">{t.nav.products}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#contact">{t.nav.contact}</a>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-info">
            <div className="footer-info-item">
              <span className="footer-info-label">{t.footer.ceo}</span>
              <span className="footer-info-value">{t.footer.ceoName}</span>
            </div>
            <div className="footer-info-item">
              <span className="footer-info-label">{t.footer.bizNo}</span>
              <span className="footer-info-value">{t.footer.bizNoValue}</span>
            </div>
            <div className="footer-info-item">
              <span className="footer-info-label">{t.footer.address}</span>
              <span className="footer-info-value">{t.footer.addressValue}</span>
            </div>
            <div className="footer-info-item">
              <span className="footer-info-label">{t.footer.email}</span>
              <a href={`mailto:${t.footer.emailValue}`} className="footer-info-value footer-email">{t.footer.emailValue}</a>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <p>{t.footer.copyright}</p>
            <div className="footer-social">
              <a href="https://instagram.com/young_cosmed" aria-label="Instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
