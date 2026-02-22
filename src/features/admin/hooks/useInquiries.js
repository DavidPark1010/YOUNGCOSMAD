import { useState, useCallback } from 'react'
import { getInquiries, updateInquiry as storageUpdate, deleteInquiry as storageDelete } from '../../../utils/inquiryStorage'
import { loadSampleInquiries } from '../constants/sampleInquiries'

export function useInquiries() {
  const [inquiries, setInquiries] = useState(() => loadSampleInquiries())
  const [selectedInquiry, setSelectedInquiry] = useState(null)

  const refresh = useCallback(() => {
    const data = getInquiries()
    setInquiries(data)
    // 선택된 문의가 있으면 최신 데이터로 갱신
    if (selectedInquiry) {
      const updated = data.find(inq => inq.id === selectedInquiry.id)
      setSelectedInquiry(updated || null)
    }
  }, [selectedInquiry])

  const inquiryStats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    reviewed: inquiries.filter(i => i.status === 'reviewed').length,
    responded: inquiries.filter(i => i.status === 'responded').length,
    closed: inquiries.filter(i => i.status === 'closed').length
  }

  const updateInquiryStatus = useCallback((id, status) => {
    const updated = storageUpdate(id, { status })
    if (updated) {
      setInquiries(prev => prev.map(inq => inq.id === id ? updated : inq))
      if (selectedInquiry?.id === id) setSelectedInquiry(updated)
    }
  }, [selectedInquiry])

  const updateMemo = useCallback((id, adminMemo) => {
    const updated = storageUpdate(id, { adminMemo })
    if (updated) {
      setInquiries(prev => prev.map(inq => inq.id === id ? updated : inq))
      if (selectedInquiry?.id === id) setSelectedInquiry(updated)
    }
  }, [selectedInquiry])

  const removeInquiry = useCallback((id) => {
    storageDelete(id)
    setInquiries(prev => prev.filter(inq => inq.id !== id))
    if (selectedInquiry?.id === id) setSelectedInquiry(null)
  }, [selectedInquiry])

  return {
    inquiries,
    selectedInquiry, setSelectedInquiry,
    inquiryStats,
    updateInquiryStatus,
    updateMemo,
    removeInquiry,
    refresh
  }
}
