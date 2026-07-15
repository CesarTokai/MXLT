<script setup>
import { computed } from 'vue'

const props = defineProps({ estado: { type: String, required: true } })

const MAP = {
  apartado: { label: 'Apartado', wrap: 'bg-primary-fixed text-on-primary-fixed border border-primary-fixed-dim', dot: 'bg-primary' },
  en_curso: { label: 'En curso', wrap: 'bg-secondary-fixed text-on-secondary-fixed-variant border border-secondary-fixed-dim', dot: 'bg-secondary animate-pulse' },
  finalizado: { label: 'Finalizado', wrap: 'bg-surface-container-highest text-on-surface-variant border border-outline-variant', dot: 'bg-outline' },
  cancelado: { label: 'Cancelado', wrap: 'bg-error-container text-on-error-container border border-error/20', dot: 'bg-error' },
  disponible: { label: 'Disponible', wrap: 'bg-secondary-fixed text-on-secondary-fixed-variant border border-secondary-fixed-dim', dot: 'bg-secondary' },
  en_taller: { label: 'En taller', wrap: 'bg-error-container text-on-error-container border border-error/20', dot: 'bg-error' },
  activo: { label: 'Activo', wrap: 'bg-secondary-container text-on-secondary-container', dot: 'bg-secondary' },
  inactivo: { label: 'Inactivo', wrap: 'bg-surface-variant text-on-surface-variant', dot: 'bg-outline' }
}

const s = computed(() => MAP[props.estado] || { label: props.estado, wrap: 'bg-surface-container text-on-surface-variant', dot: 'bg-outline' })
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
    :class="s.wrap"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="s.dot"></span>
    {{ s.label }}
  </span>
</template>
