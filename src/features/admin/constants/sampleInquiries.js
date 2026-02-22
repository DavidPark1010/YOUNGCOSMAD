export const sampleInquiries = [
  {
    id: 'INQ-SAMPLE-001',
    productId: 'BL-SK-001',
    productName: 'Hydra Glow Serum',
    contactMethod: 'whatsapp',
    contactValue: '+62 812 3456 7890',
    conversationLog: [
      { type: 'user', content: 'Hi, I want to know about this serum' },
      { type: 'assistant', content: 'Hydra Glow Serum is a lightweight hydrating serum formulated with hyaluronic acid and niacinamide for deep moisture and radiant skin.' },
      { type: 'user', content: 'What is the price for wholesale?' },
      { type: 'assistant', content: 'Thank you for your interest. For accurate pricing details, our Sales Operations Team will provide personalized information based on your requirements. Please leave your preferred contact method.' }
    ],
    status: 'new',
    adminMemo: '',
    source: 'chatPanel',
    createdAt: '2026-02-20T09:30:00.000Z',
    updatedAt: '2026-02-20T09:30:00.000Z'
  },
  {
    id: 'INQ-SAMPLE-002',
    productId: 'BL-MK-001',
    productName: 'Velvet Matte Lip Tint',
    contactMethod: 'email',
    contactValue: 'buyer@beautyshop.com',
    conversationLog: [
      { type: 'user', content: 'I\'m looking for lip tint products' },
      { type: 'assistant', content: 'Great choice! Velvet Matte Lip Tint is a long-lasting velvet matte finish lip tint with intense color payoff and comfortable wear.' },
      { type: 'user', content: 'How much for 1000 units?' },
      { type: 'assistant', content: 'For accurate pricing details, our Sales Operations Team will provide personalized information. Please leave your contact method.' }
    ],
    status: 'reviewed',
    adminMemo: '대량 주문 가능성 높음',
    source: 'chatRoom',
    createdAt: '2026-02-19T14:15:00.000Z',
    updatedAt: '2026-02-20T10:00:00.000Z'
  }
]

export function loadSampleInquiries() {
  const STORAGE_KEY = 'cs_inquiries'
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  if (existing.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleInquiries))
    return sampleInquiries
  }
  return existing
}
