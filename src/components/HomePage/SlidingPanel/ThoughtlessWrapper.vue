<template>
    <div class="main-app-content">
        <h2 class="q-my-none text-left text-weight-bolder">Thoughtless.</h2>
        <ThoughtsSection />
    </div>
</template>

<script setup lang="ts">
import ThoughtsSection from './ThoughtsSection/ThoughtsSection.vue'
</script>

<style scoped>
.main-app-content {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
