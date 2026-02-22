import { useState, useRef, useEffect } from 'react'
import { saveInquiry } from '../../utils/inquiryStorage'
import './ChatPanel.css'

const uiText = {
  en: {
    title: 'Product Information Desk',
    subtitle: 'Get detailed information about this product.\nOur team is available 24/7 to assist you.',
    placeholder: 'Type your question...',
    send: 'Send',
    priceResponse: `Thank you for your interest.\n\nFor accurate pricing details, our Sales Operations Team will provide personalized information based on your requirements.\n\nPlease leave your preferred contact method, and we will get back to you shortly.`,
    contactForm: {
      title: 'Submit Pricing Inquiry',
      method: 'Contact Method',
      whatsapp: 'WhatsApp',
      email: 'Email',
      whatsappPlaceholder: 'Enter your WhatsApp number',
      emailPlaceholder: 'Enter your email address',
      submit: 'Submit Inquiry',
      submitting: 'Submitting...',
      note: 'We will review your request and respond with pricing details as soon as possible.',
      success: 'Thank you. Our team will contact you shortly with pricing information.'
    },
    successModal: {
      title: 'Inquiry Submitted Successfully',
      subtitle: 'Our team will review your request and contact you via the provided details shortly.',
      primaryBtn: 'Browse More Products',
      secondaryBtn: 'Continue Viewing This Product'
    }
  },
  ko: {
    title: '제품 정보 안내',
    subtitle: '제품에 대한 상세 정보를 안내받으세요.\n24시간 응대 가능합니다.',
    placeholder: '질문을 입력하세요...',
    send: '전송',
    priceResponse: `문의해 주셔서 감사합니다.\n\n정확한 가격 정보는 Sales Operations Team에서 요청 사항에 맞춰 안내드리고 있습니다.\n\n선호하시는 연락 방법을 남겨주시면 빠르게 회신드리겠습니다.`,
    contactForm: {
      title: '가격 문의 제출',
      method: '연락 방법',
      whatsapp: 'WhatsApp',
      email: '이메일',
      whatsappPlaceholder: 'WhatsApp 번호를 입력하세요',
      emailPlaceholder: '이메일 주소를 입력하세요',
      submit: '문의 제출',
      submitting: '제출 중...',
      note: '요청을 검토 후 가능한 빠르게 가격 정보를 안내드리겠습니다.',
      success: '감사합니다. 담당팀에서 곧 가격 정보를 안내드리겠습니다.'
    },
    successModal: {
      title: '가격 요청이 완료되었습니다',
      subtitle: '담당 팀에서 빠르게 확인 후 입력해주신 연락처로 안내드리겠습니다.',
      primaryBtn: '다른 좋은 제품도 돌아보기',
      secondaryBtn: '계속 이 제품 보기'
    }
  }
}

// 가격 관련 키워드 감지
const priceKeywords = ['price', 'pricing', 'cost', 'unit price', 'wholesale price', 'how much', '가격', '단가', '얼마', '비용', 'quote', 'quotation']

function isPriceQuestion(message) {
  const lowerMessage = message.toLowerCase()
  return priceKeywords.some(keyword => lowerMessage.includes(keyword))
}

