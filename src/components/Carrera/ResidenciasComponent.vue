<template>
  <transition name="modal-slide">
    <div v-if="mostrar" class="residencias-modal-overlay">
      <div class="residencias-modal-container">
        <header class="residencias-modal-header">
          <h2 class="residencias-modal-title">Oportunidades de Residencia</h2>
          <button @click="cerrarModal" class="residencias-modal-close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div v-if="cargando" class="residencias-modal-loading">
          <div class="residencias-loading-spinner"></div>
          <p>Cargando oportunidades...</p>
        </div>
        
        <div v-else-if="residencias.length === 0" class="residencias-modal-empty">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No se encontraron residencias disponibles</p>
        </div>

        <div v-else class="residencias-modal-content">
          <div class="residencias-grid">
            <div
              v-for="(residencia, index) in residencias"
              :key="index"
              class="residencia-card"
            >
              <div class="residencia-header">
                <h3 class="residencia-empresa">{{ residencia.empresa }}</h3>
                <div class="residencia-badge">
                  {{ residencia.numResidentes }} residente{{ residencia.numResidentes !== 1 ? 's' : '' }}
                </div>
              </div>
              
              <h4 class="residencia-proyecto">{{ residencia.proyecto }}</h4>
              
              <div class="residencia-details">
                <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{{ residencia.responsable }}</span>
                </div>
                
                <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a :href="`mailto:${residencia.correo}`">{{ residencia.correo }}</a>
                </div>
                
                <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a :href="`tel:${residencia.telefono}`">{{ residencia.telefono }}</a>
                </div>
                
                <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(residencia.direccion)}`" target="_blank">
                    {{ residencia.direccion }}
                  </a>
                </div>
              </div>
              
              <div v-if="residencia.escuela?.nombre || residencia.carrera?.nombre" class="residencia-footer">
                <p v-if="residencia.escuela?.nombre" class="footer-item">
                  <span class="footer-label">Escuela:</span> {{ residencia.escuela.nombre }}
                </p>
                <p v-if="residencia.carrera?.nombre" class="footer-item">
                  <span class="footer-label">Carrera:</span> {{ residencia.carrera.nombre }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { obtenerResidenciasPorIdCarrera } from '@/apis/residencias';

export default {
  name: 'ResidenciasModal',
  props: {
    idCarrera: {
      type: String,
      required: true
    },
    mostrar: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      residencias: [],
      cargando: false
    };
  },
  watch: {
    mostrar(nuevoValor) {
      if (nuevoValor) this.cargarResidencias();
    }
  },
  methods: {
    async cargarResidencias() {
      this.cargando = true;
      try {
        const data = await obtenerResidenciasPorIdCarrera(this.idCarrera);
        this.residencias = data || [];
      } catch (error) {
        console.error('Error al cargar residencias:', error);
        this.residencias = [];
      } finally {
        this.cargando = false;
      }
    },
    cerrarModal() {
      this.$emit('cerrar');
    }
  },
  mounted() {
    if (this.mostrar) this.cargarResidencias();
  }
};
</script>

<style scoped>
/* Transición del modal */
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Estilos del overlay */
.residencias-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

/* Contenedor del modal */
.residencias-modal-container {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  width: 100%;
  max-width: 56rem;
  position: relative;
  overflow-y: auto;
  max-height: 70vh;
  margin-left: auto;
  margin-right: auto;
}

/* Header del modal */
.residencias-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.residencias-modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.residencias-modal-close-button {
  color: #9ca3af;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.residencias-modal-close-button:hover {
  color: #4b5563;
}

.residencias-modal-close-button svg {
  height: 1.5rem;
  width: 1.5rem;
}

/* Estado de carga */
.residencias-modal-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 0;
}

.residencias-loading-spinner {
  animation: spin 1s linear infinite;
  height: 2.5rem;
  width: 2.5rem;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top-color: rgb(59, 130, 246);
  border-radius: 50%;
  margin-bottom: 1rem;
}

.residencias-modal-loading p {
  color: #4b5563;
}

/* Estado vacío */
.residencias-modal-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 0;
  color: #6b7280;
}

.residencias-modal-empty svg {
  height: 3rem;
  width: 3rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

/* Contenido principal */
.residencias-modal-content {
  margin-top: 1rem;
}

/* Grid de residencias */
.residencias-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .residencias-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Tarjeta de residencia */
.residencia-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.25rem;
  transition: all 0.2s;
  background-color: white;
}

.residencia-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.residencia-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.residencia-empresa {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
}

.residencia-badge {
  background-color: #dbeafe;
  color: #1e40af;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
}

.residencia-proyecto {
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

/* Detalles de la residencia */
.residencia-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #374151;
}

.detail-icon {
  height: 1rem;
  width: 1rem;
  color: #6b7280;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.detail-item a {
  color: #2563eb;
  text-decoration: underline;
}

.detail-item a:hover {
  text-decoration: none;
}

/* Footer de la tarjeta */
.residencia-footer {
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  margin-top: 1rem;
}

.footer-item {
  font-size: 0.75rem;
  color: #6b7280;
}

.footer-label {
  font-weight: 500;
  color: #374151;
}

/* Scrollbar personalizada */
.residencias-modal-container::-webkit-scrollbar {
  width: 6px;
}

.residencias-modal-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.residencias-modal-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.residencias-modal-container::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Animación de spin */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>