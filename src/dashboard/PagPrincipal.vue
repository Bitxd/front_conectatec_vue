<template>
  <div class="contenedor">
    <template v-if="universidad">
      <h1 class="titulo">{{ universidad.nombre }}</h1>
      <p class="descripcion">{{ universidad.descripcion }}</p>
      <p class="info">📍 {{ universidad.direccion }} | 📞 {{ universidad.telefono }}</p>
    </template>
    <template v-else>
      <PresentacionComponent />
    </template>
  </div>
</template>

<script>
import userApi from '@/apis/userApi';
import PresentacionComponent from '@/dashboard/PresentacionComponent.vue';

export default {
  name: 'PagPrincipal',
  components: {
    PresentacionComponent
  },
  data() {
    return {
      universidad: null
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token no encontrado.');
      return;
    }

    try {
      const data = await userApi.obtenerUniversidadFavorita(token);
      if (data && data.universidadFavorita) {
        this.universidad = data.universidadFavorita;
      }
    } catch (error) {
      console.error('Error al obtener universidad favorita:', error);
    }
  }
};
</script>

<style scoped>
.contenedor {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f4ff;
  padding: 2rem;
  text-align: center;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.descripcion {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1rem;
  max-width: 700px;
}

.info {
  font-size: 1rem;
  color: #6b7280;
}
</style>
