<script>
// Importa la función API (ajusta la ruta según tu proyecto)
import { obtenerCoordinadorPorIdCarrera } from '@/apis/coordinadorApi';

export default {
  name: 'TarjetaCoordinador',
  props: {
    idCarrera: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      coordinador: null
    };
  },
  async mounted() {
    await this.cargarCoordinador();
  },
  methods: {
    async cargarCoordinador() {
      try {
        const data = await obtenerCoordinadorPorIdCarrera(this.idCarrera);
        this.coordinador = data;
      } catch (error) {
        console.error('Error al cargar el coordinador:', error);
      }
    },
    mostrarOficina() {
      this.$emit('mostrar-oficina', this.coordinador);
    }
  }
};
</script>

<template>
  <div class="tarjeta-coordinador">
    <header class="header-coordinacion">
      <h1>Coordinación</h1>
    </header>

    <div v-if="coordinador" class="contenido">
      <img
        :src="coordinador.imagen_perfil"
        alt="Imagen del coordinador"
        class="imagen-perfil"
      />

      <div class="info">
        <h2 class="nombre">{{ coordinador.nombre }}</h2>
        <div class="detalles">
          <p class="correo">{{ coordinador.correo }}</p>
          <p class="telefono">{{ coordinador.telefono || 'Sin teléfono' }}</p>
        </div>
      </div>

      <button class="btn-mostrar" @click="mostrarOficina">
        Mostrar oficina
      </button>
    </div>

    <div v-else class="contenido cargando">
      <p>Cargando coordinador...</p>
    </div>
  </div>
</template>

<style scoped>
.tarjeta-coordinador {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(30, 136, 229, 0.15);
  border: 1.5px solid #cfdff7;
}

.header-coordinacion {
  background: #e3f2fd;
  padding: 12px 24px;
  text-align: left;
}

.header-coordinacion h1 {
  font-size: 18px;
  font-weight: 600;
  color: #1565c0;
  margin: 0;
}

.contenido {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
  position: relative;
}

.imagen-perfil {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
  border: 2.5px solid #1e88e5;
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.nombre {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #1565c0;
  font-weight: 600;
  letter-spacing: -0.25px;
  text-align: left;
}

.detalles {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.correo,
.telefono {
  font-size: 14px;
  margin: 0;
  color: #5a7ca8;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.btn-mostrar {
  position: absolute;
  bottom: 16px;
  right: 24px;
  padding: 8px 18px;
  background: #1e88e5;
  color: #ffffff;
  border: 2px solid #e3f2fd;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-mostrar:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(21, 101, 192, 0.3);
}

.cargando {
  justify-content: center;
  align-items: center;
}

.contenido.cargando {
  display: flex;
  font-size: 15px;
  color: #5a7ca8;
  min-height: 130px;
}

</style>
