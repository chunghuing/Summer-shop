export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  if (!authStore.user) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
