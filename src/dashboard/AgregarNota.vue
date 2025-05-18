<template>
  <transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card modal-form-card">
        <header class="modal-header form-header">
          <h2>Nueva nota</h2>
          <button class="close-btn" @click="$emit('close')">✕</button>
        </header>
        <form @submit.prevent="onSubmit" class="modal-form">
          <div class="form-group">
            <label for="titulo">Título</label>
            <input
              id="titulo"
              v-model="local.titulo"
              type="text"
              required
              maxlength="100"
              placeholder="Ingresa un título claro"
            />
          </div>
          <div class="form-group">
            <label for="contenido">Contenido</label>
            <textarea
              id="contenido"
              v-model="local.contenido"
              rows="6"
              required
              placeholder="Escribe tu nota aquí..."
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn-save">Crear</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'AgregarNota',
  props: {
    show: Boolean
  },
  setup(props, { emit }) {
    const local = reactive({ titulo: '', contenido: '' })

    const onSubmit = () => {
      emit('submit', {
        titulo: local.titulo.trim(),
        contenido: local.contenido.trim()
      })
      // opcional: limpiar formulario al enviar
      local.titulo = ''
      local.contenido = ''
    }

    return { local, onSubmit }
  }
}
</script>


<style scoped>
/* Transiciones suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Contenedor principal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
  z-index: 1000;
  padding: 2rem;
}

/* Tarjeta del modal - Ancho aumentado */
.modal-card {
  background: white;
  border-radius: 12px;
  width: 100%;
  height: 95%;
  max-width: 700px; /* Ancho aumentado */
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
  overflow: visible; /* Eliminar scroll interno */
}

/* Header mejorado */
.modal-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1a1a1a;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 4px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  color: #ff4444;
  transform: scale(1.1);
}

/* Formulario ajustado */
.modal-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
  outline: none;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

/* Botones mejorados */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancel,
.btn-save {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-save {
  background: #0066ff;
  color: white;
}

.btn-save:hover {
  background: #0052cc;
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-card {
    max-width: 95%;
  }
  
  .modal-form {
    padding: 1rem;
  }
}
</style>