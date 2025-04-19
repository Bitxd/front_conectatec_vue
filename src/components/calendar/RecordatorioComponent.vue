<template>
    <div v-if="visible" class="overlay" @click.self="close">
      <div class="modal">
        <h2 class="modal__title">Recordar este evento</h2>
        <div class="calendario-info">
          <div><strong>Título:</strong> {{ calendario.titulo }}</div>
          <div><strong>Descripción:</strong> {{ calendario.descripcion }}</div>
          <div><strong>Fecha:</strong> {{ calendario.fechaInicio }} a {{ calendario.fechaFin }}</div>
          <div><strong>Hora:</strong> {{ calendario.horaInicio }} - {{ calendario.horaFin }}</div>
          <div><strong>Lugar:</strong> {{ calendario.lugar }}</div>
          <div><strong>Tipo de evento:</strong> {{ calendario.tipoEvento }}</div>
          <div><strong>Creado por:</strong> {{ calendario.creadoPor?.fullname }}</div>
        </div>
  
        <!-- Mostrar mensaje si el recordatorio está activo -->
        <div v-if="recordatorio">
          <p><strong>Recordatorio:</strong> Este evento ya está recordado.</p>
        </div>
        <div v-else>
          <p>No hay recordatorio activo para este evento.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import userApi from '@/apis/userApi'; // Importar la función
  
  export default {
    name: 'RecordatorioComponent',
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      calendario: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        recordatorio: null,
      };
    },
    watch: {
      visible(newVal) {
        if (newVal) {
          // Se ejecuta cuando el modal se vuelve visible
          alert(`Se realizará la petición con el ID: ${this.calendario._id}`); // Muestra el ID en un alert
          this.calendarioId = this.calendario._id;
          this.verificarRecordatorio();
        }
      },
    },
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
  
      async verificarRecordatorio() {
        try {
          const token = localStorage.getItem('token');
          this.recordatorio = await userApi.verificarRecordatorio(this.calendarioId, token);
        } catch (error) {
          console.error('Error al verificar el recordatorio:', error);
        }
      },
    },
  };
  </script>
  

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
}

/* Modal: tarjeta blanca con sombra */
.modal {
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    max-width: 24rem;
    width: 100%;
}

/* Título del modal */
.modal__title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333333;
}

/* Información del calendario */
.calendario-info>div {
    margin-bottom: 0.5rem;
    color: #333333;
    font-size: 0.95rem;
}

/* Clases de botones de ejemplo */
.button--primary {
    background-color: #007bff;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
}

.button--success {
    background-color: #28a745;
    color: #ffffff;
}

.button--error {
    background-color: #dc3545;
    color: #ffffff;
}
</style>
