<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const ordersStore = useOrdersStore()
const order = ordersStore.orders.find((o) => o.id === route.params.id)

if (!order) {
  throw createError({ statusCode: 404, statusMessage: '訂單不存在' })
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('zh-Hant-TW')
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-16 md:px-16">
    <NuxtLink to="/account/orders" class="font-caption text-sm text-text-secondary"
      >← 返回我的訂單</NuxtLink
    >

    <div class="mt-4 flex items-center justify-between">
      <h1 class="font-heading text-2xl text-text-primary md:text-3xl">#{{ order.order_number }}</h1>
      <UiStatusBadge :status="order.status" />
    </div>
    <p class="font-caption mt-2 text-sm text-text-secondary">
      訂購日期：{{ formatDate(order.placed_at) }}
    </p>

    <div class="mt-8 h-px bg-border-subtle" />

    <h2 class="font-caption mt-8 text-sm tracking-widest text-text-primary">商品明細</h2>
    <div class="mt-5 flex flex-col gap-5">
      <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
        <div class="h-20 w-16 shrink-0 bg-surface-card">
          <img
            v-if="item.products?.cover_image_url"
            :src="item.products.cover_image_url"
            :alt="item.product_name_snapshot"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex flex-1 flex-col gap-1">
          <p class="font-body text-text-primary">{{ item.product_name_snapshot }}</p>
          <p v-if="item.variant_label_snapshot" class="font-caption text-xs text-text-secondary">
            {{ item.variant_label_snapshot }}
          </p>
        </div>
        <p class="font-caption hidden w-32 text-right text-sm text-text-secondary sm:block">
          {{ formatPrice(item.unit_price, order.currency) }} × {{ item.quantity }}
        </p>
        <p class="font-caption w-24 text-right text-sm text-text-primary">
          {{ formatPrice(item.line_total, order.currency) }}
        </p>
      </div>
    </div>

    <div class="mt-8 h-px bg-border-subtle" />

    <h2 class="font-caption mt-8 text-sm tracking-widest text-text-primary">收件資訊</h2>
    <div class="mt-4 flex flex-col gap-1.5">
      <p class="font-body text-sm text-text-primary">
        {{ order.shipping_address.recipient_name }}／{{ order.shipping_address.phone }}
      </p>
      <p class="font-body text-sm text-text-secondary">
        {{ order.shipping_address.postal_code }} {{ order.shipping_address.city
        }}{{ order.shipping_address.district }}{{ order.shipping_address.line1 }}
      </p>
    </div>

    <div class="mt-8 h-px bg-border-subtle" />

    <div class="mt-8 flex flex-col gap-2.5 lg:ml-auto lg:w-80">
      <div class="font-caption flex justify-between text-sm text-text-secondary">
        <span>小計</span>
        <span class="text-text-primary">{{ formatPrice(order.subtotal, order.currency) }}</span>
      </div>
      <div class="font-caption flex justify-between text-sm text-text-secondary">
        <span>運費</span>
        <span class="text-text-primary">{{
          order.shipping_fee > 0 ? formatPrice(order.shipping_fee, order.currency) : '免運'
        }}</span>
      </div>
      <div class="h-px bg-border-inverse" />
      <div class="flex justify-between">
        <span class="font-caption text-base text-text-primary">總計</span>
        <span class="font-caption text-lg text-accent-brick">{{
          formatPrice(order.total, order.currency)
        }}</span>
      </div>
    </div>
  </div>
</template>
