<template>
    <transition appear name="q-transition--slide-left">
        <q-card flat bordered class="thought-card column q-pa-md">
            <!-- Message -->
            <div class="text-body1 text-white q-mb-sm" v-html="formattedMessage"></div>

            <!-- Actions -->
            <div class="row items-center justify-end text-caption q-gutter-md text-white">
                <ThoughtCopy :message="message" />
                <ThoughtDelete :id="id" :content="formattedMessage" />
            </div>
        </q-card>
    </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ThoughtCopy from './ThoughtCopy.vue'
import ThoughtDelete from './ThoughtDelete.vue'

/** Make message optional with a safe default to prevent runtime errors */
const props = withDefaults(defineProps<{
    id: string
    message?: string
}>(), {
    message: ''
})

/** Safer: handle undefined and avoid runtime throw */
const formattedMessage = computed(() => (props.message ?? '').replace(/\n/g, '<br>'))

/** Expose these so template can use them directly */
const { id, message } = props
</script>

<style scoped>
.thought-card {
    border-radius: 16px;
    border: none;
    background: linear-gradient(135deg,
            #0083b0 0%,
            /* blue */
            #6a00ff 100%
            /* purple */
        );
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}

/* optional: keep your slight tracking */
.thought-card :is(.text-body1, span) {
    letter-spacing: 0.1px;
}
</style>
