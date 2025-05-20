<template>
  <div class="profesores-container">
    <!-- Header -->
    <div class="header">
      <h1 class="page-title">Profesores de {{ universidadNombre }}</h1>
      <div class="search-container">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar profesor o departamento..." 
          class="search-input"
        >
        <svg class="search-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    </div>

    <!-- Grupos de departamentos con sus profesores -->
    <div v-for="group in filteredAndGrouped" :key="group.departamento" class="departamento-group">
      <h2 class="departamento-title">{{ group.departamento }}</h2>
      <div class="profesores-grid">
        <div 
          v-for="prof in group.profesores" 
          :key="prof._id" 
          class="profesor-card"
        >
          <div class="avatar-container">
            <img 
              :src="prof.imagen_perfil" 
              alt="Avatar" 
              class="profesor-avatar"
              onerror="this.src='https://via.placeholder.com/100?text=Profesor'"
            >
          </div>
          <div class="profesor-info">
            <h3 class="nombre">{{ prof.nombre || 'Nombre no disponible' }}</h3>
            <div class="detalles">
              <div class="detalle-item">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
                <p class="texto">{{ prof.correo || 'Correo no disponible' }}</p>
              </div>
              <div class="detalle-item">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <p class="texto">{{ prof.telefono || 'Teléfono no disponible' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje sin resultados -->
    <div v-if="filteredAndGrouped.length === 0" class="no-results">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      </svg>
      <p>No se encontraron profesores</p>
    </div>
  </div>
</template>

<script>
import { obtenerProfesoresPorIdEscuela } from '@/apis/profesoresApi';

export default {
  name: 'ProfesoresPage',
  data() {
    return {
      searchQuery: '',
      profesores: [],
      universidadId: this.$route.params.id,
      universidadNombre: this.$route.query.nombre || 'la universidad'
    };
  },
  async created() {
    try {
      const lista = await obtenerProfesoresPorIdEscuela(this.universidadId);
      // Ordenar la lista por nombre_departamento y luego por nombre
      lista.sort((a, b) => {
        const da = a.nombre_departamento || '';
        const db = b.nombre_departamento || '';
        if (da !== db) return da.localeCompare(db);
        return (a.nombre || '').localeCompare(b.nombre || '');
      });
      this.profesores = lista;
    } catch (error) {
      console.error('Error cargando profesores:', error);
    }
  },
  computed: {
    filteredAndGrouped() {
      const q = this.searchQuery.trim().toLowerCase();
      // Agrupar profesores por departamento
      const groups = {};
      this.profesores.forEach(prof => {
        const dept = prof.nombre_departamento || 'Sin Departamento';
        // Determinar si incluir este profesor
        let include = false;
        if (!q) {
          include = true;
        } else if (dept.toLowerCase().includes(q)) {
          include = true;
        } else if ((prof.nombre || '').toLowerCase().includes(q)) {
          include = true;
        } else if ((prof.correo || '').toLowerCase().includes(q)) {
          include = true;
        } else if ((prof.telefono || '').includes(q)) {
          include = true;
        }
        if (include) {
          if (!groups[dept]) groups[dept] = [];
          groups[dept].push(prof);
        }
      });
      // Transformar a array ordenado
      return Object.keys(groups)
        .sort((a, b) => a.localeCompare(b))
        .map(departamento => ({
          departamento,
          profesores: groups[departamento]
        }));
    }
  }
};
</script>

<style scoped>
.profesores-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.header {
  margin-bottom: 2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}

.page-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-right: auto;
  position: relative;
  display: inline-block;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #3498db;
}

.search-container {
  position: relative;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.9rem 2.8rem 0.9rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  fill: #7f8c8d;
}

.departamento-group + .departamento-group {
  margin-top: 2rem;
}

.departamento-title {
  text-align: left;
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.3rem;
}

.profesores-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.profesor-card {
  display: flex;
  background: white;
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
  border: 1px solid #f0f0f0;
}

.profesor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #e0e0e0;
}

.avatar-container {
  flex-shrink: 0;
  margin-right: 1.2rem;
}

.profesor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f8f9fa;
  background: #f5f5f5;
}

.profesor-info {
  flex: 1;
  min-width: 0;
}

.nombre {
  margin: 0 0 0.8rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detalles {
  display: grid;
  gap: 0.6rem;
}

.detalle-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: #7f8c8d;
}

.texto {
  margin: 0;
  color: #555;
  font-size: 0.85rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: #7f8c8d;
  text-align: center;
}

.no-results .icon {
  width: 50px;
  height: 50px;
  fill: #bdc3c7;
}

@media (max-width: 768px) {
  .profesores-grid {
    grid-template-columns: 1fr;
  }
  .profesor-avatar {
    width: 70px;
    height: 70px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .profesores-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
