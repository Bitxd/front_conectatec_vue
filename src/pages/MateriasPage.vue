<template>
  <div class="materias-page">
    <header class="page-header">
      <div class="title-container">
        <svg class="university-icon" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 5v14m-7-7h14M5.5 8.5L12 5l6.5 3.5M12 5l6.5 3.5L12 12 5.5 8.5"/>
        </svg>
        <h1 class="page-title">{{ universidadNombre }}</h1>
      </div>
      <p class="page-subtitle">Catálogo académico de asignaturas</p>
    </header>

    <div class="search-container">
      <svg class="search-icon" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314z"/>
      </svg>
      <input
        type="text"
        v-model="searchQuery"
        @input="filtrarMaterias"
        placeholder="Buscar materia..."
        class="search-input"
      />
    </div>

    <div v-if="materiasFiltradas.length" class="materias-grid">
      <article
        v-for="materia in materiasFiltradas"
        :key="materia._id"
        class="materia-card"
      >
        <div class="materia-header">
          <h3 class="materia-title">{{ materia.nombre }}</h3>
          <div class="creditos-badge">
            <svg class="icon-sm" viewBox="0 0 16 16">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.2" d="M8 1v14M1 8h14M13 3L8 8l-5-5"/>
            </svg>
            <span>{{ materia.creditos }} créditos</span>
          </div>
        </div>
        <div class="materia-body">
          <p class="materia-info">
            <svg class="icon-sm" viewBox="0 0 16 16">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.2" d="M1 4h14v9H1V4zm3-3v3m8-3v3M4 8h2m3 0h2M4 11h2m3 0h2"/>
            </svg>
            Semestre {{ materia.semestre }}
          </p>
        </div>
      </article>
    </div>
    <p v-else class="no-result">No se encontraron coincidencias</p>
  </div>
</template>

<style scoped>
.materias-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.university-icon {
  width: 40px;
  height: 40px;
  stroke: #2c3e50;
}

.page-title {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.page-subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 1rem;
}

.search-container {
  max-width: 600px;
  margin: 0 auto 2.5rem;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.materias-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 0 1rem;
}

.materia-card {
  background: white;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.materia-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.materia-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.materia-title {
  font-size: 1.125rem;
  color: #1f2937;
  margin: 0;
  font-weight: 600;
  line-height: 1.4;
}

.creditos-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: #f8fafc;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #3b82f6;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.materia-body {
  margin-top: 1rem;
}

.materia-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.no-result {
  text-align: center;
  color: #9ca3af;
  padding: 2rem;
  font-size: 0.875rem;
}
</style>

<script>
import { obtenerMateriasPorIdUniversidad } from '@/apis/materiasApi';

export default {
  name: 'MateriasPage',
  data() {
    return {
      searchQuery: '',
      materias: [],
      materiasFiltradas: [],
      universidadId: this.$route.params.id,
      universidadNombre: this.$route.query.nombre || 'la universidad'
    };
  },
  async created() {
    console.log(
      `Sección de materias: universidadId=${this.universidadId}, nombre=${this.universidadNombre}`
    );

    const data = await obtenerMateriasPorIdUniversidad(this.universidadId);
    if (data) {
      this.materias = data;
      this.materiasFiltradas = [...data];
    } else {
      console.error('No fue posible cargar las materias.');
    }
  },
  methods: {
    filtrarMaterias() {
      if (!this.searchQuery) {
        this.materiasFiltradas = [...this.materias];
        return;
      }
      const q = this.searchQuery.toLowerCase();
      this.materiasFiltradas = this.materias.filter(m =>
        m.nombre?.toLowerCase().includes(q)
      );
    }
  }
};
</script>

