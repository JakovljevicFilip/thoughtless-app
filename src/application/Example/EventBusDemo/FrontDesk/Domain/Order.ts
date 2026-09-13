export type OrderStatus = 'placed' | 'ready'

export interface Order {
  id: string
  item: string
  status: OrderStatus
  sentAgain: boolean
}
