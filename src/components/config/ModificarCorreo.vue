<template>
  <div class="modal-backdrop" @click.self="cerrarModal">
    <div class="modal-container">
      <h2>Modificar correo electrónico</h2>

      <NotificationComponent
        v-if="notificationMessage"
        :message="notificationMessage"
        :notificationType="notificationType"
        @clear-message="clearNotification"
      />

      <form @submit.prevent="confirmarCambio">
        <label for="nuevoCorreo" class="input-label">Nuevo correo electrónico</label>
        <div class="input-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-mail"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <input
            id="nuevoCorreo"
            type="email"
            v-model="correo"
            placeholder="ejemplo@correo.com"
            required
            autocomplete="email"
          />
        </div>

        <button type="submit" class="btn-confirmar" :disabled="cargando">
          {{ cargando ? "Guardando..." : "Confirmar" }}
        </button>
      </form>

      <button class="btn-cerrar" @click="cerrarModal" aria-label="Cerrar modal">×</button>
    </div>
  </div>
</template>

<script>
import correoApi from "@/apis/correoApi";
import authService from "@/services/authService";
import NotificationComponent from "@/components/alerts/NotificationComponent.vue";

export default {
  name: "ModificarCorreo",
  components: {
    NotificationComponent,
  },
  emits: ["cerrar", "confirmado"],
  data() {
    return {
      correo: "",
      cargando: false,
      notificationMessage: "",
      notificationType: "",
    };
  },
  methods: {
    cerrarModal() {
      this.correo = "";
      this.clearNotification();
      this.$emit("cerrar");
    },
    clearNotification() {
      this.notificationMessage = "";
      this.notificationType = "";
    },
    async confirmarCambio() {
      console.log("confirmarCambio ejecutado");

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
      if (!emailValido) {
        this.notificationMessage = "Por favor ingresa un correo válido.";
        this.notificationType = "error";
        return;
      }

      this.cargando = true;
      this.clearNotification();

      try {
        const token = authService.getToken();
        const response = await correoApi.actualizarCorreo(token, this.correo.trim().toLowerCase());
        console.log("Respuesta API:", response);

        const mensaje = response?.data?.mensaje || "Por favor verifica tu correo para continuar.";

        this.notificationMessage = mensaje;
        this.notificationType = "success";

        this.$emit("confirmado", this.correo);

        setTimeout(() => {
          this.cerrarModal();
        }, 2000);
      } catch (error) {
        console.error("Error al actualizar correo:", error);
        this.notificationMessage = error?.response?.data?.mensaje || "Error al actualizar el correo.";
        this.notificationType = "error";
      } finally {
        this.cargando = false;
      }
    },
  },
};
</script>


<style scoped>
.modal-backdrop {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 9999;
}

.modal-container {
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  padding: 24px 28px 28px;
  width: 320px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

h2 {
  margin: 0 0 16px;
  font-weight: 600;
  font-size: 1.3rem;
  color: #222;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.input-wrapper input {
  width: 100%;
  padding: 10px 10px 10px 38px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline-offset: 2px;
}

.icon-mail {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 20px;
  color: #007bff;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.success {
  color: green;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.btn-confirmar {
  width: 100%;
  padding: 10px 0;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-confirmar[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-confirmar:hover:not([disabled]) {
  background-color: #0056b3;
}

.btn-cerrar {
  position: absolute;
  top: 10px;
  right: 14px;
  background: transparent;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
}

.btn-cerrar:hover {
  color: #444;
}
</style>
