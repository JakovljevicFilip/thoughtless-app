<template>
    <q-page class="q-pa-md" style="height: 400px">
        <ThoughtsSplitter v-model="splitterModel" :limits="[10, 90]">
            <template #form>
                <NewThoughtForm @submit="addThought" />
            </template>
            <template #list>
                <ThoughtList :thoughts="thoughts" />
            </template>
        </ThoughtsSplitter>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NewThoughtForm from 'src/components/Thoughts/NewThoughtForm.vue'
import ThoughtList from 'src/components/Thoughts/ThoughtList.vue'
import ThoughtsSplitter from 'src/components/Thoughts/Splitter/ThoughtsSplitter.vue'
import type { NewThought } from 'src/types/NewThought'
import type { ExistingThought } from 'src/types/ExistingThought'

const splitterModel = ref(50)
const thoughts = ref<ExistingThought[]>([])

function addThought(newThought: NewThought) {
    thoughts.value.unshift({
        id: crypto.randomUUID(),
        content: newThought.content,
        createdAt: new Date().toISOString()
    })
}
</script>
