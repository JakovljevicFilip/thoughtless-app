import { notifyPublisher } from 'src/application/Platform/Notification/InApp/Application/Event/notify-publishers'

export const useCopy = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    notifyPublisher.success('Copied!')
  } catch {
    notifyPublisher.warning('Could not copy to clipboard.')
  }
}
