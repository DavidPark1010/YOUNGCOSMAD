import './ProductDetail.css'

const productDetails = {
  en: {
    1: {
      name: 'Revolax',
      category: 'Fillers',
      tagline: 'Premium hyaluronic acid dermal filler for facial contouring and wrinkle correction.',
      sellingPoints: [
        'Premium cross-linked hyaluronic acid',
        'Contains lidocaine for comfort',
        'Long-lasting natural results'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    2: {
      name: 'Elasty',
      category: 'Fillers',
      tagline: 'High-quality HA filler with excellent elasticity for natural-looking results.',
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
      category: 'Fillers',
      tagline: 'Advanced HA filler with SHAPE technology for long-lasting volume restoration.',
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
      category: 'Fillers',
      tagline: 'Premium Korean HA filler known for its purity and natural results.',
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
      category: 'Fillers',
      tagline: 'Next-generation HA filler with optimal viscoelasticity for smooth injection.',
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
      category: 'Fillers',
      tagline: 'High-concentration HA filler for effective facial contouring and volume.',
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
      category: 'Fillers',
      tagline: 'Premium European-quality HA filler with advanced cross-linking technology.',
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
      category: 'Skin Boosters',
      tagline: 'Advanced skin booster for deep hydration and skin rejuvenation.',
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
      category: 'Fillers',
      tagline: 'Versatile HA filler for various facial enhancement applications.',
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
      category: 'Fillers',
      tagline: 'Precision HA filler designed for fine lines and delicate areas.',
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
      category: 'Skin Boosters',
      tagline: 'Premium skin booster for enhanced skin quality and radiance.',
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
      category: 'Fillers',
      tagline: 'Specialized HA filler designed for lip augmentation and contouring.',
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
      tagline: '얼굴 윤곽 및 주름 개선을 위한 프리미엄 히알루론산 더말 필러.',
      sellingPoints: [
        '프리미엄 가교 히알루론산',
        '편안함을 위한 리도카인 함유',
        '오래 지속되는 자연스러운 결과'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    2: {
      name: 'Elasty',
      category: '필러',
      tagline: '자연스러운 결과를 위한 뛰어난 탄력성의 고품질 HA 필러.',
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
      tagline: '오래 지속되는 볼륨 복원을 위한 SHAPE 기술의 고급 HA 필러.',
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
      tagline: '순도와 자연스러운 결과로 유명한 프리미엄 한국산 HA 필러.',
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
      tagline: '부드러운 주입을 위한 최적의 점탄성을 갖춘 차세대 HA 필러.',
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
      tagline: '효과적인 얼굴 윤곽 및 볼륨을 위한 고농도 HA 필러.',
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
      tagline: '고급 가교 기술을 적용한 유럽 품질의 프리미엄 HA 필러.',
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
      tagline: '깊은 수분 공급과 피부 재생을 위한 고급 스킨부스터.',
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
      tagline: '다양한 얼굴 개선 시술에 적용 가능한 다목적 HA 필러.',
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
      tagline: '잔주름과 섬세한 부위를 위해 설계된 정밀 HA 필러.',
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
      tagline: '향상된 피부 품질과 광채를 위한 프리미엄 스킨부스터.',
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
      tagline: '입술 확대 및 윤곽을 위해 특별히 설계된 HA 필러.',
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
    askButton: 'Discuss Wholesale Terms',
    askHint: 'Ask about pricing, MOQ, certifications and global shipping.',
    licenseNote: 'License required for purchase.',
    back: 'Back'
  },
  ko: {
    askButton: '도매 조건 상담',
    askHint: '가격, MOQ, 인증, 글로벌 배송에 대해 문의하세요.',
    licenseNote: '구매 시 라이선스 필요.',
    back: '돌아가기'
  }
}

// 제품 ID별 이미지 경로 매핑
const productImages = {
  1: '/revolax1.png',
  2: '/ELASTY1.png',
  3: '/REJEUNESSE.png',
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

function ProductDetail({ productId, lang, onClose, onNavigateToProducts, onInquiry }) {
  const product = productDetails[lang][productId]
  const productEn = productDetails['en'][productId] // For initial message (always English)
  const text = uiText[lang]
  const imageUrl = productImages[productId] || `/product${productId}.png`

  const handleInquiry = () => {
    if (onInquiry) {
      // Generate initial message for chat
      const initialMessage = `I'm interested in ${productEn.name}. Could you share wholesale terms and availability?`

      onInquiry(productId, {
        name: product.name,
        nameEn: productEn.name,
        category: product.category,
        tagline: product.tagline,
        moq: product.moq,
        certTags: product.certTags,
        image: imageUrl,
        initialMessage: initialMessage
      })
    }
  }

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-container">
        <button className="back-button" onClick={() => {
          if (window.history.state?.productId) {
            window.history.back()
          } else {
            onClose()
          }
        }}>
          <span className="back-arrow">←</span> {text.back}
        </button>

        <div className="product-detail-content">
          {/* Left: Product Image */}
          <div className="product-detail-image">
            <img src={imageUrl} alt={product.name} />
          </div>

          {/* Right: Product Info - Minimal B2B Layout */}
          <div className="product-detail-info">
            <span className="product-detail-category">{product.category}</span>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-tagline">{product.tagline}</p>

            {/* Key Selling Points */}
            <ul className="product-selling-points">
              {product.sellingPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            {/* Certification Tags */}
            <div className="product-cert-tags">
              {product.certTags.map((tag, idx) => (
                <span key={idx} className="cert-tag">{tag}</span>
              ))}
            </div>

            {/* License Notice (medical products only) */}
            {product.licenseRequired && (
              <span className="product-license-note">{text.licenseNote}</span>
            )}

            {/* CTA Section */}
            <div className="product-cta-wrapper">
              <button
                className="ask-product-btn"
                onClick={handleInquiry}
              >
                <span>{text.askButton}</span>
                <span className="ask-btn-arrow">→</span>
              </button>
              <span className="product-cta-hint">{text.askHint}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
