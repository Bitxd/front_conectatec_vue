<template>
    <button class="like-button" @click="toggle">
        <svg v-if="liked" class="heart-icon liked" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg v-else class="heart-icon" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    </button>
</template>

<script>
export default {
    name: 'LikeButton',
    props: {
        liked: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggle() {
            this.$emit('toggle');
        }
    }
};
</script>

<style scoped>
.like-button {
    background-color: #f5f5f5; /* Fondo suave */
    border: 2px solid #ddd; /* Borde suave */
    border-radius: 50%; /* Forma redonda */
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
}

.like-button:hover {
    background-color: #eee; /* Fondo más oscuro cuando pasa el mouse */
}

.heart-icon {
    width: 24px;
    height: 24px;
    fill: #aaa; /* Color gris cuando no está presionado */
    transition: fill 0.3s ease, transform 0.2s ease;
}

.heart-icon.liked {
    fill: #e74c3c; /* Rojo brillante cuando está activado */
}

.like-button:hover .heart-icon {
    transform: scale(1.2); /* Efecto de escala al pasar el mouse */
}
</style>
