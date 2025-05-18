<template>
  <section class="notas-container">
    <!-- Header -->
    <header class="notas-header">
      <h1 class="notas-title">
        <span class="header-accent"></span>
        Mis Notas
      </h1>
      <button class="add-button" @click="openAddForm">
        Agregar nota
      </button>
    </header>

    <!-- Grid de tarjetas de nota -->
    <div class="notes-grid">
      <div
        v-for="nota in notas"
        :key="nota._id"
        class="nota-card"
        @click="openView(nota)"
      >
        <h3 class="nota-card-title">{{ nota.titulo }}</h3>
        <p class="nota-card-content">
          {{ nota.contenido.length > 100
            ? nota.contenido.slice(0, 100) + '…'
            : nota.contenido }}
        </p>
        <div class="card-actions" @click.stop>
          <button class="btn-edit" @click="openEditForm(nota)" aria-label="Editar nota">
            ✏️
          </button>
          <button class="btn-delete" @click="confirmDelete(nota._id)" aria-label="Eliminar nota">
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <NotaViewModal
      :show="showView"
      :nota="activeNote"
      @close="showView = false"
    />

    <AgregarNota
      v-if="showAddForm"
      :show="showAddForm"
      @close="closeAddForm"
      @submit="handleAddSubmit"
    />

    <EditarNota
      v-if="showEditForm"
      :show="showEditForm"
      :note="activeNote"
      @close="closeEditForm"
      @submit="handleEditSubmit"
    />

    <ConfirmModal
      :show="deletingId !== null"
      title="Confirmar eliminación"
      message="¿Eliminar esta nota?"
      @cancel="deletingId = null"
      @confirm="handleDelete"
    />
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import authService from '@/services/authService'
import {
  crearNota,
  obtenerNotasUsuario,
  modificarNota,
  eliminarNota
} from '@/apis/notaApi'

import NotaViewModal from './NotaViewModal.vue'
import AgregarNota from './AgregarNota.vue'
import EditarNota from './EditarNota.vue'
import ConfirmModal from './ConfirmModal.vue'

export default {
  name: 'NotasUsuario',
  components: { NotaViewModal, AgregarNota, EditarNota, ConfirmModal },
  setup() {
    const notas = ref([])
    const showView = ref(false)
    const showAddForm = ref(false)
    const showEditForm = ref(false)
    const deletingId = ref(null)
    const activeNote = ref({ _id: null, titulo: '', contenido: '' })
    const token = authService.getToken()

    const fetchNotas = async () => {
      try {
        const lista = await obtenerNotasUsuario(token)
        notas.value = Array.isArray(lista) ? lista : lista.notas || []
      } catch (err) {
        console.error('Error cargando notas:', err.message || err)
        alert(`No se pudieron cargar las notas: ${err.message || JSON.stringify(err)}`)
      }
    }
    onMounted(fetchNotas)

    const openView = (nota) => {
      activeNote.value = nota
      showView.value = true
    }

    // Abrir formularios separados
    const openAddForm = () => {
      activeNote.value = { _id: null, titulo: '', contenido: '' }
      showAddForm.value = true
    }
    const closeAddForm = () => {
      showAddForm.value = false
    }

    const openEditForm = (nota) => {
      activeNote.value = nota
      showEditForm.value = true
    }
    const closeEditForm = () => {
      showEditForm.value = false
    }

    // Submit crear
    const handleAddSubmit = async (payload) => {
      try {
        await crearNota(token, payload)
        await fetchNotas()
        closeAddForm()
      } catch (err) {
        console.error('Error creando nota:', err.message || err)
        alert(`Ocurrió un error al crear la nota: ${err.message || JSON.stringify(err)}`)
      }
    }

    // Submit editar
    const handleEditSubmit = async (payload) => {
      try {
        await modificarNota(token, activeNote.value._id, payload)
        await fetchNotas()
        closeEditForm()
      } catch (err) {
        console.error('Error modificando nota:', err.message || err)
        alert(`Ocurrió un error al modificar la nota: ${err.message || JSON.stringify(err)}`)
      }
    }

    const confirmDelete = (id) => {
      deletingId.value = id
    }

    const handleDelete = async () => {
      try {
        await eliminarNota(token, deletingId.value)
        await fetchNotas()
      } catch (err) {
        console.error('Error eliminando nota:', err.message || err)
        alert(`No se pudo eliminar la nota: ${err.message || JSON.stringify(err)}`)
      } finally {
        deletingId.value = null
      }
    }

    return {
      notas,
      showView, openView,
      showAddForm, openAddForm, closeAddForm,
      showEditForm, openEditForm, closeEditForm,
      activeNote,
      handleAddSubmit,
      handleEditSubmit,
      deletingId, confirmDelete, handleDelete
    }
  }
}
</script>


<style scoped>
.notas-container {
  padding: 24px;
  font-family: 'Inter', sans-serif;
  background: #f9fafb;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Header */
.notas-header {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background: #eef2f5;
  border-radius: 8px;
  margin-bottom: 24px;
}
.notas-title {
  position: relative;
  font-size: 1.25rem;
  color: #2d3436;
  margin: 0;
  padding-left: 16px;
}
.header-accent {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: #4a90e2;
  border-radius: 2px;
}
.add-button {
  margin-left: auto;
  background: #4a90e2;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.add-button:hover {
  background: #357abd;
}

/* Grid de notas */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.nota-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.nota-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}
.nota-card-title {
  margin: 0 0 12px;
  font-size: 1.1rem;
  color: #2d3436;
}
.nota-card-content {
  margin: 0;
  color: #4a4a4a;
  font-size: 0.95rem;
  line-height: 1.5;
}
.card-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
}
.card-actions button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.15rem;
  padding: 4px;
  color: #6c757d;
  transition: color 0.2s;
}
.card-actions .btn-edit:hover { color: #4a90e2; }
.card-actions .btn-delete:hover { color: #e74c3c; }

/* Transiciones comunes */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Overlay modal común */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Card base de modal */
.modal-card {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  overflow: hidden;
}

/* Vista detallada */
.modal-view .modal-header {
  padding: 16px;
  background: #4a90e2;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-view .modal-body {
  padding: 24px;
  color: #2d3436;
  font-size: 1rem;
  line-height: 1.5;
}
.close-btn {
  background: transparent;
  border: none;
  font-size: 1.4rem;
  color: white;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
}

/* Formulario modal */
.modal-form-card .form-header {
  padding: 16px;
  background: #4a90e2;
  color: #fff;
}
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}
.form-group label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #2d3436;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  background: #f8f9fa;
  transition: border-color 0.2s, background 0.2s;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a90e2;
  background: #fff;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
.btn-cancel, .btn-save {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}
.btn-cancel {
  background: #ced4da;
  color: #2d3436;
}
.btn-cancel:hover {
  background: #b0b3b8;
}
.btn-save {
  background: #4a90e2;
  color: #fff;
}
.btn-save:hover {
  background: #357abd;
}

/* Confirmación modal */
.modal-confirm .modal-header {
  padding: 16px;
  background: #f8f9fa;
}
.modal-confirm .modal-body {
  padding: 24px;
  font-size: 1rem;
  color: #2d3436;
}
.modal-confirm .modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
}
.btn-confirm {
  background: #e74c3c;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.2s;
}
.btn-confirm:hover {
  background: #c0392b;
}
</style>
