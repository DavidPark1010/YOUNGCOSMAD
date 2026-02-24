import { useState } from 'react'
import './ProductList.css'

const categoryFilters = ['전체', 'Fillers', 'Botox', 'Skin Boosters', 'Lipolytics']

function ProductList({ products, onOpenForm, onDeleteConfirm, onSelectProduct }) {
  const [activeFilter, setActiveFilter] = useState('전체')

  const filtered = activeFilter === '전체'
    ? products
    : products.filter(p => p.category === activeFilter)

  return (
    <>
      <div className="pl-header">
        <div className="pl-filters">
          {categoryFilters.map(cat => (
            <button
              key={cat}
              className={`pl-filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="pl-add-btn" onClick={() => onOpenForm()}>
          + 새 제품 등록
        </button>
      </div>

      <div className="pl-grid">
        {filtered.map(product => (
          <div
            key={product.id}
            className="pl-card"
            onClick={() => onSelectProduct(product)}
          >
            <div className="pl-card-image">
              {(product.brandImages?.[0] || product.brandImage) ? (
                <img src={product.brandImages?.[0] || product.brandImage} alt={product.brandName} />
              ) : (
                <div className="pl-card-no-image">No Image</div>
              )}
            </div>
            <div className="pl-card-body">
              <span className="pl-card-category">{product.category}</span>
              <h3 className="pl-card-brand">{product.brandName}</h3>
              <span className="pl-card-models">
                {product.models.length} model{product.models.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="pl-card-actions">
              <button
                className="pl-action-btn edit"
                onClick={(e) => { e.stopPropagation(); onOpenForm(product) }}
              >
                수정
              </button>
              <button
                className="pl-action-btn delete"
                onClick={(e) => { e.stopPropagation(); onDeleteConfirm(product.id) }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="pl-empty">등록된 제품이 없습니다.</div>
      )}
    </>
  )
}

export default ProductList
