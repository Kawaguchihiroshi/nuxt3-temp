export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to !== from) {
    return navigateTo("/homepage")
  }
})
