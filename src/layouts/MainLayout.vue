<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import PlatformConfig from 'src/config/platform-config'

  import { useMeta } from 'quasar'

  useMeta({
    title: PlatformConfig.applicationName,
  })
</script>