// 응답 생성 (시뮬레이션)
function generateResponse(message, product, lang) {
  const lowerMessage = message.toLowerCase()

  // 제품 전반 정보 요청
  if (lowerMessage.includes('want to know') || lowerMessage.includes('tell me') || lowerMessage.includes('about this') || lowerMessage.includes('this product') || lowerMessage.includes('제품 정보') || lowerMessage.includes('알려') || lowerMessage.includes('설명')) {
    return lang === 'en'
      ? `${product.name} is ${product.description.toLowerCase()}\n\nKey details:\n• Volume: ${product.volume}\n• MOQ: ${product.moq}\n• Certifications: ${product.certifications}\n\nWould you like to know more about ingredients, shipping, or samples?`
      : `${product.name}은 ${product.description}\n\n주요 정보:\n• 용량: ${product.volume}\n• MOQ: ${product.moq}\n• 인증: ${product.certifications}\n\n성분, 배송, 샘플에 대해 더 알고 싶으시면 말씀해 주세요.`
  }

  // 성분 관련
  if (lowerMessage.includes('ingredient') || lowerMessage.includes('성분') || lowerMessage.includes('formul')) {
    return lang === 'en'
      ? `The key ingredients in ${product.name} are: ${product.ingredients}. These have been carefully selected for optimal efficacy and safety.`
      : `${product.name}의 주요 성분은 ${product.ingredients}입니다. 최적의 효능과 안전성을 위해 엄선된 성분들입니다.`
  }

  // 수출/인증 관련
  if (lowerMessage.includes('export') || lowerMessage.includes('수출') || lowerMessage.includes('certification') || lowerMessage.includes('인증') || lowerMessage.includes('cpnp') || lowerMessage.includes('fda')) {
    return lang === 'en'
      ? `Yes, ${product.name} is fully export-ready. Current certifications include: ${product.certifications}. We can provide additional documentation as required for your market.`
      : `네, ${product.name}은 수출 가능 제품입니다. 현재 보유 인증: ${product.certifications}. 수입국 요건에 맞는 추가 서류 제공이 가능합니다.`
  }

  // MOQ 관련
  if (lowerMessage.includes('moq') || lowerMessage.includes('minimum') || lowerMessage.includes('최소') || lowerMessage.includes('수량') || lowerMessage.includes('order quantity')) {
    return lang === 'en'
      ? `The minimum order quantity for ${product.name} is ${product.moq}. For larger volumes, we can discuss customized arrangements.`
      : `${product.name}의 최소 주문 수량은 ${product.moq}입니다. 대량 주문 시 별도 협의가 가능합니다.`
  }

  // 용량/사이즈 관련
  if (lowerMessage.includes('volume') || lowerMessage.includes('size') || lowerMessage.includes('용량') || lowerMessage.includes('사이즈') || lowerMessage.includes('ml') || lowerMessage.includes('gram')) {
    return lang === 'en'
      ? `${product.name} comes in ${product.volume} packaging. Custom packaging sizes may be available for bulk orders.`
      : `${product.name}은 ${product.volume} 용량으로 제공됩니다. 대량 주문 시 커스텀 패키징이 가능할 수 있습니다.`
  }

  // 유통기한 관련
  if (lowerMessage.includes('shelf') || lowerMessage.includes('expir') || lowerMessage.includes('유통') || lowerMessage.includes('사용기한')) {
    return lang === 'en'
      ? `${product.name} has a shelf life of ${product.shelfLife} from the date of manufacture. All products are shipped with sufficient remaining shelf life for retail distribution.`
      : `${product.name}의 사용기한은 제조일로부터 ${product.shelfLife}입니다. 모든 제품은 유통에 충분한 잔여 사용기한을 확보하여 출고됩니다.`
  }

  // 샘플 관련
  if (lowerMessage.includes('sample') || lowerMessage.includes('샘플') || lowerMessage.includes('테스트')) {
    return lang === 'en'
      ? `Yes, we provide samples for qualified wholesale buyers. Please submit your inquiry with your business details, and our team will arrange sample shipment.`
      : `네, 도매 바이어 대상으로 샘플 제공이 가능합니다. 비즈니스 정보와 함께 문의를 남겨주시면 샘플 발송을 안내드리겠습니다.`
  }

  // 배송 관련
  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('배송') || lowerMessage.includes('운송')) {
    return lang === 'en'
      ? `We ship worldwide via trusted logistics partners. Shipping terms (FOB, CIF, etc.) and lead times can be discussed based on your location and order volume.`
      : `전 세계 배송이 가능하며, 신뢰할 수 있는 물류 파트너를 통해 진행됩니다. 배송 조건(FOB, CIF 등)과 리드타임은 지역과 주문량에 따라 협의 가능합니다.`
  }

  // OEM/ODM 관련
  if (lowerMessage.includes('oem') || lowerMessage.includes('odm') || lowerMessage.includes('private label') || lowerMessage.includes('custom') || lowerMessage.includes('자체') || lowerMessage.includes('커스텀')) {
    return lang === 'en'
      ? `Yes, we offer OEM/ODM services for qualified partners. Custom formulations, packaging, and private labeling options are available. Please share your requirements for a detailed discussion.`
      : `네, OEM/ODM 서비스를 제공하고 있습니다. 맞춤 포뮬레이션, 패키징, 자체 브랜드 라벨링이 가능합니다. 세부 요건을 공유해 주시면 상세 논의가 가능합니다.`
  }

  // 기본 응답
  return lang === 'en'
    ? `Thank you for your question about ${product.name}. This is ${product.description.toLowerCase()} Would you like more specific information about ingredients, certifications, MOQ, or shipping?`
    : `${product.name}에 대한 문의 감사합니다. 이 제품은 ${product.description} 성분, 인증, MOQ, 또는 배송에 대해 더 구체적인 정보가 필요하시면 말씀해 주세요.`
}

