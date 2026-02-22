import { useState } from 'react'
import './AdminPage.css'
import ProductRegistration from '../product/ProductRegistration'
import { companyInfo } from './constants/companyInfo'
import { uiText } from './constants/adminUiText'
import { formatDate, formatDateShort } from './utils/formatDate'
import { useOrders } from './hooks/useOrders'
import { useProducts } from './hooks/useProducts'
import { useSettings } from './hooks/useSettings'
import { useInvoice } from './hooks/useInvoice'
import { useInquiries } from './hooks/useInquiries'
import { useSellerInfo } from './hooks/useSellerInfo'
import AdminSidebar from './components/layout/AdminSidebar'
import AdminHeader from './components/layout/AdminHeader'
import OrdersList from './components/orders/OrdersList'
import OrderDetail from './components/orders/OrderDetail'
import ProductsList from './components/products/ProductsList'
import CSManagementPage from './components/cs/CSManagementPage'
import ProformaInvoiceModal from './components/modals/ProformaInvoiceModal'
import CommercialInvoiceModal from './components/modals/CommercialInvoiceModal'
import DeleteConfirmModal from './components/modals/DeleteConfirmModal'

function AdminPage({ onClose }) {
  const [lang] = useState('ko')
  const [activeMenu, setActiveMenu] = useState('orders')

  const t = uiText[lang]

  const {
    orders, setOrders,
    selectedOrder, setSelectedOrder,
    trackingInput, setTrackingInput,
    notificationSent,
    orderStats,
    deleteOrder,
    selectOrder,
    updateOrderStatus
  } = useOrders(lang)

  const {
    products,
    showProductForm, setShowProductForm,
    editingProduct,
    deleteConfirm, setDeleteConfirm,
    openProductForm,
    deleteProduct
  } = useProducts()

  const {
    settings, setSettings,
    aiPolicy, setAiPolicy,
    settingsSaved,
    saveSettings
  } = useSettings()

  const {
    showInvoiceModal, showCIModal,
    editingInvoice, setEditingInvoice,
    openInvoice, openCI,
    closeInvoice, closeCI
  } = useInvoice()

  const {
    inquiries,
    selectedInquiry, setSelectedInquiry,
    inquiryStats,
    updateInquiryStatus,
    updateMemo,
    removeInquiry,
    refresh: refreshInquiries
  } = useInquiries()

  const {
    sellerInfo, setSellerInfo,
    saved: sellerInfoSaved,
    saveSellerInfo
  } = useSellerInfo()

  const handleResetSelection = (menu) => {
    if (menu === 'orders') setSelectedOrder(null)
    if (menu === 'products') setShowProductForm(false)
    if (menu === 'cs') setSelectedInquiry(null)
  }

  return (
    <div className="admin-page">
      <AdminSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        orderStats={orderStats}
        inquiryStats={inquiryStats}
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
              onSelectOrder={selectOrder}
              onDeleteOrder={deleteOrder}
              formatDateShort={(ts) => formatDateShort(ts, lang)}
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
              formatDate={(ts) => formatDate(ts, lang)}
              onBack={() => setSelectedOrder(null)}
              onOpenInvoice={openInvoice}
              onOpenCI={openCI}
              updateOrderStatus={updateOrderStatus}
            />
          )}

          {/* Products List */}
          {activeMenu === 'products' && !showProductForm && (
            <ProductsList
              products={products}
              formatDateShort={(ts) => formatDateShort(ts, lang)}
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

          {/* CS Management */}
          {activeMenu === 'cs' && (
            <CSManagementPage
              inquiries={inquiries}
              inquiryStats={inquiryStats}
              selectedInquiry={selectedInquiry}
              setSelectedInquiry={setSelectedInquiry}
              updateInquiryStatus={updateInquiryStatus}
              updateMemo={updateMemo}
              removeInquiry={removeInquiry}
              refreshInquiries={refreshInquiries}
              settings={settings}
              setSettings={setSettings}
              aiPolicy={aiPolicy}
              setAiPolicy={setAiPolicy}
              onSaveSettings={saveSettings}
              settingsSaved={settingsSaved}
              sellerInfo={sellerInfo}
              setSellerInfo={setSellerInfo}
              onSaveSellerInfo={saveSellerInfo}
              sellerInfoSaved={sellerInfoSaved}
              formatDateShort={(ts) => formatDateShort(ts, lang)}
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
          companyInfo={companyInfo}
          onClose={closeInvoice}
        />
      )}

      {/* COMMERCIAL INVOICE (CI) Modal */}
      {showCIModal && editingInvoice && (
        <CommercialInvoiceModal
          editingInvoice={editingInvoice}
          companyInfo={companyInfo}
          onClose={closeCI}
        />
      )}
    </div>
  )
}

export default AdminPage
