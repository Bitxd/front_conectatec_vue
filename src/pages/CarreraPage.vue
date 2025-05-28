<style scoped>
:root {
  --primary-color: #1e88e5;
  --secondary-color: #1565c0;
  --accent-color: #26a69a;
  --bg-light: #f5f7fa;
  --bg-dark: #ffffff;
  --text-color: #333333;
  --border-color: #ccc;
  --materia-bg: #eef6fd;
}

.carrera-page {
  background: var(--bg-light);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  color: var(--text-color);
}

.contenido-principal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.info-carrera {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-dark);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.carrera-imagen {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid var(--primary-color);
}

.info-texto h3 {
  margin: 0;
  font-size: 1.1rem;
}

.info-texto p {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: var(--secondary-color);
}


.contenido-flex {
  display: flex;
  gap: 16px;
  width: 100%;
}

.acordeon-container {
  width: 100%;
  max-width: 360px;
  max-height: 450px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-dark);
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.titulo-acordeon {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 6px;
}

.semestre-compacto+.semestre-compacto {
  margin-top: 10px;
}

.acordeon-btn-compacto {
  background-color: var(--primary-color);
  color: var(--bg-dark);
  cursor: pointer;
  padding: 10px 14px;
  width: 100%;
  border: 1px solid var(--border-color);
  text-align: left;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.acordeon-btn-compacto:hover {
  background-color: var(--secondary-color);
}

.acordeon-btn-compacto[aria-expanded="true"] {
  background-color: var(--accent-color);
}

.arrow {
  border: solid var(--bg-dark);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(45deg);
  transition: transform 0.3s;
}

.arrow.active {
  transform: rotate(-135deg);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}

.panel-compacto {
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 6px 6px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.panel-compacto ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.materia-item {
  display: flex;
  align-items: center;
  background: var(--materia-bg);
  border-radius: 4px;
  margin-bottom: 8px;
  overflow: hidden;
}

.materia-accent {
  width: 4px;
  background-color: var(--accent-color);
  height: 100%;
}

.materia-detalle {
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.materia-detalle h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.materia-detalle span {
  font-size: 0.85rem;
  color: var(--secondary-color);
}


.acordeon-container::-webkit-scrollbar,
.panel-compacto::-webkit-scrollbar {
  width: 8px;
}

.acordeon-container::-webkit-scrollbar-track,
.panel-compacto::-webkit-scrollbar-track {
  background: #e0e0e0;
}

.acordeon-container::-webkit-scrollbar-thumb,
.panel-compacto::-webkit-scrollbar-thumb {
  background-color: #90caf9;
  border-radius: 4px;
}

.btn-residencias {
  top: 5%;
  padding: 0.625rem 1.25rem;
  background-color: #4f46e5;
  color: white;
  font-weight: 500;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.4);
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  user-select: none;
}

.btn-residencias:hover {
  background-color: #4338ca;
  box-shadow: 0 6px 8px rgba(67, 56, 202, 0.6);
}

.btn-residencias:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.6);
}

.btn-buscar-libros {
  background-color: #3182ce;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-buscar-libros:hover {
  background-color: #2b6cb0;
}

.contenedor-secundario {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 16px;
  height: 20%;
  min-width: 25%;
  max-width: 30%;
}

.contenedor-secundario > * {
  flex: 1;
  min-width: 100%;
  min-height: 100%;
  height: auto;
}

.contenedor-secundario > *:first-child {
  height: 50%; 
}

.contenedor-secundario > *:nth-child(2) {
  height: 40%; 
  margin-top: -3px; 
}


</style>

