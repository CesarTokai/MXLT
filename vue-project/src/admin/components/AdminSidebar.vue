<script setup>
defineProps({ open: { type: Boolean, default: false } })
defineEmits(['close'])

const items = [
  { name: 'dashboard', label: 'Dashboard', icon: 'dashboard', to: '/admin' },
  { name: 'viajes', label: 'Viajes', icon: 'route', to: '/admin/viajes' },
  { name: 'flota', label: 'Flota', icon: 'directions_bus', to: '/admin/flota' },
  { name: 'choferes', label: 'Choferes', icon: 'person_pin', to: '/admin/choferes' },
  { name: 'clientes', label: 'Clientes', icon: 'groups', to: '/admin/clientes' },
  { name: 'calendario', label: 'Calendario', icon: 'calendar_month', to: '/admin/calendario' },
  { name: 'contabilidad', label: 'Contabilidad', icon: 'payments', to: '/admin/contabilidad' }
]
</script>

<template>
  <!-- Overlay móvil -->
  <div
    v-if="open"
    class="fixed inset-0 bg-primary/40 z-40 md:hidden"
    @click="$emit('close')"
  ></div>

  <nav
    class="h-screen w-64 fixed left-0 top-0 bg-primary shadow-xl z-50 flex-col py-6 transition-transform duration-200 ease-in-out flex"
    :class="open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <div class="px-6 mb-8 flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined fill text-on-secondary">directions_bus</span>
      </div>
      <div>
        <h1 class="font-headline-md text-headline-md font-bold text-on-primary">Mexico Lindo</h1>
        <p class="font-label-md text-label-md text-on-primary/70">Admin Console</p>
      </div>
    </div>

    <div class="px-4 mb-6">
      <button
        class="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
      >
        <span class="material-symbols-outlined text-[18px]">add</span>
        Nuevo Viaje
      </button>
    </div>

    <ul class="flex-1 flex flex-col gap-1 overflow-y-auto">
      <li v-for="item in items" :key="item.name">
        <router-link
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 font-body-md text-body-md transition-all duration-200 ease-in-out"
          :class="
            $route.name === item.name
              ? 'bg-secondary-container/10 border-l-4 border-secondary text-secondary-fixed font-semibold'
              : 'text-on-primary/80 hover:text-on-primary hover:bg-primary-container'
          "
          @click="$emit('close')"
        >
          <span class="material-symbols-outlined" :class="{ fill: $route.name === item.name }">{{ item.icon }}</span>
          {{ item.label }}
        </router-link>
      </li>
    </ul>

    <div class="mt-auto pt-4 border-t border-primary-container">
      <router-link
        to="/admin/configuracion"
        class="flex items-center gap-3 px-4 py-3 font-body-md text-body-md transition-all duration-200 ease-in-out"
        :class="
          $route.name === 'configuracion'
            ? 'bg-secondary-container/10 border-l-4 border-secondary text-secondary-fixed font-semibold'
            : 'text-on-primary/80 hover:text-on-primary hover:bg-primary-container'
        "
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined" :class="{ fill: $route.name === 'configuracion' }">settings</span>
        Configuración
      </router-link>
    </div>
  </nav>
</template>
