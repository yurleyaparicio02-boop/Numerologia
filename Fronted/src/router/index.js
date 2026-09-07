import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue'),
    meta: { guest: true }
  },
  {
    path: '/',
    name: 'Inicio',
    component: () => import('../views/Inicio.vue'),
    meta: { auth: true }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/PerfilNumerologico.vue'),
    meta: { auth: true }
  },
  {
    path: '/lecturas',
    name: 'Lecturas',
    component: () => import('../views/Lecturas.vue'),
    meta: { auth: true }
  },
  {
    path: '/compatibilidad',
    name: 'Compatibilidad',
    component: () => import('../views/Compatibilidad.vue'),
    meta: { auth: true }
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../views/Usuarios.vue'),
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.auth && !auth.isAuthenticated) {
    next('/login')
  } else if (to.meta.guest && auth.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router