<template>
    <div class="calendario-page">
        <header class="header">
            <div class="header-content">
                <TituloLabel :text="'Calendario'" />
                <UniversidadLabel class="titulo-universidad" :text="universidadNombre || 'Universidad'" />
            </div>
        </header>
        <ListaEventosComponent :calendarios="calendarios" />

    </div>
</template>

<script>
import TituloLabel from '@/components/labels/TituloLabel.vue';
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue';
import universidadApi from '@/apis/universidadApi'; 
// Componente de lista de eventos
import ListaEventosComponent from '@/components/calendar/ListaEventosComponent.vue';

export default {
    name: 'CalendarioPage',
    components: {
        TituloLabel,
        UniversidadLabel,
        ListaEventosComponent
    },
    data() {
        return {
            universidadNombre: this.$route.query.nombre || 'Universidad',
            calendarios: []
        };
    },
    mounted()
    {
        const escuelaId = this.$route.params.id;
        this.obtenerCalendarios(escuelaId);
    },
    methods:
    {
        async obtenerCalendarios(escuelaId) {
            try
            {

                this.calendarios = await universidadApi.obtenerCalendariosPorEscuela(escuelaId) || [];

            }
            catch (error)
            {

                alert('Hubo un error al obtener los calendarios. Por favor, inténtalo más tarde.');
            }
        }
    }
}
</script>

<style scoped>
.calendario-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Segoe UI', Roboto, sans-serif;
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
</style>
