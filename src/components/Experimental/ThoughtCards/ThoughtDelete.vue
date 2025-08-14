<template>
    <div class="row items-center q-gutter-xs cursor-pointer" role="button" tabindex="0" @click="confirmDelete"
        @keydown.enter.prevent="confirmDelete" @keydown.space.prevent="confirmDelete">
        <q-icon name="delete" size="16px" class="icon" />
        <span>{{ label }}</span>
    </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { deleteThought } from 'src/services/thoguhts-service'
import ConfirmDialog from '../dialogs/ConfirmDialog.vue';

const props = withDefaults(defineProps<{
    id: string,
    content: string,
    label?: string,
}>(), { label: 'Delete' })

const $q = useQuasar()

function confirmDelete() {
    $q.dialog({
        component: ConfirmDialog,
        componentProps: {
            title: 'Delete',
            message: 'Are you sure?',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            preview: props.content
        }
    }).onOk(() => {
        void handleDelete()
    })
}

async function handleDelete() {
    try {
        await deleteThought(props.id)
        $q.notify({ type: 'positive', message: 'Deleted' })
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Delete failed'
        $q.notify({ type: 'negative', message })
    }
}

</script>

<style scoped>
/* Icon color inherits from parent text color in your actions row (text-white).
   If you want to be explicit, keep this class. */
.icon {
    color: currentColor;
}
</style>
