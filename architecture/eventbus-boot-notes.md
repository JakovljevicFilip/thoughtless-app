# EventBus / Boot / Runner — Working Notes

## Done (docs/architecture)

- Tightened `ddd.md` §3.2.3: Infrastructure may depend only on Domain (was: Domain and Application).
- Removed the unused "Response Contract" entry from `files.md` — confirmed via git history it was never implemented, superseded by `Aggregate.rebuild()` + Domain Rebuild Rule.
- Confirmed `ThoughtStorage`/`TaskStorage` constructing their own Repository Client directly (`new ThoughtDexie(client)`) is not a Provider-pattern violation — they act as the Maker for their own Repository contract.
- Agreed sibling subdomains should not access each other directly (not yet written into `ddd.md` §3.7).

## Done (docs/architecture), continued

- Amended `ddd.md` §3.7: subdomains may depend on type-only contracts from their parent, but not runtime values (classes, singletons, functions). Resolves the `dexie-boot.ts → Storage/Domain/StorageBoot` case — the `import type` stays, no fix needed there.

## Open questions

## Done (implementation)

- Created `Platform/Boot` domain: `Booter`/`Boot`/`BooterError` contracts (mirroring `Runner`/`Run`/`RunnerError`), `root-booter.ts`, top-level `root-boot.ts` sequencing Booter phase then Runner phase.
- Moved `Platform/Runner` → `Platform/Boot/Runner` (all importers updated).
- Corrected an initial miscategorization: Storage's Dexie migration work (`applyPlatformVersions`/`applyMicroserviceVersions`) is a bounded, idempotent, one-shot task, not standing wiring — it's a `Run`, not a `Boot`. Moved it to `applyDexieMigrations-run.ts`, registered first in `platform-runner.ts` (ahead of `createDemoTask`/`createDarkModeEntity`, which depend on it). Deleted `Storage/Domain/StorageBoot.ts` and the old `dexie-boot.ts`. `platform-booter.ts`/`microservice-booter.ts` stay in place as empty placeholders, ready for `Booter`'s actual proof case — EventBus's subscription wiring, still pending below.
- Collapsed `quasar.config.ts`'s `boot: [...]` from `['axios', 'storage-boot', 'runner-boot']` to `['axios', 'app-boot']`; new `src/boot/app-boot.ts` calls `runBootSequence()`.
- Verified: lint clean, `vue-tsc --noEmit` clean, production build succeeds, confirmed in-browser (boot logs clean, task add/edit/remove still work).

## Done (implementation), continued (2) — reimplemented against current main

- The `Platform/EventBus` work above had been stashed (`stash@{0}`, "On unassigned: EventBus") while unrelated architecture work landed on `main`: the `_{DomainName}` self-layering convention (`ddd.md` §3.8, `Platform/_Platform/...`), `Example` becoming a top-level domain (`src/application/Example/*`, no longer `Platform/Example/*`), and `Required` organizing its registries by owning domain (`Required/Application/Example/`, `Required/Application/Microservice/`). Rather than pop-and-resolve the stash onto paths that no longer exist, the feature was rebuilt fresh against current `main`, carrying over the stash's design decisions but re-pathed.
- `Platform/EventBus` module itself is unaffected by the restructuring — same paths as originally designed: `Domain/{EventBus,EventBusError,EventPayload}.ts`, `Application/eventBus-service.ts`, `Infrastructure/{eventBus-factory.ts,Adapter/inMemory-adapter.ts}`.
- Notification wiring (`NotifyEvent.ts`, `notifyEvent-service.ts`, `subscribeNotify-boot.ts`) is unchanged in shape, but now registers into `Platform/_Platform/Application/platform-booter.ts` (the current home for Platform's own standing wiring) instead of the old `Platform/Application/platform-booter.ts`.
- `Task` domain's `notifyEvent` wiring now lives at `Example/Task/...` (top-level Example), matching where Task already moved to on `main` independent of this work.
- The `FrontDesk`/`Station` demo now lives at `Example/EventBusDemo/...` (top-level Example, sibling of `Example/Task`) instead of `Platform/Example/EventBusDemo/...` — this was itself one of the two items previously listed below as "pending," resolved as part of this reimplementation rather than separately. Its index page also drops the `Home/` sub-nesting the original design copied from Task's convention — that nesting is Task-specific, not a documented rule; `Example/Documentation` already established the plainer `Application/IndexPage.vue` shape.
- The neutral event registry moved from `Required/Event/Domain/Platform/OrderEvents.ts` to `Required/Event/Domain/Example/OrderEvents.ts`, matching FrontDesk/Station's new home and the `Required/Application/Example/` / `Required/Infrastructure/Storage/Dexie/Example/` domain-ownership convention already established on `main`.
- The four demo subscribers now register into `Required/Application/Example/example-booter.ts` rather than being bundled into `platform-booter.ts` alongside Notification's subscription — a deliberate improvement, since the demo domain's own booter is exactly where its own wiring belongs now that `Example` has one.
- The other item previously listed as "pending" — consolidating Platform's registry files (`platform-{booter,runner}.ts`, `platform-versions.ts`) so `Required` is the sole place for all such registries — was also resolved on `main` independently, via the `_Platform` self-layering convention rather than a move into `Required`. No further action needed here.
- Verified: lint clean, `vue-tsc --noEmit` clean, build succeeds, confirmed in-browser (Task add/edit/remove still notify correctly; EventBusDemo's full four-event round trip works both directions).

## Done (implementation), continued (3) — Event file consolidation, `files.md` §3.4

- Settled on a simpler, final Event file convention, documented in `files.md` §3.4 (a new top-level rule, sibling of §3.3 — Publisher/Subscriber are Application-layer, Event Registry is Domain-layer, so the group didn't fit under any one layer's schema): one `{domain}-publisher.ts` and one `{domain}-subscriber.ts` per domain (not per event), both under `Application/Event/` with no further `Publisher/`/`Subscriber/` subfolders; the Event Registry (topic constants) is placed under whichever system domain owns the event — `Platform/_Platform/Event/Domain/` for Platform, `Required/Event/Domain/Example/` for Example, `Required/Event/Domain/Microservice/` for Microservice — mirroring the existing booter/runner split.
- Migrated all existing Event code to match: `NotifyEvent.ts` moved from `Notification/InApp/Domain/Event/` to `Platform/_Platform/Event/Domain/`; `notifyEvent-service.ts` → `Notification/InApp/Application/Event/notify-publisher.ts`; `Notification/InApp/Application/Booter/subscribeNotify-boot.ts` → `Notification/InApp/Application/Event/notify-subscriber.ts`.
- FrontDesk's two per-event subscriber files (`orderReady-subscriber.ts`, `orderSentAgain-subscriber.ts`) collapsed into one `Event/frontDesk-subscriber.ts` Boot subscribing both topics; its publishing (previously inline in `frontDesk-service.ts`) extracted to `Event/frontDesk-publisher.ts`. Station mirrored the same way (`station-publisher.ts`/`station-subscriber.ts`, replacing its two per-event subscriber files). `example-booter.ts` now registers two subscribers instead of four.
- Verified: lint clean, `vue-tsc --noEmit` clean, build succeeds.
