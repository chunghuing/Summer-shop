export type ShippingAddress = {
  recipient_name: string
  phone: string
  postal_code: string
  city: string
  district: string
  line1: string
}

export type OrderItem = {
  id: string
  product_name_snapshot: string
  variant_label_snapshot: string | null
  unit_price: number
  quantity: number
  line_total: number
  products: { cover_image_url: string | null } | null
}

export type Order = {
  id: string
  order_number: string
  status: string
  subtotal: number
  shipping_fee: number
  total: number
  currency: string
  shipping_address: ShippingAddress
  contact_phone: string
  contact_email: string
  placed_at: string
  items: OrderItem[]
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = useCookie<Order[]>('ma_orders', { default: () => [] })

  function placeOrder(address: ShippingAddress) {
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    if (cartStore.items.length === 0) {
      throw createError({ statusCode: 400, statusMessage: '購物車是空的' })
    }

    const items: OrderItem[] = cartStore.items.map((item) => ({
      id: item.id,
      product_name_snapshot: item.product.name,
      variant_label_snapshot:
        [item.variant.size, item.variant.color].filter(Boolean).join(' / ') || null,
      unit_price: item.unit_price,
      quantity: item.quantity,
      line_total: item.line_total,
      products: { cover_image_url: item.product.cover_image_url }
    }))

    const order: Order = {
      id: crypto.randomUUID(),
      order_number: `MA${Date.now().toString().slice(-8)}`,
      status: 'pending',
      subtotal: cartStore.subtotal,
      shipping_fee: 0,
      total: cartStore.subtotal,
      currency: cartStore.items[0]?.product.currency ?? 'TWD',
      shipping_address: address,
      contact_phone: address.phone,
      contact_email: authStore.user?.email ?? '',
      placed_at: new Date().toISOString(),
      items
    }

    orders.value = [order, ...orders.value]
    cartStore.clear()
    return order
  }

  return { orders, placeOrder }
})
