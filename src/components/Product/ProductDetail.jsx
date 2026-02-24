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
        { id: 'fine', name: 'Elasty Fine', description: 'For delicate areas and fine lines' },
        { id: 'deep', name: 'Elasty Deep', description: 'For moderate wrinkles and volume' },
        { id: 'extra', name: 'Elasty Extra', description: 'For deep folds and facial contouring' }
      ]
    },
    3: { // Rejeunesse
      variants: [
        { id: 'fine', name: 'Rejeunesse Fine', description: 'For superficial lines and delicate areas' },
        { id: 'deep', name: 'Rejeunesse Deep', description: 'For moderate to deep wrinkles' },
        { id: 'shape', name: 'Rejeunesse Shape', description: 'For volumizing and facial contouring' }
      ]
    },
    4: { // Neuramis
      variants: [
        { id: 'light', name: 'Neuramis Light', description: 'For fine lines and superficial wrinkles' },
        { id: 'normal', name: 'Neuramis Normal', description: 'For moderate wrinkles and lips' },
        { id: 'deep', name: 'Neuramis Deep', description: 'For deep wrinkles and volume' },
        { id: 'volume', name: 'Neuramis Volume', description: 'For facial contouring and volume' }
      ]
    },
    5: { // Regenovue
      variants: [
        { id: 'fine', name: 'Regenovue Fine', description: 'For fine lines and skin rejuvenation' },
        { id: 'deep', name: 'Regenovue Deep', description: 'For deep wrinkles and nasolabial folds' },
        { id: 'sub-q', name: 'Regenovue Sub-Q', description: 'For volume and facial contouring' }
      ]
    },
    6: { // Dermalax
      variants: [
        { id: 'deep-plus', name: 'Dermalax Deep Plus', description: 'For deep wrinkles and moderate volume' },
        { id: 'plus', name: 'Dermalax Plus', description: 'For volumizing and facial contouring' },
        { id: 'implant', name: 'Dermalax Implant Plus', description: 'For chin and nose augmentation' }
      ]
    },
    7: { // E.P.T.Q
      variants: [
        { id: 's100', name: 'E.P.T.Q S100', description: 'For fine lines and delicate areas' },
        { id: 's300', name: 'E.P.T.Q S300', description: 'For moderate wrinkles and lips' },
        { id: 's500', name: 'E.P.T.Q S500', description: 'For deep wrinkles and volume' }
      ]
    },
    8: { // Sosum
      variants: [
        { id: 'hydro', name: 'Sosum Hydro', description: 'For deep skin hydration' },
        { id: 'glow', name: 'Sosum Glow', description: 'For skin radiance and rejuvenation' }
      ]
    },
    9: { // Starfill
      variants: [
        { id: 'fine', name: 'Starfill Fine', description: 'For fine lines and superficial wrinkles' },
        { id: 'deep', name: 'Starfill Deep', description: 'For moderate to deep wrinkles' },
        { id: 'implant', name: 'Starfill Implant', description: 'For volumizing and contouring' }
      ]
    },
    10: { // Line Fill
      variants: [
        { id: 'ultra', name: 'Line Fill Ultra', description: 'For ultra-fine lines and delicate areas' },
        { id: 'plus', name: 'Line Fill Plus', description: 'For fine to moderate lines' }
      ]
    },
    11: { // Priere
      variants: [
        { id: 'boost', name: 'Priere Boost', description: 'For skin hydration and rejuvenation' },
        { id: 'glow', name: 'Priere Glow', description: 'For radiance and skin quality' }
      ]
    },
    12: { // Lip Star
      variants: [
        { id: 'soft', name: 'Lip Star Soft', description: 'For natural lip enhancement' },
        { id: 'volume', name: 'Lip Star Volume', description: 'For fuller lip augmentation' }
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
        { id: 'fine', name: 'Elasty Fine', description: '섬세한 부위 및 잔주름용' },
        { id: 'deep', name: 'Elasty Deep', description: '중등도 주름 및 볼륨용' },
        { id: 'extra', name: 'Elasty Extra', description: '깊은 주름 및 윤곽용' }
      ]
    },
    3: { // Rejeunesse
      variants: [
        { id: 'fine', name: 'Rejeunesse Fine', description: '표재성 주름 및 섬세한 부위용' },
        { id: 'deep', name: 'Rejeunesse Deep', description: '중등도 ~ 깊은 주름용' },
        { id: 'shape', name: 'Rejeunesse Shape', description: '볼륨 및 윤곽용' }
      ]
    },
    4: { // Neuramis
      variants: [
        { id: 'light', name: 'Neuramis Light', description: '잔주름 및 표재성 주름용' },
        { id: 'normal', name: 'Neuramis Normal', description: '중등도 주름 및 입술용' },
        { id: 'deep', name: 'Neuramis Deep', description: '깊은 주름 및 볼륨용' },
        { id: 'volume', name: 'Neuramis Volume', description: '윤곽 및 볼륨용' }
      ]
    },
    5: { // Regenovue
      variants: [
        { id: 'fine', name: 'Regenovue Fine', description: '잔주름 및 피부 재생용' },
        { id: 'deep', name: 'Regenovue Deep', description: '깊은 주름 및 팔자주름용' },
        { id: 'sub-q', name: 'Regenovue Sub-Q', description: '볼륨 및 윤곽용' }
      ]
    },
    6: { // Dermalax
      variants: [
        { id: 'deep-plus', name: 'Dermalax Deep Plus', description: '깊은 주름 및 중등도 볼륨용' },
        { id: 'plus', name: 'Dermalax Plus', description: '볼륨 및 윤곽용' },
        { id: 'implant', name: 'Dermalax Implant Plus', description: '턱, 코 확대용' }
      ]
    },
    7: { // E.P.T.Q
      variants: [
        { id: 's100', name: 'E.P.T.Q S100', description: '잔주름 및 섬세한 부위용' },
        { id: 's300', name: 'E.P.T.Q S300', description: '중등도 주름 및 입술용' },
        { id: 's500', name: 'E.P.T.Q S500', description: '깊은 주름 및 볼륨용' }
      ]
    },
    8: { // Sosum
      variants: [
        { id: 'hydro', name: 'Sosum Hydro', description: '깊은 피부 수분 공급용' },
        { id: 'glow', name: 'Sosum Glow', description: '피부 광채 및 재생용' }
      ]
    },
    9: { // Starfill
      variants: [
        { id: 'fine', name: 'Starfill Fine', description: '잔주름 및 표재성 주름용' },
        { id: 'deep', name: 'Starfill Deep', description: '중등도 ~ 깊은 주름용' },
        { id: 'implant', name: 'Starfill Implant', description: '볼륨 및 윤곽용' }
      ]
    },
    10: { // Line Fill
      variants: [
        { id: 'ultra', name: 'Line Fill Ultra', description: '극세 주름 및 섬세한 부위용' },
        { id: 'plus', name: 'Line Fill Plus', description: '잔주름 ~ 중등도 주름용' }
      ]
    },
    11: { // Priere
      variants: [
        { id: 'boost', name: 'Priere Boost', description: '피부 수분 및 재생용' },
        { id: 'glow', name: 'Priere Glow', description: '광채 및 피부 품질용' }
      ]
    },
    12: { // Lip Star
      variants: [
        { id: 'soft', name: 'Lip Star Soft', description: '자연스러운 입술 개선용' },
        { id: 'volume', name: 'Lip Star Volume', description: '풍성한 입술 확대용' }
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
      tagline: 'Advanced Elastic Filler Technology',
      description: 'High-quality HA filler with excellent elasticity for natural-looking results. Superior cohesiveness ensures smooth, even distribution.',
      sellingPoints: [
        'Superior elasticity and cohesiveness',
        'Smooth injection experience',
        'Versatile for multiple treatment areas'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    3: {
      name: 'Rejeunesse',
      category: 'FILLERS',
      tagline: 'SHAPE Technology Innovation',
      description: 'Advanced HA filler with patented SHAPE technology for long-lasting volume restoration and natural facial contouring.',
      sellingPoints: [
        'Patented SHAPE technology',
        'Optimal viscoelasticity',
        'Extended duration of effect'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    4: {
      name: 'Neuramis',
      category: 'FILLERS',
      tagline: 'Pure Korean Excellence',
      description: 'Premium Korean HA filler renowned for exceptional purity and natural results. Trusted by practitioners for consistent performance.',
      sellingPoints: [
        'High purity hyaluronic acid',
        'Natural and soft tissue feel',
        'Multiple product lines available'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    5: {
      name: 'Regenovue',
      category: 'FILLERS',
      tagline: 'Next-Generation Viscoelasticity',
      description: 'Cutting-edge HA filler with optimal viscoelasticity for exceptionally smooth injection and superior moldability.',
      sellingPoints: [
        'Advanced cross-linking technology',
        'Excellent moldability',
        'Suitable for fine lines to deep wrinkles'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    6: {
      name: 'Dermalax',
      category: 'FILLERS',
      tagline: 'High-Performance Volume Solution',
      description: 'High-concentration HA filler engineered for effective facial contouring and dramatic volume enhancement.',
      sellingPoints: [
        'High concentration formula',
        'Strong volumizing effect',
        'Long-lasting results'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    7: {
      name: 'E.P.T.Q',
      category: 'FILLERS',
      tagline: 'European Quality Standards',
      description: 'Premium HA filler meeting European quality standards with advanced cross-linking technology for diverse aesthetic applications.',
      sellingPoints: [
        'European quality standards',
        'Advanced cross-linking technology',
        'Multiple product lines for various needs'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    8: {
      name: 'Sosum',
      category: 'SKIN BOOSTERS',
      tagline: 'Deep Hydration Therapy',
      description: 'Advanced skin booster delivering deep hydration and comprehensive skin rejuvenation for radiant, healthy-looking skin.',
      sellingPoints: [
        'Deep skin hydration',
        'Improves skin texture and elasticity',
        'Natural radiance enhancement'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    9: {
      name: 'Starfill',
      category: 'FILLERS',
      tagline: 'Versatile Enhancement Solution',
      description: 'Multi-purpose HA filler offering versatile applications for various facial enhancement procedures with reliable results.',
      sellingPoints: [
        'Versatile application range',
        'Consistent quality',
        'Reliable clinical results'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    10: {
      name: 'Line Fill',
      category: 'FILLERS',
      tagline: 'Precision Fine Line Treatment',
      description: 'Specialized HA filler precisely designed for fine lines and delicate areas requiring subtle, refined correction.',
      sellingPoints: [
        'Precision treatment for fine lines',
        'Smooth and even results',
        'Minimal downtime'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    11: {
      name: 'Priere',
      category: 'SKIN BOOSTERS',
      tagline: 'Premium Skin Rejuvenation',
      description: 'Premium skin booster formulated for enhanced skin quality, improved texture, and natural radiance restoration.',
      sellingPoints: [
        'Multi-nutrient formula',
        'Skin rejuvenation effect',
        'Improved skin tone and texture'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    12: {
      name: 'Lip Star',
      category: 'FILLERS',
      tagline: 'Specialized Lip Enhancement',
      description: 'Purpose-designed HA filler optimized for lip augmentation and contouring, delivering soft, natural-looking volume.',
      sellingPoints: [
        'Optimized for lip enhancement',
        'Natural-looking volume',
        'Soft and smooth results'
      ],
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
      tagline: '고급 탄력 필러 기술',
      description: '자연스러운 결과를 위한 뛰어난 탄력성의 고품질 HA 필러. 우수한 응집력으로 부드럽고 균일한 분포를 보장합니다.',
      sellingPoints: [
        '우수한 탄력성과 응집력',
        '부드러운 주입 경험',
        '다양한 시술 부위에 적용 가능'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    3: {
      name: 'Rejeunesse',
      category: '필러',
      tagline: 'SHAPE 기술 혁신',
      description: '특허받은 SHAPE 기술로 오래 지속되는 볼륨 복원과 자연스러운 얼굴 윤곽을 제공하는 고급 HA 필러.',
      sellingPoints: [
        '특허 SHAPE 기술',
        '최적의 점탄성',
        '연장된 지속 효과'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    4: {
      name: 'Neuramis',
      category: '필러',
      tagline: '순수한 한국의 우수성',
      description: '뛰어난 순도와 자연스러운 결과로 유명한 프리미엄 한국산 HA 필러. 일관된 성능으로 시술자들의 신뢰를 받고 있습니다.',
      sellingPoints: [
        '고순도 히알루론산',
        '자연스럽고 부드러운 조직 느낌',
        '다양한 제품 라인 제공'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    5: {
      name: 'Regenovue',
      category: '필러',
      tagline: '차세대 점탄성',
      description: '뛰어나게 부드러운 주입과 우수한 성형성을 위한 최적의 점탄성을 갖춘 최첨단 HA 필러.',
      sellingPoints: [
        '고급 가교 기술',
        '우수한 성형성',
        '잔주름부터 깊은 주름까지 적합'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    6: {
      name: 'Dermalax',
      category: '필러',
      tagline: '고성능 볼륨 솔루션',
      description: '효과적인 얼굴 윤곽과 극적인 볼륨 강화를 위해 설계된 고농도 HA 필러.',
      sellingPoints: [
        '고농도 포뮬러',
        '강력한 볼륨 효과',
        '오래 지속되는 결과'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    7: {
      name: 'E.P.T.Q',
      category: '필러',
      tagline: '유럽 품질 기준',
      description: '다양한 미용 시술을 위한 고급 가교 기술과 유럽 품질 기준을 충족하는 프리미엄 HA 필러.',
      sellingPoints: [
        '유럽 품질 기준',
        '고급 가교 기술',
        '다양한 니즈를 위한 제품 라인'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    8: {
      name: 'Sosum',
      category: '스킨부스터',
      tagline: '딥 하이드레이션 테라피',
      description: '빛나고 건강한 피부를 위한 깊은 수분 공급과 종합적인 피부 재생을 제공하는 고급 스킨부스터.',
      sellingPoints: [
        '깊은 피부 수분 공급',
        '피부 결과 탄력 개선',
        '자연스러운 광채 향상'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    9: {
      name: 'Starfill',
      category: '필러',
      tagline: '다목적 개선 솔루션',
      description: '신뢰할 수 있는 결과로 다양한 얼굴 개선 시술에 다목적 적용이 가능한 HA 필러.',
      sellingPoints: [
        '다양한 적용 범위',
        '일관된 품질',
        '신뢰할 수 있는 임상 결과'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    10: {
      name: 'Line Fill',
      category: '필러',
      tagline: '정밀 잔주름 치료',
      description: '섬세하고 정교한 교정이 필요한 잔주름과 섬세한 부위를 위해 특별히 설계된 HA 필러.',
      sellingPoints: [
        '잔주름을 위한 정밀 시술',
        '부드럽고 균일한 결과',
        '최소한의 다운타임'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    11: {
      name: 'Priere',
      category: '스킨부스터',
      tagline: '프리미엄 피부 재생',
      description: '향상된 피부 품질, 개선된 질감, 자연스러운 광채 회복을 위해 조제된 프리미엄 스킨부스터.',
      sellingPoints: [
        '다중 영양소 포뮬러',
        '피부 재생 효과',
        '피부 톤과 결 개선'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    12: {
      name: 'Lip Star',
      category: '필러',
      tagline: '전문 입술 개선',
      description: '부드럽고 자연스러운 볼륨을 제공하는 입술 확대 및 윤곽을 위해 최적화된 HA 필러.',
      sellingPoints: [
        '입술 개선에 최적화',
        '자연스러운 볼륨',
        '부드럽고 매끄러운 결과'
      ],
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
