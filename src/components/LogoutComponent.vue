<template>
    <div class="logout-overlay">
        <div class="logout-box">
            <p class="logout-message">¿Deseas cerrar sesión?</p>
            <div class="logout-buttons">
                <BotonTextoImagenComponent image="/icons/confirmar-icon.svg" altText="Confirmar" text="Confirmar"
                    @click="confirmarLogout" />
                <BotonTextoImagenComponent image="/icons/cancelar-icon.svg" altText="Cancelar" text="Cancelar"
                    @click="cancelarLogout" />
            </div>
        </div>
    </div>
</template>

<script>
import BotonTextoImagenComponent from './BotonTextoImagenComponent.vue';

export default
{
    name: 'LogoutComponent',
    components:
    {
        BotonTextoImagenComponent
    },
    emits: ['cerrar'], 
    methods:
    {
        confirmarLogout()
        {
            localStorage.removeItem('token');
            this.$emit('cerrar');             
            location.reload();             
        },
        cancelarLogout()
        {
            this.$emit('cerrar');          
        }
    }
};
</script>

<style scoped>
.logout-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.logout-box {
    background-color: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 320px;
}

.logout-message {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}

.logout-buttons {
    display: flex;
    justify-content: space-around;
}
</style>