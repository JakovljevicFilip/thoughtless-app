<template>
  <q-card
    bordered
    flat
    class="column justify-between rounded-borders"
    :style="`border: 1px solid ${borderColor}`"
  >
    <q-card-section class="row items-center no-wrap q-pb-none">
      <q-badge
        v-if="thought.expiryStatus === ThoughtExpiryStatus.ABOUT_TO_EXPIRE"
        color="primary"
        text-color="white"
        rounded
        class="text-caption"
      >
        <q-icon name="warning" size="14px" class="q-mr-xs" />
        Expiring Soon
      </q-badge>

      <q-badge
        v-else-if="thought.expiryStatus === ThoughtExpiryStatus.EXPIRED"
        color="warning"
        text-color="white"
        rounded
        class="text-caption"
      >
        <q-icon name="block" size="14px" class="q-mr-xs" />
        Expired
      </q-badge>

      <q-space />

      <div
        class="text-caption"
        :class="
          thought.expiryStatus === ThoughtExpiryStatus.ABOUT_TO_EXPIRE
            ? 'text-primary'
            : thought.expiryStatus === ThoughtExpiryStatus.EXPIRED
              ? 'text-warning'
              : 'text-secondary'
        "
      >
        <q-icon
          name="schedule"
          size="14px"
          class="q-mr-xs"
          :color="
            thought.expiryStatus === ThoughtExpiryStatus.ABOUT_TO_EXPIRE
              ? 'primary'
              : thought.expiryStatus === ThoughtExpiryStatus.EXPIRED
                ? 'warning'
                : 'secondary'
          "
        />
        {{ getTimeRemainingFromExpiresAt(thought.expiresAt) }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-sm q-pb-sm">
      <div class="thought-content" @click="$emit('alter')">
        {{ thought.content }}
      </div>
    </q-card-section>

    <q-card-actions align="right" class="q-mt-auto text-caption text-secondary">
      <button-component
        label="Copy"
        icon="content_copy"
        @click="useCopy(thought.content)"
        :border="false"
      />
      <button-component
        label="Discard"
        icon="remove_circle_outline"
        @click="handleDiscard(thought)"
        :border="false"
        case="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  import ButtonComponent from 'src/application/Shared/Application/ButtonComponent.vue'

  import type { ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'

  import { getTimeRemainingFromExpiresAt } from 'src/application/Microservice/Thought/Application/Helper/thoughtExpiry-helper'

  import { useThoughtExpiry } from '../Composables/useThoughtExpiry'
  import { useCopy } from '../../Composables/useCopy'
  import { useDiscard } from '../Composables/useDiscard'
  import { useDiscardWhenDiscardedIsFull } from '../Composables/useDiscardWhenDiscardedIsFull'

  import { useThoughtStore } from 'src/application/Microservice/Thought/Application/thought-store'
  import { ThoughtSettings } from 'src/application/Microservice/Thought/Domain/ThoughtSettings'

  import { ThoughtExpiryStatus } from 'src/application/Microservice/Thought/Domain/ValueObject/ThoughtExpiryStatus'

  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  const { thought } = defineProps<{ thought: ActiveThought }>()
  defineEmits<{ (e: 'alter'): void }>()
  useThoughtExpiry()

  const borderColor = computed(() => {
    switch (thought.expiryStatus) {
      case ThoughtExpiryStatus.EXPIRED:
        return 'var(--q-warning)'
      case ThoughtExpiryStatus.ABOUT_TO_EXPIRE:
        return 'var(--q-primary)'
      default:
        return 'var(--q-secondary)'
    }
  })

  const store = useThoughtStore()
  const { discarded } = storeToRefs(store)

  const handleDiscard = async (thought: ActiveThought) => {
    if (discarded.value.length >= ThoughtSettings.maxDiscarded) {
      await useDiscardWhenDiscardedIsFull(thought)
      return
    }
    await useDiscard(thought)
  }
</script>

<style>
  .thought-content {
    white-space: pre-line;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
</style>
