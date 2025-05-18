<template>
  <section class="reminder-list">
    <header class="header">
      <div class="header-content">
        <h2 class="title">
          <span class="title-accent"></span>
          Mis recordatorios
        </h2>
        <button class="add-button" @click="openCrear">
          Agregar recordatorio
          <svg class="add-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>
    </header>

    <ul class="event-list">
      <li v-for="r in recordatorios" :key="r._id" class="event-item">
        <div class="event-content">
          <div class="title-container">
            <span class="event-accent"></span>
            <p class="event-title">{{ r.titulo }}</p>
          </div>
          <div class="event-time">
            <span class="date">{{ formatearFecha(r.fechaRecordatorio) }}</span>
            <span class="separator">•</span>
            <span class="time">{{ r.horaRecordatorio }}</span>
          </div>
          <button class="trash-button" @click="openEliminar(r._id)" aria-label="Eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M9 3a1 1 0 0 0-1 1v1H5a1 1 0 0 0 0 2h1.1l.8 12.2A2 2 0 0 0 8.9 21h6.2a2 2 0 0 0 2-1.8l.8-12.2H19a1 1 0 1 0 0-2h-3V4a1 1 0 0 0-1-1H9Zm1 3V4h4v2h-4Zm-1.5 3.5a1 1 0 0 1 2 0v8a1 1 0 0 1-2 0v-8Zm5 0a1 1 0 1 1 2 0v8a1 1 0 0 1-2 0v-8Z" />
            </svg>
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal para crear recordatorio -->
    <CrearRecordatorio v-model="showCrear" :calendarioId="calendarioId" @crear="refreshRecordatorios" />

    <!-- Modal de confirmación de eliminación -->
    <transition name="fade">
      <div v-if="showEliminar" class="modal-overlay" @click.self="cancelEliminar">
        <div class="modal-card">
          <header class="form-header">
            <h2 class="header-title">
              <span class="title-accent"></span>
              Eliminar recordatorio
            </h2>
          </header>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar este recordatorio?</p>
          </div>
          <footer class="modal-footer">
            <button class="cancel-button" @click="cancelEliminar">Cancelar</button>
            <button class="confirm-button" @click="confirmEliminar">Eliminar</button>
          </footer>
        </div>
      </div>
    </transition>
  </section>
</template>


<style scoped>
.reminder-list {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* Header Styles */
.header {
  padding: 16px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  position: relative;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3436;
  margin: 0;
  padding-left: 28px;
}

.title-accent {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #4a90e2;
  border-radius: 2px;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: #357abd;
  box-shadow: 0 2px 4px rgba(74, 144, 226, 0.2);
}

.add-icon {
  margin-left: 4px;
}

/* Event List Styles */
.event-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-item {
  padding: 14px 24px;
  transition: all 0.2s ease;
  cursor: pointer;
  border-bottom: 1px solid #f1f3f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-item:hover {
  background: #f8fbff;
}

.event-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.event-accent {
  display: block;
  width: 8px;
  height: 8px;
  background: #4a90e2;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #2d3436;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-time {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.825rem;
  color: #6c757d;
  flex-shrink: 0;
}

.separator {
  color: #ced4da;
  font-weight: bold;
}

/* Trash button */
.trash-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  transition: color 0.2s;
  padding: 4px;
}

.trash-button:hover {
  color: #c0392b;
}

/* Modal styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 6px 12px rgba(45, 52, 54, 0.15);
}

.form-header {
  padding: 16px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.header-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3436;
  position: relative;
  padding-left: 28px;
  margin: 0;
}

.modal-body {
  padding: 24px;
  font-size: 0.95rem;
  color: #2d3436;
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.cancel-button,
.confirm-button {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.cancel-button {
  background: #ced4da;
  color: #2d3436;
}

.confirm-button {
  background: #e74c3c;
  color: #fff;
}

.confirm-button:hover {
  background: #c0392b;
}
</style>


<script>
import { obtenerMisRecordatorios } from '@/apis/recordatorioApi'
import authService from '@/services/authService'
import userApi from '@/apis/userApi'
import CrearRecordatorio from './CrearRecordatorio.vue'

export default {
  name: 'ListaEventos',
  components: { CrearRecordatorio },
  props: {
    calendarioId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recordatorios: [],
      showCrear: false,
      showEliminar: false,
      aEliminarId: null
    }
  },
  async created() {
    await this.fetchRecordatorios()
  },
  methods: {
    async fetchRecordatorios() {
      try {
        const token = authService.getToken()
        if (!token) return
        const datos = await obtenerMisRecordatorios(token, this.calendarioId)
        this.recordatorios = datos || []
      } catch (err) {
        console.error('Error cargando recordatorios:', err)
      }
    },
    formatearFecha(fecha) {
      const d = new Date(fecha)
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    openCrear() {
      this.showCrear = true
    },
    async refreshRecordatorios() {
      await this.fetchRecordatorios()
      this.showCrear = false
    },
    openEliminar(id) {
      this.aEliminarId = id
      this.showEliminar = true
    },
    cancelEliminar() {
      this.aEliminarId = null
      this.showEliminar = false
    },
    async confirmEliminar() {
      try {
        const token = authService.getToken()
        if (!token) throw new Error('Sin token')
        await userApi.eliminarRecordatorio(this.aEliminarId, token)
        alert('Eliminado correctamente')
        await this.fetchRecordatorios()
      } catch (err) {
        console.error('Error al eliminar:', err)
        alert('No se pudo eliminar')
      } finally {
        this.cancelEliminar()
      }
    }
  }
}
</script>
