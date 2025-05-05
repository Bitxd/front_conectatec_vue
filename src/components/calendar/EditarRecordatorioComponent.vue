<template>
    <Transition name="slide-fade">
        <div v-if="visible" class="notification-floating">
            <!-- Header -->
            <div class="notification-header">
                <h3>Editar recordatorio</h3>
            </div>

            <div class="notification-scroll">
                <!-- Descripción del recordatorio -->
                <label class="label">Descripción del recordatorio</label>
                <input v-model="descripcion" type="text" class="input" placeholder="Ej. No olvidar la reinscripción" />

                <!-- Fecha y Hora -->
                <div class="fecha-hora">
                    <div class="campo">
                        <label class="label">Fecha del recordatorio</label>
                        <input v-model="fecha" type="date" :max="maxFecha" class="input" />
                    </div>
                    <div class="campo">
                        <label class="label">Hora del recordatorio</label>
                        <input v-model="hora" type="time" :max="maxHora" class="input" />
                    </div>
                </div>
            </div>

            <div class="button-container">
                <button @click="handleGuardar" class="notification-button">
                    Guardar cambios
                </button>
                <button @click="handleEliminar" class="notification-button eliminar">
                    Eliminar recordatorio
                </button>
                <button @click="cancelar" class="notification-button cancelar">
                    Cancelar
                </button>
            </div>
        </div>
    </Transition>
</template>

<script>
import userApi from '@/apis/userApi.js';
import authService from '@/services/authService';

export default {
    name: 'EditarRecordatorioComponent',
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        recordatorio: {
            type: Object,
            required: true
        },
        calendario: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            descripcion: '',
            fecha: '',
            hora: ''
        };
    },
    computed: {
        maxFecha() {
            return this.calendario.fechaInicio?.split('T')[0] || '';
        },
        maxHora() {
            return this.calendario.horaInicio || '';
        }
    },
    methods: {
        async handleGuardar() {
            if (!this.descripcion || !this.fecha || !this.hora) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            try {
                const token = authService.getToken();
                const datos = {
                    titulo: this.descripcion.trim(),
                    fechaRecordatorio: this.fecha,
                    horaRecordatorio: this.hora
                };

                const response = await userApi.actualizarRecordatorio(
                    this.recordatorio._id,
                    token,
                    datos
                );
                alert('¡Recordatorio actualizado con éxito!');
                this.$emit('recordatorioActualizado', response);
            } catch (error) {
                console.error('Error al actualizar recordatorio:', error);
                alert('Error al actualizar el recordatorio.');
            } finally {
                this.$emit('cerrar');
            }
        },

        async handleEliminar() {
            if (!confirm('¿Estás seguro de querer eliminar este recordatorio?')) return;

            try {
                const token = authService.getToken();
                await userApi.eliminarRecordatorio(this.recordatorio._id, token);
                alert('¡Recordatorio eliminado correctamente!');
                this.$emit('recordatorioEliminado');
            } catch (error) {
                console.error('Error al eliminar recordatorio:', error);
                alert('Error al eliminar el recordatorio.');
            } finally {
                this.$emit('cerrar');
            }
        },

        cancelar() {
            this.$emit('cerrar');
        }
    },
    mounted() {
        this.descripcion = this.recordatorio.titulo || '';
        this.fecha = this.recordatorio.fechaRecordatorio?.split('T')[0] || '';
        this.hora = this.recordatorio.horaRecordatorio || '';
    }
};
</script>


<style scoped>
.notification-floating {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 20px;
    width: 90%;
    max-width: 600px;
    z-index: 9999;
    border: 2px solid #3b82f6;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.notification-header {
    margin-bottom: 12px;
}

.notification-header h3 {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
}

.notification-scroll {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 12px;
    text-align: left;
}

.label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #1f2937;
}

.input {
    width: 100%;
    padding: 10px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 15px;
    margin-bottom: 12px;
    box-sizing: border-box;
    transition: border-color 0.2s;
}

.input:focus {
    outline: none;
    border-color: #3b82f6;
}

.fecha-hora {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.campo {
    flex: 1 1 48%;
    display: flex;
    flex-direction: column;
}

.notification-button {
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
}

.notification-button:hover {
    background-color: #2563eb;
}

.notification-button.cancelar {
    background-color: #e5e7eb;
    color: #1f2937;
    margin-top: 5px;
}

.notification-button.cancelar:hover {
    background-color: #d1d5db;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 12px;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px) translateX(-50%);
    opacity: 0;
}

.notification-button.eliminar {
    background-color: #ef4444;
    margin-top: 5px;
}

.notification-button.eliminar:hover {
    background-color: #dc2626;
}

.button-container {
    flex-direction: column;
    align-items: center;
}
</style>