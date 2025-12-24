<template>
  <NavigationSection v-model="tab" />
  <NewThought />
  <q-separator class="q-my-md full-width" color="grey-4" />
  <ActiveThoughts v-if="tab === 'active'" />
  <DiscardedThoughts v-else />
</template>

<script setup lang="ts">
  import NavigationSection from './Components/NavigationSection.vue'
  import NewThought from './Components/NewThought.vue'
  import ActiveThoughts from './Components/Components/ActiveThoughts/ActiveThoughts.vue'
  import DiscardedThoughts from './Components/Components/DiscardedThoughts/DiscardedThoughts.vue'

  import { ref } from 'vue'

  type TabType = 'active' | 'discarded'
  const tab = ref<TabType>('active')
</script>
