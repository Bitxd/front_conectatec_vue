<template>
  <div class="consultar-panel">
    <h2>Consulta profesores para agendar asesorías</h2>
    <button class="btn-consultar" @click="abrirModal">Consultar</button>

    <!-- Modal Overlay -->
    <div class="modal-backdrop" v-if="modalVisible" @click.self="cerrarModal">
      <div class="modal-window">
        <button class="modal-close" @click="cerrarModal">&times;</button>
        <h3>Profesores disponibles</h3>
        <input
          v-model="filtro"
          type="search"
          placeholder="Buscar profesores..."
          class="input-buscar"
        />
        <div v-if="loading" class="info-text">Cargando profesores…</div>
        <div v-else-if="!profesores.length" class="info-text">No se encontraron profesores.</div>
        <div class="grid-profesores">
          <div
            v-for="prof in profesoresFiltrados"
            :key="prof._id"
            class="card-profesor"
          >
            <img
              :src="prof.imagen_perfil"
              alt="Foto profesor"
              class="card-img"
            />
            <h4 class="card-nombre">{{ prof.nombre }}</h4>
            <p class="card-correo">{{ prof.correo }}</p>
            <button class="btn-asesoria" @click="solicitarAsesoria(prof)">
              Solicitar asesoría
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.consultar-panel {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
.consultar-panel h2 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
.consultar-panel p {
  margin-bottom: 1.5rem;
  font-size: 1rem;
}
.btn-consultar {
  background: #fff;
  color: #764ba2;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.btn-consultar:hover {
  background: #6a3b8f;
  color: #f3f3f3;
}

/* Modal backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
/* Modal window */
.modal-window {
  background: #fff;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 10px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 12px 24px rgba(0,0,0,0.3);
}
.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #555;
  cursor: pointer;
}
.modal-close:hover {
  color: #000;
}
.modal-window h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  text-align: center;
}
.input-buscar {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.info-text {
  text-align: center;
  color: #666;
  margin: 1rem 0;
}

/* Grid 2x2 */
.grid-profesores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
/* Card */
.card-profesor {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.75rem;
}
.card-nombre {
  font-size: 1.1rem;
  margin: 0.25rem 0;
  color: #333;
}
.card-correo {
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: #555;
  word-break: break-all;
}
.btn-asesoria {
  background: #764ba2;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-asesoria:hover {
  background: #5a3585;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>


<script>
import { obtenerProfesoresPorIdDepartamento } from '@/apis/profesoresApi';

export default {
  name: 'ConsultarProfesores',
  props: {
    departamentoId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      modalVisible: false,
      profesores: [],
      filtro: '',
      loading: false
    };
  },
  computed: {
    profesoresFiltrados() {
      if (!this.filtro) return this.profesores;
      const term = this.filtro.toLowerCase();
      return this.profesores.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.correo.toLowerCase().includes(term)
      );
    }
  },
  methods: {
    abrirModal() {
      this.modalVisible = true;
      this.cargarProfesores();
    },
    cerrarModal() {
      this.modalVisible = false;
      this.filtro = '';
      this.profesores = [];
    },
    async cargarProfesores() {
      this.loading = true;
      try {
        const data = await obtenerProfesoresPorIdDepartamento(this.departamentoId);
        this.profesores = data || [];
      } catch (e) {
        this.profesores = [];
        alert('Error al cargar profesores');
      } finally {
        this.loading = false;
      }
    },
    solicitarAsesoria(prof) {
      alert(`Solicitando asesoría con ${prof.nombre}`);
    }
  }
};
</script>

