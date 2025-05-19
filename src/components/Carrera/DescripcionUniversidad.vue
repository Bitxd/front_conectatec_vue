
<script>
export default {
  name: 'DescripcionUniversidad',
  props: {
    descripcionData: {
      type: Object,
      required: true
    }
  }
}
</script>


<template>
  <div class="descripcion-card">
    <h2 class="titulo">Descripción Institucional</h2>
    <div class="scrollable-contenido">
      <p class="texto lead">
        {{ descripcionData.descripcion }}
      </p>

      <div class="seccion" v-if="descripcionData.historia">
        <h3 class="subtitulo"><span class="icono"></span>Historia</h3>
        <p class="texto">{{ descripcionData.historia }}</p>
      </div>

      <div class="seccion" v-if="descripcionData.mision">
        <h3 class="subtitulo"><span class="icono"></span>Misión</h3>
        <p class="texto">{{ descripcionData.mision }}</p>
      </div>

      <div class="seccion" v-if="descripcionData.vision">
        <h3 class="subtitulo"><span class="icono"></span>Visión</h3>
        <p class="texto">{{ descripcionData.vision }}</p>
      </div>

      <div class="seccion" v-if="descripcionData.valores">
        <h3 class="subtitulo"><span class="icono"></span>Valores</h3>
        <ul class="lista">
          <li v-for="(valor, index) in descripcionData.valores" :key="index">
            <span class="bullet"></span>{{ valor }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.descripcion-card {
  max-width: 800px;
  margin: 2rem auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  height: 600px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.titulo {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1a365d;
  position: relative;
  padding-left: 1.5rem;
  letter-spacing: -0.5px;
}

.titulo::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 80%;
  background: linear-gradient(135deg, #22c1ff, #2d8bfb);
  border-radius: 4px;
}

.scrollable-contenido {
  overflow-y: auto;
  padding-right: 1rem;
  scroll-behavior: smooth;
  height: calc(100% - 60px);
}

/* Scrollbar personalizada */
.scrollable-contenido::-webkit-scrollbar {
  width: 8px;
}

.scrollable-contenido::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #22c1ff, #2d8bfb);
  border-radius: 4px;
}

.scrollable-contenido::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.seccion {
  margin-bottom: 2.5rem;
  padding-left: 1.5rem;
}

.subtitulo {
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}


.icono {
  font-size: 1.2em;
  transform: translateY(-1px);
}

.texto {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  letter-spacing: 0.2px;
}

.texto.lead {
  font-size: 1.2rem;
  color: #2d3748;
  font-weight: 500;
}

.lista {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

.lista li {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border-radius: 6px;
  transition: transform 0.2s ease;
}

.lista li:hover {
  transform: translateX(8px);
  background: linear-gradient(90deg, #f8fafc, #e2e8f0);
}

.bullet {
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #22c1ff, #2d8bfb);
  border-radius: 50%;
  margin-right: 1rem;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(34, 193, 255, 0.2);
}
</style>