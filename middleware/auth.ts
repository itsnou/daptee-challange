export default defineNuxtRouteMiddleware(async (to, from) => {
  const loading = useState('loading', () => ref(true))
  const cookie = useCookie('user')
  if (cookie.value) {
    loading.value = false
    return
  }
  return navigateTo('/login')
})
