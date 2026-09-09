<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">FrontDesk</div>
      <div class="text-body2 text-grey-7">Places orders, waits for Station to mark them ready.</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row q-gutter-sm items-center">
        <q-input v-model="item" filled dense placeholder="Item name…" class="col" />
        <q-btn label="Place Order" color="primary" unelevated :disable="!canSubmit" @click="submit" />
      </div>

      <q-list separator class="q-mt-md">
        <q-item v-for="order in orders" :key="order.id">
          <q-item-section>{{ order.item }}{{ order.sentAgain ? ' - (sent again)' : '' }}</q-item-section>
          <q-item-section side>
            <div class="row q-gutter-sm items-center">
              <q-badge :color="order.status === 'ready' ? 'positive' : 'grey-6'">
                {{ order.status }}
              </q-badge>
              <template v-if="order.status === 'ready'">
                <q-btn label="Send Out" color="positive" dense flat @click="sendOut(order.id)" />
                <q-btn label="Send Back" color="negative" dense flat @click="returnOrder(order.id)" />
              </template>
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-subtitle2 text-grey-7 q-mt-md">Activity</div>
      <q-list separator>
        <q-item v-for="entry in log" :key="entry.orderId + entry.at.toISOString() + entry.action">
          <q-item-section>{{ entry.item }} - {{ entry.action }}</q-item-section>
          <q-item-section side>{{ entry.at.toLocaleTimeString() }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import { frontDeskService } from './frontDesk-service'
  import { useFrontDeskStore } from './frontDesk-store'

  import { storeToRefs } from 'pinia'

  import { ref, computed } from 'vue'

  const item = ref('')

  const { orders, log } = storeToRefs(useFrontDeskStore())

  const canSubmit = computed(() => item.value.trim().length > 0)

  function submit(): void {
    frontDeskService.placeOrder(item.value)
    item.value = ''
  }

  function returnOrder(orderId: string): void {
    frontDeskService.returnOrder(orderId)
  }

  function sendOut(orderId: string): void {
    frontDeskService.sendOut(orderId)
  }
</script>
