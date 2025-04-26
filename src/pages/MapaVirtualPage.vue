<template>
  <div class="page">
    <header class="page-header">
      <div class="header-left">
        <TituloLabel text="Mapa" />
        <UniversidadLabel class="titulo-universidad" :text="nombreEscuela || 'Universidad'" />
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
  </div>
</template>


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


<script>
import TituloLabel from '@/components/labels/TituloLabel.vue';
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue';
import ListaDepartamentosComponent from '@/components/map/ListaDepartamentosComponent.vue';
import PanelInformacionComponent from '@/components/map/PanelInformacionComponent.vue';

export default {
  name: 'MapaVirtualPage',
  components: {
    TituloLabel,
    UniversidadLabel,
    ListaDepartamentosComponent,
    PanelInformacionComponent
  },
  data() {
    return {
      idEscuela: null,
      nombreEscuela: '',
      departamentoSeleccionado: null
    };
  },
  computed: {
    // Extrae en string el _id correcto
    computedDeptId() {
      const idObj = this.departamentoSeleccionado?._id;
      // maneja tanto ObjectId con .\$oid como string
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
    }
  }
};
</script>



