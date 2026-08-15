/**
 * RootBoot
 * -----------------------------------------------------------------------------
 * Top-level application entry point sequencing the Boot phases.
 *
 * - Runs all standing wiring (Booter) before any bounded tasks (Runner)
 * - Guarantees wiring is in place before anything could depend on it
 */

import { rootBooter } from '../Booter/Application/root-booter'
import { rootRunner } from '../Runner/Application/root-runner'

export async function runBootSequence(): Promise<void> {
  await rootBooter.execute()
  await rootRunner.execute()
}
