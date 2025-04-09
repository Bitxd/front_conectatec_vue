<template>
    <header class="header">
        <div class="container">
            <div class="left-items">
                <SidebarComponent />
                <LogoComponent />
                <BotonImagenComponent :image="'/icons/chatbot-icon.svg'" alt-text="Icono" description="Chatbot"
                    @click="botonChatbot" />
                <BotonImagenComponent :image="'/icons/universidad-icon.svg'" alt-text="Icono"
                    description="Universidades" @click="botonUniversidad" />
            </div>
            <div class="right-items">
                <UserMenuComponent v-if="isAuthenticated" />
                <AccederComponent v-else @closeMenu="closeMenu" />
            </div>
        </div>
    </header>
</template>

<script>
import SidebarComponent from './SidebarComponent.vue';
import LogoComponent from './LogoComponent.vue';
import BotonImagenComponent from './BotonImagenComponent.vue';
import AccederComponent from './AccederComponent.vue';
import UserMenuComponent from './UserMenuComponent.vue';
import authService from '../services/authService';

export default {
    name: "HeaderComponent",
    components: {
        SidebarComponent,
        LogoComponent,
        BotonImagenComponent,
        AccederComponent,
        UserMenuComponent
    },
    data() {
        return {
            isAuthenticated: authService.isAuthenticated()
        };
    },
    methods: {
        botonChatbot() {
            this.$router.push({ name: 'Chatbot' });
        },
        botonUniversidad() {
            this.$router.push({name: 'Universidades'});
        },
        closeMenu() {
            console.log("Cerrando el menú");
        }
    }
};
</script>

<style scoped>
/* Estilos del encabezado */
.header {
    background-color: #ffffff;
    color: #333333;
    padding: 0 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 25px rgba(0, 0, 0, 0.05);
    position: fixed;
    width: 100%;
    height: 48px;
    top: 0;
    left: 0;
    z-index: 1000;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.container {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.left-items {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;
}

.right-items {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 65px;
}
</style>