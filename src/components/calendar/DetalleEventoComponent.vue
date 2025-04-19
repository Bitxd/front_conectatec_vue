<template>
    <div class="panel-derecho">
        <!-- Header con autor y su imagen -->
        <div class="header-autor">
            <p class="autor-info">
                <strong>{{ calendario.creadoPor.username }}</strong> - {{ calendario.creadoPor.fullname }}
            </p>
            <img :src="calendario.creadoPor.imagenPerfil" alt="Imagen del autor" class="imagen-creador" />
        </div>

        <!-- Detalles del evento -->
        <div class="detalle-evento">
            <!-- Título y descripción -->
            <div class="titulo-descripcion">
                <div class="contenedor-titulo">
                    <h3 class="titulo">{{ calendario.titulo }}</h3>
                    <div @click="abrirModal">
                        <BotonNotificacionComponent />
                    </div>
                </div>
                <p class="descripcion">{{ calendario.descripcion }}</p>
            </div>

            <!-- Fecha y Hora en horizontal -->
            <div class="fila-horizontal">
                <div class="info-item">
                    <div class="acento"></div>
                    <img src="/icons/calendario-icon.svg" alt="Fecha" class="icono" />
                    <span><strong>Fecha:</strong> {{ formatDate(calendario.fechaInicio) }} a {{
                        formatDate(calendario.fechaFin) }}</span>
                </div>
                <div class="info-item">
                    <div class="acento"></div>
                    <img src="/icons/hora-icon.svg" alt="Hora" class="icono" />
                    <span><strong>Hora:</strong> {{ calendario.horaInicio }} - {{ calendario.horaFin }}</span>
                </div>
            </div>

            <!-- Lugar con botón alineado -->
            <div class="evento-info">
                <div class="info-item lugar-item">
                    <div class="acento"></div>
                    <img src="/icons/mapa-virtual-icon.svg" alt="Lugar" class="icono" />
                    <div class="lugar-texto">
                        <span><strong>Lugar:</strong> {{ calendario.lugar }}</span>
                    </div>
                    <div class="contenedor-boton">
                        <BotonTextoImagenComponent image="/images/localizacion.png" text="Localización" />
                    </div>
                </div>
            </div>

            <!-- Tipo de evento -->
            <div class="evento-info">
                <div class="info-item">
                    <div class="acento"></div>
                    <span><strong>Tipo de evento:</strong> {{ calendario.tipoEvento }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BotonTextoImagenComponent from '../BotonTextoImagenComponent.vue';
import BotonNotificacionComponent from '../buttons/BotonNotificacionComponent.vue';

export default {
    name: 'DetalleEventoComponent',
    props: {
        calendario: Object
    },
    components: {
        BotonTextoImagenComponent,
        BotonNotificacionComponent
    },
    methods: {
        formatDate(fecha) {
            const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(fecha).toLocaleDateString('es-ES', opciones);
        },
    }
};
</script>



<style scoped>
.panel-derecho {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-autor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f4f4f4;
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom: 16px;
}

.autor-info {
    font-size: 1rem;
    color: #555;
}

.imagen-creador {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #ccc;
}

.detalle-evento {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.titulo-descripcion {
    margin-top: -8px;
    margin-bottom: 8px;
}

.contenedor-titulo {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    width: 100%;
}

.titulo {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0;
    color: #2c3e50;
    text-align: left;
    position: relative;
    padding-left: 16px;
    flex-grow: 1;
}

.titulo::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 4px;
    background-color: #5e81f4;
    border-radius: 4px;
    transition: height 0.3s ease;
}

.titulo:hover::before {
    height: 85%;
}

.descripcion {
    font-size: 1rem;
    color: #333;
    margin: 0;
    text-align: left;
    line-height: 1.5;
}

.fila-horizontal {
    display: flex;
    gap: 16px;
    width: 100%;
}

.fila-horizontal .info-item {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background-color: #f9f9f9;
    border-radius: 8px;
    width: 100%;
}

.lugar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    justify-content: flex-start;
}

.lugar-texto {
    text-align: left;
    word-break: break-word;
    margin-right: 0;
}

.contenedor-boton {
    margin-left: 120px;
    margin-right: -80px;
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .fila-horizontal {
        flex-direction: column;
    }

    .contenedor-boton {
        margin-left: 60px;
        margin-right: -40px;
    }

    .lugar-item {
        flex-wrap: wrap;
        gap: 8px;
    }
}

.acento {
    width: 4px;
    height: 24px;
    background-color: #5e81f4;
    border-radius: 4px;
    flex-shrink: 0;
}

.icono {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
}
</style>