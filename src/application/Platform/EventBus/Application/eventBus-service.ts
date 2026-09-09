import EventBusFactory from '../Infrastructure/eventBus-factory'

import { logger } from 'src/application/Platform/Log/Application/log-service'

const bus = EventBusFactory.create()

export const eventBus = {
  publish<T>(topic: string, payload: T): void {
    try {
      bus.publish(topic, payload)
    } catch (error) {
      logger.write({ context: 'EventBus.publish', error })
    }
  },
  subscribe<T>(topic: string, handler: (payload: T) => void): () => void {
    return bus.subscribe(topic, handler)
  },
} as const
