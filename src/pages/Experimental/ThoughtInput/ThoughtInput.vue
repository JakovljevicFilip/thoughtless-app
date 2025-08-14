<template>
    <div class="row items-center q-pa-sm">
        <ThoughtInputCollapsed class="col" v-model:message="text" @expand="show = true" @send="handleSend" />

        <ThoughtInputExpanded v-model="show" v-model:message="text" @send="handleSend" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThoughtInputCollapsed from './ThoughtInputCollapsed.vue';
import ThoughtInputExpanded from './ThoughtInputExpanded.vue';

const emit = defineEmits<{ (e: 'send', value: string): void }>()

// single source of truth
const text = ref('')
const show = ref<boolean | null>(false)

function handleSend(payload: string) {
    text.value = payload.trim()
    if (!text.value) return
    emit('send', text.value)
    show.value = false
}
</script>
