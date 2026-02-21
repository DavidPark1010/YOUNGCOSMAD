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
    // New Filler Products
    101: {
      name: 'REVOLAX SUB-Q',
      category: 'Dermal Fillers',
      tagline: 'High-viscosity HA filler for deep tissue volumizing and facial contouring.',
      sellingPoints: [
        'Premium cross-linked hyaluronic acid',
        'Long-lasting results up to 12-18 months',
        'Contains lidocaine for patient comfort'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/revolax sub-q.png'
    },
    102: {
      name: 'REVOLAX FINE',
      category: 'Dermal Fillers',
      tagline: 'Light HA filler for superficial lines and delicate areas.',
      sellingPoints: [
        'Fine particle size for precise injection',
        'Ideal for lips and periorbital area',
        'Natural-looking results'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/revolax fine.png'
    },
    103: {
      name: 'REVOLAX DEEP',
      category: 'Dermal Fillers',
      tagline: 'Medium-viscosity HA filler for moderate wrinkles and lip augmentation.',
      sellingPoints: [
        'Balanced viscosity for versatile use',
        'Smooth injection experience',
        'CE and KFDA certified'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/revolax deep.png'
    },
    104: {
      name: 'ELASTY G PLUS',
      category: 'Dermal Fillers',
      tagline: 'Advanced HA filler with enhanced elasticity for natural facial contouring.',
      sellingPoints: [
        'E.C.T technology for superior elasticity',
        'High purity hyaluronic acid',
        'Long-lasting volumizing effect'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/elasty g.png'
    },
    105: {
      name: 'ELASTY F',
      category: 'Dermal Fillers',
      tagline: 'Fine HA filler for superficial wrinkles and skin rejuvenation.',
      sellingPoints: [
        'Ultra-fine particles for delicate areas',
        'Skin boosting and hydration effect',
        'Minimal swelling post-injection'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/elasty f2..png'
    },
    106: {
      name: 'ELASTY D',
      category: 'Dermal Fillers',
      tagline: 'Deep volumizing HA filler for facial sculpting and augmentation.',
      sellingPoints: [
        'High-viscosity formula for deep injection',
        'Excellent lifting capacity',
        'Maintains natural facial expressions'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/elasty d.png'
    },
    107: {
      name: 'REGENOVUE',
      category: 'Dermal Fillers',
      tagline: 'Premium Korean HA filler line for versatile aesthetic treatments.',
      sellingPoints: [
        'High-purity cross-linked hyaluronic acid',
        'Available in multiple viscosities',
        'CE and KFDA certified quality'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/regenovue.png'
    },
    108: {
      name: 'REJEUNESSE',
      category: 'Dermal Fillers',
      tagline: 'Advanced HA filler series for comprehensive facial rejuvenation.',
      sellingPoints: [
        'Innovative SHAPE technology',
        'Long-lasting natural results',
        'Globally trusted Korean brand'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/rejeunesse.png'
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
    // New Filler Products
    101: {
      name: 'REVOLAX SUB-Q',
      category: '더말 필러',
      tagline: '깊은 조직 볼륨화 및 얼굴 윤곽을 위한 고점도 HA 필러.',
      sellingPoints: [
        '프리미엄 가교 히알루론산',
        '12-18개월 지속되는 효과',
        '환자 편안함을 위한 리도카인 함유'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/revolax sub-q.png'
    },
    102: {
      name: 'REVOLAX FINE',
      category: '더말 필러',
      tagline: '표면 주름 및 섬세한 부위를 위한 경량 HA 필러.',
      sellingPoints: [
        '정밀 주입을 위한 미세 입자',
        '입술 및 눈가 부위에 이상적',
        '자연스러운 결과'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/revolax fine.png'
    },
    103: {
      name: 'REVOLAX DEEP',
      category: '더말 필러',
      tagline: '중등도 주름 및 입술 볼륨을 위한 중점도 HA 필러.',
      sellingPoints: [
        '다용도 사용을 위한 균형 잡힌 점도',
        '부드러운 주입 경험',
        'CE 및 KFDA 인증'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/revolax deep.png'
    },
    104: {
      name: 'ELASTY G PLUS',
      category: '더말 필러',
      tagline: '자연스러운 얼굴 윤곽을 위한 향상된 탄력의 HA 필러.',
      sellingPoints: [
        '우수한 탄력을 위한 E.C.T 기술',
        '고순도 히알루론산',
        '오래 지속되는 볼륨 효과'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/elasty g.png'
    },
    105: {
      name: 'ELASTY F',
      category: '더말 필러',
      tagline: '표면 주름 및 피부 재생을 위한 미세 HA 필러.',
      sellingPoints: [
        '섬세한 부위를 위한 초미세 입자',
        '스킨 부스팅 및 수분 공급 효과',
        '시술 후 최소한의 붓기'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/elasty f2..png'
    },
    106: {
      name: 'ELASTY D',
      category: '더말 필러',
      tagline: '얼굴 조각 및 볼륨 증대를 위한 깊은 볼륨 HA 필러.',
      sellingPoints: [
        '깊은 주입을 위한 고점도 포뮬러',
        '우수한 리프팅 효과',
        '자연스러운 표정 유지'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/elasty d.png'
    },
    107: {
      name: 'REGENOVUE',
      category: '더말 필러',
      tagline: '다양한 미용 시술을 위한 프리미엄 한국산 HA 필러 라인.',
      sellingPoints: [
        '고순도 가교 히알루론산',
        '다양한 점도 옵션 제공',
        'CE 및 KFDA 인증 품질'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/regenovue.png'
    },
    108: {
      name: 'REJEUNESSE',
      category: '더말 필러',
      tagline: '종합적인 얼굴 회춘을 위한 고급 HA 필러 시리즈.',
      sellingPoints: [
        '혁신적인 SHAPE 기술',
        '오래 지속되는 자연스러운 결과',
        '글로벌 신뢰 한국 브랜드'
      ],
      certTags: ['CE', 'KFDA', 'ISO 13485'],
      moq: '10 boxes',
      image: '/rejeunesse.png'
    }
  }
}

const uiText = {
  en: {
    askButton: 'Discuss Wholesale Terms',
    askHint: 'Ask about pricing, MOQ, certifications and global shipping.',
    licenseNote: 'License required for purchase.',
    back: 'Back',
    realPhotosTitle: 'Real Product Photos',
    imageNote: 'Note: Some images on this page are AI-generated concept visuals to help buyers understand the product. Actual product photos are provided in the "Real Product Photos" section below.'
  },
  ko: {
    askButton: '도매 조건 상담',
    askHint: '가격, MOQ, 인증, 글로벌 배송에 대해 문의하세요.',
    licenseNote: '구매 시 라이선스 필요.',
    back: '돌아가기',
    realPhotosTitle: '실제 제품 사진 (Real Product Photos)',
    imageNote: '안내: 본 페이지의 일부 이미지는 바이어 이해를 돕기 위한 AI 제작 컨셉 이미지입니다. 실제 제품 사진은 하단의 "실제 제품 사진(Real Product Photos)" 섹션에서 확인하실 수 있습니다.'
  }
}

function ProductDetail({ productId, lang, onClose, onNavigateToProducts, onInquiry }) {
  const product = productDetails[lang][productId]
  const productEn = productDetails['en'][productId] // For initial message (always English)
  const text = uiText[lang]
  // Use custom image path if defined, otherwise fallback to default pattern
  const imageUrl = product?.image || `/product${productId}.png`

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

            {/* Image Note */}
            <p className="product-image-note">{text.imageNote}</p>

            {/* Real Product Photos Section */}
            <div className="real-photos-section">
              <h3 className="real-photos-title">{text.realPhotosTitle}</h3>
              <div className="real-photos-placeholder">
                <span className="real-photos-coming">{lang === 'en' ? 'Photos available upon inquiry' : '문의 시 제공'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
