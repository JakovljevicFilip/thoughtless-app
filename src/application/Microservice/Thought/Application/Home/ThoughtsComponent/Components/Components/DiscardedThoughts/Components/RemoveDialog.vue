<template>
  <q-dialog v-model="removeDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="warning" color="negative" size="md" class="q-mr-md" />
        <div class="text-h6">Thought removal</div>
      </q-card-section>

      <q-card-section>
        <div class="text-body2">
          Are you sure you want to permanently remove this note? This action cannot be undone.
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="grey-7" @click="cancel" />
        <q-btn flat label="Delete" color="negative" @click="remove" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'
  import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref } from 'vue'

  const { removed } = defineProps<{
    removed: Thought | null
  }>()

  const removeDialog = defineModel<boolean | null>({
    default: null,
  })

  const isSubmitting = ref(false)

  async function remove(): Promise<void> {
    if (!removed) return
    try {
      isSubmitting.value = true
      await thoughtService.remove(removed)
      notify.success('Task removed.')
      cancel()
    } catch {
      notify.warning('Task removal failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }

  function cancel() {
    removeDialog.value = false
  }
</script>
