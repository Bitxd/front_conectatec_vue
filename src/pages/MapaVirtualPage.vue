<template>
  <div class="page">
    <header class="page-header">
      <div class="header-left">
        <TituloLabel text="Mapa" />
        <UniversidadLabel class="titulo-universidad" :text="nombreEscuela || 'Universidad'" />
      </div>
    </header>
    <div class="container">
      <div class="departamentos-panel">
        <ListaDepartamentosComponent :escuelaId="idEscuela" />
      </div>

    </div>
  </div>
</template>

<script>
import TituloLabel from '@/components/labels/TituloLabel.vue';
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue';
import ListaDepartamentosComponent from '@/components/map/ListaDepartamentosComponent.vue';  

export default {
  name: 'MapaVirtualPage',
  components: {
    TituloLabel,
    UniversidadLabel,
    ListaDepartamentosComponent  
  },
  data() {
    return {
      idEscuela: null,
      nombreEscuela: ''
    };
  },
  mounted() {
    this.idEscuela = this.$route.params.id;
    this.nombreEscuela = this.$route.query.nombre || '';
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px; 
}

.container {
  padding: 1rem;
  display: flex;
  flex: 1;
}

.departamentos-panel {
  width: 50%;
  height: 90%;
  overflow-y: auto;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-right: 20px;
}
</style>
