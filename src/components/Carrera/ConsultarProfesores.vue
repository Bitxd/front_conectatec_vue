<template>
  <div class="consultar-panel">
    <h2>Consulta profesores para agendar asesorías</h2>
    <button class="btn-consultar" @click="abrirModal">Consultar</button>

    <ListaProfesoresModal
      v-if="modalListaVisible"
      :departamento-id="departamentoId"
      @select-profesor="abrirAsesoria"
      @close="cerrarModal"
    />

    <AsesoriaModal
      v-if="modalAsesoriaVisible"
      :profesor="profesorSeleccionado"
      @back="regresarALista"
      @close-all="cerrarModal"
    />
  </div>
</template>

<script>
import ListaProfesoresModal from './ListaProfesoresModal.vue';
import AsesoriaModal from './AsesoriaModal.vue';

export default {
  name: 'ConsultarProfesores',
  components: {
    ListaProfesoresModal,
    AsesoriaModal
  },
  props: {
    departamentoId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      modalListaVisible: false,
      modalAsesoriaVisible: false,
      profesorSeleccionado: null
    };
  },
  methods: {
    abrirModal() {
      this.modalListaVisible = true;
    },
    cerrarModal() {
      this.modalListaVisible = false;
      this.modalAsesoriaVisible = false;
      this.profesorSeleccionado = null;
    },
    abrirAsesoria(profesor) {
      this.modalListaVisible = false;
      this.modalAsesoriaVisible = true;
      this.profesorSeleccionado = profesor;
    },
    regresarALista() {
      this.modalListaVisible = true;
      this.modalAsesoriaVisible = false;
    }
  }
};
</script>

<style scoped>
.consultar-panel {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
.btn-consultar {
  background: #fff;
  color: #764ba2;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.btn-consultar:hover {
  background: #6a3b8f;
  color: #f3f3f3;
}
</style>
