function AdminSidebar({ activeMenu, setActiveMenu, orderStats, inquiryStats, onClose, onResetSelection }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">관리자</div>
      <nav className="admin-nav">
        <button
          className={`admin-nav-item ${activeMenu === 'orders' ? 'active' : ''}`}
          onClick={() => { setActiveMenu('orders'); onResetSelection('orders'); }}
        >
          <span>주문 확인</span>
          {orderStats.pending > 0 && <span className="nav-badge">{orderStats.pending}</span>}
        </button>
        <button
          className={`admin-nav-item ${activeMenu === 'products' ? 'active' : ''}`}
          onClick={() => { setActiveMenu('products'); onResetSelection('products'); }}
        >
          <span>제품 등록/수정</span>
        </button>
        <button
          className={`admin-nav-item ${activeMenu === 'cs' ? 'active' : ''}`}
          onClick={() => { setActiveMenu('cs'); onResetSelection('cs'); }}
        >
          <span>CS 관리</span>
          {inquiryStats && inquiryStats.new > 0 && (
            <span className="nav-badge">{inquiryStats.new}</span>
          )}
        </button>
      </nav>
      <button className="admin-back-btn" onClick={onClose}>
        ← 사이트로 돌아가기
      </button>
    </aside>
  )
}

export default AdminSidebar
