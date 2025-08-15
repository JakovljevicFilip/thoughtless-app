import { ref, onMounted, onBeforeUnmount } from 'vue'

export interface DraggableSheetOptions {
  /** Max sheet height as a fraction of viewport (0–1). Default: 0.85 */
  maxRatio?: number
  /** Transition duration in ms when snapping. Default: 220 */
  durationMs?: number
  /** CSS easing for snap transition. Default: cubic-bezier(.2,.8,.2,1) */
  easing?: string
}

export function useDraggableSheet(
  peek: number,
  snapPoints: number[],
  opts: DraggableSheetOptions = {}
) {
  const { maxRatio = 0.85, durationMs = 220, easing = 'cubic-bezier(.2,.8,.2,1)' } = opts

  const topPx = ref(0)
  const sheetTransition = ref('')
  let startY = 0
  let startTop = 0
  let dragging = false
  let snapPx: number[] = []

  const vh = () => window.innerHeight
  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
  const maxTop = () => vh() * maxRatio

  const computeSnapPoints = () => {
    snapPx = snapPoints.map(p => p * vh())
    if (!topPx.value) topPx.value = peek * vh()
  }

  const startDrag = (e: PointerEvent) => {
    dragging = true
    sheetTransition.value = ''
    startY = e.clientY
    startTop = topPx.value
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onEnd)
  }

  const onMove = (e: PointerEvent) => {
    if (!dragging) return
    e.preventDefault()
    topPx.value = clamp(startTop + (e.clientY - startY), 0, maxTop())
  }

  const onEnd = () => {
    dragging = false
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onEnd)
    const nearest = snapPx.reduce((a, b) =>
      Math.abs(b - topPx.value) < Math.abs(a - topPx.value) ? b : a
    )
    sheetTransition.value = `top ${durationMs}ms ${easing}`
    topPx.value = nearest
    setTimeout(() => (sheetTransition.value = ''), durationMs + 20)
  }

  onMounted(() => {
    computeSnapPoints()
    window.addEventListener('resize', computeSnapPoints)
  })
  onBeforeUnmount(() => window.removeEventListener('resize', computeSnapPoints))

  /** Optional: updateable API if parent wants to change config at runtime */
  const setPeek = (nextPeek: number) => {
    // Only apply if not currently dragging
    if (!dragging) {
      topPx.value = nextPeek * vh()
    }
  }
  const setSnapPoints = (points: number[]) => {
    snapPoints = points
    computeSnapPoints()
  }

  return { topPx, sheetTransition, startDrag, computeSnapPoints, setPeek, setSnapPoints }
}
