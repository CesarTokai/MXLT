<script setup>
import { ref } from 'vue'
import AdminSidebar from './components/AdminSidebar.vue'
import AdminTopbar from './components/AdminTopbar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="admin-root font-body-md text-body-md antialiased">
    <AdminSidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    <AdminTopbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <main class="md:ml-64 pt-16 min-h-screen bg-background">
      <div class="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>
