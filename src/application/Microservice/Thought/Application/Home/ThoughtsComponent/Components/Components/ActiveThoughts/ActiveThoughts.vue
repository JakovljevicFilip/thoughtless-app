<template>
  <ThoughtsWrapper v-if="active.length > 0" :items="active">
    <template #default="{ item }">
      <ActiveCard :thought="item" @change="change(item)" />
    </template>
  </ThoughtsWrapper>
  <EmptyActiveSection v-else />
  <ChangeDialog v-model="showChangeDialog" :thought="changing" />
</template>

<script setup lang="ts">
  import ThoughtsWrapper from '../ThoughtsWrapper.vue'
  import ActiveCard from './Components/ActiveCard.vue'
  import EmptyActiveSection from './Components/EmptyActiveSection.vue'
  import ChangeDialog from './Components/ChangeDialog.vue'

  import { type ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'

  import { useExpiryNotices } from './Composables/useExpiryNotices'

  import { useThoughtStore } from 'src/application/Microservice/Thought/Application/thought-store'

  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  const store = useThoughtStore()
  const { active } = storeToRefs(store)

  const changing = ref<ActiveThought | null>(null)
  const showChangeDialog = ref(false)

  const change = (thought: ActiveThought) => {
    changing.value = thought
    showChangeDialog.value = true
  }

  useExpiryNotices(() => active.value)
</script>
