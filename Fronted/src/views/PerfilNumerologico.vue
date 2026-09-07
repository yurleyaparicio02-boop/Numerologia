<template>
  <div class="page container">
    <header class="page-header">
      <h1><i class="fas fa-fingerprint"></i> Perfil Numerológico</h1>
      <p>Tus tres números esenciales que revelan tu energía vital</p>
    </header>

    <!-- Listado -->
    <div v-if="!showForm" class="section">
      <div class="section-bar">
        <h2>Perfiles Registrados</h2>
        <button class="btn btn-primary btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Nuevo Perfil
        </button>
      </div>

      <div v-if="loading" class="spinner"></div>

      <div v-else-if="perfiles.length === 0" class="empty-state">
        <div class="empty-icon">✧</div>
        <p>Aún no hay perfiles numerológicos</p>
        <button class="btn btn-outline btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Crear el primero
        </button>
      </div>

      <div v-else class="profiles-grid">
        <div class="profile-card card" v-for="p in perfiles" :key="p._id">
          <div class="profile-avatar">
            <span class="avatar-num">{{ p.numeroVida }}</span>
            <span class="avatar-label">Vida</span>
          </div>
          <div class="profile-info">
            <h3>{{ p.usuario_id?.nombreCompleto || 'Usuario' }}</h3>
            <div class="profile-nums">
              <div class="num-item">
                <span class="num-val">{{ p.numeroVida }}</span>
                <span class="num-key">Vida</span>
              </div>
              <div class="num-item">
                <span class="num-val">{{ p.numeroExpresion }}</span>
                <span class="num-key">Expresión</span>
              </div>
              <div class="num-item">
                <span class="num-val">{{ p.numeroAlma }}</span>
                <span class="num-key">Alma</span>
              </div>
            </div>
          </div>
          <div class="profile-actions">
            <button class="btn btn-outline btn-sm" @click="openForm(p)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="eliminar(p._id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulario -->
    <div v-if="showForm" class="section">
      <div class="section-bar">
        <h2>{{ editing ? 'Editar Perfil' : 'Nuevo Perfil' }}</h2>
        <button class="btn btn-outline btn-sm" @click="showForm = false">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
      <div class="card">
        <form @submit.prevent="guardar" class="form-grid">
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> ID Usuario</label>
            <input v-model="form.usuario_id" class="form-input" placeholder="ID del usuario" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-sun"></i> Número de Vida</label>
            <input v-model.number="form.numeroVida" type="number" min="1" max="33" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-comments"></i> Número de Expresión</label>
            <input v-model.number="form.numeroExpresion" type="number" min="1" max="33" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-heart"></i> Número de Alma</label>
            <input v-model.number="form.numeroAlma" type="number" min="1" max="33" class="form-input" required />
          </div>
          <button type="submit" class="btn btn-primary" :disabled="saving">
            <span v-if="!saving"><i class="fas fa-save"></i> Guardar</span>
            <span v-else><i class="fas fa-spinner fa-spin"></i> Guardando...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import api from '../services/api'

const perfiles = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const toast = inject('toast')

const form = ref({
  usuario_id: '',
  numeroVida: 1,
  numeroExpresion: 1,
  numeroAlma: 1
})

onMounted(fetchPerfiles)

async function fetchPerfiles() {
  loading.value = true
  try {
    const res = await api.get('/perfiles-numerologicos')
    perfiles.value = res.data
  } catch { toast('Error al cargar perfiles', 'error') }
  finally { loading.value = false }
}

function openForm(perfil = null) {
  if (perfil) {
    editing.value = perfil._id
    form.value = { ...perfil }
  } else {
    editing.value = null
    form.value = { usuario_id: '', numeroVida: 1, numeroExpresion: 1, numeroAlma: 1 }
  }
  showForm.value = true
}

async function guardar() {
  saving.value = true
  try {
    if (editing.value) {
      await api.put(`/perfiles-numerologicos/${editing.value}`, form.value)
      toast('Perfil actualizado ✨', 'success')
    } else {
      await api.post('/perfiles-numerologicos', form.value)
      toast('Perfil creado ✨', 'success')
    }
    showForm.value = false
    fetchPerfiles()
  } catch (err) {
    toast(err.response?.data?.mensaje || 'Error al guardar', 'error')
  } finally { saving.value = false }
}

async function eliminar(id) {
  if (!confirm('¿Eliminar este perfil numerológico?')) return
  try {
    await api.delete(`/perfiles-numerologicos/${id}`)
    toast('Perfil eliminado', 'info')
    fetchPerfiles()
  } catch { toast('Error al eliminar', 'error') }
}
</script>

<style scoped>
.page { padding: 2rem 0; }
.page-header { text-align: center; margin-bottom: 2.5rem; }
.page-header h1 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--text-glow);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}
.page-header p { font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.35rem; }
.section { margin-bottom: 2rem; }
.section-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
.section-bar h2 { font-size: 1.1rem; color: var(--accent-bright); }

.empty-state { text-align: center; padding: 3rem; color: var(--text-muted); }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; color: var(--accent); }

.profiles-grid { display: grid; gap: 1rem; }

.profile-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
}
.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
}
.avatar-num {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--gold);
  text-shadow: 0 0 15px rgba(251,191,36,0.3);
  line-height: 1;
}
.avatar-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); }
.profile-info { flex: 1; }
.profile-info h3 { font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem; }
.profile-nums { display: flex; gap: 1.5rem; }
.num-item { text-align: center; }
.num-val { display: block; font-family: var(--font-display); font-size: 1.4rem; color: var(--accent-bright); font-weight: 600; }
.num-key { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
.profile-actions { display: flex; gap: 0.5rem; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-grid .form-group:first-child { grid-column: 1 / -1; }
.form-grid .btn { grid-column: 1 / -1; justify-self: start; }

@media (max-width: 600px) {
  .profile-card { flex-direction: column; text-align: center; }
  .profile-nums { justify-content: center; }
  .form-grid { grid-template-columns: 1fr; }
}
</style>