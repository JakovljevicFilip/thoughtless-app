<template>
  <div class="q-my-lg q-mx-sm row justify-center">
    <div id="wrapper" class="col q-mx-lg">
      <ThoughtsComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ThoughtsComponent from './ThoughtsComponent/ThoughtsComponent.vue'
</script>

<style>
  #wrapper {
    max-width: 1000px;
    min-width: 300px;
  }
</style>
