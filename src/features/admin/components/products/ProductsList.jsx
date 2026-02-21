function ProductsList({ products, formatDateShort, onEdit, onDelete }) {
  return (
    <>
      <div className="products-header-simple">
        <p className="products-helper-text">등록된 제품 목록입니다. 제품을 클릭하면 수정할 수 있습니다.</p>
        <button className="add-product-btn-large" onClick={() => onEdit(null)}>
          + 새 제품 등록하기
        </button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>상태</th>
              <th>제품코드</th>
              <th>제품</th>
              <th>카테고리</th>
              <th>MOQ</th>
              <th>수정일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="table-row">
                <td>
                  <span className={`status-badge ${product.status}`}>
                    {product.status === 'active' ? '활성' : product.status === 'draft' ? '임시저장' : '비활성'}
                  </span>
                </td>
                <td>
                  <span className="product-id-cell">{product.productId}</span>
                </td>
                <td className="product-cell">
                  <img src={product.image} alt="" className="product-thumb" />
                  <div>
                    <span className="product-name-cell">{product.nameKr}</span>
                    <span className="product-category-cell">{product.nameEn}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.moq}</td>
                <td className="date-cell">{formatDateShort(product.updatedAt)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => onEdit(product)}>
                      수정
                    </button>
                    <button className="action-btn delete" onClick={() => onDelete(product.id)}>
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProductsList
