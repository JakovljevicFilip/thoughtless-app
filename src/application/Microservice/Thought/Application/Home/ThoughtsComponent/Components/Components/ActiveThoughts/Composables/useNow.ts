import { ref, onMounted, onUnmounted } from 'vue'

export function useNow(intervalMs = 60_000) {
  const now = ref(Date.now())
  let timer: number

  onMounted(() => {
    timer = window.setInterval(() => {
      now.value = Date.now()
    }, intervalMs)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return now
}
