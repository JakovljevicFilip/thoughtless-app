import type { ActiveThought } from './Types/ActiveThought'

import type { Thought } from '../Domain/Thought'

import { defineStore } from 'pinia'

export const useThoughtStore = defineStore('TaskStore', {
  state: () => ({
    active: [] as ActiveThought[],
    discarded: [] as Thought[],
  }),

  actions: {
    setActiveThoughts(thoughts: ActiveThought[]) {
      this.active = thoughts
    },

    setDiscardedThoughts(discarded: Thought[]) {
      this.discarded = discarded
    },

    getOldestDiscarded(): Thought | null {
      if (this.discarded.length === 0) return null

      // TODO: discarded_at! is a good argument that Active and Discarded should be 2 separate aggregates.
      return this.discarded.reduce((oldest, current) => {
        return new Date(current.discarded_at!) < new Date(oldest.discarded_at!) ? current : oldest
      })
    },
  },
})
