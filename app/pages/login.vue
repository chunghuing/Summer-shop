<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  isSubmitting.value = true
  errorMessage.value = null
  try {
    await authStore.login(email.value, password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirect)
  } catch (err) {
    errorMessage.value = getErrorMessage(err, '登入失敗，請稍後再試')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col gap-6 px-6 py-24 md:px-0">
    <div class="flex flex-col gap-2">
      <h1 class="font-heading text-3xl text-text-primary">歡迎回來</h1>
      <p class="font-caption text-sm text-text-secondary">登入以查看訂單與購物車</p>
    </div>

    <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
      <UiFormField
        v-model="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autocomplete="email"
      />
      <UiFormField
        v-model="password"
        label="密碼"
        type="password"
        placeholder="請輸入密碼"
        autocomplete="current-password"
      />

      <p v-if="errorMessage" class="font-caption text-sm text-surface-brick">{{ errorMessage }}</p>

      <button
        type="submit"
        class="font-caption w-full bg-surface-brick py-4 text-sm tracking-widest text-text-inverse disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? '登入中…' : '登入' }}
      </button>

      <p class="font-caption flex justify-center gap-1 text-sm text-text-secondary">
        還沒有帳號？
        <NuxtLink
          :to="{ path: '/register', query: route.query }"
          class="text-accent-brick underline"
        >
          註冊
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
