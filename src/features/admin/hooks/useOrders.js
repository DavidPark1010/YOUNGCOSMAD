import { useState } from 'react'
import { initialOrders } from '../constants/sampleOrders'

export function useOrders(lang) {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [trackingInput, setTrackingInput] = useState('')
  const [notificationSent, setNotificationSent] = useState(false)

  const [orders, setOrders] = useState(() => {
    const customerOrders = JSON.parse(localStorage.getItem('customer_orders') || '[]')
    const convertedOrders = customerOrders.map(co => ({
      id: co.orderId,
      refNo: co.orderId.replace('ORD-', 'EY'),
      customerEmail: co.customer.email,
      customerName: co.customer.contactPerson,
      customerCompany: co.customer.companyName,
      customerPhone: co.customer.phone,
      customerAddress: co.customer.address + ', ' + co.customer.city + ' ' + (co.customer.postalCode || ''),
      customerCountry: co.country,
      status: co.status || 'pending',
      trackingNumber: null,
      items: [{
        name: co.product.name,
        nameKr: co.product.name,
        quantity: co.quantity,
        price: co.pricing.discountedPrice,
        image: co.product.image
      }],
      total: co.pricing.total,
      deliveryFee: co.pricing.shipping,
      shippingAddress: co.customer.address + ', ' + co.customer.city + ' ' + (co.customer.postalCode || '') + ', ' + co.country,
      createdAt: co.date,
      updatedAt: co.date,
      checklist: {
        contactConfirmed: true,
        priceAgreed: true,
        invoiceSent: false,
        paymentConfirmed: false,
        productPrepared: false,
        ciCreated: false,
        shipped: false,
        delivered: false
      },
      invoiceData: {
        paymentTerm: 'T/T in Advance',
        estimatedDelivery: 'After receipt of payment',
        shipment: 'Forwarder',
        validity: '1 WEEK',
        warranty: '1 YEAR',
        incoterms: 'Exwork',
        customsCode: '3304-99-9000',
        portOfLoading: 'KOREA',
        finalDestination: co.country,
        vessel: '',
        sailingDate: ''
      },
      timeline: [
        { status: 'pending', date: co.date, message: '주문 접수 (고객 직접 주문)' }
      ],
      sourceType: 'customer_direct',
      memos: [],
      customerNotes: co.customer.notes || ''
    }))
    return [...convertedOrders, ...initialOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    paid: orders.filter(o => o.status === 'paid').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  }

  const deleteOrder = (orderId) => {
    if (window.confirm(lang === 'ko' ? '정말 이 주문을 삭제하시겠습니까?' : 'Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== orderId))
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null)
      }
    }
  }

  const selectOrder = (order) => {
    setSelectedOrder(order)
    setTrackingInput(order.trackingNumber || '')
  }

  return {
    orders, setOrders,
    selectedOrder, setSelectedOrder,
    trackingInput, setTrackingInput,
    notificationSent, setNotificationSent,
    orderStats,
    deleteOrder,
    selectOrder
  }
}
