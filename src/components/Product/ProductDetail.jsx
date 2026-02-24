import { useState, useEffect } from 'react'
import './ProductDetail.css'

// 모든 제품의 variants 데이터 (제품 등록 시 각각 입력)
const productVariants = {
  en: {
    1: { // Revolax
      variants: [
        { id: 'fine', name: 'Revolax Fine', description: 'For fine lines, eye area, and forehead' },
        { id: 'deep', name: 'Revolax Deep', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 'sub-q', name: 'Revolax Sub-Q', description: 'For chin, nose, volume, and contouring' }
      ]
    },
    2: { // Elasty
      variants: [
        { id: 'f', name: 'Elasty F', description: 'For fine lines, eye area, and forehead' },
        { id: 'deep', name: 'Elasty D (Deep)', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 'plus', name: 'Elasty G / Plus', description: 'For nose, chin, and volume' },
        { id: 'ultra', name: 'Elasty Ultra / Hard', description: 'For contouring, jawline, and volume' }
      ]
    },
    3: { // Rejeunesse
      variants: [
        { id: 'fine', name: 'Rejeunesse Fine', description: 'For fine lines and eye area' },
        { id: 'deep', name: 'Rejeunesse Deep', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 'shape', name: 'Rejeunesse Shape / Volume', description: 'For nose, chin, and contouring' }
      ]
    },
    4: { // Neuramis
      variants: [
        { id: 'light', name: 'Neuramis Light', description: 'For fine lines and eye area' },
        { id: 'deep', name: 'Neuramis Deep', description: 'For nasolabial folds and lips' },
        { id: 'volume', name: 'Neuramis Volume', description: 'For nose, chin, and volume' },
        { id: 'lidocaine', name: 'Neuramis Lidocaine', description: 'Pain reduction option available' }
      ]
    },
    5: { // Regenovue
      variants: [
        { id: 'fine', name: 'Regenovue Fine', description: 'For fine lines and eye area' },
        { id: 'deep', name: 'Regenovue Deep / Deep Plus', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 'sub-q', name: 'Regenovue Sub-Q', description: 'For nose, chin, and contouring' }
      ]
    },
    6: { // Dermalax
      variants: [
        { id: 'fine', name: 'Dermalax Fine', description: 'For fine lines and eye area' },
        { id: 'deep', name: 'Dermalax Deep / Deep Plus', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 'implant', name: 'Dermalax Implant', description: 'For nose, chin, contouring, and volume' }
      ]
    },
    7: { // E.P.T.Q
      variants: [
        { id: 's100', name: 'e.p.t.q S100', description: 'For fine lines and eye area' },
        { id: 's300', name: 'e.p.t.q S300', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 's500', name: 'e.p.t.q S500', description: 'For nose, chin, contouring, and volume' }
      ]
    },
    8: { // Sosum
      variants: [
        { id: 'fine', name: 'Sosum Fine', description: 'For fine lines, eye area, and forehead' },
        { id: 'deep', name: 'Sosum Deep', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 'hard', name: 'Sosum Hard / Volume', description: 'For nose, chin, contouring, and volume' }
      ]
    },
    9: { // Starfill
      variants: [
        { id: 'fine', name: 'Starfill Fine', description: 'For fine lines, eye area, and forehead' },
        { id: 'deep', name: 'Starfill Deep', description: 'For nasolabial folds, lips, and volume' },
        { id: 'implant', name: 'Starfill Implant / Plus', description: 'For nose, chin, contouring, and volume' }
      ]
    },
    10: { // STUNMEDICAL - Line Fill
      variants: [
        { id: 'fine', name: 'Line Fill Fine', description: 'For fine lines, eye area, and forehead' },
        { id: 'deep', name: 'Line Fill Deep', description: 'For nasolabial folds, lips, and cheeks' },
        { id: 'sub-q', name: 'Line Fill Sub-Q', description: 'For nose, chin, contouring, and volume' }
      ]
    },
    11: { // Priere - Lip Fillers
      variants: [
        { id: 'tulip', name: 'PRIÈRE (Tulip)', description: 'For lip enhancement, 1.0mL, Lidocaine included' },
        { id: 'lipvol', name: 'LIP VOL Red', description: 'For lip volume & line, 1.2mL, HA + PDRN + Mannitol' }
      ]
    },
    12: { // Lip Star
      variants: [
        { id: 'lipstar', name: 'Lip Star', description: '1.2mL, Red gel with Anthocyanin for lip volume & contour' }
      ]
    }
  },
  ko: {
    1: { // Revolax
      variants: [
        { id: 'fine', name: 'Revolax Fine', description: '잔주름, 눈가, 이마용' },
        { id: 'deep', name: 'Revolax Deep', description: '팔자주름, 입술, 볼용' },
        { id: 'sub-q', name: 'Revolax Sub-Q', description: '턱, 코, 볼륨, 윤곽용' }
      ]
    },
    2: { // Elasty
      variants: [
        { id: 'f', name: 'Elasty F', description: '잔주름, 눈가, 이마용' },
        { id: 'deep', name: 'Elasty D (Deep)', description: '팔자주름, 입술, 볼용' },
        { id: 'plus', name: 'Elasty G / Plus', description: '코, 턱, 볼륨용' },
        { id: 'ultra', name: 'Elasty Ultra / Hard', description: '윤곽, 턱선, 볼륨용' }
      ]
    },
    3: { // Rejeunesse
      variants: [
        { id: 'fine', name: 'Rejeunesse Fine', description: '잔주름, 눈가용' },
        { id: 'deep', name: 'Rejeunesse Deep', description: '팔자주름, 입술, 볼용' },
        { id: 'shape', name: 'Rejeunesse Shape / Volume', description: '코, 턱, 윤곽용' }
      ]
    },
    4: { // Neuramis
      variants: [
        { id: 'light', name: 'Neuramis Light', description: '잔주름, 눈가용' },
        { id: 'deep', name: 'Neuramis Deep', description: '팔자주름, 입술용' },
        { id: 'volume', name: 'Neuramis Volume', description: '코, 턱, 볼륨용' },
        { id: 'lidocaine', name: 'Neuramis Lidocaine', description: '통증 감소 옵션' }
      ]
    },
    5: { // Regenovue
      variants: [
        { id: 'fine', name: 'Regenovue Fine', description: '잔주름, 눈가용' },
        { id: 'deep', name: 'Regenovue Deep / Deep Plus', description: '팔자주름, 입술, 볼용' },
        { id: 'sub-q', name: 'Regenovue Sub-Q', description: '코, 턱, 윤곽용' }
      ]
    },
    6: { // Dermalax
      variants: [
        { id: 'fine', name: 'Dermalax Fine', description: '잔주름, 눈가용' },
        { id: 'deep', name: 'Dermalax Deep / Deep Plus', description: '팔자주름, 입술, 볼용' },
        { id: 'implant', name: 'Dermalax Implant', description: '코, 턱, 윤곽, 볼륨용' }
      ]
    },
    7: { // E.P.T.Q
      variants: [
        { id: 's100', name: 'e.p.t.q S100', description: '잔주름, 눈가용' },
        { id: 's300', name: 'e.p.t.q S300', description: '팔자주름, 입술, 볼용' },
        { id: 's500', name: 'e.p.t.q S500', description: '코, 턱, 윤곽, 볼륨용' }
      ]
    },
    8: { // Sosum
      variants: [
        { id: 'fine', name: 'Sosum Fine', description: '잔주름, 눈가, 이마용' },
        { id: 'deep', name: 'Sosum Deep', description: '팔자주름, 입술, 볼용' },
        { id: 'hard', name: 'Sosum Hard / Volume', description: '코, 턱, 윤곽, 볼륨용' }
      ]
    },
    9: { // Starfill
      variants: [
        { id: 'fine', name: 'Starfill Fine', description: '잔주름, 눈가, 이마용' },
        { id: 'deep', name: 'Starfill Deep', description: '팔자주름, 입술, 볼륨용' },
        { id: 'implant', name: 'Starfill Implant / Plus', description: '코, 턱, 윤곽, 볼륨용' }
      ]
    },
    10: { // STUNMEDICAL - Line Fill
      variants: [
        { id: 'fine', name: 'Line Fill Fine', description: '잔주름, 눈가, 이마용' },
        { id: 'deep', name: 'Line Fill Deep', description: '팔자주름, 입술, 볼용' },
        { id: 'sub-q', name: 'Line Fill Sub-Q', description: '코, 턱, 윤곽, 볼륨용' }
      ]
    },
    11: { // Priere - Lip Fillers
      variants: [
        { id: 'tulip', name: 'PRIÈRE (Tulip)', description: '입술 개선용, 1.0mL, 리도카인 포함' },
        { id: 'lipvol', name: 'LIP VOL Red', description: '입술 볼륨 및 라인, 1.2mL, HA + PDRN + Mannitol' }
      ]
    },
    12: { // Lip Star
      variants: [
        { id: 'lipstar', name: 'Lip Star', description: '1.2mL, Anthocyanin 함유 레드 젤, 입술 볼륨 및 윤곽용' }
      ]
    }
  }
}

