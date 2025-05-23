<template>
  <div class="overlay" v-if="isModalVisible">
    <div class="modal">
      <div class="modal-container">
        <h1 class="titulo">Iniciar sesión</h1>
        <form @submit.prevent="handleLogin" class="formulario">
          <!-- Botón para alternar entre correo y teléfono -->
          <div class="switch">
            <button type="button" @click="toggleInputType" class="switch-btn">
              {{ isEmail ? 'Usar número de teléfono' : 'Usar correo electrónico' }}
            </button>
          </div>

          <!-- Campo de correo electrónico -->
          <div v-if="isEmail" class="campo">
            <label for="email" class="label">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" placeholder="Introduce tu correo" required />
          </div>

          <!-- Campo de teléfono -->
          <div v-if="!isEmail" class="campo">
            <label for="telefono" class="label">Número de Teléfono (Opcional)</label>
            <input type="phone" id="telefono" v-model="telefono" placeholder="Introduce tu número" />
          </div>

          <div class="campo">
            <label for="password" class="label">Contraseña</label>
            <input type="password" id="password" v-model="password" placeholder="Introduce tu contraseña" required />
          </div>

          <div class="acciones">
            <BotonTextoImagenComponent :image="'/icons/cancelar-icon.svg'" :altText="'Cancelar'" text="Cancelar"
              @click="handleCancel" />
            <BotonTextoImagenComponent :image="'/icons/iniciar-sesion-icon.svg'" :altText="'Entrar'" text="Entrar"
              type="submit" />
          </div>
        </form>
      </div>
    </div>
    <div class="backdrop" @click="handleCancel"></div>
  </div>

  <!-- Notification Component -->
  <NotificationComponent v-if="notificationVisible" :message="notificationMessage"
    :notificationType="notificationType" />
</template>

<script>
import BotonTextoImagenComponent from '../BotonTextoImagenComponent.vue';
import authService from '../../apis/userApi';  // Asegúrate de tener esta API configurada correctamente
import NotificationComponent from '../alerts/NotificationComponent.vue';

export default
{
  name: "LoginComponent",
  components: {
    BotonTextoImagenComponent,
    NotificationComponent,
  },
  data()
  {
    return{
      isModalVisible: true,
      email: '',
      telefono: '',
      password: '',
      isEmail: true,
      notificationVisible: false,
      notificationMessage: '',
      notificationType: '',
    };
  },
  methods:
  {
    toggleInputType()
    {
      this.isEmail = !this.isEmail;
      this.email = '';
      this.telefono = '';
    },
    async handleLogin()
    {
      try
      {
        // Intentar login
        const userLoggedIn = await authService.login(this.email, this.password);

        if (userLoggedIn)
        {
          // Mostrar notificación de éxito
          this.showNotification('Autenticación exitosa', 'success');
          this.handleCancel();

          // Obtener configuración del usuario después de iniciar sesión
          const token = userLoggedIn.token; // Suponiendo que el token esté en la respuesta
          const configuracion = await authService.obtenerConfiguracionUsuario(token);
          
          // Guardar la configuración en localStorage
          localStorage.setItem('configuracionUsuario', JSON.stringify(configuracion));

          // Recargar la página para que se refresquen los datos
          location.reload();
        }
      }
      catch (error)
      {
        this.showNotification('Error al autenticar: ' + (error.response?.data?.mensaje || error.message), 'error');
      }
    },
    handleCancel()
    {
      this.isModalVisible = false;
      this.email = '';
      this.telefono = '';
      this.password = '';
      this.$emit("close");
    },
    showNotification(message, type)
    {
      this.notificationMessage = message;
      this.notificationType = type;
      this.notificationVisible = true;
      setTimeout(() =>
      {
        this.notificationVisible = false;
      }, 5000);
    },
  },
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

.modal {
  position: relative;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  height: 60%;
  z-index: 1100;
  animation: fadeIn 0.3s ease-out;
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

.formulario {
  display: flex;
  flex-direction: column;
}

.campo {
  margin-bottom: 20px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

input {
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 6px;
  background-color: #f7f7f7;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.acciones {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.switch {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.switch-btn {
  background-color: transparent;
  border: 2px solid #007bff;
  color: #007bff;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.switch-btn:hover {
  background-color: #007bff;
  color: #ffffff;
}
</style>