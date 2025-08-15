<template>
    <q-page class="home-page">
        <BackgroundCarousel v-model="slide" :slides="slides" autoplay />
        <SlidingPanel :peek="0.15" :snap-points="[0.6, 0.15, 0]">
            <ThoughtlessWrapper />
        </SlidingPanel>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { aboutSlides as slides } from 'src/data/aboutSlides'
import SlidingPanel from 'src/components/HomePage/SlidingPanel/SlidingPanel.vue';
import ThoughtlessWrapper from 'src/components/HomePage/SlidingPanel/ThoughtlessWrapper.vue';
import BackgroundCarousel from 'src/components/HomePage/BackgroundCarousel/BackgroundCarousel.vue';

const slide = ref(slides[0]?.name ?? 'intro')
</script>
