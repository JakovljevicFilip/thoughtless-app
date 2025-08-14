<template>
    <q-dialog ref="dialogRef" persistent transition-show="scale" transition-hide="scale">
        <q-card class="w-[420px] rounded-2xl">
            <q-card-section class="row items-center justify-between q-pb-none">
                <div class="text-h5 text-weight-bold">{{ title }}</div>
                <q-btn flat round dense icon="close" class="text-grey-7" aria-label="Close" @click="onDialogCancel" />
            </q-card-section>

            <q-card-section class="q-pt-md">
                <div v-if="message" class="text-body1 q-mb-sm">{{ message }}</div>

                <!-- Thought preview -->
                <div v-if="preview"
                    class="q-mt-md bg-grey-2 text-body2 text-dark q-pa-sm rounded-borders thought-preview"
                    v-html="preview">
                </div>
            </q-card-section>

            <q-card-actions align="right" class="q-pa-md q-pt-sm">
                <q-btn flat :label="cancelLabel || 'Cancel'" class="bg-grey-3 text-dark q-mr-sm" no-caps
                    @click="onDialogCancel" />
                <q-btn unelevated color="negative" :label="confirmLabel || 'Delete'" no-caps @click="onDialogOK" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'

defineProps<{
    title: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
    preview?: string
}>()

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

defineEmits([...useDialogPluginComponent.emits])
</script>

<style scoped>
.w-\[420px\] {
    width: 420px;
}

/* Tailwind-like utility (or replace with your own CSS) */
.rounded-2xl {
    border-radius: 20px;
}

.thought-preview {
    max-height: 150px;
    /* adjust as needed */
    overflow-y: auto;
    /* vertical scrollbar if content exceeds max-height */
    overflow-x: hidden;
    /* hide horizontal scroll */
    border-radius: 8px;
    white-space: pre-wrap;
    /* respect line breaks */
    font-style: italic;
    /* make text italic */
}
</style>
