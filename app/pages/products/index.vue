<script setup lang="ts">
const route = useRoute()
const category = computed(() => route.query.category as string | undefined)

const items = computed(() => getProducts({ category: category.value }))
const categoryName = computed(() => items.value[0]?.categories?.name)
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:px-16">
    <h1 class="font-heading text-3xl text-text-primary">
      {{ category ? (categoryName ?? '分類商品') : '全部商品' }}
    </h1>

    <p v-if="items.length === 0" class="font-body mt-10 text-text-secondary">目前沒有商品。</p>

    <div v-else class="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="product in items" :key="product.id" :product="product" />
    </div>
  </div>
</template>
