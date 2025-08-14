<template>
    <q-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" full-width
        full-height>
        <q-card class="full-card">
            <q-input v-model="internalMessage" type="textarea" borderless autofocus class="fill-input no-border-input"
                @keyup.ctrl.enter="onSend" @keyup.esc="emit('update:modelValue', false)">
                <!-- Collapse button on the left -->
                <template #prepend>
                    <q-btn flat dense round icon="close_fullscreen" size="sm" class="expand-btn"
                        @click="emit('update:modelValue', false)" />
                </template>

                <!-- Send button on the right -->
                <template #append>
                    <q-btn flat dense icon="send" class="send-btn text-grey-6" :disable="!internalMessage.trim()"
                        @click="onSend" />
                </template>
            </q-input>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    modelValue: boolean
    message: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'update:message', value: string): void
    (e: 'send', value: string): void
}>()

const internalMessage = ref(props.message)

watch(() => props.message, val => {
    internalMessage.value = val
})

watch(internalMessage, val => {
    emit('update:message', val)
})

const onSend = () => {
    emit('send', internalMessage.value)
    emit('update:modelValue', false)
}
</script>

<style scoped>
.full-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    min-height: 0;
}

.fill-input {
    flex: 1 1 auto;
    height: 100%;
    margin: 0;
    min-height: 0;
}

.no-border-input :deep(.q-field__control) {
    box-shadow: none !important;
}

.no-border-input :deep(.q-field__native) {
    padding-left: 4px !important;
    padding-right: 8px !important;
}

.fill-input :deep(.q-field__inner) {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
}

.fill-input :deep(.q-field__control) {
    flex: 1 1 auto;
    min-height: 0;
    height: 100%;
}

.fill-input :deep(.q-field__native) {
    flex: 1 1 auto;
    min-height: 0;
    height: 100%;
}

.fill-input :deep(textarea) {
    height: 100% !important;
    min-height: 0 !important;
    resize: none;
}

.expand-btn {
    color: #9ca3af;
}

.send-btn :deep(.q-icon) {
    font-size: 18px;
    transform: rotate(-45deg);
}
</style>
