<script setup lang="ts">
const props = defineProps<{ status: string }>()

const LABELS: Record<string, string> = {
  pending: '待處理',
  paid: '已付款',
  processing: '處理中',
  shipped: '已出貨',
  completed: '已完成',
  cancelled: '已取消'
}
const ACTIVE_STATUSES = ['pending', 'paid', 'processing', 'shipped']

const label = computed(() => LABELS[props.status] ?? props.status)
const isActive = computed(() => ACTIVE_STATUSES.includes(props.status))
</script>

<template>
  <span
    class="font-caption inline-flex w-fit items-center border px-3.5 py-1 text-[11px] tracking-widest"
    :class="
      isActive
        ? 'border-accent-brick text-accent-brick'
        : 'border-text-secondary text-text-secondary'
    "
  >
    {{ label }}
  </span>
</template>
