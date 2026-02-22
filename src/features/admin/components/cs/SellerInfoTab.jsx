function SellerInfoTab({ sellerInfo, setSellerInfo, onSave, saved }) {
  const update = (field, value) => {
    setSellerInfo(prev => ({ ...prev, [field]: value }))
  }

  const updateSns = (platform, value) => {
    setSellerInfo(prev => ({
      ...prev,
      snsLinks: { ...prev.snsLinks, [platform]: value }
    }))
  }

  return (
    <div className="settings-page-simple">
      {/* 카드 1: 회사 기본 정보 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">회사 기본 정보</h3>
          <p className="settings-card-desc">
            회사의 기본 정보를 입력해 주세요.
          </p>
        </div>
        <div className="settings-card-body">
          <label className="simple-label">회사명</label>
          <input
            type="text"
            className="simple-input"
            style={{ width: '100%', marginBottom: 24 }}
            value={sellerInfo.companyName}
            onChange={e => update('companyName', e.target.value)}
            placeholder="예: Young Cosmed"
          />

          <label className="simple-label">대표자명</label>
          <input
            type="text"
            className="simple-input"
            style={{ width: '100%', marginBottom: 24 }}
            value={sellerInfo.representativeName}
            onChange={e => update('representativeName', e.target.value)}
            placeholder="대표자 이름"
          />

          <label className="simple-label">주소</label>
          <input
            type="text"
            className="simple-input"
            style={{ width: '100%', marginBottom: 24 }}
            value={sellerInfo.address}
            onChange={e => update('address', e.target.value)}
            placeholder="회사 주소"
          />

          <label className="simple-label">사업자등록번호</label>
          <input
            type="text"
            className="simple-input"
            style={{ width: '100%' }}
            value={sellerInfo.businessRegistrationNumber}
            onChange={e => update('businessRegistrationNumber', e.target.value)}
            placeholder="000-00-00000"
          />
        </div>
      </div>

      {/* 카드 2: 연락처 정보 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">연락처 정보</h3>
          <p className="settings-card-desc">
            바이어에게 제공할 연락처 정보를 입력해 주세요.
          </p>
        </div>
        <div className="settings-card-body">
          <label className="simple-label">이메일</label>
          <input
            type="email"
            className="simple-input"
            style={{ width: '100%', marginBottom: 24 }}
            value={sellerInfo.email}
            onChange={e => update('email', e.target.value)}
            placeholder="sales@example.com"
          />

          <label className="simple-label">전화번호</label>
          <input
            type="tel"
            className="simple-input"
            style={{ width: '100%', marginBottom: 24 }}
            value={sellerInfo.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="+82-02-1234-5678"
          />

          <label className="simple-label">WhatsApp 번호</label>
          <input
            type="tel"
            className="simple-input"
            style={{ width: '100%' }}
            value={sellerInfo.whatsapp}
            onChange={e => update('whatsapp', e.target.value)}
            placeholder="+82 10 1234 5678"
          />
        </div>
      </div>

      {/* 카드 3: SNS 계정 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">SNS 계정</h3>
          <p className="settings-card-desc">
            운영 중인 SNS 계정을 입력해 주세요.
          </p>
        </div>
        <div className="settings-card-body">
          <label className="simple-label">Instagram</label>
          <input
            type="text"
            className="simple-input"
            style={{ width: '100%', marginBottom: 24 }}
            value={sellerInfo.snsLinks.instagram}
            onChange={e => updateSns('instagram', e.target.value)}
            placeholder="@yourcompany"
          />

          <label className="simple-label">Facebook</label>
          <input
            type="text"
            className="simple-input"
            style={{ width: '100%', marginBottom: 24 }}
            value={sellerInfo.snsLinks.facebook}
            onChange={e => updateSns('facebook', e.target.value)}
            placeholder="facebook.com/yourcompany"
          />

          <label className="simple-label">TikTok</label>
          <input
            type="text"
            className="simple-input"
            style={{ width: '100%' }}
            value={sellerInfo.snsLinks.tiktok}
            onChange={e => updateSns('tiktok', e.target.value)}
            placeholder="@yourcompany"
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="settings-save-area">
        <button className="settings-save-btn-large" onClick={onSave}>
          {saved ? '저장되었습니다!' : '판매자 정보 저장'}
        </button>
      </div>
    </div>
  )
}

export default SellerInfoTab
