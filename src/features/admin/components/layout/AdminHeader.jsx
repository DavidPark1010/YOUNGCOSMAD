function AdminHeader({ activeMenu }) {
  return (
    <header className="admin-header">
      <h1 className="admin-page-title">
        {activeMenu === 'orders' && '주문 확인'}
        {activeMenu === 'products' && '제품 등록/수정'}
        {activeMenu === 'settings' && '공통 응답 설정'}
      </h1>
      <div className="admin-header-right">
        <div className="admin-user">
          <button className="admin-logout">로그아웃</button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
