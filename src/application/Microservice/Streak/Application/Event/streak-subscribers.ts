import { streakService } from '../Service/streak-service'

import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'

import {
  THOUGHT_DISCARDED_TOPIC,
  type ThoughtDiscardedPayload,
} from 'src/application/Required/Event/Domain/Thought/ThoughtEvents'
import type { EventPayload } from 'src/application/Platform/EventBus/Domain/EventPayload'

import type { Boot } from 'src/application/Platform/Boot/Booter/Domain/Boot'

export const streakSubscriber: Boot = {
  BOOT_NAME: 'Boot.Microservice.Streak.Subscriber',

  boot() {
    eventBus.subscribe<EventPayload<ThoughtDiscardedPayload>>(THOUGHT_DISCARDED_TOPIC, payload => {
      void streakService.recordDiscard(payload.data.discardedAt)
    })
  },
}
