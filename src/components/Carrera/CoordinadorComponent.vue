<template>
  <div class="gafete">
    <header class="header">Coordinación</header>
    <div class="content" v-if="coordinador">
      <img :src="coordinador.imagen_perfil" alt="Foto de perfil" class="perfil-img" />
      <div class="info">
        <h2>{{ coordinador.nombre }}</h2>
        <div class="dato">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16v16H4z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>{{ coordinador.correo }}</span>
        </div>
        <div class="dato">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.21.37 2.4.71 3.54a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.54-1.54a2 2 0 0 1 2.11-.45c1.14.34 2.33.58 3.54.71a2 2 0 0 1 1.72 2z"/>
          </svg>
          <span>{{ coordinador.telefono }}</span>
        </div>
      </div>
    </div>
    <div v-else class="loading">Cargando coordinador...</div>
  </div>
</template>

<script>
export default {
  name: "CoordinadorComponent",
  props: {
    carreraId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      coordinador: null,
    };
  },
  watch: {
    carreraId: {
      immediate: true,
      handler(newId) {
        this.cargarCoordinador(newId);
      }
    }
  },
  methods: {
    cargarCoordinador(id) {
      // Aquí iría la llamada a API o lógica para obtener coordinador según carreraId
      // Por ejemplo (simulado con timeout):
      console.log("Cargando coordinador para carrera:", id);
      setTimeout(() => {
        // Datos simulados, idealmente los traes de un fetch o axios
        this.coordinador = {
          nombre: "María Fernanda López Martínez",
          correo: "maria.lopez@example.com",
          telefono: "+52 55 9876 5432",
          imagen_perfil: "https://randomuser.me/api/portraits/women/68.jpg",
        };
      }, 700);
    }
  }
};
</script>

<style scoped>
.gafete {
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  color: #333;
  font-size: 0.85rem;
}

.header {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-bottom: 1px solid #c3d0dc;
  text-align: left;
  letter-spacing: 0.5px;
  color: #4a6fa5;
  background-color: #f5f9fc;
}

.content {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  gap: 1rem;
}

.perfil-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #aaa;
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
}

.info h2 {
  margin: 0 0 0.3rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
  word-break: break-word;
}

.dato {
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  font-size: 0.85rem;
  color: #555;
  word-break: break-word;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  stroke: #666;
  flex-shrink: 0;
}

.loading {
  padding: 1rem;
  text-align: center;
  font-style: italic;
  font-size: 0.85rem;
  color: #888;
}
</style>
