<template>
  <div class="foro-page">
    <header class="foro-header">
      <div class="header-left">
        <TituloLabel text="Foro" background="#ae1be4" />
        <!-- Se muestra el nombre del foro obtenido; si no, se muestra "Universidad" -->
        <UniversidadLabel class="titulo-universidad" :text="foro?.nombre || 'Universidad'" />
      </div>
      <div class="header-right">
        <BotonTextoImagenComponent image="/icons/agregar-icon.svg" altText="Publicar" text="Publicar" />
        <BotonImagenComponent image="/icons/filtrar-icon.svg" altText="Filtrar" description="Filtrar" />
      </div>
    </header>

    <EntradaTextoComponent
      class="entrada-foro"
      placeholder="Buscar en el foro..."
      icon="/icons/busqueda-icon.svg"
    />

    <hr class="separator" />

    <div class="foro-info">
      <h2 class="foro-subtitulo">Lista de publicaciones</h2>
      <p class="foro-recordatorio">Recuerda ser amable con la comunidad</p>
    </div>

    <div class="contenedor-publicaciones">
      <div v-for="publicacion in publicaciones" :key="publicacion.idPublicacion" class="tarjeta-publicacion">
        <div class="tarjeta-header">
          <img class="perfil-img" :src="publicacion.usuario.imagenPerfil" alt="Imagen de perfil" />
          <div class="usuario-info">
            <h3 class="username">{{ publicacion.usuario.username }}</h3>
            <p class="fullname">{{ publicacion.usuario.fullname }}</p>
          </div>
        </div>
        <h2 class="tarjeta-titulo">{{ publicacion.titulo }}</h2>
        <div v-if="publicacion.imagenPublicacion" class="tarjeta-imagen">
          <img :src="publicacion.imagenPublicacion" alt="Imagen de publicación" />
        </div>
        <div class="tarjeta-footer">
          <div class="categoria">
            <span class="categoria-punto"></span>
            <span>{{ publicacion.categoria }}</span>
          </div>
          <span class="me-gusta">👍 {{ publicacion.totalMeGusta }}</span>
          <span class="comentarios">💬 {{ publicacion.totalComentarios }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BotonTextoImagenComponent from '@/components/BotonTextoImagenComponent.vue';
import BotonImagenComponent from '@/components/BotonImagenComponent.vue';
import EntradaTextoComponent from '@/components/EntradaTextoComponent.vue';
import TituloLabel from '@/components/labels/TituloLabel.vue';
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue';
import obtenerForoPorEscuela from '@/apis/foroApi'; // Función que realiza la petición GET

export default {
  name: 'ForoPage',
  components: {
    BotonTextoImagenComponent,
    BotonImagenComponent,
    EntradaTextoComponent,
    TituloLabel,
    UniversidadLabel,
  },
  data() {
    return {
      foro: null,
      publicaciones: []
    };
  },
  async mounted() {
    try {
      const idEscuela = this.$route.params.id;
      const data = await obtenerForoPorEscuela(idEscuela);
      if (data) {
        this.foro = data.foro;
        this.publicaciones = data.publicaciones;
        // Verificamos si 'publicaciones' tiene datos antes de mostrar la alerta
        if (this.publicaciones && this.publicaciones.length > 0) {
          alert('Publicaciones cargadas correctamente.');
          // Mostrar el título de la primera publicación
          alert(`Primer publicación: ${this.publicaciones[0].titulo}`);
        } else {
          alert('No se encontraron publicaciones.');
        }
      } else {
        alert('No se recibió datos del foro.');
      }
    } catch (error) {
      console.error('Error al obtener datos del foro:', error);
      alert('Ocurrió un error al cargar las publicaciones.');
    }
  }
};
</script>




<style scoped>
.foro-page {
  background-color: #fff;
  color: #333;
}

/* Estilos para la cabecera */
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

.header-right > *:not(:last-child) {
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

/* Contenedor para las publicaciones */
.contenedor-publicaciones {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Estilos para TarjetaPublicacionComponent */
.tarjeta-publicacion {
  background-color: #fff;
  border: 1px solid #f7f7f7;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tarjeta-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.perfil-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.usuario-info {
  margin-left: 10px;
}

.username {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.fullname {
  margin: 0;
  font-size: 12px;
  color: #777;
}

.tarjeta-titulo {
  font-size: 18px;
  color: #333;
  margin: 10px 0;
}

.tarjeta-contenido {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.tarjeta-imagen img {
  width: 100%;
  border-radius: 4px;
}

.tarjeta-footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #777;
  margin-top: 10px;
}

.tarjeta-footer span {
  margin-right: 10px;
}
</style>
