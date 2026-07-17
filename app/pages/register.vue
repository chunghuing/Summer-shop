<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  errorMessage.value = null

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '兩次輸入的密碼不一致'
    return
  }

  isSubmitting.value = true
  try {
    await authStore.register(fullName.value, email.value, password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirect)
  } catch (err) {
    errorMessage.value = getErrorMessage(err, '註冊失敗，請稍後再試')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col gap-6 px-6 py-24 md:px-0">
    <div class="flex flex-col gap-2">
      <h1 class="font-heading text-3xl text-text-primary">建立帳號</h1>
      <p class="font-caption text-sm text-text-secondary">加入會員享新會員 9 折優惠</p>
    </div>

    <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
      <UiFormField
        v-model="fullName"
        label="姓名"
        placeholder="請輸入您的姓名"
        autocomplete="name"
      />
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
        placeholder="至少 8 碼"
        autocomplete="new-password"
      />
      <UiFormField
        v-model="confirmPassword"
        label="確認密碼"
        type="password"
        placeholder="請再輸入一次密碼"
        autocomplete="new-password"
      />

      <p v-if="errorMessage" class="font-caption text-sm text-surface-brick">
        {{ errorMessage }}
      </p>

      <button
        type="submit"
        class="font-caption w-full bg-surface-brick py-4 text-sm tracking-widest text-text-inverse disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? '建立中…' : '建立帳號' }}
      </button>

      <p class="font-caption text-center text-xs text-text-secondary">
        註冊即表示您同意會員條款與隱私權政策
      </p>

      <p class="font-caption flex justify-center gap-1 text-sm text-text-secondary">
        已經有帳號？
        <NuxtLink :to="{ path: '/login', query: route.query }" class="text-accent-brick underline">
          登入
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
