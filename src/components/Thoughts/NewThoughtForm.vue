<template>
    <div class="column full-height q-pa-sm">
        <q-input v-model="thoughtInput" type="textarea" label="What's on your mind?" outlined stack-label
            class="col q-mb-none stretch-textarea" :style="{ height: '100%' }" :input-style="{ resize: 'none' }">
            <template #append>
                <q-btn outline color="primary" label="SAVE" :disable="!thoughtInput.trim()" @click="submitThought" />
            </template>
        </q-input>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createThought } from 'src/services/thoguhts-service'

const thoughtInput = ref('')

async function submitThought() {
    const trimmed = thoughtInput.value.trim()
    if (!trimmed) return
    await createThought(trimmed)
    thoughtInput.value = ''
}
</script>

<style scoped>
.stretch-textarea ::v-deep(.q-field__control,
    .q-field__control-container,
    .q-field__native) {
    height: 100%;
}
</style>
