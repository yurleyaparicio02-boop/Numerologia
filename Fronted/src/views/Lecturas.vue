<template>
  <div class="page container">
    <header class="page-header">
      <h1><i class="fas fa-book-open"></i> Lecturas Astrales</h1>
      <p>Mensajes del cosmos guiados por la numerología</p>
    </header>

    <div v-if="!showForm" class="section">
      <div class="section-bar">
        <div class="filter-bar">
          <button
            v-for="t in tipos"
            :key="t.value"
            :class="['filter-btn', { active: filtro === t.value }]"
            @click="filtro = t.value"
          >
            {{ t.label }}
          </button>
        </div>
        <button class="btn btn-primary btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Nueva Lectura
        </button>
      </div>

      <div v-if="loading" class="spinner"></div>

      <div v-else-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">📖</div>
        <p>No hay lecturas{{ filtro !== 'todos' ? ' de este tipo' : '' }}</p>
        <button class="btn btn-outline btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Crear lectura
        </button>
      </div>

      <div v-else class="lecturas-grid">
        <div class="lectura-card card" v-for="l in filtered" :key="l._id">
          <div class="lectura-type">
            <span :class="['badge', typeBadge(l.tipoLectura)]">{{ l.tipoLectura }}</span>
          </div>
          <h3 class="lectura-prompt">"{{ l.prompt }}"</h3>
          <p class="lectura-respuesta">{{ l.respuesta }}</p>
          <div class="lectura-meta">
            <span><i class="fas fa-user"></i> {{ l.usuario_id?.nombreCompleto || 'Anónimo' }}</span>
            <span><i class="fas fa-calendar"></i> {{ formatDate(l.fecha) }}</span>
          </div>
          <div class="lectura-actions">
            <button class="btn btn-outline btn-sm" @click="openForm(l)"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm" @click="eliminar(l._id)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="section">
      <div class="section-bar">
        <h2>{{ editing ? 'Editar Lectura' : 'Nueva Lectura' }}</h2>
        <button class="btn btn-outline btn-sm" @click="showForm = false">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
      <div class="card">
        <form @submit.prevent="guardar">
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> ID Usuario</label>
            <input v-model="form.usuario_id" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-question-circle"></i> Prompt / Pregunta</label>
            <textarea v-model="form.prompt" class="form-input" rows="3" required placeholder="¿Qué deseas preguntar al cosmos?"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-scroll"></i> Respuesta</label>
            <textarea v-model="form.respuesta" class="form-input" rows="4" required placeholder="La sabiduría numérica responde..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-tag"></i> Tipo de Lectura</label>
            <select v-model="form.tipoLectura" class="form-input" required>
              <option value="diaria">☀️ Diaria</option>
              <option value="general">🌙 General</option>
              <option value="anual">🔮 Anual</option>
            </select>
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
import { ref, computed, onMounted, inject } from 'vue'
import api from '../services/api'

const lecturas = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const filtro = ref('todos')
const toast = inject('toast')

const tipos = [
  { value: 'todos', label: '✨ Todos' },
  { value: 'diaria', label: '☀️ Diarias' },
  { value: 'general', label: '🌙 Generales' },
  { value: 'anual', label: '🔮 Anuales' }
]

const filtered = computed(() => {
  if (filtro.value === 'todos') return lecturas.value
  return lecturas.value.filter(l => l.tipoLectura === filtro.value)
})

const form = ref({
  usuario_id: '',
  prompt: '',
  respuesta: '',
  tipoLectura: 'diaria'
})

onMounted(fetchLecturas)

async function fetchLecturas() {
  loading.value = true
  try {
    const res = await api.get('/lecturas')
    lecturas.value = res.data
  } catch { toast('Error al cargar lecturas', 'error') }
  finally { loading.value = false }
}

function typeBadge(type) {
  return {
    diaria: 'badge-gold',
    general: 'badge-purple',
    anual: 'badge-teal'
  }[type] || 'badge-purple'
}

function formatDate(date) {
  return date ? new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
}

function openForm(lectura = null) {
  if (lectura) {
    editing.value = lectura._id
    form.value = { ...lectura }
  } else {
    editing.value = null
    form.value = { usuario_id: '', prompt: '', respuesta: '', tipoLectura: 'diaria' }
  }
  showForm.value = true
}

async function guardar() {
  saving.value = true
  try {
    if (editing.value) {
      await api.put(`/lecturas/${editing.value}`, form.value)
      toast('Lectura actualizada ✨', 'success')
    } else {
      await api.post('/lecturas', form.value)
      toast('Lectura creada ✨', 'success')
    }
    showForm.value = false
    fetchLecturas()
  } catch (err) {
    toast(err.response?.data?.mensaje || 'Error al guardar', 'error')
  } finally { saving.value = false }
}

async function eliminar(id) {
  if (!confirm('¿Eliminar esta lectura?')) return
  try {
    await api.delete(`/lecturas/${id}`)
    toast('Lectura eliminada', 'info')
    fetchLecturas()
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

.filter-bar { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-btn {
  padding: 0.4rem 0.9rem; border-radius: 999px; border: 1px solid var(--border-subtle);
  background: transparent; color: var(--text-secondary); font-size: 0.8rem; cursor: pointer;
  transition: all var(--transition); font-family: var(--font-body);
}
.filter-btn.active, .filter-btn:hover {
  border-color: var(--accent); background: rgba(139, 92, 246, 0.12); color: var(--accent-bright);
}

.empty-state { text-align: center; padding: 3rem; color: var(--text-muted); }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; }

.lecturas-grid { display: grid; gap: 1.25rem; }

.lectura-card {
  padding: 1.5rem;
  position: relative;
}
.lectura-type { margin-bottom: 0.75rem; }
.lectura-prompt {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--gold);
  margin-bottom: 0.75rem;
  font-style: italic;
}
.lectura-respuesta {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}
.lectura-meta {
  display: flex; gap: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}
.lectura-meta i { margin-right: 0.3rem; }
.lectura-actions { display: flex; gap: 0.5rem; }

textarea.form-input { resize: vertical; min-height: 80px; }
</style>