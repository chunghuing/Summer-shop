<script setup lang="ts">
type SummaryItem = {
  id: string
  quantity: number
  line_total: number
  product: { name: string; cover_image_url: string | null; currency: string }
}

defineProps<{ items: SummaryItem[]; subtotal: number }>()
</script>

<template>
  <div class="flex flex-col gap-5 bg-surface-card p-6 md:p-8">
    <p class="font-caption text-sm tracking-widest text-text-primary">訂單摘要</p>

    <div class="flex flex-col gap-4">
      <div v-for="item in items" :key="item.id" class="flex items-center gap-3">
        <div class="h-[70px] w-14 shrink-0 bg-surface-white">
          <img
            v-if="item.product.cover_image_url"
            :src="item.product.cover_image_url"
            :alt="item.product.name"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex flex-1 flex-col gap-0.5">
          <p class="font-caption text-sm text-text-primary">{{ item.product.name }}</p>
          <p class="font-caption text-xs text-text-secondary">x{{ item.quantity }}</p>
        </div>
        <p class="font-caption text-sm text-text-primary">
          {{ formatPrice(item.line_total, item.product.currency) }}
        </p>
      </div>
    </div>

    <div class="h-px bg-border-subtle" />

    <div class="font-caption flex justify-between text-sm text-text-secondary">
      <span>小計</span>
      <span class="text-text-primary">{{ formatPrice(subtotal) }}</span>
    </div>
    <div class="font-caption flex justify-between text-sm text-text-secondary">
      <span>運費</span>
      <span class="text-text-primary">免運</span>
    </div>

    <div class="h-px bg-border-inverse" />

    <div class="flex justify-between">
      <span class="font-caption text-base text-text-primary">總計</span>
      <span class="font-caption text-lg text-accent-brick">{{ formatPrice(subtotal) }}</span>
    </div>

    <p class="font-caption text-xs leading-relaxed text-text-secondary">
      訂單建立後將以貨到付款方式出貨，狀態顯示為「待處理」
    </p>
  </div>
</template>
