<script setup lang="ts">
const cartStore = useCartStore()
const authStore = useAuthStore()
const isEmpty = computed(() => cartStore.items.length === 0)
const checkoutHref = computed(() => (authStore.user ? '/checkout' : '/login?redirect=/checkout'))

function variantLabel(item: (typeof cartStore.items)[number]) {
  return [item.variant.size, item.variant.color].filter(Boolean).join(' / ')
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:px-16">
    <h1 class="font-heading text-3xl text-text-primary">購物車</h1>

    <div v-if="isEmpty" class="mt-16 flex flex-col items-center gap-6 text-center">
      <p class="font-body text-text-secondary">您的購物車目前是空的。</p>
      <NuxtLink
        to="/products"
        class="font-caption bg-surface-brick px-8 py-3 text-sm tracking-widest text-text-inverse"
      >
        繼續選購
      </NuxtLink>
    </div>

    <div v-else class="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
      <div class="flex flex-col">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex gap-5 border-b border-border-subtle py-6 first:pt-0"
        >
          <NuxtLink
            :to="`/products/${item.product.slug}`"
            class="h-30 w-24 shrink-0 bg-surface-card"
          >
            <img
              v-if="item.product.cover_image_url"
              :src="item.product.cover_image_url"
              :alt="item.product.name"
              class="h-full w-full object-cover"
            />
          </NuxtLink>

          <div class="flex flex-1 flex-col gap-2">
            <NuxtLink
              :to="`/products/${item.product.slug}`"
              class="font-body text-base text-text-primary"
            >
              {{ item.product.name }}
            </NuxtLink>
            <p v-if="variantLabel(item)" class="font-caption text-xs text-text-secondary">
              {{ variantLabel(item) }}
            </p>
            <button
              type="button"
              class="font-caption w-fit text-xs text-text-secondary underline"
              @click="cartStore.removeItem(item.id)"
            >
              移除
            </button>
          </div>

          <div class="flex flex-col items-end justify-between gap-2">
            <p class="font-caption text-sm text-text-primary">
              {{ formatPrice(item.unit_price, item.product.currency) }}
            </p>
            <div class="flex items-center border border-border-subtle">
              <button
                type="button"
                class="px-3 py-2 text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
                :disabled="item.quantity <= 1"
                @click="cartStore.updateItemQuantity(item.id, item.quantity - 1)"
              >
                −
              </button>
              <span class="font-caption px-3 text-sm text-text-primary">{{ item.quantity }}</span>
              <button
                type="button"
                class="px-3 py-2 text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
                :disabled="item.quantity >= item.variant.stock_quantity"
                @click="cartStore.updateItemQuantity(item.id, item.quantity + 1)"
              >
                +
              </button>
            </div>
            <p
              v-if="item.quantity >= item.variant.stock_quantity"
              class="font-caption text-xs text-surface-brick"
            >
              庫存僅剩 {{ item.variant.stock_quantity }} 件
            </p>
          </div>
        </div>
      </div>

      <div class="flex h-fit flex-col gap-4 bg-surface-card p-8">
        <p class="font-caption text-sm tracking-widest text-text-primary">訂單摘要</p>
        <div class="font-caption flex justify-between text-sm text-text-secondary">
          <span>小計</span>
          <span class="text-text-primary">{{ formatPrice(cartStore.subtotal) }}</span>
        </div>
        <div class="font-caption flex justify-between text-sm text-text-secondary">
          <span>運費</span>
          <span class="text-text-primary">免運</span>
        </div>
        <div class="h-px bg-border-inverse" />
        <div class="flex justify-between">
          <span class="font-caption text-base text-text-primary">總計</span>
          <span class="font-caption text-lg text-accent-brick">{{
            formatPrice(cartStore.subtotal)
          }}</span>
        </div>
        <NuxtLink
          :to="checkoutHref"
          class="font-caption mt-2 bg-surface-brick py-4 text-center text-sm tracking-widest text-text-inverse"
        >
          前往結帳
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
