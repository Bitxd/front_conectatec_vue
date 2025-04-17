<template>
    <div class="calendario-page">
        <header class="header">
            <div class="header-content">
                <TituloLabel :text="'Calendario'" background="linear-gradient(135deg, #28a745, #6dbf77)" />
                <UniversidadLabel class="titulo-universidad" :text="nombreUniversidad || 'Universidad'" />
            </div>
        </header>

        <div v-if="calendarios.length > 0" class="calendarios-list">
            <div v-for="calendario in calendarios" :key="calendario._id" class="calendario-item">
                <h3>{{ calendario.titulo }}</h3>
                <p><strong>Descripción:</strong> {{ calendario.descripcion }}</p>
                <p><strong>Fecha de inicio:</strong> {{ calendario.fechaInicio }}</p>
                <p><strong>Fecha de fin:</strong> {{ calendario.fechaFin || 'No especificada' }}</p>
                <p><strong>Lugar:</strong> {{ calendario.lugar || 'No especificado' }}</p>
                <p><strong>Tipo de evento:</strong> {{ calendario.tipoEvento }}</p>
                <p><strong>Creado por:</strong> {{ calendario.creadoPor }}</p>
                <p><strong>Fecha de creación:</strong> {{ calendario.fechaCreacion }}</p>
                <p><strong>Fecha de actualización:</strong> {{ calendario.fechaActualizacion }}</p>
            </div>
        </div>

        <div v-else class="no-calendarios">
            <p>No se han encontrado calendarios para esta universidad.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import universidadApi from '@/apis/universidadApi' 
import TituloLabel from '@/components/labels/TituloLabel.vue'
import UniversidadLabel from '@/components/labels/UniversidadLabel.vue'

const route = useRoute()
const escuelaId = ref(route.params.id)  
const nombreUniversidad = ref(route.query.nombre)  

const calendarios = ref([])  

onMounted(async () => {
    console.log('ID de la universidad: ' + escuelaId.value)  

    if (escuelaId.value) {
        try {
            const data = await universidadApi.obtenerCalendariosPorEscuela(escuelaId.value)
            calendarios.value = data || []  
        } catch (error) {
            console.error('Error al obtener los calendarios:', error)
        }
    }
})
</script>

<style scoped>
.calendario-page {
    padding: 0 20px;
}

.header {
    background-color: white;
    padding: 15px 0;
    border-bottom: 2px solid #e0e0e0;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 20px;
}

.titulo-universidad {
    margin-left: -5px;
}

.calendarios-list {
    margin-top: 20px;
}

.calendario-item {
    background: #f9f9f9;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.no-calendarios {
    text-align: center;
    padding: 20px;
    font-size: 1.2em;
}
</style>
