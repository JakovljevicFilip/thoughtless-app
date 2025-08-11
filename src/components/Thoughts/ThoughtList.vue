<template>
    <div class="q-pa-md">
        <transition-group appear tag="div" class="row items-start q-col-gutter-md q-gutter-y-md"
            enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-for="t in thoughts" :key="t.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
                <q-card class="rounded-borders overflow-hidden fade-bottom hover-wrap"
                    style="height: 180px; position: relative">
                    <q-card-section :class="['preserve-preline', fontSizeClass(t.content), 'q-pr-sm']">
                        {{ t.content }}
                    </q-card-section>

                    <q-btn flat round size="sm" icon="delete" class="delete-btn" @click.stop="confirmDelete(t.id)"
                        :aria-label="`Delete thought ${t.id}`" />
                </q-card>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { listThoughts, deleteThought } from 'src/services/thoguhts-service'
import { useThoughtsStore } from 'src/stores/thoughts-store'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useThoughtsStore()
const { thoughts } = storeToRefs(store)

function fontSizeClass(text: string) {
    const len = text.length
    if (len < 50) return 'text-h4'
    if (len < 150) return 'text-subtitle1'
    return 'text-body2'
}

function confirmDelete(id: string) {
    $q.dialog({
        title: 'Delete',
        message: 'Are you sure?',
        cancel: true,
        ok: { label: 'Delete', color: 'negative' }
    }).onOk(() => {
        void (async () => {
            try {
                await deleteThought(id)
                $q.notify({ type: 'positive', message: 'Deleted' })
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : 'Delete failed'
                $q.notify({ type: 'negative', message })
            }
        })()
    })
}

onMounted(async () => {
    await listThoughts()
})
</script>

<style scoped>
.preserve-preline {
    white-space: pre-line;
}

.fade-bottom {
    position: relative;
}

.fade-bottom::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: inherit;
    -webkit-mask-image: linear-gradient(to bottom, transparent 60%, black 100%);
    mask-image: linear-gradient(to bottom, transparent 60%, black 100%);
}

.hover-wrap {
    position: relative;
}

.delete-btn {
    position: absolute;
    right: 8px;
    bottom: 8px;
    opacity: 0;
    transition: opacity 120ms ease;
}

.hover-wrap:hover .delete-btn {
    opacity: 1;
}
</style>
