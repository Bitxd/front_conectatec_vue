<template>
  <div class="modal-overlay" @click.self="cerrar">
    <div class="servicio-social-modal">
      <button class="cerrar-btn" @click="cerrar" aria-label="Cerrar modal">&times;</button>
      <h3 class="title">Actividades de Servicio Social</h3>
      <p class="id-escuela">ID Escuela: {{ idEscuela }}</p>
      <div v-if="servicios.length" class="servicios-container">
        <div v-for="servicio in servicios" :key="servicio._id" class="servicio-card">
          <p><strong>Folio:</strong> {{ servicio.folio }}</p>
          <p><strong>Nombre:</strong> {{ servicio.nombre }}</p>
          <p><strong>Área:</strong> {{ servicio.area }}</p>
          <p><strong>Programa:</strong> {{ servicio.programa }}</p>
          <p><strong>Responsable:</strong> {{ servicio.responsable }}</p>
          <p><strong>Contacto:</strong> {{ servicio.contacto }}</p>
          <p><strong>Actividades:</strong> {{ servicio.actividades }}</p>
        </div>
      </div>
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center; justify-content: center;
  z-index: 1000;
}

.servicio-social-modal {
  position: relative;
  max-width: 800px; width: 95%;
  max-height: 90vh; overflow-y: auto;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.cerrar-btn {
  position: absolute;
  top: 0.75rem; right: 1rem;
  background: none; border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s ease;
}
.cerrar-btn:hover { color: #333; }

.title {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.id-escuela {
  text-align: center;
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.servicios-container {
  display: grid;
  gap: 1.25rem;
}

.servicio-card {
  background: #f1f8e9;
  border-left: 6px solid #689f38;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}
.servicio-card:hover {
  background: #e6ee9c;
}

.servicio-card p {
  margin: 0.35rem 0;
  font-size: 0.98rem;
  line-height: 1.4;
}

.servicio-card strong {
  color: #33691e;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #999;
  margin-top: 2rem;
}
</style>
