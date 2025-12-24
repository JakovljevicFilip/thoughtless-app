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
          :rules="thoughtInput.content.rules"
          lazy-rules
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
  import ButtonComponent from 'src/application/Shared/Application/ButtonComponent.vue'

  import type { ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'
  import { thoughtInput } from '../../../Input/thought-input'
  import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref, computed } from 'vue'

  const { thought } = defineProps<{
    thought: ActiveThought | null
  }>()

  const showChangeDialog = defineModel<boolean | null>({ default: null })

  const content = ref('')
  const isSubmitting = ref(false)

  const canSubmit = computed(
    () => thoughtInput.content.isValid(content.value) && !isSubmitting.value
  )

  async function change(): Promise<void> {
    if (!thought || !canSubmit.value) return

    try {
      isSubmitting.value = true
      await thoughtService.change(thought, content.value)
      content.value = ''
      cancel()
      notify.success('Thought changed successfully.')
    } catch {
      notify.warning('Thought change failed. Please try again.')
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
