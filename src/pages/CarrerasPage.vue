<template>
  <div class="wrapper">
    <div class="container">
      <header class="header">
        <h1 class="title">Carreras</h1>
      </header>

      <div class="search-bar">
        <input
          type="text"
          v-model="query"
          placeholder="Buscar carrera…"
        />
      </div>

      <section v-if="filteredCarreras.length === 0" class="no-carreras">
        <p>No se encontraron carreras disponibles</p>
      </section>

      <section v-else class="grid">
        <article
          v-for="carrera in filteredCarreras"
          :key="carrera._id"
          class="card"
        >
          <div class="card-img-container">
            <img :src="carrera.imagen" :alt="carrera.nombre" class="card-img" />
          </div>

          <div class="card-content">
            <h2 class="card-title">{{ carrera.nombre }}</h2>
            <span class="card-meta">{{ carrera.numero_semestres }} sem.</span>
            <button class="btn">Ver Detalles</button>
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
      query: ''
    }
  },
  computed: {
    filteredCarreras() {
      return this.carreras.filter(c =>
        c.nombre.toLowerCase().includes(this.query.trim().toLowerCase())
      )
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
.wrapper {
  min-height: 100vh;
  background: #ffffff;
  padding: 1rem;
}
.container {
  width: 100%;
  padding: 0 1rem;
}
.header {
  text-align: center;
  margin-bottom: 2rem;
}
.title {
  font-size: 2rem;
  font-weight: normal;
  color: black;
  margin-bottom: 0.5rem;
  text-align: left;
}


.search-bar {
  margin-bottom: 1.5rem;
  text-align: left;
}
.search-bar input {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
.card {
  background: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.12);
}
.card-img-container {
  width: 100%;
  height: 120px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.card:hover .card-img {
  transform: scale(1.05);
}
.card-content {
  padding: 1rem;
  text-align: left;
}
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}
.card-meta {
  font-size: 0.85rem;
  color: #475569;
  margin-bottom: 0.75rem;
}
.btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}
.btn:hover {
  background: #2563eb;
}
</style>
