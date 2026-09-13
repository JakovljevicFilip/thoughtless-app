<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">Station</div>
      <div class="text-body2 text-grey-7">Prepares orders it hears about, then reports back.</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle2 text-grey-7">Pending</div>
      <q-list separator>
        <q-item v-for="order in pending" :key="order.orderId">
          <q-item-section>{{ order.item }}</q-item-section>
          <q-item-section side>
            <q-btn
              :label="order.isRepeat ? 'Send Again' : 'Prepare'"
              color="primary"
              dense
              unelevated
              @click="prepare(order.orderId)"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-subtitle2 text-grey-7 q-mt-md">Prepared</div>
      <q-list separator>
        <q-item v-for="entry in log" :key="entry.orderId + entry.preparedAt.toISOString()">
          <q-item-section>{{ entry.item }}{{ entry.isRepeat ? ' - (sent again)' : '' }}</q-item-section>
          <q-item-section side>{{ entry.preparedAt.toLocaleTimeString() }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import { useStationStore } from './station-store'
  import { stationService } from './station-service'

  import { storeToRefs } from 'pinia'

  const { pending, log } = storeToRefs(useStationStore())

  function prepare(orderId: string): void {
    stationService.prepareOrder(orderId)
  }
</script>
