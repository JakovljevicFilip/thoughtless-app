import { FrontDeskDomainError } from '../FrontDeskDomainError'

export const frontDeskRules = {
  canPlaceOrder(item: string): void {
    if (!item.trim()) {
      throw new FrontDeskDomainError('Cannot place an order without an item.')
    }
  },
}
