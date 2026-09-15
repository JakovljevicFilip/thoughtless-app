import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'

import {
  THOUGHT_DISCARDED_TOPIC,
  type ThoughtDiscardedPayload,
} from 'src/application/Required/Event/Domain/Thought/ThoughtEvents'
import type { EventPayload } from 'src/application/Platform/EventBus/Domain/EventPayload'

export const thoughtPublisher = {
  discarded(id: string, discardedAt: Date): void {
    eventBus.publish<EventPayload<ThoughtDiscardedPayload>>(THOUGHT_DISCARDED_TOPIC, {
      id,
      data: { discardedAt },
    })
  },
} as const
