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

    <div class="foro-info">
      <h2 class="foro-subtitulo">Lista de publicaciones</h2>
      <p class="foro-recordatorio">Recuerda ser amable con la comunidad</p>
    </div>

    <div class="contenedor-publicaciones">
      <TarjetaPublicacionComponent v-for="publicacion in publicaciones" :key="publicacion.idPublicacion"
        :publicacion="publicacion" :usuarioActualId="usuarioActualId" @seleccionada="handleSeleccion" />
    </div>
  </div>

  <!-- Componente de notificación -->
  <NotificationComponent :message="notificationMessage" :notificationType="notificationType"
    @clear-message="notificationMessage = ''" />

  <!-- Modal para crear publicación -->
  <CrearPublicacionComponent
    v-if="mostrarModalCrearPublicacion"
    :foro-id="foro?._id"
    @cerrar-modal="cerrarModalCrearPublicacion"
  />
</template>

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
  methods:
  {
    handleSeleccion(publicacion)
    {

      console.log('Publicación seleccionada:', publicacion)
    },
    crearPublicacion()
    {
      if (!authService.isAuthenticated())
      {
        this.notificationMessage = 'Debes iniciar sesión para publicar.';
        this.notificationType = 'error';
        return;
      }
      this.mostrarModalCrearPublicacion = true;
    },
    cerrarModalCrearPublicacion()
    {
      this.mostrarModalCrearPublicacion = false;
    }
  },
  async mounted()
  {
    // obtenemos el id actual del usuario
    this.usuarioActualId = await authService.getIdUser();


    try
    {
      const idEscuela = this.$route.params.id;
      const responseForo = await foroApi.obtenerForoPorEscuela(idEscuela);
      const responsePublicaciones = await obtenerPublicacionesIdForo(responseForo.foro._id);
      if (responseForo && responsePublicaciones)
      {
        this.foro = responseForo.foro;
        this.publicaciones = responsePublicaciones.publicaciones;

        console.log("PUBLICACIONES DEL FORO:\n", JSON.stringify(this.publicaciones, null, 2));

      }
    }
    catch (error)
    {
      console.error('Error al obtener datos:', error);
    }
  }
}
</script>



<style scoped>
.foro-page {
  background-color: #fff;
  color: #333;
}

.foro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right>*:not(:last-child) {
  margin-right: 16px;
}

.entrada-foro {
  width: 60%;
  max-width: 500px;
  margin: 20px auto 12px;
  display: block;
}

.separator {
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 0 20px 24px;
}

.foro-info {
  text-align: left;
  margin: 0 20px 24px;
}

.foro-subtitulo {
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 6px;
}

.foro-recordatorio {
  font-size: 14px;
  color: #777;
  margin: 0;
}

.titulo-universidad {
  margin-left: 18px;
}

.contenedor-publicaciones {
  width: 95%;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  gap: 0;
}
</style>
