import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ExistingThought } from 'src/types/ExistingThought'

export const useThoughtsStore = defineStore('thoughts', () => {
  const thoughts = ref<ExistingThought[]>([])

  function addThought(thought: ExistingThought) {
    thoughts.value.push(thought)
  }

  return { thoughts, addThought }
})
