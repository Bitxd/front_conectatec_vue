<template>
  <div class="panel-informacion">
    <!-- Header del departamento -->
    <header class="header-departamento">
      <div class="header-departamento-contenido">
        <h4>{{ departamento.nombre }}</h4>
        <button class="btn-ver-mapa" @click="onVerEnMapa">
          <svg class="icon-map" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.947L9 2m0 18l6-3m-6 3V2m6 15.382V2m0 15.382l5.447-2.724A2 2 0 0021 15.382V5.618a2 2 0 00-1.553-1.947L15 2" />
          </svg>
          Ver en el mapa
        </button>
      </div>
    </header>

    <h3 class="titulo-encargados">Encargados del Departamento</h3>

    <div v-if="loading" class="carga">Cargando encargados...</div>
    <div v-else-if="encargados.length === 0" class="sin-encargados">No hay encargados registrados.</div>

    <div v-else class="acordeon">
      <div
        v-for="enc in encargados"
        :key="enc._id.$oid || enc._id"
        class="item-acordeon"
        :class="{ 'abierto': enc.isOpen }"
      >
        <div class="encabezado-acordeon" @click="toggleAcordeon(enc)">
          <span class="indicador-acordeon"></span>
          <span class="nombre-encargado">{{ enc.nombre }}</span>
        </div>
        <transition name="slide">
          <div v-show="enc.isOpen" class="contenido-acordeon">
            <div class="detalle-acuerdo">
              <p><strong>Correo:</strong> {{ enc.correo }}</p>
              <p><strong>Horario:</strong> {{ enc.horaInicio }} - {{ enc.horaFin }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- MapaPanel Modal -->
    <MapaPanel
      v-if="showMapaPanel"
      @close="showMapaPanel = false"
    />
  </div>
</template>

<script>
import universidadApi from '@/apis/universidadApi';
import MapaPanel from './MapaPanel.vue';

export default {
  name: 'PanelInformacionComponent',
  components: {
    MapaPanel
  },
  props: {
    departamentoId: {
      type: String,
      required: true
    },
    departamento: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      encargados: [],
      loading: false,
      showMapaPanel: false
    };
  },
  watch: {
    departamentoId: {
      immediate: true,
      handler(nuevoId) {
        if (!nuevoId) {
          this.encargados = [];
          return;
        }
        this.cargarEncargados(nuevoId);
      }
    }
  },
  methods: {
    async cargarEncargados(id) {
      this.loading = true;
      this.encargados = [];
      try {
        const datos = await universidadApi.obtenerEncargadosIdDepartamento(id);
        if (datos) {
          this.encargados = datos.map(enc => ({
            ...enc,
            isOpen: false
          }));
        }
      } catch (e) {
        console.error('Error al cargar encargados:', e);
      } finally {
        this.loading = false;
      }
    },
    toggleAcordeon(encargado) {
      encargado.isOpen = !encargado.isOpen;
    },
    onVerEnMapa() {
      this.showMapaPanel = true;
    }
  }
};
</script>


<style scoped>
.panel-informacion {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.panel-informacion > * {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

.header-departamento {
  background: #f8fafc;
  color: #1e293b;
  padding: 1rem;
  flex-shrink: 0;
}

.header-departamento h4 {
  margin: 0;
  font-size: 1.25rem;
  text-align: left;
}

/* Contenedor flex para h4 + botón */
.header-departamento-contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-ver-mapa {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.btn-ver-mapa:hover {
  background-color: #2563eb;
}

.icon-map {
  width: 20px;
  height: 20px;
}

.titulo-encargados {
  padding: 1rem;
  color: #34495e;
  border-bottom: 1px solid #ecf0f1;
  flex-shrink: 0;
  text-align: left;
}

.acordeon {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
}

.item-acordeon {
  border-bottom: 1px solid #ecf0f1;
}

.encabezado-acordeon {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.encabezado-acordeon:hover {
  background: #f8f9fa;
}

.nombre-encargado {
  font-weight: 500;
  color: #2c3e50;
  flex-grow: 1;
}

.indicador-acordeon {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #7f8c8d;
  transition: transform 0.3s ease;
  margin-right: 0.5rem;
}

.item-acordeon.abierto .indicador-acordeon {
  transform: rotate(180deg);
}

.contenido-acordeon {
  padding: 0.5rem 0;
}

.detalle-acuerdo {
  text-align: left;
  margin-left: 0;
}

.detalle-acuerdo p {
  margin: 0.25rem 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 100px;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.carga,
.sin-encargados {
  padding: 1rem;
  color: #7f8c8d;
  text-align: center;
  flex-shrink: 0;
}
</style>