// UI 텍스트 (variant 선택용)
const variantSelectText = {
  en: {
    selectTitle: 'Select Product Variants',
    selectSubtitle: 'Choose one or more products for your inquiry',
    selectedBadge: (count) => `${count} selected`,
    ctaButton: 'Discuss Wholesale Terms',
    ctaHint: 'Ask about pricing, MOQ, certifications and global shipping.'
  },
  ko: {
    selectTitle: '제품 라인업 선택',
    selectSubtitle: '문의하실 제품을 선택해주세요',
    selectedBadge: (count) => `${count}개 선택`,
    ctaButton: '도매 조건 상담',
    ctaHint: '가격, MOQ, 인증, 글로벌 배송에 대해 문의하세요.'
  }
}

// 고객 후기 섹션 텍스트
const reviewSectionText = {
  en: {
    title: 'Customer Reviews',
    subtitle: 'Real feedback from our valued partners',
    noReviews: 'No reviews yet. Be the first to share your experience!',
    writeReview: 'Write a Review',
    photoGallery: 'Customer Photos',
    // Modal texts
    modalTitle: 'Write a Review',
    ratingLabel: 'Your Rating',
    photoLabel: 'Add Photos',
    photoHint: 'Drag & drop or click to upload',
    contentLabel: 'Your Review',
    contentPlaceholder: 'Share your experience with this product...',
    submitBtn: 'Submit Review',
    cancelBtn: 'Cancel',
    ratingRequired: 'Please select a rating'
  },
  ko: {
    title: '고객 후기',
    subtitle: '실제 파트너사의 생생한 후기',
    noReviews: '아직 후기가 없습니다. 첫 번째 후기를 작성해주세요!',
    writeReview: '후기 작성',
    photoGallery: '고객 사진',
    // Modal texts
    modalTitle: '후기 작성',
    ratingLabel: '별점',
    photoLabel: '사진 추가',
    photoHint: '드래그하거나 클릭하여 업로드',
    contentLabel: '후기 내용',
    contentPlaceholder: '제품 사용 경험을 공유해주세요...',
    submitBtn: '후기 등록',
    cancelBtn: '취소',
    ratingRequired: '별점을 선택해주세요'
  }
}

