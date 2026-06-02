import { useThoughtStore } from 'src/application/Microservice/Thought/Application/thought-store'

import { getExpiryStatusFromExpiresAt } from 'src/application/Microservice/Thought/Domain/Rules/thoughtExpiry-rules'

import { onMounted, onUnmounted } from 'vue'

export const useThoughtExpiry = () => {
  const store = useThoughtStore()
  let timer: number

  const tick = () => {
    const now = Date.now()

    for (const thought of store.active) {
      thought.expiryStatus = getExpiryStatusFromExpiresAt(thought.expiresAt, now)
    }
  }

  onMounted(() => {
    tick()
    timer = window.setInterval(tick, 60_000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })
}
