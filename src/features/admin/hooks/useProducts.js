import { useState } from 'react'
import { initialProducts } from '../constants/sampleProducts'
import { defaultProductForm } from '../constants/defaultSettings'
import { createDefaultPricing } from '../../product/constants/countryData'

// 기존 제품에 pricing 필드가 없으면 자동 생성
function migrateProduct(product) {
  const migrated = { ...product }

  // pricing 필드 마이그레이션
  if (!migrated.pricing) {
    migrated.pricing = createDefaultPricing(15) // 기본 $15
  }

  // description 통합 (기존 분산된 필드 → 단일 description)
  if (!migrated.description && (migrated.ingredients || migrated.usage)) {
    const parts = []
    if (migrated.ingredients) parts.push(`[Key Ingredients]\n${migrated.ingredients}`)
    if (migrated.usage) parts.push(`[Usage]\n${migrated.usage}`)
    migrated.description = parts.join('\n\n')
  }

  // 새 필드 기본값
  if (!migrated.productName) migrated.productName = migrated.nameEn || ''
  if (!migrated.brandName) migrated.brandName = ''
  if (!migrated.productCode) migrated.productCode = migrated.productId || ''
  if (!migrated.shelfLife) migrated.shelfLife = ''
  if (migrated.requiresLicense === undefined) migrated.requiresLicense = false
  if (!Array.isArray(migrated.certifications)) {
    // 문자열 → 배열 변환
    migrated.certifications = migrated.certifications
      ? migrated.certifications.split(',').map(s => s.trim()).filter(Boolean)
      : []
  }
  if (!migrated.additionalImages) migrated.additionalImages = []
  if (migrated.moq && typeof migrated.moq === 'string' && migrated.moq.includes(' ')) {
    // "500 units" → "500"
    migrated.moq = migrated.moq.replace(/\s*units?\s*/i, '')
  }

  return migrated
}

export function useProducts() {
  const [products, setProducts] = useState(() =>
    initialProducts.map(migrateProduct)
  )
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productIdError, setProductIdError] = useState(false)
  const [productForm, setProductForm] = useState(defaultProductForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const openProductForm = (product = null) => {
    setProductIdError(false)
    if (product) {
      setEditingProduct(migrateProduct(product))
      setProductForm({
        productId: product.productId || '',
        nameEn: product.nameEn, nameKr: product.nameKr, category: product.category,
        description: product.description, ingredients: product.ingredients,
        usage: product.usage || '', exportReady: product.exportReady,
        certifications: product.certifications || product.exportNote || '',
        moq: product.moq, markets: product.markets,
        priceResponse: product.priceResponse || 'Thank you for your interest. For accurate pricing, our Sales Team will contact you shortly.',
        mediaImages: product.mediaImages || [product.image],
        mediaVideo: product.mediaVideo || '', status: product.status
      })
    } else {
      setEditingProduct(null)
      setProductForm(defaultProductForm)
    }
    setShowProductForm(true)
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  return {
    products, setProducts,
    showProductForm, setShowProductForm,
    editingProduct, setEditingProduct,
    productIdError, setProductIdError,
    productForm, setProductForm,
    deleteConfirm, setDeleteConfirm,
    openProductForm,
    deleteProduct
  }
}
