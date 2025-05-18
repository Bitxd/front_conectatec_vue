<template>
  <transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card modal-view">
        <header class="modal-header">
          <h2>{{ note.titulo }}</h2>
          <button class="close-btn" @click="$emit('close')">✕</button>
        </header>
        <div class="modal-body">
          <p>{{ note.contenido }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotaViewModal',
  props: {
    show: Boolean,
    note: { type: Object, default: () => ({ titulo: '', contenido: '' }) }
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
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  overflow: hidden;
}

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

</style>
