/**
 * FrontDesk Service
 * -----------------------------------------------------------------------------
 * Application-level orchestrator for FrontDesk use cases.
 * Composes order placement and event dispatch.
 */

import { useFrontDeskStore } from './frontDesk-store'

import { FrontDeskAggregate } from '../Domain/FrontDeskAggregate'

import { frontDeskPublisher } from './Event/frontDesk-publishers'

export const frontDeskService = {
  placeOrder(item: string): void {
    const order = FrontDeskAggregate.place(item)

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
