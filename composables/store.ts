export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)
  const userId = ref("")
  const userToken = ref("")
  function increment(id: string, token: string) {
    count.value++
    userId.value = id
    userToken.value = token
  }
  return { count, increment, userId, userToken }
})
