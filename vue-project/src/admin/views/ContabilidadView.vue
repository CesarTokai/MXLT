<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTotales } from '../services/api'

const totales = ref(null)
const cargando = ref(true)

const mxn = (n) => '$' + Number(n).toLocaleString('es-MX')

const pctIngresos = computed(() => {
  const t = totales.value
  const total = t.ingresos.total_viajes + t.egresos.total
  return Math.round((t.ingresos.total_viajes / total) * 100)
})

const desglose = computed(() => {
  const e = totales.value.egresos
  return [
    { icon: 'route', nombre: 'Gastos de Viajes', monto: e.gastos_viajes, desc: 'Casetas, combustible en ruta, viáticos de chofer.' },
    { icon: 'directions_bus', nombre: 'Mantenimiento Flota', monto: e.gastos_camionetas, desc: 'Servicios, llantas, refacciones, lavado.' },
    { icon: 'domain', nombre: 'Gastos Generales', monto: e.gastos_generales, desc: 'Oficina, seguros, nómina administrativa.' }
  ].map((c) => ({ ...c, pct: Math.round((c.monto / e.total) * 100) }))
})

const sumas = computed(() =>
  totales.value.detalle_camionetas.reduce(
    (a, c) => ({
      ingresos: a.ingresos + c.ingresos,
      ruta: a.ruta + c.gastos_ruta,
      mant: a.mant + c.mantenimiento,
      neto: a.neto + c.neto
    }),
    { ingresos: 0, ruta: 0, mant: 0, neto: 0 }
  )
)

onMounted(async () => {
  totales.value = await getTotales()
  cargando.value = false
})
</script>

<template>
  <div v-if="cargando" class="flex items-center justify-center py-32 text-on-surface-variant gap-2">
    <span class="material-symbols-outlined animate-spin">progress_activity</span>
    Cargando…
  </div>

  <div v-else class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-display text-on-surface">Contabilidad</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-1">Resumen Financiero • {{ totales.periodo }}</p>
      </div>
      <button class="bg-primary text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center">
        <span class="material-symbols-outlined text-[18px]">download</span>
        Exportar Reporte
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Columna izquierda -->
      <div class="lg:col-span-1 flex flex-col gap-6">
        <div class="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div class="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full opacity-20 -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined fill text-secondary">account_balance</span>
            Utilidad Neta
          </h3>
          <div class="font-display text-[42px] leading-tight font-bold text-primary mt-4 mb-1">{{ mxn(totales.neto) }} MXN</div>
          <div class="mt-6 h-2 w-full bg-error-container rounded-full overflow-hidden flex">
            <div class="bg-secondary h-full" :style="{ width: pctIngresos + '%' }"></div>
            <div class="bg-error h-full" :style="{ width: 100 - pctIngresos + '%' }"></div>
          </div>
          <div class="flex justify-between mt-2 font-label-md text-label-md">
            <span class="text-secondary">Ingresos ({{ pctIngresos }}%)</span>
            <span class="text-error">Egresos ({{ 100 - pctIngresos }}%)</span>
          </div>
        </div>

        <div class="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm flex-1">
          <h4 class="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant pb-4">Resumen General</h4>
          <div class="flex justify-between items-center mb-4 p-3 bg-surface-container-low rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span class="material-symbols-outlined text-secondary text-[16px]">arrow_upward</span>
              </div>
              <span class="font-body-lg text-body-lg text-on-surface">Total Ingresos</span>
            </div>
            <span class="font-headline-md text-headline-md text-secondary">{{ mxn(totales.ingresos.total_viajes) }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-error-container/30 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-error-container flex items-center justify-center">
                <span class="material-symbols-outlined text-error text-[16px]">arrow_downward</span>
              </div>
              <span class="font-body-lg text-body-lg text-on-surface">Total Egresos</span>
            </div>
            <span class="font-headline-md text-headline-md text-error">-{{ mxn(totales.egresos.total) }}</span>
          </div>
        </div>
      </div>

      <!-- Desglose egresos -->
      <div class="lg:col-span-2">
        <div class="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm h-full">
          <h3 class="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-on-primary-fixed-variant">local_activity</span>
            Desglose de Egresos
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="c in desglose"
              :key="c.nombre"
              class="p-4 border border-outline-variant rounded-lg hover:border-primary transition-colors group cursor-pointer bg-surface-bright"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span class="material-symbols-outlined text-primary group-hover:text-on-primary">{{ c.icon }}</span>
                </div>
                <span class="text-error font-label-md text-label-md bg-error-container px-2 py-1 rounded-full">{{ c.pct }}%</span>
              </div>
              <h4 class="font-body-lg text-body-lg text-on-surface-variant mt-2">{{ c.nombre }}</h4>
              <div class="font-headline-lg text-headline-lg text-on-surface mt-1">-{{ mxn(c.monto) }}</div>
              <p class="font-body-md text-sm text-outline mt-2">{{ c.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detalle por camioneta -->
    <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div class="p-6 border-b border-outline-variant flex justify-between items-center">
        <h3 class="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">airport_shuttle</span>
          Detalle por Camioneta
        </h3>
      </div>
      <div class="overflow-x-auto admin-scroll">
        <table class="w-full text-left min-w-[860px]">
          <thead>
            <tr class="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-outline-variant">
              <th class="p-4 pl-6 font-semibold">Unidad</th>
              <th class="p-4 font-semibold">Viajes Realizados</th>
              <th class="p-4 font-semibold">Ingresos Brutos</th>
              <th class="p-4 font-semibold text-error">Gastos (Gas, Casetas)</th>
              <th class="p-4 font-semibold text-error">Mantenimiento</th>
              <th class="p-4 pr-6 font-semibold text-right text-secondary">Utilidad Neta</th>
            </tr>
          </thead>
          <tbody class="font-body-md text-body-md divide-y divide-outline-variant">
            <tr v-for="d in totales.detalle_camionetas" :key="d.camioneta_id" class="hover:bg-surface-container-low/50 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-primary-container rounded flex items-center justify-center text-on-primary font-label-md text-label-md">
                    {{ String(d.camioneta_id).padStart(2, '0') }}
                  </div>
                  <span class="font-semibold text-on-surface">{{ d.placa }}</span>
                </div>
              </td>
              <td class="p-4 text-on-surface-variant">{{ d.viajes }}</td>
              <td class="p-4 text-on-surface">{{ mxn(d.ingresos) }}</td>
              <td class="p-4 text-error">-{{ mxn(d.gastos_ruta) }}</td>
              <td class="p-4 text-error">-{{ mxn(d.mantenimiento) }}</td>
              <td class="p-4 pr-6 text-right font-headline-md text-headline-md text-secondary">{{ mxn(d.neto) }}</td>
            </tr>
          </tbody>
          <tfoot class="bg-surface-container-low border-t-2 border-outline-variant font-headline-md text-headline-md">
            <tr>
              <td class="p-4 pl-6 text-on-surface" colspan="2">Totales Flota</td>
              <td class="p-4 text-primary">{{ mxn(sumas.ingresos) }}</td>
              <td class="p-4 text-error">-{{ mxn(sumas.ruta) }}</td>
              <td class="p-4 text-error">-{{ mxn(sumas.mant) }}</td>
              <td class="p-4 pr-6 text-right text-secondary">{{ mxn(sumas.neto) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
