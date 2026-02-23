function InquiryDetail({ t, inquiry, copied, onCopy, onUpdateStatus, onBack }) {
  return (
    <div className="inquiry-detail">
      <button className="detail-back-btn" onClick={onBack}>
        ← {t.detail.back}
      </button>
      <div className="detail-content">
        <div className="detail-product">
          <img src={inquiry.productImage} alt={inquiry.productName} className="detail-product-image" />
          <h3 className="detail-product-name">{inquiry.productName}</h3>
          <span className="detail-product-category">{inquiry.productCategory}</span>
          <div className="detail-status-section">
            <span className="detail-label">{t.detail.markAs}</span>
            <div className="status-buttons">
              {['new', 'reviewed', 'responded'].map(status => (
                <button
                  key={status}
                  className={`status-btn ${inquiry.status === status ? 'active' : ''}`}
                  onClick={() => onUpdateStatus(inquiry.id, status)}
                >
                  {t.status[status]}
                </button>
              ))}
            </div>
          </div>
          <div className="detail-contact-section">
            <span className="detail-label">{t.detail.contactInfo}</span>
            <div className="contact-box">
              <span className={`contact-method ${inquiry.contactMethod}`}>
                {inquiry.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
              </span>
              <span className="contact-value">{inquiry.contactValue}</span>
              <button className="copy-btn" onClick={() => onCopy(inquiry.contactValue)}>
                {copied ? t.detail.copied : t.detail.copy}
              </button>
            </div>
          </div>
        </div>
        <div className="detail-conversation">
          <h3 className="conversation-title">{t.detail.conversation}</h3>
          <div className="conversation-timeline">
            {inquiry.conversation.map((msg, idx) => {
              const isPriceMsg = msg.content.toLowerCase().includes('price') ||
                                msg.content.toLowerCase().includes('cost') ||
                                msg.content.includes('가격') ||
                                msg.content.includes('얼마')
              return (
                <div key={idx} className={`timeline-item ${msg.type} ${isPriceMsg && msg.type === 'user' ? 'price-highlight' : ''}`}>
                  <span className="timeline-time">{msg.time}</span>
                  <div className="timeline-content">
                    {isPriceMsg && msg.type === 'user' && (
                      <span className="price-tag">{t.detail.priceInquiry}</span>
                    )}
                    <p>{msg.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InquiryDetail
