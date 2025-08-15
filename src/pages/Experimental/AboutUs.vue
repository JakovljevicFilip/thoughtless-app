<template>
    <q-page class="about-page">
        <!-- Carousel background -->
        <q-carousel v-model="slide" animated swipeable navigation arrows control-color="white" height="100vh"
            class="text-white carousel-bg" :autoplay="6000" transition-prev="slide-right" transition-next="slide-left">
            <AboutSlide v-for="s in slides" :key="s.name" v-bind="s" />
        </q-carousel>

        <!-- Draggable sheet -->
        <div class="overlay-page" :style="{ top: topPx + 'px', transition: sheetTransition }">
            <div class="drag-handle" @pointerdown="onDragStart">
                <span class="handle-pill" />
            </div>

            <div class="content-wrapper">
                <h1>About Our Project</h1>
                <p>This sits over the carousel; drag me up or down.</p>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AboutSlide from 'src/components/Experimental/AboutUs/AboutSlide.vue'
import { aboutSlides } from 'src/data/aboutSlides'

type SlideName = (typeof aboutSlides)[number]['name'] extends string
    ? (typeof aboutSlides)[number]['name']
    : string

const slides = aboutSlides
const slide = ref<SlideName>((slides[0]?.name as SlideName) ?? 'intro')

let snapPx: number[] = []
const topPx = ref<number>(0)
const sheetTransition = ref('')
let startY = 0
let startTop = 0
let dragging = false

function computeSnapPoints() {
    const vh = window.innerHeight
    const peek = 0.15 * vh
    snapPx = [0.6 * vh, peek, 0]
    if (topPx.value === 0) topPx.value = peek
}
computeSnapPoints()

function onDragStart(e: PointerEvent) {
    dragging = true
    sheetTransition.value = ''
    startY = e.clientY
    startTop = topPx.value;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    window.addEventListener('pointermove', onDragMove, { passive: false })
    window.addEventListener('pointerup', onDragEnd)
}

function onDragMove(e: PointerEvent) {
    if (!dragging) return
    e.preventDefault()
    topPx.value = clamp(startTop + (e.clientY - startY), 0, maxTop())
}

function onDragEnd() {
    dragging = false
    window.removeEventListener('pointermove', onDragMove)
    window.removeEventListener('pointerup', onDragEnd)
    const nearest = snapPx.reduce((a, b) =>
        Math.abs(b - topPx.value) < Math.abs(a - topPx.value) ? b : a
    )
    sheetTransition.value = 'top 220ms cubic-bezier(.2,.8,.2,1)'
    topPx.value = nearest
    setTimeout(() => (sheetTransition.value = ''), 240)
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
const maxTop = () => Math.round(window.innerHeight * 0.85)

onMounted(() => window.addEventListener('resize', computeSnapPoints))
onBeforeUnmount(() => window.removeEventListener('resize', computeSnapPoints))
</script>

<style scoped>
.about-page {
    position: relative;
    min-height: 100vh;
}

.carousel-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.overlay-page {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
}

.drag-handle {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    padding: 10px 0 6px;
    cursor: grab;
    touch-action: none;
    background: transparent;
    z-index: 2;
}

.drag-handle:active {
    cursor: grabbing;
}

.handle-pill {
    width: 48px;
    height: 5px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.2);
}

.content-wrapper {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 16px 20px 24px;
}
</style>
