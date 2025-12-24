<template>
  <q-card
    bordered
    flat
    class="column justify-between rounded-borders"
    style="border: 1px solid secondary"
  >
    <q-card-section class="q-pt-sm q-pb-sm">
      <div class="text-body2" style="white-space: pre-line">
        {{ thought.content }}
      </div>
    </q-card-section>

    <q-card-actions align="right" class="q-mt-auto text-caption text-grey-7">
      <q-btn flat dense size="sm" icon="restore" label="Restore" @click="useRestore(thought)" />
      <q-btn
        flat
        dense
        size="sm"
        icon="content_copy"
        label="Copy"
        @click="useCopy(thought.content)"
      />
      <q-btn
        flat
        dense
        size="sm"
        icon="delete"
        label="Remove"
        color="primary"
        @click="$emit('remove')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

  import { useRestore } from '../Composables/useRestore'

  import { useCopy } from '../../Composables/useCopy'

  defineProps<{
    thought: Thought
  }>()

  defineEmits<{
    (e: 'remove'): void
  }>()
</script>
