<template>
    <div class="panel-informacion">
        <!-- Header del departamento -->
        <header class="header-departamento">
            <h4>{{ departamento.nombre }}</h4>
        </header>

        <h3 class="titulo-encargados">Encargados del Departamento</h3>

        <div v-if="loading" class="carga">Cargando encargados...</div>
        <div v-else-if="encargados.length === 0" class="sin-encargados">No hay encargados registrados.</div>

        <div v-else class="acordeon">
            <div v-for="enc in encargados"
                 :key="enc._id.$oid || enc._id"
                 class="item-acordeon"
                 :class="{ 'abierto': enc.isOpen }">
                <div class="encabezado-acordeon" @click="toggleAcordeon(enc)">
                    <span class="indicador-acordeon"></span>
                    <span class="nombre-encargado">{{ enc.nombre }}</span>
                </div>
                <transition name="slide">
                    <div v-show="enc.isOpen" class="contenido-acordeon">
                        <div class="detalle-acuerdo">
                            <p><strong>Correo:</strong> {{ enc.correo }}</p>
                            <p><strong>Horario:</strong> {{ enc.horaInicio }} - {{ enc.horaFin }}</p>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-informacion {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.panel-informacion > * {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

.header-departamento {
  background: #f8fafc;
  color: #1e293b;
  padding: 1rem;
  flex-shrink: 0;
}

.header-departamento h4 {
  margin: 0;
  font-size: 1.25rem;
  text-align: left;
}

.titulo-encargados {
  padding: 1rem;
  color: #34495e;
  border-bottom: 1px solid #ecf0f1;
  flex-shrink: 0;
  text-align: left;
}

.acordeon {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
}

.item-acordeon {
  border-bottom: 1px solid #ecf0f1;
}

.encabezado-acordeon {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.encabezado-acordeon:hover {
  background: #f8f9fa;
}

.nombre-encargado {
  font-weight: 500;
  color: #2c3e50;
  flex-grow: 1;
}

.indicador-acordeon {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #7f8c8d;
  transition: transform 0.3s ease;
  margin-right: 0.5rem;
}

.item-acordeon.abierto .indicador-acordeon {
  transform: rotate(180deg);
}

/* Alineamos correo y horario a la izquierda sin indentación excesiva */
.contenido-acordeon {
  padding: 0.5rem 0;
}

.detalle-acuerdo {
  text-align: left;
  margin-left: 0;
}

.detalle-acuerdo p {
  margin: 0.25rem 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 100px;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.carga,
.sin-encargados {
  padding: 1rem;
  color: #7f8c8d;
  text-align: center;
  flex-shrink: 0;
}
</style>


<script>
import universidadApi from '@/apis/universidadApi';

export default {
    name: 'PanelInformacionComponent',
    props: {
        departamentoId: {
            type: String,
            required: true
        },
        departamento: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            encargados: [],
            loading: false
        };
    },
    watch: {
        departamentoId: {
            immediate: true,
            handler(nuevoId) {
                if (!nuevoId) {
                    this.encargados = [];
                    return;
                }
                this.cargarEncargados(nuevoId);
            }
        }
    },
    methods: {
        async cargarEncargados(id) {
            this.loading = true;
            this.encargados = [];
            try {
                const datos = await universidadApi.obtenerEncargadosIdDepartamento(id);
                if (datos) {
                    this.encargados = datos.map(enc => ({
                        ...enc,
                        isOpen: false
                    }));
                }
            } catch (e) {
                console.error('Error al cargar encargados:', e);
            } finally {
                this.loading = false;
            }
        },
        toggleAcordeon(encargado) {
            encargado.isOpen = !encargado.isOpen;
        }
    }
};
</script>

