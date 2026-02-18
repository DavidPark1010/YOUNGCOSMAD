import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Anthropic 클라이언트 초기화
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

// 제품 정보 데이터베이스 (LLM 컨텍스트용)
const productDatabase = {
  1: {
    name: 'Hydra Glow Serum',
    category: 'Skincare',
    description: 'A lightweight hydrating serum formulated with hyaluronic acid and niacinamide for deep moisture and radiant skin.',
    ingredients: 'Hyaluronic Acid, Niacinamide, Centella Asiatica Extract, Panthenol',
    volume: '30ml',
    shelfLife: '24 months',
    exportReady: true,
    moq: '500 units',
    certifications: 'CPNP (EU), FDA Registered'
  },
  2: {
    name: 'Velvet Matte Lip Tint',
    category: 'Makeup',
    description: 'Long-lasting velvet matte finish lip tint with intense color payoff and comfortable wear.',
    ingredients: 'Jojoba Oil, Vitamin E, Natural Pigments',
    volume: '4g',
    shelfLife: '36 months',
    exportReady: true,
    moq: '300 units',
    certifications: 'CPNP (EU), FDA Registered'
  },
  3: {
    name: 'Cica Repair Cream',
    category: 'Skincare',
    description: 'Intensive repair cream with Centella Asiatica for sensitive and damaged skin barrier restoration.',
    ingredients: 'Centella Asiatica, Madecassoside, Ceramide NP, Beta-Glucan',
    volume: '50ml',
    shelfLife: '24 months',
    exportReady: true,
    moq: '400 units',
    certifications: 'CPNP (EU), FDA Registered, Vegan Certified'
  },
  4: {
    name: 'Double Cleansing Oil',
    category: 'Cleansing',
    description: 'Gentle yet effective cleansing oil that removes makeup and impurities without stripping moisture.',
    ingredients: 'Jojoba Seed Oil, Olive Oil, Grape Seed Oil, Vitamin E',
    volume: '200ml',
    shelfLife: '24 months',
    exportReady: true,
    moq: '600 units',
    certifications: 'CPNP (EU), FDA Registered'
  },
  5: {
    name: 'Peptide Eye Contour',
    category: 'Skincare',
    description: 'Advanced eye cream with peptide complex targeting fine lines, dark circles, and puffiness.',
    ingredients: 'Acetyl Hexapeptide-8, Caffeine, Adenosine, Squalane',
    volume: '20ml',
    shelfLife: '18 months',
    exportReady: true,
    moq: '350 units',
    certifications: 'CPNP (EU), FDA Registered'
  },
  6: {
    name: 'Tone-Up Sun Shield',
    category: 'Sun Care',
    description: 'Lightweight SPF50+ PA++++ sunscreen with tone-up effect for natural, protected skin.',
    ingredients: 'Zinc Oxide, Niacinamide, Centella Asiatica, Hyaluronic Acid',
    volume: '50ml',
    shelfLife: '24 months',
    exportReady: true,
    moq: '500 units',
    certifications: 'CPNP (EU), FDA Registered'
  }
}

// 가격 관련 키워드
const priceKeywords = ['price', 'pricing', 'cost', 'unit price', 'wholesale price', 'how much', '가격', '단가', '얼마', '비용', 'quote', 'quotation']

function isPriceQuestion(message) {
  const lowerMessage = message.toLowerCase()
  return priceKeywords.some(keyword => lowerMessage.includes(keyword))
}

// 채팅 API 엔드포인트
app.post('/api/chat', async (req, res) => {
  try {
    const { message, productId, conversationHistory, lang } = req.body

    // 가격 질문 체크
    if (isPriceQuestion(message)) {
      const priceResponse = lang === 'ko'
        ? `문의해 주셔서 감사합니다.\n\n정확한 가격 정보는 Sales Operations Team에서 요청 사항에 맞춰 안내드리고 있습니다.\n\n선호하시는 연락 방법을 남겨주시면 빠르게 회신드리겠습니다.`
        : `Thank you for your interest.\n\nFor accurate pricing details, our Sales Operations Team will provide personalized information based on your requirements.\n\nPlease leave your preferred contact method, and we will get back to you shortly.`

      return res.json({
        response: priceResponse,
        isPriceInquiry: true
      })
    }

    const product = productDatabase[productId]
    if (!product) {
      return res.status(400).json({ error: 'Product not found' })
    }

    // 시스템 프롬프트 구성
    const systemPrompt = `You are a professional B2B sales representative for BEAUTYLAB, a Korean beauty wholesale platform.

CRITICAL RULES:
1. NEVER mention that you are an AI, chatbot, or automated system
2. NEVER reveal prices, unit costs, or any pricing information - redirect to the Sales Operations Team
3. Respond in a professional, concise B2B sales tone
4. Keep responses short and informative (2-4 sentences max)
5. Respond in ${lang === 'ko' ? 'Korean' : 'English'}

Current Product Information:
- Name: ${product.name}
- Category: ${product.category}
- Description: ${product.description}
- Key Ingredients: ${product.ingredients}
- Volume: ${product.volume}
- Shelf Life: ${product.shelfLife}
- MOQ: ${product.moq}
- Certifications: ${product.certifications}
- Export Ready: ${product.exportReady ? 'Yes' : 'No'}

You can answer questions about:
- Ingredients and formulation
- Product specifications (volume, shelf life)
- MOQ (minimum order quantity)
- Certifications and export readiness
- General product benefits

For pricing questions, always redirect to the Sales Operations Team without revealing any numbers.`

    // 대화 히스토리 구성
    const messages = conversationHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))

    // 현재 메시지 추가
    messages.push({
      role: 'user',
      content: message
    })

    // Anthropic API 호출
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      system: systemPrompt,
      messages: messages
    })

    const assistantMessage = response.content[0].text

    res.json({
      response: assistantMessage,
      isPriceInquiry: false
    })

  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({
      error: 'Failed to process request',
      details: error.message
    })
  }
})

// 문의 저장 API
app.post('/api/inquiry', (req, res) => {
  const { productId, productName, conversationLog, contactMethod, contactValue, timestamp } = req.body

  // 실제로는 데이터베이스에 저장
  console.log('\n========== NEW INQUIRY ==========')
  console.log('Timestamp:', timestamp)
  console.log('Product:', productName, `(ID: ${productId})`)
  console.log('Contact:', contactMethod, '-', contactValue)
  console.log('Conversation:')
  conversationLog.forEach(msg => {
    console.log(`  [${msg.type}]: ${msg.content.substring(0, 100)}...`)
  })
  console.log('==================================\n')

  res.json({ success: true, message: 'Inquiry saved successfully' })
})

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.ANTHROPIC_API_KEY })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('WARNING: ANTHROPIC_API_KEY not set in .env file')
  }
})
