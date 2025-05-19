<template>
  <div class="modal-overlay" @click.self="cerrar">
    <div class="servicio-social-modal">
      <button class="cerrar-btn" @click="cerrar" aria-label="Cerrar modal">&times;</button>
      <h3 class="title">Actividades de Servicio Social</h3>
      <p class="id-escuela">ID Escuela: {{ idEscuela }}</p>
      <ul v-if="servicios.length" class="actividades-list">
        <li v-for="servicio in servicios" :key="servicio._id" class="actividad-item">
          {{ servicio.actividades }}
        </li>
      </ul>
      <p v-else class="no-data">No se encontraron actividades para esta escuela.</p>
    </div>
  </div>
</template>

<script>
import { obtenerServiciosSocialesPorIdEscuela } from '@/apis/serviciosocialApi';

export default {
  name: 'ServicioSocialModal',
  props: {
    idEscuela: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      servicios: []
    };
  },
  methods: {
    async cargarServiciosSociales() {
      if (!this.idEscuela) return;
      try {
        const data = await obtenerServiciosSocialesPorIdEscuela(this.idEscuela);
        this.servicios = data || [];
      } catch (e) {
        console.error('Error cargando servicios sociales:', e);
      }
    },
    cerrar() {
      this.$emit('cerrar');
    }
  },
  created() {
    this.cargarServiciosSociales();
  },
  watch: {
    // Cuando cambie idEscuela, recarga sin declarar parámetro no usado
    idEscuela() {
      this.cargarServiciosSociales();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center; justify-content: center;
  z-index: 1000;
}

.servicio-social-modal {
  position: relative;
  max-width: 600px; width: 90%;
  max-height: 80vh; overflow-y: auto;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  padding: 1.5rem 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.cerrar-btn {
  position: absolute;
  top: 0.5rem; right: 0.75rem;
  background: transparent; border: none;
  font-size: 2rem; line-height: 1;
  color: #888; cursor: pointer;
  transition: color 0.2s ease;
}
.cerrar-btn:hover { color: #444; }

.title {
  font-size: 1.5rem; font-weight: 700;
  margin-bottom: 1rem; text-align: center;
  color: #2c3e50;
}

.id-escuela {
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
  font-style: italic;
}

.actividades-list {
  list-style-type: disc;
  padding-left: 1.25rem;
}

.actividad-item {
  background: #e0f7fa;
  margin-bottom: 0.8rem;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-size: 1rem; line-height: 1.4;
  color: #00796b;
  box-shadow: inset 0 0 5px rgba(0,121,107,0.3);
  transition: background-color 0.3s ease;
}
.actividad-item:hover {
  background-color: #b2dfdb;
  cursor: default;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #999;
  margin-top: 1rem;
}
</style>
