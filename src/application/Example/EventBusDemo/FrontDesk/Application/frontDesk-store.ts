import type { Order } from '../Domain/Order'

import { defineStore } from 'pinia'

type FrontDeskLogAction = 'placed' | 'ready' | 'returned' | 'sent again' | 'sent out'

interface FrontDeskLogEntry {
  orderId: string
  item: string
  action: FrontDeskLogAction
  at: Date
}

export const useFrontDeskStore = defineStore('FrontDeskStore', {
  state: () => ({
    orders: [] as Order[],
    log: [] as FrontDeskLogEntry[],
  }),

  actions: {
    add(order: Order): void {
      this.orders.unshift(order)
      this.log.unshift({ orderId: order.id, item: order.item, action: 'placed', at: new Date() })
    },
    markReady(orderId: string): void {
      const order = this.orders.find(o => o.id === orderId)
      if (!order) return

      order.status = 'ready'
      this.log.unshift({ orderId: order.id, item: order.item, action: 'ready', at: new Date() })
    },
    markReadyAgain(orderId: string): void {
      const order = this.orders.find(o => o.id === orderId)
      if (!order) return

      order.status = 'ready'
      order.sentAgain = true
      this.log.unshift({ orderId: order.id, item: order.item, action: 'sent again', at: new Date() })
    },
    returnToStation(orderId: string): Order | undefined {
      const order = this.orders.find(o => o.id === orderId)
      if (!order) return undefined

      order.status = 'placed'
      this.log.unshift({ orderId: order.id, item: order.item, action: 'returned', at: new Date() })
      return order
    },
    sendOut(orderId: string): Order | undefined {
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index === -1) return undefined

      const [order] = this.orders.splice(index, 1)
      if (!order) return undefined

      this.log.unshift({ orderId: order.id, item: order.item, action: 'sent out', at: new Date() })
      return order
    },
  },
})
