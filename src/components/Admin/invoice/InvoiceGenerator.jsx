import { useState } from 'react'
import './Invoice.css'

const COMPANY_INFO = {
  name: 'eun young Kwak',
  company: 'YOUNG COSMED',
  address: '69, Seongsui-ro, Seongdong-gu, Seoul, Republic of Korea',
  tel: '+82-10-1234-5678',
  email: 'info@youngcosmed.com',
}

const BANK_INFO = {
  payment: 'T/T in Advance',
  bank: 'KOOKMIN BANK',
  account: '093668-11-025748',
  swift: 'CZNBKRSEXXX',
  holder: 'Kwak Eunyoung',
}

function InvoiceGenerator() {
  const [mode, setMode] = useState('edit') // edit | preview
  const [invoiceType, setInvoiceType] = useState('PI') // PI | CI

  const [buyer, setBuyer] = useState({
    name: '',
    address: '',
    contact: '',
  })

  const [items, setItems] = useState([
    { product: '', qty: '', price: '' },
  ])

  const [shipping, setShipping] = useState({
    method: '',
    cost: '',
  })

  // CI-only fields
  const [ciFields, setCiFields] = useState({
    portOfLoading: 'KOREA',
    destination: '',
    packages: '',
    weight: '',
    hsCode: '',
  })

  // === Computed ===
  const getSubtotal = (item) => {
    const qty = parseFloat(item.qty) || 0
    const price = parseFloat(item.price) || 0
    return qty * price
  }

  const itemsTotal = items.reduce((sum, item) => sum + getSubtotal(item), 0)
  const shippingCost = parseFloat(shipping.cost) || 0
  const grandTotal = itemsTotal + shippingCost

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const refNo = `EY${dateStr}`

  // === Handlers ===
  const updateBuyer = (field, value) => {
    setBuyer(prev => ({ ...prev, [field]: value }))
  }

  const updateItem = (index, field, value) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const addItem = () => {
    setItems(prev => [...prev, { product: '', qty: '', price: '' }])
  }

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index))
    }
  }

  const updateCiField = (field, value) => {
    setCiFields(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = () => {
    setMode('preview')
  }

  const handleEdit = () => {
    setMode('edit')
  }

  const handlePrint = () => {
    window.print()
  }

  const formatCurrency = (num) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  }

  // === Edit Mode ===
  if (mode === 'edit') {
    return (
      <div className="inv-container">
        {/* Type Toggle */}
        <div className="inv-type-toggle">
          <button
            className={`inv-type-btn ${invoiceType === 'PI' ? 'active' : ''}`}
            onClick={() => setInvoiceType('PI')}
          >
            PI (견적서)
          </button>
          <button
            className={`inv-type-btn ${invoiceType === 'CI' ? 'active' : ''}`}
            onClick={() => setInvoiceType('CI')}
          >
            CI (상업송장)
          </button>
        </div>

        {/* Buyer Info */}
        <div className="inv-section">
          <h3 className="inv-section-title">바이어 정보</h3>
          <div className="inv-fields">
            <div className="inv-field">
              <label>이름/회사</label>
              <input
                type="text"
                value={buyer.name}
                onChange={(e) => updateBuyer('name', e.target.value)}
                placeholder="예: ABC Trading Co."
              />
            </div>
            <div className="inv-field">
              <label>주소</label>
              <input
                type="text"
                value={buyer.address}
                onChange={(e) => updateBuyer('address', e.target.value)}
                placeholder="예: 123 Main St, Bangkok, Thailand"
              />
            </div>
            <div className="inv-field">
              <label>연락처</label>
              <input
                type="text"
                value={buyer.contact}
                onChange={(e) => updateBuyer('contact', e.target.value)}
                placeholder="예: +66-2-123-4567"
              />
            </div>
          </div>
        </div>

        {/* Product Items */}
        <div className="inv-section">
          <h3 className="inv-section-title">제품 목록</h3>
          <div className="inv-table-wrap">
            <table className="inv-table">
              <thead>
                <tr>
                  <th className="inv-th-no">No</th>
                  <th className="inv-th-product">제품명</th>
                  <th className="inv-th-qty">수량</th>
                  <th className="inv-th-price">단가 (US$)</th>
                  <th className="inv-th-subtotal">소계 (US$)</th>
                  <th className="inv-th-action"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="inv-td-no">{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="inv-table-input"
                        value={item.product}
                        onChange={(e) => updateItem(index, 'product', e.target.value)}
                        placeholder="제품명"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="inv-table-input inv-input-num"
                        value={item.qty}
                        onChange={(e) => updateItem(index, 'qty', e.target.value)}
                        placeholder="0"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="inv-table-input inv-input-num"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', e.target.value)}
                        placeholder="0"
                        step="0.01"
                      />
                    </td>
                    <td className="inv-td-subtotal">
                      {formatCurrency(getSubtotal(item))}
                    </td>
                    <td>
                      {items.length > 1 && (
                        <button
                          className="inv-row-delete"
                          onClick={() => removeItem(index)}
                        >
                          x
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="inv-add-row" onClick={addItem}>
            + 행 추가
          </button>
        </div>

        {/* Shipping */}
        <div className="inv-section">
          <h3 className="inv-section-title">배송비</h3>
          <div className="inv-shipping-row">
            <div className="inv-field">
              <label>배송 방법</label>
              <input
                type="text"
                value={shipping.method}
                onChange={(e) => setShipping(prev => ({ ...prev, method: e.target.value }))}
                placeholder="예: EMS, DHL, Sea Freight"
              />
            </div>
            <div className="inv-field">
              <label>US$</label>
              <input
                type="number"
                value={shipping.cost}
                onChange={(e) => setShipping(prev => ({ ...prev, cost: e.target.value }))}
                placeholder="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="inv-total-box">
          <span className="inv-total-label">TOTAL</span>
          <span className="inv-total-amount">US$ {formatCurrency(grandTotal)}</span>
        </div>

        {/* CI-only fields */}
        {invoiceType === 'CI' && (
          <div className="inv-section inv-ci-section">
            <h3 className="inv-section-title">CI 추가 정보</h3>
            <div className="inv-fields-grid">
              <div className="inv-field">
                <label>출발항</label>
                <input
                  type="text"
                  value={ciFields.portOfLoading}
                  onChange={(e) => updateCiField('portOfLoading', e.target.value)}
                />
              </div>
              <div className="inv-field">
                <label>도착지</label>
                <input
                  type="text"
                  value={ciFields.destination}
                  onChange={(e) => updateCiField('destination', e.target.value)}
                  placeholder="예: Bangkok, Thailand"
                />
              </div>
              <div className="inv-field">
                <label>패키지</label>
                <input
                  type="text"
                  value={ciFields.packages}
                  onChange={(e) => updateCiField('packages', e.target.value)}
                  placeholder="예: 3 cartons"
                />
              </div>
              <div className="inv-field">
                <label>무게</label>
                <input
                  type="text"
                  value={ciFields.weight}
                  onChange={(e) => updateCiField('weight', e.target.value)}
                  placeholder="예: 15.5 kg"
                />
              </div>
              <div className="inv-field">
                <label>HS코드</label>
                <input
                  type="text"
                  value={ciFields.hsCode}
                  onChange={(e) => updateCiField('hsCode', e.target.value)}
                  placeholder="예: 3304.99"
                />
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="inv-generate-wrap">
          <button className="inv-generate-btn" onClick={handleGenerate}>
            인보이스 생성
          </button>
        </div>
      </div>
    )
  }

  // === Preview Mode ===
  const invoiceTitle = invoiceType === 'PI' ? 'PROFORMA INVOICE' : 'COMMERCIAL INVOICE'

  return (
    <div className="inv-preview-wrap">
      {/* Preview Controls */}
      <div className="inv-preview-controls no-print">
        <button className="inv-back-btn" onClick={handleEdit}>
          ← 수정하기
        </button>
        <button className="inv-print-btn" onClick={handlePrint}>
          인쇄/저장
        </button>
      </div>

      {/* Invoice Document */}
      <div className="inv-document">
        <h1 className="inv-doc-title">{invoiceTitle}</h1>

        {/* Header Info */}
        <div className="inv-doc-header">
          <div className="inv-doc-from">
            <div className="inv-doc-label">From:</div>
            <div>{COMPANY_INFO.name}</div>
            <div>{COMPANY_INFO.company}</div>
            <div>{COMPANY_INFO.address}</div>
            <div>{COMPANY_INFO.email}</div>
          </div>
          <div className="inv-doc-to">
            <div className="inv-doc-label">To:</div>
            <div>{buyer.name || '-'}</div>
            <div>{buyer.address || '-'}</div>
            <div>{buyer.contact || '-'}</div>
          </div>
        </div>

        <div className="inv-doc-meta">
          <div><span className="inv-doc-label">Date:</span> {dateStr}</div>
          <div><span className="inv-doc-label">Ref:</span> {refNo}</div>
        </div>

        {/* CI additional info */}
        {invoiceType === 'CI' && (
          <div className="inv-doc-ci-info">
            <div><span className="inv-doc-label">Port of Loading:</span> {ciFields.portOfLoading}</div>
            <div><span className="inv-doc-label">Destination:</span> {ciFields.destination || '-'}</div>
            <div><span className="inv-doc-label">Packages:</span> {ciFields.packages || '-'}</div>
            <div><span className="inv-doc-label">Weight:</span> {ciFields.weight || '-'}</div>
            {ciFields.hsCode && <div><span className="inv-doc-label">HS Code:</span> {ciFields.hsCode}</div>}
          </div>
        )}

        {/* Items Table */}
        <table className="inv-doc-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price (US$)</th>
              <th>Amount (US$)</th>
            </tr>
          </thead>
          <tbody>
            {items.filter(item => item.product).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product}</td>
                <td>{item.qty}</td>
                <td>{formatCurrency(parseFloat(item.price) || 0)}</td>
                <td>{formatCurrency(getSubtotal(item))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="inv-doc-totals">
          {shippingCost > 0 && (
            <div className="inv-doc-total-row">
              <span>Delivery Fee{shipping.method ? ` (${shipping.method})` : ''}:</span>
              <span>US$ {formatCurrency(shippingCost)}</span>
            </div>
          )}
          <div className="inv-doc-total-row inv-doc-grand-total">
            <span>TOTAL:</span>
            <span>US$ {formatCurrency(grandTotal)}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="inv-doc-payment">
          <div className="inv-doc-label">Payment Terms</div>
          <div>Payment: {BANK_INFO.payment}</div>
          <div>Bank: {BANK_INFO.bank}</div>
          <div>A/C: {BANK_INFO.account}</div>
          <div>Swift: {BANK_INFO.swift}</div>
        </div>

        {/* Signature */}
        <div className="inv-doc-signature">
          <div>{BANK_INFO.holder}, CEO</div>
          <div>{COMPANY_INFO.company}</div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceGenerator
