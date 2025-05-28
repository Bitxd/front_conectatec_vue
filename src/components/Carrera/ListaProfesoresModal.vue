<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-window">
      <button class="modal-close" @click="$emit('close')">&times;</button>
      <h3>Profesores disponibles</h3>
      <input
        v-model="filtro"
        type="search"
        placeholder="Buscar profesores..."
        class="input-buscar"
      />
      <div v-if="loading" class="info-text">Cargando profesores…</div>
      <div v-else-if="!profesores.length" class="info-text">No se encontraron profesores.</div>
      <div class="grid-profesores">
        <div
          v-for="prof in profesoresFiltrados"
          :key="prof._id"
          class="card-profesor"
        >
          <img :src="prof.imagen_perfil" alt="Foto profesor" class="card-img" />
          <h4 class="card-nombre">{{ prof.nombre }}</h4>
          <p class="card-correo">{{ prof.correo }}</p>
          <button class="btn-asesoria" @click="$emit('select-profesor', prof)">
            Solicitar asesoría
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerProfesoresPorIdDepartamento } from '@/apis/profesoresApi';

export default {
  name: 'ListaProfesoresModal',
  props: {
    departamentoId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      profesores: [],
      filtro: '',
      loading: false
    };
  },
  computed: {
    profesoresFiltrados() {
      if (!this.filtro) return this.profesores;
      const term = this.filtro.toLowerCase();
      return this.profesores.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.correo.toLowerCase().includes(term)
      );
    }
  },
  mounted() {
    this.cargarProfesores();
  },
  methods: {
    async cargarProfesores() {
      this.loading = true;
      try {
        const data = await obtenerProfesoresPorIdDepartamento(this.departamentoId);
        this.profesores = data || [];
      } catch (e) {
        alert('Error al cargar profesores');
        this.profesores = [];
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
@import './ModalStyles.css';
</style>
