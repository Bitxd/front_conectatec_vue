<template>
    <div class="lista-calendarios">
        <div class="header-llamativo">
            <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="icon-calendario">
                    <path
                        d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                        stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M15.6947 13.7002H15.7037M15.6947 16.7002H15.7037M11.9955 13.7002H12.0045M11.9955 16.7002H12.0045M8.29431 13.7002H8.30329M8.29431 16.7002H8.30329"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Lista de eventos
            </h2>
        </div>

        <!-- Contenedor scrollable para los calendarios -->
        <div class="scrollable-contenido">
            <div v-for="(calendariosMes, mes) in calendariosAgrupados" :key="mes" class="mes-seccion">
                <div class="mes-header" @click="toggleMes(mes)">
                    <div class="mes-info">
                        <span class="flecha" :class="{ abierto: mesesAbiertos[mes] }">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span class="mes-nombre">{{ mes }}</span>
                    </div>
                    <div class="contador-eventos">
                        {{ calendariosMes.length }}
                    </div>
                </div>

                <div v-if="mesesAbiertos[mes]" class="contenido-mes">
                    <div
                        v-for="calendario in calendariosMes"
                        :key="calendario._id"
                        class="item-calendario"
                        @click="$emit('calendario-seleccionado', calendario._id)"
                    >
                        <div class="item-contenido">
                            <div class="item-header">
                                <span class="circulo"></span>
                                <div class="titulo">{{ calendario.titulo }}</div>
                            </div>
                            <div class="fecha-rango">
                                {{ formatRangoFechas(calendario) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'ListaCalendariosComponent',
    props: {
        calendarios: {
            type: Array,
            required: true
        }
    },
    setup() {
        const mesesAbiertos = ref({});

        const toggleMes = (mes) => {
            mesesAbiertos.value = {
                ...mesesAbiertos.value,
                [mes]: !mesesAbiertos.value[mes]
            };
        };

        return {
            mesesAbiertos,
            toggleMes
        };
    },
    computed: {
        calendariosAgrupados() {
            const agrupados = {};
            this.calendarios.forEach((calendario) => {
                const fecha = new Date(calendario.fechaInicio);
                const mes = fecha.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
                if (!agrupados[mes]) {
                    agrupados[mes] = [];
                }
                agrupados[mes].push(calendario);
            });
            return agrupados;
        }
    },
    methods: {
        formatDate(fecha) {
            const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(fecha).toLocaleDateString('es-ES', opciones);
        },
        formatRangoFechas(calendario) {
            const fechaInicio = this.formatDate(calendario.fechaInicio);
            const fechaFin = this.formatDate(calendario.fechaFin);
            return `${fechaInicio} a ${fechaFin} de ${calendario.horaInicio} a ${calendario.horaFin}`;
        }
    }
};
</script>

<style scoped>
.lista-calendarios {
    width: 35%;
    padding: 12px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.header-llamativo {
    padding: 16px 20px;
    background-color: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
}

.header-llamativo h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 8px;
}

.icon-calendario {
    color: #3b82f6;
}

.scrollable-contenido {
    padding: 0;
    overflow-y: auto; 
    overflow-x: hidden; 
    max-height: 500px; 
}


.mes-seccion {
    margin: 0;
    padding: 4px 0;
    border-bottom: 1px solid #f1f5f9;
}

.mes-seccion:last-child {
    border-bottom: none;
}

.mes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background-color: #ffffff;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.mes-header:hover {
    background-color: #f8fafc;
}

.mes-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.flecha {
    display: flex;
    transition: transform 0.2s ease;
    color: #64748b;
}

.flecha svg {
    width: 14px;
    height: 14px;
}

.flecha.abierto {
    transform: rotate(90deg);
    color: #3b82f6;
}

.mes-nombre {
    font-weight: 500;
    color: #1e293b;
    font-size: 0.875rem;
    text-transform: capitalize;
}

.contador-eventos {
    background-color: #f1f5f9;
    color: #475569;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    min-width: 24px;
    text-align: center;
}

.contenido-mes {
    padding: 0;
}

.contenido-mes .item-calendario {
  transition: background-color 0.2s ease, transform 0.2s ease;
  cursor: pointer; 
}

.contenido-mes .item-calendario:hover {
  background-color: #f1f5f9;  
  transform: scale(1.02);  
}

.item-calendario {
    padding: 16px 24px;
    border-top: 1px solid #f8fafc;
    display: flex;
    align-items: flex-start;
}

.item-contenido {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
}

.item-header {
    display: flex;
    align-items: center;
    gap: 10px;
}

.circulo {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #3b82f6;
    flex-shrink: 0;
}

.titulo {
    font-weight: 500;
    color: #334155;
    font-size: 0.875rem;
    line-height: 1.4;
}

.fecha-rango {
    padding-left: 20px;
    font-size: 0.8125rem;
    color: #475569;
    line-height: 1.4;
    text-align: left;
}


.scrollable-contenido::-webkit-scrollbar {
    width: 8px;
}

.scrollable-contenido::-webkit-scrollbar-thumb {
    background-color: #3b82f6; 
    border-radius: 10px;
}

.scrollable-contenido::-webkit-scrollbar-track {
    background-color: #f1f5f9; 
    border-radius: 10px;
}
</style>
