/**
 * App Boot Entry
 * -----------------------------------------------------------------------------
 * Application-specific boot file executed during application startup.
 */

import { runBootSequence } from 'src/application/Platform/Boot/Application/root-boot'

import { boot } from 'quasar/wrappers'

export default boot(async () => {
  await runBootSequence()
})
