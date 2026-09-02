# Platform's Own Layering

## 1. Overview

Holds `Platform`'s own composition — the standing wiring and bounded tasks that
assemble Platform's *own* capability subdomains (`DarkMode`, `Storage`, …)
into the `Boot` lifecycle, plus Platform's own Dexie schema. None of this
defines a new capability; it only wires existing ones together.

The `_Platform` name marks it as *not* a capability subdomain — a directory
prefixed with `_{DomainName}` holds that domain's own `Domain`/`Application`/
`Infrastructure` layering, distinct from its real subdomains. See
`architecture/ddd.md` §3.8 for the general convention.

## 2. Structure

```text
/src/application/Platform/_Platform/
 ├─ Application/
 │   ├─ platform-booter.ts      # Platform's standing wiring, registered into rootBooter
 │   └─ platform-runner.ts      # Platform's bounded tasks, registered into rootRunner
 ├─ Infrastructure/
 │   └─ Storage/
 │       └─ Dexie/
 │           └─ platform-versions.ts   # Platform's own Dexie DB + schema versions
 └─ README.md
```

## 3. Purpose

- `platform-booter.ts` — Platform's `Booter` aggregate (`BOOTER_NAME: 'platform'`). Groups standing wiring that stays active for the app's lifetime.
- `platform-runner.ts` — Platform's `Runner` aggregate (`RUNNER_NAME: 'platform'`). Runs bounded, idempotent tasks — today: applying Dexie migrations and creating the `DarkMode` entity.
- `platform-versions.ts` — Defines `platformDb` (the `PlatformDB` Dexie database) and `applyPlatformVersions()`, which declares its `.version().stores()` schema.

## 4. Usage

Both aggregates are registered into the root sequencer, never accessed
directly by consumers outside `Platform/Boot`:

```ts
import { platformBooter } from 'src/application/Platform/_Platform/Application/platform-booter'
import { platformRunner } from 'src/application/Platform/_Platform/Application/platform-runner'
```

- `platformBooter`/`platformRunner` are consumed by `rootBooter`/`rootRunner` in `Platform/Boot/Booter/Application/root-booter.ts` and `Platform/Boot/Runner/Application/root-runner.ts` — see `Platform/Boot/README.md`.
- `platformDb`/`applyPlatformVersions` are consumed by `applyDexieMigrations-run.ts` and `DexieAggregate.ts` in `Platform/Storage/Dexie/`.

`Platform/_Platform → Platform/Boot (root-booter/root-runner) → app-boot.ts`
