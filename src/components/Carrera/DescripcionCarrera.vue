<template>
  <div class="descripcion-container">
    <h2 class="titulo">Descripción</h2>
    <p class="contenido">
      {{ descripcion }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DescripcionCarrera',
  props: {
    descripcion: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.descripcion-container {
  width: 100%;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #ddd;
}

.titulo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2b6cb0;
  padding: 0.75rem 1rem 0.5rem;
  margin: 0;
  border-bottom: 1px solid #bee3f8;
}

.contenido {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  padding: 0.5rem 1rem 1rem;
  margin: 0;
}
</style>
