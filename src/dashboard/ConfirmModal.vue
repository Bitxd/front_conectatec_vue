<template>
  <transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('cancel')">
      <div class="modal-card modal-confirm">
        <header class="modal-header">
          <h2>{{ title }}</h2>
        </header>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <footer class="modal-footer">
          <button class="btn-cancel" @click="$emit('cancel')">Cancelar</button>
          <button class="btn-confirm" @click="$emit('confirm')">Eliminar</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    show: Boolean,
    title: { type: String, default: 'Confirmar' },
    message: { type: String, default: '¿Estás seguro?' }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  overflow: hidden;
}

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

.btn-cancel {
  background: #ced4da;
  color: #2d3436;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #b0b3b8;
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
