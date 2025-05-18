<template>
  <transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card modal-form-card">
        <header class="modal-header form-header">
          <h2>Editar nota</h2>
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
            <button type="submit" class="btn-save">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'EditarNota',
  props: {
    show: Boolean,
    note: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const local = reactive({ titulo: '', contenido: '' })

    // Actualizar local cuando cambie la nota
    watch(() => props.note, (n) => {
      local.titulo = n.titulo || ''
      local.contenido = n.contenido || ''
    }, { immediate: true })

    const onSubmit = () => {
      emit('submit', {
        titulo: local.titulo.trim(),
        contenido: local.contenido.trim()
      })
    }

    return { local, onSubmit }
  }
}
</script>
