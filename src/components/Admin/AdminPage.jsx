import { useState } from 'react'
import './styles/layout.css'
import './styles/cards.css'
import './styles/table.css'
import './styles/shared.css'
import { initialInquiries, initialOrders, initialProducts } from './data/adminData'
import uiText from './data/adminI18n'
import Dashboard from './dashboard/Dashboard'
import InquiryList from './inquiry/InquiryList'
import InquiryDetail from './inquiry/InquiryDetail'
import OrderList from './order/OrderList'
import OrderDetail from './order/OrderDetail'
import ProductList from './product/ProductList'
import ProductRegistration from './product/ProductRegistration'
import Settings from './settings/Settings'
import DeleteModal from './common/DeleteModal'

function AdminPage({ onClose }) {
  const [lang] = useState('ko')
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all')
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [orders, setOrders] = useState(initialOrders)
  const [products, setProducts] = useState(initialProducts)
  const [copied, setCopied] = useState(false)
  const [trackingInput, setTrackingInput] = useState('')
  const [notificationSent, setNotificationSent] = useState(false)

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Settings State
  const [settings, setSettings] = useState({
    adminName: '관리자',
    adminEmail: 'admin@youngcosmed.com',
    defaultResponse: '관심 가져주셔서 감사합니다. 정확한 가격 정보는 영업팀에서 개별적으로 안내드리겠습니다.',
    priceInquiryMessage: '정확한 가격은 저희 영업팀에서 직접 연락드려 안내해드리겠습니다.\n연락 받으실 수 있는 방법을 알려주세요!',
    contactMethods: [
      { id: 1, name: 'WhatsApp', enabled: true },
      { id: 2, name: '이메일', enabled: true }
    ],
    defaultLang: 'ko'
  })
  const [settingsSaved, setSettingsSaved] = useState(false)

  // 공통 응답 정책 State
  const [aiPolicy, setAiPolicy] = useState({
    globalSystemPrompt: `Young Cosmed는 한국 서울에 본사를 둔 정식 등록 B2B 도매 전문 기업입니다.
모든 제품은 글로벌 수출 인증(CE, FDA, CPNP 등)을 보유하고 있습니다.
전문적이고 신뢰할 수 있는 비즈니스 파트너로서 응대하세요.`,
    priceListPolicy: `전체 가격표는 공개하지 않습니다.
제품별 상담 후 개별 견적을 제공하는 것이 원칙입니다.
MOQ 및 거래 조건 확인 후 가격을 안내합니다.
대량 주문 시 별도 할인 협의가 가능합니다.`,
    trustPolicy: `Young Cosmed는 대한민국에 정식 등록된 법인입니다.
안전한 거래 프로세스를 갖추고 있으며, 공식 결제 절차를 통해 진행됩니다.
필요 시 사업자등록증, 수출 인증서 등 회사 정보를 제공할 수 있습니다.
감정적 대응을 피하고 항상 전문적인 톤을 유지합니다.`,
    paymentMethods: [
      { id: 1, name: 'Wire Transfer', enabled: true },
      { id: 2, name: 'T/T (전신환송금)', enabled: true }
    ],
    paymentGuideText: '결제는 T/T(전신환송금) 또는 Wire Transfer를 통해 진행됩니다. 주문 확정 후 인보이스를 발행해 드리며, 입금 확인 후 출고가 진행됩니다.',
    priceDisclosure: {
      neverDisclose: false,
      afterMoqConfirm: true,
      samplePricePolicy: false
    },
    responseTone: 'professional',
    restrictions: {
      noRetailPrice: true,
      noCompetitorComparison: true,
      noMedicalGuidance: true,
      noLegalLiability: true
    }
  })

  const t = uiText[lang]

  // === Computed ===
  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'newOnly') return inq.status === 'new'
    if (filter === 'whatsapp') return inq.contactMethod === 'whatsapp'
    if (filter === 'email') return inq.contactMethod === 'email'
    return true
  })

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    responded: inquiries.filter(i => i.status === 'responded').length
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => ['paid', 'preparing'].includes(o.status)).length,
    shipped: orders.filter(o => o.status === 'shipped').length
  }

  // === Formatters ===
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    if (lang === 'ko') {
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? '오후' : '오전'
      const hour12 = hours % 12 || 12
      return `${month}월 ${day}일 ${ampm} ${hour12}:${minutes}`
    }
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  const formatDateShort = (timestamp) => {
    const date = new Date(timestamp)
    if (lang === 'ko') {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // === Handlers ===
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries(prev => prev.map(inq =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    ))
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }))
    }
  }

  const updateOrderStatus = (orderId, newStatus, tracking = null) => {
    const now = new Date().toISOString()
    const statusMessage = t.orders.statusMessages[newStatus].replace('{tracking}', tracking || '')

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          trackingNumber: tracking || order.trackingNumber,
          updatedAt: now,
          timeline: [...order.timeline, { status: newStatus, date: now, message: statusMessage }]
        }
      }
      return order
    }))

    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({
        ...prev,
        status: newStatus,
        trackingNumber: tracking || prev.trackingNumber,
        updatedAt: now,
        timeline: [...prev.timeline, { status: newStatus, date: now, message: statusMessage }]
      }))
    }

    setNotificationSent(true)
    setTimeout(() => setNotificationSent(false), 3000)
  }

  const openProductForm = (product = null) => {
    setEditingProduct(product || null)
    setShowProductForm(true)
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  const saveSettings = () => {
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2000)
  }

  // === Sidebar menu config ===
  const menuItems = [
    { key: 'dashboard', label: '홈', desc: '전체 현황을 한눈에 봅니다', badge: null },
    { key: 'inquiries', label: '가격 문의 확인', desc: '바이어 문의 내역을 확인합니다', badge: stats.new > 0 ? stats.new : null },
    { key: 'orders', label: '주문 확인', desc: '주문 상태를 확인하고 변경합니다', badge: orderStats.pending > 0 ? orderStats.pending : null },
    { key: 'products', label: '제품 등록/수정', desc: '제품을 새로 등록하거나 수정합니다', badge: null },
    { key: 'settings', label: '공통 응답 설정', desc: '바이어에게 답변하는 방식을 설정합니다', badge: null },
  ]

  const pageTitles = {
    dashboard: '홈',
    inquiries: '가격 문의 확인',
    orders: '주문 확인',
    products: '제품 등록/수정',
    settings: '공통 응답 설정'
  }

  const handleMenuClick = (key) => {
    setActiveMenu(key)
    if (key === 'dashboard' || key === 'inquiries') setSelectedInquiry(null)
    if (key === 'orders') setSelectedOrder(null)
    if (key === 'products') setShowProductForm(false)
  }

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">관리자</div>
        <nav className="admin-nav">
          {menuItems.map(item => (
            <button
              key={item.key}
              className={`admin-nav-item ${activeMenu === item.key ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.key)}
            >
              <span>{item.label}</span>
              <span className="nav-desc">{item.desc}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <button className="admin-back-btn" onClick={onClose}>
          ← 사이트로 돌아가기
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1 className="admin-page-title">{pageTitles[activeMenu]}</h1>
          <div className="admin-header-right">
            <div className="admin-user">
              <button className="admin-logout">로그아웃</button>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {activeMenu === 'dashboard' && (
            <Dashboard
              t={t}
              stats={stats}
              inquiries={inquiries}
              formatDate={formatDate}
              onGoToInquiries={() => setActiveMenu('inquiries')}
              onSelectInquiry={(inq) => { setActiveMenu('inquiries'); setSelectedInquiry(inq) }}
            />
          )}

          {activeMenu === 'inquiries' && !selectedInquiry && (
            <InquiryList
              t={t}
              filteredInquiries={filteredInquiries}
              stats={stats}
              filter={filter}
              setFilter={setFilter}
              formatDate={formatDate}
              onSelectInquiry={setSelectedInquiry}
            />
          )}

          {activeMenu === 'inquiries' && selectedInquiry && (
            <InquiryDetail
              t={t}
              inquiry={selectedInquiry}
              copied={copied}
              onCopy={handleCopy}
              onUpdateStatus={updateInquiryStatus}
              onBack={() => setSelectedInquiry(null)}
            />
          )}

          {activeMenu === 'orders' && !selectedOrder && (
            <OrderList
              t={t}
              orders={orders}
              orderStats={orderStats}
              lang={lang}
              formatDateShort={formatDateShort}
              onSelectOrder={(order) => {
                setSelectedOrder(order)
                setTrackingInput(order.trackingNumber || '')
              }}
            />
          )}

          {activeMenu === 'orders' && selectedOrder && (
            <OrderDetail
              t={t}
              order={selectedOrder}
              formatDate={formatDate}
              trackingInput={trackingInput}
              setTrackingInput={setTrackingInput}
              notificationSent={notificationSent}
              onUpdateStatus={updateOrderStatus}
              onBack={() => setSelectedOrder(null)}
            />
          )}

          {activeMenu === 'products' && !showProductForm && (
            <ProductList
              products={products}
              formatDateShort={formatDateShort}
              onOpenForm={openProductForm}
              onDeleteConfirm={setDeleteConfirm}
            />
          )}

          {activeMenu === 'products' && showProductForm && (
            <ProductRegistration
              onClose={() => setShowProductForm(false)}
              onSave={() => setShowProductForm(false)}
              editProduct={editingProduct}
            />
          )}

          {activeMenu === 'settings' && (
            <Settings
              settings={settings}
              setSettings={setSettings}
              aiPolicy={aiPolicy}
              setAiPolicy={setAiPolicy}
              settingsSaved={settingsSaved}
              onSave={saveSettings}
            />
          )}
        </div>
      </main>

      {deleteConfirm && (
        <DeleteModal
          t={t}
          onCancel={() => setDeleteConfirm(null)}
          onDelete={() => deleteProduct(deleteConfirm)}
        />
      )}
    </div>
  )
}

export default AdminPage
