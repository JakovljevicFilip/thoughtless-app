<template>
    <div class="thought-list">
        <ThoughtCard v-for="t in thoughts" :key="t.id" :id="t.id" :message="t.content" class="q-mb-md" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ThoughtCard from './ThoughtCard.vue'
import { useThoughtsStore } from 'src/stores/thoughts-store'
import { listThoughts } from 'src/services/thoguhts-service'

const store = useThoughtsStore()
const { thoughts } = storeToRefs(store)

onMounted(async () => {
    await listThoughts()
})
</script>
