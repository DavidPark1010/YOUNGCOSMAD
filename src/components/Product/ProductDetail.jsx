import { useState, useEffect } from 'react'
import './ProductDetail.css'

// Revolax variants 데이터
const revolaxVariants = {
  en: {
    description: 'Cross-linked Hyaluronic Acid filler produced in Korea with high viscoelasticity and stability. One of the most traded fillers in the global export market.',
    features: [
      {
        icon: 'molecule',
        title: 'Cross-linked HA',
        desc: 'BDDE cross-linking technology'
      },
      {
        icon: 'syringe',
        title: 'Contains Lidocaine',
        desc: 'Enhanced patient comfort'
      },
      {
        icon: 'certificate',
        title: 'CE Certified',
        desc: 'European conformity standards'
      },
      {
        icon: 'snowflake',
        title: 'LTS Technology',
        desc: 'Low Temperature Stabilization'
      }
    ],
    variants: [
      {
        id: 'fine',
        name: 'Revolax Fine',
        viscosity: 'Low',
        viscosityLevel: 1,
        applications: ['Fine lines', 'Eye area', 'Forehead']
      },
      {
        id: 'deep',
        name: 'Revolax Deep',
        viscosity: 'Medium',
        viscosityLevel: 2,
        applications: ['Nasolabial folds', 'Lips', 'Cheeks']
      },
      {
        id: 'sub-q',
        name: 'Revolax Sub-Q',
        viscosity: 'High',
        viscosityLevel: 3,
        applications: ['Chin', 'Nose', 'Volume', 'Contouring']
      }
    ],
    selectTitle: 'Select Product Variants',
    selectSubtitle: 'Choose one or more products for your inquiry',
    selectedBadge: (count) => `${count} selected`,
    ctaButton: 'Discuss Wholesale Terms',
    ctaHint: 'Ask about pricing, MOQ, certifications and global shipping.'
  },
  ko: {
    description: '한국에서 생산되는 가교 히알루론산(HA) 필러로, 높은 점탄성과 안정성으로 글로벌 수출 시장에서 가장 많이 거래되는 필러 중 하나입니다.',
    features: [
      {
        icon: 'molecule',
        title: '가교 히알루론산',
        desc: 'BDDE 가교 기술'
      },
      {
        icon: 'syringe',
        title: '리도카인 함유',
        desc: '시술 시 통증 감소'
      },
      {
        icon: 'certificate',
        title: 'CE 인증',
        desc: '유럽 적합성 기준 충족'
      },
      {
        icon: 'snowflake',
        title: 'LTS 기술',
        desc: '저온 안정화 기술'
      }
    ],
    variants: [
      {
        id: 'fine',
        name: 'Revolax Fine',
        viscosity: '낮음',
        viscosityLevel: 1,
        applications: ['잔주름', '눈가', '이마']
      },
      {
        id: 'deep',
        name: 'Revolax Deep',
        viscosity: '중간',
        viscosityLevel: 2,
        applications: ['팔자주름', '입술', '볼']
      },
      {
        id: 'sub-q',
        name: 'Revolax Sub-Q',
        viscosity: '높음',
        viscosityLevel: 3,
        applications: ['턱', '코', '볼륨', '윤곽']
      }
    ],
    selectTitle: '제품 라인업 선택',
    selectSubtitle: '문의하실 제품을 선택해주세요',
    selectedBadge: (count) => `${count}개 선택`,
    ctaButton: '도매 조건 상담',
    ctaHint: '가격, MOQ, 인증, 글로벌 배송에 대해 문의하세요.'
  }
}

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

