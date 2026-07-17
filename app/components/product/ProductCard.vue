<script setup lang="ts">
defineProps<{
  product: {
    slug: string
    name: string
    base_price: number
    currency: string
    cover_image_url: string | null
  }
}>()
</script>

<template>
  <NuxtLink :to="`/products/${product.slug}`" class="group block">
    <div class="aspect-[3/4] w-full overflow-hidden bg-surface-card">
      <img
        v-if="product.cover_image_url"
        :src="product.cover_image_url"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="mt-3 flex flex-col gap-1">
      <span class="font-heading text-lg text-text-primary">{{ product.name }}</span>
      <span class="font-caption text-sm text-text-secondary">{{
        formatPrice(product.base_price, product.currency)
      }}</span>
    </div>
  </NuxtLink>
</template>
