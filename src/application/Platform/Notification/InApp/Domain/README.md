# Platform In-App Notification Module

## 1. Overview

Provides the platform-level in-app notification abstraction used across the application.
The goal is to standardize user-facing feedback (success, info, warnings, errors) without binding application code to a specific UI framework such as Quasar.

## 2. Structure

```text
/src/application/Platform/Notification/InApp/
 ├─ Application/
 │   ├─ inAppNotification-service.ts      # Low-level adapter API — called only by notify-subscriber, not by feature domains directly
 │   └─ Event/
 │       ├─ notify-publisher.ts            # Public entry point for feature domains — publishes a notify event onto the EventBus
 │       └─ notify-subscriber.ts           # Boot: subscribes the notify topic, forwards to inAppNotification-service
 ├─ Domain/
 │   └─ InAppNotification.ts              # Adapter interface
 ├─ Infrastructure/
 │   ├─ Adapter/
 │   │   └─ quasar-adapter.ts             # Implementation using Quasar Notify
 │   └─ inAppNotification-factory.ts      # Returns the active adapter
 └─ README.md
```

The topic/payload contract (`NOTIFY_TOPIC`, `NotifyEventPayload`) doesn't live in
this domain's own `Domain/Event/` — it's an Event Registry, placed at
`Platform/_Platform/Event/Domain/NotifyEvent.ts` per `files.md` §3.4.

## 3. Purpose

- Define a domain-level contract (`InAppNotificationAdapter`) that all notification mechanisms must follow.
- Provide a simple Quasar-based MVP adapter for displaying popup notifications.
- Offer a stable, adapter-agnostic API (`inAppNotification-service.ts`) for the subscriber to call.
- Allow future adapters (e.g., custom toast component, device-level notifications) without changing application logic.
- Serve as the project's notification-flow example: a feature domain (`Example/Task`) publishes through `notifyPublisher` rather than calling the notification adapter directly, decoupling "something happened" from "how it's shown" via `Platform/EventBus`. This is distinct from `Example/EventBusDemo`, which teaches the EventBus itself.

## 4. Usage

### Application code

```ts
import { notifyPublisher } from './application/Platform/Notification/InApp/Application/Event/notify-publisher'

notifyPublisher.success('Saved successfully!')
notifyPublisher.warning('Something feels off…')
```

All notifications flow through:

`Publisher → EventBus → Subscriber → Service → Factory → Adapter → Quasar Notify`
