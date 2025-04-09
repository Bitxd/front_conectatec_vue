<template>
    <div class="acceder-container" ref="accederContainer">
        <BotonTextoImagenComponent :image="'/icons/acceder-icon.svg'" text="Acceder" @click="toggleMenu" />
        <div v-if="isMenuOpen" class="menu" ref="menu">
            <BotonTextoImagenComponent :image="'/icons/iniciar-sesion-icon.svg'" text="Iniciar sesión"
                @click="openLoginModal" />
            <BotonTextoImagenComponent :image="'/icons/registro-icon.svg'" text="Registrar"
                @click="openRegisterModal" />
        </div>

        <LoginComponent v-if="isLoginModalVisible" @close="closeLoginModal" key="loginModal" />
        <RegisterComponent v-if="isRegisterModalVisible" @close="closeRegisterModal" key="registerModal" />
    </div>
</template>

<script>
import BotonTextoImagenComponent from './BotonTextoImagenComponent.vue';
import LoginComponent from './LoginComponent.vue';
import RegisterComponent from './RegisterComponent.vue'; // Importamos el componente de registro

export default {
    name: "AccederComponent",
    components: {
        BotonTextoImagenComponent,
        LoginComponent,
        RegisterComponent, // Agregamos el componente de registro
    },
    data() {
        return {
            isMenuOpen: false,
            isLoginModalVisible: false,
            isRegisterModalVisible: false, // Nueva propiedad para controlar la visibilidad del modal de registro
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            if (this.isMenuOpen) {
                document.addEventListener("click", this.handleOutsideClick);
            } else {
                document.removeEventListener("click", this.handleOutsideClick);
            }
        },
        handleOutsideClick(event) {
            const menu = this.$refs.menu;
            const accederContainer = this.$refs.accederContainer;
            if (menu && !menu.contains(event.target) && !accederContainer.contains(event.target)) {
                this.isMenuOpen = false;
                document.removeEventListener("click", this.handleOutsideClick);
            }
        },
        openLoginModal() {
            this.isLoginModalVisible = true;
            this.isMenuOpen = false;
        },
        closeLoginModal() {
            this.isLoginModalVisible = false;
        },
        openRegisterModal() {
            this.isRegisterModalVisible = true;
            this.isMenuOpen = false;
        },
        closeRegisterModal() {
            this.isRegisterModalVisible = false;
        }
    }
};
</script>


<style scoped>
.acceder-container {
    position: relative;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    padding: 10px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
}

.menu .boton-texto-imagen {
    width: 100%;
}

.acceder-container .boton-texto-imagen {
    width: 100%;
}
</style>
