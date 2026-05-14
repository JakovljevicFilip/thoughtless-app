<template>
  <q-header flat class="bg-white text-black no-border no-shadow">
    <NoticeComponent />
    <q-toolbar>
      <q-toolbar-title>{{ PlatformConfig.applicationName }}</q-toolbar-title>
      <span>{{ PlatformConfig.applicationVersion }}</span>
      <q-btn round flat icon="account_circle" :disable="true" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  import NoticeComponent from 'src/application/Platform/Notice/Application/NoticeComponent.vue'

  import PlatformConfig from 'src/config/platform-config'
</script>
