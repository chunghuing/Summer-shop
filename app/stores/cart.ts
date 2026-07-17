export type CartItem = {
  id: string
  quantity: number
  unit_price: number
  line_total: number
  variant: {
    id: string
    sku: string
    size: string | null
    color: string | null
    stock_quantity: number
  }
  product: {
    id: string
    slug: string
    name: string
    cover_image_url: string | null
    currency: string
  }
}

type CartEntry = { variantId: string; quantity: number }

export const useCartStore = defineStore('cart', () => {
  const raw = useCookie<CartEntry[]>('ma_cart', { default: () => [] })

  const items = computed<CartItem[]>(() => {
    const result: CartItem[] = []
    for (const entry of raw.value) {
      const found = getVariantById(entry.variantId)
      if (!found) continue
      const unitPrice = found.variant.price_override ?? found.product.base_price
      result.push({
        id: found.variant.id,
        quantity: entry.quantity,
        unit_price: unitPrice,
        line_total: unitPrice * entry.quantity,
        variant: {
          id: found.variant.id,
          sku: found.variant.sku,
          size: found.variant.size,
          color: found.variant.color,
          stock_quantity: found.variant.stock_quantity
        },
        product: {
          id: found.product.id,
          slug: found.product.slug,
          name: found.product.name,
          cover_image_url: found.product.cover_image_url,
          currency: found.product.currency
        }
      })
    }
    return result
  })

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.line_total, 0))

  function addItem(variantId: string, quantity = 1) {
    const found = getVariantById(variantId)
    if (!found) {
      throw createError({ statusCode: 404, statusMessage: 'Variant not found' })
    }

    const existing = raw.value.find((entry) => entry.variantId === variantId)
    const nextQuantity = (existing?.quantity ?? 0) + quantity
    if (nextQuantity > found.variant.stock_quantity) {
      throw createError({ statusCode: 409, statusMessage: 'Insufficient stock' })
    }

    if (existing) {
      raw.value = raw.value.map((entry) =>
        entry.variantId === variantId ? { ...entry, quantity: nextQuantity } : entry
      )
    } else {
      raw.value = [...raw.value, { variantId, quantity: nextQuantity }]
    }
  }

  function updateItemQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    const found = getVariantById(itemId)
    if (found && quantity > found.variant.stock_quantity) {
      throw createError({ statusCode: 409, statusMessage: 'Insufficient stock' })
    }

    raw.value = raw.value.map((entry) =>
      entry.variantId === itemId ? { ...entry, quantity } : entry
    )
  }

  function removeItem(itemId: string) {
    raw.value = raw.value.filter((entry) => entry.variantId !== itemId)
  }

  function clear() {
    raw.value = []
  }

  return { items, itemCount, subtotal, addItem, updateItemQuantity, removeItem, clear }
})
