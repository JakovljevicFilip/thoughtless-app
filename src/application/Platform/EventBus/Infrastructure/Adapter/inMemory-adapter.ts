import type { EventBusAdapter } from '../../Domain/EventBus'
import { EventBusError } from '../../Domain/EventBusError'

type Handler = (payload: unknown) => void

export default class InMemoryAdapter implements EventBusAdapter {
  private readonly subscribers = new Map<string, Set<Handler>>()

  publish<T>(topic: string, payload: T): void {
    const handlers = this.subscribers.get(topic)
    if (!handlers) return

    const errors: unknown[] = []

    for (const handler of handlers) {
      try {
        handler(payload)
      } catch (error) {
        errors.push(error)
      }
    }

    if (errors.length > 0) {
      throw new EventBusError(topic, errors)
    }
  }

  // Cast contained here: publishers and subscribers agree on payload shape via a shared contract file.
  subscribe<T>(topic: string, handler: (payload: T) => void): () => void {
    const handlers = this.subscribers.get(topic) ?? new Set<Handler>()
    handlers.add(handler as Handler)
    this.subscribers.set(topic, handlers)

    return () => {
      handlers.delete(handler as Handler)
    }
  }
}
