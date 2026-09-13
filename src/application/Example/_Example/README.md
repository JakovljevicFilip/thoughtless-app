# Example's Own Layering

## 1. Overview

Example's own domain layer — houses layout shared across Example's own
subdomains (`Documentation`, `Task`, `EventBusDemo`).

The `_Example` name marks it as *not* a demo subdomain itself — a directory
prefixed with `_{DomainName}` holds that domain's own `Domain`/`Application`/
`Infrastructure` layering, distinct from its real subdomains. See
`architecture/ddd.md` §3.8 for the general convention.

## 2. Structure

```text
/src/application/Example/_Example/
 ├─ Application/
 │   └─ Layout/
 │       └─ TopSection.vue   # Header/toolbar + notice banner shared by Example's 3 pages
 └─ README.md
```

## 3. Purpose

- `TopSection.vue` — the header/toolbar (app name, demo nav links, version)
  plus `NoticeComponent`.

## 4. Usage

```ts
import TopSection from 'src/application/Example/_Example/Application/Layout/TopSection.vue'
```

Consumed directly by:

- `src/application/Example/Documentation/Application/IndexPage.vue`
- `src/application/Example/Task/Application/Home/IndexPage.vue`
- `src/application/Example/EventBusDemo/Application/IndexPage.vue`
