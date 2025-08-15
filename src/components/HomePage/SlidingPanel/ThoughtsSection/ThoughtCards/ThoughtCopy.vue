<template>
    <div class="row items-center q-gutter-xs cursor-pointer" role="button" tabindex="0" @click="handleCopy"
        @keydown.enter.prevent="handleCopy" @keydown.space.prevent="handleCopy">
        <span class="icon-stack" :class="{ 'is-copied': copied }">
            <q-icon name="content_copy" size="16px" class="icon base" />
            <q-icon name="check" size="16px" class="icon check" />
        </span>
        <span>{{ label }}</span>

        <q-tooltip v-model="showCopied" anchor="bottom middle" self="top middle" transition-show="jump-down"
            transition-hide="fade" class="bg-black text-white q-px-sm q-py-xs">
            Copied!
        </q-tooltip>
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from 'src/composables/useClipboard'

const { message, label = 'Copy' } = defineProps<{
    message: string
    label?: string
}>()

const { copied, showCopied, copyToClipboard } = useClipboard()

async function handleCopy() {
    const ok = await copyToClipboard(message)
    if (ok) {
        console.debug('Copied!')
    } else {
        console.error('Copy failed')
    }
}
</script>

<style scoped>
/* Container for stacking icons */
.icon-stack {
    position: relative;
    width: 18px;
    /* slightly > 16px icon size */
    height: 18px;
    display: inline-block;
    vertical-align: middle;
}

/* Shared icon styles */
.icon-stack .icon {
    position: absolute;
    inset: 0;
    transition: opacity 180ms ease, transform 180ms ease;
    will-change: opacity, transform;
}

/* Initial state */
.icon-stack .base {
    opacity: 1;
    transform: scale(1);
}

.icon-stack .check {
    opacity: 0;
    transform: scale(0.7);
}

/* Copied state */
.icon-stack.is-copied .base {
    opacity: 0;
    transform: scale(0.7);
}

.icon-stack.is-copied .check {
    opacity: 1;
    transform: scale(1);
}
</style>
