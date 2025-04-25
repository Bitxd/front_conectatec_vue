<template>
  <div class="departamentos-container">
    <div class="header-estilizado">
      <h2>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="icono-edificio">
          <path d="M12 18V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M2 22H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M3 9H21V22H3V9Z" stroke="currentColor" stroke-width="1.5" />
          <path d="M7 5L8 2H16L17 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        Departamentos
      </h2>
      <input type="text" class="barra-busqueda" placeholder="Buscar departamentos..." v-model="searchQuery" />
    </div>

    <div class="contenedor-scroll">
      <ul class="lista-departamentos">
        <li v-for="departamento in filteredDepartamentos" :key="departamento._id.$oid" class="item-departamento"
          @click="seleccionarDepartamento(departamento)">
          <div class="marcador-azul"></div>
          <span class="nombre">{{ departamento.nombre }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import universidadApi from "@/apis/universidadApi";

export default {
  name: "ListaDepartamentosComponent",
  props: {
    escuelaId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      departamentos: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredDepartamentos() {
      const query = this.searchQuery.toLowerCase();
      return this.departamentos.filter(depto =>
        depto.nombre.toLowerCase().includes(query)
      ); 
    }
  },
  watch: {
    escuelaId: {
      immediate: true,
      handler(nuevoId) {
        if (nuevoId) {
          this.cargarDepartamentos();
        }
      }
    }
  },
  methods: {
    async cargarDepartamentos() {
      const datos = await universidadApi.obtenerDepartamentosID(this.escuelaId);
      if (datos) {
        this.departamentos = datos;
      }
    },
    seleccionarDepartamento(depto) {
      this.$emit("select-departamento", depto);
    }
  }
};
</script>

<style scoped>
.departamentos-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.header-estilizado {
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 2;
}

.header-estilizado h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icono-edificio {
  color: #3b82f6;
  stroke-width: 1.5;
}

.barra-busqueda {
  width: 100%;
  padding: 8px 12px;
  margin-top: 12px;
  margin-right: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #334155;
  transition: border-color 0.2s ease;
}

.barra-busqueda:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.barra-busqueda::placeholder {
  color: #94a3b8;
}

.contenedor-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0;
  scrollbar-width: thin;
  scrollbar-color: #3b82f6 transparent;
  scrollbar-gutter: stable both-edges;
}

.contenedor-scroll::-webkit-scrollbar {
  width: 6px;
}

.contenedor-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.contenedor-scroll::-webkit-scrollbar-thumb {
  background-color: #3b82f6;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.contenedor-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #2563EB;
}

.lista-departamentos {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-departamento {
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-left: 4px solid transparent;
}

.item-departamento:hover {
  background: #f8fafc;
  border-left-color: #3b82f6;
  transform: translateX(4px);
}

.marcador-azul {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.item-departamento:hover .marcador-azul {
  opacity: 1;
}

.nombre {
  font-size: 0.875rem;
  color: #334155;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>