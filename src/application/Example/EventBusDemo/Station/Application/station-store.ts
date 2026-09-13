import { defineStore } from 'pinia'

interface PendingOrder {
  orderId: string
  item: string
  isRepeat: boolean
}

interface PreparationLogEntry {
  orderId: string
  item: string
  preparedAt: Date
  isRepeat: boolean
}

export const useStationStore = defineStore('StationStore', {
  state: () => ({
    pending: [] as PendingOrder[],
    log: [] as PreparationLogEntry[],
  }),

  actions: {
    receive(order: PendingOrder): void {
      this.pending.push(order)
    },
    prepare(orderId: string): PendingOrder | undefined {
      const index = this.pending.findIndex(order => order.orderId === orderId)
      if (index === -1) return undefined

      const [order] = this.pending.splice(index, 1)
      if (!order) return undefined

      this.log.unshift({ ...order, preparedAt: new Date() })
      return order
    },
  },
})
