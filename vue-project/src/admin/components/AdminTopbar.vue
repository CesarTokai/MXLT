<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSession, logout } from '../auth'

defineEmits(['toggle-sidebar'])

const router = useRouter()
const session = getSession()
const menuOpen = ref(false)

function initials(nombre) {
  return (nombre || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function salir() {
  logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header
    class="h-16 fixed top-0 right-0 left-0 md:left-64 bg-surface border-b border-outline-variant shadow-sm z-30 flex justify-between items-center px-gutter"
  >
    <div class="flex items-center gap-4">
      <button
        class="md:hidden p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
        @click="$emit('toggle-sidebar')"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>
      <div class="relative hidden lg:flex items-center">
        <span class="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span>
        <input
          type="text"
          placeholder="Buscar..."
          class="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all"
        />
      </div>
      <span class="font-headline-md text-headline-md text-primary font-bold lg:hidden">Mexico Lindo Tours</span>
    </div>

    <div class="flex items-center gap-2">
      <button class="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 scale-95 active:scale-90 transition-transform relative">
        <span class="material-symbols-outlined">notifications</span>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
      </button>
      <button class="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 scale-95 active:scale-90 transition-transform hidden sm:block">
        <span class="material-symbols-outlined">help</span>
      </button>
      <div class="w-px h-6 bg-outline-variant mx-2 hidden sm:block"></div>

      <div class="relative">
        <button
          class="flex items-center gap-2 hover:bg-surface-container-high p-1 pr-3 rounded-full transition-colors"
          @click="menuOpen = !menuOpen"
        >
          <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-bold">
            {{ initials(session?.usuario?.nombre) }}
          </div>
          <span class="font-label-md text-label-md text-on-surface hidden sm:block">{{ session?.usuario?.nombre || 'Admin' }}</span>
          <span class="material-symbols-outlined text-[16px] text-on-surface-variant hidden sm:block">expand_more</span>
        </button>

        <div
          v-if="menuOpen"
          class="absolute right-0 top-12 w-56 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl py-2 z-50"
        >
          <div class="px-4 py-2 border-b border-outline-variant">
            <p class="font-body-md text-body-md font-semibold text-on-surface">{{ session?.usuario?.nombre }}</p>
            <p class="text-xs text-on-surface-variant">{{ session?.usuario?.email }} · {{ session?.usuario?.rol }}</p>
          </div>
          <button
            class="w-full text-left px-4 py-2.5 font-body-md text-body-md text-error hover:bg-surface-container-low flex items-center gap-2 transition-colors"
            @click="salir"
          >
            <span class="material-symbols-outlined text-[18px]">logout</span>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
