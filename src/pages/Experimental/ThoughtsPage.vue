<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <q-page class="q-pa-md">
                <ThoughtCards class="q-mb-md" />
            </q-page>
        </q-page-container>

        <q-footer class="bg-white q-pa-sm no-top-border" reveal bordered>
            <ThoughtInput />
        </q-footer>
    </q-layout>
</template>

<script setup lang="ts">
import ThoughtInput from 'src/components/Experimental/ThoughtInput/ThoughtInput.vue'
import ThoughtCards from 'src/components/Experimental/ThoughtCards/ThoughtCards.vue'
</script>

<style scoped>
.no-top-border {
    border-top: none !important;
}
</style>
