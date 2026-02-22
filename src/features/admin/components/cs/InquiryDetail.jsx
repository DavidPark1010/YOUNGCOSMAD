import { useState } from 'react'

const statusLabels = {
  new: '신규',
  reviewed: '확인',
  responded: '응답완료',
  closed: '종료'
}

const statusFlow = ['new', 'reviewed', 'responded', 'closed']

function InquiryDetail({ inquiry, onBack, onUpdateStatus, onUpdateMemo }) {
  const [memo, setMemo] = useState(inquiry.adminMemo || '')
  const [memoSaved, setMemoSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentIdx = statusFlow.indexOf(inquiry.status)
  const nextStatus = currentIdx < statusFlow.length - 1 ? statusFlow[currentIdx + 1] : null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inquiry.contactValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = inquiry.contactValue
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSaveMemo = () => {
    onUpdateMemo(inquiry.id, memo)
    setMemoSaved(true)
    setTimeout(() => setMemoSaved(false), 2000)
  }

  return (
    <div className="cs-detail">
      <button className="detail-back-btn" onClick={onBack}>
        ← 목록으로 돌아가기
      </button>

      <div className="cs-detail-layout">
        {/* 왼쪽: 대화 기록 */}
        <div className="cs-detail-main">
          {/* 문의 정보 헤더 */}
          <div className="cs-detail-header-card">
            <div className="cs-detail-header-top">
              <div>
                <span className="cs-detail-id">{inquiry.id}</span>
                <span className={`status-badge cs-${inquiry.status}`} style={{ marginLeft: 12 }}>
                  {statusLabels[inquiry.status]}
                </span>
              </div>
              <span className="cs-detail-date">
                {new Date(inquiry.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
            <div className="cs-detail-product">
              <span className="cs-detail-product-label">제품:</span>
              <span className="cs-detail-product-name">{inquiry.productName}</span>
              {inquiry.productId && (
                <span className="cs-detail-product-id">({inquiry.productId})</span>
              )}
            </div>
          </div>

          {/* 대화 기록 뷰어 */}
          <div className="cs-conversation-card">
            <h4 className="cs-section-title">대화 기록</h4>
            <div className="cs-conversation-log">
              {inquiry.conversationLog.length === 0 ? (
                <p className="cs-no-conversation">대화 기록이 없습니다.</p>
              ) : (
                inquiry.conversationLog.map((msg, idx) => (
                  <div key={idx} className={`cs-chat-msg ${msg.type}`}>
                    <div className="cs-chat-label">
                      {msg.type === 'user' ? '바이어' : '시스템'}
                    </div>
                    <div className="cs-chat-bubble">
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽: 연락처 + 상태 + 메모 */}
        <div className="cs-detail-sidebar">
          {/* 연락처 카드 */}
          <div className="cs-contact-card">
            <h4 className="cs-section-title">바이어 연락처</h4>
            <div className="cs-contact-info">
              <span className={`cs-method-badge large ${inquiry.contactMethod}`}>
                {inquiry.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
              </span>
              <div className="cs-contact-value-row">
                <span className="cs-contact-value-large">{inquiry.contactValue}</span>
                <button className="cs-copy-btn" onClick={handleCopy}>
                  {copied ? '복사됨!' : '복사'}
                </button>
              </div>
            </div>
            <div className="cs-source-info">
              <span className="cs-source-label">접수 경로:</span>
              <span className="cs-source-value">
                {inquiry.source === 'chatPanel' ? '제품 채팅' : '채팅방'}
              </span>
            </div>
          </div>

          {/* 상태 변경 카드 */}
          <div className="cs-status-card">
            <h4 className="cs-section-title">상태 관리</h4>
            <div className="cs-status-flow">
              {statusFlow.map((status, idx) => {
                const isCurrent = inquiry.status === status
                const isPast = idx < currentIdx
                return (
                  <div key={status} className="cs-status-flow-item">
                    {idx > 0 && <div className={`cs-status-line ${isPast || isCurrent ? 'active' : ''}`} />}
                    <div className={`cs-status-step ${isCurrent ? 'current' : isPast ? 'past' : 'future'}`}>
                      {statusLabels[status]}
                    </div>
                  </div>
                )
              })}
            </div>
            {nextStatus && (
              <button
                className="cs-advance-btn"
                onClick={() => onUpdateStatus(inquiry.id, nextStatus)}
              >
                {statusLabels[nextStatus]}(으)로 변경
              </button>
            )}
            {inquiry.status === 'closed' && (
              <p className="cs-status-done">이 문의는 종료되었습니다.</p>
            )}
          </div>

          {/* 관리자 메모 */}
          <div className="cs-memo-card">
            <h4 className="cs-section-title">관리자 메모</h4>
            <textarea
              className="cs-memo-textarea"
              value={memo}
              onChange={e => setMemo(e.target.value)}
              placeholder="바이어 관련 메모를 작성하세요..."
              rows={4}
            />
            <button className="cs-memo-save-btn" onClick={handleSaveMemo}>
              {memoSaved ? '저장됨!' : '메모 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InquiryDetail
