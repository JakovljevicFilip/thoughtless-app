<template>
  <div class="row q-mb-md q-col-gutter-sm">
    <q-chip
      clickable
      square
      :outline="modelValue !== 'active'"
      :color="modelValue === 'active' ? 'black' : 'black'"
      :text-color="modelValue === 'active' ? 'white' : 'black'"
      @click="setTab('active')"
    >
      <q-icon name="description" class="q-pr-xs" />
      Active
      <q-badge
        class="q-ml-sm"
        :color="modelValue === 'active' ? 'white' : 'grey-3'"
        :text-color="modelValue === 'active' ? 'black' : 'black'"
      >
        {{ active.length }} / {{ activeQuota }}
      </q-badge>
    </q-chip>

    <q-chip
      clickable
      square
      :outline="modelValue !== 'discarded'"
      :color="modelValue === 'discarded' ? 'black' : 'black'"
      :text-color="modelValue === 'discarded' ? 'white' : 'black'"
      @click="setTab('discarded')"
    >
      <q-icon name="delete" class="q-pr-xs" />
      Discarded
      <q-badge
        class="q-ml-sm"
        :color="modelValue === 'discarded' ? 'white' : 'grey-3'"
        :text-color="modelValue === 'discarded' ? 'black' : 'black'"
      >
        {{ discarded.length }} / {{ discardedQuota }}
      </q-badge>
    </q-chip>
  </div>
</template>

<script setup lang="ts">
  import { useThoughtStore } from '../../../thought-store'
  import { ThoughtSettings } from 'src/application/Microservice/Thought/Domain/ThoughtSettings'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'
  import { thoughtService } from '../../../Service/thought-service'

  type TabType = 'active' | 'discarded'

  defineProps<{
    modelValue: TabType
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: TabType): void
  }>()

  const setTab = (value: TabType) => emit('update:modelValue', value)

  const store = useThoughtStore()
  const { active, discarded } = storeToRefs(store)

  const activeQuota = ThoughtSettings.maxActive
  const discardedQuota = ThoughtSettings.maxDiscarded

  onMounted(async () => {
    await thoughtService.listActive()
    await thoughtService.listDiscarded()
  })
</script>
