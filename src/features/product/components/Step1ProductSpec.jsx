// 카테고리 SVG 아이콘
const CategoryIcons = {
  // 스킨케어 - 세럼 드롭
  skincare: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3C14 3 8 10.5 8 16a6 6 0 0 0 12 0C20 10.5 14 3 14 3z" />
      <path d="M12 18a2.5 2.5 0 0 0 4.5-1" opacity="0.5" />
    </svg>
  ),
  // 색조 - 립스틱
  makeup: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="12" width="10" height="13" rx="2" />
      <path d="M10 12V9h8v3" />
      <path d="M10 9l1-5h6l1 5" />
      <line x1="9" y1="17" x2="19" y2="17" opacity="0.4" />
    </svg>
  ),
  // 필러 - 주사기
  filler: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="6" width="8" height="16" rx="1.5" />
      <line x1="14" y1="3" x2="14" y2="6" />
      <line x1="12" y1="4" x2="16" y2="4" />
      <line x1="14" y1="22" x2="14" y2="25" />
      <line x1="10" y1="10" x2="18" y2="10" opacity="0.4" />
      <line x1="10" y1="14" x2="18" y2="14" opacity="0.4" />
    </svg>
  ),
  // 보툴리눔 - 바이알(약병)
  botox: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="10" width="12" height="14" rx="2" />
      <path d="M11 10V7h6v3" />
      <line x1="12" y1="5" x2="16" y2="5" />
      <line x1="14" y1="5" x2="14" y2="7" />
      <line x1="8" y1="15" x2="20" y2="15" opacity="0.4" />
      <circle cx="14" cy="20" r="1.5" opacity="0.4" />
    </svg>
  ),
  // 클렌징 - 거품/물방울
  cleansing: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="16" r="7" />
      <circle cx="10" cy="8" r="3.5" />
      <circle cx="19" cy="9" r="2.5" />
      <path d="M14 13v2" opacity="0.4" />
      <path d="M12 16h4" opacity="0.4" />
    </svg>
  ),
  // 선케어 - 태양+방패
  suncare: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="5" />
      <line x1="14" y1="3" x2="14" y2="6" />
      <line x1="14" y1="22" x2="14" y2="25" />
      <line x1="3" y1="14" x2="6" y2="14" />
      <line x1="22" y1="14" x2="25" y2="14" />
      <line x1="6.2" y1="6.2" x2="8.3" y2="8.3" />
      <line x1="19.7" y1="19.7" x2="21.8" y2="21.8" />
      <line x1="6.2" y1="21.8" x2="8.3" y2="19.7" />
      <line x1="19.7" y1="8.3" x2="21.8" y2="6.2" />
    </svg>
  ),
  // 헤어케어 - 빗
  haircare: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <line x1="9" y1="12" x2="9" y2="24" />
      <line x1="13" y1="12" x2="13" y2="24" />
      <line x1="17" y1="12" x2="17" y2="24" />
      <line x1="21" y1="12" x2="21" y2="20" />
    </svg>
  ),
  // 바디케어 - 로션 펌프
  bodycare: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="12" width="12" height="13" rx="2" />
      <path d="M11 12V9h6v3" />
      <line x1="14" y1="5" x2="14" y2="9" />
      <path d="M14 5h4" />
      <path d="M18 5v-1" />
      <line x1="8" y1="17" x2="20" y2="17" opacity="0.4" />
    </svg>
  )
}

// 카테고리 목록
const categories = [
  { key: 'skincare', label: '스킨케어' },
  { key: 'makeup', label: '색조' },
  { key: 'filler', label: '필러' },
  { key: 'botox', label: '보툴리눔 톡신' },
  { key: 'cleansing', label: '클렌징' },
  { key: 'suncare', label: '선케어' },
  { key: 'haircare', label: '헤어케어' },
  { key: 'bodycare', label: '바디케어' }
]

// 인증 정보 목록
const certificationOptions = [
  'CE', 'KFDA', 'FDA', 'CPNP (EU)', 'ISO 13485', 'GMP', 'Vegan', 'Cruelty-Free'
]

function Step1ProductSpec({ formData, updateField, errors }) {
  const isMedicalProduct = formData.category === 'filler' || formData.category === 'botox'

  const toggleCertification = (cert) => {
    const newCerts = formData.certifications.includes(cert)
      ? formData.certifications.filter(c => c !== cert)
      : [...formData.certifications, cert]
    updateField('certifications', newCerts)
  }

  return (
    <div className="pr-section-simple">
      <div className="pr-section-intro">
        <p>제품의 핵심 스펙을 입력합니다.</p>
        <p className="pr-section-tip">빨간색 *표시는 필수 입력 항목입니다.</p>
      </div>

      <div className="pr-form-grid">
        <div className="pr-field required">
          <label>제품명</label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => updateField('productName', e.target.value)}
            placeholder="예: Hydra Glow Serum"
            className={errors.productName ? 'error' : ''}
          />
          {errors.productName && <span className="error-text">{errors.productName}</span>}
        </div>

        <div className="pr-field">
          <label>브랜드명</label>
          <input
            type="text"
            value={formData.brandName}
            onChange={(e) => updateField('brandName', e.target.value)}
            placeholder="예: Young Cosmed"
          />
        </div>
      </div>

      {/* 카테고리 비주얼 카드 선택 */}
      <div className="pr-field required full-width" style={{ marginTop: 24 }}>
        <label>카테고리</label>
        {errors.category && <span className="error-text">{errors.category}</span>}
        <div className="pr-category-cards">
          {categories.map(cat => (
            <button
              key={cat.key}
              type="button"
              className={`pr-category-card ${formData.category === cat.key ? 'active' : ''}`}
              onClick={() => updateField('category', cat.key)}
            >
              <span className="pr-category-icon">{CategoryIcons[cat.key]}</span>
              <span className="pr-category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pr-form-grid" style={{ marginTop: 24 }}>
        <div className="pr-field">
          <label>품번 (Product Code)</label>
          <input
            type="text"
            value={formData.productCode}
            onChange={(e) => updateField('productCode', e.target.value)}
            placeholder="예: YC-SK-001"
          />
        </div>

        <div className="pr-field">
          <label>유통기한</label>
          <input
            type="text"
            value={formData.shelfLife}
            onChange={(e) => updateField('shelfLife', e.target.value)}
            placeholder="예: 제조일로부터 36개월"
          />
        </div>
      </div>

      <div className="pr-form-grid" style={{ marginTop: 24 }}>
        <div className="pr-field required">
          <label>MOQ (최소 주문 수량)</label>
          <div className="pr-input-with-unit">
            <input
              type="text"
              value={formData.moq}
              onChange={(e) => updateField('moq', e.target.value)}
              placeholder="예: 500"
              className={errors.moq ? 'error' : ''}
            />
            <span className="pr-input-unit">units</span>
          </div>
          {errors.moq && <span className="error-text">{errors.moq}</span>}
        </div>

        <div className="pr-field">
          <label>라이선스 필요 여부</label>
          <div className="pr-toggle-group">
            <button
              type="button"
              className={`pr-toggle ${formData.requiresLicense ? 'active' : ''}`}
              onClick={() => updateField('requiresLicense', true)}
            >
              필요
            </button>
            <button
              type="button"
              className={`pr-toggle ${!formData.requiresLicense ? 'active' : ''}`}
              onClick={() => updateField('requiresLicense', false)}
            >
              불필요
            </button>
          </div>
        </div>
      </div>

      {/* 인증 태그 선택 */}
      <div className="pr-field full-width" style={{ marginTop: 24 }}>
        <label>인증 태그 선택</label>
        <div className="pr-tag-group">
          {certificationOptions.map(cert => (
            <button
              key={cert}
              type="button"
              className={`pr-tag ${formData.certifications.includes(cert) ? 'active' : ''}`}
              onClick={() => toggleCertification(cert)}
            >
              {cert}
            </button>
          ))}
        </div>
      </div>

      {/* 의료 제품 조건부 필드 */}
      {isMedicalProduct && (
        <div className="pr-medical-section">
          <div className="pr-medical-header">
            <span className="pr-medical-badge">의료 제품</span>
            <span>필러 / 보툴리눔 톡신 전용 추가 정보</span>
          </div>

          <div className="pr-form-grid">
            <div className="pr-field">
              <label>농도</label>
              <input
                type="text"
                value={formData.concentration}
                onChange={(e) => updateField('concentration', e.target.value)}
                placeholder="예: 20mg/ml"
              />
            </div>

            <div className="pr-field">
              <label>용량 (ml)</label>
              <input
                type="text"
                value={formData.volume}
                onChange={(e) => updateField('volume', e.target.value)}
                placeholder="예: 1ml, 2ml"
              />
            </div>

            <div className="pr-field">
              <label>리도카인 포함 여부</label>
              <div className="pr-toggle-group">
                <button
                  type="button"
                  className={`pr-toggle ${formData.hasLidocaine ? 'active' : ''}`}
                  onClick={() => updateField('hasLidocaine', true)}
                >
                  포함
                </button>
                <button
                  type="button"
                  className={`pr-toggle ${!formData.hasLidocaine ? 'active' : ''}`}
                  onClick={() => updateField('hasLidocaine', false)}
                >
                  미포함
                </button>
              </div>
            </div>
          </div>

          <div className="pr-medical-notice">
            <strong>안내:</strong> 의료 제품은 자격을 갖춘 바이어만 구매 가능합니다.
            상담 시 라이선스 확인 안내가 자동으로 포함됩니다.
          </div>
        </div>
      )}
    </div>
  )
}

export default Step1ProductSpec
