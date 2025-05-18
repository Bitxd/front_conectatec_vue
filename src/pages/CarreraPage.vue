<template>
  <div class="carrera-page">
    <div class="contenido-principal">
      <!-- Elementos pegados a la izquierda -->
      <div class="info-carrera" v-if="carrera">
        <img
          v-if="carrera.imagen"
          :src="carrera.imagen"
          alt="Imagen de la carrera"
          class="carrera-imagen"
        />
        <div class="info-texto">
          <h3>{{ carrera.nombre }}</h3>
          <p>Semestres: {{ carrera.numero_semestres }}</p>
        </div>
      </div>

      <div class="acordeon-container" v-if="materiasPorSemestre.length">
        <div class="acordeon-materias-compacto">
          <h2>Materias</h2>
          <div
            v-for="(materias, index) in materiasPorSemestre"
            :key="index"
            class="semestre-compacto"
          >
            <button
              class="acordeon-btn-compacto"
              @click="toggleSemestre(index)"
              :aria-expanded="activeIndex === index"
            >
              S{{ index + 1 }}
              <span class="arrow" :class="{ active: activeIndex === index }">&#9662;</span>
            </button>
            <div class="panel-compacto" v-show="activeIndex === index">
              <ul>
                <li v-for="(materia, i) in materias" :key="i">{{ materia }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenido centrado -->
      <div class="contenido-centrado">
        <div class="otros-contenidos">
          <!-- Otro contenido centrado aquí -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerCarreraPorId } from '@/apis/carrerasApi';

export default {
  name: 'CarreraPage',
  data() {
    return {
      id: this.$route.params.id,
      carrera: null,
      loading: true,
      error: false,
      activeIndex: null,
      materiasPorSemestre: [
        ['Matemáticas I', 'Física I', 'Química I'],
        ['Matemáticas II', 'Física II', 'Programación I'],
        ['Álgebra Lineal', 'Estructura de Datos', 'Bases de Datos'],
        ['Cálculo III', 'Sistemas Operativos', 'Redes'],
        ['Prob. y Estadística', 'Software I', 'Distribuidos'],
        ['IA', 'Seguridad', 'Compiladores'],
        ['Arquitectura', 'Algoritmos', 'Electiva I'],
        ['Tópicos I', 'Electiva II', 'Proyecto'],
        ['Tópicos II', 'Electiva III', 'Seminario']
      ],
    };
  },
  created() {
    this.fetchCarrera();
  },
  methods: {
    async fetchCarrera() {
      this.loading = true;
      this.error = false;

      try {
        this.carrera = await obtenerCarreraPorId(this.id);
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    toggleSemestre(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    }
  },
};
</script>

<style scoped>
.carrera-page {
  background: white;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.contenido-principal {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 24px;
}

.contenido-centrado {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.info-carrera {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-left: -24px; /* Compensa el padding del contenedor */
  width: calc(100% + 24px); /* Ajuste para cubrir el margen negativo */
}

.carrera-imagen {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.info-texto h3 {
  margin: 0 0 4px;
  font-size: 1.1rem;
}

.info-texto p {
  margin: 0;
  font-size: 0.9rem;
}

.acordeon-container {
  width: 220px;
  margin-left: 8px; /* Cambiado de -24px a 8px para moverlo a la derecha */
}

.acordeon-materias-compacto {
  font-family: 'Segoe UI', sans-serif;
}

.acordeon-materias-compacto h2 {
  font-size: 1rem;
  text-align: left;
  margin-bottom: 8px;
}

.semestre-compacto {
  margin-bottom: 8px;
}

.acordeon-btn-compacto {
  background-color: #2980b9;
  color: white;
  cursor: pointer;
  padding: 6px 10px;
  width: 100%;
  border: none;
  text-align: left;
  font-size: 0.85rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.acordeon-btn-compacto:hover {
  background-color: #3498db;
}

.acordeon-btn-compacto[aria-expanded="true"] {
  background-color: #1abc9c;
}

.arrow {
  font-size: 12px;
  transition: transform 0.3s;
}

.arrow.active {
  transform: rotate(180deg);
}

.panel-compacto {
  background-color: #ecf0f1;
  border-radius: 0 0 6px 6px;
  padding: 6px 10px;
}

.panel-compacto ul {
  list-style-type: disc;
  padding-left: 16px;
  margin: 0;
  font-size: 0.85rem;
}

.otros-contenidos {
  width: 100%;
}
</style>