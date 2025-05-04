<template>
  <div class="foro-page">
    <header class="foro-header">
      <div class="header-left">
        <TituloLabel text="Foro" background="#ae1be4" />
        <UniversidadLabel class="titulo-universidad" :text="foro?.nombre || 'Universidad'" />
      </div>
      <div class="header-right">
        <BotonTextoImagenComponent image="/icons/agregar-icon.svg" altText="Publicar" text="Publicar"
          @click="crearPublicacion" />
        <BotonImagenComponent image="/icons/filtrar-icon.svg" altText="Filtrar" description="Filtrar" />
      </div>
    </header>

    <EntradaTextoComponent class="entrada-foro" placeholder="Buscar en el foro..." icon="/icons/busqueda-icon.svg" />

    <hr class="separator" />


    <div class="contenedor-publicaciones">
      <TarjetaPublicacionComponent v-for="publicacion in publicaciones" :key="publicacion.idPublicacion"
        :publicacion="publicacion" :usuarioActualId="usuarioActualId" @seleccionada="handleSeleccion" />
    </div>
  </div>

  <!-- Componente de notificación -->
  <NotificationComponent :message="notificationMessage" :notificationType="notificationType"
    @clear-message="notificationMessage = ''" />

  <!-- Modal para crear publicación -->
  <CrearPublicacionComponent v-if="mostrarModalCrearPublicacion" :foro-id="foro?._id"
    @cerrar-modal="cerrarModalCrearPublicacion" />
</template>



<style scoped>
.foro-page {
  height: 100vh;            
  overflow: hidden;      
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.foro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.titulo-universidad {
  font-size: 1.4rem;
  color: #333;
  font-weight: 600;
}

.header-right {
  display: flex;
  gap: 15px;
  align-items: center;
}

.entrada-foro {
  margin: 20px 40px;
  width: calc(100% - 80px);
}

.separator {
  border: 0;
  height: 1px;
  background: #e0e0e0;
  margin: 0 40px;
}

.contenedor-publicaciones {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px 40px;
  margin: 0 20px;
}

/* Estilos de scrollbar personalizados */
.contenedor-publicaciones::-webkit-scrollbar {
  width: 8px;
}

.contenedor-publicaciones::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.contenedor-publicaciones::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.contenedor-publicaciones::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<script>
import BotonTextoImagenComponent from '@/components/BotonTextoImagenComponent.vue'
import BotonImagenComponent from '@/components/BotonImagenComponent.vue'
import EntradaTextoComponent from '@/components/EntradaTextoComponent.vue'
import TituloLabel from '@/components/labels/TituloLabel.vue'
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue'
import TarjetaPublicacionComponent from '@/components/forum/TarjetaPublicacionComponent.vue'
import NotificationComponent from '@/components/alerts/NotificationComponent.vue'
import CrearPublicacionComponent from '@/components/forum/CrearPublicacionComponent.vue'
import foroApi from '@/apis/foroApi'
import { obtenerPublicacionesIdForo } from '@/apis/publicacionApi'
import authService from '@/services/authService'

export default {
  name: 'ForoPage',
  components: {
    BotonTextoImagenComponent,
    BotonImagenComponent,
    EntradaTextoComponent,
    TituloLabel,
    UniversidadLabel,
    TarjetaPublicacionComponent,
    NotificationComponent,
    CrearPublicacionComponent,
  },
  data() {
    return {
      foro: null,
      publicaciones: [],
      notificationMessage: '',
      notificationType: '',
      mostrarModalCrearPublicacion: false,
      usuarioActualId: ''
    }
  },
  methods: {
    handleSeleccion(publicacion) {
      console.log('Publicación seleccionada:', publicacion)
    },
    crearPublicacion() {
      if (!authService.isAuthenticated()) {
        this.notificationMessage = 'Debes iniciar sesión para publicar.'
        this.notificationType = 'error'
        return
      }
      this.mostrarModalCrearPublicacion = true
    },
    cerrarModalCrearPublicacion() {
      this.mostrarModalCrearPublicacion = false
    }
  },
  async mounted() {
    this.usuarioActualId = await authService.getIdUser()

    try {
      const idEscuela = this.$route.params.id
      const responseForo = await foroApi.obtenerForoPorEscuela(idEscuela)

      // Asignar el foro de inmediato para que su nombre se renderice
      this.foro = responseForo.foro

      const responsePublicaciones = await obtenerPublicacionesIdForo(this.foro._id)
      if (responsePublicaciones && responsePublicaciones.publicaciones) {
        this.publicaciones = responsePublicaciones.publicaciones
      }
    } catch (error) {
      console.error('Error al obtener datos:', error)
    }
  }
}
</script>
