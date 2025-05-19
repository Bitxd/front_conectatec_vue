<template>
  <div class="detalles-universidad" v-if="universidad && universidad.nombre">
    <!-- Header Principal -->
    <div class="universidad-header">
      <div class="nombre-logo">
        <h1 class="nombre">{{ universidad.nombre }}</h1>
        <img :src="universidad.logoUrl" alt="Logo" class="imagen-header" />
      </div>
      
      <div class="header-right">
        <div class="herramientas-container">
          <button class="btn-icono-texto" @click="botonMapa">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M20.5 3l-5.5 2-5-2-5.5 2v15l5.5-2 5 2 5.5-2z"/>
            </svg>
            <span>Mapa Virtual</span>
          </button>
          
          <button class="btn-icono-texto" @click="botonForo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M21 6h-2v9H7l-4 4V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v11h-2V6z"/>
            </svg>
            <span>Foro</span>
          </button>
          
          <button class="btn-icono-texto" @click="botonCalendario">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
            </svg>
            <span>Calendario</span>
          </button>
        </div>
      </div>
    </div>

    <hr class="separador-header">

    <!-- Botones Secundarios -->
    <div class="botones-secundarios">
      <button class="btn-secundario">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zM3 8.73V17h7v-5H8v-1.27L3 8.73zM9 17h6v-3H9v3zm8 0h2v-5.27l-2 0.91V17z"/>
        </svg>
        <span>Carreras</span>
      </button>

      <button class="btn-secundario">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <span>Logros</span>
      </button>

      <button class="btn-secundario">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span>Coordinadores</span>
      </button>

      <button class="btn-secundario">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"/>
        </svg>
        <span>Profesores</span>
      </button>

      <button class="btn-secundario">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <span>Servicio Social</span>
      </button>
    </div>

    <!-- Sección de Información Principal -->
    <div class="info-adicional-dos-columnas">
      <!-- Columna Izquierda -->
      <div class="columna-izquierda">
        <div class="info-card contacto-card">
          <div class="card-title">Contacto</div>
          <ContactoUniversidad :contacto="contactoData"/>
        </div>

        <div class="info-card requisitos-card">
          <div class="card-title">Requisitos de Inscripción</div>
          <RequisitosInscripcion 
            :precio_inscripcion="universidad.precio_inscripcion"
            :fecha_inscripcion="universidad.fecha_inscripcion"
            :documentos_solicitados="universidad.documentos_solicitados"
          />
        </div>
      </div>

      <!-- Columna Derecha -->
      <div class="columna-derecha">
        <div class="info-card descripcion-card">
          <div class="card-title">Acerca de la Universidad</div>
          <DescripcionUniversidad 
            :descripcionData="{
              descripcion: universidad.descripcion,
              historia: universidad.historia,
              mision: universidad.mision,
              vision: universidad.vision,
              valores: universidad.valores
            }"
          />
        </div>
      </div>
    </div>

  </div>

  <div v-else>
    <p class="cargando">Cargando información de la universidad...</p>
  </div>
</template>

<style scoped>
.detalles-universidad {
  padding: 30px 40px;
  background-color: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  box-sizing: border-box;
  max-width: 1400px;
  margin: 0 auto;
}

.universidad-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
  padding-bottom: 20px;
}

.nombre-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-grow: 1;
}

.nombre {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  position: relative;
  padding-left: 15px;
}

.nombre::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 70%;
  width: 4px;
  background: #6366f1;
  border-radius: 2px;
}

.imagen-header {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.header-right {
  flex-shrink: 0;
}

.separador-header {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
  margin: 25px 0;
}

.herramientas-container {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-icono-texto {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #475569;
  font-weight: 500;
}

.btn-icono-texto:hover {
  background: #6366f1;
  border-color: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
}

.btn-icono-texto svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.botones-secundarios {
  display: flex;
  gap: 15px;
  margin: 25px 0;
  flex-wrap: wrap;
}

.btn-secundario {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid #6366f1;
  border-radius: 8px;
  color: #6366f1;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-secundario:hover {
  background: #6366f1;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
}

.btn-secundario svg {
  width: 20px;
  height: 20px;
}

.info-adicional-dos-columnas {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 35px;
  margin-top: 30px;
}

.columna-izquierda {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  overflow: hidden;
}

.card-title {
  background: #f8fafc;
  padding: 18px 25px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.card-title::before {
  content: '';
  display: block;
  width: 5px;
  height: 24px;
  background: #6366f1;
  border-radius: 3px;
}

.contacto-card .card-title::before { background: #6366f1; }
.requisitos-card .card-title::before { background: #22d3ee; }
.descripcion-card .card-title::before { background: #f59e0b; }

.descripcion-card {
  height: 100%;
  min-height: 400px;
}

/* Estilos Responsive */
@media (max-width: 1024px) {
  .detalles-universidad {
    padding: 25px;
  }
  
  .info-adicional-dos-columnas {
    grid-template-columns: 1fr;
  }
  
  .columna-derecha {
    order: -1;
  }
}

@media (max-width: 768px) {
  .universidad-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .herramientas-container {
    width: 100%;
    justify-content: flex-start;
  }
  
  .botones-secundarios {
    gap: 10px;
  }
  
  .btn-secundario {
    flex-grow: 1;
    justify-content: center;
  }
}

.cargando {
  text-align: center;
  padding: 50px;
  color: #64748b;
  font-size: 1.2rem;
}

/* Espaciado interno para los componentes hijos */
.contacto-universidad,
.requisitos-inscripcion,
.descripcion-universidad {
  padding: 25px;
}

.descripcion-universidad section {
  margin-bottom: 30px;
}

.descripcion-universidad h3 {
  color: #1e293b;
  font-size: 1.1rem;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f5f9;
}

.descripcion-universidad p {
  color: #475569;
  line-height: 1.7;
  font-size: 0.95rem;
}
</style>
<script>
import universidadApi from '@/apis/universidadApi'
import tiempoSeccion from '@/services/tiempoSeccion'
import ContactoUniversidad from '@/components/Carrera/ContactoUniversidad.vue'
import RequisitosInscripcion from '@/components/Carrera/RequisitosInscripcion.vue'
import DescripcionUniversidad from '@/components/Carrera/DescripcionUniversidad.vue'



export default {
  name: 'DetallesUniversidad',
  components: {
    ContactoUniversidad,
    RequisitosInscripcion,
    DescripcionUniversidad
  },
  data() {
    return {
      universidad: null,
      startTime: null
    }
  },
  computed: {
    contactoData() {
      if (!this.universidad) return {}
      return {
        telefono: this.universidad.telefono,
        correo_contacto: this.universidad.correo_contacto,
        pagina_web: this.universidad.pagina_web
      }
    }
  },
  async mounted() {
    this.startTime = tiempoSeccion.iniciarConteo()
    const id = this.$route.params.id
    try {
      this.universidad = await universidadApi.obtenerUniversidadPorId(id)
    } catch (e) {
      console.error(e)
    }
  },
  beforeUnmount() {
    tiempoSeccion.finalizarConteo(this.startTime, 'detalles_universidad')
  },
  methods: {
    botonForo() {
      this.$router.push({ name: 'Foro', params: { id: this.universidad.id } })
    },
    botonCalendario() {
      this.$router.push({
        name: 'Calendario',
        params: { id: this.universidad.id },
        query: { nombre: this.universidad.nombre }
      })
    },
    botonMapa() {
      this.$router.push({
        name: 'Mapa',
        params: { id: this.universidad.id },
        query: { nombre: this.universidad.nombre }
      })
    }
  }
}
</script>