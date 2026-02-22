import { useState } from 'react'
import './CustomerOrderFlow.css'

// 폴백용 기본 데이터 (product.pricing이 없는 경우)
const FALLBACK_COUNTRIES = {
  'USA': { shipping: 150, tariff: 0.025 },
  'UK': { shipping: 140, tariff: 0.02 },
  'Germany': { shipping: 140, tariff: 0.02 },
  'France': { shipping: 140, tariff: 0.02 },
  'Japan': { shipping: 80, tariff: 0.05 },
  'South Korea': { shipping: 50, tariff: 0 },
  'China': { shipping: 70, tariff: 0.06 },
  'Australia': { shipping: 130, tariff: 0.05 },
  'Canada': { shipping: 120, tariff: 0.03 },
  'Singapore': { shipping: 90, tariff: 0 },
  'UAE': { shipping: 160, tariff: 0.05 }
}

const FALLBACK_BASE_PRICE = 15

// product.pricing에서 MOQ 할인율 계산
const getMOQDiscount = (quantity, tiers) => {
  if (!tiers || tiers.length === 0) {
    // 폴백: 기존 하드코딩 로직
    if (quantity >= 10000) return 0.15
    if (quantity >= 5000) return 0.10
    if (quantity >= 1000) return 0.05
    return 0
  }
  let discount = 0
  for (const tier of tiers) {
    if (quantity >= tier.minQty) discount = tier.discount
  }
  return discount
}

const CustomerOrderFlow = ({ product, lang, onClose, onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1)

  // product.pricing에서 읽기 (하위호환 유지)
  const productPricing = product.pricing || null
  const basePrice = productPricing?.basePrice || FALLBACK_BASE_PRICE

  // 사용 가능한 국가 목록 결정
  const availableCountries = productPricing
    ? Object.fromEntries(
        Object.entries(productPricing.countryPricing)
          .filter(([_, c]) => c.enabled)
          .map(([name, data]) => [name, { shipping: data.shipping, tariff: data.tariff }])
      )
    : FALLBACK_COUNTRIES

  // Step 1: 국가 & 수량 선택
  const [selectedCountry, setSelectedCountry] = useState('')
  const [quantity, setQuantity] = useState(500)

  // Step 2: 고객 정보
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  })

  // 가격 계산
  const discount = getMOQDiscount(quantity, productPricing?.moqDiscountTiers)

  // 국가별 단가 (countryPricing에 개별 단가가 있으면 사용)
  const getUnitPrice = () => {
    if (productPricing && selectedCountry) {
      const countryData = productPricing.countryPricing[selectedCountry]
      if (countryData?.unitPrice) return countryData.unitPrice
    }
    return basePrice
  }

  const unitPrice = getUnitPrice()
  const discountedPrice = unitPrice * (1 - discount)
  const subtotal = discountedPrice * quantity
  const shipping = selectedCountry && availableCountries[selectedCountry] ? availableCountries[selectedCountry].shipping : 0
  const tariffRate = selectedCountry && availableCountries[selectedCountry] ? availableCountries[selectedCountry].tariff : 0
  const tariff = subtotal * tariffRate
  const total = subtotal + shipping + tariff

  const steps = [
    { num: 1, label: lang === 'ko' ? '국가 & 수량' : 'Country & Quantity' },
    { num: 2, label: lang === 'ko' ? '고객 정보' : 'Customer Info' },
    { num: 3, label: lang === 'ko' ? '주문 확인' : 'Confirmation' }
  ]

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedCountry || quantity < 500) {
        alert(lang === 'ko' ? '국가를 선택하고 최소 수량(500개) 이상 입력해주세요.' : 'Please select a country and enter minimum quantity (500 units).')
        return
      }
    } else if (currentStep === 2) {
      const required = ['name', 'email', 'phone', 'address', 'city']
      const missing = required.filter(field => !customerInfo[field])
      if (missing.length > 0) {
        alert(lang === 'ko' ? '필수 정보를 모두 입력해주세요.' : 'Please fill in all required fields.')
        return
      }
    }
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmitOrder = () => {
    const orderData = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      product: product,
      country: selectedCountry,
      quantity: quantity,
      pricing: {
        basePrice: unitPrice,
        discount,
        discountedPrice,
        subtotal,
        shipping,
        tariff,
        total
      },
      customer: customerInfo,
      status: 'pending'
    }

    // localStorage에 저장
    const existingOrders = JSON.parse(localStorage.getItem('customer_orders') || '[]')
    existingOrders.push(orderData)
    localStorage.setItem('customer_orders', JSON.stringify(existingOrders))

    // 완료 콜백
    onOrderComplete(orderData)
  }

  return (
    <div className="order-flow-overlay">
      <div className="order-flow-container">
        {/* Header */}
        <div className="order-flow-header">
          <h2>{lang === 'ko' ? '주문하기' : 'Place Order'}</h2>
          <button className="order-flow-close" onClick={onClose}>×</button>
        </div>

        {/* Progress Steps */}
        <div className="order-flow-steps">
          {steps.map(step => (
            <div key={step.num} className={`order-step ${currentStep >= step.num ? 'active' : ''} ${currentStep === step.num ? 'current' : ''}`}>
              <div className="step-number">{step.num}</div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="order-flow-content">
          {/* Step 1: 국가 & 수량 */}
          {currentStep === 1 && (
            <div className="order-step-content">
              <h3>{lang === 'ko' ? '배송 국가 및 수량 선택' : 'Select Country & Quantity'}</h3>

              <div className="order-product-summary">
                <img src={product.image} alt={product.name} />
                <div>
                  <h4>{product.name}</h4>
                  <p>{product.category}</p>
                </div>
              </div>

              <div className="form-group">
                <label>{lang === 'ko' ? '배송 국가' : 'Destination Country'} *</label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value="">{lang === 'ko' ? '국가를 선택하세요' : 'Select a country'}</option>
                  {Object.keys(availableCountries).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{lang === 'ko' ? '주문 수량' : 'Order Quantity'} * (MOQ: 500)</label>
                <input
                  type="number"
                  min="500"
                  step="100"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 500)}
                />
              </div>

              {/* 실시간 가격 계산 */}
              {selectedCountry && (
                <div className="price-breakdown">
                  <h4>{lang === 'ko' ? '견적 요약' : 'Price Summary'}</h4>
                  <div className="price-row">
                    <span>{lang === 'ko' ? '단가' : 'Unit Price'}:</span>
                    <span>${unitPrice.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="price-row discount">
                      <span>{lang === 'ko' ? 'MOQ 할인' : 'MOQ Discount'} ({(discount * 100).toFixed(0)}%):</span>
                      <span>-${(unitPrice * discount * quantity).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="price-row">
                    <span>{lang === 'ko' ? '소계' : 'Subtotal'}:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>{lang === 'ko' ? '배송비' : 'Shipping'}:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>{lang === 'ko' ? '관세' : 'Tariff'} ({(tariffRate * 100).toFixed(1)}%):</span>
                    <span>${tariff.toFixed(2)}</span>
                  </div>
                  <div className="price-row total">
                    <span>{lang === 'ko' ? '총액' : 'Total'}:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: 고객 정보 */}
          {currentStep === 2 && (
            <div className="order-step-content">
              <h3>{lang === 'ko' ? '고객 정보 입력' : 'Enter Customer Information'}</h3>

              <div className="form-group">
                <label>{lang === 'ko' ? '이름' : 'Name'} *</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  placeholder={lang === 'ko' ? '이름을 입력하세요' : 'Enter your name'}
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ko' ? '이메일' : 'Email'} *</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ko' ? '전화번호' : 'Phone'} *</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ko' ? '주소' : 'Address'} *</label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  placeholder={lang === 'ko' ? '상세 주소를 입력하세요' : 'Enter street address'}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{lang === 'ko' ? '도시' : 'City'} *</label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                    placeholder={lang === 'ko' ? '도시' : 'City'}
                  />
                </div>

                <div className="form-group">
                  <label>{lang === 'ko' ? '우편번호' : 'Postal Code'}</label>
                  <input
                    type="text"
                    value={customerInfo.postalCode}
                    onChange={(e) => setCustomerInfo({...customerInfo, postalCode: e.target.value})}
                    placeholder={lang === 'ko' ? '우편번호' : 'Postal code'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{lang === 'ko' ? '추가 요청사항' : 'Additional Notes'}</label>
                <textarea
                  rows="4"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                  placeholder={lang === 'ko' ? '추가 요청사항이 있으시면 입력해주세요' : 'Any special requests or notes'}
                />
              </div>
            </div>
          )}

          {/* Step 3: 주문 확인 */}
          {currentStep === 3 && (
            <div className="order-step-content">
              <h3>{lang === 'ko' ? '주문 내역 확인' : 'Order Confirmation'}</h3>

              <div className="confirmation-section">
                <h4>{lang === 'ko' ? '제품 정보' : 'Product Information'}</h4>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '제품명' : 'Product'}:</span>
                  <span>{product.name}</span>
                </div>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '수량' : 'Quantity'}:</span>
                  <span>{quantity} {lang === 'ko' ? '개' : 'units'}</span>
                </div>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '배송국가' : 'Destination'}:</span>
                  <span>{selectedCountry}</span>
                </div>
              </div>

              <div className="confirmation-section">
                <h4>{lang === 'ko' ? '고객 정보' : 'Customer Information'}</h4>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '이름' : 'Name'}:</span>
                  <span>{customerInfo.name}</span>
                </div>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '이메일' : 'Email'}:</span>
                  <span>{customerInfo.email}</span>
                </div>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '전화' : 'Phone'}:</span>
                  <span>{customerInfo.phone}</span>
                </div>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '주소' : 'Address'}:</span>
                  <span>{customerInfo.address}, {customerInfo.city} {customerInfo.postalCode}</span>
                </div>
              </div>

              <div className="confirmation-section">
                <h4>{lang === 'ko' ? '결제 정보' : 'Payment Summary'}</h4>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '소계' : 'Subtotal'}:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '배송비' : 'Shipping'}:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="confirmation-row">
                  <span>{lang === 'ko' ? '관세' : 'Tariff'}:</span>
                  <span>${tariff.toFixed(2)}</span>
                </div>
                <div className="confirmation-row total">
                  <span>{lang === 'ko' ? '총액' : 'Total Amount'}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="order-notice">
                {lang === 'ko'
                  ? '주문 제출 후 Proforma Invoice가 자동으로 생성됩니다. 주문 상태는 마이페이지에서 확인하실 수 있습니다.'
                  : 'A Proforma Invoice will be automatically generated after order submission. You can track your order status in My Account.'}
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="order-flow-footer">
          {currentStep > 1 && (
            <button className="order-btn-secondary" onClick={handleBack}>
              {lang === 'ko' ? '이전' : 'Back'}
            </button>
          )}
          {currentStep < 3 ? (
            <button className="order-btn-primary" onClick={handleNext}>
              {lang === 'ko' ? '다음' : 'Next'}
            </button>
          ) : (
            <button className="order-btn-primary" onClick={handleSubmitOrder}>
              {lang === 'ko' ? '주문 제출' : 'Submit Order'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerOrderFlow
