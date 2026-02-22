import { useState } from 'react'
import './ProductRegistration.css'
import { createDefaultPricing } from './constants/countryData'
import Step1ProductSpec from './components/Step1ProductSpec'
import Step2ProductPresentation from './components/Step2ProductPresentation'
import Step3CountryPricing from './components/Step3CountryPricing'

function ProductRegistration({ onClose, onSave, editProduct = null }) {
  const [formData, setFormData] = useState(() => {
    if (editProduct) {
      // 기존 제품 편집 시 pricing 기본값 자동 생성
      return {
        ...editProduct,
        pricing: editProduct.pricing || createDefaultPricing(0),
        description: editProduct.description || '',
        additionalImages: editProduct.additionalImages || [],
        certifications: Array.isArray(editProduct.certifications) ? editProduct.certifications : [],
        requiresLicense: editProduct.requiresLicense || false,
        hasLidocaine: editProduct.hasLidocaine || false,
        concentration: editProduct.concentration || '',
        volume: editProduct.volume || '',
        shelfLife: editProduct.shelfLife || '',
      }
    }
    return {
      // Step 1: 스펙
      productCode: '',
      productName: '',
      brandName: '',
      category: '',
      moq: '',
      shelfLife: '',
      requiresLicense: false,
      certifications: [],
      // 의료제품 조건부
      concentration: '',
      volume: '',
      hasLidocaine: false,

      // Step 2: 소개
      mainImage: null,
      additionalImages: [],
      description: '',

      // Step 3: 가격
      pricing: createDefaultPricing(0)
    }
  })

  const [activeSection, setActiveSection] = useState(1)
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1 || step === 'all') {
      if (!formData.productName.trim()) {
        newErrors.productName = '제품명은 필수입니다'
      }
      if (!formData.category) {
        newErrors.category = '카테고리를 선택해주세요'
      }
      if (!formData.moq.trim()) {
        newErrors.moq = '최소 주문 수량은 필수입니다'
      }
    }

    if (step === 3 || step === 'all') {
      if (!formData.pricing.basePrice || formData.pricing.basePrice <= 0) {
        newErrors.basePrice = '기본 단가를 입력해주세요'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goNextStep = () => {
    if (validateStep(activeSection)) {
      if (activeSection < 3) {
        setActiveSection(activeSection + 1)
      }
    }
  }

  const goPrevStep = () => {
    if (activeSection > 1) {
      setActiveSection(activeSection - 1)
    }
  }

  const handleSave = async () => {
    if (!validateStep('all')) {
      if (errors.productName || errors.category || errors.moq) {
        setActiveSection(1)
      } else if (errors.basePrice) {
        setActiveSection(3)
      }
      return
    }

    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (onSave) {
      onSave(formData)
    }

    setIsSaving(false)
  }

  const stepTitles = {
    1: '제품 스펙',
    2: '제품 소개',
    3: '국가별 가격/배송'
  }

  return (
    <div className="product-registration-wizard">
      {/* 단계 표시 - 상단 고정 */}
      <div className="wizard-header">
        <div className="wizard-progress">
          <span className="wizard-step-current">Step {activeSection}</span>
          <span className="wizard-step-total">/ 3</span>
        </div>
        <h2 className="wizard-title">{stepTitles[activeSection]}</h2>
        <div className="wizard-dots">
          {[1, 2, 3].map(step => (
            <span
              key={step}
              className={`wizard-dot ${step === activeSection ? 'active' : ''} ${step < activeSection ? 'done' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* 섹션 콘텐츠 */}
      <div className="pr-content">
        {activeSection === 1 && (
          <Step1ProductSpec
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        )}

        {activeSection === 2 && (
          <Step2ProductPresentation
            formData={formData}
            updateField={updateField}
          />
        )}

        {activeSection === 3 && (
          <Step3CountryPricing
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        )}
      </div>

      {/* 하단 고정 버튼 */}
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
          {activeSection < 3 ? (
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
