<template>
    <div class="advertencia">
        <div class="advertencia-overlay">
            <div class="advertencia-box">
                <p class="advertencia-message">{{ message }}</p>
                <BotonTextoImagenComponent image="icons/confirmar-icon.svg" altText="Icono de advertencia" text="Ok"
                    @click="handleOkClick" />
            </div>
        </div>
    </div>
</template>

<script>
import BotonTextoImagenComponent from './BotonTextoImagenComponent.vue';

export default {
    name: 'AdvertenciaComponent',
    components: {
        BotonTextoImagenComponent
    },
    props: {
        message: {
            type: String,
            required: true
        }
    },
    methods: {
        handleOkClick() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.advertencia {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
}

.advertencia-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.advertencia-box {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.advertencia-message {
    margin-bottom: 20px;
    font-size: 18px;
}
</style>