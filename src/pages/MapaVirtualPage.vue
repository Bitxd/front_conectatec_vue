<template>
  <div class="page">
    <header class="page-header">
      <div class="header-left">
        <TituloLabel text="Mapa" />
        <UniversidadLabel class="titulo-universidad" :text="nombreEscuela || 'Universidad'" />
        <!-- Botón Ver Mapa -->
        <button class="btn-ver-mapa" @click="openMapaPanel">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 2.09l-5 1.67A1 1 0 003 4.71v15.17a1 1 0 001.32.95l5-1.67 5 1.67a1 1 0 00.68 0 1 1 0 00.68-.95V4.71a1 1 0 00-.68-.95 1 1 0 00-.68 0l-5 1.67V2.09a1 1 0 00-1-1 1 1 0 00-1 1v.  "/>
          </svg>
          Ver mapa
        </button>
      </div>
    </header>

    <div class="container">
      <!-- Panel izquierdo: lista de departamentos -->
      <div class="panel panel-departamentos">
        <ListaDepartamentosComponent v-if="idEscuela" :escuelaId="idEscuela"
          @select-departamento="onSelectDepartamento" />
      </div>

      <!-- Panel derecho: detalles de encargados -->
      <div class="panel panel-detalle">
        <div v-if="!departamentoSeleccionado" class="placeholder">
          <img src="/images/edificio-png.PNG" alt="Selecciona un departamento" class="placeholder-img" />
          <p class="placeholder-text">
            Selecciona un departamento para ver los encargados
          </p>
        </div>

        <PanelInformacionComponent v-else :departamentoId="computedDeptId" :departamento="departamentoSeleccionado" />

      </div>
    </div>

    <!-- Modal del mapa -->
    <MapaPanel v-if="showMapaPanel" @close="closeMapaPanel" />
  </div>
</template>

<script>
import TituloLabel from '@/components/labels/TituloLabel.vue';
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue';
import ListaDepartamentosComponent from '@/components/map/ListaDepartamentosComponent.vue';
import PanelInformacionComponent from '@/components/map/PanelInformacionComponent.vue';
import MapaPanel from '@/components/map/MapaPanel.vue';

export default {
  name: 'MapaVirtualPage',
  components: {
    TituloLabel,
    UniversidadLabel,
    ListaDepartamentosComponent,
    PanelInformacionComponent,
    MapaPanel
  },
  data() {
    return {
      idEscuela: null,
      nombreEscuela: '',
      departamentoSeleccionado: null,
      showMapaPanel: false
    };
  },
  computed: {
    // Extrae en string el _id correcto
    computedDeptId() {
      const idObj = this.departamentoSeleccionado?._id;
      // maneja tanto ObjectId con .$oid como string
      return idObj?.$oid || idObj || '';
    }
  },
  created() {
    this.idEscuela = this.$route.params.id;
    this.nombreEscuela = this.$route.query.nombre || '';
  },
  methods: {
    onSelectDepartamento(depto) {
      console.log('MapaVirtualPage: departamento seleccionado →', depto);
      this.departamentoSeleccionado = depto;
    },
    openMapaPanel() {
      this.showMapaPanel = true;
    },
    closeMapaPanel() {
      this.showMapaPanel = false;
    }
  }
};
</script>

<style scoped>
html,
body {
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
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

/* Estilos para el botón Ver Mapa */
.btn-ver-mapa {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: linear-gradient(90deg, #4f46e5, #6366f1);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-left: auto;
}

.btn-ver-mapa:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-ver-mapa svg {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  fill: currentColor;
}

.container {
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 1rem;
}

.panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.panel-departamentos {
  flex: 1;
  max-width: 550px;
  overflow: hidden;
  height: 80vh;
}

.panel-detalle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 80vh;
}

.placeholder {
  text-align: center;
  color: #475569;
}

.placeholder-img {
  max-width: 180px;
  margin-bottom: 16px;
  opacity: 0.85;
}

.placeholder-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.detalle-contenido h3 {
  margin: 0 0 8px;
  color: #1e293b;
}
</style>
