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

export default generatePDF
