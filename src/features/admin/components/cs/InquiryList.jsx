import { useState } from 'react'

const statusLabels = {
  new: '신규',
  reviewed: '확인',
  responded: '응답완료',
  closed: '종료'
}

const statusFilters = ['new', 'reviewed', 'responded', 'closed']

function InquiryList({ inquiries, inquiryStats, onSelectInquiry, onDeleteInquiry, formatDateShort }) {
  const [activeFilter, setActiveFilter] = useState(null)

  const filtered = activeFilter
    ? inquiries.filter(i => i.status === activeFilter)
    : inquiries

  return (
    <>
      {/* 요약 카드 */}
      <div className="admin-summary cs-summary">
        <div className="summary-card">
          <span className="summary-label">신규</span>
          <span className="summary-value">{inquiryStats.new}</span>
        </div>
        <div className="summary-card highlight">
          <span className="summary-label">확인</span>
          <span className="summary-value">{inquiryStats.reviewed}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">응답완료</span>
          <span className="summary-value">{inquiryStats.responded}</span>
        </div>
      </div>

      {/* 필터 칩 */}
      <div className="order-filter-bar">
        <button
          className={`order-filter-chip ${!activeFilter ? 'active' : ''}`}
          onClick={() => setActiveFilter(null)}
        >
          전체 ({inquiryStats.total})
        </button>
        {statusFilters.map(status => (
          <button
            key={status}
            className={`order-filter-chip ${activeFilter === status ? 'active' : ''}`}
            onClick={() => setActiveFilter(activeFilter === status ? null : status)}
          >
            {statusLabels[status]} ({inquiryStats[status]})
          </button>
        ))}
      </div>

      {/* 테이블 */}
      {filtered.length === 0 ? (
        <div className="cs-empty-state">
          <div className="cs-empty-icon">📭</div>
          <h3>아직 접수된 문의가 없습니다</h3>
          <p>바이어가 채팅에서 가격 문의를 제출하면 여기에 표시됩니다.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>상태</th>
                <th>제품</th>
                <th>연락처</th>
                <th>대화 미리보기</th>
                <th>접수일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inquiry => {
                const lastUserMsg = [...inquiry.conversationLog].reverse().find(m => m.type === 'user')
                const preview = lastUserMsg ? lastUserMsg.content : ''
                return (
                  <tr key={inquiry.id} className="table-row">
                    <td>
                      <span className={`status-badge cs-${inquiry.status}`}>
                        {statusLabels[inquiry.status]}
                      </span>
                    </td>
                    <td>
                      <span className="cs-product-name">{inquiry.productName}</span>
                    </td>
                    <td>
                      <div className="cs-contact-cell">
                        <span className={`cs-method-badge ${inquiry.contactMethod}`}>
                          {inquiry.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
                        </span>
                        <span className="cs-contact-value">{inquiry.contactValue}</span>
                      </div>
                    </td>
                    <td>
                      <span className="cs-preview">{preview.length > 40 ? preview.slice(0, 40) + '...' : preview}</span>
                    </td>
                    <td className="date-cell">{formatDateShort(inquiry.createdAt)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          className="action-btn view"
                          onClick={() => onSelectInquiry(inquiry)}
                        >
                          상세보기
                        </button>
                        <button
                          className="order-delete-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteInquiry(inquiry.id)
                          }}
                          title="삭제"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default InquiryList
