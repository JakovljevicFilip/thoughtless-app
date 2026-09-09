import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'
import { notify } from '../inAppNotification-service'

import { NOTIFY_TOPIC, type NotifyEventPayload } from 'src/application/Platform/_Platform/Event/Domain/NotifyEvent'

import type { Boot } from 'src/application/Platform/Boot/Booter/Domain/Boot'

export const notifySubscriber: Boot = {
  BOOT_NAME: 'Boot.Platform.Notification.Subscriber',

  boot() {
    eventBus.subscribe<NotifyEventPayload>(NOTIFY_TOPIC, (payload) => {
      notify[payload.type](payload.message)
    })
  },
}
