import { useState } from 'react'
import { REGIONS, DEFAULT_COUNTRY_DATA } from '../constants/countryData'

function Step3CountryPricing({ formData, updateField, errors }) {
  const pricing = formData.pricing
  const [previewCountry, setPreviewCountry] = useState('USA')
  const [previewQty, setPreviewQty] = useState(500)

  // pricing 업데이트 헬퍼
  const updatePricing = (updates) => {
    updateField('pricing', { ...pricing, ...updates })
  }

  const updateCountry = (country, updates) => {
    updatePricing({
      countryPricing: {
        ...pricing.countryPricing,
        [country]: { ...pricing.countryPricing[country], ...updates }
      }
    })
  }

  // MOQ 할인 티어 관리
  const addDiscountTier = () => {
    const lastTier = pricing.moqDiscountTiers[pricing.moqDiscountTiers.length - 1]
    updatePricing({
      moqDiscountTiers: [
        ...pricing.moqDiscountTiers,
        { minQty: (lastTier?.minQty || 0) + 5000, discount: (lastTier?.discount || 0) + 0.05 }
      ]
    })
  }

  const updateTier = (index, field, value) => {
    const newTiers = [...pricing.moqDiscountTiers]
    newTiers[index] = { ...newTiers[index], [field]: value }
    updatePricing({ moqDiscountTiers: newTiers })
  }

  const removeTier = (index) => {
    updatePricing({
      moqDiscountTiers: pricing.moqDiscountTiers.filter((_, i) => i !== index)
    })
  }

  // 지역 빠른 선택
  const toggleRegion = (regionName) => {
    const regionCountries = REGIONS[regionName] || []
    const allEnabled = regionCountries.every(c => pricing.countryPricing[c]?.enabled)

    const newCountryPricing = { ...pricing.countryPricing }
    regionCountries.forEach(country => {
      if (newCountryPricing[country]) {
        newCountryPricing[country] = { ...newCountryPricing[country], enabled: !allEnabled }
      }
    })
    updatePricing({ countryPricing: newCountryPricing })
  }

  const toggleAll = () => {
    const allCountries = Object.keys(pricing.countryPricing)
    const allEnabled = allCountries.every(c => pricing.countryPricing[c]?.enabled)
    const newCountryPricing = { ...pricing.countryPricing }
    allCountries.forEach(country => {
      newCountryPricing[country] = { ...newCountryPricing[country], enabled: !allEnabled }
    })
    updatePricing({ countryPricing: newCountryPricing })
  }

  // 바이어 미리보기 계산
  const getPreviewCalc = () => {
    const countryData = pricing.countryPricing[previewCountry]
    if (!countryData || !pricing.basePrice) return null

    const unitPrice = countryData.unitPrice || pricing.basePrice
    let discount = 0
    for (const tier of pricing.moqDiscountTiers) {
      if (previewQty >= tier.minQty) discount = tier.discount
    }
    const discountedPrice = unitPrice * (1 - discount)
    const subtotal = discountedPrice * previewQty
    const shipping = countryData.shipping
    const tariffAmount = subtotal * countryData.tariff
    const total = subtotal + shipping + tariffAmount

    return { unitPrice, discount, discountedPrice, subtotal, shipping, tariffRate: countryData.tariff, tariffAmount, total }
  }

  const previewCalc = getPreviewCalc()

  // 활성화된 국가 목록 (미리보기 드롭다운용)
  const enabledCountries = Object.entries(pricing.countryPricing)
    .filter(([_, data]) => data.enabled)
    .map(([name]) => name)

  return (
    <div className="pr-section-simple">
      <div className="pr-section-intro">
        <p>기본 단가, MOQ 할인, 국가별 배송비/관세를 설정합니다.</p>
      </div>

      {/* 기본 가격 설정 */}
      <div className="pr-pricing-section">
        <h3 className="pr-pricing-title">기본 가격 설정</h3>
        <div className="pr-form-grid">
          <div className="pr-field required">
            <label>기본 단가 (USD)</label>
            <div className="pr-input-with-unit">
              <span className="pr-input-prefix">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={pricing.basePrice || ''}
                onChange={(e) => updatePricing({ basePrice: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className={errors.basePrice ? 'error' : ''}
              />
            </div>
            {errors.basePrice && <span className="error-text">{errors.basePrice}</span>}
          </div>
        </div>

        {/* MOQ 할인 테이블 */}
        <div className="pr-discount-table" style={{ marginTop: 24 }}>
          <label className="pr-field-label">MOQ 할인 테이블</label>
          <table className="pr-table">
            <thead>
              <tr>
                <th>최소수량</th>
                <th>할인율</th>
                <th>적용단가 (자동계산)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pricing.moqDiscountTiers.map((tier, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={tier.minQty}
                      onChange={(e) => updateTier(index, 'minQty', parseInt(e.target.value) || 0)}
                      className="pr-table-input"
                    />
                  </td>
                  <td>
                    <div className="pr-input-with-unit compact">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        value={Math.round(tier.discount * 100)}
                        onChange={(e) => updateTier(index, 'discount', (parseInt(e.target.value) || 0) / 100)}
                        className="pr-table-input"
                      />
                      <span className="pr-input-unit">%</span>
                    </div>
                  </td>
                  <td className="pr-table-calc">
                    ${pricing.basePrice ? (pricing.basePrice * (1 - tier.discount)).toFixed(2) : '—'}
                  </td>
                  <td>
                    <button type="button" className="pr-table-remove" onClick={() => removeTier(index)}>
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="pr-add-btn" onClick={addDiscountTier} style={{ marginTop: 8 }}>
            + 할인 추가
          </button>
        </div>
      </div>

      {/* 국가별 가격 테이블 */}
      <div className="pr-pricing-section" style={{ marginTop: 32 }}>
        <h3 className="pr-pricing-title">국가별 가격 테이블</h3>

        {/* 빠른 선택 */}
        <div className="pr-quick-select">
          <span className="pr-quick-label">빠른선택:</span>
          <button type="button" className="pr-quick-btn" onClick={toggleAll}>전체</button>
          {Object.keys(REGIONS).map(region => (
            <button key={region} type="button" className="pr-quick-btn" onClick={() => toggleRegion(region)}>
              {region}
            </button>
          ))}
        </div>

        {/* 지역별 국가 테이블 */}
        {Object.entries(REGIONS).map(([regionName, countries]) => {
          const regionCountries = countries.filter(c => pricing.countryPricing[c])
          if (regionCountries.length === 0) return null

          return (
            <div key={regionName} className="pr-country-region">
              <div className="pr-region-header">{regionName}</div>
              <table className="pr-country-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}></th>
                    <th>국가</th>
                    <th>단가 (USD)</th>
                    <th>배송비 (USD)</th>
                    <th>관세율</th>
                  </tr>
                </thead>
                <tbody>
                  {regionCountries.map(country => {
                    const data = pricing.countryPricing[country]
                    return (
                      <tr key={country} className={data.enabled ? '' : 'disabled-row'}>
                        <td>
                          <input
                            type="checkbox"
                            checked={data.enabled}
                            onChange={() => updateCountry(country, { enabled: !data.enabled })}
                            className="pr-country-check"
                          />
                        </td>
                        <td className="pr-country-name">{country}</td>
                        <td>
                          <div className="pr-input-with-unit compact">
                            <span className="pr-input-prefix">$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={data.unitPrice ?? ''}
                              onChange={(e) => updateCountry(country, { unitPrice: e.target.value ? parseFloat(e.target.value) : null })}
                              placeholder={pricing.basePrice ? pricing.basePrice.toFixed(2) : '—'}
                              className="pr-table-input"
                              disabled={!data.enabled}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="pr-input-with-unit compact">
                            <span className="pr-input-prefix">$</span>
                            <input
                              type="number"
                              step="1"
                              value={data.shipping}
                              onChange={(e) => updateCountry(country, { shipping: parseInt(e.target.value) || 0 })}
                              className="pr-table-input"
                              disabled={!data.enabled}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="pr-input-with-unit compact">
                            <input
                              type="number"
                              step="0.1"
                              value={(data.tariff * 100).toFixed(1)}
                              onChange={(e) => updateCountry(country, { tariff: (parseFloat(e.target.value) || 0) / 100 })}
                              className="pr-table-input"
                              disabled={!data.enabled}
                            />
                            <span className="pr-input-unit">%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>

      {/* 바이어 미리보기 */}
      <div className="pr-pricing-section" style={{ marginTop: 32 }}>
        <h3 className="pr-pricing-title">바이어 미리보기</h3>
        <p className="pr-field-desc">선택한 국가 기준으로 바이어가 보게 될 견적을 미리 확인합니다.</p>

        <div className="pr-preview-controls">
          <div className="pr-field">
            <label>미리보기 국가</label>
            <select
              value={previewCountry}
              onChange={(e) => setPreviewCountry(e.target.value)}
            >
              {enabledCountries.length === 0 && <option value="">활성화된 국가 없음</option>}
              {enabledCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="pr-field">
            <label>수량</label>
            <input
              type="number"
              min="1"
              step="100"
              value={previewQty}
              onChange={(e) => setPreviewQty(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        {previewCalc ? (
          <div className="pr-buyer-preview">
            <div className="pr-preview-row">
              <span>단가:</span>
              <span>${previewCalc.unitPrice.toFixed(2)}</span>
            </div>
            {previewCalc.discount > 0 && (
              <div className="pr-preview-row discount">
                <span>MOQ 할인 ({(previewCalc.discount * 100).toFixed(0)}%):</span>
                <span>-${(previewCalc.unitPrice * previewCalc.discount * previewQty).toFixed(2)}</span>
              </div>
            )}
            <div className="pr-preview-row">
              <span>소계 ({previewQty.toLocaleString()}개):</span>
              <span>${previewCalc.subtotal.toFixed(2)}</span>
            </div>
            <div className="pr-preview-row">
              <span>배송비:</span>
              <span>${previewCalc.shipping.toFixed(2)}</span>
            </div>
            <div className="pr-preview-row">
              <span>관세 ({(previewCalc.tariffRate * 100).toFixed(1)}%):</span>
              <span>${previewCalc.tariffAmount.toFixed(2)}</span>
            </div>
            <div className="pr-preview-divider" />
            <div className="pr-preview-row total">
              <span>총액:</span>
              <span>${previewCalc.total.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="pr-buyer-preview empty">
            <p>기본 단가를 입력하고 국가를 활성화하면 미리보기가 표시됩니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3CountryPricing
