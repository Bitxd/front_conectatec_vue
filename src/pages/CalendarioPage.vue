<template>
    <div class="calendario-page">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <TituloLabel :text="'Calendario'" />
                <UniversidadLabel class="titulo-universidad" :text="universidadNombre || 'Universidad'" />
            </div>
        </header>

        <div class="contenido-principal">
            <ListaEventosComponent
                :calendarios="calendarios"
                @calendario-seleccionado="handleCalendarioSeleccionado"
            />

            <!-- Mostrar mensaje si no hay calendario seleccionado -->
            <div v-if="!calendarioSeleccionado" class="mensaje-seleccion">
                <img src="/images/evento.png" alt="Calendario" class="imagen-mensaje" />
                <p class="mensaje-texto">Selecciona un evento para ver los detalles</p>
            </div>

            <!-- Detalle del evento -->
            <DetalleEventoComponent
                v-if="calendarioSeleccionado"
                :calendario="calendarioSeleccionado"
            />
        </div>
    </div>
</template>

<script>
import TituloLabel from '@/components/labels/TituloLabel.vue';
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue';
import universidadApi from '@/apis/universidadApi';
import ListaEventosComponent from '@/components/calendar/ListaEventosComponent.vue';
import DetalleEventoComponent from '@/components/calendar/DetalleEventoComponent.vue';

export default {
    name: 'CalendarioPage',
    components: {
        TituloLabel,
        UniversidadLabel,
        ListaEventosComponent,
        DetalleEventoComponent
    },
    data() {
        return {
            universidadNombre: this.$route.query.nombre || 'Universidad',
            calendarios: [],
            calendarioSeleccionadoId: null
        };
    },
    computed: {
        calendarioSeleccionado() {
            return this.calendarios.find(c => c._id === this.calendarioSeleccionadoId) || null;
        }
    },
    mounted() {
        const escuelaId = this.$route.params.id;
        this.obtenerCalendarios(escuelaId);
    },
    methods: {
        async obtenerCalendarios(escuelaId) {
            try {
                this.calendarios = await universidadApi.obtenerCalendariosPorEscuela(escuelaId) || [];
            } catch (error) {
                alert('Hubo un error al obtener los calendarios. Por favor, inténtalo más tarde.');
            }
        },
        handleCalendarioSeleccionado(calendarioId) {
            this.calendarioSeleccionadoId = calendarioId;
        }
    }
};
</script>

<style scoped>
.calendario-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Segoe UI', Roboto, sans-serif;
    background-color: #f9f9f9;
}

.header {
    background-color: #fff;
    padding: 12px 20px;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.contenido-principal {
    display: flex;
    flex: 1;
    gap: 32px;
    padding: 16px;
    overflow: hidden;
}

/* Estilos para el mensaje cuando no se selecciona un calendario */
.mensaje-seleccion {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    color: #555;
    background-color: #ffffff;
}

.imagen-mensaje {
    width: 150px;
    height: auto;
    margin-bottom: 16px;
}

.mensaje-texto {
    font-size: 18px;
    font-weight: 600;
}
</style>
