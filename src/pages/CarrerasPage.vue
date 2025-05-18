<template>
  <div class="wrapper">
    <div class="container">
      <header class="header">
        <h1 class="title">Carreras</h1>
      </header>

      <div class="search-bar">
        <svg class="search-svg" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          v-model="query"
          placeholder="Buscar..."
          class="search-input"
        />
      </div>

      <section v-if="filteredCarreras.length === 0" class="no-carreras">
        <svg class="empty-svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <p>No hay coincidencias</p>
      </section>

      <section v-else class="grid">
        <article
          v-for="carrera in filteredCarreras"
          :key="carrera._id"
          class="card"
          @click="carreraSeleccionada(carrera)"
          :class="{ selected: selectedCarrera?._id === carrera._id }"
        >
          <div class="card-img-container">
            <img :src="carrera.imagen" :alt="carrera.nombre" class="card-img" />
            <svg class="select-svg" viewBox="0 0 24 24" v-if="selectedCarrera?._id === carrera._id">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>

          <div class="card-content">
            <h2 class="card-title">{{ carrera.nombre }}</h2>
            <div class="card-footer">
              <span class="card-meta">{{ carrera.numero_semestres }} sem.</span>
              <button class="btn">Ver</button>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
import { obtenerCarrerasPorIdEscuela } from '@/apis/carrerasApi'

export default {
  name: 'CarrerasUniversidadPage',
  data() {
    return {
      carreras: [],
      query: '',
      selectedCarrera: null
    }
  },
  computed: {
    filteredCarreras() {
      return this.carreras.filter(c =>
        c.nombre.toLowerCase().includes(this.query.trim().toLowerCase())
      )
    }
  },
  methods: {
    carreraSeleccionada(carrera) {
      this.selectedCarrera = carrera
      this.$router.push({ name: 'Carrera', params: { id: carrera._id } });
 
    }
  },
  async created() {
    const idUniversidad = this.$route.params.id
    const resultado = await obtenerCarrerasPorIdEscuela(idUniversidad)
    if (resultado) this.carreras = resultado
  }
}
</script>

<style scoped>
/* Paleta compacta */
:root {
  --primary: #0A2463;
  --secondary: #3E92CC;
  --accent: #FF1B1C;
  --background: #FFFFFF;
  --text: #2B2D42;
  --light-gray: #F5F7FA;
  --border: #E1E5EE;
}

.wrapper {
  min-height: 100vh;
  background: var(--background);
  padding: 1rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(58, 140, 248);
  margin: 0;
}

.search-bar {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-svg {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  fill: var(--primary);
  opacity: 0.6;
}

.search-input {
  width: 100%;
  padding: 0.6rem 0.6rem 0.6rem 2.2rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--light-gray);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas fijas */
  gap: 1rem;
}

.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid var(--border);
  min-width: 0; /* Fix para textos largos */
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card.selected {
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 2px rgba(255,27,28,0.2);
}

.card-img-container {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.select-svg {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 20px;
  height: 20px;
  fill: white;
  background: var(--accent);
  border-radius: 50%;
  padding: 3px;
}

.card-content {
  padding: 0.75rem;
}

.card-title {
  font-size: 0.95rem; /* Tamaño ligeramente mayor */
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  min-height: 2.6em; /* Espacio para 2 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limitar a 2 líneas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-meta {
  font-size: 0.8rem;
  color: var(--text);
  opacity: 0.7;
}

.btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: var(--secondary);
}

.no-carreras {
  text-align: center;
  padding: 2rem 0;
  color: var(--text);
  opacity: 0.6;
  font-size: 0.9rem;
}

.empty-svg {
  width: 48px;
  height: 48px;
  fill: var(--border);
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets grandes */
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets */
    gap: 0.75rem;
  }
  
  .card-img-container {
    height: 90px; /* Altura ligeramente mayor */
  }
  
  .card-title {
    font-size: 0.9rem;
    min-height: 2.4em;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr; /* 1 columna en móviles */
  }
  
  .card-img-container {
    height: 120px; /* Imagen más alta en móvil */
  }
  
  .card-title {
    -webkit-line-clamp: 3; /* Permitir 3 líneas en móvil */
    min-height: auto;
  }
}
</style>