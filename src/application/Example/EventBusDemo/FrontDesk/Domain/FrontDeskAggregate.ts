/**
 * FrontDeskAggregate
 * -----------------------------------------------------------------------------
 * Aggregate root for the FrontDesk domain.
 */

import type { Order } from './Order'

import { FrontDeskDomainError } from './FrontDeskDomainError'

export class FrontDeskAggregate {
  static place(item: string): Order {
    if (!item.trim()) {
      throw new FrontDeskDomainError('Cannot place an order without an item.')
    }

    return { id: crypto.randomUUID(), item, status: 'placed', sentAgain: false }
  }
}
