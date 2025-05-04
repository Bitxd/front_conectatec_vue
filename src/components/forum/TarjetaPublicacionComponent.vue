<template>
  <div class="tarjeta-publicacion" @click="handleCardClick">
    <div class="tarjeta-header">
      <img class="perfil-img" :src="publicacion.usuario.imagenPerfil" alt="Imagen de perfil">
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
            <h3 class="username">{{ publicacion.usuario.fullname }}</h3>
            <div class="categoria">
              <span class="categoria-punto"></span>
              <span>{{ publicacion.categoria }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Menú de opciones -->
      <div class="menu-container">
        <button class="menu-button" @click.stop="toggleMenu">
          <span class="menu-dot"></span>
          <span class="menu-dot"></span>
          <span class="menu-dot"></span>
        </button>

        <div v-if="showMenu" class="menu-flotante" v-click-outside="closeMenu">
          <BotonTextoImagenComponent v-if="esMiPublicacion" image="/icons/eliminar-icon.svg" text="Eliminar"
            @click="eliminarPublicacion" />

          <BotonTextoImagenComponent v-else image="/icons/advertencia-icon.svg" text="Reportar"
            @click="handleMenuItemClick('reportar')" />

          <BotonTextoImagenComponent image="/icons/compartir-icon.svg" text="Compartir"
            @click="handleMenuItemClick('compartir')" />
        </div>
      </div>
    </div>
  </div>

   <!-- Modal de Confirmación -->
   <ConfirmacionComponent
      v-if="confirmacionVisible"
      :visible="confirmacionVisible"
      :titulo="confirmacionTitulo"
      :mensaje="confirmacionMensaje"
      @confirmar="onConfirmacionConfirmada"
      @cancelar="onConfirmacionCancelada"
    />
</template>

<script>
import BotonTextoImagenComponent from '@/components/BotonTextoImagenComponent.vue';
import ConfirmacionComponent from '@/components/notification/ConfirmacionComponent.vue';
import publicacionApi from '@/apis/publicacionApi';
import authService from '@/services/authService';
import { useNotificationStore } from '@/stores/notificationStore';

export default {
  name: 'TarjetaPublicacionComponent',
  components: {
    BotonTextoImagenComponent,
    ConfirmacionComponent
  },
  props: {
    publicacion: {
      type: Object,
      required: true,
      validator: (pub) => pub.idPublicacion && pub.usuario
    },
    usuarioActualId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMenu: false,
      clickListener: null,
      // Datos para el modal de confirmación:
      confirmacionVisible: false,
      confirmacionTitulo: '',
      confirmacionMensaje: '',
      confirmacionResolve: null,
      confirmacionReject: null
    };
  },
  computed: {
    esMiPublicacion() {

      return this.publicacion?.idUsuario=== this.usuarioActualId;
    }
  },
  methods: {
    // Método que muestra el modal y retorna una promesa que se resuelve cuando el usuario confirma
    solicitarConfirmacion({ titulo, mensaje }) {
      return new Promise((resolve, reject) => {
        this.confirmacionTitulo = titulo;
        this.confirmacionMensaje = mensaje;
        this.confirmacionVisible = true;
        this.confirmacionResolve = resolve;
        this.confirmacionReject = reject;
      });
    },
    // Método que se ejecuta cuando el usuario confirma en el modal
    onConfirmacionConfirmada() {
      if (this.confirmacionResolve) {
        this.confirmacionResolve();
      }
      this._resetConfirmacion();
    },
    // Método que se ejecuta cuando el usuario cancela en el modal
    onConfirmacionCancelada() {
      if (this.confirmacionReject) {
        this.confirmacionReject(new Error('Cancelado'));
      }
      this._resetConfirmacion();
    },
    // Método auxiliar para limpiar los datos del modal de confirmación
    _resetConfirmacion() {
      this.confirmacionVisible = false;
      this.confirmacionTitulo = '';
      this.confirmacionMensaje = '';
      this.confirmacionResolve = null;
      this.confirmacionReject = null;
    },
    // Método para eliminar la publicación, ahora usando la confirmación importada
    async eliminarPublicacion() {
      const notificationStore = useNotificationStore();

      // Solicitar confirmación al usuario
      try {
        await this.solicitarConfirmacion({
          titulo: 'Confirmar eliminación',
          mensaje: '¿Estás seguro de eliminar esta publicación?'
        });
      } catch (error) {

        return false;
      }


      try {
        const tokenUser = authService.getToken();
        if (!tokenUser) {
          notificationStore.showNotification("Debes iniciar sesión", "error");
          return false;
        }

        const idPublicacion = this.publicacion.idPublicacion;
        const response = await publicacionApi.eliminarPublicacion(idPublicacion, tokenUser);

        const successMessage = response.data?.mensaje || "Operación completada";
        notificationStore.showNotification(successMessage, "success");

        // Emitir el evento para que otros componentes puedan reaccionar a la eliminación
        this.$emit('publicacion-eliminada', idPublicacion);
        window.location.reload();

        
        return true;
      } catch (error) {
        const errorMessage = error.response?.data?.mensaje ||
          error.response?.data?.error ||
          error.message ||
          "Error al procesar la solicitud";

        notificationStore.showNotification(errorMessage, "error");

        console.error("Error completo:", {
          status: error.response?.status,
          data: error.response?.data,
          stack: error.stack
        });
        return false;
      }
    },
    // Ejemplo de uso en el menú de la tarjeta
    handleMenuItemClick(action) {
      this.closeMenu();
      const acciones = {
        eliminar: () => this.eliminarPublicacion(),
        reportar: () => this.$emit('reportar', this.publicacion.idPublicacion),
        compartir: () => this.$emit('compartir', this.publicacion.idPublicacion)
      };
      acciones[action]?.();
    },
    // Métodos relacionados con el manejo del menú
    handleCardClick() {


      console.log("PUBLICACIÓN RECIBIDA A TARJETA PUBLICACION:", JSON.stringify(this.publicacion, null, 2));
      localStorage.setItem('publicacion-actual', JSON.stringify(this.publicacion));
      this.$router.push({
        name: 'Publicacion',
        params: { id: this.publicacion.idPublicacion }
      });
      this.closeMenu();
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
    }
  },
  created() {
    console.log("Publicación recibida por props:", this.publicacion);
    window.addEventListener('close-all-menus', this.closeMenu);
  },
  beforeUnmount() {
    window.removeEventListener('close-all-menus', this.closeMenu);
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  }
};
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