// 샘플 리뷰 데이터 (제품별) - 간소화: 별점, 날짜, 내용, 사진만
const sampleReviews = {
  1: { // Revolax
    en: [
      {
        id: 1,
        date: '2024-12-15',
        rating: 5,
        content: 'Exceptional quality filler with outstanding consistency. My patients love the natural results and minimal downtime. The Revolax Deep variant works perfectly for nasolabial folds.',
        photos: ['/revolax review.jpg']
      }
    ],
    ko: [
      {
        id: 1,
        date: '2024-12-15',
        rating: 5,
        content: '일관성이 뛰어난 최고 품질의 필러입니다. 환자분들이 자연스러운 결과와 최소한의 다운타임을 매우 만족해하십니다. Revolax Deep은 팔자주름에 완벽하게 작용합니다.',
        photos: ['/revolax review.jpg']
      }
    ]
  },
  2: { // Elasty
    en: [
      {
        id: 1,
        date: '2025-01-10',
        rating: 5,
        content: 'The HIVE-structure technology really makes a difference. Elasty D provides excellent moldability and the results last longer than other fillers I have used. High elasticity with natural feel.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-01-10',
        rating: 5,
        content: 'HIVE-structure 기술이 정말 차이를 만듭니다. Elasty D는 뛰어난 성형성을 제공하며 다른 필러보다 결과가 오래 지속됩니다. 자연스러운 느낌의 고탄력 필러입니다.',
        photos: []
      }
    ]
  },
  3: { // Rejeunesse
    en: [
      {
        id: 1,
        date: '2025-01-20',
        rating: 5,
        content: 'Best value for quality in the market. The UPHEC purification technology ensures minimal impurities. My clinic has been reordering consistently for over 2 years. Patients are very satisfied with the results.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-01-20',
        rating: 5,
        content: '시장에서 가성비가 가장 뛰어난 제품입니다. UPHEC 정제 기술로 불순물이 최소화되어 있습니다. 저희 클리닉에서 2년 넘게 꾸준히 재주문하고 있으며, 환자분들의 만족도가 매우 높습니다.',
        photos: []
      }
    ]
  },
  4: { // Neuramis
    en: [
      {
        id: 1,
        date: '2025-02-05',
        rating: 5,
        content: 'The Medytox brand gives us confidence in quality control. SHAPE Technology delivers consistent results. Neuramis Volume works excellently for chin augmentation. The Lidocaine option is a great plus for patient comfort.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-02-05',
        rating: 5,
        content: 'Medytox 브랜드라 품질 관리에 대한 신뢰가 있습니다. SHAPE 기술로 일관된 결과를 얻을 수 있습니다. Neuramis Volume은 턱 확대에 탁월하며, 리도카인 옵션은 환자 편안함에 큰 장점입니다.',
        photos: []
      }
    ]
  },
  5: { // Regenovue
    en: [
      {
        id: 1,
        date: '2025-01-28',
        rating: 5,
        content: 'Great quality at a competitive price point. We have been importing Regenovue for our clinics in Dubai and the feedback has been consistently positive. The high-purity process really shows in the results.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-01-28',
        rating: 5,
        content: '합리적인 가격에 훌륭한 품질입니다. 두바이 클리닉들을 위해 Regenovue를 수입하고 있으며 피드백이 꾸준히 긍정적입니다. 고순도 정제 공정이 결과에서 확실히 드러납니다.',
        photos: []
      }
    ]
  },
  6: { // Dermalax
    en: [
      {
        id: 1,
        date: '2025-02-10',
        rating: 5,
        content: 'We distribute Dermalax across CIS countries and the demand keeps growing. Dermalax Implant is particularly popular for nose and chin procedures. Reliable quality with every shipment.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-02-10',
        rating: 5,
        content: 'CIS 국가들에 Dermalax를 유통하고 있으며 수요가 계속 증가하고 있습니다. Dermalax Implant는 코와 턱 시술에 특히 인기가 높습니다. 매 배송마다 신뢰할 수 있는 품질입니다.',
        photos: []
      }
    ]
  },
  7: { // E.P.T.Q
    en: [
      {
        id: 1,
        date: '2025-02-15',
        rating: 5,
        content: 'The High Purification Technology really delivers on its promise. e.p.t.q S300 gives excellent results for lip augmentation. Premium quality at a reasonable price point - true to its name "Exquisite Purity".',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-02-15',
        rating: 5,
        content: 'High Purification Technology가 약속대로 정말 잘 구현되어 있습니다. e.p.t.q S300은 입술 확대에 뛰어난 결과를 제공합니다. 합리적인 가격에 프리미엄 품질 - "Exquisite Purity"라는 이름에 걸맞습니다.',
        photos: []
      }
    ]
  },
  8: { // Sosum
    en: [
      {
        id: 1,
        date: '2025-01-25',
        rating: 5,
        content: 'Perfect for our African market distribution. Sosum offers the best value proposition - stable quality at competitive pricing. The uniform gel structure makes injection smooth and predictable.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-01-25',
        rating: 5,
        content: '아프리카 시장 유통에 완벽한 제품입니다. Sosum은 최고의 가성비를 제공합니다 - 경쟁력 있는 가격에 안정적인 품질. 균일한 겔 구조로 주입이 부드럽고 예측 가능합니다.',
        photos: []
      }
    ]
  },
  9: { // Starfill
    en: [
      {
        id: 1,
        date: '2025-02-01',
        rating: 5,
        content: 'We have been sourcing Starfill for our Southeast Asian distribution network. The consistent quality batch after batch is impressive. Starfill Deep works great for lip enhancement procedures.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-02-01',
        rating: 5,
        content: '동남아시아 유통 네트워크를 위해 Starfill을 공급받고 있습니다. 배치마다 일관된 품질이 인상적입니다. Starfill Deep은 입술 개선 시술에 매우 효과적입니다.',
        photos: []
      }
    ]
  },
  10: { // STUNMEDICAL - Line Fill
    en: [
      {
        id: 1,
        date: '2025-02-08',
        rating: 5,
        content: 'STUNMEDICAL Line Fill series offers great versatility. Line Fill Fine is perfect for delicate eye area work, while Line Fill Sub-Q provides excellent projection for nose procedures. Good value for the quality.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-02-08',
        rating: 5,
        content: 'STUNMEDICAL Line Fill 시리즈는 뛰어난 다용도성을 제공합니다. Line Fill Fine은 섬세한 눈가 작업에 완벽하고, Line Fill Sub-Q는 코 시술에 우수한 볼륨감을 제공합니다. 품질 대비 좋은 가성비입니다.',
        photos: []
      }
    ]
  },
  11: { // PRIÈRE - Lip Fillers
    en: [
      {
        id: 1,
        date: '2025-02-12',
        rating: 5,
        content: 'LIP VOL Red is a game-changer for lip procedures. The PDRN and Mannitol combination noticeably reduces swelling and improves healing. Patients love the natural feel and the results last beautifully.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-02-12',
        rating: 5,
        content: 'LIP VOL Red는 입술 시술의 판도를 바꾸는 제품입니다. PDRN과 Mannitol 조합이 부기를 눈에 띄게 줄이고 회복을 개선합니다. 환자분들이 자연스러운 느낌을 좋아하고 결과도 아름답게 유지됩니다.',
        photos: []
      }
    ]
  },
  12: { // Lip Star
    en: [
      {
        id: 1,
        date: '2025-02-18',
        rating: 5,
        content: 'The unique red gel concept is a great marketing point. Patients are intrigued by the Anthocyanin feature and the hydration effect is noticeable. Perfect for clients wanting a subtle tint along with volume.',
        photos: []
      }
    ],
    ko: [
      {
        id: 1,
        date: '2025-02-18',
        rating: 5,
        content: '독특한 레드 젤 컨셉이 훌륭한 마케팅 포인트입니다. 환자분들이 Anthocyanin 성분에 관심을 가지며 수분 효과가 눈에 띕니다. 볼륨과 함께 은은한 틴트를 원하는 고객에게 완벽합니다.',
        photos: []
      }
    ]
  }
}

