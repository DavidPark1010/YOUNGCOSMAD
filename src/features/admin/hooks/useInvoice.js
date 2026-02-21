import { useState } from 'react'

export function useInvoice() {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCIModal, setShowCIModal] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)

  const openInvoice = (order) => {
    setEditingInvoice({ ...order, invoiceData: order.invoiceData || {} })
    setShowInvoiceModal(true)
  }

  const openCI = (order) => {
    setEditingInvoice({ ...order, invoiceData: order.invoiceData || {} })
    setShowCIModal(true)
  }

  const closeInvoice = () => setShowInvoiceModal(false)
  const closeCI = () => setShowCIModal(false)

  return {
    showInvoiceModal, showCIModal,
    editingInvoice, setEditingInvoice,
    openInvoice, openCI,
    closeInvoice, closeCI
  }
}
