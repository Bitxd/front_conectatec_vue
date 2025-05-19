<template>
  <div>
    <!-- Modal Backdrop -->
    <div class="modal-backdrop" v-if="show">
      <div class="modal-container">
        <header class="header">
          <h1 class="header-title">Busca libros</h1>
          <button class="modal-close" @click="closeModal" aria-label="Cerrar modal">×</button>
        </header>
        <div class="search-wrapper">
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            v-model="inputBusqueda"
            @input="debouncedBuscar"
            class="search-input"
            aria-label="Buscar libros"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
        <main class="main-content">
          <div class="libros-grid" v-if="libros.length > 0">
            <a
              v-for="(libro, index) in libros"
              :key="index"
              :href="`https://openlibrary.org${libro.key}`"
              target="_blank"
              rel="noopener noreferrer"
              class="libro-item"
            >
              <img
                :src="getPortada(libro.cover_i)"
                alt="Portada"
                class="libro-portada"
              />
              <p class="libro-titulo">{{ libro.title }}</p>
            </a>
          </div>

          <p v-else class="no-results">No se encontraron libros</p>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputBusqueda: '',
      libros: [],
      debounceTimeout: null
    };
  },
  methods: {
    getPortada(coverId) {
      return coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : 'https://via.placeholder.com/128x180?text=Sin+portada';
    },
    async buscarLibros() {
      const query = this.inputBusqueda.trim();
      if (!query) {
        this.libros = [];
        return;
      }

      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        this.libros = data.docs.slice(0, 20);
      } catch (error) {
        console.error('Error al obtener libros:', error);
      }
    },
    debouncedBuscar() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.buscarLibros();
      }, 500);
    },
    closeModal() {
      this.$emit('close');
    }
  },
  mounted() {
    this.buscarLibros();
  }
};
</script>

<style scoped>
/* Ensure padding and box-sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Modal Backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

/* Modal Container */
.modal-container {
  background: #ffffff;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 900px;
  max-height: 95vh;
  overflow-y: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

/* Close Button */
.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s ease;
}
.modal-close:hover {
  color: #e53e3e;
}

/* HEADER compacto dentro modal */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
}
.header-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a202c;
  user-select: none;
}

/* SEARCH BAR minimalista con ícono SVG inline */
.search-wrapper {
  position: relative;
  margin: 1rem 1.5rem;
  flex-shrink: 0;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  width: 20px;
  height: 20px;
  color: #a0aec0;
  pointer-events: none;
  transform: translateY(-50%);
}
.search-input {
  width: 100%;
  padding: 10px 14px 10px 44px;
  font-size: 1rem;
  border: none;
  outline: none;
  background: #f0f4f8;
  color: #2d3748;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.search-input:focus {
  background: #ffffff;
  box-shadow: 0 0 0 2px #3182ce;
}

/* MAIN CONTENT */
.main-content {
  padding: 0 1.5rem 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.libros-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.libro-item {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.libro-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.libro-portada {
  width: 100%;
  max-width: 140px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 0.75rem;
  border-radius: 0.25rem;
}
.libro-titulo {
  font-weight: 600;
  font-size: 1rem;
  color: #2d3748;
  text-align: center;
  user-select: none;
  line-height: 1.3;
}

.no-results {
  text-align: center;
  font-size: 1rem;
  color: #718096;
  margin: 1.5rem;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .libros-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .libros-grid {
    grid-template-columns: 1fr;
  }
}
</style>
