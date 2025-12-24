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
      :rules="rules"
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
  import { ThoughtSettings } from 'src/application/Microservice/Thought/Domain/ThoughtSettings'
  import { thoughtService } from '../../../Service/thought-service'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { computed, ref } from 'vue'
  import ButtonComponent from 'src/application/Shared/Application/ButtonComponent.vue'

  const content = ref('')

  const trimmedLength = computed(() => content.value.trim().length)
  const canSubmit = computed(() => {
    return trimmedLength.value >= min && trimmedLength.value <= max && !isSubmitting.value
  })
  const isSubmitting = ref(false)

  const record = async () => {
    if (!canSubmit.value) return

    try {
      isSubmitting.value = true
      await thoughtService.record(content.value)
      content.value = ''
      notify.success('Thought recorded.')
    } catch {
      notify.warning('Thought record failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }
  // TODO: Extract rule
  const min = ThoughtSettings.minContentLength
  const max = ThoughtSettings.maxContentLength

  const rules = [
    (val: string) => (!!val && val.trim().length > 0) || 'Thought content is required',
    (val: string) => val.trim().length >= min || `Minimum ${min} characters`,
    (val: string) => val.trim().length <= max || `Maximum ${max} characters`,
  ]
</script>
