// 샘플 문의 데이터
export const initialInquiries = [
  {
    id: 1,
    productId: 1,
    productName: 'Hydra Glow Serum',
    productCategory: 'Skincare',
    productImage: '/product1.png',
    status: 'new',
    contactMethod: 'whatsapp',
    contactValue: '+1 555-0123',
    timestamp: '2024-02-10T09:32:00Z',
    conversation: [
      { type: 'user', content: 'I want to know this product', time: '09:30' },
      { type: 'assistant', content: 'Hydra Glow Serum is a lightweight hydrating serum...', time: '09:30' },
      { type: 'user', content: 'What is the MOQ?', time: '09:31' },
      { type: 'assistant', content: 'The minimum order quantity for Hydra Glow Serum is 500 units.', time: '09:31' },
      { type: 'user', content: 'How much does it cost?', time: '09:32' },
      { type: 'assistant', content: 'Thank you for your interest. For accurate pricing details, our Sales Operations Team will provide personalized information...', time: '09:32' },
    ]
  },
  {
    id: 2,
    productId: 3,
    productName: 'Cica Repair Cream',
    productCategory: 'Skincare',
    productImage: '/product3.png',
    status: 'new',
    contactMethod: 'email',
    contactValue: 'buyer@example.com',
    timestamp: '2024-02-10T08:15:00Z',
    conversation: [
      { type: 'user', content: 'Is this product vegan certified?', time: '08:14' },
      { type: 'assistant', content: 'Yes, Cica Repair Cream is fully export-ready. Current certifications include: CPNP (EU), FDA Registered, Vegan Certified.', time: '08:14' },
      { type: 'user', content: 'Great! What about the price for 1000 units?', time: '08:15' },
      { type: 'assistant', content: 'Thank you for your interest. For accurate pricing details...', time: '08:15' },
    ]
  },
  {
    id: 3,
    productId: 2,
    productName: 'Velvet Matte Lip Tint',
    productCategory: 'Makeup',
    productImage: '/product2.png',
    status: 'responded',
    contactMethod: 'whatsapp',
    contactValue: '+44 7700 900123',
    timestamp: '2024-02-09T14:22:00Z',
    conversation: [
      { type: 'user', content: 'I want to know this product', time: '14:20' },
      { type: 'assistant', content: 'Velvet Matte Lip Tint is long-lasting velvet matte finish lip tint...', time: '14:20' },
      { type: 'user', content: 'Can you tell me the price?', time: '14:22' },
      { type: 'assistant', content: 'Thank you for your interest...', time: '14:22' },
    ]
  },
  {
    id: 4,
    productId: 6,
    productName: 'Tone-Up Sun Shield',
    productCategory: 'Sun Care',
    productImage: '/product6.png',
    status: 'reviewed',
    contactMethod: 'email',
    contactValue: 'import@beautyco.eu',
    timestamp: '2024-02-09T11:45:00Z',
    conversation: [
      { type: 'user', content: 'Do you ship to Europe?', time: '11:43' },
      { type: 'assistant', content: 'We ship worldwide via trusted logistics partners...', time: '11:43' },
      { type: 'user', content: 'What certifications do you have for EU?', time: '11:44' },
      { type: 'assistant', content: 'Yes, Tone-Up Sun Shield is fully export-ready. Current certifications include: CPNP (EU), FDA Registered.', time: '11:44' },
      { type: 'user', content: 'Perfect. Please send me pricing info', time: '11:45' },
      { type: 'assistant', content: 'Thank you for your interest...', time: '11:45' },
    ]
  },
]

