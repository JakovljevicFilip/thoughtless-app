import { ThoughtSettings } from '../../Domain/ThoughtSettings'

import { thoughtStorage } from '../../Infrastructure/thought-storage'

import type { Run } from 'src/application/Platform/Runner/Domain/Run'

export const removeExpired: Run = {
  RUN_NAME: 'Runner.Microservice.Thought.RemoveExpired',

  async run() {
    const active = await thoughtStorage.listActive()

    const expired = active.filter(thought => {
      const MS_PER_DAY = 24 * 60 * 60 * 1000
      const expiresAt = thought.created_at.getTime() + ThoughtSettings.lifetimeDays * MS_PER_DAY
      return expiresAt <= Date.now()
    })
    await thoughtStorage.removeMultiple(expired)
  },
}
