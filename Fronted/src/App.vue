<template>
  <div id="app-root">
    <!-- Navbar -->
    <nav class="navbar" v-if="!isAuthPage">
      <div class="navbar-inner container">
        <router-link to="/" class="navbar-brand">
          <span class="brand-icon">☽</span>
          <span class="brand-text">Astrología<span class="brand-accent">&</span>Numerología</span>
        </router-link>
        <div class="navbarcd-links" :class="{ open: menuOpen }">
          <router-link to="/" @click="menuOpen = false">
            <i class="fas fa-sun"></i> Inicio
          </router-link>
          <router-link to="/perfil" @click="menuOpen = false">
            <i class="fas fa-star"></i> Mi Perfil
          </router-link>
          <router-link to="/lecturas" @click="menuOpen = false">
            <i class="fas fa-book-open"></i> Lecturas
          </router-link>
          <router-link to="/compatibilidad" @click="menuOpen = false">
            <i class="fas fa-heart"></i> Compatibilidad
          </router-link>
          <router-link to="/usuarios" @click="menuOpen = false">
            <i class="fas fa-users"></i> Usuarios
          </router-link>
        </div>
        <div class="navbar-right">
          <span class="user-name" v-if="auth.user">
            <i class="fas fa-moon"></i> {{ auth.user.nombreCompleto }}
          </span>
          <button class="btn btn-outline btn-sm" @click="logout" v-if="auth.isAuthenticated">
            <i class="fas fa-sign-out-alt"></i> Salir
          </button>
        </div>
        <button class="hamburger" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Main -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Toasts -->
    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
      >
        <i :class="toastIcon(toast.type)"></i>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const menuOpen = ref(false)

const isAuthPage = computed(() => ['/login', '/registro'].includes(route.path))

const toasts = ref([])
let toastId = 0

function showToast(message, type = 'info') {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3500)
}

function toastIcon(type) {
  return {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  }[type]
}

function logout() {
  auth.logout()
  router.push('/login')
  showToast('Sesión cerrada', 'info')
}

provide('toast', showToast)
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 26, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0 1rem;
}
.navbar-inner {
  display: flex;
  align-items: center;
  height: 64px;
  gap: 1rem;
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-glow);
  text-decoration: none;
  white-space: nowrap;
}
.brand-icon {
  font-size: 1.6rem;
  filter: drop-shadow(0 0 8px rgba(168,130,255,0.5));
}
.brand-accent {
  color: var(--gold);
  margin: 0 0.1em;
}
.navbar-links {
  display: flex;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
}
.navbar-links a {
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius);
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.navbar-links a:hover,
.navbar-links a.router-link-exact-active {
  color: var(--accent-bright);
  background: rgba(139,92,246,0.1);
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}
.user-name {
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
}

.main-content {
  min-height: calc(100vh - 64px);
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .navbar-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: rgba(10, 10, 26, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    border-bottom: 1px solid var(--border-subtle);
   }
  .navbar-links.open {
    transform: translateY(0);
    opacity: 1;
  }
  .hamburger { display: flex; }
  .navbar-right { display: none; }
}
</style>