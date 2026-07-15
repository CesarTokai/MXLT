<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCalendario } from '../services/api'

const ocupacion = ref([])
const cargando = ref(true)

// Ventana visible: quincena de julio 2026 (15 días desde el día 1 o 16)
const inicioDia = ref(16)
const DIAS_VISIBLES = 15
const ANIO = 2026
const MES = 7 // julio
const HOY = '2026-07-15'

const dias = computed(() =>
  Array.from({ length: DIAS_VISIBLES }, (_, i) => {
    const d = new Date(ANIO, MES - 1, inicioDia.value + i)
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    return {
      num: d.getDate(),
      nombre: d.toLocaleDateString('es-MX', { weekday: 'short' }).replace('.', ''),
      finde: d.getDay() === 0 || d.getDay() === 6,
      hoy: iso === HOY,
      iso
    }
  })
)

const ventanaInicio = computed(() => dias.value[0].iso)
const ventanaFin = computed(() => dias.value[DIAS_VISIBLES - 1].iso)

// Posición de la línea "Hoy" (centro del día actual), null si fuera de ventana
const hoyPos = computed(() => {
  const idx = dias.value.findIndex((d) => d.hoy)
  if (idx === -1) return null
  return ((idx + 0.5) / DIAS_VISIBLES) * 100 + '%'
})

function bloque(v) {
  // Posición/ancho en % dentro de la ventana visible; null si no intersecta.
  if (v.fecha_fin < ventanaInicio.value || v.fecha_inicio > ventanaFin.value) return null
  const dayMs = 86400000
  const start = Math.max(0, (new Date(v.fecha_inicio) - new Date(ventanaInicio.value)) / dayMs)
  const end = Math.min(DIAS_VISIBLES, (new Date(v.fecha_fin) - new Date(ventanaInicio.value)) / dayMs + 1)
  return { left: (start / DIAS_VISIBLES) * 100 + '%', width: ((end - start) / DIAS_VISIBLES) * 100 + '%' }
}

function viajesVisibles(c) {
  return c.viajes.filter((v) => bloque(v))
}

const ESTILOS = {
  apartado: {
    bar: 'bg-primary-fixed text-on-primary-fixed border-l-4 border-primary/60',
    icon: 'bookmark',
    label: 'Apartado',
    tip: 'text-primary-fixed'
  },
  en_curso: {
    bar: 'bg-secondary text-on-secondary border-l-4 border-on-secondary-fixed/40',
    icon: 'near_me',
    label: 'En curso',
    tip: 'text-secondary-fixed'
  },
  finalizado: {
    bar: 'bg-surface-container-highest text-on-surface-variant border border-outline-variant border-l-4 border-l-outline',
    icon: 'check_circle',
    label: 'Finalizado',
    tip: 'text-inverse-on-surface'
  }
}

// KPIs de ocupación en la ventana visible
const kpis = computed(() => {
  const unidades = ocupacion.value.length
  const enTaller = ocupacion.value.filter((c) => c.estado === 'en_taller').length
  const enCurso = ocupacion.value.reduce(
    (n, c) => n + c.viajes.filter((v) => v.estado === 'en_curso').length,
    0
  )
  let diasOcupados = 0
  for (const c of ocupacion.value) {
    const ocupados = new Set()
    for (const v of c.viajes) {
      for (const d of dias.value) {
        if (d.iso >= v.fecha_inicio && d.iso <= v.fecha_fin) ocupados.add(d.iso)
      }
    }
    diasOcupados += ocupados.size
  }
  const pct = unidades ? Math.round((diasOcupados / (unidades * DIAS_VISIBLES)) * 100) : 0
  return { unidades, enTaller, enCurso, pct, disponibles: unidades - enTaller }
})

function fechaCorta(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
}

onMounted(async () => {
  ocupacion.value = (await getCalendario()).ocupacion
  cargando.value = false
})
</script>

