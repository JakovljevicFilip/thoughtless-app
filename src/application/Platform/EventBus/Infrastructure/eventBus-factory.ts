import type { EventBusAdapter } from '../Domain/EventBus'
import InMemoryAdapter from './Adapter/inMemory-adapter'

export default class EventBusFactory {
  static create(): EventBusAdapter {
    return new InMemoryAdapter()
  }
}
