import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

export const useCopy = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    notify.success('Copied!')
  } catch {
    notify.warning('Could not copy to clipboard.')
  }
}
