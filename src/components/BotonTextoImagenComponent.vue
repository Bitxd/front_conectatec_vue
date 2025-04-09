<template>
    <div class="boton-texto-imagen-container">
        <button class="boton-texto-imagen" @click.stop="handleClick">
            <img :src="image" :alt="altText" class="image" />
            <span class="text">{{ text }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "BotonTextoImagenComponent",
    props: {
        image: {
            type: String,
            required: true
        },
        altText: {
            type: String,
            default: "Imagen"
        },
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        handleClick() {
            this.$emit("click");
        }
    }
};
</script>

<style scoped>
.boton-texto-imagen-container {
    display: inline-block;
    position: relative;
}

.boton-texto-imagen {
    border: none;
    background-color: #ffffff;
    cursor: pointer;
    padding: 8px 16px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    color: #333333;
    font-size: 14px;
    font-weight: 600;
}

.boton-texto-imagen:hover {
    transform: scale(1.05);
    background-color: rgba(0, 123, 255, 0.1); 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
}

.image {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.text {
    font-size: 14px;
    color: #333;
}
</style>
