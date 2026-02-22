// 국가/지역 데이터 + 기본 배송비/관세율
export const REGIONS = {
  Asia: ['Japan', 'South Korea', 'China', 'Singapore', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'India', 'Taiwan'],
  Europe: ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Poland', 'Sweden', 'Switzerland'],
  Americas: ['USA', 'Canada', 'Brazil', 'Mexico'],
  'Middle East': ['UAE', 'Saudi Arabia', 'Turkey', 'Israel'],
  Oceania: ['Australia', 'New Zealand'],
  Africa: ['South Africa', 'Nigeria', 'Egypt']
}

// 기본 배송비 및 관세율 (USD 기준)
export const DEFAULT_COUNTRY_DATA = {
  // Asia
  'Japan': { shipping: 80, tariff: 0.05 },
  'South Korea': { shipping: 50, tariff: 0 },
  'China': { shipping: 70, tariff: 0.06 },
  'Singapore': { shipping: 90, tariff: 0 },
  'Thailand': { shipping: 85, tariff: 0.03 },
  'Vietnam': { shipping: 85, tariff: 0.04 },
  'Indonesia': { shipping: 95, tariff: 0.05 },
  'Malaysia': { shipping: 90, tariff: 0.03 },
  'Philippines': { shipping: 95, tariff: 0.04 },
  'India': { shipping: 100, tariff: 0.07 },
  'Taiwan': { shipping: 80, tariff: 0.03 },
  // Europe
  'UK': { shipping: 140, tariff: 0.02 },
  'Germany': { shipping: 140, tariff: 0.02 },
  'France': { shipping: 140, tariff: 0.02 },
  'Italy': { shipping: 145, tariff: 0.02 },
  'Spain': { shipping: 145, tariff: 0.02 },
  'Netherlands': { shipping: 140, tariff: 0.02 },
  'Poland': { shipping: 135, tariff: 0.02 },
  'Sweden': { shipping: 145, tariff: 0.02 },
  'Switzerland': { shipping: 150, tariff: 0.03 },
  // Americas
  'USA': { shipping: 150, tariff: 0.025 },
  'Canada': { shipping: 120, tariff: 0.03 },
  'Brazil': { shipping: 180, tariff: 0.08 },
  'Mexico': { shipping: 140, tariff: 0.04 },
  // Middle East
  'UAE': { shipping: 160, tariff: 0.05 },
  'Saudi Arabia': { shipping: 160, tariff: 0.05 },
  'Turkey': { shipping: 150, tariff: 0.06 },
  'Israel': { shipping: 155, tariff: 0.04 },
  // Oceania
  'Australia': { shipping: 130, tariff: 0.05 },
  'New Zealand': { shipping: 140, tariff: 0.04 },
  // Africa
  'South Africa': { shipping: 170, tariff: 0.05 },
  'Nigeria': { shipping: 190, tariff: 0.06 },
  'Egypt': { shipping: 165, tariff: 0.05 }
}

// 전체 국가 목록 (커스텀 국가 추가 드롭다운용)
export const ALL_COUNTRIES = [
  // Asia
  'Japan', 'South Korea', 'China', 'Singapore', 'Thailand', 'Vietnam',
  'Indonesia', 'Malaysia', 'Philippines', 'India', 'Taiwan',
  'Hong Kong', 'Myanmar', 'Cambodia', 'Laos', 'Bangladesh', 'Sri Lanka', 'Pakistan',
  // Europe
  'UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Poland', 'Sweden',
  'Switzerland', 'Belgium', 'Austria', 'Denmark', 'Norway', 'Finland',
  'Portugal', 'Czech Republic', 'Romania', 'Hungary', 'Greece', 'Ireland',
  // Americas
  'USA', 'Canada', 'Brazil', 'Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru',
  // Middle East
  'UAE', 'Saudi Arabia', 'Turkey', 'Israel', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
  // Oceania
  'Australia', 'New Zealand', 'Fiji', 'Papua New Guinea',
  // Africa
  'South Africa', 'Nigeria', 'Egypt', 'Kenya', 'Morocco', 'Ghana', 'Ethiopia', 'Tanzania'
]

// 기본 MOQ 할인 티어
export const DEFAULT_MOQ_TIERS = [
  { minQty: 1000, discount: 0.05 },
  { minQty: 5000, discount: 0.10 },
  { minQty: 10000, discount: 0.15 }
]

// 기본 가격 설정 생성
export function createDefaultPricing(basePrice = 0) {
  const countryPricing = {}
  // 주요 국가만 기본 활성화
  const defaultEnabled = ['USA', 'Japan', 'South Korea', 'China', 'UK', 'Germany', 'France', 'Australia', 'Canada', 'Singapore', 'UAE']
  Object.keys(DEFAULT_COUNTRY_DATA).forEach(country => {
    countryPricing[country] = {
      enabled: defaultEnabled.includes(country),
      unitPrice: null, // null = basePrice 사용
      shipping: DEFAULT_COUNTRY_DATA[country].shipping,
      tariff: DEFAULT_COUNTRY_DATA[country].tariff
    }
  })
  return {
    basePrice,
    moqDiscountTiers: [...DEFAULT_MOQ_TIERS],
    countryPricing
  }
}
