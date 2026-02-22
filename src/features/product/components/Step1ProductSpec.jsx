// 카테고리 목록
const categories = [
  { key: 'skincare', label: '스킨케어', icon: '💧' },
  { key: 'makeup', label: '색조', icon: '💄' },
  { key: 'filler', label: '필러', icon: '💉' },
  { key: 'botox', label: '보툴리눔 톡신', icon: '💉' },
  { key: 'cleansing', label: '클렌징', icon: '🫧' },
  { key: 'suncare', label: '선케어', icon: '☀️' },
  { key: 'haircare', label: '헤어케어', icon: '✨' },
  { key: 'bodycare', label: '바디케어', icon: '🧴' }
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
              <span className="pr-category-icon">{cat.icon}</span>
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
