<script setup>
import { ref, onMounted, computed } from 'vue'
import { getDashboard, getAvisos, getViajes } from '../services/api'
import StatusBadge from '../components/StatusBadge.vue'

const dash = ref(null)
const avisos = ref(null)
const viajes = ref([])
const cargando = ref(true)

const mxn = (n) => '$' + Number(n).toLocaleString('es-MX', { minimumFractionDigits: 2 })

const viajesRecientes = computed(() =>
  [...viajes.value].sort((a, b) => b.fecha_inicio.localeCompare(a.fecha_inicio)).slice(0, 5)
)

function fecha(d) {
  if (!d) return '—'
  return new Date(d + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

function initials(nombre) {
  return (nombre || '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

onMounted(async () => {
  const [d, a, v] = await Promise.all([getDashboard(), getAvisos(), getViajes()])
  dash.value = d
  avisos.value = a.avisos
  viajes.value = v.viajes
  cargando.value = false
})
</script>

<template>
  <div v-if="cargando" class="flex items-center justify-center py-32 text-on-surface-variant gap-2">
    <span class="material-symbols-outlined animate-spin">progress_activity</span>
    Cargando…
  </div>

  <div v-else class="space-y-6">
    <!-- Encabezado -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-headline-lg text-headline-lg text-on-background">Resumen del Sistema</h2>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1">Monitoreo de ingresos, flota y viajes activos.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
          <span class="font-label-md text-label-md text-on-surface">{{ dash.periodo }}</span>
        </div>
        <button class="bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Exportar
        </button>
      </div>
    </div>

    <!-- Cards resumen -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div class="bg-surface-container-lowest border border-surface-variant rounded-xl p-lg shadow-sm flex flex-col justify-between hover:shadow-[0_8px_16px_rgba(3,22,50,0.08)] transition-shadow duration-300">
        <div class="flex items-start justify-between mb-4">
          <div class="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="flex items-center text-secondary font-label-md text-label-md bg-secondary-container/20 px-2 py-1 rounded-full">
            <span class="material-symbols-outlined text-[14px] mr-1">trending_up</span>
            +{{ dash.resumen_general.variacion_ingresos }}%
          </span>
        </div>
        <div>
          <p class="font-body-md text-body-md text-on-surface-variant mb-1">Total Ingresos</p>
          <h3 class="font-display text-display text-on-surface">{{ mxn(dash.resumen_general.ingresos_total) }}</h3>
        </div>
      </div>

      <div class="bg-surface-container-lowest border border-surface-variant rounded-xl p-lg shadow-sm flex flex-col justify-between hover:shadow-[0_8px_16px_rgba(3,22,50,0.08)] transition-shadow duration-300">
        <div class="flex items-start justify-between mb-4">
          <div class="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center text-error">
            <span class="material-symbols-outlined">receipt_long</span>
          </div>
          <span class="flex items-center text-on-surface-variant font-label-md text-label-md bg-surface-container px-2 py-1 rounded-full">
            <span class="material-symbols-outlined text-[14px] mr-1">trending_down</span>
            {{ dash.resumen_general.variacion_egresos }}%
          </span>
        </div>
        <div>
          <p class="font-body-md text-body-md text-on-surface-variant mb-1">Egresos Operativos</p>
          <h3 class="font-display text-display text-on-surface">{{ mxn(dash.resumen_general.egresos_total) }}</h3>
        </div>
      </div>

      <div class="bg-primary border border-primary-container rounded-xl p-lg shadow-[0_8px_16px_rgba(3,22,50,0.15)] flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-32 h-32 bg-primary-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="flex items-start justify-between mb-4 relative z-10">
          <div class="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed">
            <span class="material-symbols-outlined">account_balance_wallet</span>
          </div>
        </div>
        <div class="relative z-10">
          <p class="font-body-md text-body-md text-on-primary-container mb-1">Ganancia Neta</p>
          <h3 class="font-display text-display text-on-primary">{{ mxn(dash.resumen_general.neto_total) }}</h3>
        </div>
      </div>
    </div>

    <!-- Gráfica + avisos -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <!-- Gráfica de barras CSS -->
      <div class="lg:col-span-2 bg-surface-container-lowest border border-surface-variant rounded-xl p-lg shadow-sm flex flex-col">
        <div class="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h3 class="font-headline-md text-headline-md text-on-surface">Ganancia por Camioneta</h3>
          <div class="flex items-center gap-4">
            <div v-for="(c, i) in dash.ganancia_por_camioneta" :key="c.camioneta_id" class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :class="i === 0 ? 'bg-secondary' : 'bg-primary-fixed-dim'"></div>
              <span class="font-label-md text-label-md text-on-surface-variant">{{ c.placa }}</span>
            </div>
          </div>
        </div>
        <div class="flex-1 flex items-end justify-around gap-2 h-48 min-h-[12rem] mt-4 border-b border-outline-variant pb-0 relative">
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div v-for="n in 4" :key="n" class="w-full border-t border-surface-container-high h-0"></div>
          </div>
          <div v-for="(sem, si) in [0, 1, 2, 3]" :key="si" class="flex gap-1 w-1/5 justify-center items-end h-full relative z-10">
            <div
              v-for="(c, ci) in dash.ganancia_por_camioneta"
              :key="c.camioneta_id"
              class="w-6 md:w-8 rounded-t-sm hover:brightness-110 transition-all cursor-pointer"
              :class="ci === 0 ? 'bg-secondary' : 'bg-primary-fixed-dim'"
              :style="{ height: c.semanas[si] + '%' }"
              :title="`${c.placa} · Sem ${si + 1}`"
            ></div>
            <span class="absolute -bottom-7 font-label-md text-label-md text-on-surface-variant">Sem {{ si + 1 }}</span>
          </div>
        </div>
        <div class="h-8"></div>
      </div>

      <!-- Mantenimientos próximos -->
      <div class="bg-surface-container-lowest border border-surface-variant rounded-xl p-lg shadow-sm flex flex-col gap-4">
        <h3 class="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-on-tertiary-container">warning</span>
          Mantenimientos Próximos
        </h3>
        <div
          v-for="m in avisos.mantenimientos_proximamente"
          :key="m.camioneta_id"
          class="rounded-lg p-md flex gap-4 items-start border"
          :class="m.nivel === 'critico' ? 'bg-error-container/30 border-error-container' : 'bg-surface-bright border-outline-variant'"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm"
            :class="m.nivel === 'critico' ? 'bg-surface-container-lowest text-error' : 'bg-surface-container text-on-surface-variant'"
          >
            <span class="material-symbols-outlined">{{ m.nivel === 'critico' ? 'car_repair' : 'build_circle' }}</span>
          </div>
          <div class="min-w-0">
            <div class="flex items-center justify-between gap-2 mb-1">
              <span
                class="font-label-md text-label-md px-2 py-0.5 rounded-full"
                :class="m.nivel === 'critico' ? 'text-error bg-error-container' : 'text-on-surface-variant bg-surface-container'"
              >
                {{ m.nivel === 'critico' ? 'Crítico' : m.nivel === 'alerta' ? 'Alerta' : 'Próximo' }}
              </span>
            </div>
            <h4 class="font-body-lg text-body-lg font-semibold text-on-surface">Unidad {{ m.placa }}</h4>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">{{ m.mensaje }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Viajes recientes -->
    <div class="bg-surface-container-lowest border border-surface-variant rounded-xl shadow-sm overflow-hidden">
      <div class="p-lg border-b border-surface-variant flex justify-between items-center bg-surface-bright">
        <h3 class="font-headline-md text-headline-md text-on-surface">Viajes Recientes</h3>
        <router-link
          to="/admin/viajes"
          class="text-primary font-label-md text-label-md hover:bg-primary-fixed/20 px-3 py-1.5 rounded-md transition-colors"
        >
          Ver todos
        </router-link>
      </div>
      <div class="overflow-x-auto admin-scroll">
        <table class="w-full text-left min-w-[800px]">
          <thead>
            <tr class="bg-surface-container-low border-b border-surface-variant">
              <th class="p-md font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Cliente</th>
              <th class="p-md font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Camioneta</th>
              <th class="p-md font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Fecha</th>
              <th class="p-md font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Estado</th>
              <th class="p-md font-label-md text-label-md text-on-surface-variant tracking-wider uppercase text-right">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-variant font-body-md text-body-md">
            <tr v-for="v in viajesRecientes" :key="v.id" class="hover:bg-surface-container-low transition-colors">
              <td class="p-md">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-bold">
                    {{ initials(v.cliente_nombre) }}
                  </div>
                  <span class="text-on-surface font-medium">{{ v.cliente_nombre }}</span>
                </div>
              </td>
              <td class="p-md text-on-surface-variant">{{ v.camioneta_placa }}</td>
              <td class="p-md text-on-surface-variant">{{ fecha(v.fecha_inicio) }}</td>
              <td class="p-md"><StatusBadge :estado="v.estado" /></td>
              <td class="p-md text-right text-on-surface font-medium">{{ mxn(v.costo_total) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
