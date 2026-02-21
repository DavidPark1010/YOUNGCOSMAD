import { useEffect, useRef } from 'react'
import './PaymentInstructionsPage.css'
import { companyInfo } from '../admin/constants/companyInfo'
import generatePDF from '../../utils/generatePdf'

const formatDate = (dateString) => {
  const d = new Date(dateString)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const PaymentInstructionsPage = ({ orderData, lang, onClose, onTrackOrder }) => {
  const invoiceRef = useRef(null)

  // ESC 키 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleDownloadPI = () => {
    generatePDF(invoiceRef, `Proforma_Invoice_${orderData.orderId}.pdf`)
  }

  const t = lang === 'ko'
    ? {
        backToShop: '쇼핑으로 돌아가기',
        successTitle: 'Order Submitted Successfully',
        orderReceived: `주문번호 ${orderData.orderId}이(가) 접수되었습니다.`,
        pleaseTransfer: '아래 계좌로 송금을 완료해주세요.',
        paymentInfo: 'PAYMENT INFORMATION',
        totalDue: 'Total Amount Due',
        method: 'Payment Method',
        methodValue: 'T/T (Wire Transfer)',
        bankName: 'Bank Name',
        accountName: 'Account Name',
        accountNo: 'Account No.',
        swiftCode: 'SWIFT Code',
        notice: `송금 시 주문번호(${orderData.orderId})를 메모에 포함해주세요.`,
        orderSummary: 'ORDER SUMMARY',
        product: 'Product',
        quantity: 'Quantity',
        units: '개',
        country: 'Country',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        tariff: 'Tariff',
        total: 'Total',
        nextSteps: 'WHAT HAPPENS NEXT',
        step1: '위 계좌로 송금을 완료해주세요',
        step2: '송금 시 주문번호를 메모에 포함해주세요',
        step3: '1-2 영업일 내 입금 확인',
        step4: '확인 후 상품 준비 및 배송',
        downloadPI: 'Download Proforma Invoice',
        trackOrder: 'Track Your Order',
        support: '도움이 필요하시면',
        contactSupport: '고객지원'
      }
    : {
        backToShop: 'Back to Shop',
        successTitle: 'Order Submitted Successfully',
        orderReceived: `Order ${orderData.orderId} has been received.`,
        pleaseTransfer: 'Please complete the wire transfer to the account below.',
        paymentInfo: 'PAYMENT INFORMATION',
        totalDue: 'Total Amount Due',
        method: 'Payment Method',
        methodValue: 'T/T (Wire Transfer)',
        bankName: 'Bank Name',
        accountName: 'Account Name',
        accountNo: 'Account No.',
        swiftCode: 'SWIFT Code',
        notice: `Please include your order number (${orderData.orderId}) in the transfer memo.`,
        orderSummary: 'ORDER SUMMARY',
        product: 'Product',
        quantity: 'Quantity',
        units: 'units',
        country: 'Country',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        tariff: 'Tariff',
        total: 'Total',
        nextSteps: 'WHAT HAPPENS NEXT',
        step1: 'Complete the wire transfer to the account above',
        step2: 'Include the order number in the transfer memo',
        step3: 'Payment confirmed within 1-2 business days',
        step4: 'Order prepared and shipped after confirmation',
        downloadPI: 'Download Proforma Invoice',
        trackOrder: 'Track Your Order',
        support: 'Need help?',
        contactSupport: 'Contact Support'
      }

  const tariffRate = orderData.pricing.tariff > 0
    ? ` (${((orderData.pricing.tariff / orderData.pricing.subtotal) * 100).toFixed(1)}%)`
    : ''

  return (
    <div className="payment-instructions-overlay">
      <div className="payment-instructions-container">
        {/* Header */}
        <div className="pi-header">
          <button className="pi-back-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" />
            </svg>
            {t.backToShop}
          </button>
          <button className="pi-close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Content */}
        <div className="pi-content">
          <div className="pi-inner">
            {/* Success Banner */}
            <div className="pi-success-banner">
              <div className="pi-check-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 14l6 6L22 8" />
                </svg>
              </div>
              <h1 className="pi-success-title">{t.successTitle}</h1>
              <p className="pi-success-orderId">{t.orderReceived}</p>
              <p className="pi-success-subtitle">{t.pleaseTransfer}</p>
            </div>

            {/* Payment Information Card */}
            <div className="pi-section-label">{t.paymentInfo}</div>
            <div className="pi-payment-card">
              <div className="pi-payment-total">
                <span className="pi-payment-total-label">{t.totalDue}</span>
                <span className="pi-payment-total-value">${orderData.pricing.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="pi-payment-details">
                <div className="pi-payment-row">
                  <span>{t.method}</span>
                  <span>{t.methodValue}</span>
                </div>
                <div className="pi-payment-row">
                  <span>{t.bankName}</span>
                  <span>{companyInfo.bankName}</span>
                </div>
                <div className="pi-payment-row">
                  <span>{t.accountName}</span>
                  <span>{companyInfo.accountName}</span>
                </div>
                <div className="pi-payment-row">
                  <span>{t.accountNo}</span>
                  <span>{companyInfo.accountNo}</span>
                </div>
                <div className="pi-payment-row">
                  <span>{t.swiftCode}</span>
                  <span>{companyInfo.swiftCode}</span>
                </div>
              </div>
              <div className="pi-payment-notice">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="7" />
                  <path d="M8 5v3M8 10.5v.5" />
                </svg>
                <span>{t.notice}</span>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="pi-section-label">{t.orderSummary}</div>
            <div className="pi-order-summary">
              <div className="pi-summary-product">
                {orderData.product.image && (
                  <img src={orderData.product.image} alt={orderData.product.name} />
                )}
                <div className="pi-summary-product-info">
                  <h4>{orderData.product.name}</h4>
                  <p>{orderData.quantity.toLocaleString()} {t.units} &middot; {orderData.country}</p>
                </div>
              </div>
              <div className="pi-summary-rows">
                <div className="pi-summary-row">
                  <span>{t.subtotal}</span>
                  <span>${orderData.pricing.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pi-summary-row">
                  <span>{t.shipping}</span>
                  <span>${orderData.pricing.shipping.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pi-summary-row">
                  <span>{t.tariff}{tariffRate}</span>
                  <span>${orderData.pricing.tariff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pi-summary-row total">
                  <span>{t.total}</span>
                  <span>${orderData.pricing.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="pi-next-steps">
              <div className="pi-next-steps-title">{t.nextSteps}</div>
              <div className="pi-steps-list">
                <div className="pi-step-item">
                  <span className="pi-step-number">1</span>
                  <span>{t.step1}</span>
                </div>
                <div className="pi-step-item">
                  <span className="pi-step-number">2</span>
                  <span>{t.step2}</span>
                </div>
                <div className="pi-step-item">
                  <span className="pi-step-number">3</span>
                  <span>{t.step3}</span>
                </div>
                <div className="pi-step-item">
                  <span className="pi-step-number">4</span>
                  <span>{t.step4}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pi-actions">
              <button className="pi-btn-primary" onClick={handleDownloadPI}>
                {t.downloadPI}
              </button>
              <button className="pi-btn-secondary" onClick={onTrackOrder}>
                {t.trackOrder}
              </button>
            </div>

            {/* Support */}
            <div className="pi-support">
              {t.support}{' '}
              <a href="mailto:wholesale@youngcosmed.com">{t.contactSupport}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Invoice for PDF Generation */}
      <div className="pi-invoice-hidden">
        <div ref={invoiceRef} className="invoice-container">
          <div className="header-title">PROFORMA INVOICE</div>

          <div className="section">
            <div className="info-row">
              <span className="info-label">From:</span>
              <span>{companyInfo.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label"></span>
              <span>{companyInfo.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label"></span>
              <span>{companyInfo.country}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Contact:</span>
              <span>{companyInfo.phone}</span>
            </div>
          </div>

          <div className="section">
            <div className="info-row">
              <span className="info-label">Date:</span>
              <span>{formatDate(orderData.date)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ref No:</span>
              <span>{orderData.orderId}</span>
            </div>
            <div className="info-row">
              <span className="info-label"></span>
              <span>{orderData.country}</span>
            </div>
          </div>

          <div className="section">
            <div className="info-row">
              <span className="info-label">Buyer:</span>
            </div>
            <div style={{ marginLeft: '20px' }}>
              <div>{orderData.customer.name}</div>
              <div>{orderData.customer.address}, {orderData.customer.city} {orderData.customer.postalCode}</div>
              <div>{orderData.country}</div>
              <div>{orderData.customer.email}</div>
              <div>{orderData.customer.phone}</div>
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
                <td>{orderData.product.name}</td>
                <td>{orderData.quantity}</td>
                <td>${orderData.pricing.discountedPrice.toFixed(2)}</td>
                <td>${orderData.pricing.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right' }}>Shipping Fee:</td>
                <td>${orderData.pricing.shipping.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right' }}>Estimated Tariff:</td>
                <td>${orderData.pricing.tariff.toFixed(2)}</td>
              </tr>
              <tr className="total-row">
                <td colSpan="3" style={{ textAlign: 'right' }}>TOTAL:</td>
                <td>${orderData.pricing.total.toFixed(2)}</td>
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
            <div><strong>Bank Name:</strong> {companyInfo.bankName}</div>
            <div><strong>Bank Address:</strong> {companyInfo.bankAddress}</div>
            <div><strong>A/C Name:</strong> {companyInfo.accountName}</div>
            <div><strong>A/C No.:</strong> {companyInfo.accountNo}</div>
            <div><strong>Swift code:</strong> {companyInfo.swiftCode}</div>
          </div>

          <div className="signature-area">
            <div style={{ marginTop: '40px' }}>Accepted By</div>
            <div style={{ marginTop: '10px' }}>_________________________</div>
            <div><strong>Name:</strong> {companyInfo.ceoName}</div>
            <div><strong>Title:</strong> {companyInfo.ceoTitle}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentInstructionsPage
