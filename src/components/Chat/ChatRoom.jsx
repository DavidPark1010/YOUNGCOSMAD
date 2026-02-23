import { useState, useRef, useEffect } from 'react'
import './ChatRoom.css'

// 제품 데이터베이스
const productDatabase = [
  {
    id: 1,
    productId: 'YC-FL-001',
    nameEn: 'Revolax',
    nameKr: '레볼락스',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/revolax1.png',
    description: 'Premium hyaluronic acid dermal filler for facial contouring and wrinkle correction.',
    descriptionKr: '얼굴 윤곽 및 주름 개선을 위한 프리미엄 히알루론산 더말 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Inject into mid-to-deep dermis.',
    texture: 'smooth, injectable, premium quality',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'revolax', 'hyaluronic', 'dermal', 'injection', 'contouring', 'wrinkle']
  },
  {
    id: 2,
    productId: 'YC-FL-002',
    nameEn: 'Elasty',
    nameKr: '엘라스티',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/ELASTY1.png',
    description: 'High-quality HA filler with excellent elasticity for natural-looking results.',
    descriptionKr: '자연스러운 결과를 위한 뛰어난 탄력성의 고품질 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Suitable for facial volumizing.',
    texture: 'elastic, smooth, natural feel',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'elasty', 'hyaluronic', 'elastic', 'volume', 'natural']
  },
  {
    id: 3,
    productId: 'YC-FL-003',
    nameEn: 'Rejeunesse',
    nameKr: '리쥬네스',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/REJEUNESSE.png',
    description: 'Advanced HA filler with SHAPE technology for long-lasting volume restoration.',
    descriptionKr: '오래 지속되는 볼륨 복원을 위한 SHAPE 기술의 고급 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Deep dermal injection.',
    texture: 'cohesive, long-lasting, premium',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'rejeunesse', 'hyaluronic', 'shape', 'volume', 'long-lasting']
  },
  {
    id: 4,
    productId: 'YC-FL-004',
    nameEn: 'Neuramis',
    nameKr: '뉴라미스',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/NEURAMIS.png',
    description: 'Premium Korean HA filler known for its purity and natural results.',
    descriptionKr: '순도와 자연스러운 결과로 유명한 프리미엄 한국산 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Various depths depending on product line.',
    texture: 'pure, smooth, natural',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'neuramis', 'hyaluronic', 'korean', 'pure', 'natural']
  },
  {
    id: 5,
    productId: 'YC-FL-005',
    nameEn: 'Regenovue',
    nameKr: '레제노뷰',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/REGENOVUE.png',
    description: 'Next-generation HA filler with optimal viscoelasticity for smooth injection.',
    descriptionKr: '부드러운 주입을 위한 최적의 점탄성을 갖춘 차세대 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Suitable for fine lines to deep wrinkles.',
    texture: 'viscoelastic, smooth, versatile',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'regenovue', 'hyaluronic', 'viscoelastic', 'wrinkle', 'smooth']
  },
  {
    id: 6,
    productId: 'YC-FL-006',
    nameEn: 'Dermalax',
    nameKr: '더말락스',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/DERMALAX.png',
    description: 'High-concentration HA filler for effective facial contouring and volume.',
    descriptionKr: '효과적인 얼굴 윤곽 및 볼륨을 위한 고농도 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Deep tissue injection.',
    texture: 'high-concentration, volumizing, long-lasting',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'dermalax', 'hyaluronic', 'volume', 'contouring', 'high-concentration']
  },
  {
    id: 7,
    productId: 'YC-FL-007',
    nameEn: 'E.P.T.Q',
    nameKr: 'E.P.T.Q',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/E.P.T.Q.png',
    description: 'Premium European-quality HA filler with advanced cross-linking technology.',
    descriptionKr: '고급 가교 기술을 적용한 유럽 품질의 프리미엄 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Multiple product lines available.',
    texture: 'european quality, advanced, premium',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'eptq', 'e.p.t.q', 'hyaluronic', 'european', 'premium']
  },
  {
    id: 8,
    productId: 'YC-SB-001',
    nameEn: 'Sosum',
    nameKr: '소섬',
    category: 'Skin Boosters',
    categoryKr: '스킨부스터',
    image: '/SOSUM.png',
    description: 'Advanced skin booster for deep hydration and skin rejuvenation.',
    descriptionKr: '깊은 수분 공급과 피부 재생을 위한 고급 스킨부스터입니다.',
    ingredients: 'Non-cross-linked Hyaluronic Acid, Peptides',
    usage: 'For professional use only. Intradermal injection.',
    texture: 'hydrating, rejuvenating, lightweight',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['skin booster', 'sosum', 'hydration', 'rejuvenation', 'mesotherapy']
  },
  {
    id: 9,
    productId: 'YC-FL-008',
    nameEn: 'Starfill',
    nameKr: '스타필',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/STARFILL.png',
    description: 'Versatile HA filler for various facial enhancement applications.',
    descriptionKr: '다양한 얼굴 개선 시술에 적용 가능한 다목적 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Suitable for multiple treatment areas.',
    texture: 'versatile, consistent, reliable',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'starfill', 'hyaluronic', 'versatile', 'facial', 'enhancement']
  },
  {
    id: 10,
    productId: 'YC-FL-009',
    nameEn: 'Line Fill',
    nameKr: '라인필',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/LINE FILL.png',
    description: 'Precision HA filler designed for fine lines and delicate areas.',
    descriptionKr: '잔주름과 섬세한 부위를 위해 설계된 정밀 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Superficial to mid-dermal injection.',
    texture: 'precise, smooth, delicate',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'line fill', 'linefill', 'hyaluronic', 'fine lines', 'precision']
  },
  {
    id: 11,
    productId: 'YC-SB-002',
    nameEn: 'Priere',
    nameKr: '프리에르',
    category: 'Skin Boosters',
    categoryKr: '스킨부스터',
    image: '/PRIERE.png',
    description: 'Premium skin booster for enhanced skin quality and radiance.',
    descriptionKr: '향상된 피부 품질과 광채를 위한 프리미엄 스킨부스터입니다.',
    ingredients: 'Non-cross-linked Hyaluronic Acid, Vitamins, Amino Acids',
    usage: 'For professional use only. Mesotherapy technique.',
    texture: 'nourishing, radiance-enhancing, premium',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['skin booster', 'priere', 'radiance', 'rejuvenation', 'premium', 'glow']
  },
  {
    id: 12,
    productId: 'YC-FL-010',
    nameEn: 'Lip Star',
    nameKr: '립스타',
    category: 'Fillers',
    categoryKr: '필러',
    image: '/LIP STAR.png',
    description: 'Specialized HA filler designed for lip augmentation and contouring.',
    descriptionKr: '입술 확대 및 윤곽을 위해 특별히 설계된 HA 필러입니다.',
    ingredients: 'Cross-linked Hyaluronic Acid, Lidocaine',
    usage: 'For professional use only. Lip injection technique.',
    texture: 'soft, natural, lip-optimized',
    exportReady: true,
    certifications: 'CE, KFDA, ISO 13485',
    moq: '100 units',
    markets: 'Global',
    keywords: ['filler', 'lip star', 'lipstar', 'lip', 'augmentation', 'contouring']
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

    const inquiryData = {
      productId: selectedProduct?.productId,
      productName: selectedProduct ? (lang === 'en' ? selectedProduct.nameEn : selectedProduct.nameKr) : 'General Inquiry',
      conversationLog: messages,
      contactMethod,
      contactValue: contactValue.trim(),
      timestamp: new Date().toISOString()
    }
    console.log('Inquiry submitted:', inquiryData)

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
