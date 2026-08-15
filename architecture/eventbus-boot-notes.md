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

## Pending implementation (ordered by dependency)

1. Finalize `Platform/EventBus` — move Notification's subscription off `subscribeNotify-run.ts` (a Run) onto `Booter` (currently stashed, see `git stash list`).