<template>
  <div class="carrera-page">
    <div class="contenido-principal">
      <!-- Datos de la carrera -->
      <div class="info-carrera" v-if="carrera">
        <img v-if="carrera.imagen" :src="carrera.imagen" alt="Imagen de la carrera" class="carrera-imagen" />
        <div class="info-texto">
          <h3>{{ carrera.nombre }}</h3>
          <p>Semestres: {{ carrera.numero_semestres }}</p>
        </div>

        <!-- Botón para abrir modal de residencias -->
        <button @click="mostrarModal = true" class="btn-residencias">
          Proyectos residencias
        </button>

        <button class="btn-residencias" @click="abrirBuscaLibros">
          Buscar libros
        </button>
      </div>

      <!-- Contenedor principal flex -->
      <div class="contenido-flex" v-if="!loading && materiasPorSemestre.length">
        <!-- Acordeón de materias -->
        <div class="acordeon-container">
          <h2 class="titulo-acordeon">Materias por Semestre</h2>
          <div v-for="(materias, index) in materiasPorSemestre" :key="index" class="semestre-compacto">
            <button class="acordeon-btn-compacto" @click="toggleSemestre(index)" :aria-expanded="activeIndex === index">
              <span>{{ index + 1 }}º Semestre</span>
              <i class="arrow" :class="{ active: activeIndex === index }"></i>
            </button>
            <transition name="slide-fade">
              <div class="panel-compacto" v-show="activeIndex === index">
                <ul>
                  <li v-for="materia in materias" :key="materia._id" class="materia-item">
                    <div class="materia-accent"></div>
                    <div class="materia-detalle">
                      <h4>{{ materia.nombre }}</h4>
                      <span>{{ materia.creditos }} créditos</span>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="contenedor-secundario">
          <TarjetaCoordinador :idCarrera="id" />
          <ConsultarProfesores :departamentoId="carrera.departamento" />
        </div>


      </div>

      <!-- Mensajes de carga o error -->
      <div v-if="loading" class="texto-centro">Cargando datos de la carrera…</div>
      <div v-else-if="error" class="texto-error">
        Ocurrió un error al cargar la información.
      </div>
    </div>

    <!-- Modal de residencias -->
    <ResidenciasComponent v-if="carrera" :idCarrera="carrera._id" :mostrar="mostrarModal"
      @cerrar="mostrarModal = false" />

    <!-- Modal de buscar libros-->
    <BuscaLibrosModal v-if="showBuscaLibros" :show="showBuscaLibros" @close="cerrarBuscaLibros" />

  </div>
</template>

<script>
import { obtenerCarreraPorId } from '@/apis/carrerasApi';
import { obtenerMateriasPorIdCarrera } from '@/apis/materiasApi';
import ResidenciasComponent from '@/components/Carrera/ResidenciasComponent.vue';
import BuscaLibrosModal from '@/components/Carrera/BuscarLibrosModal.vue';
import TarjetaCoordinador from '@/components/Carrera/TarjetaCoordinador.vue';
import ConsultarProfesores from '@/components/Carrera/ConsultarProfesores.vue';


export default {
  name: 'CarreraPage',
  components: {
    ResidenciasComponent,
    BuscaLibrosModal,
    TarjetaCoordinador,
    ConsultarProfesores
  },
  data() {
    return {
      id: this.$route.params.id,
      carrera: null,
      materiasPorSemestre: [],
      loading: true,
      error: false,
      activeIndex: null,
      mostrarModal: false,
      showBuscaLibros: false
    };
  },
  async created() {
    // Guardar el ID actual en localStorage al entrar a la página
    localStorage.setItem('idActualCarrera', this.id);
    try {
      await this.fetchCarrera();
      await this.fetchMaterias();
    } catch (e) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async fetchCarrera() {
      this.carrera = await obtenerCarreraPorId(this.id);
    },
    async fetchMaterias() {
      const materias = await obtenerMateriasPorIdCarrera(this.id);
      if (materias && materias.length) {
        const grouped = materias.reduce((acc, m) => {
          (acc[m.semestre] = acc[m.semestre] || []).push(m);
          return acc;
        }, {});
        this.materiasPorSemestre = Object.keys(grouped)
          .sort((a, b) => a - b)
          .map(key => grouped[key]);
      }
    },
    toggleSemestre(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    abrirBuscaLibros() {
      this.showBuscaLibros = true;
    },
    cerrarBuscaLibros() {
      this.showBuscaLibros = false;
    }
  }
};
</script>