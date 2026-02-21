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
