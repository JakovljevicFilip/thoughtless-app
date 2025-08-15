<template>
  <div class="overlay-page" :style="{ top: `${topPx}px`, transition: sheetTransition }">
    <div class="drag-handle" @pointerdown="startDrag"><span class="handle-pill" /></div>
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDraggableSheet } from 'src/composables/useDraggableSheet';

const { peek, snapPoints } = defineProps<{ peek: number; snapPoints: number[] }>()
const { topPx, sheetTransition, startDrag } = useDraggableSheet(peek, snapPoints, {
  maxRatio: 0.85,
  durationMs: 220,
  easing: 'cubic-bezier(.2,.8,.2,1)'
})
</script>

<style scoped>
.overlay-page {
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  background: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, .15);
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden
}

.drag-handle {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  padding: 10px 0 6px;
  cursor: grab;
  touch-action: none;
  z-index: 2
}

.drag-handle:active {
  cursor: grabbing
}

.handle-pill {
  width: 48px;
  height: 5px;
  border-radius: 999px;
  background: rgba(0, 0, 0, .2)
}

.content-wrapper {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 20px 24px
}
</style>
