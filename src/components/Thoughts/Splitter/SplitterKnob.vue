<template>
    <q-btn class="splitter-knob" round dense color="primary" icon="drag_indicator"
        :style="{ top: `calc(${modelValue}% - 16px)` }" @mousedown="startDrag" @touchstart.passive="startDrag" />
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'

const props = defineProps<{
    modelValue: number
    limits: readonly [number, number]
    target: HTMLElement | null
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

let dragging = false

function clamp(v: number) {
    return Math.max(props.limits[0], Math.min(props.limits[1], v))
}

function startDrag(e: MouseEvent | TouchEvent) {
    dragging = true
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', stopDrag)
    onMove(e)
}

function onMove(e: MouseEvent | TouchEvent) {
    if (!dragging || !props.target) return
    const pointY =
        e instanceof MouseEvent ? e.clientY : (e.touches[0]?.clientY ?? 0)
    const rect = props.target.getBoundingClientRect()
    const pct = ((pointY - rect.top) / rect.height) * 100
    emit('update:modelValue', clamp(pct))
    if (!(e instanceof MouseEvent)) e.preventDefault()
}

function stopDrag() {
    dragging = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', stopDrag)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', stopDrag)
}

onBeforeUnmount(stopDrag)
</script>

<style scoped>
.splitter-knob {
    position: absolute;
    right: 6px;
    z-index: 10;
    width: 32px;
    height: 32px;
    pointer-events: auto;
}
</style>
