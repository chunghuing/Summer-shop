<script setup lang="ts">
import { ShoppingBag, User } from '@lucide/vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const isAccountMenuOpen = ref(false)
const accountMenuRef = ref<HTMLElement | null>(null)

function toggleAccountMenu() {
  isAccountMenuOpen.value = !isAccountMenuOpen.value
}

function closeAccountMenu() {
  isAccountMenuOpen.value = false
}

function onLogout() {
  authStore.logout()
  closeAccountMenu()
  router.push('/')
}

function onDocumentClick(event: MouseEvent) {
  if (accountMenuRef.value && !accountMenuRef.value.contains(event.target as Node)) {
    closeAccountMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <nav class="flex items-center justify-between gap-3 bg-surface-linen px-4 py-6 sm:px-8 md:px-16">
    <NuxtLink
      to="/"
      class="font-heading whitespace-nowrap text-lg italic text-text-primary sm:text-2xl"
    >
      Summer
    </NuxtLink>

    <ul class="flex items-center gap-4 sm:gap-10">
      <li>
        <NuxtLink
          to="/products"
          class="font-caption whitespace-nowrap text-xs tracking-wide text-text-primary sm:text-sm"
        >
          熱賣商品
        </NuxtLink>
      </li>
    </ul>

    <div class="flex items-center gap-4 sm:gap-6">
      <div v-if="authStore.user" ref="accountMenuRef" class="relative">
        <button
          type="button"
          aria-label="會員選單"
          class="text-text-primary"
          @click="toggleAccountMenu"
        >
          <User :size="20" :stroke-width="1.5" />
        </button>
        <div
          v-if="isAccountMenuOpen"
          class="absolute right-0 top-full z-10 mt-3 w-48 border border-border-subtle bg-surface-linen py-2 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
        >
          <p class="font-caption truncate px-4 py-2 text-xs text-text-secondary">
            {{ authStore.user.fullName }}
          </p>
          <NuxtLink
            to="/account/orders"
            class="font-caption block px-4 py-2 text-sm text-text-primary hover:bg-surface-white"
            @click="closeAccountMenu"
          >
            我的訂單
          </NuxtLink>
          <button
            type="button"
            class="font-caption block w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-white"
            @click="onLogout"
          >
            登出
          </button>
        </div>
      </div>
      <NuxtLink v-else to="/login" aria-label="會員登入" class="text-text-primary">
        <User :size="20" :stroke-width="1.5" />
      </NuxtLink>
      <NuxtLink to="/cart" aria-label="購物車" class="relative text-text-primary">
        <ShoppingBag :size="20" :stroke-width="1.5" />
        <span
          v-if="cartStore.itemCount > 0"
          class="font-caption absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-surface-brick px-1 text-[10px] text-text-inverse"
        >
          {{ cartStore.itemCount }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>
