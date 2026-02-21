import { useState, useEffect, useRef } from 'react'
import './OrderStatusPage.css'
import generatePDF from '../../utils/generatePdf'

// 날짜 포맷 함수
const formatDate = (dateString) => {
  const d = new Date(dateString)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const OrderStatusPage = ({ orderId, lang, onClose }) => {
  const [order, setOrder] = useState(null)
  const [activeDocument, setActiveDocument] = useState('status') // 'status', 'invoice', 'ci'
  const invoiceRef = useRef(null)
  const ciRef = useRef(null)

  useEffect(() => {
    // localStorage에서 주문 데이터 로드
    const orders = JSON.parse(localStorage.getItem('customer_orders') || '[]')
    const foundOrder = orders.find(o => o.orderId === orderId)
    setOrder(foundOrder)
  }, [orderId])

  if (!order) {
    return (
      <div className="order-status-overlay">
        <div className="order-status-container">
          <div className="order-status-header">
            <h2>{lang === 'ko' ? '주문을 찾을 수 없습니다' : 'Order Not Found'}</h2>
            <button className="order-status-close" onClick={onClose}>×</button>
          </div>
        </div>
      </div>
    )
  }

  const handleDownloadInvoice = () => {
    generatePDF(invoiceRef, `Proforma_Invoice_${order.orderId}.pdf`)
  }

  const handleDownloadCI = () => {
    generatePDF(ciRef, `Commercial_Invoice_${order.orderId}.pdf`)
  }

  return (
    <div className="order-status-overlay">
      <div className="order-status-container">
        {/* Header */}
        <div className="order-status-header">
          <h2>{lang === 'ko' ? '주문 상세' : 'Order Details'}</h2>
          <button className="order-status-close" onClick={onClose}>×</button>
        </div>

        {/* Tabs */}
        <div className="order-status-tabs">
          <button
            className={`status-tab ${activeDocument === 'status' ? 'active' : ''}`}
            onClick={() => setActiveDocument('status')}
          >
            {lang === 'ko' ? '주문 상태' : 'Order Status'}
          </button>
          <button
            className={`status-tab ${activeDocument === 'invoice' ? 'active' : ''}`}
            onClick={() => setActiveDocument('invoice')}
          >
            {lang === 'ko' ? 'Proforma Invoice' : 'Proforma Invoice'}
          </button>
          <button
            className={`status-tab ${activeDocument === 'ci' ? 'active' : ''}`}
            onClick={() => setActiveDocument('ci')}
          >
            {lang === 'ko' ? 'Commercial Invoice' : 'Commercial Invoice'}
          </button>
        </div>

        {/* Content */}
        <div className="order-status-content">
          {/* Order Status View */}
          {activeDocument === 'status' && (
            <div className="status-view">
              <div className="status-badge">
                <span className={`badge badge-${order.status}`}>
                  {order.status === 'pending' && (lang === 'ko' ? '처리 대기 중' : 'Pending')}
                  {order.status === 'confirmed' && (lang === 'ko' ? '주문 확정' : 'Confirmed')}
                  {order.status === 'shipped' && (lang === 'ko' ? '배송 중' : 'Shipped')}
                  {order.status === 'delivered' && (lang === 'ko' ? '배송 완료' : 'Delivered')}
                </span>
              </div>

              <div className="status-section">
                <h3>{lang === 'ko' ? '주문 정보' : 'Order Information'}</h3>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '주문번호' : 'Order ID'}:</span>
                  <span className="status-value">{order.orderId}</span>
                </div>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '주문일자' : 'Order Date'}:</span>
                  <span className="status-value">{formatDate(order.date)}</span>
                </div>
              </div>

              <div className="status-section">
                <h3>{lang === 'ko' ? '제품 정보' : 'Product Information'}</h3>
                <div className="order-product-card">
                  <img src={order.product.image} alt={order.product.name} />
                  <div>
                    <h4>{order.product.name}</h4>
                    <p>{order.quantity} {lang === 'ko' ? '개' : 'units'}</p>
                  </div>
                </div>
              </div>

              <div className="status-section">
                <h3>{lang === 'ko' ? '배송 정보' : 'Shipping Information'}</h3>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '수령인' : 'Recipient'}:</span>
                  <span className="status-value">{order.customer.contactPerson}</span>
                </div>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '회사명' : 'Company'}:</span>
                  <span className="status-value">{order.customer.companyName}</span>
                </div>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '배송지' : 'Address'}:</span>
                  <span className="status-value">
                    {order.customer.address}, {order.customer.city} {order.customer.postalCode}, {order.country}
                  </span>
                </div>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '연락처' : 'Contact'}:</span>
                  <span className="status-value">{order.customer.phone}</span>
                </div>
              </div>

              <div className="status-section">
                <h3>{lang === 'ko' ? '결제 요약' : 'Payment Summary'}</h3>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '소계' : 'Subtotal'}:</span>
                  <span className="status-value">${order.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '배송비' : 'Shipping'}:</span>
                  <span className="status-value">${order.pricing.shipping.toFixed(2)}</span>
                </div>
                <div className="status-row">
                  <span className="status-label">{lang === 'ko' ? '관세' : 'Tariff'}:</span>
                  <span className="status-value">${order.pricing.tariff.toFixed(2)}</span>
                </div>
                <div className="status-row total">
                  <span className="status-label">{lang === 'ko' ? '총액' : 'Total'}:</span>
                  <span className="status-value">${order.pricing.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Proforma Invoice View */}
          {activeDocument === 'invoice' && (
            <div className="document-view">
              <div className="document-actions">
                <button className="doc-download-btn" onClick={handleDownloadInvoice}>
                  {lang === 'ko' ? 'PDF 다운로드' : 'Download PDF'}
                </button>
              </div>

              <div ref={invoiceRef} className="invoice-container">
                <div className="header-title">PROFORMA INVOICE</div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">From:</span>
                    <span>69, Seongsui-ro, Seongdong-gu, Republic of Korea</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label"></span>
                    <span>eun young Kwak</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label"></span>
                    <span>South Korea</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Contact:</span>
                    <span>+8210 63010851</span>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span>{formatDate(order.date)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Ref No:</span>
                    <span>{order.orderId}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label"></span>
                    <span>{order.country}</span>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">Buyer:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>{order.customer.companyName}</div>
                    <div>{order.customer.contactPerson}</div>
                    <div>{order.customer.address}, {order.customer.city} {order.customer.postalCode}</div>
                    <div>{order.country}</div>
                    <div>{order.customer.email}</div>
                    <div>{order.customer.phone}</div>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price (USD)</th>
                      <th>Total (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{order.product.name}</td>
                      <td>{order.quantity}</td>
                      <td>${order.pricing.discountedPrice.toFixed(2)}</td>
                      <td>${order.pricing.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'right' }}>Shipping Fee:</td>
                      <td>${order.pricing.shipping.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'right' }}>Estimated Tariff:</td>
                      <td>${order.pricing.tariff.toFixed(2)}</td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan="3" style={{ textAlign: 'right' }}>TOTAL:</td>
                      <td>${order.pricing.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="section" style={{ marginTop: '30px' }}>
                  <div><strong>Payment Term:</strong> T/T in Advance</div>
                  <div><strong>Estimated Delivery:</strong> After receipt of payment</div>
                  <div><strong>Shipment:</strong> Forwarder</div>
                  <div><strong>Validity:</strong> 1 WEEK</div>
                  <div><strong>Warranty:</strong> 1 YEAR</div>
                </div>

                <div className="section" style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                  <div><strong>Bank Name:</strong> KOOKMIN BANK</div>
                  <div><strong>Bank Address:</strong> 26, Gukjegeumyung-ro 8-gil, Yeongdeungpo-gu, Seoul, Korea</div>
                  <div><strong>A/C Name:</strong> Kwak Eunyoung</div>
                  <div><strong>A/C No.:</strong> 093868-11-025748(영 코스메드)</div>
                  <div><strong>Swift code:</strong> CZNBKRSEXXX</div>
                </div>

                <div className="signature-area">
                  <div style={{ marginTop: '40px' }}>Accepted By</div>
                  <div style={{ marginTop: '10px' }}>_________________________</div>
                  <div><strong>Name:</strong> Kwak Eunyoung</div>
                  <div><strong>Title:</strong> CEO</div>
                </div>
              </div>
            </div>
          )}

          {/* Commercial Invoice View */}
          {activeDocument === 'ci' && (
            <div className="document-view">
              <div className="document-actions">
                <button className="doc-download-btn" onClick={handleDownloadCI}>
                  {lang === 'ko' ? 'PDF 다운로드' : 'Download PDF'}
                </button>
              </div>

              <div ref={ciRef} className="ci-container">
                <div className="header-title">COMMERCIAL INVOICE</div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">1. Shipper/Exporter:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>eun young Kwak</div>
                    <div>69, Seongsui-ro, Seongdong-gu, Republic of Korea</div>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">2. Buyer/Consignee:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div><strong>{order.customer.contactPerson}</strong></div>
                    <div>{order.customer.companyName}</div>
                    <div>{order.customer.address}, {order.customer.city} {order.customer.postalCode}</div>
                    <div>{order.country}</div>
                    <div>Tel: {order.customer.phone}</div>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">3. Notify Party:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>SAME AS ABOVE</div>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">8. NO. & Date of Invoice:</span>
                    <span>{order.orderId}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label"></span>
                    <span>{formatDate(order.date)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">9. Terms of Payment:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>T/T ADVANCE</div>
                    <div>INCOTERMS: EXWork</div>
                  </div>
                  <div className="info-row">
                    <span className="info-label">10. Remark:</span>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">11. Other Reference:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>Customs Code: 3304-99-9000</div>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">4. Port of Loading:</span>
                    <span>KOREA</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">5. Final Destination:</span>
                    <span>{order.country}</span>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">6. Vessel:</span>
                    <span></span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">7. Sailing on or about:</span>
                    <span></span>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Item No.</th>
                      <th>Description of Goods</th>
                      <th>HS Code</th>
                      <th>Quantity</th>
                      <th>Unit Price (USD)</th>
                      <th>Total Value (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{order.product.name}<br/>Cosmetic Product</td>
                      <td>3304.99</td>
                      <td>{order.quantity} units</td>
                      <td>${order.pricing.discountedPrice.toFixed(2)}</td>
                      <td>${order.pricing.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan="5" style={{ textAlign: 'right' }}><strong>TOTAL FOB VALUE:</strong></td>
                      <td><strong>${order.pricing.subtotal.toFixed(2)}</strong></td>
                    </tr>
                  </tbody>
                </table>

                <div className="section" style={{ marginTop: '30px' }}>
                  <div><strong>Total Gross Weight:</strong> {(order.quantity * 0.15).toFixed(2)} kg (approx.)</div>
                  <div><strong>Total Net Weight:</strong> {(order.quantity * 0.12).toFixed(2)} kg (approx.)</div>
                  <div><strong>Number of Packages:</strong> {Math.ceil(order.quantity / 100)} cartons</div>
                </div>

                <div className="section" style={{ marginTop: '20px', fontSize: '12px' }}>
                  <div><strong>Declaration:</strong></div>
                  <div>We hereby certify that this invoice shows the actual price of the goods described, that no other invoice has been or will be issued, and that all particulars are true and correct.</div>
                </div>

                <div className="signature-area">
                  <div>_________________________</div>
                  <div>Authorized Signature & Company Stamp</div>
                  <div>Young Cosmed Co., Ltd.</div>
                  <div>{formatDate(order.date)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="order-status-footer">
          <button className="status-close-btn" onClick={onClose}>
            {lang === 'ko' ? '닫기' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderStatusPage