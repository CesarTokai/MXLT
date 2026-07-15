<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../auth'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value.trim(), password.value)
    router.push(route.query.redirect || { name: 'dashboard' })
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="admin-root min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Decoración de fondo -->
    <div class="absolute -top-32 -right-32 w-96 h-96 bg-primary-container rounded-full opacity-50 blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-3xl"></div>

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 shadow-xl">
          <span class="material-symbols-outlined fill text-on-secondary text-3xl">directions_bus</span>
        </div>
        <h1 class="font-headline-lg text-headline-lg font-bold text-on-primary">Mexico Lindo Tours</h1>
        <p class="font-body-md text-body-md text-on-primary-container mt-1">Consola de Administración</p>
      </div>

      <form
        class="bg-surface-container-lowest rounded-xl shadow-2xl p-6 md:p-8 space-y-5"
        @submit.prevent="submit"
      >
        <h2 class="font-headline-md text-headline-md text-primary">Iniciar sesión</h2>

        <div
          v-if="error"
          class="bg-error-container/50 border border-error-container text-on-error-container rounded-lg px-4 py-3 font-body-md text-body-md flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">error</span>
          {{ error }}
        </div>

        <div>
          <label class="block font-label-md text-label-md text-primary mb-2" for="email">Correo electrónico</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              autocomplete="username"
              placeholder="usuario@mexicolindo.com"
              class="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md"
            />
          </div>
        </div>

        <div>
          <label class="block font-label-md text-label-md text-primary mb-2" for="password">Contraseña</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-60 text-on-secondary font-label-md text-label-md py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">{{ loading ? 'progress_activity' : 'login' }}</span>
          {{ loading ? 'Entrando…' : 'Entrar' }}
        </button>

        <p class="text-xs text-on-surface-variant text-center border-t border-outline-variant pt-4">
          Demo: <span class="font-mono">admin@mexicolindo.com</span> / <span class="font-mono">admin123</span>
        </p>
      </form>

      <router-link
        to="/"
        class="mt-6 flex items-center justify-center gap-1 text-on-primary-container hover:text-on-primary font-label-md text-label-md transition-colors"
      >
        <span class="material-symbols-outlined text-[16px]">arrow_back</span>
        Volver al sitio público
      </router-link>
    </div>
  </div>
</template>
