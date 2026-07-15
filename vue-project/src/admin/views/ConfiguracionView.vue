<script setup>
import { ref, computed, onMounted } from 'vue'
import { getUsuarios, getEmpresa } from '../services/api'

const usuarios = ref([])
const empresa = ref({ nombre: '', moneda: 'MXN', zona_horaria: 'America/Mexico_City' })
const cargando = ref(true)
const busqueda = ref('')
const guardado = ref(false)

const filtrados = computed(() => {
  const q = busqueda.value.toLowerCase()
  if (!q) return usuarios.value
  return usuarios.value.filter((u) => `${u.nombre} ${u.email}`.toLowerCase().includes(q))
})

function initials(nombre) {
  return nombre.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

function guardar() {
  // Simulado: solo feedback visual
  guardado.value = true
  setTimeout(() => (guardado.value = false), 2000)
}

onMounted(async () => {
  const [u, e] = await Promise.all([getUsuarios(), getEmpresa()])
  usuarios.value = u.usuarios
  empresa.value = e
  cargando.value = false
})
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="font-headline-lg text-headline-lg text-primary">Configuración del Sistema</h2>
        <p class="text-on-surface-variant mt-1 font-body-lg text-body-lg">Gestiona los ajustes generales y el acceso de usuarios.</p>
      </div>
      <button
        class="font-label-md text-label-md py-2 px-6 rounded-lg transition-colors shadow-sm flex items-center gap-2 w-full md:w-auto justify-center"
        :class="guardado ? 'bg-secondary-container text-on-secondary-container' : 'bg-secondary text-on-secondary hover:bg-secondary/90'"
        @click="guardar"
      >
        <span class="material-symbols-outlined">{{ guardado ? 'check' : 'save' }}</span>
        {{ guardado ? 'Guardado' : 'Guardar Cambios' }}
      </button>
    </div>

    <div v-if="cargando" class="flex items-center justify-center py-32 text-on-surface-variant gap-2">
      <span class="material-symbols-outlined animate-spin">progress_activity</span>
      Cargando…
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Ajustes empresa -->
      <div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm lg:col-span-1 flex flex-col">
        <div class="flex items-center gap-3 mb-6">
          <span class="material-symbols-outlined text-primary bg-primary-container/10 p-2 rounded-lg">domain</span>
          <h3 class="font-headline-md text-headline-md text-primary">Ajustes de Empresa</h3>
        </div>
        <div class="space-y-5 flex-1">
          <div class="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg p-6 bg-surface hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div class="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-on-primary-container">image</span>
            </div>
            <span class="font-label-md text-label-md text-primary">Subir Nuevo Logo</span>
            <span class="text-xs text-on-surface-variant mt-1">PNG o JPG (Max 2MB)</span>
          </div>
          <div>
            <label class="block font-label-md text-label-md text-primary mb-2">Nombre de la Empresa</label>
            <input
              v-model="empresa.nombre"
              type="text"
              class="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md"
            />
          </div>
          <div>
            <label class="block font-label-md text-label-md text-primary mb-2">Moneda Principal</label>
            <select
              v-model="empresa.moneda"
              class="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md"
            >
              <option value="MXN">MXN - Peso Mexicano</option>
              <option value="USD">USD - Dólar Estadounidense</option>
            </select>
          </div>
          <div>
            <label class="block font-label-md text-label-md text-primary mb-2">Zona Horaria</label>
            <select
              v-model="empresa.zona_horaria"
              class="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md"
            >
              <option value="America/Mexico_City">America/Mexico_City (GMT-6)</option>
              <option value="America/Cancun">America/Cancun (EST)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Gestión de usuarios -->
      <div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm lg:col-span-2 flex flex-col">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary bg-primary-container/10 p-2 rounded-lg">manage_accounts</span>
            <h3 class="font-headline-md text-headline-md text-primary">Gestión de Usuarios</h3>
          </div>
          <button class="text-primary border border-primary hover:bg-primary hover:text-on-primary font-label-md text-label-md py-2 px-4 rounded-lg transition-colors flex items-center gap-2 justify-center">
            <span class="material-symbols-outlined">person_add</span>
            Nuevo Usuario
          </button>
        </div>

        <div class="relative mb-4">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre o email..."
            class="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md"
          />
        </div>

        <div class="flex-1 overflow-x-auto admin-scroll rounded-lg border border-outline-variant">
          <table class="w-full min-w-[600px] text-left">
            <thead>
              <tr class="bg-surface-container-low border-b border-outline-variant">
                <th class="py-3 px-4 font-label-md text-label-md text-primary">Usuario</th>
                <th class="py-3 px-4 font-label-md text-label-md text-primary">Rol</th>
                <th class="py-3 px-4 font-label-md text-label-md text-primary">Estado</th>
                <th class="py-3 px-4 font-label-md text-label-md text-primary text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant font-body-md text-body-md">
              <tr
                v-for="u in filtrados"
                :key="u.id"
                class="hover:bg-surface-container-low/50 transition-colors group"
                :class="{ 'opacity-60': !u.activo }"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                      :class="u.rol === 'ADMIN' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-dim text-on-surface-variant'"
                    >
                      {{ initials(u.nombre) }}
                    </div>
                    <div>
                      <p class="font-semibold text-on-surface">{{ u.nombre }}</p>
                      <p class="text-on-surface-variant text-sm">{{ u.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    :class="u.rol === 'ADMIN' ? 'bg-primary-container/10 text-primary' : 'bg-surface-variant text-on-surface-variant'"
                  >
                    <span class="material-symbols-outlined text-[14px]">{{ u.rol === 'ADMIN' ? 'shield_person' : 'manage_accounts' }}</span>
                    {{ u.rol }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    :class="u.activo ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-variant text-on-surface-variant'"
                  >
                    <span class="w-2 h-2 rounded-full" :class="u.activo ? 'bg-secondary' : 'bg-outline'"></span>
                    {{ u.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="text-outline hover:text-primary p-1 rounded transition-colors" title="Editar">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      class="text-outline p-1 rounded transition-colors"
                      :class="u.activo ? 'hover:text-error' : 'hover:text-primary'"
                      :title="u.activo ? 'Desactivar' : 'Restaurar'"
                      @click="u.activo = !u.activo"
                    >
                      <span class="material-symbols-outlined">{{ u.activo ? 'delete' : 'restore' }}</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
