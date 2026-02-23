import './ProductList.css'

function ProductList({ products, formatDateShort, onOpenForm, onDeleteConfirm }) {
  // Group products by brand (for display as brand cards)
  // For now, treat each product as a brand card
  return (
    <>
      <div className="products-header-simple">
        <button className="add-product-btn-large" onClick={() => onOpenForm()}>
          + 새 제품 등록
        </button>
      </div>
      <div className="product-card-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-card-info">
              <span className="product-card-name">{product.nameEn}</span>
              <span className="product-card-category">{product.category}</span>
            </div>
            <div className="product-card-meta">
              <span className="product-card-models">
                MOQ {product.moq}
              </span>
            </div>
            <div className="product-card-actions">
              <button className="action-btn edit" onClick={() => onOpenForm(product)}>
                수정
              </button>
              <button className="action-btn delete" onClick={() => onDeleteConfirm(product.id)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductList
