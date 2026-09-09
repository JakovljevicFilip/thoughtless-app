/**
 * Station Service
 * -----------------------------------------------------------------------------
 * Application-level orchestrator for Station use cases.
 * Composes order preparation and event dispatch.
 */

import { useStationStore } from './station-store'

import { stationPublisher } from './Event/station-publisher'

export const stationService = {
  receiveOrder(orderId: string, item: string): void {
    useStationStore().receive({ orderId, item, isRepeat: false })
  },

  receiveReturnedOrder(orderId: string, item: string): void {
    useStationStore().receive({ orderId, item, isRepeat: true })
  },

  prepareOrder(orderId: string): void {
    const order = useStationStore().prepare(orderId)
    if (!order) return

    if (order.isRepeat) {
      stationPublisher.orderSentAgain(orderId)
    } else {
      stationPublisher.orderReady(orderId)
    }
  },
}
