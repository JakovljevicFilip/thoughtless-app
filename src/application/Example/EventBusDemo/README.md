# EventBus Demo: FrontDesk + Station

## 1. Overview

The `Platform/EventBus` teaching example: two genuinely independent domains, FrontDesk and Station, talking to each other in **both directions** purely through the bus, instead of one domain being imported directly by another. (`Example/Task`'s use of `notifyPublisher`/`notifySubscriber` is a separate example — it teaches the notification flow, not the EventBus itself; see `Notification/InApp/Domain/README.md`.)

- **FrontDesk** takes orders, waits to hear that they're ready, and can send a ready order back to Station or send it out to the customer.
- **Station** hears about new orders, prepares them on request, and reports back — using a distinct event when re-preparing a returned order.

Neither domain ever imports the other's service, store, or event contracts directly. The four event topics live in a neutral registry both sides import from, and the EventBus itself is the only other thing crossing the boundary. Publishing and subscribing are each factored into their own per-domain file (`files.md` §3.4: Publisher/Subscriber), separate from the service that owns the actual business logic.

## 2. Structure

```text
/src/application/Required/Event/Domain/Example/   # Neutral registry — both FrontDesk and Station import from here
 └─ OrderEvents.ts   # all four Order* topic constants, grouped by domain

/src/application/Example/EventBusDemo/
 ├─ Application/IndexPage.vue           # Composite demo page — imports both panels, display only
 ├─ FrontDesk/
 │   ├─ Domain/
 │   │   ├─ Order.ts                      # { id, item, status: 'placed' | 'ready', sentAgain }
 │   │   ├─ FrontDeskDomainError.ts
 │   │   └─ Rules/frontDesk-rules.ts
 │   └─ Application/
 │       ├─ frontDesk-store.ts             # orders[] / log[] entries — placed, ready, returned, sent again
 │       ├─ frontDesk-service.ts           # placeOrder/returnOrder — delegates publishing to frontDesk-publisher
 │       ├─ Event/
 │       │   ├─ frontDesk-publisher.ts      # orderPlaced/orderReturned
 │       │   └─ frontDesk-subscriber.ts     # single Boot: subscribes OrderReady + OrderSentAgain
 │       └─ FrontDeskPanel.vue
 └─ Station/
     └─ Application/
         ├─ station-store.ts              # pending[] / log[] entries carry isRepeat
         ├─ station-service.ts            # receiveOrder/receiveReturnedOrder/prepareOrder — delegates publishing to station-publisher
         ├─ Event/
         │   ├─ station-publisher.ts        # orderReady/orderSentAgain
         │   └─ station-subscriber.ts       # single Boot: subscribes OrderPlaced + OrderReturned
         └─ StationPanel.vue
```

## 3. Event flow

```text
FrontDesk.placeOrder(item)
  → store.add(order)               [orders.unshift(...); log entry "placed"]
  → frontDesk-publisher.orderPlaced   → publish OrderPlaced [Required/Event/Domain/Example/OrderEvents]

station-subscriber (OrderPlaced)
  → station-service.receiveOrder(orderId, item)
    → store.pending.push(...)    [order waits here until staff act on it]

Station staff clicks "Prepare" (first time — isRepeat: false)
  → station-service.prepareOrder(orderId)
    → store moves order: pending → log
    → station-publisher.orderReady   → publish OrderReady [Required/Event/Domain/Example/OrderEvents]

frontDesk-subscriber (OrderReady)
  → store.markReady(orderId)     [status: placed → ready; log entry "ready"]

FrontDesk staff clicks "Send Back" on a ready order
  → frontDesk-service.returnOrder(orderId)
    → store.returnToStation(orderId)   [status: ready → placed; log entry "returned"]
    → frontDesk-publisher.orderReturned   → publish OrderReturned [Required/Event/Domain/Example/OrderEvents]

station-subscriber (OrderReturned)
  → station-service.receiveReturnedOrder(orderId, item)   [re-queued into pending with isRepeat: true]

Station staff clicks "Prepare" again (isRepeat: true)
  → station-service.prepareOrder(orderId)
    → store moves order: pending → log, entry shown as "item - (sent again)"
    → station-publisher.orderSentAgain   → publish OrderSentAgain [Required/Event/Domain/Example/OrderEvents — distinct from OrderReady]

frontDesk-subscriber (OrderSentAgain)
  → store.markReadyAgain(orderId)   [status: ready, sentAgain: true; log entry "sent again"]

FrontDesk staff clicks "Send Out" on a ready order
  → frontDesk-service.sendOut(orderId)
    → store.sendOut(orderId)   [order removed from orders[]; log entry "sent out"]
    [no event published — purely local, Station has no reason to know]
```

FrontDesk's `log[]` mirrors Station's: an append-only activity history, separate from the live `orders[]` list, shown as its own "Activity" section in `FrontDeskPanel.vue`. Unlike Station's log (populated only from the local "Prepare" action), FrontDesk's log records both local staff actions (`placed`, `returned`, `sent out`) and incoming events from Station (`ready`, `sent again`) — every store action that changes an order appends an entry.

"Send Out" is FrontDesk's terminal action, the equivalent of Station's `pending → log` transition: once an order is sent out it leaves `orders[]` entirely and only survives as a log entry.

Topic placement follows `files.md` §3.4 (Event Registry): FrontDesk and Station are peer domains — both publish and interpret each other's events, so neither is a natural "owner." All four topic constants live in the neutral `Required/Event/Domain/Example/` registry (named for the system domain FrontDesk/Station belong to), imported by whichever side's Publisher or Subscriber needs it. Neither domain ever imports from the other directly — each side's `service.ts` only talks to its own `Event/{domain}-publisher.ts`, never to `eventBus` or the registry directly.

## 4. Current status

Fully wired to `Platform/EventBus` across all four events (`OrderPlaced`, `OrderReady`, `OrderReturned`, `OrderSentAgain`), following `files.md` §3.4's Publisher/Subscriber/Event Registry split: each side's `service.ts` delegates publishing to its own `Event/{domain}-publisher.ts`, and each side's single `Event/{domain}-subscriber.ts` (implements `Boot`, registered in `Required/Application/Example/example-booter.ts`) subscribes to every topic that domain listens for. Full loop verified in-browser: place → prepare ("placed" → "ready") → send back ("ready" → "placed", re-queued at Station) → prepare again ("ready", tagged "sent again" on both FrontDesk's list and Station's Prepared log).
