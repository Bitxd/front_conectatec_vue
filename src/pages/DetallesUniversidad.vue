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
            <!-- Icono de mapa -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M20.5 3l-5.5 2-5-2-5.5 2v15l5.5-2 5 2 5.5-2z"/>
            </svg>
            <span>Mapa Virtual</span>
          </button>

          <button class="btn-icono-texto" @click="botonForo">
            <!-- Icono de foro -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M21 6h-2v9H7l-4 4V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v11h-2V6z"/>
            </svg>
            <span>Foro</span>
          </button>

          <button class="btn-icono-texto" @click="botonCalendario">
            <!-- Icono de calendario -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
            </svg>
            <span>Calendario</span>
          </button>
        </div>
      </div>
    </div>
    <hr class="separador-header" />
    <div class="botones-secundarios">
      <button class="btn-secundario">
        <!-- Icono de carreras -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zM3 8.73V17h7v-5H8v-1.27L3 8.73zM9 17h6v-3H9v3zm8 0h2v-5.27l-2 0.91V17z"/>
        </svg>
        <span>Carreras</span>
      </button>

      <button class="btn-secundario">
        <!-- Icono de logros -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <span>Logros</span>
      </button>

      <button class="btn-secundario">
        <!-- Icono de coordinadores -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span>Coordinadores</span>
      </button>

      <button class="btn-secundario">
        <!-- Icono de profesores -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"/>
        </svg>
        <span>Profesores</span>
      </button>
    </div>
  </div>
  
  <div v-else>
    <p>Cargando información de la universidad...</p>
  </div>
</template>

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

/* Botones principales compactos */
.herramientas-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-icono-texto {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #2c3e50;
}

.btn-icono-texto:hover {
  background: #2688e4;
  color: white;
  border-color: #0fa7ee;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.btn-icono-texto svg {
  fill: currentColor;
  width: 18px;
  height: 18px;
}

.btn-icono-texto span {
  font-weight: 500;
  font-size: 0.85rem;
}

/* Botones secundarios compactos */
.botones-secundarios {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn-secundario {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #ffffff;
  border: 2px solid #22c1ff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #006eff;
}

.btn-secundario:hover {
  background: #0572ff;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.btn-secundario svg {
  fill: currentColor;
  width: 18px;
  height: 18px;
}

.btn-secundario span {
  font-weight: 600;
  font-size: 0.9rem;
}


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
    gap: 8px;
  }
  
  .btn-icono-texto {
    flex: 1 1 auto;
    padding: 6px 10px;
  }
  
  .btn-secundario {
    flex: 1 1 160px;
    justify-content: center;
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  .detalles-universidad {
    padding: 15px;
  }
  
  .btn-icono-texto span {
    font-size: 0.75rem;
  }
  
  .btn-secundario span {
    font-size: 0.8rem;
  }
  
  .btn-secundario {
    padding: 6px 10px;
  }
}
</style>

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