<template>
  <div class="space-y-6">
    <!-- Encabezado + KPIs -->
    <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
      <div>
        <h2 class="font-headline-lg text-headline-lg text-primary">Calendario de Ocupación</h2>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1">Vista general de disponibilidad de flota.</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-primary text-on-primary rounded-xl px-4 py-3 shadow-sm relative overflow-hidden">
          <div class="absolute -right-3 -top-3 w-14 h-14 bg-primary-container rounded-full opacity-60"></div>
          <p class="font-label-md text-label-md text-on-primary-container relative z-10">Ocupación</p>
          <p class="font-headline-lg text-headline-lg font-bold relative z-10">{{ kpis.pct }}%</p>
        </div>
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 shadow-sm">
          <p class="font-label-md text-label-md text-on-surface-variant">Disponibles</p>
          <p class="font-headline-lg text-headline-lg text-secondary font-bold">{{ kpis.disponibles }}<span class="text-body-md text-on-surface-variant font-normal"> / {{ kpis.unidades }}</span></p>
        </div>
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 shadow-sm">
          <p class="font-label-md text-label-md text-on-surface-variant">En ruta</p>
          <p class="font-headline-lg text-headline-lg text-primary font-bold">{{ kpis.enCurso }}</p>
        </div>
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 shadow-sm">
          <p class="font-label-md text-label-md text-on-surface-variant">En taller</p>
          <p class="font-headline-lg text-headline-lg font-bold" :class="kpis.enTaller ? 'text-error' : 'text-on-surface'">{{ kpis.enTaller }}</p>
        </div>
      </div>
    </div>

    <!-- Leyenda + navegación -->
    <div class="flex flex-wrap items-center gap-x-5 gap-y-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
      <div class="flex items-center gap-2">
        <span class="w-4 h-2.5 rounded-sm bg-primary-fixed border-l-2 border-primary/60"></span>
        <span class="font-body-md text-body-md text-on-surface-variant">Apartado</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-4 h-2.5 rounded-sm bg-secondary"></span>
        <span class="font-body-md text-body-md text-on-surface-variant">En Curso</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-4 h-2.5 rounded-sm bg-surface-container-highest border border-outline-variant"></span>
        <span class="font-body-md text-body-md text-on-surface-variant">Finalizado</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-4 h-2.5 rounded-sm bg-error-container border border-error/30"></span>
        <span class="font-body-md text-body-md text-on-surface-variant">En Taller</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-0.5 h-4 bg-error rounded-full"></span>
        <span class="font-body-md text-body-md text-on-surface-variant">Hoy</span>
      </div>

      <div class="flex-1"></div>

      <div class="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-lg p-1">
        <button
          class="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors flex items-center disabled:opacity-30"
          :disabled="inicioDia === 1"
          @click="inicioDia = 1"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <span class="font-label-md text-label-md text-primary px-2 min-w-[10.5rem] text-center">
          Julio 2026 · {{ inicioDia === 1 ? '1ª quincena (1–15)' : '2ª quincena (16–31)' }}
        </span>
        <button
          class="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors flex items-center disabled:opacity-30"
          :disabled="inicioDia === 16"
          @click="inicioDia = 16"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
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
        <!-- Columna fija: unidades -->
        <div class="w-48 md:w-60 border-r border-outline-variant bg-surface-container-lowest shrink-0 z-10 shadow-[2px_0_5px_rgba(3,22,50,0.04)]">
          <div class="h-14 border-b border-outline-variant flex items-center px-4 bg-surface-container-low/60">
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Unidad / Placas</span>
          </div>
          <div
            v-for="c in ocupacion"
            :key="c.camioneta_id"
            class="h-[4.5rem] border-b border-outline-variant flex items-center px-4 hover:bg-surface-container-low/40 transition-colors"
          >
            <div class="flex items-center gap-3 min-w-0 w-full">
              <div
                class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                :class="c.estado === 'en_taller' ? 'bg-error-container/50 text-error' : 'bg-primary-container/10 text-primary'"
              >
                <span class="material-symbols-outlined text-[20px]">{{ c.estado === 'en_taller' ? 'car_repair' : 'directions_bus' }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-label-md text-label-md text-on-surface font-bold truncate">{{ c.placa }}</p>
                <p class="font-body-md text-[12px] text-on-surface-variant truncate">{{ c.modelo }}</p>
              </div>
              <span
                class="w-2 h-2 rounded-full shrink-0"
                :class="c.estado === 'en_taller' ? 'bg-error' : 'bg-secondary'"
                :title="c.estado === 'en_taller' ? 'En taller' : 'Disponible'"
              ></span>
            </div>
          </div>
        </div>

        <!-- Área scrolleable -->
        <div class="flex-1 overflow-x-auto admin-scroll">
          <div class="min-w-[820px] relative">
            <!-- Encabezado días -->
            <div class="h-14 border-b border-outline-variant flex bg-surface-container-low/60">
              <div
                v-for="d in dias"
                :key="d.iso"
                class="flex-1 border-r border-outline-variant/50 flex flex-col items-center justify-center relative"
                :class="{ 'bg-surface-container-low': d.finde && !d.hoy, 'bg-primary-fixed/40': d.hoy }"
              >
                <span class="font-body-md text-[10px] uppercase" :class="d.hoy ? 'text-primary font-semibold' : 'text-on-surface-variant'">{{ d.nombre }}</span>
                <span
                  v-if="d.hoy"
                  class="font-label-md text-label-md w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center"
                >
                  {{ d.num }}
                </span>
                <span v-else class="font-label-md text-label-md" :class="d.finde ? 'text-secondary' : 'text-on-surface'">
                  {{ String(d.num).padStart(2, '0') }}
                </span>
              </div>
            </div>

            <!-- Cuerpo -->
            <div class="relative">
              <!-- Fondo: columnas -->
              <div class="absolute inset-0 flex pointer-events-none">
                <div
                  v-for="d in dias"
                  :key="'bg' + d.iso"
                  class="flex-1 border-r border-outline-variant/20"
                  :class="{ 'bg-surface-container-low/30': d.finde, 'bg-primary-fixed/10': d.hoy }"
                ></div>
              </div>

              <!-- Línea "Hoy" -->
              <div
                v-if="hoyPos"
                class="absolute top-0 bottom-0 w-0.5 bg-error z-20 pointer-events-none"
                :style="{ left: hoyPos }"
              >
                <span class="absolute -top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-error"></span>
              </div>

              <!-- Filas -->
              <div
                v-for="c in ocupacion"
                :key="'row' + c.camioneta_id"
                class="h-[4.5rem] border-b border-outline-variant/30 relative group/row hover:bg-primary-fixed/5 transition-colors"
              >
                <!-- Fila sin eventos visibles -->
                <div
                  v-if="!viajesVisibles(c).length && !(c.mantenimiento && bloque({ fecha_inicio: c.mantenimiento.fecha, fecha_fin: c.mantenimiento.fecha }))"
                  class="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <span class="font-label-md text-label-md text-on-surface-variant/50 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">event_available</span>
                    Sin reservas en esta quincena
                  </span>
                </div>

                <!-- Viajes -->
                <template v-for="v in viajesVisibles(c)" :key="v.viaje_id">
                  <div
                    class="absolute top-3 bottom-3 rounded-lg flex items-center gap-1.5 px-2.5 group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all z-10 overflow-visible"
                    :class="ESTILOS[v.estado].bar"
                    :style="bloque(v)"
                  >
                    <span class="material-symbols-outlined text-[15px] shrink-0 opacity-80">{{ ESTILOS[v.estado].icon }}</span>
                    <div class="min-w-0 leading-tight">
                      <p class="font-label-md text-label-md truncate">{{ v.cliente }}</p>
                      <p class="text-[10px] opacity-75 truncate hidden md:block">{{ fechaCorta(v.fecha_inicio) }} – {{ fechaCorta(v.fecha_fin) }}</p>
                    </div>

                    <!-- Tooltip -->
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block w-60 bg-inverse-surface text-inverse-on-surface p-3 rounded-lg shadow-xl z-50 pointer-events-none">
                      <p class="font-label-md text-label-md mb-1.5 flex items-center gap-1.5" :class="ESTILOS[v.estado].tip">
                        <span class="material-symbols-outlined text-[14px]">{{ ESTILOS[v.estado].icon }}</span>
                        {{ ESTILOS[v.estado].label }} · Viaje #VJ-{{ v.viaje_id }}
                      </p>
                      <p class="font-body-md text-body-md text-inverse-on-surface/85">Cliente: {{ v.cliente }}</p>
                      <p class="font-body-md text-body-md text-inverse-on-surface/85">Chofer: {{ v.chofer || 'Pendiente' }}</p>
                      <p class="font-body-md text-body-md text-inverse-on-surface/85">{{ fechaCorta(v.fecha_inicio) }} → {{ fechaCorta(v.fecha_fin) }}</p>
                      <p v-if="v.notas" class="font-body-md text-[12px] text-inverse-on-surface/60 mt-1 border-t border-inverse-on-surface/15 pt-1">{{ v.notas }}</p>
                      <span class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-inverse-surface"></span>
                    </div>
                  </div>
                </template>

                <!-- Mantenimiento (en taller) -->
                <div
                  v-if="c.mantenimiento && bloque({ fecha_inicio: c.mantenimiento.fecha, fecha_fin: c.mantenimiento.fecha })"
                  class="absolute top-3 bottom-3 bg-error-container text-on-error-container border border-error/25 border-l-4 border-l-error rounded-lg flex items-center gap-1 px-2 group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all z-10"
                  :style="bloque({ fecha_inicio: c.mantenimiento.fecha, fecha_fin: c.mantenimiento.fecha })"
                >
                  <span class="material-symbols-outlined text-[15px] shrink-0">build</span>
                  <span class="font-label-md text-label-md truncate hidden md:inline">Taller</span>
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block w-60 bg-inverse-surface text-inverse-on-surface p-3 rounded-lg shadow-xl z-50 pointer-events-none">
                    <p class="font-label-md text-label-md mb-1.5 text-error-container flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[14px]">build</span>
                      En Taller
                    </p>
                    <p class="font-body-md text-body-md text-inverse-on-surface/85">{{ c.mantenimiento.notas }}</p>
                    <p class="font-body-md text-body-md text-inverse-on-surface/85">Fecha: {{ fechaCorta(c.mantenimiento.fecha) }}</p>
                    <span class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-inverse-surface"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pie -->
      <div class="px-4 py-3 border-t border-outline-variant bg-surface-container-low/40 flex items-center justify-between flex-wrap gap-2">
        <span class="font-body-md text-sm text-on-surface-variant">
          {{ kpis.unidades }} unidades · ventana {{ fechaCorta(ventanaInicio) }} – {{ fechaCorta(ventanaFin) }}
        </span>
        <span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">info</span>
          Pasa el cursor sobre una barra para ver el detalle
        </span>
      </div>
    </div>
  </div>
</template>
