import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'

import { ORDER_READY_TOPIC, ORDER_SENT_AGAIN_TOPIC } from 'src/application/Required/Event/Domain/Example/OrderEvents'
import type { EventPayload } from 'src/application/Platform/EventBus/Domain/EventPayload'

export const stationPublisher = {
  orderReady(id: string): void {
    eventBus.publish<EventPayload>(ORDER_READY_TOPIC, { id, data: undefined })
  },
  orderSentAgain(id: string): void {
    eventBus.publish<EventPayload>(ORDER_SENT_AGAIN_TOPIC, { id, data: undefined })
  },
} as const
