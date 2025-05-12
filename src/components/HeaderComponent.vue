<template>
  <header class="header">
    <div class="container">
      <div class="left-items">
        <div class="logo-and-buttons">
          <!-- Logo textual -->
          <span class="logo-text" @click.prevent="goHome">
            Conecta<span class="logo-highlight">TEC</span>
          </span>
          <!-- Enlaces con SVG inline -->
          <a class="link" @click.prevent="botonChatbot">
            <svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-5 4V6a2 2 0 0 1 2-2z"
              />
            </svg>
            <span>Chatbot</span>
          </a>
          <a class="link" @click.prevent="botonUniversidad">
            <svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2l8 4v2H4V6l8-4zm0 6l7 3v8H5v-8l7-3z"
              />
            </svg>
            <span>Universidades</span>
          </a>
        </div>
        <SidebarComponent />
      </div>
      <div class="right-items">
        <UserMenuComponent v-if="isAuthenticated" />
        <AccederComponent v-else @closeMenu="closeMenu" />
      </div>
    </div>
  </header>
</template>

<script>
import SidebarComponent from './SidebarComponent.vue'
import AccederComponent from './AccederComponent.vue'
import UserMenuComponent from './user/UserMenuComponent.vue'
import authService from '../services/authService'

export default {
  name: 'HeaderComponent',
  components: {
    SidebarComponent,
    AccederComponent,
    UserMenuComponent
  },
  data() {
    return {
      isAuthenticated: authService.isAuthenticated()
    }
  },
  methods: {
    botonChatbot() {
      this.$router.push({ name: 'Chatbot' })
    },
    botonUniversidad() {
      this.$router.push({ name: 'Universidades' })
    },
    goHome() {
      this.$router.push({ name: 'Home' })
    },
    closeMenu() {
      console.log('Cerrando el menú')
    }
  }
}
</script>

<style scoped>
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
  gap: 10px;
  justify-content: flex-start;
}

.logo-and-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 5%; 
}

.logo-text {
  font-size: 20px;            
  font-weight: 800;
  color: #4a4a4a;            
  margin-left: -130px;
  margin-right: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo-text:hover {
  transform: translateY(-2px) scale(1.05); 
}

.logo-highlight {
  color: #5ac3f3;
}

.right-items {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 65px;
}

.link {
  display: flex;
  align-items: center;
  color: #ffffff;
  background-color: #5ac3f3;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.link:hover {
  background-color: #7ecdeb;
  transform: translateY(-2px);
}

.link-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  flex-shrink: 0;
}

.link span {
  display: inline-block;
}
</style>
