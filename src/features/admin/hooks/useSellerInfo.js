import { useState } from 'react'

const STORAGE_KEY = 'seller_info'

const defaultSellerInfo = {
  companyName: 'Young Cosmed',
  representativeName: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  businessRegistrationNumber: '',
  snsLinks: { instagram: '', facebook: '', tiktok: '' }
}

function loadSellerInfo() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return stored ? { ...defaultSellerInfo, ...stored } : defaultSellerInfo
  } catch {
    return defaultSellerInfo
  }
}

export function useSellerInfo() {
  const [sellerInfo, setSellerInfo] = useState(loadSellerInfo)
  const [saved, setSaved] = useState(false)

  const saveSellerInfo = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sellerInfo))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return {
    sellerInfo, setSellerInfo,
    saved,
    saveSellerInfo
  }
}
