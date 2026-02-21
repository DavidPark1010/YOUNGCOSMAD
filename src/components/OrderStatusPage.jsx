import { useState, useEffect, useRef } from 'react'
import './OrderStatusPage.css'

// PDF 생성을 위한 유틸리티 함수
const generatePDF = (contentRef, fileName) => {
  const printWindow = window.open('', '_blank')
  const content = contentRef.current.innerHTML

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${fileName}</title>
      <style>
        @page { size: A4; margin: 10mm; }
        body {
          font-family: 'Arial', sans-serif;
          padding: 20px;
          margin: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .invoice-container, .ci-container {
          max-width: 800px;
          margin: 0 auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
        }
        th, td {
          border: 1px solid #333;
          padding: 8px 12px;
          text-align: left;
          font-size: 12px;
        }
        th {
          background: #f5f5f5;
          font-weight: bold;
        }
        .header-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          text-decoration: underline;
        }
        .info-row {
          display: flex;
          margin-bottom: 8px;
        }
        .info-label {
          font-weight: bold;
          min-width: 140px;
        }
        .section { margin: 15px 0; }
        .total-row {
          font-weight: bold;
          background: #f9f9f9;
        }
        .signature-area {
          margin-top: 30px;
          text-align: right;
        }
        @media print {
          body { padding: 0; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() {
            window.close();
          }
        }
      </script>
    </body>
    </html>
  `)
  printWindow.document.close()
}

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
                    <span className="info-label">Invoice No:</span>
                    <span>{order.orderId}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span>{formatDate(order.date)}</span>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">Seller:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>Young Cosmed Co., Ltd.</div>
                    <div>Seoul, South Korea</div>
                    <div>wholesale@youngcosmed.com</div>
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
                  <div><strong>Payment Terms:</strong> 30 days from invoice date</div>
                  <div><strong>Incoterms:</strong> FOB Seoul, South Korea</div>
                  <div><strong>Estimated Delivery:</strong> 7-14 business days</div>
                </div>

                <div className="signature-area">
                  <div>_________________________</div>
                  <div>Authorized Signature</div>
                  <div>Young Cosmed Co., Ltd.</div>
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
                    <span className="info-label">Invoice No:</span>
                    <span>{order.orderId}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span>{formatDate(order.date)}</span>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">Exporter:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div><strong>Young Cosmed Co., Ltd.</strong></div>
                    <div>Seoul, South Korea</div>
                    <div>Tel: +82-2-XXXX-XXXX</div>
                    <div>Email: wholesale@youngcosmed.com</div>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">Consignee:</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div><strong>{order.customer.companyName}</strong></div>
                    <div>{order.customer.contactPerson}</div>
                    <div>{order.customer.address}</div>
                    <div>{order.customer.city} {order.customer.postalCode}</div>
                    <div>{order.country}</div>
                    <div>Tel: {order.customer.phone}</div>
                    <div>Email: {order.customer.email}</div>
                  </div>
                </div>

                <div className="section">
                  <div className="info-row">
                    <span className="info-label">Country of Origin:</span>
                    <span>South Korea</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Port of Loading:</span>
                    <span>Incheon, South Korea</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Final Destination:</span>
                    <span>{order.country}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Terms of Delivery:</span>
                    <span>FOB Incheon</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Terms of Payment:</span>
                    <span>T/T 30 days</span>
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