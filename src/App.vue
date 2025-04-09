<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    
    <AdvertenciaComponent 
      v-if="showWarning"
      :message="warningMessage"
      @close="closeWarning"
    />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import AdvertenciaComponent from './components/AdvertenciaComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AdvertenciaComponent
  },
  data() {
    return {
      showWarning: false,
      warningMessage: ''
    }
  },
  mounted() {
    window.addEventListener('show-auth-warning', this.handleAuthWarning);
  },
  beforeUnmount() {
    window.removeEventListener('show-auth-warning', this.handleAuthWarning);
  },
  methods: {
    handleAuthWarning(event) {
      this.warningMessage = event.detail.message;
      this.showWarning = true;
    },
    closeWarning() {
      this.showWarning = false;
    }
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