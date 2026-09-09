import { stationService } from '../station-service'

import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'

import { ORDER_PLACED_TOPIC, ORDER_RETURNED_TOPIC } from 'src/application/Required/Event/Domain/Example/OrderEvents'
import type { EventPayload } from 'src/application/Platform/EventBus/Domain/EventPayload'

import type { Boot } from 'src/application/Platform/Boot/Booter/Domain/Boot'

export const stationSubscriber: Boot = {
  BOOT_NAME: 'Boot.Example.Station.Subscriber',

  boot() {
    eventBus.subscribe<EventPayload<{ item: string }>>(ORDER_PLACED_TOPIC, (payload) => {
      stationService.receiveOrder(payload.id, payload.data.item)
    })

    eventBus.subscribe<EventPayload<{ item: string }>>(ORDER_RETURNED_TOPIC, (payload) => {
      stationService.receiveReturnedOrder(payload.id, payload.data.item)
    })
  },
}
