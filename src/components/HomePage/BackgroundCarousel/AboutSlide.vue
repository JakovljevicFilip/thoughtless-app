<template>
    <q-carousel-slide :name="name" :class="[bgColor, 'slide']">
        <div class="overlay"></div>
        <div class="slide-content">
            <component :is="resolvedTag" class="slide-title">{{ title }}</component>
            <p class="slide-body">{{ body }}</p>
        </div>
    </q-carousel-slide>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        name: string
        bgColor: string
        title: string
        body: string
        tag?: string
    }>(),
    { tag: 'h2' }
)

const resolvedTag = computed(() => props.tag || 'h2')
</script>

<style scoped>
.slide {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    padding: calc(clamp(80px, 16vh, 200px) + env(safe-area-inset-top)) 24px 24px;
    text-align: left;
    overflow: hidden;
}

.overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), transparent 40%);
    z-index: 0;
}

.slide-content {
    max-width: 920px;
    width: 100%;
    position: relative;
    z-index: 1;
}

.slide-title {
    font-size: clamp(64px, 12vw, 120px);
    line-height: 1.05;
    margin: 0 0 20px;
    font-weight: 900;
}

.slide-body {
    font-size: clamp(18px, 3vw, 24px);
    opacity: 0.92;
    max-width: 800px;
}
</style>
