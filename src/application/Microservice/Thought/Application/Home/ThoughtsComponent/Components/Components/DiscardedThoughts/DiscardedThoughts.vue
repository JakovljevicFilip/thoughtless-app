<template>
  <ThoughtsWrapper v-if="discarded.length > 0" :items="discarded">
    <template #default="{ item }">
      <DiscardedCard :thought="item" @remove="remove(item)" />
    </template>
  </ThoughtsWrapper>
  <EmptyDiscardedSection v-else />
  <RemoveDialog v-model="removeDialog" :removed="removed" />
</template>

<script setup lang="ts">
  import ThoughtsWrapper from '../ThoughtsWrapper.vue'
  import DiscardedCard from './Components/DiscardedCard.vue'
  import EmptyDiscardedSection from './Components/EmptyDiscardedSection.vue'
  import RemoveDialog from './Components/RemoveDialog.vue'

  import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

  import { useThoughtStore } from 'src/application/Microservice/Thought/Application/thought-store'

  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'

  const store = useThoughtStore()
  const { discarded } = storeToRefs(store)

  const removed = ref<Thought | null>(null)
  const removeDialog = ref(false)

  const remove = (discarded: Thought) => {
    removed.value = discarded
    removeDialog.value = true
  }
</script>
