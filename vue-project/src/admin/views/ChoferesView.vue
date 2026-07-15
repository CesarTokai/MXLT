<script setup>
import { ref, computed, onMounted } from 'vue'
import { getChoferes, getViajes } from '../services/api'
import StatusBadge from '../components/StatusBadge.vue'

const choferes = ref([])
const viajes = ref([])
const cargando = ref(true)
const busqueda = ref('')
const filtro = ref('todos') // todos | activos | alertas

const HOY = new Date('2026-07-15')

function diasParaVencer(fecha) {
  return Math.round((new Date(fecha + 'T00:00:00') - HOY) / 86400000)
}

const enriquecidos = computed(() =>
  choferes.value.map((c) => ({
    ...c,
    dias: diasParaVencer(c.licencia_vencimiento),
    alerta: diasParaVencer(c.licencia_vencimiento) <= 30
  }))
)

const filtrados = computed(() =>
  enriquecidos.value.filter((c) => {
    if (filtro.value === 'activos' && c.estado !== 'activo') return false
    if (filtro.value === 'alertas' && !c.alerta) return false
    const q = busqueda.value.toLowerCase()
    if (q && !`${c.nombre} ${c.licencia_numero} ${c.telefono}`.toLowerCase().includes(q)) return false
    return true
  })
)

const stats = computed(() => ({
  activos: enriquecidos.value.filter((c) => c.estado === 'activo').length,
  porVencer: enriquecidos.value.filter((c) => c.alerta).length,
  enRuta: viajes.value.filter((v) => v.estado === 'en_curso' && v.chofer_id).length
}))

function fecha(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}
function initials(nombre) {
  return nombre.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

onMounted(async () => {
  const [c, v] = await Promise.all([getChoferes(), getViajes()])
  choferes.value = c.choferes
  viajes.value = v.viajes
  cargando.value = false
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-display text-primary tracking-tight">Directorio de Choferes</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-1">Gestión operativa y estado de documentación de operadores.</p>
      </div>
      <button class="px-5 py-2.5 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto justify-center">
        <span class="material-symbols-outlined text-[16px]">person_add</span>
        Nuevo Chofer
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Activos</p>
            <p class="font-display text-display text-primary mt-2">{{ stats.activos }}</p>
          </div>
          <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
            <span class="material-symbols-outlined">badge</span>
          </div>
        </div>
      </div>
      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Licencias por Vencer</p>
            <p class="font-display text-display text-primary mt-2">{{ stats.porVencer }}</p>
          </div>
          <div class="p-3 bg-error-container rounded-lg text-on-error-container">
            <span class="material-symbols-outlined">warning</span>
          </div>
        </div>
        <p class="font-body-md text-body-md text-error mt-4 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">info</span>
          Próximos 30 días
        </p>
      </div>
      <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">En Ruta Actualmente</p>
            <p class="font-display text-display text-primary mt-2">{{ stats.enRuta }}</p>
          </div>
          <div class="p-3 bg-primary-container rounded-lg text-on-primary-container">
            <span class="material-symbols-outlined">route</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div class="p-lg border-b border-outline-variant bg-surface flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="relative w-full sm:w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre, licencia o teléfono..."
            class="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-md text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
          />
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            v-for="f in [
              { v: 'todos', l: 'Todos' },
              { v: 'activos', l: 'Activos' },
              { v: 'alertas', l: 'Con Alertas' }
            ]"
            :key="f.v"
            class="px-3 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors"
            :class="filtro === f.v ? 'bg-secondary-container text-on-secondary-container' : 'hover:bg-surface-container-low text-on-surface-variant'"
            @click="filtro = f.v"
          >
            {{ f.l }}
          </button>
        </div>
      </div>

      <div class="overflow-x-auto admin-scroll">
        <table class="w-full text-left min-w-[820px]">
          <thead>
            <tr class="bg-surface-container-low border-b border-outline-variant">
              <th class="py-3 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Chofer</th>
              <th class="py-3 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Contacto</th>
              <th class="py-3 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Licencia Federal</th>
              <th class="py-3 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Vencimiento</th>
              <th class="py-3 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant font-body-md text-body-md bg-surface-container-lowest">
            <tr v-if="cargando">
              <td colspan="5" class="py-12 text-center text-on-surface-variant">Cargando…</td>
            </tr>
            <tr
              v-for="c in filtrados"
              :key="c.id"
              class="transition-colors"
              :class="[c.alerta ? 'bg-error-container/5 hover:bg-error-container/10' : 'hover:bg-surface-container-low/50', c.estado === 'inactivo' ? 'opacity-60' : '']"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    {{ initials(c.nombre) }}
                  </div>
                  <div>
                    <p class="font-semibold text-on-surface">{{ c.nombre }}</p>
                    <p class="text-on-surface-variant text-xs">ID: ML-{{ String(c.id).padStart(3, '0') }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-on-surface-variant">{{ c.telefono }}</td>
              <td class="py-4 px-6 font-mono text-sm text-on-surface">{{ c.licencia_numero }}</td>
              <td class="py-4 px-6">
                <div v-if="c.alerta" class="flex items-center gap-2 text-error font-medium">
                  <span class="material-symbols-outlined text-sm">warning</span>
                  {{ fecha(c.licencia_vencimiento) }}
                </div>
                <span v-else class="text-on-surface">{{ fecha(c.licencia_vencimiento) }}</span>
              </td>
              <td class="py-4 px-6"><StatusBadge :estado="c.estado" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 border-t border-outline-variant bg-surface-container-lowest">
        <span class="font-body-md text-sm text-on-surface-variant">Mostrando {{ filtrados.length }} de {{ choferes.length }} choferes</span>
      </div>
    </div>
  </div>
</template>
