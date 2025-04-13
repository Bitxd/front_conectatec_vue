<template>
  <div class="tarjeta-publicacion" @click="handleCardClick">
    <div class="tarjeta-header">
      <img class="perfil-img" :src="publicacion.usuario.imagenPerfil" alt="Imagen de perfil" />
      <div class="contenido-principal">
        <div class="titulo-e-interacciones">
          <h2 class="tarjeta-titulo">{{ publicacion.titulo }}</h2>
          <div class="interacciones-horizontales">
            <div class="interaccion">
              <span class="label">Likes</span>
              <span class="valor">{{ publicacion.totalMeGusta }}</span>
            </div>
            <div class="interaccion">
              <span class="label">Comentarios</span>
              <span class="valor">{{ publicacion.totalComentarios }}</span>
            </div>
          </div>
        </div>
        <div class="info-segunda-linea">
          <div class="user-info-container">
            <h3 class="username">{{ publicacion.usuario.username }}</h3>
            <div class="categoria">
              <span class="categoria-punto"></span>
              <span>{{ publicacion.categoria }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de tres puntos -->
      <div class="menu-container">
        <button class="menu-button" @click.stop="toggleMenu">
          <span class="menu-dot"></span>
          <span class="menu-dot"></span>
          <span class="menu-dot"></span>
        </button>

        <!-- Menú desplegable -->
        <div v-if="showMenu" class="menu-flotante" v-click-outside="closeMenu">
          <BotonTextoImagenComponent 
            v-if="esMiPublicacion"
            image="/icons/eliminar-icon.svg"
            altText="Eliminar"
            text="Eliminar"
            @click="handleMenuItemClick('eliminar')"
            class="menu-item"
          />
          <BotonTextoImagenComponent 
            v-else
            image="/icons/advertencia-icon.svg"
            altText="Reportar"
            text="Reportar"
            @click="handleMenuItemClick('reportar')"
            class="menu-item"
          />
          <BotonTextoImagenComponent 
            image="/icons/compartir-icon.svg"
            altText="Compartir"
            text="Compartir"
            @click="handleMenuItemClick('compartir')"
            class="menu-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BotonTextoImagenComponent from '@/components/BotonTextoImagenComponent.vue';

export default {
  name: 'TarjetaPublicacionComponent',
  components: {
    BotonTextoImagenComponent
  },
  props: {
    publicacion: {
      type: Object,
      required: true
    },
    usuarioActualId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMenu: false,
      clickListener: null
    }
  },
  computed: {
    esMiPublicacion() {
      return this.publicacion?.usuario?.idUsuario === this.usuarioActualId;
    }
  },
  methods: {
    handleCardClick() {
      this.closeMenu();
      this.$emit('seleccionada', this.publicacion);
    },
    toggleMenu(e) {
      e.stopPropagation();
      this.closeAllMenus();
      this.showMenu = !this.showMenu;
      
      if (this.showMenu) {
        this.clickListener = (event) => {
          if (!this.$el.contains(event.target)) {
            this.closeMenu();
          }
        };
        document.addEventListener('click', this.clickListener);
      }
    },
    closeMenu() {
      if (this.showMenu) {
        this.showMenu = false;
        if (this.clickListener) {
          document.removeEventListener('click', this.clickListener);
          this.clickListener = null;
        }
      }
    },
    closeAllMenus() {
      window.dispatchEvent(new CustomEvent('close-all-menus'));
    },
    handleMenuItemClick(action) {
      this.closeMenu();
      switch(action) {
        case 'eliminar':
          this.$emit('eliminar', this.publicacion.id);
          break;
        case 'reportar':
          this.$emit('reportar', this.publicacion.id);
          break;
        case 'compartir':
          this.$emit('compartir', this.publicacion.id);
          break;
      }
    }
  },
  created() {
    window.addEventListener('close-all-menus', this.closeMenu);
  },
  beforeUnmount() {  // <-- Cambiado de beforeDestroy a beforeUnmount
    window.removeEventListener('close-all-menus', this.closeMenu);
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  }
}
</script>



<style scoped>
.tarjeta-publicacion {
  background-color: #fff;
  border: none;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  transition: all 0.3s ease;
  position: relative;
}

.tarjeta-publicacion:hover {
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.tarjeta-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.perfil-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.contenido-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.titulo-e-interacciones {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tarjeta-titulo {
  font-size: 18px;
  color: #333;
  margin: 0;
  text-align: left;
}

.interacciones-horizontales {
  display: flex;
  gap: 16px;
}

.interaccion {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.interaccion .label {
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.interaccion .valor {
  font-size: 15px;
  font-weight: bold;
  color: #222;
}

.info-segunda-linea {
  margin-top: 4px;
}

.user-info-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  margin: 0;
  font-size: 15px;
  color: #333;
}

.categoria {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6c5ce7;
  font-weight: 400;
  font-size: 14px;
}

.categoria-punto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6c5ce7;
  box-shadow: 0 0 6px #6c5ce7;
}

/* Estilos para el menú de tres puntos */
.menu-container {
  position: relative;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.menu-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #666;
}

.menu-flotante {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 150px;
  overflow: hidden;
}

.menu-item {
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-icon {
  font-size: 16px;
}
</style>