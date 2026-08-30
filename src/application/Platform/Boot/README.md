# Platform Boot Domain

## 1. Overview

Coordinates everything that has to happen before the rest of the application can rely on it.
Boot-time work splits into two different kinds of things, modeled as two subdomains:

- **Booter** — standing wiring. Registers something that stays active for the app's lifetime (e.g. an EventBus subscription). Has no "already done" state, so it isn't safe to re-run blindly — the coordinator, not the unit, is responsible for only running it once.
- **Runner** — bounded, idempotent tasks. Checks whether its work is already done before acting (e.g. "does this record exist yet?"), so it's always safe to re-run.

`Boot` guarantees all `Booter` work finishes before any `Runner` work starts, so nothing a `Run` might publish or trigger can race ahead of the wiring meant to receive it.

## 2. Structure

```text
/src/application/Platform/Boot/
 ├─ Application/
 │   └─ root-boot.ts                # Sequencer: Booter phase, then Runner phase
 ├─ Booter/
 │   ├─ Application/
 │   │   └─ root-booter.ts          # Coordinates Platform + Microservice + Example booters
 │   ├─ Domain/
 │   │   ├─ Booter.ts               # Coordinator contract
 │   │   ├─ Boot.ts                 # Unit contract
 │   │   └─ BooterError.ts          # Typed error
 │   └─ Booter.puml                 # Booter sequence diagram
 ├─ Runner/
 │   ├─ Application/
 │   │   └─ root-runner.ts          # Coordinates Platform + Microservice + Example runners
 │   ├─ Domain/
 │   │   ├─ Runner.ts               # Coordinator contract
 │   │   ├─ Run.ts                  # Unit contract
 │   │   └─ RunnerError.ts          # Typed error
 │   └─ Runner.puml                 # Runner sequence diagram
 └─ README.md
```

Each scope (Platform, Microservice, Example) owns its own aggregator — `platform-booter.ts`/`platform-runner.ts` live in `Platform/Application/`, `microservice-booter.ts`/`microservice-runner.ts` live in `Required/Application/Microservice/`, `example-booter.ts`/`example-runner.ts` live in `Required/Application/Example/` — not inside `Boot` itself. `Boot` only owns the shared contracts and the root-level sequencing; it never needs to know what any specific domain registers.

## 3. Purpose

- Give standing wiring (`Boot`/`Booter`) and bounded tasks (`Run`/`Runner`) separate, correctly-shaped contracts instead of forcing both through one.
- Guarantee ordering — all wiring is in place before any task runs — as a single structural fact (`root-boot.ts`), regardless of how many `Boot`s or `Run`s get added later.
- Keep the single Quasar boot-file entry point (`src/boot/app-boot.ts`) stable no matter how much app-specific boot logic grows inside `src/application`.

## 4. Usage

### Registering a Run (bounded, idempotent — checks its own "done" state)

```ts
import type { Run } from 'src/application/Platform/Boot/Runner/Domain/Run'

export const applyDexieMigrations: Run = {
  RUN_NAME: 'Runner.Platform.Storage.ApplyDexieMigrations',

  async run() {
    await applyPlatformVersions()
  },
}
```

### Registering a Boot (standing wiring — no "done" state, runs exactly once)

```ts
import type { Boot } from 'src/application/Platform/Boot/Booter/Domain/Boot'

export const subscribeToSomething: Boot = {
  BOOT_NAME: 'Boot.Platform.Example.SubscribeToSomething',

  boot() {
    eventBus.subscribe('some.topic', handler)
  },
}
```

Both get registered into their scope's aggregator (`platformRunner`/`platformBooter`, etc.), never directly into `quasar.config.ts`. All boot-time execution flows through:

`app-boot.ts → runBootSequence() → rootBooter.execute() → rootRunner.execute()`
