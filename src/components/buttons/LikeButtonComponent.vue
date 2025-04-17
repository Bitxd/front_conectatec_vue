<template>
    <button class="like-button" :class="{ 'marcado': marcado }" @click="toggle">
        <img src="/icons/like-icon.svg" class="icon" alt="Ícono Me gusta" />
        <span class="label">Me gusta</span>
    </button>
</template>

<script>
export default {
    name: 'LikeButtonComponent',
    data() {
        return {
            marcado: false,
        };
    },
    methods: {
        toggle() {
            this.marcado = !this.marcado;
        },
        marcar() {
            this.marcado = true;
        },
        isMarcado() {
            return this.marcado;
        },
    },
};
</script>

<style scoped>
.like-button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #888;
    transition: all 0.3s ease-in-out;
    padding: 0.6rem 1rem;
    border-radius: 9999px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-weight: 500;
    gap: 0.5rem;
}

.like-button .icon {
    width: 22px;
    height: 22px;
    transition: transform 0.2s ease-in-out;
}

.like-button .label {
    font-size: 1rem;
    transition: color 0.3s ease;
}

/* Estilo cuando está marcado */
.like-button.marcado {
    background-color: #8e44ad; /* Morado vibrante */
    color: white;
    box-shadow: 0 4px 10px rgba(142, 68, 173, 0.4);
}

.like-button.marcado .icon {
    filter: brightness(0) invert(1); /* Invierte color del ícono si es negro */
}

/* Efecto cuando se presiona */
.like-button:active {
    transform: scale(0.96);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.like-button.marcado:active {
    background-color: #732d91;
    box-shadow: 0 6px 14px rgba(115, 45, 145, 0.5);
}
</style>
