<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'cart-not-empty'], layout: 'checkout' })

const cartStore = useCartStore()
const ordersStore = useOrdersStore()
const router = useRouter()

const defaultAddress = ordersStore.orders[0]?.shipping_address

const form = reactive({
  recipient_name: defaultAddress?.recipient_name ?? '',
  phone: defaultAddress?.phone ?? '',
  postal_code: defaultAddress?.postal_code ?? '',
  city: defaultAddress?.city ?? '',
  district: defaultAddress?.district ?? '',
  line1: defaultAddress?.line1 ?? ''
})

const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  errorMessage.value = null
  isSubmitting.value = true
  try {
    const order = ordersStore.placeOrder({ ...form })
    await router.push(`/account/orders/${order.id}`)
  } catch {
    errorMessage.value = '購物車是空的，請重新確認'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-10 md:px-16 md:py-16">
    <form
      class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16"
      @submit.prevent="onSubmit"
    >
      <div class="flex flex-col gap-6">
        <h1 class="font-heading text-2xl text-text-primary md:text-3xl">運送資訊</h1>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <UiFormField
            v-model="form.recipient_name"
            label="收件人姓名"
            placeholder="王小美"
            autocomplete="name"
          />
          <UiFormField
            v-model="form.phone"
            label="聯絡電話"
            placeholder="0912-345-678"
            autocomplete="tel"
          />
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-[110px_1fr_1fr]">
          <UiFormField v-model="form.postal_code" label="郵遞區號" placeholder="106" />
          <UiFormField v-model="form.city" label="縣市" placeholder="台北市" />
          <UiFormField v-model="form.district" label="鄉鎮市區" placeholder="大安區" />
        </div>

        <UiFormField
          v-model="form.line1"
          label="詳細地址"
          placeholder="信義路三段 5 號 3 樓"
          autocomplete="street-address"
        />

        <div class="h-px bg-border-subtle" />

        <div class="flex flex-col gap-3">
          <p class="font-caption text-sm tracking-widest text-text-primary">付款方式</p>
          <div class="flex flex-col gap-1 bg-surface-brick px-5 py-4">
            <span class="font-caption text-sm text-text-inverse">貨到付款</span>
            <span class="font-caption text-xs text-text-inverse-muted">目前唯一付款方式</span>
          </div>
        </div>

        <CheckoutOrderSummary
          class="lg:hidden"
          :items="cartStore.items"
          :subtotal="cartStore.subtotal"
        />

        <p v-if="errorMessage" class="font-caption text-sm text-surface-brick">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="font-caption bg-surface-brick py-4 text-center text-sm tracking-widest text-text-inverse disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '送出中…' : '確認訂單並送出' }}
        </button>
      </div>

      <aside class="hidden h-fit lg:block">
        <CheckoutOrderSummary :items="cartStore.items" :subtotal="cartStore.subtotal" />
      </aside>
    </form>
  </div>
</template>
