<script setup>
import { ref, computed, onMounted } from 'vue'
import { getViajes } from '../services/api'
import StatusBadge from '../components/StatusBadge.vue'

const viajes = ref([])
const cargando = ref(true)

const filtroEstado = ref('all')
const filtroDesde = ref('')
const filtroHasta = ref('')
const pagina = ref(1)
const porPagina = 6

const filtrados = computed(() =>
  viajes.value.filter((v) => {
    if (filtroEstado.value !== 'all' && v.estado !== filtroEstado.value) return false
    if (filtroDesde.value && v.fecha_inicio < filtroDesde.value) return false
    if (filtroHasta.value && v.fecha_inicio > filtroHasta.value) return false
    return true
  })
)

const totalPaginas = computed(() => Math.max(1, Math.ceil(filtrados.value.length / porPagina)))
const paginaViajes = computed(() => filtrados.value.slice((pagina.value - 1) * porPagina, pagina.value * porPagina))

function aplicar() {
  pagina.value = 1
}

const mxn = (n) => '$' + Number(n).toLocaleString('es-MX', { minimumFractionDigits: 2 })
function fecha(d) {
  if (!d) return '—'
  return new Date(d + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
}
function initials(nombre) {
  return (nombre || '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

onMounted(async () => {
  viajes.value = (await getViajes()).viajes
  cargando.value = false
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 class="font-headline-lg text-headline-lg text-primary font-bold">Gestión de Viajes</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-1">Monitorea y administra la logística de todos los tours.</p>
      </div>
      <button class="bg-secondary text-on-secondary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors shadow-sm flex items-center gap-2 w-full md:w-auto justify-center">
        <span class="material-symbols-outlined">add</span>
        Nuevo Viaje
      </button>
    </div>

    <!-- Filtros -->
    <div class="bg-surface rounded-xl border border-outline-variant p-4 md:p-6 shadow-[0_2px_4px_rgba(26,43,72,0.05)]">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div class="flex flex-col gap-2">
          <label class="font-label-md text-label-md text-on-surface-variant">Estado</label>
          <select
            v-model="filtroEstado"
            class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="apartado">Apartado</option>
            <option value="en_curso">En curso</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-label-md text-label-md text-on-surface-variant">Fecha Inicio</label>
          <input
            v-model="filtroDesde"
            type="date"
            class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-label-md text-label-md text-on-surface-variant">Fecha Fin</label>
          <input
            v-model="filtroHasta"
            type="date"
            class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <button
          class="w-full border-2 border-primary text-primary font-label-md text-label-md px-6 py-2.5 rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2"
          @click="aplicar"
        >
          <span class="material-symbols-outlined text-[16px]">filter_list</span>
          Aplicar Filtros
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-surface rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(26,43,72,0.05)] overflow-hidden">
      <div class="overflow-x-auto admin-scroll">
        <table class="w-full text-left min-w-[860px]">
          <thead>
            <tr class="bg-surface-container-low border-b border-outline-variant">
              <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">ID Viaje</th>
              <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Cliente</th>
              <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Fechas</th>
              <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Placa / Chofer</th>
              <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Estado</th>
              <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant font-body-md text-body-md text-on-surface">
            <tr v-if="cargando">
              <td colspan="6" class="py-12 text-center text-on-surface-variant">Cargando…</td>
            </tr>
            <tr v-else-if="!paginaViajes.length">
              <td colspan="6" class="py-12 text-center text-on-surface-variant">Sin viajes con esos filtros.</td>
            </tr>
            <tr v-for="v in paginaViajes" :key="v.id" class="hover:bg-surface-container-low transition-colors">
              <td class="py-4 px-6 font-semibold text-primary">#VJ-{{ v.id }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold text-xs">
                    {{ initials(v.cliente_nombre) }}
                  </div>
                  <div>
                    <p class="font-medium">{{ v.cliente_nombre }}</p>
                    <p class="text-xs text-on-surface-variant">{{ v.notas || '—' }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2 text-sm">
                    <span class="material-symbols-outlined text-[16px] text-on-surface-variant">flight_takeoff</span>
                    {{ fecha(v.fecha_inicio) }}
                  </div>
                  <div class="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span class="material-symbols-outlined text-[16px]">flight_land</span>
                    {{ fecha(v.fecha_fin) }}
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex flex-col gap-1">
                  <span class="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-xs font-mono font-medium text-on-surface border border-outline-variant w-fit">
                    <span class="material-symbols-outlined text-[14px]">directions_bus</span>
                    {{ v.camioneta_placa }}
                  </span>
                  <span v-if="v.chofer_nombre" class="text-sm">{{ v.chofer_nombre }}</span>
                  <span v-else class="text-sm text-on-surface-variant italic">Asignación pendiente</span>
                </div>
              </td>
              <td class="py-4 px-6"><StatusBadge :estado="v.estado" /></td>
              <td class="py-4 px-6 text-right font-medium">{{ mxn(v.costo_total) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between flex-wrap gap-3">
        <span class="font-body-md text-sm text-on-surface-variant">
          Mostrando {{ filtrados.length ? (pagina - 1) * porPagina + 1 : 0 }} a
          {{ Math.min(pagina * porPagina, filtrados.length) }} de {{ filtrados.length }} viajes
        </span>
        <div class="flex gap-2">
          <button
            class="w-8 h-8 rounded flex items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50"
            :disabled="pagina === 1"
            @click="pagina--"
          >
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button
            v-for="p in totalPaginas"
            :key="p"
            class="w-8 h-8 rounded flex items-center justify-center font-label-md text-label-md"
            :class="p === pagina ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface hover:bg-surface-container'"
            @click="pagina = p"
          >
            {{ p }}
          </button>
          <button
            class="w-8 h-8 rounded flex items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50"
            :disabled="pagina === totalPaginas"
            @click="pagina++"
          >
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
