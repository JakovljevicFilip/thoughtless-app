import type { Streak } from '../Domain/Streak'

import { defineStore } from 'pinia'

export const useStreakStore = defineStore('StreakStore', {
  state: () => ({
    streak: null as Streak | null,
    isReady: false,
  }),

  getters: {
    currentStreak: (state): number => state.streak?.currentStreak ?? 0,
  },

  actions: {
    setStreak(streak: Streak) {
      this.streak = streak
    },

    setReady(value: boolean) {
      this.isReady = value
    },
  },
})
