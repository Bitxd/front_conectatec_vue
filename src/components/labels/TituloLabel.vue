<template>
    <div class="titulo-label" :style="{ background: background }">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: 'TituloLabel',
    props: {
        background: {
            type: String,
            default: 'linear-gradient(135deg, #007bff, #00c6ff)', // fondo por defecto moderno
        },
        text: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped>
.titulo-label {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem; 
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.titulo-label:hover {
  transform: translateY(-2px);
}
</style>
