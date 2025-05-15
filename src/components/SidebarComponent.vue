<template>
  <div class="sidebar">
    <img
      v-if="imagenPerfil"
      :src="imagenPerfil"
      alt="Perfil"
      class="avatar"
      @click="toggleMenu"
    />
    <div
      v-if="menuAbierto"
      class="dropdown-menu"
      v-click-outside="cerrarMenu"
    >
      <ul>
        <li @click="irAMiPerfil">
          <img src="/icons/perfil.svg" alt="Icono perfil" class="icon" />
          Mi perfil
        </li>
        <li @click="irARecordatorios">
          <img src="/icons/recordatorio.svg" alt="Icono recordatorios" class="icon" />
          Recordatorios
        </li>
        <li @click="irAConfiguracion">
          <img src="/icons/configuracion-icon.svg" alt="Icono configuración" class="icon" />
          Configuración
        </li>
        <li @click="cerrarSesion">
          <img src="/icons/cerrar-sesion-icon.svg" alt="Icono cerrar sesión" class="icon" />
          Cerrar sesión
        </li>
      </ul>
    </div>
  </div>
</template>




<style scoped>
.sidebar {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  padding-left: 20px;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #5ac3f3;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(90, 195, 243, 0.8);
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  width: 200px;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-menu li:hover {
  background-color: #f0f4f8;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  filter: invert(56%) sepia(67%) saturate(2874%) hue-rotate(180deg) brightness(95%) contrast(90%);
}


@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>


<script>
import clickOutside from '@/utils/v-click-outside';

export default {
  name: 'SidebarComponent',
  directives: {
    clickOutside,
  },
  data() {
    return {
      imagenPerfil: null,
      menuAbierto: false,
    };
  },
  mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    this.imagenPerfil =
      usuario?.imagenPerfil ||
      'https://jeffjbutler.com/wp-content/uploads/2018/01/default-user-300x300.png';
  },
  methods: {
    // Ahora recibe el evento y detiene su propagación
    toggleMenu(event) {
      event.stopPropagation();
      this.menuAbierto = !this.menuAbierto;
    },
    cerrarMenu() {
      this.menuAbierto = false;
    },
    irAMiPerfil() {
      console.log('Navegar a Mi perfil');
    },
    irARecordatorios() {
      console.log('Navegar a Recordatorios');
    },
    irAConfiguracion() {
      console.log('Navegar a Configuración');
    },
    cerrarSesion() {
      console.log('Cerrar sesión');
    },
  },
};
</script>