// Close Icon Component
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// Plus Icon Component
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const productDetails = {
  en: {
    1: {
      name: 'Revolax',
      category: 'FILLERS',
      tagline: 'Premium Hyaluronic Acid Dermal Filler',
      description: 'Industry-leading Korean HA filler trusted by medical professionals worldwide for its exceptional quality and consistent results.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    2: {
      name: 'Elasty',
      category: 'FILLERS',
      tagline: 'HIVE-Structure Technology for High Elasticity',
      description: 'Korean cross-linked Hyaluronic Acid (HA) filler with high elasticity and stability. Popular in Middle East, Russia, and Southeast Asian markets with high reorder rates. Features BDDE cross-linking, Lidocaine inclusion, and proprietary HIVE-structure technology for superior high elasticity performance.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    3: {
      name: 'Rejeunesse',
      category: 'FILLERS',
      tagline: 'UPHEC Technology for Ultra-Pure Quality',
      description: 'Korean cross-linked Hyaluronic Acid (HA) filler with stable quality and competitive pricing, achieving very high reorder rates in export markets. Features BDDE cross-linking, Lidocaine option, and proprietary UPHEC Technology (Ultra-fine purification process) that minimizes residual BDDE and impurities.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    4: {
      name: 'Neuramis',
      category: 'FILLERS',
      tagline: 'SHAPE Technology by Medytox',
      description: 'Cross-linked Hyaluronic Acid (HA) filler manufactured by Medytox, a trusted pharmaceutical company brand. Features BDDE cross-linking, Lidocaine options, and proprietary SHAPE Technology (Stabilized Hyaluronic Acid & Purification Enhancement) with high-purity purification process that minimizes residual BDDE.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    5: {
      name: 'Regenovue',
      category: 'FILLERS',
      tagline: 'High-Purity HA Filler',
      description: 'Korean cross-linked Hyaluronic Acid (HA) filler with stable quality and competitive pricing, consistently popular in Southeast Asian and Middle Eastern markets. Features BDDE cross-linking, Lidocaine option, and high-purity purification process for reliable results.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    6: {
      name: 'Dermalax',
      category: 'FILLERS',
      tagline: 'Reliable Quality for Global Markets',
      description: 'Korean cross-linked Hyaluronic Acid (HA) filler with stable quality and competitive pricing, consistently exported to Middle East, Southeast Asia, and CIS markets. Features BDDE cross-linking, Lidocaine inclusion, and high-purity purification process.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    7: {
      name: 'e.p.t.q',
      category: 'FILLERS',
      tagline: 'Exquisite Purity & Technology Quality',
      description: 'Korean cross-linked Hyaluronic Acid (HA) filler, a stability-focused premium value product based on high-purity and high-quality processes. Features BDDE cross-linking, Lidocaine option, and High Purification Technology that minimizes residual BDDE and impurities. The name e.p.t.q stands for "Exquisite Purity & Technology Quality".',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    8: {
      name: 'Sosum',
      category: 'FILLERS',
      tagline: 'Value-Driven Quality for Emerging Markets',
      description: 'Korean cross-linked Hyaluronic Acid (HA) filler, a value product used in Middle East, Southeast Asia, and Africa markets based on reasonable pricing and stable quality. Features BDDE cross-linking, Lidocaine inclusion, uniform gel structure, and high-purity purification process.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    9: {
      name: 'Starfill',
      category: 'FILLERS',
      tagline: 'Consistent Quality for Price-Focused Markets',
      description: 'Korean cross-linked Hyaluronic Acid (HA) filler with stable quality and competitive pricing, consistently selling in price-focused markets such as Middle East, Southeast Asia, and Africa. Features BDDE cross-linking, Lidocaine inclusion, uniform gel structure, and high-purity purification process.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    10: {
      name: 'STUNMEDICAL',
      category: 'FILLERS',
      tagline: 'Line Fill Series - Premium HA Filler',
      description: 'Cross-linked Hyaluronic Acid (HA) filler by STUNMEDICAL. The Line Fill series features BDDE cross-linking, Lidocaine inclusion, and 1.0mL volume per syringe. CE certified for reliable quality and performance.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    11: {
      name: 'PRIÈRE',
      category: 'LIP FILLERS',
      tagline: 'Specialized Lip Enhancement Solutions',
      description: 'Premium lip-specific filler series featuring PRIÈRE (Tulip) with Cross-linked HA and Lidocaine, and LIP VOL Red with HA + PDRN + Mannitol. Designed for lip volume, shape, and contouring with natural feel and movement. PDRN for tissue regeneration, Mannitol for antioxidant effect and reduced post-procedure swelling.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    12: {
      name: 'Lip Star',
      category: 'LIP FILLERS',
      tagline: 'Red Gel with Anthocyanin for Lips',
      description: 'Cross-linked Hyaluronic Acid lip filler featuring unique red-colored gel with Anthocyanin (natural pigment with antioxidant properties). 1.2mL volume designed specifically for lip volume, contouring, hydration, and natural tint effect. The distinctive red gel emphasizes its lip-specific formulation.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    }
  },
  ko: {
    1: {
      name: 'Revolax',
      category: '필러',
      tagline: '프리미엄 히알루론산 더말 필러',
      description: '전 세계 의료 전문가들이 신뢰하는 한국산 프리미엄 HA 필러. 탁월한 품질과 일관된 결과를 제공합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    2: {
      name: 'Elasty',
      category: '필러',
      tagline: 'HIVE-Structure 기술의 고탄력 필러',
      description: '한국산 가교 히알루론산(HA) 필러로, 높은 탄성과 안정성으로 중동·러시아·동남아 시장에서 재주문율이 높은 제품입니다. BDDE 가교, 리도카인 함유, 독자적인 HIVE-structure 기술로 뛰어난 고탄력 성능을 제공합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    3: {
      name: 'Rejeunesse',
      category: '필러',
      tagline: 'UPHEC 기술의 초고순도 필러',
      description: '한국산 가교 히알루론산(HA) 필러로, 안정적인 품질과 합리적인 가격으로 해외 수출 시장에서 재주문율이 매우 높은 제품입니다. BDDE 가교, 리도카인 포함 옵션, 독자적인 UPHEC Technology(초미세 정제 공정)로 잔류 BDDE 및 불순물을 최소화합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    4: {
      name: 'Neuramis',
      category: '필러',
      tagline: 'Medytox의 SHAPE 기술',
      description: 'Medytox에서 제조하는 가교 히알루론산(HA) 필러로, 제약회사 브랜드 신뢰도가 강점인 제품입니다. BDDE 가교, 리도카인 포함 제품 선택 가능, 독자적인 SHAPE Technology(Stabilized Hyaluronic Acid & Purification Enhancement)의 고순도 정제 공정으로 잔류 BDDE를 최소화합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    5: {
      name: 'Regenovue',
      category: '필러',
      tagline: '고순도 HA 필러',
      description: '한국산 가교 히알루론산(HA) 필러로, 안정적인 품질과 합리적인 가격으로 동남아·중동 시장에서 꾸준히 판매되는 제품입니다. BDDE 가교, 리도카인 포함 옵션, 고순도 정제 공정을 적용하여 신뢰할 수 있는 결과를 제공합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    6: {
      name: 'Dermalax',
      category: '필러',
      tagline: '글로벌 시장을 위한 신뢰할 수 있는 품질',
      description: '한국산 가교 히알루론산(HA) 필러로, 안정적인 품질과 합리적인 가격으로 중동·동남아·CIS 시장에서 꾸준히 수출되는 제품입니다. BDDE 가교, 리도카인 포함, 고순도 정제 공정을 적용합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    7: {
      name: 'e.p.t.q',
      category: '필러',
      tagline: 'Exquisite Purity & Technology Quality',
      description: '한국산 가교 히알루론산(HA) 필러로, 고순도·고품질 공정을 기반으로 한 안정성 중심의 프리미엄 가성비 제품입니다. BDDE 가교, 리도카인 포함 옵션, High Purification Technology로 잔류 BDDE 및 불순물을 최소화합니다. e.p.t.q는 "Exquisite Purity & Technology Quality"의 약자입니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    8: {
      name: 'Sosum',
      category: '필러',
      tagline: '신흥 시장을 위한 가성비 품질',
      description: '한국산 가교 히알루론산(HA) 필러로, 합리적인 가격과 안정적인 품질을 기반으로 중동·동남아·아프리카 시장에서 사용되는 가성비 제품입니다. BDDE 가교, 리도카인 포함, 균일한 겔 구조와 고순도 정제 공정을 적용합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    9: {
      name: 'Starfill',
      category: '필러',
      tagline: '가격 중심 시장을 위한 일관된 품질',
      description: '한국산 가교 히알루론산(HA) 필러로, 안정적인 품질과 합리적인 가격을 기반으로 중동·동남아·아프리카 등 가격 중심 시장에서 꾸준히 판매되는 제품입니다. BDDE 가교, 리도카인 포함, 균일한 겔 구조 및 고순도 정제 공정을 적용합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    10: {
      name: 'STUNMEDICAL',
      category: '필러',
      tagline: 'Line Fill 시리즈 - 프리미엄 HA 필러',
      description: 'STUNMEDICAL의 가교 히알루론산(HA) 필러입니다. Line Fill 시리즈는 BDDE 가교, 리도카인 포함, 시린지당 1.0mL 용량을 제공합니다. 신뢰할 수 있는 품질과 성능을 위한 CE 인증 제품입니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    11: {
      name: 'PRIÈRE',
      category: '립 필러',
      tagline: '입술 전문 개선 솔루션',
      description: '프리미엄 입술 전용 필러 시리즈입니다. PRIÈRE (Tulip)은 가교 HA와 리도카인을, LIP VOL Red는 HA + PDRN + Mannitol을 함유합니다. 입술 볼륨, 쉐입, 윤곽 개선을 위해 설계되었으며 자연스러운 촉감과 움직임을 제공합니다. PDRN은 조직 재생 효과를, Mannitol은 항산화 효과와 시술 후 부기 감소를 제공합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    12: {
      name: 'Lip Star',
      category: '립 필러',
      tagline: 'Anthocyanin 함유 레드 젤 립 필러',
      description: 'Anthocyanin(항산화 성분의 천연 색소)을 함유한 독특한 레드 컬러 젤의 가교 히알루론산 립 필러입니다. 1.2mL 용량으로 입술 볼륨, 윤곽, 수분 공급, 자연스러운 틴트 효과를 위해 특별히 설계되었습니다. 독특한 레드 젤이 입술 전용 포뮬러임을 강조합니다.',
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    }
  }
}

const uiText = {
  en: {
    back: 'Back to Products',
    licenseNote: 'Medical license required',
    ctaButton: 'Discuss Wholesale Terms',
    ctaHint: 'Ask about pricing, MOQ, certifications and global shipping.'
  },
  ko: {
    back: '제품 목록으로',
    licenseNote: '의료 면허 필요',
    ctaButton: '도매 조건 상담',
    ctaHint: '가격, MOQ, 인증, 글로벌 배송에 대해 문의하세요.'
  }
}

// 제품 ID별 이미지 경로 매핑
const productImages = {
  1: '/revolax2.png',
  2: '/ELASTY1.png',
  3: '/REJEUNESSE2.png',
  4: '/NEURAMIS.png',
  5: '/REGENOVUE.png',
  6: '/DERMALAX.png',
  7: '/E.P.T.Q.png',
  8: '/SOSUM.png',
  9: '/STARFILL.png',
  10: '/LINE FILL.png',
  11: '/PRIERE.png',
  12: '/LIP STAR.png'
}

// Star Icon Component (for reviews)
const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

// Camera Icon Component
const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

// Edit Icon Component
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

// Check Icon Component
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function ProductDetail({ productId, lang, onClose, onNavigateToProducts, onInquiry }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewContent, setReviewContent] = useState('')
  const [reviewPhotos, setReviewPhotos] = useState([])

  const product = productDetails[lang][productId]
  const productEn = productDetails['en'][productId]
  const text = uiText[lang]
  const imageUrl = productImages[productId] || `/product${productId}.png`

  // 모든 제품에 대한 variant 데이터
  const variantData = productVariants[lang][productId]
  const variantDataEn = productVariants['en'][productId]
  const selectText = variantSelectText[lang]
  const reviewText = reviewSectionText[lang]

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleVariantToggle = (variantId) => {
    setSelectedVariants(prev =>
      prev.includes(variantId)
        ? prev.filter(id => id !== variantId)
        : [...prev, variantId]
    )
  }

  const handleInquiry = () => {
    if (onInquiry) {
      let initialMessage = ''

      if (selectedVariants.length > 0 && variantDataEn) {
        const selectedNames = variantDataEn.variants
          .filter(v => selectedVariants.includes(v.id))
          .map(v => v.name)
          .join(', ')
        initialMessage = `I'm interested in ${selectedNames}. Could you share wholesale terms and availability?`
      } else {
        initialMessage = `I'm interested in ${productEn.name}. Could you share wholesale terms and availability?`
      }

      onInquiry(productId, {
        name: product.name,
        nameEn: productEn.name,
        category: product.category,
        tagline: product.tagline,
        moq: product.moq,
        certTags: product.certTags,
        image: imageUrl,
        initialMessage: initialMessage,
        selectedVariants: selectedVariants.length > 0 ? selectedVariants : null
      })
    }
  }

  const handleBack = () => {
    if (window.history.state?.productId) {
      window.history.back()
    } else {
      onClose()
    }
  }

  // Review Modal Functions
  const openReviewModal = () => {
    setShowReviewModal(true)
    setReviewRating(0)
    setReviewContent('')
    setReviewPhotos([])
  }

  const closeReviewModal = () => {
    setShowReviewModal(false)
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPhotos = files.map(file => URL.createObjectURL(file))
    setReviewPhotos(prev => [...prev, ...newPhotos].slice(0, 5)) // Max 5 photos
  }

  const removePhoto = (index) => {
    setReviewPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmitReview = () => {
    if (reviewRating === 0) {
      alert(reviewText.ratingRequired)
      return
    }
    // Here you would submit the review to your backend
    console.log({ rating: reviewRating, content: reviewContent, photos: reviewPhotos })
    closeReviewModal()
  }

  return (
    <div className={`product-detail-overlay ${isLoaded ? 'loaded' : ''}`}>
      <div className="product-detail-container">
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>{text.back}</span>
        </button>

        {/* ===== HEADER: Category + Brand ===== */}
        <header className="product-header">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>
        </header>

        {/* ===== HERO SECTION ===== */}
        <section className="hero-section">
          <div className="hero-image-wrapper">
            <div className="hero-image">
              <img src={imageUrl} alt={product.name} />
            </div>
          </div>

          <div className="hero-content">
            {/* ===== 모든 제품: VARIANTS + CTA ===== */}
            <div className="product-selector">
              <div className="selector-header">
                <h2>{selectText.selectTitle}</h2>
                <p>{selectText.selectSubtitle}</p>
              </div>

              <div className="variants-list">
                {variantData.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`variant-item ${selectedVariants.includes(variant.id) ? 'selected' : ''}`}
                    onClick={() => handleVariantToggle(variant.id)}
                  >
                    <div className={`variant-checkbox ${selectedVariants.includes(variant.id) ? 'checked' : ''}`}>
                      {selectedVariants.includes(variant.id) && <CheckIcon />}
                    </div>
                    <div className="variant-info">
                      <span className="variant-name">{variant.name}</span>
                      <span className="variant-desc">{variant.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="selector-cta">
                {selectedVariants.length > 0 && (
                  <span className="selected-count">{selectText.selectedBadge(selectedVariants.length)}</span>
                )}
                <button
                  className={`cta-button ${selectedVariants.length === 0 ? 'disabled' : ''}`}
                  onClick={handleInquiry}
                  disabled={selectedVariants.length === 0}
                >
                  <span>{selectText.ctaButton}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <p className="cta-hint">{selectText.ctaHint}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DETAILS SECTION (Below Hero) ===== */}
        <section className="details-section">
          <div className="details-content">
            {/* Certification Badges */}
            <div className="cert-badges">
              {product.certTags.map((tag, idx) => (
                <span key={idx} className="cert-badge">{tag}</span>
              ))}
              {product.licenseRequired && (
                <span className="license-badge">{text.licenseNote}</span>
              )}
            </div>

            {/* Brand Description */}
            <div className="product-description-block">
              <p>{product.description}</p>
            </div>
          </div>
        </section>

        {/* ===== CUSTOMER REVIEWS SECTION ===== */}
        <section className="reviews-section">
          <div className="reviews-content">
            <div className="reviews-header">
              <span className="reviews-label">REVIEWS</span>
              <h2>{reviewText.title}</h2>
              <p>{reviewText.subtitle}</p>
            </div>

            {/* Write Review Button */}
            <div className="review-actions">
              <button className="review-action-btn primary" onClick={openReviewModal}>
                <EditIcon />
                <span>{reviewText.writeReview}</span>
              </button>
            </div>

            {/* Photo Gallery Section */}
            {sampleReviews[productId] && sampleReviews[productId][lang] && (
              <div className="review-photo-gallery">
                <h3 className="gallery-title">{reviewText.photoGallery}</h3>
                <div className="gallery-grid">
                  {sampleReviews[productId][lang].flatMap(review =>
                    review.photos.map((photo, idx) => (
                      <div key={`photo-${review.id}-${idx}`} className="gallery-item">
                        <img src={photo} alt="Customer review" />
                        <div className="gallery-overlay">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Reviews List - Simplified: rating, date, content, photos only */}
            <div className="reviews-list">
              {sampleReviews[productId] && sampleReviews[productId][lang] ? (
                sampleReviews[productId][lang].map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-card-main">
                      {/* Review Photo (Large) */}
                      {review.photos && review.photos.length > 0 && (
                        <div className="review-photo-large">
                          <img src={review.photos[0]} alt="Review" />
                        </div>
                      )}

                      {/* Review Content - Simplified */}
                      <div className="review-card-content">
                        <div className="review-rating-row">
                          <div className="review-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <StarIcon key={star} filled={star <= review.rating} />
                            ))}
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>

                        <p className="review-text">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <div className="no-reviews-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <line x1="9" y1="9" x2="15" y2="9" />
                      <line x1="9" y1="13" x2="12" y2="13" />
                    </svg>
                  </div>
                  <p>{reviewText.noReviews}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== REVIEW MODAL ===== */}
        {showReviewModal && (
          <div className="review-modal-overlay" onClick={closeReviewModal}>
            <div className="review-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeReviewModal}>
                <CloseIcon />
              </button>

              <h2 className="modal-title">{reviewText.modalTitle}</h2>

              {/* Star Rating */}
              <div className="modal-section">
                <label className="modal-label">{reviewText.ratingLabel}</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className={`rating-star ${star <= reviewRating ? 'active' : ''}`}
                      onClick={() => setReviewRating(star)}
                    >
                      <StarIcon filled={star <= reviewRating} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload */}
              <div className="modal-section">
                <label className="modal-label">{reviewText.photoLabel}</label>
                <div className="photo-upload-area">
                  {reviewPhotos.map((photo, idx) => (
                    <div key={idx} className="uploaded-photo">
                      <img src={photo} alt={`Upload ${idx + 1}`} />
                      <button className="remove-photo-btn" onClick={() => removePhoto(idx)}>
                        <CloseIcon />
                      </button>
                    </div>
                  ))}
                  {reviewPhotos.length < 5 && (
                    <label className="photo-upload-btn">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        hidden
                      />
                      <PlusIcon />
                      <span>{reviewText.photoHint}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Review Content */}
              <div className="modal-section">
                <label className="modal-label">{reviewText.contentLabel}</label>
                <textarea
                  className="review-textarea"
                  placeholder={reviewText.contentPlaceholder}
                  value={reviewContent}
                  onChange={e => setReviewContent(e.target.value)}
                  rows={5}
                />
              </div>

              {/* Submit Buttons */}
              <div className="modal-actions">
                <button className="modal-btn cancel" onClick={closeReviewModal}>
                  {reviewText.cancelBtn}
                </button>
                <button className="modal-btn submit" onClick={handleSubmitReview}>
                  {reviewText.submitBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
