import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../admin/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: () => import('../views/LandingView.vue') },
    { path: '/admin/login', name: 'login', component: () => import('../admin/views/LoginView.vue') },
    {
      path: '/admin',
      component: () => import('../admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: () => import('../admin/views/DashboardView.vue') },
        { path: 'viajes', name: 'viajes', component: () => import('../admin/views/ViajesView.vue') },
        { path: 'flota', name: 'flota', component: () => import('../admin/views/FlotaView.vue') },
        { path: 'choferes', name: 'choferes', component: () => import('../admin/views/ChoferesView.vue') },
        { path: 'clientes', name: 'clientes', component: () => import('../admin/views/ClientesView.vue') },
        { path: 'calendario', name: 'calendario', component: () => import('../admin/views/CalendarioView.vue') },
        { path: 'contabilidad', name: 'contabilidad', component: () => import('../admin/views/ContabilidadView.vue') },
        { path: 'configuracion', name: 'configuracion', component: () => import('../admin/views/ConfiguracionView.vue') }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && isAuthenticated()) {
    return { name: 'dashboard' }
  }
})

export default router
