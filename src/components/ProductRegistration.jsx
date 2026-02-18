import { useState, useRef } from 'react'
import './ProductRegistration.css'

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

// 타겟 바이어 유형
const buyerTypes = [
  '클리닉', '병원', '유통사', '온라인셀러', '약국', '에스테틱샵', '뷰티살롱', '수입업체'
]

// 응답 톤
const responseTones = [
  { key: 'professional', label: '전문적' },
  { key: 'clinical', label: '임상적' },
  { key: 'sales', label: '영업형' },
  { key: 'friendly', label: '친근한' }
]

function ProductRegistration({ onClose, onSave, editProduct = null }) {
  const [formData, setFormData] = useState(editProduct || {
    // [1] 기본 제품 정보
    productCode: '',
    category: '',
    productName: '',
    brandName: '',
    manufacturer: '',
    origin: '대한민국',
    certifications: [],

    // [2] 상담용 핵심 요약 정보
    oneLineDescription: '',
    sellingPoints: ['', '', ''],
    targetBuyers: [],
    moq: '',
    priceRange: '',
    restrictedCountries: '',

    // [3] 상세 정보
    ingredients: '',
    efficacy: '',
    usageMethod: '',
    storageMethod: '',
    shelfLife: '',
    packageUnit: '',
    warnings: '',

    // [4] 응답 제어 설정
    prohibitedInfo: '',
    requiresLicense: false,
    competitiveAdvantage: '',
    faqList: [{ question: '', answer: '' }],
    responseTone: 'professional',

    // [5] 의료 제품 전용 필드
    concentration: '',
    volume: '',
    hasLidocaine: false,
    recommendedAreas: '',
    storageTemp: '',

    // 이미지
    mainImage: null,
    detailImages: [],
    packageImages: [],
    certImages: [],
    pdfBrochure: null
  })

  const [activeSection, setActiveSection] = useState(1)
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  const fileInputRefs = {
    main: useRef(null),
    detail: useRef(null),
    package: useRef(null),
    cert: useRef(null),
    pdf: useRef(null)
  }

  const isMedicalProduct = formData.category === 'filler' || formData.category === 'botox'

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const updateSellingPoint = (index, value) => {
    const newPoints = [...formData.sellingPoints]
    newPoints[index] = value
    setFormData(prev => ({ ...prev, sellingPoints: newPoints }))
  }

  const addSellingPoint = () => {
    if (formData.sellingPoints.length < 5) {
      setFormData(prev => ({
        ...prev,
        sellingPoints: [...prev.sellingPoints, '']
      }))
    }
  }

  const removeSellingPoint = (index) => {
    if (formData.sellingPoints.length > 1) {
      const newPoints = formData.sellingPoints.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, sellingPoints: newPoints }))
    }
  }

  const toggleCertification = (cert) => {
    const newCerts = formData.certifications.includes(cert)
      ? formData.certifications.filter(c => c !== cert)
      : [...formData.certifications, cert]
    updateField('certifications', newCerts)
  }

  const toggleBuyerType = (type) => {
    const newTypes = formData.targetBuyers.includes(type)
      ? formData.targetBuyers.filter(t => t !== type)
      : [...formData.targetBuyers, type]
    updateField('targetBuyers', newTypes)
  }

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqList: [...prev.faqList, { question: '', answer: '' }]
    }))
  }

  const updateFaq = (index, field, value) => {
    const newFaqList = [...formData.faqList]
    newFaqList[index][field] = value
    setFormData(prev => ({ ...prev, faqList: newFaqList }))
  }

  const removeFaq = (index) => {
    if (formData.faqList.length > 1) {
      const newFaqList = formData.faqList.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, faqList: newFaqList }))
    }
  }

  const handleImageUpload = (type, files) => {
    const fileArray = Array.from(files)

    if (type === 'main') {
      if (fileArray[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          updateField('mainImage', {
            file: fileArray[0],
            preview: e.target.result,
            name: fileArray[0].name
          })
        }
        reader.readAsDataURL(fileArray[0])
      }
    } else if (type === 'pdf') {
      if (fileArray[0]) {
        updateField('pdfBrochure', {
          file: fileArray[0],
          name: fileArray[0].name
        })
      }
    } else {
      const fieldMap = {
        detail: 'detailImages',
        package: 'packageImages',
        cert: 'certImages'
      }
      const field = fieldMap[type]

      fileArray.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], {
              file,
              preview: e.target.result,
              name: file.name
            }]
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (type, index) => {
    if (type === 'main') {
      updateField('mainImage', null)
    } else if (type === 'pdf') {
      updateField('pdfBrochure', null)
    } else {
      const fieldMap = {
        detail: 'detailImages',
        package: 'packageImages',
        cert: 'certImages'
      }
      const field = fieldMap[type]
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.productCode.trim()) {
      newErrors.productCode = '제품 고유 번호는 필수입니다'
    }
    if (!formData.category) {
      newErrors.category = '카테고리를 선택해주세요'
    }
    if (!formData.productName.trim()) {
      newErrors.productName = '제품명은 필수입니다'
    }
    if (!formData.oneLineDescription.trim()) {
      newErrors.oneLineDescription = '제품 한 줄 정의는 필수입니다'
    }
    if (!formData.moq.trim()) {
      newErrors.moq = '최소 주문 수량은 필수입니다'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      // 에러가 있는 첫 번째 섹션으로 이동
      if (errors.productCode || errors.category || errors.productName) {
        setActiveSection(1)
      } else if (errors.oneLineDescription || errors.moq) {
        setActiveSection(2)
      }
      return
    }

    setIsSaving(true)

    // 저장 로직 (실제로는 API 호출)
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (onSave) {
      onSave(formData)
    }

    setIsSaving(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
    const files = e.dataTransfer.files
    handleImageUpload(type, files)
  }

  // 저장 확인 모달
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)

  const goNextStep = () => {
    if (activeSection < 5) {
      setActiveSection(activeSection + 1)
    }
  }

  const goPrevStep = () => {
    if (activeSection > 1) {
      setActiveSection(activeSection - 1)
    }
  }

  const stepTitles = {
    1: '기본 정보 입력',
    2: '상담용 정보 입력',
    3: '상세 정보 입력',
    4: '응답 설정',
    5: '이미지 업로드'
  }

  return (
    <div className="product-registration-wizard">
      {/* 단계 표시 - 상단 고정 */}
      <div className="wizard-header">
        <div className="wizard-progress">
          <span className="wizard-step-current">현재 {activeSection}단계</span>
          <span className="wizard-step-total">/ 총 5단계</span>
        </div>
        <h2 className="wizard-title">{stepTitles[activeSection]}</h2>
        <div className="wizard-dots">
          {[1, 2, 3, 4, 5].map(step => (
            <span
              key={step}
              className={`wizard-dot ${step === activeSection ? 'active' : ''} ${step < activeSection ? 'done' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* 섹션 콘텐츠 */}
      <div className="pr-content">

        {/* ========== 섹션 1: 기본 제품 정보 ========== */}
        {activeSection === 1 && (
          <div className="pr-section-simple">
            <div className="pr-section-intro">
              <p>제품의 가장 기본적인 정보를 입력합니다.</p>
              <p className="pr-section-tip">빨간색 *표시는 필수 입력 항목입니다.</p>
            </div>

            <div className="pr-form-grid">
              <div className="pr-field required">
                <label>제품 고유 번호</label>
                <input
                  type="text"
                  value={formData.productCode}
                  onChange={(e) => updateField('productCode', e.target.value)}
                  placeholder="예: YC-SK-001"
                  className={errors.productCode ? 'error' : ''}
                />
                {errors.productCode && <span className="error-text">{errors.productCode}</span>}
              </div>

              <div className="pr-field required">
                <label>카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">선택해주세요</option>
                  {categories.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>

              <div className="pr-field required full-width">
                <label>제품명 (한글)</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => updateField('productName', e.target.value)}
                  placeholder="예: 히알루론 딥 하이드레이션 세럼"
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

              <div className="pr-field">
                <label>제조사</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => updateField('manufacturer', e.target.value)}
                  placeholder="예: (주)영코스메드"
                />
              </div>

              <div className="pr-field">
                <label>원산지</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => updateField('origin', e.target.value)}
                  placeholder="예: 대한민국"
                />
              </div>

              <div className="pr-field full-width">
                <label>인증 정보</label>
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

                  <div className="pr-field">
                    <label>보관 온도</label>
                    <input
                      type="text"
                      value={formData.storageTemp}
                      onChange={(e) => updateField('storageTemp', e.target.value)}
                      placeholder="예: 2-8°C 냉장보관"
                    />
                  </div>

                  <div className="pr-field full-width">
                    <label>권장 시술 부위</label>
                    <input
                      type="text"
                      value={formData.recommendedAreas}
                      onChange={(e) => updateField('recommendedAreas', e.target.value)}
                      placeholder="예: 이마, 미간, 눈가, 팔자주름, 볼, 턱선"
                    />
                  </div>
                </div>

                <div className="pr-medical-notice">
                  <strong>안내:</strong> 의료 제품은 자격을 갖춘 바이어만 구매 가능합니다.
                  상담 시 라이선스 확인 안내가 자동으로 포함됩니다.
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== 섹션 2: 상담용 핵심 요약 정보 ========== */}
        {activeSection === 2 && (
          <div className="pr-section">
            <div className="pr-section-header">
              <h2>상담용 핵심 요약 정보</h2>
              <p>바이어에게 제품을 소개할 때 사용하는 핵심 정보입니다</p>
            </div>

            <div className="pr-form-stack">
              <div className="pr-field required">
                <label>제품 한 줄 정의</label>
                <p className="pr-field-desc">바이어에게 처음 보여줄 한 문장입니다</p>
                <input
                  type="text"
                  value={formData.oneLineDescription}
                  onChange={(e) => updateField('oneLineDescription', e.target.value)}
                  placeholder="예: 고농축 히알루론산이 함유된 즉각 보습 세럼으로, 건조한 피부에 깊은 수분을 공급합니다."
                  className={errors.oneLineDescription ? 'error' : ''}
                />
                {errors.oneLineDescription && <span className="error-text">{errors.oneLineDescription}</span>}
              </div>

              <div className="pr-field">
                <label>주요 판매 포인트</label>
                <p className="pr-field-desc">강조할 제품의 핵심 장점 (3~5개)</p>
                {formData.sellingPoints.map((point, index) => (
                  <div key={index} className="pr-dynamic-input">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updateSellingPoint(index, e.target.value)}
                      placeholder={`판매 포인트 ${index + 1}`}
                    />
                    {formData.sellingPoints.length > 1 && (
                      <button
                        type="button"
                        className="pr-remove-btn"
                        onClick={() => removeSellingPoint(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {formData.sellingPoints.length < 5 && (
                  <button type="button" className="pr-add-btn" onClick={addSellingPoint}>
                    + 판매 포인트 추가
                  </button>
                )}
              </div>

              <div className="pr-field">
                <label>타겟 바이어 유형</label>
                <div className="pr-tag-group">
                  {buyerTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      className={`pr-tag ${formData.targetBuyers.includes(type) ? 'active' : ''}`}
                      onClick={() => toggleBuyerType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pr-form-grid">
                <div className="pr-field required">
                  <label>최소 주문 수량 (MOQ)</label>
                  <input
                    type="text"
                    value={formData.moq}
                    onChange={(e) => updateField('moq', e.target.value)}
                    placeholder="예: 100개"
                    className={errors.moq ? 'error' : ''}
                  />
                  {errors.moq && <span className="error-text">{errors.moq}</span>}
                </div>

                <div className="pr-field">
                  <label>도매 단가 범위</label>
                  <input
                    type="text"
                    value={formData.priceRange}
                    onChange={(e) => updateField('priceRange', e.target.value)}
                    placeholder="예: $3.50 - $5.00 (수량별 상이)"
                  />
                </div>
              </div>

              <div className="pr-field">
                <label>유통 제한 국가</label>
                <input
                  type="text"
                  value={formData.restrictedCountries}
                  onChange={(e) => updateField('restrictedCountries', e.target.value)}
                  placeholder="예: 없음 / 또는 중국, 일본 등 제한 국가 입력"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========== 섹션 3: 상세 정보 ========== */}
        {activeSection === 3 && (
          <div className="pr-section">
            <div className="pr-section-header">
              <h2>상세 정보</h2>
              <p>제품의 상세 정보를 구조화하여 입력합니다</p>
            </div>

            <div className="pr-form-stack">
              <div className="pr-field">
                <label>주요 성분</label>
                <textarea
                  value={formData.ingredients}
                  onChange={(e) => updateField('ingredients', e.target.value)}
                  placeholder="예: 히알루론산, 나이아신아마이드, 판테놀, 세라마이드 NP"
                  rows={3}
                />
              </div>

              <div className="pr-field">
                <label>효능 및 기능</label>
                <textarea
                  value={formData.efficacy}
                  onChange={(e) => updateField('efficacy', e.target.value)}
                  placeholder="예: 즉각적인 수분 공급, 피부 장벽 강화, 탄력 개선"
                  rows={3}
                />
              </div>

              <div className="pr-field">
                <label>사용 방법</label>
                <textarea
                  value={formData.usageMethod}
                  onChange={(e) => updateField('usageMethod', e.target.value)}
                  placeholder="예: 세안 후 토너 다음 단계에 적당량을 덜어 얼굴 전체에 부드럽게 펴 바릅니다."
                  rows={3}
                />
              </div>

              <div className="pr-form-grid">
                <div className="pr-field">
                  <label>보관 방법</label>
                  <input
                    type="text"
                    value={formData.storageMethod}
                    onChange={(e) => updateField('storageMethod', e.target.value)}
                    placeholder="예: 직사광선을 피해 서늘한 곳에 보관"
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

                <div className="pr-field">
                  <label>패키지 구성 단위</label>
                  <input
                    type="text"
                    value={formData.packageUnit}
                    onChange={(e) => updateField('packageUnit', e.target.value)}
                    placeholder="예: 30ml x 10개 / 박스"
                  />
                </div>
              </div>

              <div className="pr-field">
                <label>주의사항 및 부작용</label>
                <textarea
                  value={formData.warnings}
                  onChange={(e) => updateField('warnings', e.target.value)}
                  placeholder="예: 눈에 들어갔을 경우 즉시 씻어내십시오. 피부 이상 시 사용을 중단하세요."
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========== 섹션 4: 응답 제어 설정 ========== */}
        {activeSection === 4 && (
          <div className="pr-section">
            <div className="pr-section-header">
              <h2>응답 제어 설정</h2>
              <p>바이어에게 응답할 때 따라야 할 규칙을 설정합니다</p>
            </div>

            <div className="pr-form-stack">
              <div className="pr-field">
                <label>절대 말하면 안 되는 정보</label>
                <p className="pr-field-desc">예: 소비자 가격, 특정 할인 정보 등</p>
                <textarea
                  value={formData.prohibitedInfo}
                  onChange={(e) => updateField('prohibitedInfo', e.target.value)}
                  placeholder="예: 소비자 권장가 공개 금지, 특정 거래처명 언급 금지"
                  rows={2}
                />
              </div>

              <div className="pr-field">
                <label>라이선스 필요 여부</label>
                <div className="pr-toggle-group">
                  <button
                    type="button"
                    className={`pr-toggle ${formData.requiresLicense ? 'active' : ''}`}
                    onClick={() => updateField('requiresLicense', true)}
                  >
                    필요 (의료 제품)
                  </button>
                  <button
                    type="button"
                    className={`pr-toggle ${!formData.requiresLicense ? 'active' : ''}`}
                    onClick={() => updateField('requiresLicense', false)}
                  >
                    불필요 (일반 화장품)
                  </button>
                </div>
              </div>

              <div className="pr-field">
                <label>경쟁 제품 대비 차별점</label>
                <textarea
                  value={formData.competitiveAdvantage}
                  onChange={(e) => updateField('competitiveAdvantage', e.target.value)}
                  placeholder="예: 타사 대비 3배 높은 히알루론산 농도, 특허 받은 흡수 기술 적용"
                  rows={3}
                />
              </div>

              <div className="pr-field">
                <label>바이어가 자주 묻는 질문 (FAQ)</label>
                <p className="pr-field-desc">자주 묻는 질문과 답변을 미리 등록합니다</p>
                {formData.faqList.map((faq, index) => (
                  <div key={index} className="pr-faq-item">
                    <div className="pr-faq-row">
                      <span className="pr-faq-label">Q</span>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        placeholder="질문을 입력하세요"
                      />
                    </div>
                    <div className="pr-faq-row">
                      <span className="pr-faq-label">A</span>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        placeholder="답변을 입력하세요"
                        rows={2}
                      />
                    </div>
                    {formData.faqList.length > 1 && (
                      <button
                        type="button"
                        className="pr-faq-remove"
                        onClick={() => removeFaq(index)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="pr-add-btn" onClick={addFaq}>
                  + FAQ 추가
                </button>
              </div>

              <div className="pr-field">
                <label>응답 말투</label>
                <div className="pr-radio-group">
                  {responseTones.map(tone => (
                    <label key={tone.key} className="pr-radio">
                      <input
                        type="radio"
                        name="responseTone"
                        checked={formData.responseTone === tone.key}
                        onChange={() => updateField('responseTone', tone.key)}
                      />
                      <span className="pr-radio-label">{tone.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== 섹션 5: 이미지 및 자료 업로드 ========== */}
        {activeSection === 5 && (
          <div className="pr-section">
            <div className="pr-section-header">
              <h2>이미지 및 자료 업로드</h2>
              <p>제품 이미지와 관련 자료를 업로드합니다</p>
            </div>

            <div className="pr-upload-grid">
              {/* 메인 이미지 */}
              <div className="pr-upload-card">
                <h3>메인 제품 이미지</h3>
                <div
                  className="pr-dropzone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'main')}
                  onClick={() => fileInputRefs.main.current?.click()}
                >
                  {formData.mainImage ? (
                    <div className="pr-preview-single">
                      <img src={formData.mainImage.preview} alt="메인 이미지" />
                      <button
                        type="button"
                        className="pr-preview-remove"
                        onClick={(e) => { e.stopPropagation(); removeImage('main'); }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="pr-dropzone-content">
                      <span className="pr-dropzone-icon">📷</span>
                      <span>클릭 또는 드래그하여 업로드</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.main}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('main', e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>

              {/* 상세 이미지 */}
              <div className="pr-upload-card">
                <h3>상세 이미지</h3>
                <div
                  className="pr-dropzone multi"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'detail')}
                  onClick={() => fileInputRefs.detail.current?.click()}
                >
                  {formData.detailImages.length > 0 ? (
                    <div className="pr-preview-grid">
                      {formData.detailImages.map((img, index) => (
                        <div key={index} className="pr-preview-item">
                          <img src={img.preview} alt={`상세 ${index + 1}`} />
                          <button
                            type="button"
                            className="pr-preview-remove"
                            onClick={(e) => { e.stopPropagation(); removeImage('detail', index); }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <div className="pr-preview-add">+</div>
                    </div>
                  ) : (
                    <div className="pr-dropzone-content">
                      <span className="pr-dropzone-icon">🖼</span>
                      <span>여러 장 업로드 가능</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.detail}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload('detail', e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>

              {/* 패키지 이미지 */}
              <div className="pr-upload-card">
                <h3>패키지 이미지</h3>
                <div
                  className="pr-dropzone multi"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'package')}
                  onClick={() => fileInputRefs.package.current?.click()}
                >
                  {formData.packageImages.length > 0 ? (
                    <div className="pr-preview-grid">
                      {formData.packageImages.map((img, index) => (
                        <div key={index} className="pr-preview-item">
                          <img src={img.preview} alt={`패키지 ${index + 1}`} />
                          <button
                            type="button"
                            className="pr-preview-remove"
                            onClick={(e) => { e.stopPropagation(); removeImage('package', index); }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <div className="pr-preview-add">+</div>
                    </div>
                  ) : (
                    <div className="pr-dropzone-content">
                      <span className="pr-dropzone-icon">📦</span>
                      <span>박스, 포장 이미지</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.package}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload('package', e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>

              {/* 인증서 이미지 */}
              <div className="pr-upload-card">
                <h3>인증서 이미지</h3>
                <div
                  className="pr-dropzone multi"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'cert')}
                  onClick={() => fileInputRefs.cert.current?.click()}
                >
                  {formData.certImages.length > 0 ? (
                    <div className="pr-preview-grid">
                      {formData.certImages.map((img, index) => (
                        <div key={index} className="pr-preview-item">
                          <img src={img.preview} alt={`인증서 ${index + 1}`} />
                          <button
                            type="button"
                            className="pr-preview-remove"
                            onClick={(e) => { e.stopPropagation(); removeImage('cert', index); }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <div className="pr-preview-add">+</div>
                    </div>
                  ) : (
                    <div className="pr-dropzone-content">
                      <span className="pr-dropzone-icon">📜</span>
                      <span>CE, FDA, KFDA 등</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.cert}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload('cert', e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>

              {/* PDF 브로슈어 */}
              <div className="pr-upload-card full-width">
                <h3>PDF 브로슈어</h3>
                <div
                  className="pr-dropzone pdf"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'pdf')}
                  onClick={() => fileInputRefs.pdf.current?.click()}
                >
                  {formData.pdfBrochure ? (
                    <div className="pr-pdf-preview">
                      <span className="pr-pdf-icon">📄</span>
                      <span className="pr-pdf-name">{formData.pdfBrochure.name}</span>
                      <button
                        type="button"
                        className="pr-preview-remove"
                        onClick={(e) => { e.stopPropagation(); removeImage('pdf'); }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="pr-dropzone-content">
                      <span className="pr-dropzone-icon">📑</span>
                      <span>PDF 파일을 업로드하세요</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.pdf}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleImageUpload('pdf', e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 하단 고정 버튼 - 단계별 네비게이션 */}
      <div className="wizard-footer">
        <button
          type="button"
          className="wizard-btn-cancel"
          onClick={onClose}
        >
          취소하고 나가기
        </button>
        <div className="wizard-nav-buttons">
          {activeSection > 1 && (
            <button type="button" className="wizard-btn-prev" onClick={goPrevStep}>
              ← 이전 단계로
            </button>
          )}
          {activeSection < 5 ? (
            <button type="button" className="wizard-btn-next" onClick={goNextStep}>
              다음 단계로 →
            </button>
          ) : (
            <button
              type="button"
              className="wizard-btn-save"
              onClick={() => setShowSaveConfirm(true)}
            >
              저장하고 종료
            </button>
          )}
        </div>
      </div>

      {/* 저장 확인 모달 */}
      {showSaveConfirm && (
        <div className="wizard-modal-overlay">
          <div className="wizard-modal">
            <h3>제품을 저장하시겠습니까?</h3>
            <p>입력한 내용이 저장됩니다.</p>
            <div className="wizard-modal-buttons">
              <button
                type="button"
                className="wizard-modal-cancel"
                onClick={() => setShowSaveConfirm(false)}
              >
                다시 확인하기
              </button>
              <button
                type="button"
                className="wizard-modal-confirm"
                onClick={() => {
                  setShowSaveConfirm(false)
                  handleSave()
                }}
                disabled={isSaving}
              >
                {isSaving ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductRegistration
