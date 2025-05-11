<template>
  <div class="detalles-universidad" v-if="universidad && universidad.nombre">
    <div class="universidad-header">
      <div class="nombre-logo">
        <h1 class="nombre">{{ universidad.nombre }}</h1>
        <img :src="universidad.logoUrl" alt="Logo" class="imagen-header" />
      </div>
      <div class="header-right">
        <HerramientasUniversidadComponent />
        <div class="separator-container"></div>
        <BotonTextoImagenComponent image="/icons/mapa-virtual-icon.svg" text="Mapa Virtual"  @click="botonMapa"/>
        <BotonTextoImagenComponent image="/icons/foro-icon.svg" text="Foro" @click="botonForo" />
        <BotonTextoImagenComponent image="/icons/calendario-icon.svg" text="Calendario" @click="botonCalendario" />
      </div>
    </div>

    <hr class="separador-header" />

    <div class="botones-secundarios">
      <BotonTextoImagenComponent image="/icons/informacion-general-icon.svg" text="Información General" />
      <BotonTextoImagenComponent image="/icons/inscripcion-icon.svg" text="Inscripciones" />
    </div>
  </div>
  <div v-else>
    <p>Cargando información de la universidad...</p>
  </div>
</template>

<script>
import universidadApi from '@/apis/universidadApi';
import BotonTextoImagenComponent from '@/components/BotonTextoImagenComponent.vue';
import HerramientasUniversidadComponent from '@/components/HerramientasUniversidadComponent.vue';
import tiempoSeccion from '@/services/tiempoSeccion';

export default {
  name: 'DetallesUniversidad',
  components: {
    BotonTextoImagenComponent,
    HerramientasUniversidadComponent
  },
  data() {
    return {
      universidad: null,
      startTime: null
    };
  },
  mounted() {
    this.startTime = tiempoSeccion.iniciarConteo();
    this.loadUniversidad();
  },
  beforeUnmount() {
    tiempoSeccion.finalizarConteo(this.startTime, 'detalles_universidad');
  },
  methods: {
    async loadUniversidad() {
      const id = this.$route.params.id;
      try {
        this.universidad = await universidadApi.obtenerUniversidadPorId(id);
      } catch (error) {
        console.error('Error al cargar la universidad:', error);
      }
    },
    botonForo() {
      this.$router.push({ name: 'Foro', params: { id: this.universidad.id } });
    },
    botonCalendario() {
      this.$router.push({
        name: 'Calendario',
        params: { id: this.universidad.id },
        query: { nombre: this.universidad.nombre }
      });
    },
    botonMapa() {
      this.$router.push({
        name: 'Mapa',
        params: { id: this.universidad.id },
        query: { nombre: this.universidad.nombre }
      });
    }
  }
};
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

/* Cabecera */
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

.botones-secundarios {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
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

  .detalle-titulo {
    font-size: 22px;
  }

  .detalle-texto {
    font-size: 16px;
  }
}
</style>
