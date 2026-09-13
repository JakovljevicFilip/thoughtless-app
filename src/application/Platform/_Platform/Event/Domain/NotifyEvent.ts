export const NOTIFY_TOPIC = 'Notification.InApp.Notify' as const

export type NotifyLevel = 'success' | 'info' | 'warning'

export interface NotifyEventPayload {
  type: NotifyLevel
  message: string
}
