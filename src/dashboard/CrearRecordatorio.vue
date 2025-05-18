<template>
  <transition name="fade">
    <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <header class="form-header">
          <h2 class="header-title">
            <span class="title-accent"></span>
            Crear Recordatorio
          </h2>
          <button class="close-button" @click="closeModal" aria-label="Cerrar">✕</button>
        </header>
        <form @submit.prevent="onSubmit" class="create-form">
          <div class="form-group">
            <label for="titulo">Título</label>
            <input
              id="titulo"
              type="text"
              v-model="localTitulo"
              required
              placeholder="Ej. Terminar el proyecto de..."
            />
          </div>
          <div class="form-group-inline">
            <div class="form-group">
              <label for="fecha">Fecha</label>
              <input id="fecha" type="date" v-model="localFecha" required />
            </div>
            <div class="form-group">
              <label for="hora">Hora</label>
              <input id="hora" type="time" v-model="localHora" required />
            </div>
          </div>
          <button type="submit" class="submit-button">
            Guardar
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import authService from '@/services/authService'
import userApi from '@/apis/userApi'

export default {
  name: 'CrearRecordatorio',
  model: { prop: 'modelValue', event: 'update:modelValue' },
  props: {
    modelValue: { type: Boolean, required: true },
    calendarioId: { type: String, required: true }
  },
  data() {
    return {
      localTitulo: '',
      localFecha: '',
      localHora: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
    },
    async onSubmit() {
      try {
        const token = authService.getToken()
        if (!token) {
          alert('No se pudo crear')
          return
        }

        const payload = {
          titulo: this.localTitulo.trim(),
          fechaRecordatorio: this.localFecha,
          horaRecordatorio: this.localHora
        }

        await userApi.crearRecordatorio(this.calendarioId, token, payload)

        alert('Creado correctamente')
        this.$emit('crear')            // ya no enviamos datos, solo señalamos éxito
        this.closeModal()

        this.localTitulo = ''
        this.localFecha = ''
        this.localHora = ''
      } catch (error) {
        alert('No se pudo crear')
        console.error('Error creando recordatorio:', error)
      }
    }
  }
}
</script>




<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Card */
.modal-card {
  width: 90%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(45, 52, 54, 0.15);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  position: relative;
}

/* Header */
.form-header {
  padding: 16px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3436;
  margin: 0;
  position: relative;
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

/* Close button */
.close-button {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #6c757d;
  transition: color 0.2s ease;
}
.close-button:hover {
  color: #2d3436;
}

/* Form */
.create-form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group-inline {
  display: flex;
  gap: 16px;
}

label {
  font-size: 0.875rem;
  color: #2d3436;
  margin-bottom: 6px;
}

input[type="text"],
input[type="date"],
input[type="time"] {
  padding: 10px 12px;
  font-size: 0.95rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

/* Submit */
.submit-button {
  margin-top: 8px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #4a90e2;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.submit-button:hover {
  background: #357abd;
}

.icon-check {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
}
</style>
