export const defaultSettings = {
  adminName: '관리자',
  adminEmail: 'admin@youngcosmed.com',
  defaultResponse: '관심 가져주셔서 감사합니다. 정확한 가격 정보는 영업팀에서 개별적으로 안내드리겠습니다.',
  priceInquiryMessage: '정확한 가격은 저희 영업팀에서 직접 연락드려 안내해드리겠습니다.\n연락 받으실 수 있는 방법을 알려주세요!',
  contactMethods: [
    { id: 1, name: 'WhatsApp', enabled: true },
    { id: 2, name: '이메일', enabled: true }
  ],
  defaultLang: 'ko'
}

export const defaultAiPolicy = {
  globalSystemPrompt: `Young Cosmed는 한국 서울에 본사를 둔 정식 등록 B2B 도매 전문 기업입니다.
모든 제품은 글로벌 수출 인증(CE, FDA, CPNP 등)을 보유하고 있습니다.
전문적이고 신뢰할 수 있는 비즈니스 파트너로서 응대하세요.`,
  priceListPolicy: `전체 가격표는 공개하지 않습니다.
제품별 상담 후 개별 견적을 제공하는 것이 원칙입니다.
MOQ 및 거래 조건 확인 후 가격을 안내합니다.
대량 주문 시 별도 할인 협의가 가능합니다.`,
  trustPolicy: `Young Cosmed는 대한민국에 정식 등록된 법인입니다.
안전한 거래 프로세스를 갖추고 있으며, 공식 결제 절차를 통해 진행됩니다.
필요 시 사업자등록증, 수출 인증서 등 회사 정보를 제공할 수 있습니다.
감정적 대응을 피하고 항상 전문적인 톤을 유지합니다.`,
  paymentMethods: [
    { id: 1, name: 'Wire Transfer', enabled: true },
    { id: 2, name: 'T/T (전신환송금)', enabled: true }
  ],
  paymentGuideText: '결제는 T/T(전신환송금) 또는 Wire Transfer를 통해 진행됩니다. 주문 확정 후 인보이스를 발행해 드리며, 입금 확인 후 출고가 진행됩니다.',
  priceDisclosure: { neverDisclose: false, afterMoqConfirm: true, samplePricePolicy: false },
  responseTone: 'professional',
  restrictions: {
    noRetailPrice: true,
    noCompetitorComparison: true,
    noMedicalGuidance: true,
    noLegalLiability: true
  }
}

export const defaultProductForm = {
  productId: '', nameEn: '', nameKr: '', category: 'Skincare',
  description: '', ingredients: '', usage: '', exportReady: true,
  certifications: '', moq: '', markets: '',
  priceResponse: 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
  mediaImages: [], mediaVideo: '', status: 'active'
}
