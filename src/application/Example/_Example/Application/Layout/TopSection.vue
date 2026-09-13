<template>
  <q-header elevated>
    <NoticeComponent />

    <q-toolbar>
      <q-toolbar-title class="row items-center no-wrap">
        <span>{{ PlatformConfig.applicationName }}</span>

        <q-separator vertical inset class="q-mx-md" />

        <q-btn flat dense label="Documentation" to="/" />

        <q-separator vertical inset class="q-mx-sm" />

        <q-btn flat dense label="Example" to="/example/task" />

        <q-separator vertical inset class="q-mx-sm" />

        <q-btn flat dense label="Event Bus Demo" to="/example/event-bus-demo" />
      </q-toolbar-title>

      <q-space />
      
      <div>v{{ PlatformConfig.applicationVersion }}</div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  import NoticeComponent from 'src/application/Platform/Notice/Application/NoticeComponent.vue'
  import PlatformConfig from 'src/config/platform-config'
</script>
