<template>
    <div class="thoughts-content">
        <div class="thoughts-scroll q-pa-md">
            <ThoughtCards class="q-mb-md" />
        </div>

        <q-footer class="bg-white q-pa-sm">
            <ThoughtInput />
        </q-footer>
    </div>
</template>

<script setup lang="ts">
import ThoughtCards from './ThoughtCards/ThoughtCards.vue';
import ThoughtInput from './ThoughtInput/ThoughtInput.vue';
</script>

<style scoped>
.thoughts-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    /* fills .content-wrapper */
}

.thoughts-scroll {
    flex: 1;
    /* fills remaining space above footer */
    overflow-y: auto;
}


.q-footer {
    flex-shrink: 0;
}
</style>
