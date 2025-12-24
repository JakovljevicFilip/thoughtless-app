import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { ThoughtSettings } from 'src/application/Microservice/Thought/Domain/ThoughtSettings'

import type { Filter } from 'src/application/Platform/Service/Domain/CQRS/Query/Filter'

const MS_PER_DAY = 24 * 60 * 60 * 1000

export class ActiveFilter implements Filter<Thought> {
  filter(active: Thought[]): Thought[] {
    const now = Date.now()
    const lifetimeMs = ThoughtSettings.lifetimeDays * MS_PER_DAY
    return active.filter(thought => {
      const expiresAt = thought.created_at.getTime() + lifetimeMs
      return expiresAt > now
    })
  }
}

export const activeFilter = new ActiveFilter()
