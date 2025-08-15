<template>
    <div class="main-app-content">
        <h2 class="q-my-none text-left text-weight-bolder">Thoughtless.</h2>
        <ThoughtsPage />
    </div>
</template>

<script setup lang="ts">
import ThoughtsPage from 'src/pages/Experimental/ThoughtsPage.vue'
</script>

<style scoped>
.main-app-content {
    padding: 0;
    /* remove padding so footer is flush */
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
