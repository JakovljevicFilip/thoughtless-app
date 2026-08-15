# EventBus / Boot / Runner — Working Notes

## Done (docs/architecture)

- Tightened `ddd.md` §3.2.3: Infrastructure may depend only on Domain (was: Domain and Application).
- Removed the unused "Response Contract" entry from `files.md` — confirmed via git history it was never implemented, superseded by `Aggregate.rebuild()` + Domain Rebuild Rule.
- Confirmed `ThoughtStorage`/`TaskStorage` constructing their own Repository Client directly (`new ThoughtDexie(client)`) is not a Provider-pattern violation — they act as the Maker for their own Repository contract.
- Agreed sibling subdomains should not access each other directly (not yet written into `ddd.md` §3.7).

## Done (docs/architecture), continued

- Amended `ddd.md` §3.7: subdomains may depend on type-only contracts from their parent, but not runtime values (classes, singletons, functions). Resolves the `dexie-boot.ts → Storage/Domain/StorageBoot` case — the `import type` stays, no fix needed there.

## Open questions

## Pending implementation (ordered by dependency)

1. Create a `Boot` domain, generalizing the existing `StorageBoot`/`dexie-boot` pattern.
2. Move `Runner` to become a subdomain of `Boot`.
3. Add a `ServiceBooter` (name TBD) subdomain that runs before `Runner` and boots actual services.
4. Finalize `Platform/EventBus` — move Notification's subscription off `subscribeNotify-run.ts` (a Run) onto `ServiceBooter`.
5. Collapse `quasar.config.ts`'s `boot: [...]` array down to a single entry point.
