<template>
    <div class="boton-imagen-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <button class="boton-imagen" @click.stop="handleClick">
            <img :src="image" :alt="altText" class="image" />
        </button>
        <!-- Solo muestra el tooltip si la descripción no está vacía -->
        <div v-if="tooltipVisible && description" class="tooltip">{{ description }}</div>
    </div>
</template>

<script>
export default {
    name: "BotonImagenComponent",
    props: {
        image: {
            type: String,
            required: true
        },
        altText: {
            type: String,
            default: "Imagen"
        },
        description: {
            type: String,
            default: ""  // Ahora la descripción es opcional
        }
    },
    data() {
        return {
            tooltipVisible: false
        };
    },
    methods: {
        handleClick() {
            this.$emit("click");
        },
        showTooltip() {
            this.tooltipVisible = true;
        },
        hideTooltip() {
            this.tooltipVisible = false;
        }
    }
};
</script>

<style scoped>
.boton-imagen-container {
    display: inline-block;
    position: relative;
}

.boton-imagen {
    border: none;
    background-color: #ffffff;
    cursor: pointer;
    padding: 4px 8px;  /* Borde más pequeño */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px; /* Menor espacio entre la imagen y el texto */
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    color: #333333;
    font-size: 14px;
    font-weight: 600;
}

.boton-imagen:hover {
    transform: scale(1.05); 
    background-color: rgba(0, 123, 255, 0.1); 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
}

.image {
    width: 25px;
    height: 25px;
    object-fit: contain;
}

.tooltip {
    position: absolute;
    top: 50%;
    left: calc(100% + 8px);
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    white-space: nowrap;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    transition: opacity 0.25s ease-in-out;
}

.boton-imagen-container:hover .tooltip {
    opacity: 1;
}
</style>
