<template>
  <div class="auth-page">
    <!-- Partículas decorativas -->
    <div class="orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-icon">☽</div>
        <h1>Bienvenido de vuelta</h1>
        <p>Ingresa a tu universo astrológico</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-envelope"></i> Correo electrónico
          </label>
          <input
            v-model="email"
            type="email"
            class="form-input"
            placeholder="tu@correo.com"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-lock"></i> Contraseña
          </label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary auth-btn" :disabled="loading">
          <span v-if="!loading"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</span>
          <span v-else><i class="fas fa-spinner fa-spin"></i> Conectando...</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>¿No tienes cuenta? <router-link to="/registro">Regístrate aquí</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const auth = useAuthStore()
const toast = inject('toast')

async function handleLogin() {
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    toast('¡Bienvenido! Las estrellas te esperan', 'success')
    router.push('/')
  } catch (err) {
    const msg = err.response?.data?.mensaje || 'Error al iniciar sesión'
    toast(msg, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

.orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}
.orb-1 {
  width: 300px; height: 300px;
  background: var(--accent);
  top: -80px; left: -60px;
  animation: float1 8s ease-in-out infinite;
}
.orb-2 {
  width: 250px; height: 250px;
  background: var(--gold);
  bottom: -50px; right: -40px;
  animation: float2 10s ease-in-out infinite;
}
.orb-3 {
  width: 200px; height: 200px;
  background: var(--teal);
  top: 50%; left: 60%;
  animation: float3 12s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(40px, 30px); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-30px, -40px); }
}
@keyframes float3 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-20px, 25px); }
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background: rgba(18, 18, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-glow), var(--shadow-card);
  position: relative;
  z-index: 1;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}
.auth-icon {
  font-size: 3.5rem;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 0 15px rgba(168,130,255,0.6));
  animation: pulse-glow 3s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 15px rgba(168,130,255,0.4)); }
  50%      { filter: drop-shadow(0 0 25px rgba(168,130,255,0.8)); }
}
.auth-header h1 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--text-glow);
  margin-bottom: 0.35rem;
}
.auth-header p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.auth-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.9rem;
  font-size: 1rem;
  justify-content: center;
}

.auth-footer {
  text-align: center;
  margin-top: 1.75rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.auth-footer a {
  color: var(--accent-bright);
  font-weight: 500;
}
</style>