<template>
  <header class="app-header">
    <!-- Logo al borde -->
    <div class="logo-area" @click.prevent="goHome">
      <span class="logo-text">
        Conecta<span class="logo-highlight">TEC</span>
      </span>
    </div>

    <!-- Separador vertical -->
    <div class="separator"></div>

    <!-- Navegación principal -->
    <nav class="nav-area">
      <a class="nav-link" @click.prevent="botonChatbot">
        <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-5 4V6a2 2 0 0 1 2-2z" />
        </svg>
        Chatbot
      </a>
      <a class="nav-link" @click.prevent="botonUniversidad">
        <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2l8 4v2H4V6l8-4zm0 6l7 3v8H5v-8l7-3z" />
        </svg>
        Universidades
      </a>
    </nav>

    <div class="user-area">
      <div v-if="fullname" class="user-separator"></div>
      <span v-if="fullname" class="user-name">{{ fullname }}</span>
      <SidebarComponent v-if="isAuthenticated" />
      <AccederComponent v-else @closeMenu="closeMenu" />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 60px;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  background: linear-gradient(90deg, #ffffff 0%, #f0f4f8 100%);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.logo-area {
  cursor: pointer;
  padding-left: 0;
  margin-left: 0;
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 900;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
  white-space: nowrap;
  transition: transform 0.2s ease;
  padding: 0 20px;
}

.logo-text:hover {
  transform: scale(1.05);
}

.logo-highlight {
  color: #5ac3f3;
}

/* Separador vertical */
.separator {
  width: 1px;
  height: 60%;
  background-color: #d1d5db;
  margin: 0 12px;
  border-radius: 1px;
}

.nav-area {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}

.nav-link {
  display: flex;
  align-items: center;
  background: #5ac3f3;
  color: #fff;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.3s, transform 0.2s;
}

.nav-link:hover {
  background: #7ecdeb;
  transform: translateY(-2px);
}

.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  flex-shrink: 0;
}

.user-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  height: 100%;
}

.user-separator {
  width: 1px;
  height: 50%;
  background-color: #d1d5db;
  margin: 0 10px;
  align-self: center;
}

.user-name {
  margin-top: 5px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

</style>



<script>
import SidebarComponent from './SidebarComponent.vue';
import AccederComponent from './AccederComponent.vue';
import authService from '../services/authService';

export default {
  name: 'HeaderComponent',
  components: { SidebarComponent, AccederComponent },
  data() {
    return {
      usuario: JSON.parse(localStorage.getItem('usuario')) || {},
      isAuthenticated: authService.isAuthenticated(),
    };
  },
  computed: {
    fullname() {
      return this.usuario.fullname || '';
    }
  },
  methods: {
    botonChatbot() {
      this.$router.push({ name: 'Chatbot' });
    },
    botonUniversidad() {
      this.$router.push({ name: 'Universidades' });
    },
    goHome() {
      this.$router.push({ name: 'Home' });
    },
    closeMenu() {
      console.log('Cerrando el menú');
    }
  }
};
</script>
