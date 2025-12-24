<template>
  <q-btn
    unelevated
    dense
    :disable="disable"
    :size="size"
    :color="bgColor"
    :text-color="textColor"
    :style="buttonStyle"
    @click="$emit('click')"
  >
    <q-icon v-if="icon" :name="icon" size="16px" class="q-mr-xs" />
    <span>{{ label }}</span>

    <q-tooltip v-if="disable">
      {{ resolvedDisabledTooltip }}
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  type ButtonCase = 'info' | 'positive' | 'negative' | 'warning' | 'primary' | 'secondary'

  const props = withDefaults(
    defineProps<{
      size?: 'xs' | 'sm' | 'md' | 'lg'
      case?: ButtonCase
      icon?: string
      label: string
      border?: boolean
      disable?: boolean
      filled?: boolean
      disabledTooltip?: string
    }>(),
    {
      size: 'sm',
      case: 'secondary',
      border: true,
      disable: false,
      filled: false,
    }
  )

  const CASE_STYLES: Record<ButtonCase, { color: string; border: string }> = {
    primary: { color: 'primary', border: 'var(--q-primary)' },
    secondary: { color: 'secondary', border: 'var(--q-secondary)' },

    positive: { color: 'positive', border: 'var(--q-positive)' },
    negative: { color: 'negative', border: 'var(--q-negative)' },
    warning: { color: 'warning', border: 'var(--q-warning)' },
    info: { color: 'info', border: 'var(--q-info)' },
  }

  defineEmits<{ (e: 'click'): void }>()

  const currentCase = computed(() => CASE_STYLES[props.case])

  const bgColor = computed(() => (props.filled ? currentCase.value.color : 'white'))

  const textColor = computed(() => (props.filled ? 'white' : currentCase.value.color))

  const buttonStyle = computed(() => {
    const padding = 'padding: 4px;'

    if (!props.border || props.filled) {
      return padding
    }

    return `${padding} border: 1px solid ${currentCase.value.border};`
  })

  /* ---------- tooltip ---------- */

  const resolvedDisabledTooltip = computed(() => props.disabledTooltip ?? `Cannot ${props.label}`)
</script>
