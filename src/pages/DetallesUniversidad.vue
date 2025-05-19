<template>
  <div class="detalles-universidad" v-if="universidad && universidad.nombre">
    <div class="universidad-header">
      <div class="nombre-logo">
        <h1 class="nombre">{{ universidad.nombre }}</h1>
        <img :src="universidad.logoUrl" alt="Logo" class="imagen-header" />
      </div>
      <div class="header-right">
        <div class="herramientas-container">
          <button class="btn-icono-texto" @click="botonMapa">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
            </svg>
            <span>Mapa Virtual</span>
          </button>
          
          <button class="btn-icono-texto" @click="botonForo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            <span>Foro</span>
          </button>
          
          <button class="btn-icono-texto" @click="botonCalendario">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
            </svg>
            <span>Calendario</span>
          </button>
        </div>
      </div>
    </div>
    <hr class="separador-header" />
    <div class="botones-secundarios">
      <button class="btn-secundario">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <span>Información General</span>
      </button>
      
      <button class="btn-secundario">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
        </svg>
        <span>Inscripciones</span>
      </button>
    </div>
  </div>
  <div v-else>
    <p>Cargando información de la universidad...</p>
  </div>
</template>

<script>
import universidadApi from '@/apis/universidadApi'
import tiempoSeccion from '@/services/tiempoSeccion'

export default {
  name: 'DetallesUniversidad',
  data() {
    return {
      universidad: null,
      startTime: null
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

<style scoped>
.detalles-universidad {
  padding: 20px 30px;
  background-color: #ffffff;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
}

.universidad-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 15px;
  gap: 20px;
}

.nombre-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nombre {
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  padding-left: 10px;
  border-left: 5px solid #800080;
}

.imagen-header {
  width: 32px;
  height: 32px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.separador-header {
  border: none;
  border-top: 2px solid #e0e0e0;
  margin-top: -5px;
  margin-bottom: 20px;
}

/* Estilos botones principales */
.herramientas-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-icono-texto {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2c3e50;
}

.btn-icono-texto:hover {
  background: #2688e4;
  color: white;
  border-color: #0fa7ee;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
}

.btn-icono-texto svg {
  fill: currentColor;
  width: 20px;
  height: 20px;
}

.btn-icono-texto span {
  font-weight: 500;
  font-size: 0.95rem;
}

/* Estilos botones secundarios */
.botones-secundarios {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}

.btn-secundario {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #ffffff;
  border: 2px solid #22c1ff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #006eff;
}

.btn-secundario:hover {
  background: #0572ff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
}

.btn-secundario svg {
  fill: currentColor;
  width: 20px;
  height: 20px;
}

.btn-secundario span {
  font-weight: 600;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .nombre {
    font-size: 24px;
  }

  .universidad-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .herramientas-container {
    flex-wrap: wrap;
  }
  
  .btn-icono-texto,
  .btn-secundario {
    flex: 1 1 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .detalles-universidad {
    padding: 15px;
  }
  
  .btn-icono-texto span,
  .btn-secundario span {
    font-size: 0.85rem;
  }
  
  .btn-secundario {
    padding: 10px 15px;
  }
}
</style>