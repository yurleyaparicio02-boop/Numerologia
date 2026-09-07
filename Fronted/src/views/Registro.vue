<template>
  <div class="auth-page">
    <div class="orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>

    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-icon">✧</div>
        <h1>Crea tu cuenta</h1>
        <p>Despierta tu energía cósmica</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-user"></i> Nombre completo
          </label>
          <input v-model="form.nombreCompleto" type="text" class="form-input" placeholder="Tu nombre" required />
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-envelope"></i> Correo electrónico
          </label>
          <input v-model="form.email" type="email" class="form-input" placeholder="tu@correo.com" required />
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-lock"></i> Contraseña
          </label>
          <input v-model="form.password" type="password" class="form-input" placeholder="Mínimo 6 caracteres" required minlength="6" />
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-calendar"></i> Fecha de nacimiento
          </label>
          <input v-model="form.fechaNacimiento" type="date" class="form-input" required />
        </div>

        <button type="submit" class="btn btn-gold auth-btn" :disabled="loading">
          <span v-if="!loading"><i class="fas fa-star"></i> Registrarme</span>
          <span v-else><i class="fas fa-spinner fa-spin"></i> Creando cuenta...</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const form = ref({
  nombreCompleto: '',
  email: '',
  password: '',
  fechaNacimiento: ''
})
const loading = ref(false)
const router = useRouter()
const auth = useAuthStore()
const toast = inject('toast')

async function handleRegister() {
  loading.value = true
  try {
    await auth.register(form.value)
    toast('¡Cuenta creada! Ahora inicia sesión', 'success')
    router.push('/login')
  } catch (err) {
    const msg = err.response?.data?.mensaje || 'Error al registrarse'
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
.orbs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.2; }
.orb-1 { width: 280px; height: 280px; background: var(--gold); top: -70px; right: -50px; animation: float1 9s ease-in-out infinite; }
.orb-2 { width: 220px; height: 220px; background: var(--rose); bottom: -40px; left: -30px; animation: float2 11s ease-in-out infinite; }
@keyframes float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-35px, 30px); } }
@keyframes float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -25px); } }

.auth-card {
  width: 100%;
  max-width: 460px;
  background: rgba(18, 18, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-glow), var(--shadow-card);
  position: relative;
  z-index: 1;
}
.auth-header { text-align: center; margin-bottom: 2rem; }
.auth-icon { font-size: 3.5rem; margin-bottom: 0.75rem; color: var(--gold); filter: drop-shadow(0 0 12px rgba(251,191,36,0.6)); animation: pulse-glow 3s ease-in-out infinite; }
@keyframes pulse-glow { 0%, 100% { filter: drop-shadow(0 0 12px rgba(251,191,36,0.4)); } 50% { filter: drop-shadow(0 0 22px rgba(251,191,36,0.8)); } }
.auth-header h1 { font-family: var(--font-display); font-size: 1.6rem; color: var(--text-glow); margin-bottom: 0.35rem; }
.auth-header p { font-size: 0.9rem; color: var(--text-muted); }
.auth-form { display: flex; flex-direction: column; gap: 0.25rem; }
.auth-btn { width: 100%; margin-top: 1rem; padding: 0.9rem; font-size: 1rem; justify-content: center; }
.auth-footer { text-align: center; margin-top: 1.75rem; font-size: 0.9rem; color: var(--text-muted); }
.auth-footer a { color: var(--accent-bright); font-weight: 500; }
</style>