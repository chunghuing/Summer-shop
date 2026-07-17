<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

definePageMeta({ middleware: 'auth' })

const ordersStore = useOrdersStore()
const orders = computed(() => ordersStore.orders)

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('zh-Hant-TW')
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-16 md:px-16">
    <h1 class="font-heading text-3xl text-text-primary">我的訂單</h1>
    <p class="font-caption mt-2 text-sm text-text-secondary">共 {{ orders.length }} 筆訂單</p>

    <div v-if="orders.length === 0" class="mt-16 flex flex-col items-center gap-6 text-center">
      <p class="font-body text-text-secondary">您目前還沒有訂單。</p>
      <NuxtLink
        to="/products"
        class="font-caption bg-surface-brick px-8 py-3 text-sm tracking-widest text-text-inverse"
      >
        繼續選購
      </NuxtLink>
    </div>

    <div v-else class="mt-8 flex flex-col">
      <NuxtLink
        v-for="order in orders"
        :key="order.id"
        :to="`/account/orders/${order.id}`"
        class="flex flex-col gap-2 border-b border-border-subtle py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      >
        <div class="flex items-center gap-3">
          <span class="font-caption text-sm text-text-primary">#{{ order.order_number }}</span>
          <UiStatusBadge :status="order.status" />
        </div>
        <span class="font-caption text-xs text-text-secondary sm:flex-1">{{
          formatDate(order.placed_at)
        }}</span>
        <div class="flex items-center justify-between gap-2 sm:justify-end">
          <span class="font-caption text-sm text-text-primary">{{
            formatPrice(order.total, order.currency)
          }}</span>
          <ChevronRight class="h-4 w-4 text-text-secondary" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
