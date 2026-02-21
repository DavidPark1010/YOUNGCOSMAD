import { useState } from 'react'
import './AdminPage.css'
import ProductRegistration from '../product/ProductRegistration'
import { initialOrders, initialProducts } from './constants/sampleData'
import { companyInfo } from './constants/companyInfo'
import { uiText } from './constants/adminUiText'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import OrdersList from './components/OrdersList'
import OrderDetail from './components/OrderDetail'
import ProductsList from './components/ProductsList'
import SettingsPage from './components/SettingsPage'
import ProformaInvoiceModal from './components/ProformaInvoiceModal'
import CommercialInvoiceModal from './components/CommercialInvoiceModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'

function AdminPage({ onClose }) {
  const [lang] = useState('ko')
  const [activeMenu, setActiveMenu] = useState('orders')
  const [selectedOrder, setSelectedOrder] = useState(null)

  // localStorage의 customer_orders 통합
  const [orders, setOrders] = useState(() => {
    const customerOrders = JSON.parse(localStorage.getItem('customer_orders') || '[]')
    const convertedOrders = customerOrders.map(co => ({
      id: co.orderId,
      refNo: co.orderId.replace('ORD-', 'EY'),
      customerEmail: co.customer.email,
      customerName: co.customer.contactPerson,
      customerCompany: co.customer.companyName,
      customerPhone: co.customer.phone,
      customerAddress: co.customer.address + ', ' + co.customer.city + ' ' + (co.customer.postalCode || ''),
      customerCountry: co.country,
      status: co.status || 'pending',
      trackingNumber: null,
      items: [{
        name: co.product.name,
        nameKr: co.product.name,
        quantity: co.quantity,
        price: co.pricing.discountedPrice,
        image: co.product.image
      }],
      total: co.pricing.total,
      deliveryFee: co.pricing.shipping,
      shippingAddress: co.customer.address + ', ' + co.customer.city + ' ' + (co.customer.postalCode || '') + ', ' + co.country,
      createdAt: co.date,
      updatedAt: co.date,
      checklist: {
        contactConfirmed: true,
        priceAgreed: true,
        invoiceSent: false,
        paymentConfirmed: false,
        productPrepared: false,
        ciCreated: false,
        shipped: false,
        delivered: false
      },
      invoiceData: {
        paymentTerm: 'T/T in Advance',
        estimatedDelivery: 'After receipt of payment',
        shipment: 'Forwarder',
        validity: '1 WEEK',
        warranty: '1 YEAR',
        incoterms: 'Exwork',
        customsCode: '3304-99-9000',
        portOfLoading: 'KOREA',
        finalDestination: co.country,
        vessel: '',
        sailingDate: ''
      },
      timeline: [
        { status: 'pending', date: co.date, message: '주문 접수 (고객 직접 주문)' }
      ],
      sourceType: 'customer_direct',
      memos: [],
      customerNotes: co.customer.notes || ''
    }))
    return [...convertedOrders, ...initialOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  const [products, setProducts] = useState(initialProducts)
  const [trackingInput, setTrackingInput] = useState('')
  const [notificationSent, setNotificationSent] = useState(false)

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productIdError, setProductIdError] = useState(false)
  const [productForm, setProductForm] = useState({
    productId: '', nameEn: '', nameKr: '', category: 'Skincare',
    description: '', ingredients: '', usage: '', exportReady: true,
    certifications: '', moq: '', markets: '',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: [], mediaVideo: '', status: 'active'
  })

  // Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Invoice/CI Modal State
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCIModal, setShowCIModal] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)

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
    priceDisclosure: { neverDisclose: false, afterMoqConfirm: true, samplePricePolicy: false },
    responseTone: 'professional',
    restrictions: {
      noRetailPrice: true,
      noCompetitorComparison: true,
      noMedicalGuidance: true,
      noLegalLiability: true
    }
  })

  const t = uiText[lang]

  // --- Helpers ---
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const formatDateShort = (timestamp) => {
    const date = new Date(timestamp)
    if (lang === 'ko') {
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}월 ${day}일`
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // --- Order Handlers ---
  const deleteOrder = (orderId) => {
    if (window.confirm(lang === 'ko' ? '정말 이 주문을 삭제하시겠습니까?' : 'Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== orderId))
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null)
      }
    }
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => ['paid', 'preparing'].includes(o.status)).length,
    shipped: orders.filter(o => o.status === 'shipped').length
  }

  // --- Product Handlers ---
  const openProductForm = (product = null) => {
    setProductIdError(false)
    if (product) {
      setEditingProduct(product)
      setProductForm({
        productId: product.productId || '',
        nameEn: product.nameEn, nameKr: product.nameKr, category: product.category,
        description: product.description, ingredients: product.ingredients,
        usage: product.usage || '', exportReady: product.exportReady,
        certifications: product.certifications || product.exportNote || '',
        moq: product.moq, markets: product.markets,
        priceResponse: product.priceResponse || 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
        mediaImages: product.mediaImages || [product.image],
        mediaVideo: product.mediaVideo || '', status: product.status
      })
    } else {
      setEditingProduct(null)
      setProductForm({
        productId: '', nameEn: '', nameKr: '', category: 'Skincare',
        description: '', ingredients: '', usage: '', exportReady: true,
        certifications: '', moq: '', markets: '',
        priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
        mediaImages: [], mediaVideo: '', status: 'active'
      })
    }
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

  // --- Invoice Handlers ---
  const handleOpenInvoice = (order) => {
    setEditingInvoice({ ...order, invoiceData: order.invoiceData || {} })
    setShowInvoiceModal(true)
  }

  const handleOpenCI = (order) => {
    setEditingInvoice({ ...order, invoiceData: order.invoiceData || {} })
    setShowCIModal(true)
  }

  // --- Sidebar Reset ---
  const handleResetSelection = (menu) => {
    if (menu === 'orders') setSelectedOrder(null)
    if (menu === 'products') setShowProductForm(false)
  }

  return (
    <div className="admin-page">
      <AdminSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        orderStats={orderStats}
        onClose={onClose}
        onResetSelection={handleResetSelection}
      />

      <main className="admin-main">
        <AdminHeader activeMenu={activeMenu} />

        <div className="admin-content">
          {/* Orders List */}
          {activeMenu === 'orders' && !selectedOrder && (
            <OrdersList
              orders={orders}
              orderStats={orderStats}
              t={t}
              lang={lang}
              onSelectOrder={(order) => {
                setSelectedOrder(order)
                setTrackingInput(order.trackingNumber || '')
              }}
              onDeleteOrder={deleteOrder}
              formatDateShort={formatDateShort}
            />
          )}

          {/* Order Detail */}
          {activeMenu === 'orders' && selectedOrder && (
            <OrderDetail
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              orders={orders}
              setOrders={setOrders}
              t={t}
              trackingInput={trackingInput}
              setTrackingInput={setTrackingInput}
              notificationSent={notificationSent}
              formatDate={formatDate}
              onBack={() => setSelectedOrder(null)}
              onOpenInvoice={handleOpenInvoice}
              onOpenCI={handleOpenCI}
            />
          )}

          {/* Products List */}
          {activeMenu === 'products' && !showProductForm && (
            <ProductsList
              products={products}
              formatDateShort={formatDateShort}
              onEdit={openProductForm}
              onDelete={(id) => setDeleteConfirm(id)}
            />
          )}

          {/* Product Form */}
          {activeMenu === 'products' && showProductForm && (
            <ProductRegistration
              onClose={() => setShowProductForm(false)}
              onSave={() => setShowProductForm(false)}
              editProduct={editingProduct}
            />
          )}

          {/* Settings */}
          {activeMenu === 'settings' && (
            <SettingsPage
              settings={settings}
              setSettings={setSettings}
              aiPolicy={aiPolicy}
              setAiPolicy={setAiPolicy}
              onSave={saveSettings}
              settingsSaved={settingsSaved}
            />
          )}
        </div>
      </main>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          t={t}
          onCancel={() => setDeleteConfirm(null)}
          onDelete={() => deleteProduct(deleteConfirm)}
        />
      )}

      {/* PROFORMA INVOICE Modal */}
      {showInvoiceModal && editingInvoice && (
        <ProformaInvoiceModal
          editingInvoice={editingInvoice}
          setEditingInvoice={setEditingInvoice}
          companyInfo={companyInfo}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}

      {/* COMMERCIAL INVOICE (CI) Modal */}
      {showCIModal && editingInvoice && (
        <CommercialInvoiceModal
          editingInvoice={editingInvoice}
          setEditingInvoice={setEditingInvoice}
          companyInfo={companyInfo}
          onClose={() => setShowCIModal(false)}
        />
      )}
    </div>
  )
}

export default AdminPage
