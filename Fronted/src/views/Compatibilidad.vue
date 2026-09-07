<template>
  <div class="page container">
    <header class="page-header">
      <h1><i class="fas fa-heart"></i> Compatibilidad Cósmica</h1>
      <p>Descubre la sinergia numérica entre dos almas</p>
    </header>

    <div v-if="!showForm" class="section">
      <div class="section-bar">
        <h2>Compatibilidades</h2>
        <button class="btn btn-primary btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Nueva Compatibilidad
        </button>
      </div>

      <div v-if="loading" class="spinner"></div>

      <div v-else-if="compatibilidades.length === 0" class="empty-state">
        <div class="empty-icon">💕</div>
        <p>Aún no hay compatibilidades registradas</p>
        <button class="btn btn-outline btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Crear la primera
        </button>
      </div>

      <div v-else class="compat-grid">
        <div class="compat-card card" v-for="c in compatibilidades" :key="c._id">
          <div class="compat-pair">
            <div class="compat-person">
              <div class="compat-avatar" style="background: linear-gradient(135deg, var(--accent-dim), var(--accent))">
                <i class="fas fa-user"></i>
              </div>
              <span class="compat-name">{{ c.usuario1_id?.nombreCompleto || 'Persona 1' }}</span>
            </div>
            <div class="compat-heart">
              <i class="fas fa-heart"></i>
            </div>
            <div class="compat-person">
              <div class="compat-avatar" style="background: linear-gradient(135deg, #be185d, var(--rose))">
                <i class="fas fa-user"></i>
              </div>
              <span class="compat-name">{{ c.usuario2_id?.nombreCompleto || 'Persona 2' }}</span>
            </div>
          </div>
          <div class="compat-score">
            <div class="score-ring">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(139,92,246,0.15)" stroke-width="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--accent)" stroke-width="6"
                  :stroke-dasharray="264" :stroke-dashoffset="264 - (264 * c.puntaje / 100)"
                  stroke-linecap="round" transform="rotate(-90 50 50)" />
                <text x="50" y="55" text-anchor="middle" fill="var(--gold)" font-size="22" font-weight="700" font-family="Cinzel">{{ c.puntaje }}%</text>
              </svg>
            </div>
          </div>
          <p class="compat-text">{{ c.interpretacionIA }}</p>
          <div class="compat-actions">
            <button class="btn btn-outline btn-sm" @click="openForm(c)"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm" @click="eliminar(c._id)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="section">
      <div class="section-bar">
        <h2>{{ editing ? 'Editar Compatibilidad' : 'Nueva Compatibilidad' }}</h2>
        <button class="btn btn-outline btn-sm" @click="showForm = false">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
      <div class="card">
        <form @submit.prevent="guardar">
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> ID Usuario 1</label>
            <input v-model="form.usuario1_id" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> ID Usuario 2</label>
            <input v-model="form.usuario2_id" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-percentage"></i> Puntaje (0-100)</label>
            <input v-model.number="form.puntaje" type="number" min="0" max="100" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-scroll"></i> Interpretación IA</label>
            <textarea v-model="form.interpretacionIA" class="form-input" rows="4" required placeholder="La interpretación cósmica de la sinergia..."></textarea>
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

const compatibilidades = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const toast = inject('toast')

const form = ref({
  usuario1_id: '',
  usuario2_id: '',
  puntaje: 50,
  interpretacionIA: ''
})

onMounted(fetchCompatibilidades)

async function fetchCompatibilidades() {
  loading.value = true
  try {
    const res = await api.get('/compatibilidades')
    compatibilidades.value = res.data
  } catch { toast('Error al cargar compatibilidades', 'error') }
  finally { loading.value = false }
}

function openForm(compat = null) {
  if (compat) {
    editing.value = compat._id
    form.value = { ...compat }
  } else {
    editing.value = null
    form.value = { usuario1_id: '', usuario2_id: '', puntaje: 50, interpretacionIA: '' }
  }
  showForm.value = true
}

async function guardar() {
  saving.value = true
  try {
    if (editing.value) {
      await api.put(`/compatibilidades/${editing.value}`, form.value)
      toast('Compatibilidad actualizada ✨', 'success')
    } else {
      await api.post('/compatibilidades', form.value)
      toast('Compatibilidad creada ✨', 'success')
    }
    showForm.value = false
    fetchCompatibilidades()
  } catch (err) {
    toast(err.response?.data?.mensaje || 'Error al guardar', 'error')
  } finally { saving.value = false }
}

async function eliminar(id) {
  if (!confirm('¿Eliminar esta compatibilidad?')) return
  try {
    await api.delete(`/compatibilidades/${id}`)
    toast('Compatibilidad eliminada', 'info')
    fetchCompatibilidades()
  } catch { toast('Error al eliminar', 'error') }
}
</script>

<style scoped>
.page { padding: 2rem 0; }
.page-header { text-align: center; margin-bottom: 2.5rem; }
.page-header h1 {
  font-family: var(--font-display); font-size: 1.8rem; color: var(--text-glow);
  display: flex; align-items: center; justify-content: center; gap: 0.6rem;
}
.page-header p { font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.35rem; }
.section { margin-bottom: 2rem; }
.section-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
.section-bar h2 { font-size: 1.1rem; color: var(--accent-bright); }
.empty-state { text-align: center; padding: 3rem; color: var(--text-muted); }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; }

.compat-grid { display: grid; gap: 1.5rem; }

.compat-card {
  padding: 2rem;
  text-align: center;
}
.compat-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.compat-person {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.compat-avatar {
  width: 50px; height: 50px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.compat-name {
  font-size: 0.85rem; color: var(--text-secondary);
  max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.compat-heart {
  font-size: 1.5rem;
  color: var(--rose);
  animation: heartbeat 2s ease-in-out infinite;
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
}

.compat-score {
  display: flex; justify-content: center; margin-bottom: 1rem;
}
.score-ring {
  width: 110px; height: 110px;
}
.score-ring svg {
  width: 100%; height: 100%;
}

.compat-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
}
.compat-actions { display: flex; gap: 0.5rem; justify-content: center; }

textarea.form-input { resize: vertical; min-height: 80px; }
</style>