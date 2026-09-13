# Example Documentation

## Overview

The `Documentation` example is an interactive showcase for Platform's
utilities. It renders at the app's root route (`/`) and demonstrates
`DarkMode`, `Log`, `Notice`, and `Notification/InApp` by exercising each
service or component directly.

Unlike `Example/Task`, `Documentation` has no `Domain` or `Infrastructure`
layer — it holds no state of its own and owns no business rules. It is
presentation-only: each `*Example.vue` component under `Application/
Components/` imports and calls the corresponding Platform service/component
to demonstrate its usage.

### Application

- `IndexPage.vue` — composes one `*Example.vue` per documented Platform
  utility.
- `Components/DarkModeExample.vue` — demonstrates `Platform/DarkMode`.
- `Components/LogExample.vue` — demonstrates `Platform/Log`.
- `Components/NoticeExample.vue` — demonstrates `Platform/Notice`.
- `Components/InAppNotificationExample.vue` — demonstrates
  `Platform/Notification/InApp`.

### Dependency Notes

- Each component depends only on the Platform service/component it
  documents, imported via its absolute `src/application/Platform/...` path.
- `IndexPage.vue` depends on all four components.
