<template>
  <q-chip
    v-if="isReady"
    square
    outline
    color="black"
    text-color="black"
    icon="local_fire_department"
  >
    {{ currentStreak }}
  </q-chip>
</template>

<script setup lang="ts">
  import { useStreakStore } from './streak-store'
  import { streakService } from './Service/streak-service'

  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  const store = useStreakStore()
  const { currentStreak, isReady } = storeToRefs(store)

  onMounted(async () => {
    await streakService.load()
  })
</script>
