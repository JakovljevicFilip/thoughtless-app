<template>
  <q-dialog v-model="showChangeDialog" persistent @before-show="beforeShow">
    <q-card class="q-pa-lg" style="width: 480px; max-width: 90vw">
      <q-card-section class="q-pa-none">
        <div class="text-h6">Change thought</div>
      </q-card-section>

      <q-card-section class="q-pa-none q-mt-md">
        <q-input
          v-model="content"
          type="textarea"
          filled
          bg-color="grey-2"
          :rows="20"
          input-style="resize: none"
          placeholder="Change thought"
          :rules="rules"
        />
      </q-card-section>

      <q-card-actions align="right">
        <button-component label="Cancel" @click="cancel" size="md" />
        <button-component
          label="Change"
          @click="change"
          size="md"
          case="positive"
          :disable="!canSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import type { ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'
  import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

  import { ThoughtSettings } from 'src/application/Microservice/Thought/Domain/ThoughtSettings'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref, computed } from 'vue'
  import ButtonComponent from 'src/application/Shared/Application/ButtonComponent.vue'

  const { thought } = defineProps<{
    thought: ActiveThought | null
  }>()

  const showChangeDialog = defineModel<boolean | null>({
    default: null,
  })

  const isSubmitting = ref(false)
  const content = ref('')

  const trimmedLength = computed(() => content.value.trim().length)

  const min = ThoughtSettings.minContentLength
  const max = ThoughtSettings.maxContentLength
  const canSubmit = computed(() => {
    return trimmedLength.value >= min && trimmedLength.value <= max && !isSubmitting.value
  })

  const rules = [
    (val: string) => (!!val && val.trim().length > 0) || 'Task body is required',
    (val: string) => val.trim().length >= min || `Minimum ${min} characters`,
    (val: string) => val.trim().length <= max || `Maximum ${max} characters`,
  ]

  async function change(): Promise<void> {
    if (!thought || !canSubmit.value) return
    try {
      isSubmitting.value = true
      await thoughtService.change(thought, content.value)
      content.value = ''
      cancel()
      notify.success('Task changed successfully.')
    } catch {
      notify.warning('Task change failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }

  function beforeShow() {
    if (thought) content.value = thought.content
  }

  function cancel() {
    showChangeDialog.value = false
  }
</script>
