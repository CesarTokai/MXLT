<script setup>
import { ref, computed, onMounted } from 'vue'
import { getClientes } from '../services/api'
import StatusBadge from '../components/StatusBadge.vue'

const clientes = ref([])
const cargando = ref(true)
const busqueda = ref('')

const filtrados = computed(() => {
  const q = busqueda.value.toLowerCase()
  if (!q) return clientes.value
  return clientes.value.filter((c) => `${c.nombre} ${c.email} ${c.telefono}`.toLowerCase().includes(q))
})

const stats = computed(() => ({
  total: clientes.value.length,
  nuevos: clientes.value.filter((c) => c.creado_en >= '2026-07-01').length,
  frecuentes: clientes.value.filter((c) => c.total_viajes >= 10).length
}))

onMounted(async () => {
  clientes.value = (await getClientes()).clientes
  cargando.value = false
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-display text-primary">Directorio de Clientes</h2>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1">Gestiona la información y el historial de tus clientes.</p>
      </div>
      <button class="bg-secondary text-on-secondary font-label-md text-label-md px-6 py-3 rounded-lg shadow-sm hover:bg-secondary/90 transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
        <span class="material-symbols-outlined">person_add</span>
        Registrar Cliente
      </button>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-primary-container/10 rounded-lg text-primary">
            <span class="material-symbols-outlined">groups</span>
          </div>
          <span class="font-label-md text-label-md text-on-surface-variant">Total de Clientes</span>
        </div>
        <div class="font-display text-display text-primary">{{ stats.total }}</div>
      </div>
      <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-secondary-container/20 rounded-lg text-secondary">
            <span class="material-symbols-outlined">person_add</span>
          </div>
          <span class="font-label-md text-label-md text-on-surface-variant">Nuevos (Este Mes)</span>
        </div>
        <div class="font-display text-display text-primary">+{{ stats.nuevos }}</div>
      </div>
      <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-tertiary-fixed/50 rounded-lg text-on-tertiary-container">
            <span class="material-symbols-outlined">star</span>
          </div>
          <span class="font-label-md text-label-md text-on-surface-variant">Clientes Frecuentes</span>
        </div>
        <div class="font-display text-display text-primary">{{ stats.frecuentes }}</div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden">
      <div class="p-lg border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="relative w-full sm:w-96">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre, correo o teléfono..."
            class="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-transparent rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
          />
        </div>
      </div>

      <div class="overflow-x-auto admin-scroll">
        <table class="w-full text-left min-w-[760px]">
          <thead class="bg-surface-container-low border-b border-outline-variant/30">
            <tr>
              <th class="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-semibold">Nombre</th>
              <th class="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-semibold">Teléfono</th>
              <th class="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-semibold">Email</th>
              <th class="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-semibold">Viajes Realizados</th>
              <th class="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20 font-body-md text-body-md text-on-surface">
            <tr v-if="cargando">
              <td colspan="5" class="py-12 text-center text-on-surface-variant">Cargando…</td>
            </tr>
            <tr v-else-if="!filtrados.length">
              <td colspan="5" class="py-12 text-center text-on-surface-variant">Sin resultados para "{{ busqueda }}".</td>
            </tr>
            <tr v-for="c in filtrados" :key="c.id" class="hover:bg-surface-container-low/50 transition-colors">
              <td class="px-6 py-4 font-semibold text-primary">{{ c.nombre }}</td>
              <td class="px-6 py-4">{{ c.telefono }}</td>
              <td class="px-6 py-4 text-on-surface-variant">{{ c.email }}</td>
              <td class="px-6 py-4">{{ c.total_viajes }}</td>
              <td class="px-6 py-4"><StatusBadge :estado="c.estado" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-lg py-4 border-t border-outline-variant/30 bg-surface-container-lowest">
        <span class="font-body-md text-body-md text-on-surface-variant">Mostrando {{ filtrados.length }} de {{ clientes.length }} clientes</span>
      </div>
    </div>
  </div>
</template>
