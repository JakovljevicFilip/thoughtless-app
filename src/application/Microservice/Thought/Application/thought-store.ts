import { getExpiresAt } from './Helper/thoughtExpiry-helper'
import type { ActiveThought } from './Types/ActiveThought'

import type { Thought } from '../Domain/Thought'
import type { ThoughtId } from '../Domain/ValueObject/ThoughtId'
import { ThoughtExpiryStatus } from '../Domain/ValueObject/ThoughtExpiryStatus'

import { defineStore } from 'pinia'

export const useThoughtStore = defineStore('TaskStore', {
  state: () => ({
    active: [] as ActiveThought[],
    discarded: [] as Thought[],
  }),

  actions: {
    setActiveThoughts(thoughts: Thought[]) {
      this.active = thoughts.map(t => ({
        ...t,
        expiresAt: getExpiresAt(t.created_at),
        expiryStatus: ThoughtExpiryStatus.IDLE,
      }))
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

    setActiveStatus(thoughtId: ThoughtId, status: ThoughtExpiryStatus) {
      const thought = this.active.find(t => t.id.equals(thoughtId))
      if (!thought) return

      thought.expiryStatus = status
    },
  },
})
