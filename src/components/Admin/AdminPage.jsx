import { useState } from 'react'
import './styles/layout.css'
import './styles/cards.css'
import './styles/table.css'
import './styles/shared.css'
import { initialInquiries, initialProducts } from './data/adminData'
import uiText from './data/adminI18n'
import InquiryList from './inquiry/InquiryList'
import InquiryDetail from './inquiry/InquiryDetail'
import ProductList from './product/ProductList'
import ProductRegistration from './product/ProductRegistration'
import InvoiceGenerator from './invoice/InvoiceGenerator'
import DeleteModal from './common/DeleteModal'

function AdminPage({ onClose }) {
  const [lang] = useState('ko')
  const [activeMenu, setActiveMenu] = useState('inquiries')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [filter, setFilter] = useState('all')
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [products, setProducts] = useState(initialProducts)
  const [copied, setCopied] = useState(false)

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState(null)

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

  const openProductForm = (product = null) => {
    setEditingProduct(product || null)
    setShowProductForm(true)
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  // === Sidebar menu config ===
  const menuItems = [
    { key: 'inquiries', label: '문의 확인', badge: stats.new > 0 ? stats.new : null },
    { key: 'products', label: '제품 등록/수정', badge: null },
    { key: 'invoice', label: '인보이스 생성', badge: null },
  ]

  const pageTitles = {
    inquiries: '문의 확인',
    products: '제품 등록/수정',
    invoice: '인보이스 생성'
  }

  const handleMenuClick = (key) => {
    setActiveMenu(key)
    if (key === 'inquiries') setSelectedInquiry(null)
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
        </header>

        <div className="admin-content">
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

          {activeMenu === 'invoice' && (
            <InvoiceGenerator />
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
