import './ProductDetail.css'

const productDetails = {
  en: {
    1: {
      name: 'Hydra Glow Serum',
      category: 'Skincare',
      tagline: 'Deep hydration serum with hyaluronic acid and niacinamide for radiant skin.',
      sellingPoints: [
        'Multi-weight hyaluronic acid for layered hydration',
        'Brightening niacinamide complex',
        'Lightweight, fast-absorbing texture'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '500 units'
    },
    2: {
      name: 'Velvet Matte Lip Tint',
      category: 'Makeup',
      tagline: 'Long-wear velvet matte lip tint with rich pigmentation.',
      sellingPoints: [
        '8-hour long-lasting formula',
        'Non-drying velvet finish',
        'Buildable color intensity'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '300 units'
    },
    3: {
      name: 'Cica Repair Cream',
      category: 'Skincare',
      tagline: 'Intensive barrier repair cream with Centella Asiatica.',
      sellingPoints: [
        'Centella Asiatica for skin barrier restoration',
        'Vegan certified formula',
        'Suitable for sensitive skin'
      ],
      certTags: ['CPNP', 'FDA', 'Vegan'],
      moq: '400 units'
    },
    4: {
      name: 'Double Cleansing Oil',
      category: 'Cleansing',
      tagline: 'Gentle cleansing oil that dissolves makeup without stripping moisture.',
      sellingPoints: [
        'Emulsifying formula for easy rinse',
        'Plant-based oil blend',
        'No residue, fresh finish'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '600 units'
    },
    5: {
      name: 'Peptide Eye Contour',
      category: 'Skincare',
      tagline: 'Anti-aging eye cream with peptide complex for wrinkles and dark circles.',
      sellingPoints: [
        'Acetyl hexapeptide-8 for fine lines',
        'Caffeine to reduce puffiness',
        'Fragrance-free formula'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '350 units'
    },
    6: {
      name: 'Tone-Up Sun Shield',
      category: 'Sun Care',
      tagline: 'SPF50+ PA++++ sunscreen with natural tone-up effect.',
      sellingPoints: [
        'Broad spectrum UV protection',
        'Subtle tone-up without white cast',
        'Lightweight daily wear texture'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '500 units'
    },
    7: {
      name: 'Hyaluronic Filler 1ml',
      category: 'Dermal Fillers',
      tagline: 'Cross-linked HA filler for facial contouring and wrinkle correction.',
      sellingPoints: [
        'Premium cross-linked hyaluronic acid',
        'Contains lidocaine for comfort',
        'CE and KFDA certified'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    8: {
      name: 'Deep Volume Filler 2ml',
      category: 'Dermal Fillers',
      tagline: 'High-viscosity HA filler for deep tissue augmentation.',
      sellingPoints: [
        'High concentration for volume restoration',
        'Long-lasting results',
        'Smooth injection experience'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100 units',
      medical: true,
      licenseRequired: true
    },
    9: {
      name: 'Botulinum Type A 100U',
      category: 'Botulinum Toxin',
      tagline: 'Purified botulinum toxin type A for aesthetic procedures.',
      sellingPoints: [
        'High purity formulation',
        'Consistent clinical results',
        'Multi-national certifications'
      ],
      certTags: ['CE', 'KFDA', 'FDA'],
      moq: '50 units',
      medical: true,
      licenseRequired: true
    },
    10: {
      name: 'Premium Botox 200U',
      category: 'Botulinum Toxin',
      tagline: 'High-purity botulinum toxin for professional aesthetic applications.',
      sellingPoints: [
        'Premium grade formulation',
        'Extended shelf life (frozen)',
        'Globally recognized certifications'
      ],
      certTags: ['CE', 'KFDA', 'FDA'],
      moq: '50 units',
      medical: true,
      licenseRequired: true
    }
  },
  ko: {
    1: {
      name: '하이드라 글로우 세럼',
      category: '스킨케어',
      tagline: '히알루론산과 나이아신아마이드로 깊은 보습과 광채를 선사하는 수분 세럼.',
      sellingPoints: [
        '다중 분자량 히알루론산으로 층층 보습',
        '브라이트닝 나이아신아마이드 컴플렉스',
        '가볍고 빠르게 흡수되는 텍스처'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '500개'
    },
    2: {
      name: '벨벳 매트 립틴트',
      category: '메이크업',
      tagline: '풍부한 발색의 롱웨어 벨벳 매트 립틴트.',
      sellingPoints: [
        '8시간 지속되는 롱래스팅 포뮬러',
        '건조하지 않은 벨벳 피니시',
        '레이어링 가능한 컬러 강도'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '300개'
    },
    3: {
      name: '시카 리페어 크림',
      category: '스킨케어',
      tagline: '센텔라아시아티카 함유 인텐시브 피부 장벽 회복 크림.',
      sellingPoints: [
        '센텔라아시아티카로 피부 장벽 회복',
        '비건 인증 포뮬러',
        '민감성 피부에 적합'
      ],
      certTags: ['CPNP', 'FDA', 'Vegan'],
      moq: '400개'
    },
    4: {
      name: '더블 클렌징 오일',
      category: '클렌징',
      tagline: '수분을 빼앗지 않고 메이크업을 녹이는 순한 클렌징 오일.',
      sellingPoints: [
        '쉽게 헹굴 수 있는 유화 포뮬러',
        '식물성 오일 블렌드',
        '잔여감 없는 산뜻한 마무리'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '600개'
    },
    5: {
      name: '펩타이드 아이 컨투어',
      category: '스킨케어',
      tagline: '주름과 다크서클을 위한 펩타이드 복합체 함유 안티에이징 아이크림.',
      sellingPoints: [
        '잔주름을 위한 아세틸헥사펩타이드-8',
        '붓기 완화를 위한 카페인 함유',
        '무향료 포뮬러'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '350개'
    },
    6: {
      name: '톤업 선쉴드',
      category: '선케어',
      tagline: '자연스러운 톤업 효과의 SPF50+ PA++++ 선크림.',
      sellingPoints: [
        '광범위 자외선 차단',
        '백탁 현상 없는 은은한 톤업',
        '가벼운 데일리 텍스처'
      ],
      certTags: ['CPNP', 'FDA'],
      moq: '500개'
    },
    7: {
      name: '히알루론 필러 1ml',
      category: '더말 필러',
      tagline: '얼굴 윤곽 및 주름 개선을 위한 가교 HA 필러.',
      sellingPoints: [
        '프리미엄 가교 히알루론산',
        '편안함을 위한 리도카인 함유',
        'CE 및 KFDA 인증'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    8: {
      name: '딥 볼륨 필러 2ml',
      category: '더말 필러',
      tagline: '깊은 조직 증강을 위한 고점도 HA 필러.',
      sellingPoints: [
        '볼륨 복원을 위한 고농도 포뮬러',
        '오래 지속되는 결과',
        '부드러운 주입 경험'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '100개',
      medical: true,
      licenseRequired: true
    },
    9: {
      name: '보툴리눔 타입A 100U',
      category: '보툴리눔 톡신',
      tagline: '미용 시술을 위한 정제된 보툴리눔 독소 타입 A.',
      sellingPoints: [
        '고순도 포뮬레이션',
        '일관된 임상 결과',
        '다국적 인증 보유'
      ],
      certTags: ['CE', 'KFDA', 'FDA'],
      moq: '50개',
      medical: true,
      licenseRequired: true
    },
    10: {
      name: '프리미엄 보톡스 200U',
      category: '보툴리눔 톡신',
      tagline: '전문 미용 시술을 위한 고순도 보툴리눔 독소.',
      sellingPoints: [
        '프리미엄 등급 포뮬레이션',
        '연장된 유통기한 (냉동)',
        '글로벌 인증 보유'
      ],
      certTags: ['CE', 'KFDA', 'FDA'],
      moq: '50개',
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

function ProductDetail({ productId, lang, onClose, onNavigateToProducts, onInquiry }) {
  const product = productDetails[lang][productId]
  const productEn = productDetails['en'][productId] // For initial message (always English)
  const text = uiText[lang]
  const imageUrl = `/product${productId}.png`

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
