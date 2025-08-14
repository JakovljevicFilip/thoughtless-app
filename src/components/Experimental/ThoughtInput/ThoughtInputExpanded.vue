<template>
    <q-dialog v-model="show" full-width full-height>
        <q-card class="fit column q-pa-none">
            <q-input v-model="text" type="textarea" borderless autofocus class="col grow-input no-shadow q-pa-none"
                input-class="q-pl-xs q-pr-sm" @keyup.ctrl.enter="onSend" @keyup.esc="show = false">
                <template #prepend>
                    <q-btn flat dense round size="sm" icon="close_fullscreen" class="text-grey-5"
                        @click="show = false" />
                </template>

                <template #append>
                    <q-btn flat dense class="text-grey-6" :disable="!text.trim()" @click="() => onSend()">
                        <q-icon name="send" size="18px" class="plane-rot" />
                    </q-btn>
                </template>
            </q-input>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
const show = defineModel<boolean | null>({ default: false })            // v-model for dialog
const text = defineModel<string>('message', { default: '' })            // v-model:message

const emit = defineEmits<{ (e: 'send', value: string): void }>()

function onSend() {
    const v = text.value.trim()
    if (!v) return
    emit('send', v)
    show.value = false
}
</script>

<style scoped>
/* Make the input (and its internals) occupy the full card height */
.grow-input {
    flex: 1 1 auto;
    min-height: 0;
    height: 100%;
}

.grow-input :deep(.q-field__inner) {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
}

.grow-input :deep(.q-field__control),
.grow-input :deep(.q-field__native) {
    flex: 1 1 auto;
    height: 100%;
    min-height: 0;
}

.grow-input :deep(textarea) {
    height: 100% !important;
    min-height: 0 !important;
    resize: none;
}

/* cosmetics */
.no-shadow :deep(.q-field__control) {
    box-shadow: none !important;
}

/* rotate ONLY the paper plane */
.plane-rot {
    transform: rotate(-45deg);
}
</style>
