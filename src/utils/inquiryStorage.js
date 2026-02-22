const STORAGE_KEY = 'cs_inquiries'

function generateId() {
  return 'INQ-' + Date.now()
}

export function getInquiries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveInquiry({ productId, productName, contactMethod, contactValue, conversationLog, source }) {
  const inquiries = getInquiries()
  const now = new Date().toISOString()
  const inquiry = {
    id: generateId(),
    productId: productId || null,
    productName: productName || '일반 문의',
    contactMethod,
    contactValue,
    conversationLog: conversationLog.map(msg => ({
      type: msg.type,
      content: msg.content || ''
    })),
    status: 'new',
    adminMemo: '',
    source: source || 'chatPanel',
    createdAt: now,
    updatedAt: now
  }
  inquiries.unshift(inquiry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
  return inquiry
}

export function updateInquiry(id, updates) {
  const inquiries = getInquiries()
  const index = inquiries.findIndex(inq => inq.id === id)
  if (index === -1) return null
  inquiries[index] = {
    ...inquiries[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
  return inquiries[index]
}

export function deleteInquiry(id) {
  const inquiries = getInquiries().filter(inq => inq.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
}
