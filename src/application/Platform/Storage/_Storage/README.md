# Storage's Own Layering

## 1. Overview

Storage's own domain layer — houses the driver-agnostic contract and
selection logic that its `Dexie` subdomain (and any future driver) implements.

The `_Storage` name marks it as *not* a driver subdomain itself — a directory
prefixed with `_{DomainName}` holds that domain's own `Domain`/`Application`/
`Infrastructure` layering, distinct from its real subdomains. See
`architecture/ddd.md` §3.8 for the general convention.

## 2. Structure

```text
/src/application/Platform/Storage/_Storage/
 ├─ Domain/
 │   ├─ StorageClient.ts      # Closed union of known storage capabilities (Dexie, future: SQLite, etc.)
 │   └─ StorageSettings.ts    # Driver selection (AggregateSettings pattern)
 ├─ Infrastructure/storage-maker.ts   # Maker–Client provider resolving a StorageClient for a given driver
 └─ README.md
```

## 3. Usage

```ts
import { StorageMaker } from 'src/application/Platform/Storage/_Storage/Infrastructure/storage-maker'
```

Consumed directly by:

- `src/application/Platform/DarkMode/Infrastructure/darkMode-storage.ts`
- `src/application/Example/Task/Infrastructure/task-storage.ts`
