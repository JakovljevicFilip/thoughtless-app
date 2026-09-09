import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'

import { ORDER_PLACED_TOPIC, ORDER_RETURNED_TOPIC } from 'src/application/Required/Event/Domain/Example/OrderEvents'
import type { EventPayload } from 'src/application/Platform/EventBus/Domain/EventPayload'

export const frontDeskPublisher = {
  orderPlaced(id: string, item: string): void {
    eventBus.publish<EventPayload<{ item: string }>>(ORDER_PLACED_TOPIC, { id, data: { item } })
  },
  orderReturned(id: string, item: string): void {
    eventBus.publish<EventPayload<{ item: string }>>(ORDER_RETURNED_TOPIC, { id, data: { item } })
  },
} as const
