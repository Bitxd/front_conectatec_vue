<template>
  <div class="notificacion-config">
    <header class="config-header">
      <h2>Configuración de Notificaciones</h2>
      <hr class="config-separator" />
    </header>

    <section class="metodos-recordatorios">
      <h2 class="metodos-title">Métodos de recordatorios</h2>
      <div class="metodo-item">
        <img src="/icons/correo-icon.svg" alt="Email" class="metodo-icon" />
        <span>Correo electrónico</span>
        <label class="switch">
          <input type="checkbox" v-model="notificaciones.modos.email" />
          <span class="slider round"></span>
        </label>
      </div>
      <div class="metodo-item">
        <img src="/icons/mensaje-icon.svg" alt="SMS" class="metodo-icon" />
        <span>Mensaje de texto</span>
        <label class="switch">
          <input type="checkbox" v-model="notificaciones.modos.sms" />
          <span class="slider round"></span>
        </label>
      </div>
      <div class="metodo-item">
        <img src="/icons/whatsapp-icon.svg" alt="WhatsApp" class="metodo-icon" />
        <span>Whatsapp</span>
        <label class="switch">
          <input type="checkbox" v-model="notificaciones.modos.app" />
          <span class="slider round"></span>
        </label>
      </div>
    </section>

    <button
      class="guardar-btn"
      :disabled="!configuracionModificada"
      @click="guardarConfiguracion"
    >
      Guardar configuración
    </button>
  </div>
</template>

<script>
export default {
  data() {
    // Inicializamos original con el mismo molde que notificaciones
    const plantilla = { modos: { email: false, sms: false, app: false } };
    return {
      notificaciones: JSON.parse(JSON.stringify(plantilla)),
      configuracionOriginal: JSON.parse(JSON.stringify(plantilla)),
    };
  },
  mounted() {
    this.cargarConfiguracion();
  },
  computed: {
    configuracionModificada() {
      // Comparamos solo los tres métodos
      return (
        this.notificaciones.modos.email !== this.configuracionOriginal.modos.email ||
        this.notificaciones.modos.sms   !== this.configuracionOriginal.modos.sms   ||
        this.notificaciones.modos.app   !== this.configuracionOriginal.modos.app
      );
    },
  },
  methods: {
    cargarConfiguracion()
    {
      const cfg = JSON.parse(localStorage.getItem('configuracion'));
      if (cfg)
      {
        this.notificaciones.modos.email = cfg.recordatorioCorreo;
        this.notificaciones.modos.sms   = cfg.recordatorioMensaje;
        this.notificaciones.modos.app   = cfg.recordatorioWhatsapp;

        this.configuracionOriginal = JSON.parse(JSON.stringify(this.notificaciones));
      }
    },
    guardarConfiguracion()
    {
      const cfg = {
        recordatorioCorreo:   this.notificaciones.modos.email,
        recordatorioMensaje:  this.notificaciones.modos.sms,
        recordatorioWhatsapp: this.notificaciones.modos.app,
        primerConfiguracionRecordatorio: true, 
      };
      localStorage.setItem('configuracion', JSON.stringify(cfg));
      console.log('Configuraciones guardadas:', cfg);

      this.configuracionOriginal = JSON.parse(JSON.stringify(this.notificaciones));
    },
  },
};
</script>


<style scoped>
.notificacion-config {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
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

.metodos-recordatorios {
  margin-top: 16px;
}

.metodos-title {
  font-size: 22px;
  font-weight: normal;
  margin: 0 0 12px 0;
  line-height: 1.1;
  text-align: left;
  color: #333;
  background-color: #e6f2ff;
  padding: 8px 12px;
  border-radius: 6px;
}

.metodo-item {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  gap: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.metodo-item:last-child {
  border-bottom: none;
}

.metodo-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Switch styles */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: auto;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.guardar-btn {
  margin-top: 16px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.guardar-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
