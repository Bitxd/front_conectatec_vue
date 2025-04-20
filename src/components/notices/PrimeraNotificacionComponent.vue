<template>
    <Transition name="slide-fade">
        <div v-if="visible" class="notification-floating">
            <!-- Imagen superior -->
            <div class="notification-image">
                <img src="/images/informacion-png.png" alt="Icono de notificación" class="notification-icon" />
            </div>

            <div class="notification-content">
                <!-- Contenido de texto -->
                <div class="notification-text">
                    <h3 class="notification-title">¡Primera vez!</h3>
                    <p class="notification-message">
                        Parece que es la primera vez que usas esta función. Antes de continuar, personalicemos tus
                        recordatorios.
                    </p>
                </div>

                <!-- Botón principal -->
                <button @click="handleClick" class="notification-button">
                    ¡Vamos!
                </button>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
  name: 'PrimeraNotificacionComponent',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: 'Configuracion',
        query: { seccion: 'notificaciones' }
      });
    }
  }
}
</script>


<style scoped>
.notification-floating {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 20px;
    width: 90%;
    max-width: 380px;
    z-index: 9999;
    border: 2px solid #3b82f6;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.notification-image {
    margin-bottom: 12px;
}

.notification-icon {
    width: 32px;
    height: 32px;
    display: block;
    margin: 0 auto;
}

.notification-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.notification-title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
}

.notification-message {
    font-size: 15px;
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 4px;
}

.notification-button {
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 4px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.notification-button:hover {
    background-color: #2563eb;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px) translateX(-50%);
    opacity: 0;
}
</style>