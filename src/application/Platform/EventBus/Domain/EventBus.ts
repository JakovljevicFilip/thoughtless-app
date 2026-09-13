export interface EventBusAdapter {
  publish<T>(topic: string, payload: T): void
  subscribe<T>(topic: string, handler: (payload: T) => void): () => void
}
