# Platform Event Bus Module

## 1. Overview

Provides the platform-level publish/subscribe abstraction used for decoupled communication between domains.
The goal is to let one domain announce that something happened without importing or calling another domain's concrete service directly.

## 2. Structure

```text
/src/application/Platform/EventBus/
 ├─ Application/
 │   └─ eventBus-service.ts     # Public API for publishing and subscribing
 ├─ Domain/
 │   ├─ EventBus.ts             # Adapter interface
 │   └─ EventPayload.ts         # Generic { id, data } envelope used by publishers/subscribers
 ├─ Infrastructure/
 │   ├─ Adapter/
 │   │   └─ inMemory-adapter.ts # In-memory, single-process pub/sub implementation
 │   └─ eventBus-factory.ts     # Returns the active adapter
 └─ README.md
```

## 3. Purpose

- Define a domain-level contract (`EventBusAdapter`) that all bus mechanisms must follow.
- Provide a simple in-memory MVP adapter (no persistence, no cross-tab delivery).
- Offer a stable, adapter-agnostic API (`eventBus-service.ts`) for all Platform and microservice code.
- Keep the bus itself unaware of any domain's topic names or business-specific payload shapes — those live in an Event Registry placed under the owning system domain's own registry location (see e.g. `Platform/_Platform/Event/Domain/NotifyEvent.ts`, `files.md` §3.4).
- Own the generic `EventPayload<T>` envelope (`Domain/EventPayload.ts`): the `{ id, data }` shape every event on the bus is wrapped in. This is the bus's own convention, not a domain-specific contract — domains supply `T`, not the envelope itself.

## 4. Usage

### Publishing

```ts
import { eventBus } from './application/Platform/EventBus/Application/eventBus-service'
import { NOTIFY_TOPIC, type NotifyEventPayload } from './application/Platform/_Platform/Event/Domain/NotifyEvent'

eventBus.publish<NotifyEventPayload>(NOTIFY_TOPIC, { type: 'success', message: 'Saved successfully!' })
```

### Subscribing

```ts
const unsubscribe = eventBus.subscribe<NotifyEventPayload>(NOTIFY_TOPIC, (payload) => {
  // react to the event
})
```

All events flow through:

`Publisher → Service → Factory → Adapter → Subscribers`
