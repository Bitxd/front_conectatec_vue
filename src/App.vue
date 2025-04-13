<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    
    <AdvertenciaComponent 
      v-if="showWarning"
      :message="warningMessage"
      @close="closeWarning"
    />
    
    <!-- Usamos tu NotificationComponent original SIN CAMBIOS -->
    <NotificationComponent
      v-if="notification.show"
      :message="notification.message"
      :notificationType="notification.type"
      @clear-message="hideNotification"
    />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import AdvertenciaComponent from './components/alerts/AdvertenciaComponent.vue';
import NotificationComponent from '@/components/alerts/NotificationComponent.vue'; // Usa tu componente original

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AdvertenciaComponent,
    NotificationComponent
  },
  data() {
    return {
      showWarning: false,
      warningMessage: '',
      notification: {
        show: false,
        message: '',
        type: 'info' 
      }
    }
  },
  methods: {

    showNotification(message, type = 'info') {
      this.notification = {
        show: true,
        message,
        type
      };
      // Cierre automático después de 5 segundos
      setTimeout(() => this.hideNotification(), 5000);
    },
    hideNotification() {
      this.notification.show = false;
    },
    handleAuthWarning(event) {
      this.warningMessage = event.detail.message;
      this.showWarning = true;
    },
    closeWarning() {
      this.showWarning = false;
    }
  },
  mounted() {

    window.showGlobalNotification = this.showNotification;
    window.addEventListener('show-auth-warning', this.handleAuthWarning);
  },
  beforeUnmount() {
    window.removeEventListener('show-auth-warning', this.handleAuthWarning);
    delete window.showGlobalNotification;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>