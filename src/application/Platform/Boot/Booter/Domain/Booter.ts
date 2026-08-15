/**
 * Booter (Boot Coordinator)
 * -----------------------------------------------------------------------------
 * Coordinator responsible for executing multiple Boot processes.
 *
 * - Defines execution order and grouping of Boots
 * - Contains no business logic or side-effects itself
 *
 * Acts as an execution boundary between orchestration and concrete Boots.
 */

export interface Booter {
  /** Name of this booter */
  readonly BOOTER_NAME: string
  /** Executes one or more boot processes */
  execute(): Promise<void> | void
}
