<template>
    <div class="row items-center composer-wrapper">
        <!-- pill input -->
        <q-input class="composer-input col" outlined dense v-model="message" placeholder="Write anything here ..."
            input-class="placeholder">
            <!-- Expand icon on the left -->
            <template #prepend>
                <q-btn flat dense round icon="open_in_full" size="sm" class="expand-btn" @click="isModalOpen = true" />
            </template>

            <!-- Send icon on the right -->
            <template #append>
                <q-btn flat dense icon="send" class="send-btn text-grey-6" />
            </template>
        </q-input>

        <!-- Mic button -->
        <q-btn round class="mic-btn q-ml-sm" icon="mic" unelevated />

        <!-- Modal component -->
        <ExperimentalModal v-model="isModalOpen" v-model:message="message" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExperimentalModal from './ExperimentalModal.vue';

const message = ref('')
const isModalOpen = ref(false)
</script>

<style scoped>
.composer-wrapper {
    padding: 6px 12px;
}

.composer-input :deep(.q-field__control) {
    border-radius: 9999px !important;
    background: #fff;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    border: none;
}

.composer-input :deep(.q-field__control:before),
.composer-input :deep(.q-field__control:after) {
    display: none;
}

.composer-input :deep(.q-field__native) {
    padding-left: 4px !important;
    padding-right: 8px !important;
    height: 42px;
    line-height: 42px;
    font-size: 14px;
}

.send-btn :deep(.q-icon) {
    font-size: 18px;
    transform: rotate(-45deg);
}

.mic-btn {
    width: 42px;
    height: 42px;
    color: white;
    background: radial-gradient(120% 120% at 30% 30%, #7dd3fc 0%, #60a5fa 35%, #a78bfa 70%, #34d399 100%);
    box-shadow:
        0 6px 14px rgba(127, 86, 217, 0.35),
        inset 0 0 10px rgba(255, 255, 255, 0.25);
}

.expand-btn {
    color: #9ca3af;
}
</style>
