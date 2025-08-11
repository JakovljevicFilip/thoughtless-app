<template>
    <div ref="wrap" class="relative-position" style="height: 100%">
        <q-splitter v-model="model" horizontal style="height: 100%" :limits="limits">
            <template #before>
                <slot name="form" />
            </template>

            <template #after>
                <slot name="list" />
            </template>
        </q-splitter>

        <SplitterKnob :model-value="model" :limits="limits" :target="wrap" @update:model-value="model = $event" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SplitterKnob from './SplitterKnob.vue'

const props = defineProps<{
    modelValue: number
    limits?: readonly [number, number]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const wrap = ref<HTMLElement | null>(null)
const model = ref<number>(props.modelValue)
const limits = props.limits ?? [10, 90] as const

watch(model, (val: number) => emit('update:modelValue', val))
</script>

<style scoped>
.relative-position {
    position: relative;
}

:deep(.q-splitter__separator) {
    pointer-events: none !important;
}
</style>
