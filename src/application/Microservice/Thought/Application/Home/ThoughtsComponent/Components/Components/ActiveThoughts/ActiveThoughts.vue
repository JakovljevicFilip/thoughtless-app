<template>
  <ThoughtsWrapper v-if="active.length > 0" :items="active">
    <template #default="{ item }">
      <ActiveCard :thought="item" @alter="alter(item)" />
    </template>
  </ThoughtsWrapper>
  <EmptyActiveSection v-else />
  <AlterDialog v-model="showAlterDialog" :thought="altering" />
</template>

<script setup lang="ts">
  import ThoughtsWrapper from '../ThoughtsWrapper.vue'
  import ActiveCard from './Components/ActiveCard.vue'
  import EmptyActiveSection from './Components/EmptyActiveSection.vue'
  import AlterDialog from './Components/AlterDialog.vue'

  import { type ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'

  import { useExpiryNotices } from './Composables/useExpiryNotices'

  import { useThoughtStore } from 'src/application/Microservice/Thought/Application/thought-store'

  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  const store = useThoughtStore()
  const { active } = storeToRefs(store)

  const altering = ref<ActiveThought | null>(null)
  const showAlterDialog = ref(false)

  const alter = (thought: ActiveThought) => {
    altering.value = thought
    showAlterDialog.value = true
  }

  useExpiryNotices(() => active.value)
</script>
