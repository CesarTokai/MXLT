<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCalendario } from '../services/api'

const ocupacion = ref([])
const cargando = ref(true)

// Ventana visible: quincena de julio 2026 (15 días desde el día 1 o 16)
const inicioDia = ref(1)
const DIAS_VISIBLES = 15
const ANIO = 2026
const MES = 7 // julio

const dias = computed(() =>
  Array.from({ length: DIAS_VISIBLES }, (_, i) => {
    const d = new Date(ANIO, MES - 1, inicioDia.value + i)
    return {
      num: d.getDate(),
      nombre: d.toLocaleDateString('es-MX', { weekday: 'short' }),
      finde: d.getDay() === 0 || d.getDay() === 6,
      iso: d.toISOString().slice(0, 10)
    }
  })
)

const ventanaInicio = computed(() => dias.value[0].iso)
const ventanaFin = computed(() => dias.value[DIAS_VISIBLES - 1].iso)

function bloque(v) {
  // Posición/ancho en % dentro de la ventana visible; null si no intersecta.
  if (v.fecha_fin < ventanaInicio.value || v.fecha_inicio > ventanaFin.value) return null
  const dayMs = 86400000
  const start = Math.max(0, (new Date(v.fecha_inicio) - new Date(ventanaInicio.value)) / dayMs)
  const end = Math.min(DIAS_VISIBLES, (new Date(v.fecha_fin) - new Date(ventanaInicio.value)) / dayMs + 1)
  return { left: (start / DIAS_VISIBLES) * 100 + '%', width: ((end - start) / DIAS_VISIBLES) * 100 + '%' }
}

const ESTILOS = {
  apartado: 'bg-inverse-primary text-on-primary-fixed',
  en_curso: 'bg-secondary text-on-secondary',
  finalizado: 'bg-surface-container-highest border border-outline-variant text-on-surface-variant'
}

