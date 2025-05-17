<template>
  <div class="notificacion-config">
    <header class="config-header">
      <h2>Configuración de perfil</h2>
      <hr class="config-separator" />
    </header>

    <div class="config-content">
      <ImagenPerfilConfig :imagenPerfil="usuario?.imagenPerfil" />

      <div class="info-cards">
        <div class="info-card">
          <h2 class="metodos-title">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Correo electrónico
          </h2>
          <div class="info-body">
            <span>{{ usuario?.email || 'No disponible' }}</span>
            <button class="modificar-btn" @click="modalCorreoAbierto = true">
              Modificar
            </button>
          </div>
        </div>

        <div class="info-card">
          <h2 class="metodos-title">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h2a2 2 0 012 2v1a2 2 0 01-2 2H3v6h2a2 2 0 012 2v1a2 2 0 01-2 2H3m12-6a4 4 0 01-8 0 4 4 0 018 0z" />
            </svg>
            Número telefónico
          </h2>
          <div class="info-body">
            <span>{{ usuario?.phone || 'No disponible' }}</span>
            <button class="modificar-btn">
              Modificar
            </button>
          </div>
        </div>
      </div>
    </div>

    <ModificarCorreo
      v-if="modalCorreoAbierto"
      @cerrar="modalCorreoAbierto = false"
      @confirmado="onCorreoConfirmado"
    />
  </div>
</template>

<script>
import ImagenPerfilConfig from './ImagenPerfilConfig.vue'
import ModificarCorreo from './ModificarCorreo.vue'
import tiempoSeccion from '@/services/tiempoSeccion'

export default {
  name: 'PerfilConfig',
  components: {
    ImagenPerfilConfig,
    ModificarCorreo
  },
  data() {
    return {
      usuario: null,
      startTime: null,
      modalCorreoAbierto: false
    }
  },
  mounted() {
    this.startTime = tiempoSeccion.iniciarConteo()
    const raw = localStorage.getItem('usuario')
    try {
      const parsed = JSON.parse(raw)
      this.usuario = parsed && typeof parsed === 'object' ? parsed : null
    } catch (e) {
      console.error('Error parseando usuario:', e)
    }
  },
  beforeUnmount() {
    tiempoSeccion.finalizarConteo(this.startTime, 'perfil_config')
  },
  methods: {
    onCorreoConfirmado(nuevoCorreo) {
      this.usuario.email = nuevoCorreo
      this.modalCorreoAbierto = false
      // En siguiente paso: mostrar aviso "revisa tu correo"
    }
  }
}
</script>

<style scoped>
.notificacion-config {
  padding: 8px;
  width: 100%;
}

.config-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0;
  padding-top: 0;
}

.config-header h2 {
  font-size: 26px;
  font-weight: normal;
  margin: 0 0 2px 8px;
  line-height: 1.1;
  margin-top: -4px;
  margin-bottom: 5px;
}

.config-separator {
  width: 100%;
  border: none;
  height: 2px;
  background-color: #000;
  border-radius: 4px;
  margin: 0;
}

.config-content {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.info-cards {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  align-self: center;
}

.info-card {
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.metodos-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  margin: 0;
  padding: 5px 12px;
  background: #e6f2ff;
  color: #333;
  border-radius: 6px 6px 0 0;
  text-align: left;
  font-weight: normal;
}

.icon {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  vertical-align: middle;
  stroke: #333;
}

.info-body {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modificar-btn {
  background-color: #007BFF;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.modificar-btn:hover {
  background-color: #0056b3;
}
</style>
