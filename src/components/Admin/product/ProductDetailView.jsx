import './ProductDetailView.css'

function ProductDetailView({ product, onBack, onEdit, onDelete }) {
  const images = product.brandImages || (product.brandImage ? [product.brandImage] : [])

  return (
    <div className="pdv-container">
      <button className="pdv-back" onClick={onBack}>
        ← 목록으로
      </button>

      <div className="pdv-layout">
        {/* Left: Images */}
        <div className="pdv-image-wrap">
          {images.length > 0 ? (
            <div className={`pdv-image-grid ${images.length === 1 ? 'single' : ''}`}>
              {images.map((img, index) => (
                <img key={index} src={img} alt={`${product.brandName} ${index + 1}`} />
              ))}
            </div>
          ) : (
            <div className="pdv-no-image">No Image</div>
          )}
        </div>

        {/* Right: All info */}
        <div className="pdv-info">
          <span className="pdv-category">{product.category}</span>
          <h2 className="pdv-brand">{product.brandName}</h2>

          {product.description && (
            <p className="pdv-description">{product.description}</p>
          )}

          <hr className="pdv-divider" />

          <h4 className="pdv-models-title">모델 목록</h4>
          <div className="pdv-model-list">
            {product.models.map((model, index) => (
              <div key={index} className="pdv-model-card">
                <span className="pdv-model-name">{model.name}</span>
                {model.description && (
                  <span className="pdv-model-desc">{model.description}</span>
                )}
              </div>
            ))}
          </div>

          <div className="pdv-actions">
            <button className="pdv-edit-btn" onClick={() => onEdit(product)}>
              수정하기
            </button>
            <button className="pdv-delete-btn" onClick={() => onDelete(product.id)}>
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailView
