import { useState, useRef } from 'react'
import './AdminPage.css'
import ProductRegistration from '../product/ProductRegistration'

// PDF 생성을 위한 유틸리티 함수
const generatePDF = (contentRef, fileName) => {
  const printWindow = window.open('', '_blank')
  const content = contentRef.current.innerHTML

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${fileName}</title>
      <style>
        @page { size: A4; margin: 10mm; }
        body {
          font-family: 'Arial', sans-serif;
          padding: 20px;
          margin: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .invoice-container, .ci-container {
          max-width: 800px;
          margin: 0 auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
        }
        th, td {
          border: 1px solid #333;
          padding: 8px 12px;
          text-align: left;
          font-size: 12px;
        }
        th {
          background: #f5f5f5;
          font-weight: bold;
        }
        .header-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          text-decoration: underline;
        }
        .info-row {
          display: flex;
          margin-bottom: 8px;
        }
        .info-label {
          font-weight: bold;
          min-width: 140px;
        }
        .section { margin: 15px 0; }
        .total-row {
          font-weight: bold;
          background: #f9f9f9;
        }
        .signature-area {
          margin-top: 30px;
          text-align: right;
        }
        @media print {
          body { padding: 0; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() {
            window.close();
          }
        }
      </script>
    </body>
    </html>
  `)
  printWindow.document.close()
}

// 날짜 포맷 함수
const formatInvoiceDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 샘플 문의 데이터
const initialInquiries = [
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
const initialOrders = [
  {
    id: 'ORD-2024-001',
    refNo: 'EY2024-02-06',
    customerEmail: 'buyer@example.com',
    customerName: 'John Smith',
    customerCompany: 'Beauty Wholesale Co.',
    customerPhone: '+1 555-0123',
    customerAddress: '123 Business St, Suite 100, New York, NY 10001, USA',
    customerCountry: 'USA',
    status: 'shipped',
    trackingNumber: 'KR1234567890',
    items: [
      { name: 'Hydra Glow Serum', nameKr: '하이드라 글로우 세럼', quantity: 500, price: 4.50 },
      { name: 'Cica Repair Cream', nameKr: '시카 리페어 크림', quantity: 400, price: 3.80 },
      { name: 'Tone-Up Sun Shield', nameKr: '톤업 선쉴드', quantity: 300, price: 3.20 }
    ],
    total: 4810.00,
    deliveryFee: 320,
    shippingAddress: '123 Business St, Suite 100, New York, NY 10001, USA',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-19T16:00:00Z',
    // 진행사항 체크리스트
    checklist: {
      contactConfirmed: true,
      priceAgreed: true,
      invoiceSent: true,
      paymentConfirmed: true,
      productPrepared: true,
      ciCreated: true,
      shipped: true,
      delivered: false
    },
    // 인보이스/CI 데이터
    invoiceData: {
      paymentTerm: 'T/T in Advance',
      estimatedDelivery: 'After receipt of payment',
      shipment: 'Forwarder',
      validity: '1 WEEK',
      warranty: '1 YEAR',
      incoterms: 'Exwork',
      customsCode: '3304-99-9000',
      portOfLoading: 'KOREA',
      finalDestination: 'USA',
      vessel: '',
      sailingDate: ''
    },
    timeline: [
      { status: 'pending', date: '2024-01-15T09:00:00Z', message: 'Order received' },
      { status: 'paid', date: '2024-01-15T14:30:00Z', message: 'Payment confirmed' },
      { status: 'preparing', date: '2024-01-17T10:00:00Z', message: 'Preparing shipment' },
      { status: 'shipped', date: '2024-01-19T16:00:00Z', message: 'Shipped - KR1234567890' }
    ]
  },
  {
    id: 'ORD-2024-002',
    refNo: 'EY2024-02-07',
    customerEmail: 'test@example.com',
    customerName: 'Sarah Johnson',
    customerCompany: 'Glow Beauty Ltd.',
    customerPhone: '+1 555-0456',
    customerAddress: '456 Commerce Ave, Los Angeles, CA 90001, USA',
    customerCountry: 'USA',
    status: 'preparing',
    trackingNumber: null,
    items: [
      { name: 'Velvet Matte Lip Tint', nameKr: '벨벳 매트 립틴트', quantity: 300, price: 2.90 },
      { name: 'Double Cleansing Oil', nameKr: '더블 클렌징 오일', quantity: 200, price: 4.40 }
    ],
    total: 1750.00,
    deliveryFee: 280,
    shippingAddress: '456 Commerce Ave, Los Angeles, CA 90001, USA',
    createdAt: '2024-01-28T11:00:00Z',
    updatedAt: '2024-01-30T09:00:00Z',
    checklist: {
      contactConfirmed: true,
      priceAgreed: true,
      invoiceSent: true,
      paymentConfirmed: true,
      productPrepared: false,
      ciCreated: false,
      shipped: false,
      delivered: false
    },
    invoiceData: {
      paymentTerm: 'T/T in Advance',
      estimatedDelivery: 'After receipt of payment',
      shipment: 'Forwarder',
      validity: '1 WEEK',
      warranty: '1 YEAR',
      incoterms: 'Exwork',
      customsCode: '3304-99-9000',
      portOfLoading: 'KOREA',
      finalDestination: 'USA',
      vessel: '',
      sailingDate: ''
    },
    timeline: [
      { status: 'pending', date: '2024-01-28T11:00:00Z', message: 'Order received' },
      { status: 'paid', date: '2024-01-28T15:00:00Z', message: 'Payment confirmed' },
      { status: 'preparing', date: '2024-01-30T09:00:00Z', message: 'Preparing shipment' }
    ]
  },
  {
    id: 'ORD-2024-003',
    refNo: 'EY2024-02-08',
    customerEmail: 'wholesale@beautyshop.eu',
    customerName: 'Emma Wilson',
    customerCompany: 'European Beauty Imports',
    customerPhone: '+31 20 123 4567',
    customerAddress: '789 Trade Blvd, Amsterdam, Netherlands',
    customerCountry: 'Netherlands',
    status: 'pending',
    trackingNumber: null,
    items: [
      { name: 'Peptide Eye Contour', nameKr: '펩타이드 아이 컨투어', quantity: 350, price: 5.20 }
    ],
    total: 1820.00,
    deliveryFee: 350,
    shippingAddress: '789 Trade Blvd, Amsterdam, Netherlands',
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-01T08:00:00Z',
    checklist: {
      contactConfirmed: true,
      priceAgreed: false,
      invoiceSent: false,
      paymentConfirmed: false,
      productPrepared: false,
      ciCreated: false,
      shipped: false,
      delivered: false
    },
    invoiceData: {
      paymentTerm: 'T/T in Advance',
      estimatedDelivery: 'After receipt of payment',
      shipment: 'Forwarder',
      validity: '1 WEEK',
      warranty: '1 YEAR',
      incoterms: 'Exwork',
      customsCode: '3304-99-9000',
      portOfLoading: 'KOREA',
      finalDestination: 'Netherlands',
      vessel: '',
      sailingDate: ''
    },
    timeline: [
      { status: 'pending', date: '2024-02-01T08:00:00Z', message: 'Order received - Awaiting payment' }
    ]
  }
]

// 샘플 제품 데이터
const initialProducts = [
  {
    id: 1,
    productId: 'BL-SK-001',
    nameEn: 'Hydra Glow Serum',
    nameKr: '하이드라 글로우 세럼',
    category: 'Skincare',
    image: '/product1.png',
    status: 'active',
    description: 'A lightweight hydrating serum formulated with hyaluronic acid and niacinamide for deep moisture and radiant skin.',
    ingredients: 'Hyaluronic Acid, Niacinamide, Centella Asiatica Extract, Panthenol',
    usage: 'Apply 2-3 drops after cleansing. Pat gently for absorption.',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '500 units',
    markets: 'EU, US, ASIA',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: ['/product1.png'],
    mediaVideo: '',
    updatedAt: '2024-02-10T09:00:00Z'
  },
  {
    id: 2,
    productId: 'BL-MK-001',
    nameEn: 'Velvet Matte Lip Tint',
    nameKr: '벨벳 매트 립틴트',
    category: 'Makeup',
    image: '/product2.png',
    status: 'active',
    description: 'Long-lasting velvet matte finish lip tint with intense color payoff and comfortable wear.',
    ingredients: 'Jojoba Oil, Vitamin E, Natural Pigments',
    usage: 'Apply directly to lips. Build up for more intense color.',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '300 units',
    markets: 'Global',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: ['/product2.png'],
    mediaVideo: '',
    updatedAt: '2024-02-09T15:00:00Z'
  },
  {
    id: 3,
    productId: 'BL-SK-002',
    nameEn: 'Cica Repair Cream',
    nameKr: '시카 리페어 크림',
    category: 'Skincare',
    image: '/product3.png',
    status: 'active',
    description: 'Intensive repair cream with Centella Asiatica for sensitive and damaged skin barrier restoration.',
    ingredients: 'Centella Asiatica, Madecassoside, Ceramide NP, Beta-Glucan',
    usage: 'Apply generously to face and neck as the last step of skincare.',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered, Vegan Certified',
    moq: '400 units',
    markets: 'EU, ASIA',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: ['/product3.png'],
    mediaVideo: '',
    updatedAt: '2024-02-08T10:00:00Z'
  },
  {
    id: 4,
    productId: 'BL-CL-001',
    nameEn: 'Double Cleansing Oil',
    nameKr: '더블 클렌징 오일',
    category: 'Cleansing',
    image: '/product4.png',
    status: 'active',
    description: 'Gentle yet effective cleansing oil that removes makeup and impurities without stripping moisture.',
    ingredients: 'Jojoba Seed Oil, Olive Oil, Grape Seed Oil, Vitamin E',
    usage: 'Massage onto dry face, emulsify with water, then rinse.',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '600 units',
    markets: 'Global',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: ['/product4.png'],
    mediaVideo: '',
    updatedAt: '2024-02-07T14:00:00Z'
  },
  {
    id: 5,
    productId: 'BL-SK-003',
    nameEn: 'Peptide Eye Contour',
    nameKr: '펩타이드 아이 컨투어',
    category: 'Skincare',
    image: '/product5.png',
    status: 'active',
    description: 'Advanced eye cream with peptide complex targeting fine lines, dark circles, and puffiness.',
    ingredients: 'Acetyl Hexapeptide-8, Caffeine, Adenosine, Squalane',
    usage: 'Gently pat around eye area morning and night.',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '350 units',
    markets: 'US, EU',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: ['/product5.png'],
    mediaVideo: '',
    updatedAt: '2024-02-06T11:00:00Z'
  },
  {
    id: 6,
    productId: 'BL-SN-001',
    nameEn: 'Tone-Up Sun Shield',
    nameKr: '톤업 선쉴드',
    category: 'Sun Care',
    image: '/product6.png',
    status: 'active',
    description: 'Lightweight SPF50+ PA++++ sunscreen with tone-up effect for natural, protected skin.',
    ingredients: 'Zinc Oxide, Niacinamide, Centella Asiatica, Hyaluronic Acid',
    usage: 'Apply as last step of morning skincare. Reapply every 2-3 hours.',
    exportReady: true,
    certifications: 'CPNP (EU), FDA Registered',
    moq: '500 units',
    markets: 'Global',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: ['/product6.png'],
    mediaVideo: '',
    updatedAt: '2024-02-05T09:00:00Z'
  },
]

const uiText = {
  en: {
    sidebar: {
      dashboard: 'Dashboard',
      inquiries: 'Price Inquiries',
      orders: 'Orders',
      products: 'Products',
      settings: 'Settings',
      backToSite: 'Back to Site'
    },
    header: {
      admin: 'Admin',
      logout: 'Logout'
    },
    dashboard: {
      title: 'Dashboard',
      newToday: 'New Inquiries Today',
      unanswered: 'Unanswered',
      thisWeek: 'This Week Total',
      recentInquiries: 'Recent Price Inquiries',
      goToInquiries: 'Go to Price Inquiries',
      noInquiries: 'No inquiries yet'
    },
    inquiries: {
      title: 'Price Inquiries',
      total: 'Total Inquiries',
      new: 'New',
      responded: 'Responded',
      thisWeek: 'This Week',
      today: 'Today'
    },
    orders: {
      title: 'Order Management',
      total: 'Total Orders',
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      orderId: 'Order ID',
      customer: 'Customer',
      items: 'Items',
      total: 'Total',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      updateStatus: 'Update Status',
      viewDetails: 'View Details',
      statuses: {
        pending: 'Pending Payment',
        paid: 'Paid',
        preparing: 'Preparing',
        shipped: 'Shipped',
        delivered: 'Delivered'
      },
      statusMessages: {
        pending: 'Your order has been received. Please complete the payment to proceed.',
        paid: 'Payment confirmed! We are now preparing your order.',
        preparing: 'Your order is being prepared for shipment.',
        shipped: 'Your order has been shipped! Tracking number: {tracking}',
        delivered: 'Your order has been delivered. Thank you for your business!'
      },
      trackingNumber: 'Tracking Number',
      trackingPlaceholder: 'Enter tracking number',
      sendNotification: 'Send Notification',
      notificationSent: 'Notification sent to customer',
      customer: 'Customer',
      shippingAddress: 'Shipping Address',
      items: 'Items',
      totalLabel: 'Total',
      orderTimeline: 'Order Timeline',
      trackingAlert: 'Please enter tracking number',
      itemsCount: 'items'
    },
    products: {
      title: 'Products',
      addNew: 'Add New Product',
      status: 'Status',
      product: 'Product',
      category: 'Category',
      moq: 'MOQ',
      updated: 'Last Updated',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      deleteConfirm: 'This product will no longer be available for inquiries. Are you sure you want to delete it?',
      cancel: 'Cancel'
    },
    productForm: {
      addTitle: 'Add New Product',
      editTitle: 'Edit Product',
      backToList: 'Back to Product List',
      basicInfo: 'Basic Information',
      basicInfoDesc: 'Core product details for identification and categorization.',
      productId: 'Product ID',
      productIdPlaceholder: 'BL-SK-001',
      productIdHelp: 'This Product ID will be used for chatbot inquiries and SNS references.',
      productIdDuplicate: 'This Product ID already exists.',
      nameEn: 'Product Name (EN)',
      nameKr: 'Product Name (KR)',
      category: 'Category',
      llmBasic: 'Basic Response Information',
      llmBasicDesc: 'This information will be used by the chatbot to respond to buyer questions.',
      description: 'Short Product Description',
      ingredients: 'Key Ingredients',
      usage: 'Usage / Texture / Finish',
      usagePlaceholder: 'How to use, texture description, finish type...',
      llmExport: 'Distribution & Export Information',
      exportReady: 'Export Availability',
      certifications: 'Export Certifications',
      certificationsPlaceholder: 'CPNP (EU), FDA Registered, Vegan Certified...',
      moq: 'MOQ Information',
      markets: 'Available Regions',
      llmPrice: 'Price Inquiry Response Settings',
      pricePolicy: 'Price Disclosure Policy',
      pricePolicyValue: 'Hidden (Redirect to inquiry)',
      priceResponse: 'Auto-response Message for Price Inquiries',
      priceResponseDefault: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
      media: 'Product Media',
      mediaDesc: 'These media assets may be referenced during buyer inquiries.',
      mediaImages: 'Product Images',
      mediaDragDrop: 'Drag & drop images here, or click to browse',
      mediaVideo: 'Product Video URL (Optional)',
      mediaVideoPlaceholder: 'https://youtube.com/...',
      mediaWarning: 'Avoid uploading images that display price information.',
      chatbotNote: 'This product will be searchable via chatbot by Product ID or Name.',
      save: 'Save Product',
      cancel: 'Cancel',
      yes: 'Yes',
      no: 'No'
    },
    settings: {
      title: 'Settings',
      adminAccount: 'Admin Account',
      adminName: 'Admin Name',
      adminEmail: 'Admin Email',
      inquirySettings: 'Inquiry Settings',
      defaultResponse: 'Default Price Inquiry Response',
      contactMethods: 'Contact Methods',
      whatsapp: 'WhatsApp',
      email: 'Email',
      language: 'Language Settings',
      defaultLang: 'Default Language',
      save: 'Save Settings',
      saved: 'Settings Saved!'
    },
    table: {
      status: 'Status',
      product: 'Product',
      contact: 'Contact',
      contactInfo: 'Contact Info',
      date: 'Date & Time',
      preview: 'Last Message'
    },
    status: {
      new: 'New',
      reviewed: 'Reviewed',
      responded: 'Responded'
    },
    filters: {
      all: 'All',
      newOnly: 'New Only',
      whatsapp: 'WhatsApp',
      email: 'Email'
    },
    detail: {
      conversation: 'Conversation Log',
      priceInquiry: 'Price inquiry received',
      contactInfo: 'Contact Information',
      copy: 'Copy',
      copied: 'Copied!',
      markAs: 'Mark as',
      back: 'Back to List'
    }
  },
  ko: {
    sidebar: {
      dashboard: '대시보드',
      inquiries: '가격 문의',
      orders: '주문 관리',
      products: '제품 관리',
      settings: '설정',
      backToSite: '사이트로 돌아가기'
    },
    header: {
      admin: '관리자',
      logout: '로그아웃'
    },
    dashboard: {
      title: '대시보드',
      newToday: '오늘 신규 문의',
      unanswered: '미응답',
      thisWeek: '이번 주 전체',
      recentInquiries: '최근 가격 문의',
      goToInquiries: '가격 문의 바로가기',
      noInquiries: '아직 문의가 없습니다'
    },
    inquiries: {
      title: '가격 문의',
      total: '전체 문의',
      new: '신규',
      responded: '응답 완료',
      thisWeek: '이번 주',
      today: '오늘'
    },
    orders: {
      title: '주문 관리',
      total: '전체 주문',
      pending: '대기',
      processing: '처리중',
      shipped: '배송중',
      orderId: '주문번호',
      customer: '고객',
      items: '상품',
      total: '합계',
      status: '상태',
      date: '날짜',
      actions: '관리',
      updateStatus: '상태 변경',
      viewDetails: '상세 보기',
      statuses: {
        pending: '결제 대기',
        paid: '결제 완료',
        preparing: '준비 중',
        shipped: '배송 중',
        delivered: '배송 완료'
      },
      statusMessages: {
        pending: '주문이 접수되었습니다. 결제를 완료해주세요.',
        paid: '결제가 확인되었습니다! 주문을 준비하고 있습니다.',
        preparing: '주문 상품을 배송 준비 중입니다.',
        shipped: '주문이 발송되었습니다! 운송장 번호: {tracking}',
        delivered: '배송이 완료되었습니다. 이용해 주셔서 감사합니다!'
      },
      trackingNumber: '운송장 번호',
      trackingPlaceholder: '운송장 번호 입력',
      sendNotification: '알림 발송',
      notificationSent: '고객에게 알림이 발송되었습니다',
      customer: '고객 정보',
      shippingAddress: '배송지 주소',
      items: '주문 상품',
      totalLabel: '합계',
      orderTimeline: '주문 타임라인',
      trackingAlert: '운송장 번호를 입력해주세요',
      itemsCount: '개 상품'
    },
    products: {
      title: '제품 관리',
      addNew: '새 제품 등록',
      status: '상태',
      product: '제품',
      category: '카테고리',
      moq: 'MOQ',
      updated: '최근 수정',
      actions: '관리',
      active: '활성',
      inactive: '비활성',
      edit: '수정',
      delete: '삭제',
      deleteConfirm: '이 제품은 더 이상 문의에 사용할 수 없게 됩니다. 정말 삭제하시겠습니까?',
      cancel: '취소'
    },
    productForm: {
      addTitle: '새 제품 등록',
      editTitle: '제품 수정',
      backToList: '제품 목록으로',
      basicInfo: '기본 정보',
      basicInfoDesc: '제품 식별 및 분류를 위한 핵심 정보입니다.',
      productId: '제품 고유 번호',
      productIdPlaceholder: 'BL-SK-001',
      productIdHelp: '이 제품 번호는 챗봇 문의 및 SNS 참조에 사용됩니다.',
      productIdDuplicate: '이미 존재하는 제품 번호입니다.',
      nameEn: '제품명 (영문)',
      nameKr: '제품명 (한글)',
      category: '카테고리',
      llmBasic: '기본 응대 정보',
      llmBasicDesc: '이 정보는 챗봇이 바이어 질문에 응답할 때 사용됩니다.',
      description: '짧은 제품 설명',
      ingredients: '주요 성분',
      usage: '사용법 / 텍스처 / 피니시',
      usagePlaceholder: '사용 방법, 질감 설명, 마무리감...',
      llmExport: '유통 & 수출 정보',
      exportReady: '수출 가능 여부',
      certifications: '수출 인증',
      certificationsPlaceholder: 'CPNP (EU), FDA Registered, Vegan Certified...',
      moq: 'MOQ 정보',
      markets: '판매 가능 지역',
      llmPrice: '가격 문의 응대 설정',
      pricePolicy: '가격 공개 정책',
      pricePolicyValue: '비공개 (문의로 전환)',
      priceResponse: '가격 문의 시 자동 응답 문구',
      priceResponseDefault: '관심을 가져주셔서 감사합니다. 정확한 가격 정보는 담당팀에서 곧 연락드리겠습니다.',
      media: '제품 미디어',
      mediaDesc: '이 미디어 자료는 바이어 문의 시 참조될 수 있습니다.',
      mediaImages: '제품 이미지',
      mediaDragDrop: '이미지를 드래그하거나 클릭하여 업로드',
      mediaVideo: '제품 영상 URL (선택)',
      mediaVideoPlaceholder: 'https://youtube.com/...',
      mediaWarning: '가격 정보가 표시된 이미지 업로드는 피해주세요.',
      chatbotNote: '이 제품은 제품 번호 또는 이름으로 챗봇 검색이 가능합니다.',
      save: '저장',
      cancel: '취소',
      yes: '예',
      no: '아니오'
    },
    settings: {
      title: '설정',
      adminAccount: '관리자 계정',
      adminName: '관리자 이름',
      adminEmail: '관리자 이메일',
      inquirySettings: '문의 설정',
      defaultResponse: '가격 문의 기본 응답 문구',
      contactMethods: '연락 방법',
      whatsapp: 'WhatsApp',
      email: '이메일',
      language: '언어 설정',
      defaultLang: '기본 언어',
      save: '설정 저장',
      saved: '저장되었습니다!'
    },
    table: {
      status: '상태',
      product: '제품',
      contact: '연락 방법',
      contactInfo: '연락처',
      date: '문의 일시',
      preview: '마지막 메시지'
    },
    status: {
      new: '신규',
      reviewed: '검토중',
      responded: '응답완료'
    },
    filters: {
      all: '전체',
      newOnly: '신규만',
      whatsapp: 'WhatsApp',
      email: '이메일'
    },
    detail: {
      conversation: '대화 기록',
      priceInquiry: '가격 문의 발생',
      contactInfo: '연락처 정보',
      copy: '복사',
      copied: '복사됨!',
      markAs: '상태 변경',
      back: '목록으로'
    }
  }
}

function AdminPage({ onClose }) {
  const [lang] = useState('ko') // 한국인 관리자 전용 - 한글 고정
  const [activeMenu, setActiveMenu] = useState('orders')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('') // 검색 기능 추가
  const [inquiries, setInquiries] = useState(initialInquiries)

  // localStorage의 customer_orders 통합
  const [orders, setOrders] = useState(() => {
    const customerOrders = JSON.parse(localStorage.getItem('customer_orders') || '[]')
    const convertedOrders = customerOrders.map(co => ({
      id: co.orderId,
      refNo: co.orderId.replace('ORD-', 'EY'),
      customerEmail: co.customer.email,
      customerName: co.customer.contactPerson,
      customerCompany: co.customer.companyName,
      customerPhone: co.customer.phone,
      customerAddress: co.customer.address + ', ' + co.customer.city + ' ' + (co.customer.postalCode || ''),
      customerCountry: co.country,
      status: co.status || 'pending',
      trackingNumber: null,
      items: [{
        name: co.product.name,
        nameKr: co.product.name,
        quantity: co.quantity,
        price: co.pricing.discountedPrice,
        image: co.product.image
      }],
      total: co.pricing.total,
      deliveryFee: co.pricing.shipping,
      shippingAddress: co.customer.address + ', ' + co.customer.city + ' ' + (co.customer.postalCode || '') + ', ' + co.country,
      createdAt: co.date,
      updatedAt: co.date,
      checklist: {
        contactConfirmed: true,
        priceAgreed: true,
        invoiceSent: false,
        paymentConfirmed: false,
        productPrepared: false,
        ciCreated: false,
        shipped: false,
        delivered: false
      },
      invoiceData: {
        paymentTerm: 'T/T in Advance',
        estimatedDelivery: 'After receipt of payment',
        shipment: 'Forwarder',
        validity: '1 WEEK',
        warranty: '1 YEAR',
        incoterms: 'Exwork',
        customsCode: '3304-99-9000',
        portOfLoading: 'KOREA',
        finalDestination: co.country,
        vessel: '',
        sailingDate: ''
      },
      timeline: [
        { status: 'pending', date: co.date, message: '주문 접수 (고객 직접 주문)' }
      ],
      sourceType: 'customer_direct',
      memos: [],
      customerNotes: co.customer.notes || ''
    }))
    return [...convertedOrders, ...initialOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  const [products, setProducts] = useState(initialProducts)
  const [copied, setCopied] = useState(false)
  const [trackingInput, setTrackingInput] = useState('')
  const [notificationSent, setNotificationSent] = useState(false)

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productIdError, setProductIdError] = useState(false)
  const [productForm, setProductForm] = useState({
    productId: '',
    nameEn: '',
    nameKr: '',
    category: 'Skincare',
    description: '',
    ingredients: '',
    usage: '',
    exportReady: true,
    certifications: '',
    moq: '',
    markets: '',
    priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
    mediaImages: [],
    mediaVideo: '',
    status: 'active'
  })

  // Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Invoice/CI Modal State
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCIModal, setShowCIModal] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)
  const invoiceRef = useRef(null)
  const ciRef = useRef(null)

  // Company Info for Invoice/CI
  const [companyInfo] = useState({
    name: 'eun young Kwak',
    address: '69, Seongsui-ro, Seongdong-gu, Republic of Korea',
    country: 'South Korea',
    phone: '+8210 63010851',
    bankName: 'KOOKMIN BANK',
    bankAddress: '26, Gukjegeumyung-ro 8-gil, Yeongdeungpo-gu, Seoul, Korea',
    accountName: 'Kwak Eunyoung',
    accountNo: '093668-11-025748(영 코스메드)',
    swiftCode: 'CZNBKRSEXXX',
    ceoName: 'Kwak Eunyoung',
    ceoTitle: 'CEO'
  })

  // Settings State
  const [settings, setSettings] = useState({
    adminName: '관리자',
    adminEmail: 'admin@youngcosmed.com',
    defaultResponse: '관심 가져주셔서 감사합니다. 정확한 가격 정보는 영업팀에서 개별적으로 안내드리겠습니다.',
    priceInquiryMessage: '정확한 가격은 저희 영업팀에서 직접 연락드려 안내해드리겠습니다.\n연락 받으실 수 있는 방법을 알려주세요!',
    contactMethods: [
      { id: 1, name: 'WhatsApp', enabled: true },
      { id: 2, name: '이메일', enabled: true }
    ],
    defaultLang: 'ko'
  })
  const [settingsSaved, setSettingsSaved] = useState(false)

  // 공통 응답 정책 State
  const [aiPolicy, setAiPolicy] = useState({
    // 회사 정책 기반 기본 응답 프롬프트
    globalSystemPrompt: `Young Cosmed는 한국 서울에 본사를 둔 정식 등록 B2B 도매 전문 기업입니다.
모든 제품은 글로벌 수출 인증(CE, FDA, CPNP 등)을 보유하고 있습니다.
전문적이고 신뢰할 수 있는 비즈니스 파트너로서 응대하세요.`,

    // 가격표 요청 대응
    priceListPolicy: `전체 가격표는 공개하지 않습니다.
제품별 상담 후 개별 견적을 제공하는 것이 원칙입니다.
MOQ 및 거래 조건 확인 후 가격을 안내합니다.
대량 주문 시 별도 할인 협의가 가능합니다.`,

    // 회사 신뢰성 관련 응답
    trustPolicy: `Young Cosmed는 대한민국에 정식 등록된 법인입니다.
안전한 거래 프로세스를 갖추고 있으며, 공식 결제 절차를 통해 진행됩니다.
필요 시 사업자등록증, 수출 인증서 등 회사 정보를 제공할 수 있습니다.
감정적 대응을 피하고 항상 전문적인 톤을 유지합니다.`,

    // 결제 방식 (배열로 관리)
    paymentMethods: [
      { id: 1, name: 'Wire Transfer', enabled: true },
      { id: 2, name: 'T/T (전신환송금)', enabled: true }
    ],
    paymentGuideText: '결제는 T/T(전신환송금) 또는 Wire Transfer를 통해 진행됩니다. 주문 확정 후 인보이스를 발행해 드리며, 입금 확인 후 출고가 진행됩니다.',

    // 가격 정보 노출 제한
    priceDisclosure: {
      neverDisclose: false,
      afterMoqConfirm: true,
      samplePricePolicy: false
    },

    // 응답 톤
    responseTone: 'professional', // professional, sales, clinical, friendly

    // 행동 제한
    restrictions: {
      noRetailPrice: true,
      noCompetitorComparison: true,
      noMedicalGuidance: true,
      noLegalLiability: true
    }
  })

  const t = uiText[lang]

  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'newOnly') return inq.status === 'new'
    if (filter === 'whatsapp') return inq.contactMethod === 'whatsapp'
    if (filter === 'email') return inq.contactMethod === 'email'
    return true
  })

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    responded: inquiries.filter(i => i.status === 'responded').length
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    if (lang === 'ko') {
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? '오후' : '오전'
      const hour12 = hours % 12 || 12
      return `${month}월 ${day}일 ${ampm} ${hour12}:${minutes}`
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateShort = (timestamp) => {
    const date = new Date(timestamp)
    if (lang === 'ko') {
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}월 ${day}일`
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries(prev => prev.map(inq =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    ))
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }))
    }
  }

  // 문의를 주문으로 전환하는 함수
  const convertInquiryToOrder = (inquiry) => {
    // 새 주문 ID 생성
    const newOrderId = `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`
    const newRefNo = `EY${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`

    // 제품 정보 찾기
    const product = products.find(p => p.id === inquiry.productId || p.nameEn === inquiry.productName)

    const newOrder = {
      id: newOrderId,
      refNo: newRefNo,
      customerEmail: inquiry.contactMethod === 'email' ? inquiry.contactValue : '',
      customerName: '',
      customerCompany: '',
      customerPhone: inquiry.contactMethod === 'whatsapp' ? inquiry.contactValue : '',
      customerAddress: '',
      customerCountry: '',
      status: 'pending',
      trackingNumber: null,
      items: [{
        name: inquiry.productName,
        nameKr: product?.nameKr || inquiry.productName,
        quantity: 0, // 관리자가 입력
        price: 0 // 관리자가 입력
      }],
      total: 0,
      deliveryFee: 0,
      shippingAddress: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checklist: {
        contactConfirmed: true,
        priceAgreed: false,
        invoiceSent: false,
        paymentConfirmed: false,
        productPrepared: false,
        ciCreated: false,
        shipped: false,
        delivered: false
      },
      invoiceData: {
        paymentTerm: 'T/T in Advance',
        estimatedDelivery: 'After receipt of payment',
        shipment: 'Forwarder',
        validity: '1 WEEK',
        warranty: '1 YEAR',
        incoterms: 'Exwork',
        customsCode: '3304-99-9000',
        portOfLoading: 'KOREA',
        finalDestination: '',
        vessel: '',
        sailingDate: ''
      },
      timeline: [
        { status: 'pending', date: new Date().toISOString(), message: `주문 생성됨 (문의 #${inquiry.id}에서 전환)` }
      ],
      sourceInquiryId: inquiry.id
    }

    // 주문 추가
    setOrders(prev => [newOrder, ...prev])

    // 문의 상태를 'responded'로 변경
    updateInquiryStatus(inquiry.id, 'responded')

    // 알림
    setNotificationSent(true)
    setTimeout(() => setNotificationSent(false), 3000)

    // 주문 확인 섹션으로 이동
    setActiveMenu('orders')
    setSelectedInquiry(null)
    setSelectedOrder(newOrder)
    setTrackingInput('')
  }

  const updateOrderStatus = (orderId, newStatus, tracking = null) => {
    const now = new Date().toISOString()
    const statusMessage = t.orders.statusMessages[newStatus].replace('{tracking}', tracking || '')

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const newTimeline = [
          ...order.timeline,
          { status: newStatus, date: now, message: statusMessage }
        ]
        return {
          ...order,
          status: newStatus,
          trackingNumber: tracking || order.trackingNumber,
          updatedAt: now,
          timeline: newTimeline
        }
      }
      return order
    }))

    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({
        ...prev,
        status: newStatus,
        trackingNumber: tracking || prev.trackingNumber,
        updatedAt: now,
        timeline: [
          ...prev.timeline,
          { status: newStatus, date: now, message: statusMessage }
        ]
      }))
    }

    // Show notification sent message
    setNotificationSent(true)
    setTimeout(() => setNotificationSent(false), 3000)
  }

  const deleteOrder = (orderId) => {
    if (window.confirm(lang === 'ko' ? '정말 이 주문을 삭제하시겠습니까?' : 'Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== orderId))
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null)
      }
    }
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => ['paid', 'preparing'].includes(o.status)).length,
    shipped: orders.filter(o => o.status === 'shipped').length
  }

  // Product Functions
  const openProductForm = (product = null) => {
    setProductIdError(false)
    if (product) {
      setEditingProduct(product)
      setProductForm({
        productId: product.productId || '',
        nameEn: product.nameEn,
        nameKr: product.nameKr,
        category: product.category,
        description: product.description,
        ingredients: product.ingredients,
        usage: product.usage || '',
        exportReady: product.exportReady,
        certifications: product.certifications || product.exportNote || '',
        moq: product.moq,
        markets: product.markets,
        priceResponse: product.priceResponse || 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
        mediaImages: product.mediaImages || [product.image],
        mediaVideo: product.mediaVideo || '',
        status: product.status
      })
    } else {
      setEditingProduct(null)
      setProductForm({
        productId: '',
        nameEn: '',
        nameKr: '',
        category: 'Skincare',
        description: '',
        ingredients: '',
        usage: '',
        exportReady: true,
        certifications: '',
        moq: '',
        markets: '',
        priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
        mediaImages: [],
        mediaVideo: '',
        status: 'active'
      })
    }
    setShowProductForm(true)
  }

  const checkProductIdDuplicate = (id) => {
    const isDuplicate = products.some(p =>
      p.productId === id && (!editingProduct || p.id !== editingProduct.id)
    )
    setProductIdError(isDuplicate)
    return isDuplicate
  }

  const saveProduct = () => {
    // Validate Product ID
    if (!productForm.productId.trim()) return
    if (checkProductIdDuplicate(productForm.productId)) return

    if (editingProduct) {
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              ...productForm,
              image: productForm.mediaImages[0] || '/product1.png',
              updatedAt: new Date().toISOString()
            }
          : p
      ))
    } else {
      const newProduct = {
        id: Date.now(),
        ...productForm,
        image: productForm.mediaImages[0] || '/product1.png',
        updatedAt: new Date().toISOString()
      }
      setProducts(prev => [newProduct, ...prev])
    }
    setShowProductForm(false)
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  const saveSettings = () => {
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2000)
  }

  return (
    <div className="admin-page">
      {/* Sidebar - 단순하고 직관적인 메뉴 */}
      <aside className="admin-sidebar">
        <div className="admin-logo">관리자</div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeMenu === 'orders' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('orders'); setSelectedOrder(null); }}
          >
            <span>주문 확인</span>
            {orderStats.pending > 0 && <span className="nav-badge">{orderStats.pending}</span>}
          </button>
          <button
            className={`admin-nav-item ${activeMenu === 'products' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('products'); setShowProductForm(false); }}
          >
            <span>제품 등록/수정</span>
          </button>
          <button
            className={`admin-nav-item ${activeMenu === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveMenu('settings')}
          >
            <span>공통 응답 설정</span>
          </button>
        </nav>
        <button className="admin-back-btn" onClick={onClose}>
          ← 사이트로 돌아가기
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Bar - 현재 위치 명확히 표시 */}
        <header className="admin-header">
          <h1 className="admin-page-title">
            {activeMenu === 'orders' && '주문 확인'}
            {activeMenu === 'products' && '제품 등록/수정'}
            {activeMenu === 'settings' && '공통 응답 설정'}
          </h1>
          <div className="admin-header-right">
            <div className="admin-user">
              <button className="admin-logout">로그아웃</button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">

          {/* ========== DASHBOARD ========== */}
          {activeMenu === 'dashboard' && (
            <>
              <div className="admin-summary">
                <div className="summary-card">
                  <span className="summary-label">{t.dashboard.newToday}</span>
                  <span className="summary-value">{stats.new}</span>
                </div>
                <div className="summary-card highlight">
                  <span className="summary-label">{t.dashboard.unanswered}</span>
                  <span className="summary-value">{inquiries.filter(i => i.status !== 'responded').length}</span>
                </div>
                <div className="summary-card">
                  <span className="summary-label">{t.dashboard.thisWeek}</span>
                  <span className="summary-value">{stats.total}</span>
                </div>
              </div>

              <div className="dashboard-section">
                <h3 className="dashboard-section-title">{t.dashboard.recentInquiries}</h3>
                {inquiries.length > 0 ? (
                  <div className="dashboard-list">
                    {inquiries.slice(0, 3).map(inq => (
                      <div
                        key={inq.id}
                        className="dashboard-list-item"
                        onClick={() => { setActiveMenu('inquiries'); setSelectedInquiry(inq); }}
                      >
                        <img src={inq.productImage} alt="" className="dashboard-item-thumb" />
                        <div className="dashboard-item-info">
                          <span className="dashboard-item-name">{inq.productName}</span>
                          <span className="dashboard-item-time">{formatDate(inq.timestamp)}</span>
                        </div>
                        <span className={`status-badge ${inq.status}`}>{t.status[inq.status]}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="dashboard-empty">{t.dashboard.noInquiries}</p>
                )}
                <button
                  className="dashboard-cta"
                  onClick={() => setActiveMenu('inquiries')}
                >
                  {t.dashboard.goToInquiries} →
                </button>
              </div>
            </>
          )}

          {/* ========== PRICE INQUIRIES ========== */}
          {activeMenu === 'inquiries' && !selectedInquiry && (
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
                        onClick={() => setSelectedInquiry(inquiry)}
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
          )}


          {/* ========== ORDERS ========== */}
          {activeMenu === 'orders' && !selectedOrder && (
            <>
              <div className="admin-summary orders-summary">
                <div className="summary-card">
                  <span className="summary-label">{t.orders.total}</span>
                  <span className="summary-value">{orderStats.total}</span>
                </div>
                <div className="summary-card highlight">
                  <span className="summary-label">{t.orders.pending}</span>
                  <span className="summary-value">{orderStats.pending}</span>
                </div>
                <div className="summary-card">
                  <span className="summary-label">{t.orders.processing}</span>
                  <span className="summary-value">{orderStats.processing}</span>
                </div>
                <div className="summary-card">
                  <span className="summary-label">{t.orders.shipped}</span>
                  <span className="summary-value">{orderStats.shipped}</span>
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>{t.orders.status}</th>
                      <th>{t.orders.orderId}</th>
                      <th>{t.orders.customer}</th>
                      <th>{t.orders.items}</th>
                      <th>{t.orders.total}</th>
                      <th>{t.orders.date}</th>
                      <th>{t.orders.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="table-row">
                        <td>
                          <span className={`status-badge order-${order.status}`}>
                            {t.orders.statuses[order.status]}
                          </span>
                        </td>
                        <td>
                          <span className="order-id-cell">{order.id}</span>
                        </td>
                        <td className="customer-cell">
                          <span className="customer-name">{order.customerName}</span>
                          <span className="customer-company">{order.customerPhone || order.customerEmail}</span>
                        </td>
                        <td>{order.items.length}{lang === 'ko' ? t.orders.itemsCount : ` ${t.orders.itemsCount}`}</td>
                        <td className="total-cell">${order.total.toLocaleString()}</td>
                        <td className="date-cell">{formatDateShort(order.createdAt)}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
                            <button
                              className="action-btn view"
                              onClick={() => {
                                setSelectedOrder(order)
                                setTrackingInput(order.trackingNumber || '')
                              }}
                            >
                              {t.orders.viewDetails}
                            </button>
                            <button
                              className="order-delete-btn"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteOrder(order.id)
                              }}
                              title="삭제"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Order Detail */}
          {activeMenu === 'orders' && selectedOrder && (
            <div className="order-detail">
              <button className="detail-back-btn" onClick={() => setSelectedOrder(null)}>
                ← {t.detail.back}
              </button>

              {notificationSent && (
                <div className="notification-toast">
                  {t.orders.notificationSent}
                </div>
              )}

              <div className="order-detail-content">
                <div className="order-detail-main">
                  {/* Order Info */}
                  <div className="order-info-card">
                    <div className="order-info-header">
                      <div>
                        <span className="order-detail-id">{selectedOrder.id}</span>
                        <span className={`status-badge order-${selectedOrder.status}`}>
                          {t.orders.statuses[selectedOrder.status]}
                        </span>
                      </div>
                      <span className="order-detail-date">{formatDate(selectedOrder.createdAt)}</span>
                    </div>

                    <div className="order-customer-info">
                      <h4>{t.orders.customer}</h4>
                      <div className="info-display-field">
                        <label>이름</label>
                        <p>{selectedOrder.customerName || '-'}</p>
                      </div>
                      <div className="info-display-field">
                        <label>회사명</label>
                        <p>{selectedOrder.customerCompany || '-'}</p>
                      </div>
                      <div className="info-display-field">
                        <label>이메일</label>
                        <p>{selectedOrder.customerEmail || '-'}</p>
                      </div>
                      <div className="info-display-field">
                        <label>전화번호</label>
                        <p>{selectedOrder.customerPhone || '-'}</p>
                      </div>
                      <div className="info-display-field">
                        <label>국가</label>
                        <p>{selectedOrder.customerCountry || '-'}</p>
                      </div>
                      {selectedOrder.customerNotes && (
                        <div className="info-display-field">
                          <label>고객 메모</label>
                          <p className="customer-note">{selectedOrder.customerNotes}</p>
                        </div>
                      )}
                    </div>

                    <div className="order-shipping-info">
                      <h4>{t.orders.shippingAddress}</h4>
                      <div className="info-display-field">
                        <p>{selectedOrder.shippingAddress || '-'}</p>
                      </div>
                    </div>

                    <div className="order-items-info">
                      <h4>{t.orders.items}</h4>
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="order-item-row editable">
                          <div className="item-name-edit">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => {
                                const newItems = [...selectedOrder.items]
                                newItems[idx] = { ...newItems[idx], name: e.target.value }
                                const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                                setOrders(prev => prev.map(o =>
                                  o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                                ))
                                setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                              }}
                              placeholder="제품명"
                            />
                          </div>
                          <div className="item-qty-edit">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newItems = [...selectedOrder.items]
                                newItems[idx] = { ...newItems[idx], quantity: parseInt(e.target.value) || 0 }
                                const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                                setOrders(prev => prev.map(o =>
                                  o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                                ))
                                setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                              }}
                              placeholder="수량"
                              min="0"
                            />
                            <span className="qty-label">개</span>
                          </div>
                          <div className="item-price-edit">
                            <span className="price-prefix">$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => {
                                const newItems = [...selectedOrder.items]
                                newItems[idx] = { ...newItems[idx], price: parseFloat(e.target.value) || 0 }
                                const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                                setOrders(prev => prev.map(o =>
                                  o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                                ))
                                setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                              }}
                              placeholder="단가"
                              min="0"
                            />
                          </div>
                          <span className="item-subtotal">
                            ${(item.quantity * item.price).toLocaleString()}
                          </span>
                          <button
                            className="item-remove-btn"
                            onClick={() => {
                              const newItems = selectedOrder.items.filter((_, i) => i !== idx)
                              const newTotal = newItems.reduce((sum, i) => sum + (i.quantity * i.price), 0)
                              setOrders(prev => prev.map(o =>
                                o.id === selectedOrder.id ? { ...o, items: newItems, total: newTotal } : o
                              ))
                              setSelectedOrder(prev => ({ ...prev, items: newItems, total: newTotal }))
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {/* 품목 추가 버튼 */}
                      <button
                        className="add-item-btn"
                        onClick={() => {
                          const newItems = [...selectedOrder.items, { name: '', nameKr: '', quantity: 0, price: 0 }]
                          setOrders(prev => prev.map(o =>
                            o.id === selectedOrder.id ? { ...o, items: newItems } : o
                          ))
                          setSelectedOrder(prev => ({ ...prev, items: newItems }))
                        }}
                      >
                        + 품목 추가
                      </button>

                      {/* 배송비 */}
                      <div className="order-item-row delivery-fee-row editable">
                        <span className="item-name">Delivery Fee</span>
                        <div className="item-price-edit delivery-fee-edit">
                          <span className="price-prefix">$</span>
                          <input
                            type="number"
                            value={selectedOrder.deliveryFee || 0}
                            onChange={(e) => {
                              const newValue = parseFloat(e.target.value) || 0
                              setOrders(prev => prev.map(o =>
                                o.id === selectedOrder.id ? { ...o, deliveryFee: newValue } : o
                              ))
                              setSelectedOrder(prev => ({ ...prev, deliveryFee: newValue }))
                            }}
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="order-total-row">
                        <span>{t.orders.totalLabel}</span>
                        <span className="total-value">${(selectedOrder.total + (selectedOrder.deliveryFee || 0)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* 진행사항 체크리스트 */}
                  <div className="order-checklist-card">
                    <h4>진행사항 체크리스트</h4>
                    <div className="checklist-grid">
                      {[
                        { key: 'contactConfirmed', label: '연락처 확인됨' },
                        { key: 'priceAgreed', label: '가격 협의 완료' },
                        { key: 'invoiceSent', label: '인보이스 발송' },
                        { key: 'paymentConfirmed', label: '입금 확인' },
                        { key: 'productPrepared', label: '상품 준비 완료' },
                        { key: 'ciCreated', label: 'CI 작성 완료' },
                        { key: 'shipped', label: '배송 시작' },
                        { key: 'delivered', label: '배송 완료' }
                      ].map(item => (
                        <label key={item.key} className="checklist-item">
                          <input
                            type="checkbox"
                            checked={selectedOrder.checklist?.[item.key] || false}
                            onChange={(e) => {
                              const newChecklist = {
                                ...selectedOrder.checklist,
                                [item.key]: e.target.checked
                              }
                              setOrders(prev => prev.map(o =>
                                o.id === selectedOrder.id
                                  ? { ...o, checklist: newChecklist }
                                  : o
                              ))
                              setSelectedOrder(prev => ({ ...prev, checklist: newChecklist }))
                            }}
                          />
                          <span className="checklist-label">{item.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* 운송장 번호 입력 */}
                    <div className="tracking-input-section">
                      <label>{t.orders.trackingNumber}</label>
                      <input
                        type="text"
                        value={trackingInput}
                        onChange={e => setTrackingInput(e.target.value)}
                        placeholder={t.orders.trackingPlaceholder}
                      />
                    </div>
                  </div>

                  {/* 인보이스 / CI 생성 버튼 */}
                  <div className="invoice-ci-card">
                    <h4>서류 생성</h4>
                    <p className="invoice-ci-desc">
                      주문 정보를 기반으로 PROFORMA INVOICE 또는 COMMERCIAL INVOICE를 생성합니다.
                    </p>
                    <div className="invoice-ci-buttons">
                      <button
                        className="invoice-btn proforma"
                        onClick={() => {
                          setEditingInvoice({
                            ...selectedOrder,
                            invoiceData: selectedOrder.invoiceData || {}
                          })
                          setShowInvoiceModal(true)
                        }}
                      >
                        <span className="btn-icon">📄</span>
                        <span className="btn-text">
                          <strong>PROFORMA INVOICE</strong>
                          <small>견적 인보이스 생성</small>
                        </span>
                      </button>
                      <button
                        className="invoice-btn commercial"
                        onClick={() => {
                          setEditingInvoice({
                            ...selectedOrder,
                            invoiceData: selectedOrder.invoiceData || {}
                          })
                          setShowCIModal(true)
                        }}
                      >
                        <span className="btn-icon">📋</span>
                        <span className="btn-text">
                          <strong>COMMERCIAL INVOICE</strong>
                          <small>상업 인보이스 (CI) 생성</small>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="order-timeline-card">
                  <h4>{t.orders.orderTimeline}</h4>
                  <div className="order-timeline-list">
                    {selectedOrder.timeline.map((event, idx) => (
                      <div key={idx} className="timeline-event">
                        <div className={`timeline-event-dot ${event.status}`} />
                        <div className="timeline-event-content">
                          <span className="timeline-event-status">{t.orders.statuses[event.status]}</span>
                          <span className="timeline-event-message">{event.message}</span>
                          <span className="timeline-event-date">{formatDate(event.date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== PRODUCTS - 단순하고 큰 UI ========== */}
          {activeMenu === 'products' && !showProductForm && (
            <>
              <div className="products-header-simple">
                <p className="products-helper-text">등록된 제품 목록입니다. 제품을 클릭하면 수정할 수 있습니다.</p>
                <button className="add-product-btn-large" onClick={() => openProductForm()}>
                  + 새 제품 등록하기
                </button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>상태</th>
                      <th>제품코드</th>
                      <th>제품</th>
                      <th>카테고리</th>
                      <th>MOQ</th>
                      <th>수정일</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="table-row">
                        <td>
                          <span className={`status-badge ${product.status}`}>
                            {product.status === 'active' ? '활성' : product.status === 'draft' ? '임시저장' : '비활성'}
                          </span>
                        </td>
                        <td>
                          <span className="product-id-cell">{product.productId}</span>
                        </td>
                        <td className="product-cell">
                          <img src={product.image} alt="" className="product-thumb" />
                          <div>
                            <span className="product-name-cell">{product.nameKr}</span>
                            <span className="product-category-cell">{product.nameEn}</span>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>{product.moq}</td>
                        <td className="date-cell">{formatDateShort(product.updatedAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn edit" onClick={() => openProductForm(product)}>
                              수정
                            </button>
                            <button className="action-btn delete" onClick={() => setDeleteConfirm(product.id)}>
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Product Form - 새 제품 등록 (한글 전용) */}
          {activeMenu === 'products' && showProductForm && (
            <ProductRegistration
              onClose={() => setShowProductForm(false)}
              onSave={(formData) => {
                console.log('Product saved:', formData)
                setShowProductForm(false)
              }}
              editProduct={editingProduct}
            />
          )}

          {/* ========== SETTINGS - 카드 기반 단순 UI ========== */}
          {activeMenu === 'settings' && (
            <div className="settings-page-simple">

              {/* 카드 1: 가격 문의시 연락 방법 설정 */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">가격 문의시 연락 방법 설정</h3>
                  <p className="settings-card-desc">
                    바이어가 정확한 가격을 문의하면, 영업팀이 직접 연락드립니다.<br />
                    바이어에게 연락 방법을 요청할 때 보여줄 메시지와 연락 방법을 설정하세요.
                  </p>
                </div>
                <div className="settings-card-body">
                  <label className="simple-label">바이어에게 보여줄 메시지</label>
                  <textarea
                    className="simple-textarea"
                    value={settings.priceInquiryMessage}
                    onChange={e => setSettings({ ...settings, priceInquiryMessage: e.target.value })}
                    rows={3}
                    placeholder="예: 정확한 가격은 저희 영업팀에서 직접 연락드려 안내해드리겠습니다.&#10;연락 받으실 수 있는 방법을 알려주세요!"
                  />
                  <div className="simple-divider"></div>
                  <label className="simple-label">바이어가 선택할 수 있는 연락 방법</label>
                  <div className="simple-tag-list">
                    {settings.contactMethods.map(method => (
                      <span key={method.id} className="simple-tag">
                        {method.name}
                        <button
                          type="button"
                          className="simple-tag-remove"
                          onClick={() => setSettings({
                            ...settings,
                            contactMethods: settings.contactMethods.filter(m => m.id !== method.id)
                          })}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="simple-add-row">
                    <input
                      type="text"
                      className="simple-input"
                      placeholder="연락 방법 입력 (예: 카카오톡, Telegram)"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setSettings({
                            ...settings,
                            contactMethods: [
                              ...settings.contactMethods,
                              { id: Date.now(), name: e.target.value.trim(), enabled: true }
                            ]
                          })
                          e.target.value = ''
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="simple-add-btn"
                      onClick={e => {
                        const input = e.target.previousElementSibling
                        if (input.value.trim()) {
                          setSettings({
                            ...settings,
                            contactMethods: [
                              ...settings.contactMethods,
                              { id: Date.now(), name: input.value.trim(), enabled: true }
                            ]
                          })
                          input.value = ''
                        }
                      }}
                    >
                      추가
                    </button>
                  </div>
                </div>
              </div>

              {/* 카드 2: 가격표 요청 대응 */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">가격표 요청 대응 설정</h3>
                  <p className="settings-card-desc">
                    바이어가 전체 가격표를 요청할 때 공통으로 보낼 답변입니다.<br />
                    예: "가격표 보내주세요", "전체 상품 가격 알고 싶어요" 등
                  </p>
                </div>
                <div className="settings-card-body">
                  <textarea
                    className="simple-textarea"
                    value={aiPolicy.priceListPolicy}
                    onChange={e => setAiPolicy({ ...aiPolicy, priceListPolicy: e.target.value })}
                    rows={5}
                    placeholder="예: 전체 가격표는 공개하지 않습니다. 관심 있는 제품을 말씀해주시면 개별 견적을 보내드리겠습니다."
                  />
                </div>
              </div>

              {/* 카드 3: 회사 신뢰 질문 대응 */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">회사 신뢰 질문 대응</h3>
                  <p className="settings-card-desc">
                    바이어가 회사 신뢰성에 대해 질문할 때 공통으로 보낼 답변입니다.<br />
                    예: "믿을 수 있나요?", "어떻게 믿고 돈을 보내요?", "사기 아니에요?" 등
                  </p>
                </div>
                <div className="settings-card-body">
                  <textarea
                    className="simple-textarea"
                    value={aiPolicy.trustPolicy}
                    onChange={e => setAiPolicy({ ...aiPolicy, trustPolicy: e.target.value })}
                    rows={5}
                    placeholder="예: Young Cosmed는 대한민국에 정식 등록된 법인입니다. 필요하시면 사업자등록증을 보내드릴 수 있습니다."
                  />
                </div>
              </div>

              {/* 카드 3: 결제 방법 안내 */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">결제 방법 안내</h3>
                  <p className="settings-card-desc">
                    현재 가능한 결제 방법을 등록하세요.<br />
                    등록된 방법만 바이어에게 안내됩니다.
                  </p>
                </div>
                <div className="settings-card-body">
                  <div className="simple-tag-list">
                    {aiPolicy.paymentMethods.map(method => (
                      <span key={method.id} className="simple-tag">
                        {method.name}
                        <button
                          type="button"
                          className="simple-tag-remove"
                          onClick={() => setAiPolicy({
                            ...aiPolicy,
                            paymentMethods: aiPolicy.paymentMethods.filter(m => m.id !== method.id)
                          })}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="simple-add-row">
                    <input
                      type="text"
                      className="simple-input"
                      placeholder="결제 방법 입력 (예: PayPal)"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setAiPolicy({
                            ...aiPolicy,
                            paymentMethods: [
                              ...aiPolicy.paymentMethods,
                              { id: Date.now(), name: e.target.value.trim(), enabled: true }
                            ]
                          })
                          e.target.value = ''
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="simple-add-btn"
                      onClick={e => {
                        const input = e.target.previousElementSibling
                        if (input.value.trim()) {
                          setAiPolicy({
                            ...aiPolicy,
                            paymentMethods: [
                              ...aiPolicy.paymentMethods,
                              { id: Date.now(), name: input.value.trim(), enabled: true }
                            ]
                          })
                          input.value = ''
                        }
                      }}
                    >
                      추가
                    </button>
                  </div>
                  <div className="simple-divider"></div>
                  <label className="simple-label">결제 안내 문구</label>
                  <textarea
                    className="simple-textarea"
                    value={aiPolicy.paymentGuideText}
                    onChange={e => setAiPolicy({ ...aiPolicy, paymentGuideText: e.target.value })}
                    rows={3}
                    placeholder="예: 결제는 T/T 또는 Wire Transfer로 진행됩니다. 주문 확정 후 인보이스를 보내드립니다."
                  />
                </div>
              </div>

              {/* 카드 4: 말투 설정 */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">말투 설정</h3>
                  <p className="settings-card-desc">
                    바이어에게 답변할 때 사용할 말투를 선택하세요.
                  </p>
                </div>
                <div className="settings-card-body">
                  <div className="simple-radio-group">
                    <label className={`simple-radio-option ${aiPolicy.responseTone === 'professional' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="responseTone"
                        value="professional"
                        checked={aiPolicy.responseTone === 'professional'}
                        onChange={e => setAiPolicy({ ...aiPolicy, responseTone: e.target.value })}
                      />
                      <div className="simple-radio-content">
                        <span className="simple-radio-title">전문적인 말투</span>
                        <span className="simple-radio-desc">격식 있고 신뢰감 있는 비즈니스 톤</span>
                      </div>
                    </label>
                    <label className={`simple-radio-option ${aiPolicy.responseTone === 'friendly' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="responseTone"
                        value="friendly"
                        checked={aiPolicy.responseTone === 'friendly'}
                        onChange={e => setAiPolicy({ ...aiPolicy, responseTone: e.target.value })}
                      />
                      <div className="simple-radio-content">
                        <span className="simple-radio-title">친근한 말투</span>
                        <span className="simple-radio-desc">친절하고 부드러운 비즈니스 톤</span>
                      </div>
                    </label>
                    <label className={`simple-radio-option ${aiPolicy.responseTone === 'sales' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="responseTone"
                        value="sales"
                        checked={aiPolicy.responseTone === 'sales'}
                        onChange={e => setAiPolicy({ ...aiPolicy, responseTone: e.target.value })}
                      />
                      <div className="simple-radio-content">
                        <span className="simple-radio-title">적극적인 말투</span>
                        <span className="simple-radio-desc">설득력 있고 영업적인 톤</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* 카드 5: 하면 안 되는 것 */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">절대 말하면 안 되는 것</h3>
                  <p className="settings-card-desc">
                    체크된 항목은 바이어에게 절대 말하지 않습니다.
                  </p>
                </div>
                <div className="settings-card-body">
                  <div className="simple-checkbox-group">
                    <label className="simple-checkbox">
                      <input
                        type="checkbox"
                        checked={aiPolicy.restrictions.noRetailPrice}
                        onChange={e => setAiPolicy({
                          ...aiPolicy,
                          restrictions: { ...aiPolicy.restrictions, noRetailPrice: e.target.checked }
                        })}
                      />
                      <span className="simple-checkbox-text">소비자 가격 말하지 않기</span>
                    </label>
                    <label className="simple-checkbox">
                      <input
                        type="checkbox"
                        checked={aiPolicy.restrictions.noCompetitorComparison}
                        onChange={e => setAiPolicy({
                          ...aiPolicy,
                          restrictions: { ...aiPolicy.restrictions, noCompetitorComparison: e.target.checked }
                        })}
                      />
                      <span className="simple-checkbox-text">경쟁사 비교하지 않기</span>
                    </label>
                    <label className="simple-checkbox">
                      <input
                        type="checkbox"
                        checked={aiPolicy.restrictions.noMedicalGuidance}
                        onChange={e => setAiPolicy({
                          ...aiPolicy,
                          restrictions: { ...aiPolicy.restrictions, noMedicalGuidance: e.target.checked }
                        })}
                      />
                      <span className="simple-checkbox-text">의료 시술 방법 안내하지 않기</span>
                    </label>
                    <label className="simple-checkbox">
                      <input
                        type="checkbox"
                        checked={aiPolicy.restrictions.noLegalLiability}
                        onChange={e => setAiPolicy({
                          ...aiPolicy,
                          restrictions: { ...aiPolicy.restrictions, noLegalLiability: e.target.checked }
                        })}
                      />
                      <span className="simple-checkbox-text">법적 보증 약속하지 않기</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 카드 6: 회사 기본 정보 */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">회사 기본 정보</h3>
                  <p className="settings-card-desc">회사를 소개할 때 사용할 기본 정보입니다.</p>
                </div>
                <div className="settings-card-body">
                  <textarea
                    className="simple-textarea"
                    value={aiPolicy.globalSystemPrompt}
                    onChange={e => setAiPolicy({ ...aiPolicy, globalSystemPrompt: e.target.value })}
                    rows={5}
                    placeholder="예: Young Cosmed는 서울에 본사를 둔 K-뷰티 B2B 전문 기업입니다. 모든 제품은 CE, FDA 인증을 보유하고 있습니다."
                  />
                </div>
              </div>


              {/* 저장 버튼 - 하단 고정 */}
              <div className="settings-save-area">
                <button className="settings-save-btn-large" onClick={saveSettings}>
                  {settingsSaved ? '저장되었습니다!' : '설정 저장하기'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <p className="modal-message">{t.products.deleteConfirm}</p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setDeleteConfirm(null)}>
                {t.products.cancel}
              </button>
              <button className="modal-delete" onClick={() => deleteProduct(deleteConfirm)}>
                {t.products.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFORMA INVOICE Modal */}
      {showInvoiceModal && editingInvoice && (
        <div className="modal-overlay invoice-modal-overlay" onClick={() => setShowInvoiceModal(false)}>
          <div className="invoice-modal-content" onClick={e => e.stopPropagation()}>
            <div className="invoice-modal-header">
              <h2>PROFORMA INVOICE 미리보기</h2>
              <div className="invoice-modal-actions">
                <button
                  className="pdf-generate-btn"
                  onClick={() => generatePDF(invoiceRef, `Invoice_${editingInvoice.id}`)}
                >
                  📥 PDF 생성 / 인쇄
                </button>
                <button className="modal-close-btn" onClick={() => setShowInvoiceModal(false)}>✕</button>
              </div>
            </div>

            <div className="invoice-modal-body">
              {/* 수정 가능한 필드들 */}
              <div className="invoice-edit-section">
                <h3>인보이스 정보 수정</h3>
                <div className="invoice-edit-grid">
                  <div className="invoice-edit-field">
                    <label>Ref. No.</label>
                    <input
                      type="text"
                      value={editingInvoice.refNo || ''}
                      onChange={e => setEditingInvoice({ ...editingInvoice, refNo: e.target.value })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Payment Term</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.paymentTerm || 'T/T in Advance'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, paymentTerm: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Shipment</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.shipment || 'Forwarder'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, shipment: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Validity</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.validity || '1 WEEK'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, validity: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Warranty</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.warranty || '1 YEAR'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, warranty: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Delivery Fee ($)</label>
                    <input
                      type="number"
                      value={editingInvoice.deliveryFee || 0}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        deliveryFee: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* 인보이스 미리보기 */}
              <div className="invoice-preview-wrapper">
                <div ref={invoiceRef} className="invoice-container">
                  <h1 className="header-title">PROFORMA INVOICE</h1>

                  <table className="invoice-header-table">
                    <tbody>
                      <tr>
                        <td style={{ width: '60%' }}>
                          <strong>From</strong><br />
                          {companyInfo.name}<br />
                          {companyInfo.address}<br />
                          {companyInfo.country}<br />
                          <strong>Contact</strong> {companyInfo.phone}
                        </td>
                        <td style={{ width: '40%' }}>
                          <strong>Date</strong> {formatInvoiceDate(new Date())}<br />
                          <strong>Ref. No.</strong> {editingInvoice.refNo || editingInvoice.id}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>To</strong><br />
                          {editingInvoice.shippingAddress}<br />
                          {editingInvoice.customerName}<br />
                          {editingInvoice.customerCountry || ''}<br />
                          <strong>Contact</strong> {editingInvoice.customerPhone || editingInvoice.customerEmail}
                        </td>
                        <td>
                          <strong>Total Page</strong> 1 OF 1
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p style={{ margin: '15px 0', fontSize: '12px' }}>
                    We have the pleasure in offering you the following merchandise under the terms and conditions
                    set forth hereunder subject to our final confirmation
                  </p>

                  <p style={{ textAlign: 'right', margin: '10px 0', fontSize: '12px' }}>
                    ({editingInvoice.invoiceData?.incoterms || 'Exwork'})
                  </p>

                  <table className="invoice-items-table">
                    <thead>
                      <tr>
                        <th style={{ width: '8%' }}>No.</th>
                        <th style={{ width: '42%' }}>Description</th>
                        <th style={{ width: '15%' }}>Quantity</th>
                        <th style={{ width: '15%' }}>Unit Price</th>
                        <th style={{ width: '20%' }}>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editingInvoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item.nameKr || item.name}</td>
                          <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                          <td style={{ textAlign: 'right' }}>$ {item.price.toFixed(2)}</td>
                          <td style={{ textAlign: 'right' }}>$ {(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                      ))}
                      {/* 빈 행 추가 */}
                      {Array(Math.max(0, 8 - editingInvoice.items.length)).fill(0).map((_, idx) => (
                        <tr key={`empty-${idx}`}>
                          <td>&nbsp;</td>
                          <td></td>
                          <td></td>
                          <td>$</td>
                          <td style={{ textAlign: 'right' }}>-</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#fff8dc' }}>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                          Delivery Fee( {editingInvoice.invoiceData?.shipment === 'Forwarder' ? 'handcarry' : editingInvoice.invoiceData?.shipment} )
                        </td>
                        <td style={{ textAlign: 'right' }}>$ {(editingInvoice.deliveryFee || 0).toLocaleString()}</td>
                      </tr>
                      <tr className="total-row" style={{ fontWeight: 'bold', background: '#f5f5f5' }}>
                        <td colSpan="4" style={{ textAlign: 'center' }}>TOTAL</td>
                        <td style={{ textAlign: 'right' }}>$ {(editingInvoice.total + (editingInvoice.deliveryFee || 0)).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="invoice-terms" style={{ marginTop: '20px', fontSize: '12px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr><td><strong>Payment Term:</strong></td><td>{editingInvoice.invoiceData?.paymentTerm || 'T/T in Advance'}</td></tr>
                        <tr><td><strong>Estimated Delivery:</strong></td><td>{editingInvoice.invoiceData?.estimatedDelivery || 'After receipt of payment'}</td></tr>
                        <tr><td><strong>Shipment:</strong></td><td>{editingInvoice.invoiceData?.shipment || 'Forwarder'}</td></tr>
                        <tr><td><strong>Validity:</strong></td><td>{editingInvoice.invoiceData?.validity || '1 WEEK'}</td></tr>
                        <tr><td><strong>Warranty:</strong></td><td>{editingInvoice.invoiceData?.warranty || '1 YEAR'}</td></tr>
                        <tr><td><strong>Bank Name:</strong></td><td>{companyInfo.bankName}</td></tr>
                        <tr><td><strong>Bank Address:</strong></td><td>{companyInfo.bankAddress}</td></tr>
                        <tr><td><strong>A/C Name:</strong></td><td>{companyInfo.accountName}</td></tr>
                        <tr><td><strong>A/C No.:</strong></td><td>{companyInfo.accountNo}</td></tr>
                        <tr><td><strong>Swift code:</strong></td><td>{companyInfo.swiftCode}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="signature-area">
                    <p><strong>Accepted By</strong></p>
                    <p>Name: {companyInfo.ceoName}</p>
                    <p>Title: {companyInfo.ceoTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMMERCIAL INVOICE (CI) Modal */}
      {showCIModal && editingInvoice && (
        <div className="modal-overlay invoice-modal-overlay" onClick={() => setShowCIModal(false)}>
          <div className="invoice-modal-content" onClick={e => e.stopPropagation()}>
            <div className="invoice-modal-header">
              <h2>COMMERCIAL INVOICE (CI) 미리보기</h2>
              <div className="invoice-modal-actions">
                <button
                  className="pdf-generate-btn"
                  onClick={() => generatePDF(ciRef, `CI_${editingInvoice.id}`)}
                >
                  📥 PDF 생성 / 인쇄
                </button>
                <button className="modal-close-btn" onClick={() => setShowCIModal(false)}>✕</button>
              </div>
            </div>

            <div className="invoice-modal-body">
              {/* 수정 가능한 필드들 */}
              <div className="invoice-edit-section">
                <h3>CI 정보 수정</h3>
                <div className="invoice-edit-grid">
                  <div className="invoice-edit-field">
                    <label>NO. & Date of Invoice</label>
                    <input
                      type="text"
                      value={editingInvoice.refNo || formatInvoiceDate(new Date())}
                      onChange={e => setEditingInvoice({ ...editingInvoice, refNo: e.target.value })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Terms of Payment</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.paymentTerm || 'T/T ADVANCE'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, paymentTerm: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>INCOTERMS</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.incoterms || 'ExWork'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, incoterms: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Port of Loading</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.portOfLoading || 'KOREA'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, portOfLoading: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Final Destination</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.finalDestination || editingInvoice.customerCountry || 'USA'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, finalDestination: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Customs Code</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.customsCode || '3304-99-9000'}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, customsCode: e.target.value }
                      })}
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Vessel</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.vessel || ''}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, vessel: e.target.value }
                      })}
                      placeholder="선박/항공편명"
                    />
                  </div>
                  <div className="invoice-edit-field">
                    <label>Sailing on or about</label>
                    <input
                      type="text"
                      value={editingInvoice.invoiceData?.sailingDate || ''}
                      onChange={e => setEditingInvoice({
                        ...editingInvoice,
                        invoiceData: { ...editingInvoice.invoiceData, sailingDate: e.target.value }
                      })}
                      placeholder="출항일"
                    />
                  </div>
                </div>
              </div>

              {/* CI 미리보기 */}
              <div className="invoice-preview-wrapper">
                <div ref={ciRef} className="ci-container">
                  <h1 className="header-title">COMMERCIAL INVOICE</h1>

                  <table className="ci-header-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                    <tbody>
                      <tr>
                        <td style={{ width: '50%', border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                          <strong>1. Shipper/Exporter</strong><br />
                          {companyInfo.name}<br />
                          {companyInfo.address}
                        </td>
                        <td style={{ width: '50%', border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                          <strong>8. NO. & Date of Invoice</strong><br />
                          {formatInvoiceDate(new Date())}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }} rowSpan="2">
                          <strong>2. Buyer/Consignee</strong><br />
                          {editingInvoice.customerName}<br />
                          {editingInvoice.shippingAddress}<br /><br />
                          Tel: {editingInvoice.customerPhone || editingInvoice.customerEmail}
                        </td>
                        <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                          <strong>9. Terms of Payment</strong><br />
                          {editingInvoice.invoiceData?.paymentTerm || 'T/T ADVANCE'}<br />
                          INCOTERMS: {editingInvoice.invoiceData?.incoterms || 'ExWork'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                          <strong>10. Remark</strong><br />
                          &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                          <strong>3. Notify Party</strong><br />
                          SAME AS ABOVE
                        </td>
                        <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                          <strong>11. Other Reference</strong><br />
                          * Customs Code: {editingInvoice.invoiceData?.customsCode || '3304-99-9000'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '10px' }}>
                          <strong>4. Port of Loading</strong><br />
                          {editingInvoice.invoiceData?.portOfLoading || 'KOREA'}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <strong>5. Final Destination</strong><br />
                          {editingInvoice.invoiceData?.finalDestination || editingInvoice.customerCountry || 'USA'}
                        </td>
                        <td style={{ border: '1px solid #333', padding: '10px' }}>
                          {/* 박스 크기 정보 */}
                          41*31*40 1box, {((editingInvoice.total + (editingInvoice.deliveryFee || 0)) / 100).toFixed(1)}kg
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '10px' }}>
                          <strong>6. Vessel</strong><br />
                          {editingInvoice.invoiceData?.vessel || ''}
                        </td>
                        <td style={{ border: '1px solid #333', padding: '10px' }}>
                          <strong>7. Sailing on or about</strong><br />
                          {editingInvoice.invoiceData?.sailingDate || ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="ci-items-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #333', padding: '8px', width: '15%' }}>12. Shipping mark</th>
                        <th style={{ border: '1px solid #333', padding: '8px', width: '35%' }}>13. Description of Goods</th>
                        <th style={{ border: '1px solid #333', padding: '8px', width: '15%' }}>14. Q'ty (ea)</th>
                        <th style={{ border: '1px solid #333', padding: '8px', width: '15%' }}>15. Unit-Price</th>
                        <th style={{ border: '1px solid #333', padding: '8px', width: '20%' }}>16. Amount (USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editingInvoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                          <td style={{ border: '1px solid #333', padding: '8px' }}>{item.nameKr || item.name}</td>
                          <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'center' }}>{item.quantity}</td>
                          <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'right' }}>$ {item.price.toFixed(2)}</td>
                          <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'right' }}>$ {(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                      ))}
                      {/* 빈 행 추가 */}
                      {Array(Math.max(0, 6 - editingInvoice.items.length)).fill(0).map((_, idx) => (
                        <tr key={`empty-${idx}`}>
                          <td style={{ border: '1px solid #333', padding: '8px' }}>&nbsp;</td>
                          <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                          <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                          <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                          <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4" style={{ border: '1px solid #333', padding: '8px' }}>
                          Delivery Fee( hand carry→UPS)
                        </td>
                        <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'right' }}>
                          $ {(editingInvoice.deliveryFee || 0).toLocaleString()}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: 'bold', background: '#f5f5f5' }}>
                        <td colSpan="4" style={{ border: '2px solid #333', padding: '10px', textAlign: 'center' }}>
                          TOTAL
                        </td>
                        <td style={{ border: '2px solid #333', padding: '10px', textAlign: 'right' }}>
                          $ {(editingInvoice.total + (editingInvoice.deliveryFee || 0)).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="signature-area" style={{ marginTop: '50px', textAlign: 'right' }}>
                    <p>Signed by _________________</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
