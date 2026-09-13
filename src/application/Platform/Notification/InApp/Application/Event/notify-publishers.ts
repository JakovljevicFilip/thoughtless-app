import { eventBus } from 'src/application/Platform/EventBus/Application/eventBus-service'

import { NOTIFY_TOPIC, type NotifyEventPayload } from 'src/application/Platform/_Platform/Event/Domain/NotifyEvent'

export const notifyPublisher = {
  success(message: string): void {
    eventBus.publish<NotifyEventPayload>(NOTIFY_TOPIC, { type: 'success', message })
  },
  info(message: string): void {
    eventBus.publish<NotifyEventPayload>(NOTIFY_TOPIC, { type: 'info', message })
  },
  warning(message: string): void {
    eventBus.publish<NotifyEventPayload>(NOTIFY_TOPIC, { type: 'warning', message })
  },
} as const
