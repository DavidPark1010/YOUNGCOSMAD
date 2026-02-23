import { useState, useRef } from 'react'
import './ProductRegistration.css'

const categories = [
  { key: 'fillers', label: 'Fillers' },
  { key: 'botox', label: 'Botox' },
  { key: 'skinboosters', label: 'Skin Boosters' },
  { key: 'lipolytics', label: 'Lipolytics' },
]

function ProductRegistration({ onClose, onSave, editProduct = null }) {
  const [formData, setFormData] = useState(() => {
    if (editProduct) {
      return {
        category: editProduct.category || '',
        brandName: editProduct.brandName || '',
        brandImage: editProduct.brandImage || null,
        models: editProduct.models || [{ name: '', description: '' }],
      }
    }
    return {
      category: '',
      brandName: '',
      brandImage: null,
      models: [{ name: '', description: '' }],
    }
  })

  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef(null)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const updateModel = (index, field, value) => {
    const newModels = [...formData.models]
    newModels[index] = { ...newModels[index], [field]: value }
    setFormData(prev => ({ ...prev, models: newModels }))
  }

  const addModel = () => {
    setFormData(prev => ({
      ...prev,
      models: [...prev.models, { name: '', description: '' }]
    }))
  }

  const removeModel = (index) => {
    if (formData.models.length > 1) {
      setFormData(prev => ({
        ...prev,
        models: prev.models.filter((_, i) => i !== index)
      }))
    }
  }

  const handleImageUpload = (files) => {
    const file = files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      updateField('brandImage', {
        file,
        preview: e.target.result,
        name: file.name
      })
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    updateField('brandImage', null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
    handleImageUpload(e.dataTransfer.files)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.category) newErrors.category = '카테고리를 선택해주세요'
    if (!formData.brandName.trim()) newErrors.brandName = '브랜드명은 필수입니다'

    const hasValidModel = formData.models.some(m => m.name.trim())
    if (!hasValidModel) newErrors.models = '최소 1개 모델의 제품명을 입력해주세요'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    if (onSave) {
      onSave(formData)
    }
    setIsSaving(false)
  }

  return (
    <div className="pr-container">
      <div className="pr-form">
        {/* Category */}
        <div className="pr-field-group">
          <label className="pr-label">카테고리</label>
          {errors.category && <span className="pr-error">{errors.category}</span>}
          <div className="pr-category-grid">
            {categories.map(cat => (
              <button
                key={cat.key}
                type="button"
                className={`pr-category-card ${formData.category === cat.key ? 'active' : ''}`}
                onClick={() => updateField('category', cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Name */}
        <div className="pr-field-group">
          <label className="pr-label">브랜드명 *</label>
          {errors.brandName && <span className="pr-error">{errors.brandName}</span>}
          <input
            type="text"
            className={`pr-input ${errors.brandName ? 'error' : ''}`}
            value={formData.brandName}
            onChange={(e) => updateField('brandName', e.target.value)}
            placeholder="예: Neuramis"
          />
        </div>

        {/* Brand Image */}
        <div className="pr-field-group">
          <label className="pr-label">브랜드 사진 (선택)</label>
          <div
            className="pr-image-upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {formData.brandImage ? (
              <div className="pr-image-preview">
                <img src={formData.brandImage.preview} alt="브랜드 이미지" />
                <button
                  type="button"
                  className="pr-image-remove"
                  onClick={(e) => { e.stopPropagation(); removeImage() }}
                >
                  삭제
                </button>
              </div>
            ) : (
              <div className="pr-image-placeholder">
                클릭하여 이미지 업로드
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>

        {/* Models */}
        <div className="pr-field-group">
          <label className="pr-label">모델 목록</label>
          {errors.models && <span className="pr-error">{errors.models}</span>}
          <div className="pr-model-list">
            {formData.models.map((model, index) => (
              <div key={index} className="pr-model-item">
                <div className="pr-model-header">
                  <span className="pr-model-number">모델 {index + 1}</span>
                  {formData.models.length > 1 && (
                    <button
                      type="button"
                      className="pr-model-delete"
                      onClick={() => removeModel(index)}
                    >
                      삭제
                    </button>
                  )}
                </div>
                <div className="pr-model-fields">
                  <div className="pr-model-field">
                    <label>제품명</label>
                    <input
                      type="text"
                      value={model.name}
                      onChange={(e) => updateModel(index, 'name', e.target.value)}
                      placeholder="예: Neuramis Volume Lidocaine"
                    />
                  </div>
                  <div className="pr-model-field">
                    <label>설명</label>
                    <input
                      type="text"
                      value={model.description}
                      onChange={(e) => updateModel(index, 'description', e.target.value)}
                      placeholder="예: 1.1ml, Deep layer filler with lidocaine"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="pr-add-model" onClick={addModel}>
            + 모델 추가
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="pr-footer">
        <button type="button" className="pr-btn-cancel" onClick={onClose}>
          취소
        </button>
        <button
          type="button"
          className="pr-btn-save"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  )
}

export default ProductRegistration
