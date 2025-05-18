<template>
  <div class="contenedor">
    <h1 class="titulo">¡Bienvenido a MiApp!</h1>
    <p class="descripcion">Gracias por visitarnos. Esperamos que disfrutes la experiencia.</p>
    <button class="boton">Empezar</button>
  </div>
</template>

<script>
export default {
  name: 'PagPrincipal'
}
</script>

<style scoped>
.contenedor {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f0f4ff;
  padding: 2rem;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.descripcion {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
  max-width: 600px;
}

.boton {
  background-color: #2563eb;
  color: white;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.boton:hover {
  background-color: #1d4ed8;
}
</style>