onMounted(async () => {
  ocupacion.value = (await getCalendario()).ocupacion
  cargando.value = false
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-headline-lg text-headline-lg text-primary">Calendario de Ocupación</h2>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1">Vista general de disponibilidad de flota.</p>
      </div>
    </div>

    <!-- Leyenda + navegación -->
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-inverse-primary"></div>
        <span class="font-body-md text-body-md text-on-surface-variant">Apartado</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-secondary"></div>
        <span class="font-body-md text-body-md text-on-surface-variant">En Curso</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-surface-container-highest border border-outline-variant"></div>
        <span class="font-body-md text-body-md text-on-surface-variant">Finalizado</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-error"></div>
        <span class="font-body-md text-body-md text-on-surface-variant">En Taller</span>
      </div>
      <div class="flex-1"></div>
      <div class="flex items-center gap-4">
        <button
          class="p-1 rounded hover:bg-surface-container-low text-on-surface-variant transition-colors flex items-center disabled:opacity-40"
          :disabled="inicioDia === 1"
          @click="inicioDia = 1"
        >
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <span class="font-label-md text-label-md text-primary">Julio 2026 · {{ inicioDia === 1 ? '1ª' : '2ª' }} quincena</span>
        <button
          class="p-1 rounded hover:bg-surface-container-low text-on-surface-variant transition-colors flex items-center disabled:opacity-40"
          :disabled="inicioDia === 16"
          @click="inicioDia = 16"
        >
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>

    <div v-if="cargando" class="flex items-center justify-center py-32 text-on-surface-variant gap-2">
      <span class="material-symbols-outlined animate-spin">progress_activity</span>
      Cargando…
    </div>

    <!-- Gantt -->
    <div v-else class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div class="flex">
        <!-- Columna fija -->
        <div class="w-48 md:w-64 border-r border-outline-variant bg-surface-container-lowest shrink-0 z-10 shadow-[2px_0_5px_rgba(3,22,50,0.03)]">
          <div class="h-12 border-b border-outline-variant flex items-center px-4 bg-surface-container-low/50">
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Unidad / Placas</span>
          </div>
          <div v-for="c in ocupacion" :key="c.camioneta_id" class="h-16 border-b border-outline-variant flex items-center px-4">
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                :class="c.estado === 'en_taller' ? 'bg-error-container/40 text-error' : 'bg-surface-container text-primary'"
              >
                <span class="material-symbols-outlined text-[20px]">{{ c.estado === 'en_taller' ? 'car_repair' : 'directions_bus' }}</span>
              </div>
              <div class="min-w-0">
                <p class="font-label-md text-label-md text-on-surface truncate">{{ c.placa }}</p>
                <p class="font-body-md text-[12px] text-on-surface-variant truncate">{{ c.modelo }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Área scrolleable -->
        <div class="flex-1 overflow-x-auto admin-scroll">
          <div class="min-w-[900px]">
            <!-- Encabezado días -->
            <div class="h-12 border-b border-outline-variant flex bg-surface-container-low/50">
              <div
                v-for="d in dias"
                :key="d.iso"
                class="flex-1 border-r border-outline-variant/50 flex flex-col items-center justify-center"
                :class="{ 'bg-surface-container-low': d.finde }"
              >
                <span class="font-body-md text-[10px] text-on-surface-variant capitalize">{{ d.nombre }}</span>
                <span class="font-label-md text-label-md" :class="d.finde ? 'text-secondary' : 'text-on-surface'">{{ String(d.num).padStart(2, '0') }}</span>
              </div>
            </div>

            <!-- Filas -->
            <div class="relative">
              <div class="absolute inset-0 flex pointer-events-none">
                <div
                  v-for="d in dias"
                  :key="'bg' + d.iso"
                  class="flex-1 border-r border-outline-variant/20"
                  :class="{ 'bg-surface-container-low/20': d.finde }"
                ></div>
              </div>

              <div v-for="c in ocupacion" :key="'row' + c.camioneta_id" class="h-16 border-b border-outline-variant/30 relative">
                <template v-for="v in c.viajes" :key="v.viaje_id">
                  <div
                    v-if="bloque(v)"
                    class="absolute top-2 bottom-2 rounded-md flex items-center px-3 group cursor-pointer shadow-sm hover:shadow-md transition-all z-10"
                    :class="ESTILOS[v.estado] || ESTILOS.finalizado"
                    :style="bloque(v)"
                  >
                    <span class="font-label-md text-label-md truncate">{{ v.cliente }}</span>
                    <!-- Tooltip -->
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-inverse-surface text-inverse-on-surface p-3 rounded-lg shadow-xl z-50 pointer-events-none">
                      <p class="font-label-md text-label-md mb-1 capitalize" :class="v.estado === 'en_curso' ? 'text-secondary-fixed' : 'text-primary-fixed'">
                        {{ v.estado.replace('_', ' ') }}
                      </p>
                      <p class="font-body-md text-body-md text-inverse-on-surface/80">Cliente: {{ v.cliente }}</p>
                      <p class="font-body-md text-body-md text-inverse-on-surface/80">Chofer: {{ v.chofer || 'Pendiente' }}</p>
                      <p class="font-body-md text-body-md text-inverse-on-surface/80">{{ v.fecha_inicio }} → {{ v.fecha_fin }}</p>
                    </div>
                  </div>
                </template>

                <!-- Mantenimiento (en taller) -->
                <div
                  v-if="c.mantenimiento && bloque({ fecha_inicio: c.mantenimiento.fecha, fecha_fin: c.mantenimiento.fecha })"
                  class="absolute top-2 bottom-2 bg-error-container text-on-error-container border border-error/20 rounded-md flex items-center px-2 group cursor-pointer shadow-sm z-10"
                  :style="bloque({ fecha_inicio: c.mantenimiento.fecha, fecha_fin: c.mantenimiento.fecha })"
                >
                  <span class="material-symbols-outlined text-[16px] mr-1">build</span>
                  <span class="font-label-md text-label-md truncate hidden md:inline">Taller</span>
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-inverse-surface text-inverse-on-surface p-3 rounded-lg shadow-xl z-50 pointer-events-none">
                    <p class="font-label-md text-label-md mb-1 text-error-container">En Taller</p>
                    <p class="font-body-md text-body-md text-inverse-on-surface/80">{{ c.mantenimiento.notas }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
