<template>
    <button class="boton-notificacion" :class="{ active: isActive }" @click="toggleAccion">
        <div class="icono-circulo">
            <svg xmlns="http://www.w3.org/2000/svg" class="icono" :class="{ 'icono-active': isActive }" width="24" height="24" viewBox="0 0 24 24">
                <path
                    d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.93 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
        </div>
    </button>
</template>

<script>
export default {
    name: 'BotonNotificacionComponent',
    props: {
        evento: {
            type: String,
            default: 'notificacion-click'
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggleAccion() {
            this.isActive = !this.isActive
            this.$emit(this.evento, { estado: this.isActive })

            setTimeout(() => {
                this.isActive = false
            }, 300)
        }
    }
}
</script>

<style scoped>
.boton-notificacion {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;
}

.icono-circulo {
    width: 48px;
    height: 48px;
    background: linear-gradient(145deg, #deeaff, #c4d3ff);
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(94, 129, 244, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.boton-notificacion:hover .icono-circulo {
    background: linear-gradient(145deg, #d0e1ff, #a9c0ff);
    box-shadow: 0 8px 16px rgba(94, 129, 244, 0.35);
    transform: scale(1.06);
}

.icono {
    fill: #6b7280;
    transition: fill 0.3s ease;
}

.icono-active {
    fill: #4f46e5 !important;
}

.boton-notificacion.active .icono-circulo {
    animation: pulse 0.3s ease;
    box-shadow: 0 0 8px 4px rgba(94, 129, 244, 0.3);
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1.1);
    }
}
</style>
