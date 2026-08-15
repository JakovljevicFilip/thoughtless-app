/**
 * Boot (Execution Unit)
 * -----------------------------------------------------------------------------
 * Canonical domain representation of a single standing-wiring process.
 *
 * - Represents one concrete unit of setup (e.g. driver initialization, subscriptions)
 * - Encapsulates a single side-effect that outlives its own execution
 * - Stateless and independently executable
 *
 * Boots are executed and coordinated by a Booter.
 */

export interface Boot {
  /** Identifier for logging or debugging */
  readonly BOOT_NAME: string
  /** Execute the boot process */
  boot(): Promise<void> | void
}
