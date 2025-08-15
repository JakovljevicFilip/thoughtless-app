<template>
    <q-carousel v-model="model" animated swipeable navigation arrows control-color="white" height="100vh"
        class="text-white background-carousel" :autoplay="autoplay ? 6000 : 0" transition-prev="slide-right"
        transition-next="slide-left">
        <AboutSlide v-for="s in slides" :key="s.name" v-bind="s" />
    </q-carousel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AboutSlide from 'src/components/Experimental/AboutUs/AboutSlide.vue'

interface Props {
    modelValue: string
    slides: Array<{ name: string; bgColor: string; title: string; body: string; tag?: string }>
    autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), { autoplay: true })
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const model = computed({
    get: () => props.modelValue,
    set: (val: string) => emit('update:modelValue', val)
})
</script>

<style scoped>
.background-carousel {
    position: absolute;
    inset: 0;
    z-index: 0;
}
</style>