// 샘플 주문 데이터
export const initialOrders = [
  {
    id: 'ORD-2024-001',
    customerEmail: 'buyer@example.com',
    customerName: 'John Smith',
    customerCompany: 'Beauty Wholesale Co.',
    status: 'shipped',
    trackingNumber: 'KR1234567890',
    items: [
      { name: 'Hydra Glow Serum', quantity: 500, price: 4.50 },
      { name: 'Cica Repair Cream', quantity: 400, price: 3.80 },
      { name: 'Tone-Up Sun Shield', quantity: 300, price: 3.20 }
    ],
    total: 4810.00,
    shippingAddress: '123 Business St, Suite 100, New York, NY 10001, USA',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-19T16:00:00Z',
    timeline: [
      { status: 'pending', date: '2024-01-15T09:00:00Z', message: 'Order received' },
      { status: 'paid', date: '2024-01-15T14:30:00Z', message: 'Payment confirmed' },
      { status: 'preparing', date: '2024-01-17T10:00:00Z', message: 'Preparing shipment' },
      { status: 'shipped', date: '2024-01-19T16:00:00Z', message: 'Shipped - KR1234567890' }
    ]
  },
  {
    id: 'ORD-2024-002',
    customerEmail: 'test@example.com',
    customerName: 'Sarah Johnson',
    customerCompany: 'Glow Beauty Ltd.',
    status: 'preparing',
    trackingNumber: null,
    items: [
      { name: 'Velvet Matte Lip Tint', quantity: 300, price: 2.90 },
      { name: 'Double Cleansing Oil', quantity: 200, price: 4.40 }
    ],
    total: 1750.00,
    shippingAddress: '456 Commerce Ave, Los Angeles, CA 90001, USA',
    createdAt: '2024-01-28T11:00:00Z',
    updatedAt: '2024-01-30T09:00:00Z',
    timeline: [
      { status: 'pending', date: '2024-01-28T11:00:00Z', message: 'Order received' },
      { status: 'paid', date: '2024-01-28T15:00:00Z', message: 'Payment confirmed' },
      { status: 'preparing', date: '2024-01-30T09:00:00Z', message: 'Preparing shipment' }
    ]
  },
  {
    id: 'ORD-2024-003',
    customerEmail: 'wholesale@beautyshop.eu',
    customerName: 'Emma Wilson',
    customerCompany: 'European Beauty Imports',
    status: 'pending',
    trackingNumber: null,
    items: [
      { name: 'Peptide Eye Contour', quantity: 350, price: 5.20 }
    ],
    total: 1820.00,
    shippingAddress: '789 Trade Blvd, Amsterdam, Netherlands',
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-01T08:00:00Z',
    timeline: [
      { status: 'pending', date: '2024-02-01T08:00:00Z', message: 'Order received - Awaiting payment' }
    ]
  }
]

// 샘플 제품 데이터 (브랜드 + 모델 구조)
export const initialProducts = [
  {
    id: 1,
    category: 'Fillers',
    brandName: 'Neuramis',
    brandImage: '/product1.png',
    description: 'Neuramis is a premium hyaluronic acid dermal filler line manufactured by Medytox. Known for its smooth injection feel and long-lasting results, it is widely used across Asia and Europe.',
    models: [
      { name: 'Neuramis Volume Lidocaine', description: '1.1ml, Deep layer filler with lidocaine' },
      { name: 'Neuramis Deep', description: '1.0ml, Mid-deep layer filler' },
      { name: 'Neuramis Light', description: '1.0ml, Fine lines and superficial wrinkles' },
    ]
  },
  {
    id: 2,
    category: 'Fillers',
    brandName: 'Revolax',
    brandImage: '/product2.png',
    description: 'Revolax is a cross-linked hyaluronic acid filler with high visco-elasticity. It provides natural volume and contouring with minimal swelling.',
    models: [
      { name: 'Revolax Fine', description: '1.1ml, Superficial lines and lips' },
      { name: 'Revolax Deep', description: '1.1ml, Deep wrinkles and facial contouring' },
    ]
  },
  {
    id: 3,
    category: 'Botox',
    brandName: 'Botulax',
    brandImage: '/product3.png',
    description: 'Botulax (Botulinum Toxin Type A) by Hugel is a purified neurotoxin used for wrinkle reduction and facial contouring. FDA-approved and trusted worldwide.',
    models: [
      { name: 'Botulax 100U', description: '100 units, Clostridium Botulinum Toxin Type A' },
      { name: 'Botulax 200U', description: '200 units, Clostridium Botulinum Toxin Type A' },
    ]
  },
  {
    id: 4,
    category: 'Skin Boosters',
    brandName: 'Rejuran',
    brandImage: '/product4.png',
    description: 'Rejuran is a polynucleotide-based skin booster derived from salmon DNA. It promotes skin regeneration, improves elasticity, and enhances overall skin quality.',
    models: [
      { name: 'Rejuran Healer', description: '2ml, Skin rejuvenation and repair' },
      { name: 'Rejuran Tone-Up', description: '2ml, Brightening and tone improvement' },
    ]
  },
  {
    id: 5,
    category: 'Lipolytics',
    brandName: 'Lipo Lab',
    brandImage: '/product5.png',
    description: 'Lipo Lab is a phosphatidylcholine-based lipolytic solution for body contouring. It effectively reduces localized fat deposits with minimal downtime.',
    models: [
      { name: 'Lipo Lab PPC', description: '10ml x 5 vials, Body fat dissolving solution' },
      { name: 'Lipo Lab V-Line', description: '10ml x 5 vials, Face contouring solution' },
    ]
  },
]
