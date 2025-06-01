<template>
  <div class="overlay" v-if="isModalVisible">
    <div class="modal">
      <div class="modal-container">
        <h1 class="titulo">Registrarse</h1>
        <form @submit.prevent="handleRegister" class="formulario">
          <!-- Usuario -->
          <div class="campo">
            <label for="user" class="label">Usuario</label>
            <input id="user" v-model="user" placeholder="Introduce tu usuario" required />
          </div>

          <!-- Nombre completo -->
          <div class="campo">
            <label for="fullname" class="label">Nombre Completo</label>
            <input id="fullname" v-model="fullname" placeholder="Introduce tu nombre completo" required />
          </div>

          <!-- Email -->
          <div class="campo">
            <label for="email" class="label">Correo Electrónico</label>
            <input id="email" type="email" v-model="email" placeholder="Introduce tu correo" required />
          </div>

          <!-- Contraseña -->
          <div class="campo">
            <label for="password" class="label">Contraseña</label>
            <input id="password" type="password" v-model="password" placeholder="Introduce tu contraseña" required />
          </div>

          <!-- Confirmar contraseña -->
          <div class="campo">
            <label for="confirmpassword" class="label">Confirmar Contraseña</label>
            <input
              id="confirmpassword"
              type="password"
              v-model="confirmpassword"
              placeholder="Confirma tu contraseña"
              required
            />
          </div>

          <!-- Botones -->
          <div class="acciones">
            <BotonTextoImagenComponent
              :image="'/icons/cancelar-icon.svg'"
              altText="Cancelar"
              text="Cancelar"
              @click="handleCancel"
            />
            <BotonTextoImagenComponent
              :image="'/icons/registro-icon.svg'"
              altText="Registrar"
              text="Registrar"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="backdrop" @click="handleCancel"></div>
  </div>
</template>

<script>
import BotonTextoImagenComponent from "../BotonTextoImagenComponent.vue";
import userApi from "@/apis/userApi";

export default {
  name: "RegisterComponent",
  components: { BotonTextoImagenComponent },
  data() {
    return {
      isModalVisible: true,
      user: "",
      fullname: "",
      email: "",
      password: "",
      confirmpassword: ""
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmpassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      try {
        const response = await userApi.registrar(
          this.fullname,
          this.user,
          this.email,
          this.password,
          this.confirmpassword,
        );
        alert(response.data.mensaje);
        this.handleCancel();
      } catch (error) {
        const mensaje = error.response?.data?.mensaje || "Error al registrar usuario.";
        alert(mensaje);
      }
    },
    handleCancel() {
      this.isModalVisible = false;
      this.user = "";
      this.fullname = "";
      this.email = "";
      this.password = "";
      this.confirmpassword = "";
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Modal */
.modal {
  position: relative;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  height: 60%;
  z-index: 1100;
  animation: fadeIn 0.3s ease-out;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.titulo {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Formulario en grid 2x2 */
.formulario {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.campo {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
}

input {
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f7f7f7;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

/* Botones: se extienden en ambas columnas y se alinean a la derecha */
.acciones {
  grid-column: 1 / -1;
  /* Ocupa ambas columnas del grid */
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>