import { useState } from 'react'
import { initialProducts } from '../constants/sampleProducts'
import { defaultProductForm } from '../constants/defaultSettings'

export function useProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productIdError, setProductIdError] = useState(false)
  const [productForm, setProductForm] = useState(defaultProductForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const openProductForm = (product = null) => {
    setProductIdError(false)
    if (product) {
      setEditingProduct(product)
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
