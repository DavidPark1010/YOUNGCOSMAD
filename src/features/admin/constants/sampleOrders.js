export const initialOrders = [
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
    status: 'paid',
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
      { status: 'paid', date: '2024-01-28T15:00:00Z', message: 'Payment confirmed' }
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
  },
  {
    id: 'ORD-2024-004',
    refNo: 'EY2024-02-09',
    customerEmail: 'lisa@beautyimport.jp',
    customerName: 'Lisa Tanaka',
    customerCompany: 'Tokyo Beauty Import',
    customerPhone: '+81 3-1234-5678',
    customerAddress: '2-3-1 Shibuya, Shibuya-ku, Tokyo 150-0002, Japan',
    customerCountry: 'Japan',
    status: 'paid',
    trackingNumber: null,
    items: [
      { name: 'Hydra Glow Serum', nameKr: '하이드라 글로우 세럼', quantity: 600, price: 4.50 },
      { name: 'Velvet Matte Lip Tint', nameKr: '벨벳 매트 립틴트', quantity: 400, price: 2.90 }
    ],
    total: 3860.00,
    deliveryFee: 290,
    shippingAddress: '2-3-1 Shibuya, Shibuya-ku, Tokyo 150-0002, Japan',
    createdAt: '2024-02-03T10:30:00Z',
    updatedAt: '2024-02-04T09:00:00Z',
    invoiceData: {
      paymentTerm: 'T/T in Advance',
      estimatedDelivery: 'After receipt of payment',
      shipment: 'Forwarder',
      validity: '1 WEEK',
      warranty: '1 YEAR',
      incoterms: 'Exwork',
      customsCode: '3304-99-9000',
      portOfLoading: 'KOREA',
      finalDestination: 'Japan',
      vessel: '',
      sailingDate: ''
    },
    timeline: [
      { status: 'pending', date: '2024-02-03T10:30:00Z', message: 'Order received' },
      { status: 'paid', date: '2024-02-04T09:00:00Z', message: 'Payment confirmed' }
    ]
  },
  {
    id: 'ORD-2024-005',
    refNo: 'EY2024-02-10',
    customerEmail: 'maria@cosmeticoslatam.mx',
    customerName: 'Maria Garcia',
    customerCompany: 'Cosmeticos Latam S.A.',
    customerPhone: '+52 55 9876 5432',
    customerAddress: 'Av. Reforma 222, Col. Juárez, CDMX 06600, Mexico',
    customerCountry: 'Mexico',
    status: 'paid',
    trackingNumber: null,
    items: [
      { name: 'Cica Repair Cream', nameKr: '시카 리페어 크림', quantity: 800, price: 3.80 },
      { name: 'Tone-Up Sun Shield', nameKr: '톤업 선쉴드', quantity: 500, price: 3.20 },
      { name: 'Double Cleansing Oil', nameKr: '더블 클렌징 오일', quantity: 300, price: 4.40 }
    ],
    total: 5960.00,
    deliveryFee: 450,
    shippingAddress: 'Av. Reforma 222, Col. Juárez, CDMX 06600, Mexico',
    createdAt: '2024-02-05T14:00:00Z',
    updatedAt: '2024-02-06T11:30:00Z',
    invoiceData: {
      paymentTerm: 'T/T in Advance',
      estimatedDelivery: 'After receipt of payment',
      shipment: 'Forwarder',
      validity: '1 WEEK',
      warranty: '1 YEAR',
      incoterms: 'Exwork',
      customsCode: '3304-99-9000',
      portOfLoading: 'KOREA',
      finalDestination: 'Mexico',
      vessel: '',
      sailingDate: ''
    },
    timeline: [
      { status: 'pending', date: '2024-02-05T14:00:00Z', message: 'Order received' },
      { status: 'paid', date: '2024-02-06T11:30:00Z', message: 'Payment confirmed' }
    ]
  },
  {
    id: 'ORD-2024-006',
    refNo: 'EY2024-02-11',
    customerEmail: 'chen@beautyhub.sg',
    customerName: 'David Chen',
    customerCompany: 'Beauty Hub Pte Ltd',
    customerPhone: '+65 8123 4567',
    customerAddress: '50 Raffles Place, #12-01, Singapore 048623',
    customerCountry: 'Singapore',
    status: 'paid',
    trackingNumber: null,
    items: [
      { name: 'Peptide Eye Contour', nameKr: '펩타이드 아이 컨투어', quantity: 250, price: 5.20 },
      { name: 'Hydra Glow Serum', nameKr: '하이드라 글로우 세럼', quantity: 350, price: 4.50 }
    ],
    total: 2875.00,
    deliveryFee: 260,
    shippingAddress: '50 Raffles Place, #12-01, Singapore 048623',
    createdAt: '2024-02-07T08:45:00Z',
    updatedAt: '2024-02-07T16:20:00Z',
    invoiceData: {
      paymentTerm: 'T/T in Advance',
      estimatedDelivery: 'After receipt of payment',
      shipment: 'Forwarder',
      validity: '1 WEEK',
      warranty: '1 YEAR',
      incoterms: 'Exwork',
      customsCode: '3304-99-9000',
      portOfLoading: 'KOREA',
      finalDestination: 'Singapore',
      vessel: '',
      sailingDate: ''
    },
    timeline: [
      { status: 'pending', date: '2024-02-07T08:45:00Z', message: 'Order received' },
      { status: 'paid', date: '2024-02-07T16:20:00Z', message: 'Payment confirmed' }
    ]
  }
]
