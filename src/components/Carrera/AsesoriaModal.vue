<template>
  <div class="modal-backdrop" @click.self="$emit('close-all')">
    <div class="modal-window">
      <!-- HEADER -->
      <div class="modal-header">
        <button class="modal-back" @click="$emit('back')">←</button>
        <button class="modal-close" @click="$emit('close-all')">&times;</button>
        <h2 class="modal-title">Asesoría: {{ profesor.nombre }}</h2>
      </div>

      <!-- CUERPO COMPACTO -->
      <div class="modal-body materia-body">
        <!-- Selector de materia -->
        <div class="field-materia">
          <input
            v-model="busqueda"
            @focus="mostrarLista = true"
            @blur="ocultarLista"
            placeholder="Selecciona materia"
            class="input-materia"
          />
          <ul v-show="mostrarLista" class="lista-materias" @mousedown.prevent>
            <li
              v-for="materia in materiasFiltradas"
              :key="materia"
              class="item-materia"
              @click="seleccionarMateria(materia)"
            >
              {{ materia }}
            </li>
          </ul>
        </div>

        <!-- Materia seleccionada -->
        <div class="field-selected">
          <span class="label-selected">Materia:</span>
          <span class="value-selected">{{ materiaSeleccionada || '—' }}</span>
        </div>

        <!-- Asunto -->
        <textarea
          v-model="asunto"
          placeholder="Describe brevemente el motivo"
          class="textarea-asunto"
        ></textarea>

        <!-- Botón dentro del mismo cuerpo -->
        <button class="btn-confirmar" @click="confirmar">
          <span class="btn-icon">✉️</span>
          Solicitar asesoría
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Backdrop y ventana */
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
}

.modal-window {
  background: #fff;
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

/* HEADER */
.modal-header {
  position: relative;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

.modal-back,
.modal-close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  color: #000;
}
.modal-back { left: 0.5rem; }
.modal-close { right: 0.5rem; }

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
}

/* CUERPO COMPACTO */
.materia-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #fff;
}

/* Selector de materia */
.field-materia {
  position: relative;
}

.input-materia {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #000;
}

.input-materia:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

/* Lista desplegable */
.lista-materias {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}

.item-materia {
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #000;
}

.item-materia:hover {
  background: #eef2ff;
}

/* Materia seleccionada */
.field-selected {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-selected {
  font-weight: 500;
  font-size: 0.9rem;
  color: #000;
}

.value-selected {
  font-weight: 600;
  font-size: 0.9rem;
  color: #000;
}

/* Asunto */
.textarea-asunto {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  resize: vertical;
  min-height: 80px;
  color: #000;
}

.textarea-asunto:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

/* Botón */
.btn-confirmar {
  margin-top: 0.5rem;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-confirmar:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 1.1em;
  color: #000;
}
</style>




<script>
import { obtenerMateriasPorIdCarrera } from '@/apis/materiasApi';

export default {
  name: 'AsesoriaModal',
  props: {
    profesor: { type: Object, required: true },
    idCarrera: { type: String, required: true }
  },
  data() {
    return {
      materias: [],
      busqueda: '',
      materiaSeleccionada: '',
      mostrarLista: false,
      asunto: ''
    };
  },
  computed: {
    materiasFiltradas() {
      const term = this.busqueda.toLowerCase();
      return this.materias
        .map(m => m.nombre)
        .filter(nombre => nombre.toLowerCase().includes(term));
    }
  },
  methods: {
    seleccionarMateria(nombreMateria) {
      this.materiaSeleccionada = nombreMateria;
      this.busqueda = nombreMateria;
      this.mostrarLista = false;
    },
    ocultarLista() {
      setTimeout(() => (this.mostrarLista = false), 100);
    },
    confirmar() {
      if (!this.materiaSeleccionada || !this.asunto.trim()) {
        return alert('Selecciona materia y escribe el asunto.');
      }
      this.$emit('confirmar-asesoria', {
        profesorId: this.profesor._id,
        materia: this.materiaSeleccionada,
        asunto: this.asunto
      });
    },
    async cargarMaterias() {
      const data = await obtenerMateriasPorIdCarrera(localStorage.getItem('idActualCarrera'));
      this.materias = data || [];
    }
  },
  mounted() {
    this.cargarMaterias();
  }
};
</script>

