<template>
    <div class="user-menu" ref="userMenu">
        <BotonImagenComponent image="/icons/notificacion-icon.svg" altText="Notificaciones" description="Notificaciones"/>
        <span class="username">{{ username }}</span>
        <BotonImagenComponent image="/icons/user-icon.svg" altText="Usuario" @click="toggleMenu" />
        <div v-if="menuVisible" class="menu">
            <BotonTextoImagenComponent :image="'/icons/user-icon.svg'" text="Perfil" @click="botonPerfil" />
            <BotonTextoImagenComponent :image="'/icons/configuracion-icon.svg'" text="Configuracion" @click="botonConfiguracion" />
            <BotonTextoImagenComponent :image="'/icons/cerrar-sesion-icon.svg'" text="Cerrar sesion" @click="botonCerrarSesion" />
        </div>
    </div>
    <LogoutComponent v-if="mostrarLogout" @cerrar="mostrarLogout = false" />
</template>

<script>
import BotonImagenComponent from './BotonImagenComponent.vue';
import BotonTextoImagenComponent from './BotonTextoImagenComponent.vue';
import LogoutComponent from './LogoutComponent.vue';
import authService from '../apis/userApi';

export default
{
    name: 'UserMenuComponent',
    components:
    {
        BotonImagenComponent,
        BotonTextoImagenComponent,
        LogoutComponent
    },
    data()
    {
        return{
            username: '',
            menuVisible: false,
            mostrarLogout: false

        };
    },
    methods:
    {
        toggleMenu()
        {
            this.menuVisible = !this.menuVisible;
        },
        // Metodo para cargar el perfil
        async cargarPerfil()
        {
            try
            {
                // Buscamos el token, si no está simplemente no se va a cargar
                if (!localStorage.getItem('token'))
                {
                    console.warn('Token no disponible');
                    return;
                }
                // Si está el token, obtenemos el perfil del usuario haciendo una peticion pasando el token por parametro.
                const perfil = await authService.obtenerPerfilUsuario(localStorage.getItem('token'));
                this.username = perfil.username;
            }
            catch (error)
            {
                console.error('Error al cargar el perfil del usuario:', error);
            }
        },
        closeMenuIfClickedOutside(event)
        {
            const menuElement = this.$refs.userMenu;
            if (menuElement && !menuElement.contains(event.target))
            {
                this.menuVisible = false;
            }
        },
        botonPerfil()
        {
            alert("Boton perfil");
        },
        botonConfiguracion()
        {
            alert("Boton configuracion");
        },
        botonCerrarSesion()
        {
            this.mostrarLogout = true;
        
        }
    },
    mounted()
    {
        document.addEventListener('mousedown', this.closeMenuIfClickedOutside);
        this.cargarPerfil(); 
    },
    beforeUnmount()
    {
        document.removeEventListener('mousedown', this.closeMenuIfClickedOutside);
    }
};
</script>



<style scoped>
.user-menu {
    display: flex;
    align-items: center;
    gap: 10px;
}

.username {
    font-size: 16px;
    font-weight: bold;
}

.menu {
    position: absolute;
    top: 50px;
    right: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px;
}

.menu button {
    display: block;
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: none;
    background-color: #f8f9fa;
    cursor: pointer;
    text-align: left;
}

.menu button:hover {
    background-color: #e9ecef;
}
</style>
