import { useRef } from 'react'
import generatePDF from '../../../../utils/generatePdf'
import { formatInvoiceDate } from '../../../../utils/formatDate'

function ProformaInvoiceModal({ editingInvoice, companyInfo, onClose }) {
  const invoiceRef = useRef(null)

  return (
    <div className="modal-overlay invoice-modal-overlay" onClick={onClose}>
      <div className="invoice-modal-content" onClick={e => e.stopPropagation()}>
        <div className="invoice-modal-header">
          <h2>PROFORMA INVOICE 미리보기</h2>
          <div className="invoice-modal-actions">
            <button
              className="pdf-generate-btn"
              onClick={() => generatePDF(invoiceRef, `Invoice_${editingInvoice.id}`)}
            >
              📥 PDF 생성 / 인쇄
            </button>
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="invoice-modal-body">
          {/* 인보이스 미리보기 */}
          <div className="invoice-preview-wrapper">
            <div ref={invoiceRef} className="invoice-container">
              <h1 className="header-title">PROFORMA INVOICE</h1>

              <table className="invoice-header-table">
                <tbody>
                  <tr>
                    <td style={{ width: '60%' }}>
                      <strong>From</strong><br />
                      {companyInfo.name}<br />
                      {companyInfo.address}<br />
                      {companyInfo.country}<br />
                      <strong>Contact</strong> {companyInfo.phone}
                    </td>
                    <td style={{ width: '40%' }}>
                      <strong>Date</strong> {formatInvoiceDate(new Date())}<br />
                      <strong>Ref. No.</strong> {editingInvoice.refNo || editingInvoice.id}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>To</strong><br />
                      {editingInvoice.customerCompany && <>{editingInvoice.customerCompany}<br /></>}
                      {editingInvoice.customerName && <>{editingInvoice.customerName}<br /></>}
                      {editingInvoice.shippingAddress}<br />
                      {editingInvoice.customerCountry || ''}<br />
                      <strong>Contact</strong> {editingInvoice.customerPhone || editingInvoice.customerEmail}
                    </td>
                    <td>
                      <strong>Total Page</strong> 1 OF 1
                    </td>
                  </tr>
                </tbody>
              </table>

              <p style={{ margin: '15px 0', fontSize: '12px' }}>
                We have the pleasure in offering you the following merchandise under the terms and conditions
                set forth hereunder subject to our final confirmation
              </p>

              <p style={{ textAlign: 'right', margin: '10px 0', fontSize: '12px' }}>
                ({editingInvoice.invoiceData?.incoterms || 'Exwork'})
              </p>

              <table className="invoice-items-table">
                <thead>
                  <tr>
                    <th style={{ width: '8%' }}>No.</th>
                    <th style={{ width: '42%' }}>Description</th>
                    <th style={{ width: '15%' }}>Quantity</th>
                    <th style={{ width: '15%' }}>Unit Price</th>
                    <th style={{ width: '20%' }}>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {editingInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.nameKr || item.name}</td>
                      <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ textAlign: 'right' }}>$ {item.price.toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}>$ {(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                  {/* 빈 행 추가 */}
                  {Array(Math.max(0, 8 - editingInvoice.items.length)).fill(0).map((_, idx) => (
                    <tr key={`empty-${idx}`}>
                      <td>&nbsp;</td>
                      <td></td>
                      <td></td>
                      <td>$</td>
                      <td style={{ textAlign: 'right' }}>-</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#fff8dc' }}>
                    <td colSpan="4" style={{ textAlign: 'center' }}>
                      Delivery Fee( {editingInvoice.invoiceData?.shipment === 'Forwarder' ? 'handcarry' : editingInvoice.invoiceData?.shipment} )
                    </td>
                    <td style={{ textAlign: 'right' }}>$ {(editingInvoice.deliveryFee || 0).toLocaleString()}</td>
                  </tr>
                  <tr className="total-row" style={{ fontWeight: 'bold', background: '#f5f5f5' }}>
                    <td colSpan="4" style={{ textAlign: 'center' }}>TOTAL</td>
                    <td style={{ textAlign: 'right' }}>$ {(editingInvoice.total + (editingInvoice.deliveryFee || 0)).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="invoice-terms" style={{ marginTop: '20px', fontSize: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr><td><strong>Payment Term:</strong></td><td>{editingInvoice.invoiceData?.paymentTerm || 'T/T in Advance'}</td></tr>
                    <tr><td><strong>Estimated Delivery:</strong></td><td>{editingInvoice.invoiceData?.estimatedDelivery || 'After receipt of payment'}</td></tr>
                    <tr><td><strong>Shipment:</strong></td><td>{editingInvoice.invoiceData?.shipment || 'Forwarder'}</td></tr>
                    <tr><td><strong>Validity:</strong></td><td>{editingInvoice.invoiceData?.validity || '1 WEEK'}</td></tr>
                    <tr><td><strong>Warranty:</strong></td><td>{editingInvoice.invoiceData?.warranty || '1 YEAR'}</td></tr>
                    <tr><td><strong>Bank Name:</strong></td><td>{companyInfo.bankName}</td></tr>
                    <tr><td><strong>Bank Address:</strong></td><td>{companyInfo.bankAddress}</td></tr>
                    <tr><td><strong>A/C Name:</strong></td><td>{companyInfo.accountName}</td></tr>
                    <tr><td><strong>A/C No.:</strong></td><td>{companyInfo.accountNo}</td></tr>
                    <tr><td><strong>Swift code:</strong></td><td>{companyInfo.swiftCode}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="signature-area">
                <p><strong>Accepted By</strong></p>
                <p>Name: {companyInfo.ceoName}</p>
                <p>Title: {companyInfo.ceoTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProformaInvoiceModal
