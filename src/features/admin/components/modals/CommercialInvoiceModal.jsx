import { useRef } from 'react'
import generatePDF from '../../../../utils/generatePdf'
import { formatInvoiceDate } from '../../../../utils/formatDate'

function CommercialInvoiceModal({ editingInvoice, setEditingInvoice, companyInfo, onClose }) {
  const ciRef = useRef(null)

  return (
    <div className="modal-overlay invoice-modal-overlay" onClick={onClose}>
      <div className="invoice-modal-content" onClick={e => e.stopPropagation()}>
        <div className="invoice-modal-header">
          <h2>COMMERCIAL INVOICE (CI) 미리보기</h2>
          <div className="invoice-modal-actions">
            <button
              className="pdf-generate-btn"
              onClick={() => generatePDF(ciRef, `CI_${editingInvoice.id}`)}
            >
              📥 PDF 생성 / 인쇄
            </button>
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="invoice-modal-body">
          {/* 수정 가능한 필드들 */}
          <div className="invoice-edit-section">
            <h3>CI 정보 수정</h3>
            <div className="invoice-edit-grid">
              <div className="invoice-edit-field">
                <label>NO. & Date of Invoice</label>
                <input
                  type="text"
                  value={editingInvoice.refNo || formatInvoiceDate(new Date())}
                  onChange={e => setEditingInvoice({ ...editingInvoice, refNo: e.target.value })}
                />
              </div>
              <div className="invoice-edit-field">
                <label>Terms of Payment</label>
                <input
                  type="text"
                  value={editingInvoice.invoiceData?.paymentTerm || 'T/T ADVANCE'}
                  onChange={e => setEditingInvoice({
                    ...editingInvoice,
                    invoiceData: { ...editingInvoice.invoiceData, paymentTerm: e.target.value }
                  })}
                />
              </div>
              <div className="invoice-edit-field">
                <label>INCOTERMS</label>
                <input
                  type="text"
                  value={editingInvoice.invoiceData?.incoterms || 'ExWork'}
                  onChange={e => setEditingInvoice({
                    ...editingInvoice,
                    invoiceData: { ...editingInvoice.invoiceData, incoterms: e.target.value }
                  })}
                />
              </div>
              <div className="invoice-edit-field">
                <label>Port of Loading</label>
                <input
                  type="text"
                  value={editingInvoice.invoiceData?.portOfLoading || 'KOREA'}
                  onChange={e => setEditingInvoice({
                    ...editingInvoice,
                    invoiceData: { ...editingInvoice.invoiceData, portOfLoading: e.target.value }
                  })}
                />
              </div>
              <div className="invoice-edit-field">
                <label>Final Destination</label>
                <input
                  type="text"
                  value={editingInvoice.invoiceData?.finalDestination || editingInvoice.customerCountry || 'USA'}
                  onChange={e => setEditingInvoice({
                    ...editingInvoice,
                    invoiceData: { ...editingInvoice.invoiceData, finalDestination: e.target.value }
                  })}
                />
              </div>
              <div className="invoice-edit-field">
                <label>Customs Code</label>
                <input
                  type="text"
                  value={editingInvoice.invoiceData?.customsCode || '3304-99-9000'}
                  onChange={e => setEditingInvoice({
                    ...editingInvoice,
                    invoiceData: { ...editingInvoice.invoiceData, customsCode: e.target.value }
                  })}
                />
              </div>
              <div className="invoice-edit-field">
                <label>Vessel</label>
                <input
                  type="text"
                  value={editingInvoice.invoiceData?.vessel || ''}
                  onChange={e => setEditingInvoice({
                    ...editingInvoice,
                    invoiceData: { ...editingInvoice.invoiceData, vessel: e.target.value }
                  })}
                  placeholder="선박/항공편명"
                />
              </div>
              <div className="invoice-edit-field">
                <label>Sailing on or about</label>
                <input
                  type="text"
                  value={editingInvoice.invoiceData?.sailingDate || ''}
                  onChange={e => setEditingInvoice({
                    ...editingInvoice,
                    invoiceData: { ...editingInvoice.invoiceData, sailingDate: e.target.value }
                  })}
                  placeholder="출항일"
                />
              </div>
            </div>
          </div>

          {/* CI 미리보기 */}
          <div className="invoice-preview-wrapper">
            <div ref={ciRef} className="ci-container">
              <h1 className="header-title">COMMERCIAL INVOICE</h1>

              <table className="ci-header-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%', border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                      <strong>1. Shipper/Exporter</strong><br />
                      {companyInfo.name}<br />
                      {companyInfo.address}
                    </td>
                    <td style={{ width: '50%', border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                      <strong>8. NO. & Date of Invoice</strong><br />
                      {formatInvoiceDate(new Date())}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }} rowSpan="2">
                      <strong>2. Buyer/Consignee</strong><br />
                      {editingInvoice.customerName}<br />
                      {editingInvoice.shippingAddress}<br /><br />
                      Tel: {editingInvoice.customerPhone || editingInvoice.customerEmail}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                      <strong>9. Terms of Payment</strong><br />
                      {editingInvoice.invoiceData?.paymentTerm || 'T/T ADVANCE'}<br />
                      INCOTERMS: {editingInvoice.invoiceData?.incoterms || 'ExWork'}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                      <strong>10. Remark</strong><br />
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                      <strong>3. Notify Party</strong><br />
                      SAME AS ABOVE
                    </td>
                    <td style={{ border: '1px solid #333', padding: '10px', verticalAlign: 'top' }}>
                      <strong>11. Other Reference</strong><br />
                      * Customs Code: {editingInvoice.invoiceData?.customsCode || '3304-99-9000'}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #333', padding: '10px' }}>
                      <strong>4. Port of Loading</strong><br />
                      {editingInvoice.invoiceData?.portOfLoading || 'KOREA'}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>5. Final Destination</strong><br />
                      {editingInvoice.invoiceData?.finalDestination || editingInvoice.customerCountry || 'USA'}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '10px' }}>
                      {/* 박스 크기 정보 */}
                      41*31*40 1box, {((editingInvoice.total + (editingInvoice.deliveryFee || 0)) / 100).toFixed(1)}kg
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #333', padding: '10px' }}>
                      <strong>6. Vessel</strong><br />
                      {editingInvoice.invoiceData?.vessel || ''}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '10px' }}>
                      <strong>7. Sailing on or about</strong><br />
                      {editingInvoice.invoiceData?.sailingDate || ''}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="ci-items-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #333', padding: '8px', width: '15%' }}>12. Shipping mark</th>
                    <th style={{ border: '1px solid #333', padding: '8px', width: '35%' }}>13. Description of Goods</th>
                    <th style={{ border: '1px solid #333', padding: '8px', width: '15%' }}>14. Q'ty (ea)</th>
                    <th style={{ border: '1px solid #333', padding: '8px', width: '15%' }}>15. Unit-Price</th>
                    <th style={{ border: '1px solid #333', padding: '8px', width: '20%' }}>16. Amount (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {editingInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                      <td style={{ border: '1px solid #333', padding: '8px' }}>{item.nameKr || item.name}</td>
                      <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'right' }}>$ {item.price.toFixed(2)}</td>
                      <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'right' }}>$ {(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                  {/* 빈 행 추가 */}
                  {Array(Math.max(0, 6 - editingInvoice.items.length)).fill(0).map((_, idx) => (
                    <tr key={`empty-${idx}`}>
                      <td style={{ border: '1px solid #333', padding: '8px' }}>&nbsp;</td>
                      <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                      <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                      <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                      <td style={{ border: '1px solid #333', padding: '8px' }}></td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="4" style={{ border: '1px solid #333', padding: '8px' }}>
                      Delivery Fee( hand carry→UPS)
                    </td>
                    <td style={{ border: '1px solid #333', padding: '8px', textAlign: 'right' }}>
                      $ {(editingInvoice.deliveryFee || 0).toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: 'bold', background: '#f5f5f5' }}>
                    <td colSpan="4" style={{ border: '2px solid #333', padding: '10px', textAlign: 'center' }}>
                      TOTAL
                    </td>
                    <td style={{ border: '2px solid #333', padding: '10px', textAlign: 'right' }}>
                      $ {(editingInvoice.total + (editingInvoice.deliveryFee || 0)).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="signature-area" style={{ marginTop: '50px', textAlign: 'right' }}>
                <p>Signed by _________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommercialInvoiceModal
