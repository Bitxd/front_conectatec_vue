<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Coordinadores de <span class="highlight">{{ nombreEscuela }}</span></h1>
      </div>
      <div class="search-container">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchQuery"
          @input="filterCoordinadores"
          placeholder="Buscar coordinadores por nombre o área..."
          class="search-input"
        />
      </div>
    </header>
    
    <main class="main-content">
      <div v-if="filteredCoordinadores.length" class="cards-container">
        <div v-for="c in filteredCoordinadores" :key="c._id" class="card">
          <div class="card-image-container">
            <img :src="c.imagen_perfil || 'https://via.placeholder.com/150?text=Sin+imagen'" class="card-img" />
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ c.nombre }}</h2>
            <div class="card-field">
              <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{{ c.correo || 'Correo no disponible' }}</span>
            </div>
            <div class="card-field">
              <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{{ c.telefono || 'Teléfono no disponible' }}</span>
            </div>
            <div class="card-field">
              <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>{{ c.coordinacion || 'Área no especificada' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-results">
        <svg class="no-results-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>No se encontraron coordinadores</h3>
        <p>Intenta con otro término de búsqueda</p>
      </div>
    </main>
  </div>
</template>

<script>
import { obtenerCoordinadoresPorIdEscuela } from "@/apis/coordinadorApi";

export default {
  name: "CoordinadoresPage",
  data() {
    return {
      coordinadores: [],
      filteredCoordinadores: [],
      searchQuery: "",
      idEscuela: this.$route.params.id,
      nombreEscuela: this.$route.query.nombre || ""
    };
  },
  mounted() {
    this.fetchCoordinadores();
  },
  methods: {
    async fetchCoordinadores() {
      const data = await obtenerCoordinadoresPorIdEscuela(this.idEscuela);
      if (data) {
        this.coordinadores = data;
        this.filteredCoordinadores = data;
      }
    },
    filterCoordinadores() {
      const q = this.searchQuery.trim().toLowerCase();
      this.filteredCoordinadores = q
        ? this.coordinadores.filter(c =>
            c.nombre.toLowerCase().includes(q) ||
            (c.coordinacion || '').toLowerCase().includes(q)
          )
        : this.coordinadores;
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --accent-color: #4895ef;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-color: #6c757d;
  --light-gray: #e9ecef;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: white;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header-content {
  text-align: center;
}

.page-title {
  font-size: 2.2rem;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.highlight {
  color: var(--primary-color);
}


.search-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--gray-color);
}

.search-input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 3rem;
  font-size: 1rem;
  border: 2px solid var(--light-gray);
  border-radius: var(--border-radius);
  transition: var(--transition);
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(72, 149, 239, 0.2);
}

.main-content {
  padding: 1rem 0;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: row;
  border: 1px solid var(--light-gray);
  min-height: 180px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-image-container {
  width: 150px;
  height: auto;
  overflow: hidden;
  border-right: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.card:hover .card-img {
  transform: scale(1.03);
}

.card-body {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  color: var(--dark-color);
  font-weight: 600;
}

.card-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: var(--gray-color);
  font-size: 0.9rem;
}

.field-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--primary-color);
}

.no-results {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--gray-color);
}

.no-results-icon {
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
}

.no-results p {
  font-size: 1rem;
  margin: 0;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .cards-container {
    grid-template-columns: 1fr;
  }
  
  .card {
    flex-direction: column;
    min-height: auto;
  }
  
  .card-image-container {
    width: 100%;
    height: 200px;
    border-right: none;
    border-bottom: 1px solid var(--light-gray);
  }
}
</style>