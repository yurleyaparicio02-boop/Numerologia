<template>
  <div class="page container">
    <header class="page-header">
      <h1><i class="fas fa-users"></i> Usuarios</h1>
      <p>Administración de cuentas del universo astrológico</p>
    </header>

    <div v-if="!showForm" class="section">
      <div class="section-bar">
        <h2>Listado de Usuarios</h2>
        <button class="btn btn-primary btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Nuevo Usuario
        </button>
      </div>

      <div v-if="loading" class="spinner"></div>

      <div v-else-if="usuarios.length === 0" class="empty-state">
        <div class="empty-icon">🌟</div>
        <p>No hay usuarios registrados</p>
        <button class="btn btn-outline btn-sm" @click="openForm()">
          <i class="fas fa-plus"></i> Crear el primero
        </button>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Nacimiento</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usuarios" :key="u._id">
              <td>
                <div class="user-cell">
                  <div class="user-mini-avatar">{{ initials(u.nombreCompleto) }}</div>
                  {{ u.nombreCompleto }}
                </div>
              </td>
              <td>{{ u.email }}</td>
              <td>{{ formatDate(u.fechaNacimiento) }}</td>
              <td>{{ formatDate(u.fechaRegistro) }}</td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-outline btn-sm" @click="openForm(u)"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" @click="eliminar(u._id)"><i class="fas fa-trash"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showForm" class="section">
      <div class="section-bar">
        <h2>{{ editing ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
        <button class="btn btn-outline btn-sm" @click="showForm = false">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
      <div class="card">
        <form @submit.prevent="guardar" class="form-grid">
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> Nombre completo</label>
            <input v-model="form.nombreCompleto" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-envelope"></i> Correo</label>
            <input v-model="form.email" type="email" class="form-input" required />
          </div>
          <div class="form-group" v-if="!editing">
            <label class="form-label"><i class="fas fa-lock"></i> Contraseña</label>
            <input v-model="form.passwordHash" type="password" class="form-input" required minlength="6" />
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-calendar"></i> Fecha de nacimiento</label>
            <input v-model="form.fechaNacimiento" type="date" class="form-input" required />
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

const usuarios = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const toast = inject('toast')

const form = ref({
  nombreCompleto: '',
  email: '',
  passwordHash: '',
  fechaNacimiento: ''
})

onMounted(fetchUsuarios)

async function fetchUsuarios() {
  loading.value = true
  try {
    const res = await api.get('/usuarios')
    usuarios.value = res.data
  } catch { toast('Error al cargar usuarios', 'error') }
  finally { loading.value = false }
}

function openForm(usuario = null) {
  if (usuario) {
    editing.value = usuario._id
    form.value = {
      nombreCompleto: usuario.nombreCompleto,
      email: usuario.email,
      passwordHash: '',
      fechaNacimiento: usuario.fechaNacimiento?.split('T')[0] || ''
    }
  } else {
    editing.value = null
    form.value = { nombreCompleto: '', email: '', passwordHash: '', fechaNacimiento: '' }
  }
  showForm.value = true
}

async function guardar() {
  saving.value = true
  try {
    const payload = { ...form.value }
    if (editing.value) {
      delete payload.passwordHash
      await api.put(`/usuarios/${editing.value}`, payload)
      toast('Usuario actualizado ✨', 'success')
    } else {
      await api.post('/usuarios', payload)
      toast('Usuario creado ✨', 'success')
    }
    showForm.value = false
    fetchUsuarios()
  } catch (err) {
    toast(err.response?.data?.mensaje || 'Error al guardar', 'error')
  } finally { saving.value = false }
}

async function eliminar(id) {
  if (!confirm('¿Eliminar este usuario?')) return
  try {
    await api.delete(`/usuarios/${id}`)
    toast('Usuario eliminado', 'info')
    fetchUsuarios()
  } catch { toast('Error al eliminar', 'error') }
}

function initials(name) {
  return name?.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || '??'
}

function formatDate(date) {
  return date ? new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
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

.user-cell {
  display: flex; align-items: center; gap: 0.5rem;
}
.user-mini-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-dim), var(--accent));
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 700; color: #fff;
  font-family: var(--font-display);
}
.table-actions { display: flex; gap: 0.35rem; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-grid .btn { grid-column: 1 / -1; justify-self: start; }

@media (max-width: 700px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>