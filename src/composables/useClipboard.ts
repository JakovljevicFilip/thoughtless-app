import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  const showCopied = ref(false)

  async function copyToClipboard(text: string) {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }

      copied.value = true
      showCopied.value = false
      requestAnimationFrame(() => {
        showCopied.value = true
        setTimeout(() => (showCopied.value = false), 1200)
      })
      setTimeout(() => (copied.value = false), 900)

      return true
    } catch {
      copied.value = false
      showCopied.value = false
      return false
    }
  }

  return {
    copied,
    showCopied,
    copyToClipboard
  }
}
