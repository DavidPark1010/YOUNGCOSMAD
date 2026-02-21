function AdminSidebar({ activeMenu, setActiveMenu, orderStats, onClose, onResetSelection }) {
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
          className={`admin-nav-item ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveMenu('settings')}
        >
          <span>공통 응답 설정</span>
        </button>
      </nav>
      <button className="admin-back-btn" onClick={onClose}>
        ← 사이트로 돌아가기
      </button>
    </aside>
  )
}

export default AdminSidebar
