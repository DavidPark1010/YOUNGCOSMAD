import './Inquiry.css'

function InquiryList({ t, filteredInquiries, stats, filter, setFilter, formatDate, onSelectInquiry }) {
  return (
    <>
      <div className="admin-summary">
        <div className="summary-card">
          <span className="summary-label">{t.inquiries.total}</span>
          <span className="summary-value">{stats.total}</span>
          <span className="summary-sub">{t.inquiries.thisWeek}</span>
        </div>
        <div className="summary-card highlight">
          <span className="summary-label">{t.inquiries.new}</span>
          <span className="summary-value">{stats.new}</span>
          <span className="summary-sub">{t.inquiries.today}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">{t.inquiries.responded}</span>
          <span className="summary-value">{stats.responded}</span>
          <span className="summary-sub">{t.inquiries.thisWeek}</span>
        </div>
      </div>

      <div className="admin-filters">
        {['all', 'newOnly', 'whatsapp', 'email'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {t.filters[f]}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t.table.status}</th>
              <th>{t.table.product}</th>
              <th>{t.table.contact}</th>
              <th>{t.table.contactInfo}</th>
              <th>{t.table.date}</th>
              <th>{t.table.preview}</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map(inquiry => (
              <tr
                key={inquiry.id}
                className={`table-row ${inquiry.status}`}
                onClick={() => onSelectInquiry(inquiry)}
              >
                <td>
                  <span className={`status-badge ${inquiry.status}`}>
                    {t.status[inquiry.status]}
                  </span>
                </td>
                <td className="product-cell">
                  <img src={inquiry.productImage} alt="" className="product-thumb" />
                  <div>
                    <span className="product-name-cell">{inquiry.productName}</span>
                    <span className="product-category-cell">{inquiry.productCategory}</span>
                  </div>
                </td>
                <td>
                  <span className={`contact-badge ${inquiry.contactMethod}`}>
                    {inquiry.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
                  </span>
                </td>
                <td className="contact-info-cell">{inquiry.contactValue}</td>
                <td className="date-cell">{formatDate(inquiry.timestamp)}</td>
                <td className="preview-cell">
                  {inquiry.conversation[inquiry.conversation.length - 2]?.content.substring(0, 40)}...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default InquiryList
