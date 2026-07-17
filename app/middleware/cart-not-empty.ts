export default defineNuxtRouteMiddleware(() => {
  const cartStore = useCartStore()
  if (cartStore.items.length === 0) {
    return navigateTo('/cart')
  }
})