function ChatPanel({ product, productId, lang, onClose, onNavigateToProducts }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPriceForm, setShowPriceForm] = useState(false)
  const [contactMethod, setContactMethod] = useState('whatsapp')
  const [contactValue, setContactValue] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const messagesEndRef = useRef(null)
  const text = uiText[lang]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userMessage }])

    // Simulate typing delay (2초 + 랜덤 0.5초)
    const delay = 2000 + Math.random() * 500

    setTimeout(() => {
      // Check if price question
      if (isPriceQuestion(userMessage)) {
        setMessages(prev => [...prev, { type: 'assistant', content: text.priceResponse }])
        setShowPriceForm(true)
      } else {
        const response = generateResponse(userMessage, product, lang)
        setMessages(prev => [...prev, { type: 'assistant', content: response }])
      }
      setIsLoading(false)
    }, delay)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFormSubmit = async () => {
    if (!contactValue.trim() || isSubmitting) return

    setIsSubmitting(true)

    // localStorage에 문의 저장
    saveInquiry({
      productId,
      productName: product.name,
      conversationLog: messages,
      contactMethod,
      contactValue: contactValue.trim(),
      source: 'chatPanel'
    })

    // 제출 시뮬레이션 (실제 API 호출 시 await fetch(...) 사용)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setFormSubmitted(true)
    setShowPriceForm(false)
    setShowSuccessModal(true)

    // 입력값 초기화
    setContactValue('')
    setContactMethod('whatsapp')
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  const handleNavigateToProducts = () => {
    setShowSuccessModal(false)
    if (onNavigateToProducts) {
      onNavigateToProducts()
    }
  }

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showSuccessModal) {
        handleCloseSuccessModal()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [showSuccessModal])

  return (
    <div className="chat-panel">
      <div className="chat-panel-header">
        <div className="chat-panel-title-group">
          <h3 className="chat-panel-title">{text.title}</h3>
          <p className="chat-panel-subtitle">{text.subtitle}</p>
        </div>
        <button className="chat-panel-close" onClick={onClose}>×</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            <div className="chat-message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message assistant">
            <div className="chat-message-content chat-loading">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Price Inquiry Form */}
      {showPriceForm && !formSubmitted && (
        <div className="price-inquiry-form">
          <h4 className="form-title">{text.contactForm.title}</h4>
          <div className="form-group">
            <label className="form-label">{text.contactForm.method}</label>
            <div className="form-radio-group">
              <label className={`radio-option ${contactMethod === 'whatsapp' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={contactMethod === 'whatsapp'}
                  onChange={(e) => setContactMethod(e.target.value)}
                />
                <span>{text.contactForm.whatsapp}</span>
              </label>
              <label className={`radio-option ${contactMethod === 'email' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={contactMethod === 'email'}
                  onChange={(e) => setContactMethod(e.target.value)}
                />
                <span>{text.contactForm.email}</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <input
              type={contactMethod === 'email' ? 'email' : 'tel'}
              className="form-input"
              placeholder={contactMethod === 'email' ? text.contactForm.emailPlaceholder : text.contactForm.whatsappPlaceholder}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
            />
          </div>
          <button
            className="form-submit-btn"
            onClick={handleFormSubmit}
            disabled={isSubmitting || !contactValue.trim()}
          >
            {isSubmitting ? text.contactForm.submitting : text.contactForm.submit}
          </button>
          <p className="form-note">{text.contactForm.note}</p>
        </div>
      )}

      {/* Chat Input */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder={text.placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={formSubmitted}
        />
        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={!inputValue.trim() || formSubmitted || isLoading}
        >
          {text.send}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={handleCloseSuccessModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-modal-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
                <path d="M14 24L21 31L34 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="success-modal-title">{text.successModal.title}</h3>
            <p className="success-modal-subtitle">{text.successModal.subtitle}</p>
            <div className="success-modal-buttons">
              <button className="success-modal-btn primary" onClick={handleNavigateToProducts}>
                {text.successModal.primaryBtn}
              </button>
              <button className="success-modal-btn secondary" onClick={handleCloseSuccessModal}>
                {text.successModal.secondaryBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPanel
