import { useState, useRef, useEffect } from 'react'
import { saveInquiry } from '../../utils/inquiryStorage'
import './ChatRoom.css'

// 제품 데이터베이스
const productDatabase = [
  {
    id: 1,
    productId: 'BL-SK-001',
    nameEn: 'Hydra Glow Serum',
    nameKr: '하이드라 글로우 세럼',
    category: 'Skincare',
    categoryKr: '스킨케어',
    image: '/product1.png',
    description: 'A lightweight hydrating serum formulated with hyaluronic acid and niacinamide for deep moisture and radiant skin.',
    descriptionKr: '히알루론산과 나이아신아마이드로 깊은 보습과 빛나는 피부를 위한 가벼운 하이드레이팅 세럼입니다.',
    ingredients: 'Hyaluronic Acid, Niacinamide, Centella Asiatica Extract, Panthenol',
    usage: 'Apply 2-3 drops after cleansing. Pat gently for absorption.',
    texture: 'lightweight, watery, fast-absorbing',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '500 units',
    markets: 'EU, US, ASIA',
    keywords: ['serum', 'hydrating', 'lightweight', 'watery', 'moisture', 'glow', 'radiant', 'hyaluronic']
  },
  {
    id: 2,
    productId: 'BL-MK-001',
    nameEn: 'Velvet Matte Lip Tint',
    nameKr: '벨벳 매트 립틴트',
    category: 'Makeup',
    categoryKr: '메이크업',
    image: '/product2.png',
    description: 'Long-lasting velvet matte finish lip tint with intense color payoff and comfortable wear.',
    descriptionKr: '강렬한 발색과 편안한 착용감의 롱래스팅 벨벳 매트 피니시 립틴트입니다.',
    ingredients: 'Jojoba Oil, Vitamin E, Natural Pigments',
    usage: 'Apply directly to lips. Build up for more intense color.',
    texture: 'velvet, matte, smooth, long-lasting',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '300 units',
    markets: 'Global',
    keywords: ['lip', 'tint', 'matte', 'velvet', 'color', 'lipstick', 'makeup', 'long-lasting']
  },
  {
    id: 3,
    productId: 'BL-SK-002',
    nameEn: 'Cica Repair Cream',
    nameKr: '시카 리페어 크림',
    category: 'Skincare',
    categoryKr: '스킨케어',
    image: '/product3.png',
    description: 'Intensive repair cream with Centella Asiatica for sensitive and damaged skin barrier restoration.',
    descriptionKr: '센텔라 아시아티카로 민감하고 손상된 피부 장벽 회복을 위한 집중 리페어 크림입니다.',
    ingredients: 'Centella Asiatica, Madecassoside, Ceramide NP, Beta-Glucan',
    usage: 'Apply generously to face and neck as the last step of skincare.',
    texture: 'rich, soothing, protective',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered, Vegan Certified',
    moq: '400 units',
    markets: 'EU, ASIA',
    keywords: ['cream', 'cica', 'repair', 'sensitive', 'soothing', 'barrier', 'centella', 'calming']
  },
  {
    id: 4,
    productId: 'BL-CL-001',
    nameEn: 'Double Cleansing Oil',
    nameKr: '더블 클렌징 오일',
    category: 'Cleansing',
    categoryKr: '클렌징',
    image: '/product4.png',
    description: 'Gentle yet effective cleansing oil that removes makeup and impurities without stripping moisture.',
    descriptionKr: '수분을 빼앗지 않으면서 메이크업과 노폐물을 효과적으로 제거하는 순한 클렌징 오일입니다.',
    ingredients: 'Jojoba Seed Oil, Olive Oil, Grape Seed Oil, Vitamin E',
    usage: 'Massage onto dry face, emulsify with water, then rinse.',
    texture: 'silky, emulsifying, gentle',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '600 units',
    markets: 'Global',
    keywords: ['cleansing', 'oil', 'makeup remover', 'gentle', 'double cleanse', 'cleaner']
  },
  {
    id: 5,
    productId: 'BL-SK-003',
    nameEn: 'Peptide Eye Contour',
    nameKr: '펩타이드 아이 컨투어',
    category: 'Skincare',
    categoryKr: '스킨케어',
    image: '/product5.png',
    description: 'Advanced eye cream with peptide complex targeting fine lines, dark circles, and puffiness.',
    descriptionKr: '잔주름, 다크서클, 붓기를 케어하는 펩타이드 복합체가 함유된 고기능성 아이크림입니다.',
    ingredients: 'Acetyl Hexapeptide-8, Caffeine, Adenosine, Squalane',
    usage: 'Gently pat around eye area morning and night.',
    texture: 'lightweight, fast-absorbing, non-greasy',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '350 units',
    markets: 'US, EU',
    keywords: ['eye', 'cream', 'peptide', 'wrinkle', 'dark circles', 'anti-aging', 'fine lines']
  },
  {
    id: 6,
    productId: 'BL-SN-001',
    nameEn: 'Tone-Up Sun Shield',
    nameKr: '톤업 선쉴드',
    category: 'Sun Care',
    categoryKr: '선케어',
    image: '/product6.png',
    description: 'Lightweight SPF50+ PA++++ sunscreen with tone-up effect for natural, protected skin.',
    descriptionKr: '자연스럽고 보호받는 피부를 위한 톤업 효과의 가벼운 SPF50+ PA++++ 선크림입니다.',
    ingredients: 'Zinc Oxide, Niacinamide, Centella Asiatica, Hyaluronic Acid',
    usage: 'Apply as last step of morning skincare. Reapply every 2-3 hours.',
    texture: 'lightweight, non-greasy, brightening',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '500 units',
    markets: 'Global',
    keywords: ['sunscreen', 'spf', 'sun', 'protection', 'tone-up', 'uv', 'brightening']
  }
]

const uiText = {
  en: {
    greeting: `Nice to meet you.
This is Beautylab, a professional global K-beauty wholesale platform.

If you're looking for a product or saw something on our SNS,
feel free to ask.
You can search by product name, product type, or product ID.`,
    placeholder: 'Type your message...',
    send: 'Send',
    interestedBtn: 'Interested in this product?',
    productSelected: 'Great choice! I\'d be happy to tell you more about {product}. What would you like to know? I can help with texture, ingredients, export certifications, MOQ, or available regions.',
    noMatch: 'I couldn\'t find an exact match, but let me show you some products that might interest you based on your description.',
    priceResponse: `For accurate pricing information, our Sales Operations Team will provide details based on your requirements.

Please leave your preferred contact method (WhatsApp or email).`,
    contactForm: {
      title: 'Submit Pricing Inquiry',
      method: 'Contact Method',
      whatsapp: 'WhatsApp',
      email: 'Email',
      whatsappPlaceholder: 'Enter your WhatsApp number',
      emailPlaceholder: 'Enter your email address',
      submit: 'Submit Inquiry',
      success: 'Thank you. Our team will contact you shortly with pricing information.'
    },
    back: 'Back to Home',
    productIntro: 'I\'d like to know more about this product.',
    askAboutProduct: 'Feel free to ask anything about this product. I can help with texture, ingredients, certifications, MOQ, or available regions.',
    successModal: {
      title: 'Inquiry Submitted Successfully!',
      subtitle: 'Our team will contact you within 24 hours with pricing information.',
      primaryBtn: 'Browse More Products',
      secondaryBtn: 'Close'
    }
  },
  ko: {
    greeting: `반갑습니다.
글로벌 K-뷰티 도매 전문 플랫폼 Beautylab입니다.

구매를 원하시는 제품이 있거나 SNS에서 보신 제품이 있다면
편하게 문의해 주세요.
제품명, 제품 종류, 제품 번호로 검색하실 수 있습니다.`,
    placeholder: '메시지를 입력하세요...',
    send: '전송',
    interestedBtn: '이 제품에 관심 있으신가요?',
    productSelected: '좋은 선택이세요! {product}에 대해 더 자세히 안내드리겠습니다. 무엇이 궁금하신가요? 텍스처, 성분, 수출 인증, MOQ, 판매 가능 지역 등을 안내해 드릴 수 있습니다.',
    noMatch: '정확히 일치하는 제품을 찾지 못했지만, 설명에 맞는 제품들을 보여드리겠습니다.',
    priceResponse: `정확한 가격 정보는 Sales Operations Team에서 요청 사항에 맞춰 안내드리고 있습니다.

선호하시는 연락 방법(WhatsApp 또는 이메일)을 남겨주세요.`,
    contactForm: {
      title: '가격 문의 제출',
      method: '연락 방법',
      whatsapp: 'WhatsApp',
      email: '이메일',
      whatsappPlaceholder: 'WhatsApp 번호를 입력하세요',
      emailPlaceholder: '이메일 주소를 입력하세요',
      submit: '문의 제출',
      success: '감사합니다. 담당팀에서 곧 가격 정보를 안내드리겠습니다.'
    },
    back: '홈으로 돌아가기',
    productIntro: '이 제품에 대해 더 알고 싶습니다.',
    askAboutProduct: '이 제품에 대해 궁금한 점을 물어보세요. 텍스처, 성분, 인증, MOQ, 판매 가능 지역 등을 안내해 드릴 수 있습니다.',
    successModal: {
      title: '문의가 성공적으로 제출되었습니다!',
      subtitle: '24시간 이내에 가격 정보를 안내드리겠습니다.',
      primaryBtn: '다른 제품 둘러보기',
      secondaryBtn: '닫기'
    }
  }
}

// 가격 관련 키워드
const priceKeywords = ['price', 'pricing', 'cost', 'unit price', 'wholesale price', 'how much', '가격', '단가', '얼마', '비용', 'quote', 'quotation']

function isPriceQuestion(message) {
  const lowerMessage = message.toLowerCase()
  return priceKeywords.some(keyword => lowerMessage.includes(keyword))
}

// 제품 매칭 함수
function matchProducts(query) {
  const lowerQuery = query.toLowerCase()
  const scores = productDatabase.map(product => {
    let score = 0

    // Product ID 정확 매칭
    if (lowerQuery.includes(product.productId.toLowerCase())) {
      score += 100
    }

    // 제품명 매칭
    if (product.nameEn.toLowerCase().includes(lowerQuery) ||
        product.nameKr.includes(query)) {
      score += 80
    }

    // 키워드 매칭
    product.keywords.forEach(keyword => {
      if (lowerQuery.includes(keyword)) {
        score += 15
      }
    })

    // 텍스처 매칭
    if (product.texture.toLowerCase().split(', ').some(t => lowerQuery.includes(t))) {
      score += 20
    }

    // 카테고리 매칭
    if (lowerQuery.includes(product.category.toLowerCase())) {
      score += 10
    }

    return { product, score }
  })

  return scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.product)
}

// 제품 관련 질문 응답 생성
function generateProductResponse(message, product, lang) {
  const lowerMessage = message.toLowerCase()

  // 성분 관련
  if (lowerMessage.includes('ingredient') || lowerMessage.includes('성분') || lowerMessage.includes('formul')) {
    return lang === 'en'
      ? `The key ingredients in ${product.nameEn} are: ${product.ingredients}. These have been carefully selected for optimal efficacy and safety.`
      : `${product.nameKr}의 주요 성분은 ${product.ingredients}입니다. 최적의 효능과 안전성을 위해 엄선된 성분들입니다.`
  }

  // 텍스처 관련
  if (lowerMessage.includes('texture') || lowerMessage.includes('텍스처') || lowerMessage.includes('질감') || lowerMessage.includes('feel')) {
    return lang === 'en'
      ? `${product.nameEn} has a ${product.texture} texture. ${product.usage}`
      : `${product.nameKr}은(는) ${product.texture} 텍스처입니다. ${product.usage}`
  }

  // 수출/인증 관련
  if (lowerMessage.includes('export') || lowerMessage.includes('수출') || lowerMessage.includes('certification') || lowerMessage.includes('인증')) {
    return lang === 'en'
      ? `Yes, ${product.nameEn} is fully export-ready. Current certifications include: ${product.certifications}. We can provide additional documentation as required for your market.`
      : `네, ${product.nameKr}은(는) 수출 가능 제품입니다. 현재 보유 인증: ${product.certifications}. 수입국 요건에 맞는 추가 서류 제공이 가능합니다.`
  }

  // MOQ 관련
  if (lowerMessage.includes('moq') || lowerMessage.includes('minimum') || lowerMessage.includes('최소') || lowerMessage.includes('order quantity')) {
    return lang === 'en'
      ? `The minimum order quantity for ${product.nameEn} is ${product.moq}. For larger volumes, we can discuss customized arrangements.`
      : `${product.nameKr}의 최소 주문 수량은 ${product.moq}입니다. 대량 주문 시 별도 협의가 가능합니다.`
  }

  // 지역 관련
  if (lowerMessage.includes('region') || lowerMessage.includes('지역') || lowerMessage.includes('market') || lowerMessage.includes('country') || lowerMessage.includes('ship')) {
    return lang === 'en'
      ? `${product.nameEn} is currently available for: ${product.markets}. We ship worldwide via trusted logistics partners.`
      : `${product.nameKr}은(는) 현재 ${product.markets} 지역에서 판매 가능합니다. 전 세계 배송이 가능합니다.`
  }

  // 기본 응답
  return lang === 'en'
    ? `${product.nameEn} is ${product.description.toLowerCase()} Would you like to know more about ingredients, texture, certifications, MOQ, or available regions?`
    : `${product.nameKr}은(는) ${product.descriptionKr} 성분, 텍스처, 인증, MOQ, 판매 가능 지역에 대해 더 알고 싶으시면 말씀해 주세요.`
}

function ChatRoom({ lang, onClose, initialProduct, onNavigateToProducts }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showPriceForm, setShowPriceForm] = useState(false)
  const [contactMethod, setContactMethod] = useState('whatsapp')
  const [contactValue, setContactValue] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const text = uiText[lang]

  // 첫 인사 메시지 또는 제품 정보
  useEffect(() => {
    const timer = setTimeout(() => {
      // initialProduct가 있고, id와 name이 유효한 경우에만 제품 정보 표시
      if (initialProduct && initialProduct.id && initialProduct.name) {
        // 제품 상세에서 문의하기로 진입한 경우
        const productFromDb = productDatabase.find(p => p.id === initialProduct.id)
        if (productFromDb) {
          setSelectedProduct(productFromDb)
        }
        setMessages([
          {
            type: 'assistant',
            content: '',
            productIntro: {
              name: initialProduct.name,
              category: initialProduct.category,
              image: initialProduct.image,
              tagline: initialProduct.tagline
            }
          },
          { type: 'assistant', content: text.askAboutProduct }
        ])
        // 초기 메시지 자동 입력
        if (initialProduct.initialMessage) {
          setInputValue(initialProduct.initialMessage)
        }
      } else {
        // 메인에서 채팅창으로 진입한 경우 - 기존 인사 메시지
        setMessages([{ type: 'assistant', content: text.greeting }])
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addMessage = (type, content, extra = null) => {
    setMessages(prev => [...prev, { type, content, ...extra }])
  }

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage = inputValue.trim()
    setInputValue('')
    addMessage('user', userMessage)
    setIsTyping(true)

    const delay = 1500 + Math.random() * 500

    setTimeout(() => {
      // 가격 질문 체크
      if (isPriceQuestion(userMessage)) {
        addMessage('assistant', text.priceResponse)
        setShowPriceForm(true)
        setIsTyping(false)
        return
      }

      // 제품이 이미 선택된 경우
      if (selectedProduct) {
        const response = generateProductResponse(userMessage, selectedProduct, lang)
        addMessage('assistant', response)
        setIsTyping(false)
        return
      }

      // 제품 매칭 시도
      const matches = matchProducts(userMessage)
      if (matches.length > 0) {
        addMessage('assistant', '', { products: matches })
      } else {
        addMessage('assistant', lang === 'en'
          ? "I'd be happy to help you find the right product. Could you tell me more about what you're looking for? For example, the product type (serum, cream, lip tint), texture preference, or any specific concerns you'd like to address."
          : "적합한 제품을 찾아드리겠습니다. 어떤 제품을 찾으시는지 좀 더 알려주시겠어요? 예를 들어, 제품 종류(세럼, 크림, 립틴트), 선호하는 텍스처, 또는 해결하고 싶은 피부 고민 등을 말씀해 주세요."
        )
      }
      setIsTyping(false)
    }, delay)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    const productName = lang === 'en' ? product.nameEn : product.nameKr
    addMessage('user', `I'm interested in ${productName}`)

    setIsTyping(true)
    setTimeout(() => {
      const response = text.productSelected.replace('{product}', productName)
      addMessage('assistant', response)
      setIsTyping(false)
    }, 1000)
  }

  const handleFormSubmit = async () => {
    if (!contactValue.trim() || isSubmitting) return

    setIsSubmitting(true)

    // localStorage에 문의 저장
    saveInquiry({
      productId: selectedProduct?.productId,
      productName: selectedProduct ? (lang === 'en' ? selectedProduct.nameEn : selectedProduct.nameKr) : 'General Inquiry',
      conversationLog: messages,
      contactMethod,
      contactValue: contactValue.trim(),
      source: 'chatRoom'
    })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setFormSubmitted(true)
    setShowPriceForm(false)
    setShowSuccessModal(true)
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

  return (
    <div className="chat-room" lang={lang}>
      {/* Header */}
      <header className="chat-room-header">
        <button className="chat-room-back" onClick={onClose}>
          ← {text.back}
        </button>
        <div className="chat-room-brand">Young Cosmed</div>
        <div className="chat-room-status">
          <span className="status-dot"></span>
          Online
        </div>
      </header>

      {/* Messages */}
      <div className="chat-room-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-room-message ${msg.type}`}>
            {msg.type === 'assistant' && (
              <div className="message-avatar">B</div>
            )}
            <div className="message-bubble">
              {msg.productIntro && (
                <div className="product-intro-card">
                  <div className="product-intro-image">
                    <img src={msg.productIntro.image} alt={msg.productIntro.name} />
                  </div>
                  <div className="product-intro-info">
                    <span className="product-intro-category">{msg.productIntro.category}</span>
                    <h4 className="product-intro-name">{msg.productIntro.name}</h4>
                    <p className="product-intro-desc">{msg.productIntro.description}</p>
                  </div>
                </div>
              )}
              {msg.content && <p className="message-text">{msg.content}</p>}
              {msg.products && (
                <div className="product-cards">
                  {msg.products.map(product => (
                    <div className="product-card-chat" key={product.id}>
                      <div className="product-card-image">
                        <img src={product.image} alt={lang === 'en' ? product.nameEn : product.nameKr} />
                      </div>
                      <div className="product-card-info">
                        <span className="product-card-category">
                          {lang === 'en' ? product.category : product.categoryKr}
                        </span>
                        <h4 className="product-card-name">
                          {lang === 'en' ? product.nameEn : product.nameKr}
                        </h4>
                        <p className="product-card-desc">
                          {lang === 'en' ? product.description : product.descriptionKr}
                        </p>
                        <button
                          className="product-card-btn"
                          onClick={() => handleProductSelect(product)}
                        >
                          {text.interestedBtn}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-room-message assistant">
            <div className="message-avatar">B</div>
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Price Inquiry Form */}
      {showPriceForm && !formSubmitted && (
        <div className="chat-room-form">
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
          <button className="form-submit-btn" onClick={handleFormSubmit}>
            {text.contactForm.submit}
          </button>
        </div>
      )}

      {/* Input */}
      <div className="chat-room-input">
        <input
          ref={inputRef}
          type="text"
          placeholder={text.placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={formSubmitted}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping || formSubmitted}
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
                <circle cx="24" cy="24" r="22" stroke="#1A1A1A" strokeWidth="2" />
                <path d="M14 24l7 7 13-14" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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

export default ChatRoom
