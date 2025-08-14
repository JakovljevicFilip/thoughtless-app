<template>
    <q-page class="column fit">
        <div class="col"></div> <!-- page content spacer -->

        <ThoughtInput @send="onSend" />
    </q-page>
</template>

<script setup lang="ts">
import ThoughtInput from './ThoughtInput/ThoughtInput.vue';


function onSend(message: string) {
    // persist / post / toast etc.
    console.log('Thought sent:', message)
}
</script>
