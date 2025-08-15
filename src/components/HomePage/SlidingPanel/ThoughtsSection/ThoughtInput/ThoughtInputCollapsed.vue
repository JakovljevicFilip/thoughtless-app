<template>
    <div class="row items-center">
        <q-input class="col" outlined dense rounded v-model="model" placeholder="Write anything here ..."
            input-class="q-pl-xs q-pr-sm" @keyup.ctrl.enter="emitSend">
            <template #prepend>
                <q-btn flat dense round size="sm" icon="open_in_full" class="text-grey-5" @click="emit('expand')" />
            </template>

            <template #append>
                <q-btn flat dense class="text-grey-6" :disable="!model.trim()" @click="emitSend">
                    <q-icon name="send" size="18px" class="plane-icon" />
                </q-btn>
            </template>
        </q-input>

        <q-btn round unelevated icon="mic" class="q-ml-sm mic-btn" />
    </div>
</template>

<script setup lang="ts">
/** v-model:message */
const model = defineModel<string>('message', { default: '' })

const emit = defineEmits<{
    (e: 'expand'): void
    (e: 'send', value: string): void
}>()

function emitSend() {
    const v = model.value.trim()
    if (!v) return
    emit('send', v)
}
</script>

<style scoped>
/* mic styling only */
.mic-btn {
    width: 42px;
    height: 42px;
    color: white;
    background: radial-gradient(120% 120% at 30% 30%, #7dd3fc 0%, #60a5fa 35%, #a78bfa 70%, #34d399 100%);
    box-shadow: 0 6px 14px rgba(127, 86, 217, 0.35), inset 0 0 10px rgba(255, 255, 255, 0.25);
}

/* rotate ONLY the paper plane */
.plane-icon {
    transform: rotate(-45deg);
    margin-bottom: 5px;
}
</style>
