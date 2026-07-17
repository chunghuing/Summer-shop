export type AuthUser = {
  email: string
  fullName: string
}

type StoredAccount = {
  email: string
  fullName: string
  passwordHash: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = useCookie<AuthUser | null>('ma_user', { default: () => null })
  const accounts = useCookie<StoredAccount[]>('ma_accounts', { default: () => [] })

  async function login(email: string, password: string) {
    if (!email || !password) {
      throw createError({ statusCode: 400, statusMessage: '請輸入 Email 與密碼' })
    }
    const normalizedEmail = email.trim().toLowerCase()
    const account = accounts.value.find((a) => a.email === normalizedEmail)
    if (!account) {
      throw createError({ statusCode: 404, statusMessage: '帳號不存在' })
    }
    const passwordHash = await hashPassword(password)
    if (passwordHash !== account.passwordHash) {
      throw createError({ statusCode: 401, statusMessage: '密碼錯誤' })
    }
    user.value = { email: account.email, fullName: account.fullName }
  }

  async function register(fullName: string, email: string, password: string) {
    if (!email || !password) {
      throw createError({ statusCode: 400, statusMessage: '請輸入 Email 與密碼' })
    }
    if (password.length < 8) {
      throw createError({ statusCode: 400, statusMessage: '密碼至少需要 8 碼' })
    }
    const normalizedEmail = email.trim().toLowerCase()
    if (accounts.value.some((a) => a.email === normalizedEmail)) {
      throw createError({ statusCode: 409, statusMessage: '此 Email 已經註冊過，請直接登入' })
    }
    const passwordHash = await hashPassword(password)
    const resolvedFullName = fullName || normalizedEmail.split('@')[0] || normalizedEmail
    accounts.value = [
      ...accounts.value,
      { email: normalizedEmail, fullName: resolvedFullName, passwordHash }
    ]
    user.value = { email: normalizedEmail, fullName: resolvedFullName }
  }

  function logout() {
    user.value = null
  }

  return { user, login, register, logout }
})
