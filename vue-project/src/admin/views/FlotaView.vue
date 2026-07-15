<script setup>
import { ref, onMounted, computed } from 'vue'
import { getCamionetas, getAvisos } from '../services/api'
import StatusBadge from '../components/StatusBadge.vue'

const camionetas = ref([])
const tramites = ref([])
const cargando = ref(true)

const conProgreso = computed(() =>
  camionetas.value.map((c) => {
    const inicio = c.proximo_mantenimiento_km - c.km_mantenimiento
    const pct = Math.min(100, Math.max(0, ((c.km_actual - inicio) / c.km_mantenimiento) * 100))
    return { ...c, pct: Math.round(pct), faltan: c.proximo_mantenimiento_km - c.km_actual }
  })
)

const km = (n) => Number(n).toLocaleString('es-MX')

onMounted(async () => {
  const [c, a] = await Promise.all([getCamionetas(), getAvisos()])
  camionetas.value = c.camionetas
  tramites.value = a.avisos.tramites_por_vencer
  cargando.value = false
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-display text-on-surface">Flota / Camionetas</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-1">Gestión y estado de mantenimiento de vehículos</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 border border-outline text-on-surface rounded-xl hover:bg-surface-container-high transition-colors font-label-md text-label-md">
          <span class="material-symbols-outlined text-[18px]">filter_list</span>
          Filtrar
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-xl hover:opacity-90 transition-opacity font-label-md text-label-md shadow-sm">
          <span class="material-symbols-outlined text-[18px]">add</span>
          Nueva Unidad
        </button>
      </div>
    </div>

    <div v-if="cargando" class="flex items-center justify-center py-32 text-on-surface-variant gap-2">
      <span class="material-symbols-outlined animate-spin">progress_activity</span>
      Cargando…
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Cards de unidades -->
      <div class="lg:col-span-8">
        <h3 class="font-headline-lg text-headline-lg text-on-surface mb-4">Unidades Urvan NV350</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="c in conProgreso"
            :key="c.id"
            class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-full h-1 opacity-80" :class="c.estado === 'en_taller' ? 'bg-error' : 'bg-secondary'"></div>

            <div class="flex justify-between items-start mb-6">
              <div>
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 class="font-headline-md text-headline-md text-on-surface">{{ c.placa }}</h4>
                  <StatusBadge :estado="c.estado" />
                </div>
                <p class="font-label-md text-label-md text-on-surface-variant">Nissan {{ c.modelo }} • {{ c.anio }}</p>
              </div>
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center"
                :class="c.estado === 'en_taller' ? 'bg-error-container/30 text-error' : 'bg-surface-container text-primary'"
              >
                <span class="material-symbols-outlined text-2xl">{{ c.estado === 'en_taller' ? 'car_repair' : 'directions_bus' }}</span>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex justify-between font-label-md text-label-md mb-2">
                <span class="text-on-surface-variant">Odómetro Actual</span>
                <span class="font-semibold" :class="c.faltan < 0 ? 'text-error' : 'text-on-surface'">{{ km(c.km_actual) }} km</span>
              </div>
              <div class="w-full bg-surface-container-high rounded-full h-2 mb-2 overflow-hidden">
                <div class="h-2 rounded-full" :class="c.faltan < 0 ? 'bg-error' : c.faltan <= 1000 ? 'bg-tertiary-fixed-dim' : 'bg-secondary'" :style="{ width: c.pct + '%' }"></div>
              </div>
              <div class="flex justify-between font-label-md text-label-md text-on-surface-variant">
                <span>Próximo Servicio: {{ km(c.proximo_mantenimiento_km) }} km</span>
                <span v-if="c.faltan >= 0">Faltan: {{ km(c.faltan) }} km</span>
                <span v-else class="text-error">Excedido: {{ km(-c.faltan) }} km</span>
              </div>
            </div>

            <div class="flex gap-3 pt-4 border-t border-surface-container-high">
              <button class="flex-1 flex items-center justify-center gap-2 py-2 border border-outline text-primary rounded-lg hover:bg-surface-container-low transition-colors font-label-md text-label-md">
                <span class="material-symbols-outlined text-[16px]">history</span>
                Historial
              </button>
              <button class="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-container text-on-primary-container rounded-lg hover:opacity-90 transition-opacity font-label-md text-label-md">
                <span class="material-symbols-outlined text-[16px]">build</span>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel trámites -->
      <div class="lg:col-span-4">
        <div class="bg-primary text-on-primary rounded-xl p-lg shadow-sm relative overflow-hidden">
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-container rounded-full opacity-50 blur-3xl"></div>
          <div class="relative z-10">
            <h3 class="font-headline-md text-headline-md font-bold mb-6 flex items-center gap-2 text-on-primary">
              <span class="material-symbols-outlined">warning</span>
              Trámites por Vencer
            </h3>
            <div class="space-y-4">
              <div
                v-for="t in tramites"
                :key="t.tramite_id"
                class="bg-primary-container/50 rounded-lg p-4 border border-on-primary-fixed/20"
              >
                <div class="flex justify-between items-start mb-2 gap-2">
                  <div>
                    <h4 class="font-body-md text-body-md font-semibold text-on-primary capitalize">{{ t.tipo }}</h4>
                    <p class="font-label-md text-label-md text-on-primary-container">{{ t.camioneta_placa }}</p>
                  </div>
                  <span
                    class="font-label-md text-[10px] px-2 py-1 rounded-md whitespace-nowrap"
                    :class="t.nivel === 'critico' ? 'bg-error text-on-error' : 'bg-tertiary-container text-on-tertiary-container'"
                  >
                    Vence en {{ t.dias_restantes }} días
                  </span>
                </div>
                <div class="flex justify-between items-center mt-3">
                  <span class="font-label-md text-label-md text-on-primary/70">Fecha: {{ t.vencimiento }}</span>
                  <button class="text-secondary-fixed hover:text-white transition-colors font-label-md text-label-md flex items-center gap-1">
                    Renovar
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
            <button class="w-full mt-6 py-2 border border-on-primary/30 text-on-primary rounded-lg hover:bg-on-primary/10 transition-colors font-label-md text-label-md">
              Ver Todos los Trámites
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
