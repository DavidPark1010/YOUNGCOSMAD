import { useRef } from 'react'

function Step2ProductPresentation({ formData, updateField }) {
  const mainImageRef = useRef(null)
  const additionalImageRef = useRef(null)

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
    } else {
      fileArray.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          updateField('additionalImages', [
            ...formData.additionalImages,
            { file, preview: e.target.result, name: file.name }
          ])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (type, index) => {
    if (type === 'main') {
      updateField('mainImage', null)
    } else {
      updateField('additionalImages', formData.additionalImages.filter((_, i) => i !== index))
    }
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
    handleImageUpload(type, e.dataTransfer.files)
  }

  return (
    <div className="pr-section-simple">
      <div className="pr-section-intro">
        <p>바이어에게 보여줄 제품 이미지와 설명을 작성합니다.</p>
      </div>

      {/* 이미지 업로드 영역 */}
      <div className="pr-presentation-images">
        {/* 메인 이미지 - 크게 */}
        <div className="pr-main-image-area">
          <label className="pr-field-label">제품 이미지</label>
          <div
            className="pr-dropzone pr-dropzone-main"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'main')}
            onClick={() => mainImageRef.current?.click()}
          >
            {formData.mainImage ? (
              <div className="pr-preview-single pr-preview-main">
                <img src={formData.mainImage.preview} alt="메인 이미지" />
                <button
                  type="button"
                  className="pr-preview-remove"
                  onClick={(e) => { e.stopPropagation(); removeImage('main') }}
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="pr-dropzone-content">
                <span className="pr-dropzone-icon-large">+</span>
                <span className="pr-dropzone-text">메인 이미지를 드래그하거나 클릭하여 업로드</span>
                <span className="pr-dropzone-hint">권장: 800x800px, JPG/PNG</span>
              </div>
            )}
          </div>
          <input
            ref={mainImageRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload('main', e.target.files)}
            style={{ display: 'none' }}
          />
        </div>

        {/* 추가 이미지 - 썸네일 갤러리 */}
        <div className="pr-additional-images">
          <label className="pr-field-label">추가 이미지</label>
          <div className="pr-thumb-gallery">
            {formData.additionalImages.map((img, index) => (
              <div key={index} className="pr-thumb-item">
                <img src={img.preview} alt={`추가 ${index + 1}`} />
                <button
                  type="button"
                  className="pr-preview-remove"
                  onClick={() => removeImage('additional', index)}
                >
                  ×
                </button>
              </div>
            ))}
            {formData.additionalImages.length < 8 && (
              <div
                className="pr-thumb-add"
                onClick={() => additionalImageRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'additional')}
              >
                <span>+</span>
              </div>
            )}
          </div>
          <input
            ref={additionalImageRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload('additional', e.target.files)}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* 제품 설명 */}
      <div className="pr-field full-width" style={{ marginTop: 32 }}>
        <label>제품 설명</label>
        <p className="pr-field-desc">
          바이어에게 보여줄 제품 설명을 자유롭게 작성하세요. 제품 특징, 셀링포인트, 성분, 사용법 등을 포함할 수 있습니다.
        </p>
        <textarea
          value={formData.description}
          onChange={(e) => {
            if (e.target.value.length <= 2000) {
              updateField('description', e.target.value)
            }
          }}
          placeholder={`예시:\n\n[제품 특징]\n고농축 히알루론산이 함유된 즉각 보습 세럼으로, 건조한 피부에 깊은 수분을 공급합니다.\n\n[주요 성분]\n히알루론산, 나이아신아마이드, 판테놀\n\n[사용법]\n세안 후 2-3방울 도포`}
          rows={10}
          className="pr-description-textarea"
        />
        <div className="pr-char-count">
          <span className={formData.description.length > 1800 ? 'warning' : ''}>
            {formData.description.length}
          </span>
          {' '}/ 2,000
        </div>
      </div>
    </div>
  )
}

export default Step2ProductPresentation
