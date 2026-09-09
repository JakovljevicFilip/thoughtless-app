import { useFrontDeskStore } from '../frontDesk-store'

import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'

import { ORDER_READY_TOPIC, ORDER_SENT_AGAIN_TOPIC } from 'src/application/Required/Event/Domain/Example/OrderEvents'
import type { EventPayload } from 'src/application/Platform/EventBus/Domain/EventPayload'

import type { Boot } from 'src/application/Platform/Boot/Booter/Domain/Boot'

export const frontDeskSubscriber: Boot = {
  BOOT_NAME: 'Boot.Example.FrontDesk.Subscriber',

  boot() {
    eventBus.subscribe<EventPayload>(ORDER_READY_TOPIC, (payload) => {
      useFrontDeskStore().markReady(payload.id)
    })

    eventBus.subscribe<EventPayload>(ORDER_SENT_AGAIN_TOPIC, (payload) => {
      useFrontDeskStore().markReadyAgain(payload.id)
    })
  },
}
