<template>
    <div class="row items-center q-pa-sm">
        <ThoughtInputCollapsed class="col" v-model:message="text" @expand="show = true" @send="submitThought" />

        <ThoughtInputExpanded v-model="show" v-model:message="text" @send="submitThought" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createThought } from 'src/services/thoguhts-service'
import ThoughtInputCollapsed from './ThoughtInputCollapsed.vue';
import ThoughtInputExpanded from './ThoughtInputExpanded.vue';

// single source of truth
const text = ref('')
const show = ref<boolean | null>(false)

async function submitThought() {
    const trimmed = text.value.trim()
    if (!trimmed) return
    await createThought(trimmed)
    text.value = ''
}
</script>
