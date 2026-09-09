<template>
  <div class="q-pa-lg">
    <div class="text-h4 text-center q-mb-lg">Event Bus Demo</div>

    <p class="text-body1 text-grey-8 q-mb-lg" style="max-width: 760px; margin-left: auto; margin-right: auto">
      This demo shows two independent domains, FrontDesk and Station, coordinating without ever importing each
      other's service, store, or event contracts directly. Every interaction crosses through
      <code>Platform/EventBus</code>: FrontDesk publishes an order and Station's subscriber reacts to it, then
      Station publishes back that it's ready and FrontDesk's subscriber reacts in turn. Place an order below to see
      it flow both ways.
    </p>

    <div class="demo-row">
      <div class="demo-col">
        <FrontDeskPanel />
      </div>
      <q-separator class="lt-md" />
      <q-separator vertical class="gt-sm demo-divider" />
      <div class="demo-col">
        <StationPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FrontDeskPanel from '../FrontDesk/Application/FrontDeskPanel.vue'
  import StationPanel from '../Station/Application/StationPanel.vue'
</script>

<style scoped>
  .demo-row {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .demo-col {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .demo-row {
      display: grid;
      grid-template-columns: 1fr 4fr 1fr 1fr 4fr 1fr;
      align-items: stretch;
      gap: 0;
    }

    .demo-col:nth-of-type(1) {
      grid-column: 2;
    }

    .demo-col:nth-of-type(2) {
      grid-column: 5;
    }

    .demo-divider {
      grid-column: 3 / 5;
      justify-self: center;
    }
  }
</style>
