<script setup lang="ts">
type Variant = {
  id: string
  sku: string
  size: string | null
  color: string | null
  price_override: number | null
  stock_quantity: number
}

type ProductDetail = {
  id: string
  slug: string
  name: string
  description: string | null
  base_price: number
  currency: string
  cover_image_url: string | null
  categories: { slug: string; name: string } | null
  product_images: { id: string; url: string; alt_text: string | null; sort_order: number }[]
  product_variants: Variant[]
}

const route = useRoute()
const product = ref<ProductDetail | null>(getProductBySlug(route.params.slug as string))

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: '商品不存在' })
}

const images = computed(() => {
  const sorted = [...(product.value?.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  )
  return sorted.length > 0
    ? sorted
    : [
        {
          id: 'cover',
          url: product.value?.cover_image_url ?? '',
          alt_text: product.value?.name ?? '',
          sort_order: 0
        }
      ]
})
const activeImage = ref(images.value[0]?.url)

const sizes = computed(() => [
  ...new Set(product.value?.product_variants.map((v) => v.size).filter(Boolean))
])
const colors = computed(() => [
  ...new Set(product.value?.product_variants.map((v) => v.color).filter(Boolean))
])

const selectedSize = ref<string | null>(sizes.value[0] ?? null)
const selectedColor = ref<string | null>(colors.value[0] ?? null)

const selectedVariant = computed(() =>
  product.value?.product_variants.find(
    (v) => v.size === selectedSize.value && v.color === selectedColor.value
  )
)

const displayPrice = computed(
  () => selectedVariant.value?.price_override ?? product.value?.base_price ?? 0
)

const cartStore = useCartStore()
const isAdding = ref(false)
const addError = ref<string | null>(null)
const addSuccess = ref(false)

async function addToCart() {
  if (!selectedVariant.value) return
  isAdding.value = true
  addError.value = null
  addSuccess.value = false
  try {
    await cartStore.addItem(selectedVariant.value.id, 1)
    addSuccess.value = true
  } catch (err) {
    const statusCode = (err as { statusCode?: number })?.statusCode
    addError.value = statusCode === 409 ? '庫存不足，無法加入購物車' : '加入購物車失敗，請稍後再試'
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <div
    v-if="product"
    class="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:px-16 lg:grid-cols-2"
  >
    <div class="flex flex-col gap-4">
      <div class="aspect-[3/4] w-full overflow-hidden bg-surface-card">
        <img
          v-if="activeImage"
          :src="activeImage"
          :alt="product.name"
          class="h-full w-full object-cover"
        />
      </div>
      <div v-if="images.length > 1" class="flex gap-3">
        <button
          v-for="image in images"
          :key="image.id"
          type="button"
          class="h-20 w-20 overflow-hidden bg-surface-card"
          :class="{ 'ring-2 ring-surface-brick': activeImage === image.url }"
          @click="activeImage = image.url"
        >
          <img
            :src="image.url"
            :alt="image.alt_text ?? product.name"
            class="h-full w-full object-cover"
          />
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <NuxtLink
          v-if="product.categories"
          :to="`/products?category=${product.categories.slug}`"
          class="font-caption text-xs tracking-widest text-text-secondary"
        >
          {{ product.categories.name }}
        </NuxtLink>
        <h1 class="font-heading text-3xl text-text-primary">{{ product.name }}</h1>
        <p class="font-caption text-lg text-text-secondary">
          {{ formatPrice(displayPrice, product.currency) }}
        </p>
      </div>

      <p v-if="product.description" class="font-body text-text-secondary">
        {{ product.description }}
      </p>

      <div v-if="sizes.length > 0" class="flex flex-col gap-2">
        <span class="font-caption text-xs tracking-widest text-text-primary">尺寸</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in sizes"
            :key="size"
            type="button"
            class="font-caption border px-4 py-2 text-sm"
            :class="
              selectedSize === size
                ? 'border-surface-brick bg-surface-brick text-text-inverse'
                : 'border-border-subtle text-text-primary'
            "
            @click="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <div v-if="colors.length > 0" class="flex flex-col gap-2">
        <span class="font-caption text-xs tracking-widest text-text-primary">顏色</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="color in colors"
            :key="color"
            type="button"
            class="font-caption border px-4 py-2 text-sm"
            :class="
              selectedColor === color
                ? 'border-surface-brick bg-surface-brick text-text-inverse'
                : 'border-border-subtle text-text-primary'
            "
            @click="selectedColor = color"
          >
            {{ color }}
          </button>
        </div>
      </div>

      <p
        v-if="selectedVariant && selectedVariant.stock_quantity === 0"
        class="font-caption text-sm text-surface-brick"
      >
        已售完
      </p>
      <p
        v-else-if="selectedVariant && selectedVariant.stock_quantity <= 5"
        class="font-caption text-sm text-surface-brick"
      >
        庫存僅剩 {{ selectedVariant.stock_quantity }} 件
      </p>

      <button
        type="button"
        class="font-caption w-full bg-surface-brick py-4 text-sm tracking-widest text-text-inverse disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!selectedVariant || selectedVariant.stock_quantity === 0 || isAdding"
        @click="addToCart"
      >
        {{ isAdding ? '加入中…' : '加入購物車' }}
      </button>
      <p v-if="addSuccess" class="font-caption text-sm text-text-secondary">已加入購物車</p>
      <p v-if="addError" class="font-caption text-sm text-surface-brick">{{ addError }}</p>
    </div>
  </div>
</template>
