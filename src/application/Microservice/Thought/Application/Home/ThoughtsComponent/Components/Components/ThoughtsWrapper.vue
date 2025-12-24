<template>
  <div class="row q-col-gutter-md">
    <div v-for="(item, index) in items" :key="index" class="col-xs-12 col-sm-6 col-md-4">
      <slot :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
  defineProps<{
    items: readonly T[]
  }>()
</script>
