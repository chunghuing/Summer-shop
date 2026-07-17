import { categories, products, type Category } from '~/data/catalog'

export type CategoryRef = { slug: string; name: string } | null

function categoryRef(categoryId: string | null): CategoryRef {
  const category = categories.find((c) => c.id === categoryId)
  return category ? { slug: category.slug, name: category.name } : null
}

export function getCategories(): Category[] {
  return [...categories].sort((a, b) => a.sort_order - b.sort_order)
}

export function getProducts(filter: { category?: string } = {}) {
  let list = products.filter((p) => p.status === 'active')

  if (filter.category) {
    const category = categories.find((c) => c.slug === filter.category)
    list = category ? list.filter((p) => p.category_id === category.id) : []
  }

  return list.map((p) => ({ ...p, categories: categoryRef(p.category_id) }))
}

export function getProductBySlug(slug: string) {
  const product = products.find((p) => p.slug === slug && p.status === 'active')
  if (!product) return null
  return { ...product, categories: categoryRef(product.category_id) }
}

export function getVariantById(variantId: string) {
  for (const product of products) {
    const variant = product.product_variants.find((v) => v.id === variantId)
    if (variant) return { product, variant }
  }
  return null
}
