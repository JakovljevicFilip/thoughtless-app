/**
 * FrontDesk Service
 * -----------------------------------------------------------------------------
 * Application-level orchestrator for FrontDesk use cases.
 * Composes order placement and event dispatch.
 */

import { useFrontDeskStore } from './frontDesk-store'

import { frontDeskRules } from '../Domain/Rules/frontDesk-rules'

import { frontDeskPublisher } from './Event/frontDesk-publisher'

export const frontDeskService = {
  placeOrder(item: string): void {
    frontDeskRules.canPlaceOrder(item)

    const order = { id: crypto.randomUUID(), item, status: 'placed' as const, sentAgain: false }
    const store = useFrontDeskStore()
    store.add(order)

    frontDeskPublisher.orderPlaced(order.id, order.item)
  },

  returnOrder(orderId: string): void {
    const order = useFrontDeskStore().returnToStation(orderId)
    if (!order) return

    frontDeskPublisher.orderReturned(order.id, order.item)
  },

  sendOut(orderId: string): void {
    useFrontDeskStore().sendOut(orderId)
  },
}
