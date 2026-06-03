<template>
  <div class="full-width q-mb-md">
    <q-input
      v-model="content"
      type="textarea"
      filled
      placeholder="Record your thought here..."
      color="grey-5"
      standout="bg-grey-4 text-black"
      hide-bottom-space
      :rules="thoughtInput.content.rules"
      lazy-rules
    />
    <div class="row justify-end q-mt-sm">
      <button-component
        label="Record"
        case="positive"
        size="md"
        :filled="true"
        :disable="!canSubmit"
        @click="record"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { isActiveQuotaFull } from './isActiveQuotaFull-helper'

  import ButtonComponent from 'src/application/Shared/Application/ButtonComponent.vue'

  import { ThoughtApplicationError } from '../../../ThoughtApplicationError'
  import { thoughtService } from '../../../Service/thought-service'
  import { useThoughtStore } from '../../../thought-store'
  import { thoughtInput } from './Input/thought-input'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'

  const content = ref('')
  const store = useThoughtStore()
  const { active } = storeToRefs(store)

  const canSubmit = computed(
    () =>
      thoughtInput.content.isValid(content.value) &&
      !isSubmitting.value &&
      !isActiveQuotaFull(active.value.length)
  )
  const isSubmitting = ref(false)

  const record = async () => {
    if (!canSubmit.value) return

    try {
      isSubmitting.value = true
      await thoughtService.record(content.value)
      content.value = ''
      notify.success('Thought recorded.')
    } catch (error) {
      if (error instanceof ThoughtApplicationError) return
      notify.warning('Thought record failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }
</script>