// Feature Icon Component
const FeatureIcon = ({ type }) => {
  const icons = {
    molecule: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="12" cy="20" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
        <line x1="12" y1="6" x2="12" y2="9" />
        <line x1="12" y1="15" x2="12" y2="18" />
        <line x1="6" y1="12" x2="9" y2="12" />
        <line x1="15" y1="12" x2="18" y2="12" />
      </svg>
    ),
    syringe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2l4 4-1 1-4-4 1-1z" />
        <path d="M16 4l4 4-11 11H5v-4L16 4z" />
        <line x1="9" y1="11" x2="13" y2="15" />
        <line x1="2" y1="22" x2="5" y2="19" />
      </svg>
    ),
    certificate: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M8 21l4-4 4 4" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="7" y1="12" x2="13" y2="12" />
      </svg>
    ),
    snowflake: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
        <polyline points="12,6 14,4 12,2" />
        <polyline points="12,6 10,4 12,2" />
      </svg>
    )
  }
  return <span className="feature-icon">{icons[type]}</span>
}

// Check Icon Component
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function ProductDetail({ productId, lang, onClose, onNavigateToProducts, onInquiry }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState([])

  const product = productDetails[lang][productId]
  const productEn = productDetails['en'][productId]
  const text = uiText[lang]
  const imageUrl = productImages[productId] || `/product${productId}.png`

  const isRevolax = productId === 1
  const revolaxData = isRevolax ? revolaxVariants[lang] : null
  const revolaxDataEn = isRevolax ? revolaxVariants['en'] : null

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

      if (isRevolax && selectedVariants.length > 0) {
        const selectedNames = revolaxDataEn.variants
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
        selectedVariants: isRevolax ? selectedVariants : null
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
            {/* ===== REVOLAX: VARIANTS + CTA ===== */}
            {isRevolax ? (
              <div className="product-selector">
                <div className="selector-header">
                  <h2>{revolaxData.selectTitle}</h2>
                  <p>{revolaxData.selectSubtitle}</p>
                </div>

                <div className="variants-list">
                  {revolaxData.variants.map((variant) => (
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
                        <span className="variant-apps">{variant.applications.join(' · ')}</span>
                      </div>
                      <div className="viscosity-indicator">
                        {[1, 2, 3].map((level) => (
                          <span
                            key={level}
                            className={`viscosity-dot ${level <= variant.viscosityLevel ? 'active' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="selector-cta">
                  {selectedVariants.length > 0 && (
                    <span className="selected-count">{revolaxData.selectedBadge(selectedVariants.length)}</span>
                  )}
                  <button
                    className={`cta-button ${selectedVariants.length === 0 ? 'disabled' : ''}`}
                    onClick={handleInquiry}
                    disabled={selectedVariants.length === 0}
                  >
                    <span>{revolaxData.ctaButton}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <p className="cta-hint">{revolaxData.ctaHint}</p>
                </div>
              </div>
            ) : (
              <div className="product-selector">
                <p className="product-tagline">{product.tagline}</p>

                {/* Certification Badges */}
                <div className="cert-badges">
                  {product.certTags.map((tag, idx) => (
                    <span key={idx} className="cert-badge">{tag}</span>
                  ))}
                  {product.licenseRequired && (
                    <span className="license-badge">{text.licenseNote}</span>
                  )}
                </div>

                <div className="selector-cta">
                  <button className="cta-button" onClick={handleInquiry}>
                    <span>{text.ctaButton}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <p className="cta-hint">{text.ctaHint}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== DETAILS SECTION (Below Hero) ===== */}
        <section className="details-section">
          <div className="details-content">
            {isRevolax && (
              <div className="cert-badges">
                {product.certTags.map((tag, idx) => (
                  <span key={idx} className="cert-badge">{tag}</span>
                ))}
                {product.licenseRequired && (
                  <span className="license-badge">{text.licenseNote}</span>
                )}
              </div>
            )}

            <div className="product-description-block">
              <p>{product.description}</p>
            </div>

            {isRevolax ? (
              <div className="features-grid">
                {revolaxData.features.map((feature, idx) => (
                  <div key={idx} className="feature-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <FeatureIcon type={feature.icon} />
                    <div className="feature-text">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              product.sellingPoints && (
                <div className="selling-points-grid">
                  {product.sellingPoints.map((point, idx) => (
                    <div key={idx} className="selling-point-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <span className="selling-point-number">0{idx + 1}</span>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductDetail
