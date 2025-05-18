<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Icono de Página Principal -->
      <div
        class="sidebar-item"
        :class="{ active: currentView === 'home' }"
        aria-label="Página Principal"
        role="button"
        data-tooltip="Inicio"
        @click="currentView = 'home'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#4a90e2" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      </div>

      <!-- Icono de Eventos -->
      <div
        class="sidebar-item"
        :class="{ active: currentView === 'events' }"
        aria-label="Recordatorios"
        role="button"
        data-tooltip="Recordatorios"
        @click="currentView = 'events'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#4a90e2" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>

      <!-- Icono de Notas -->
      
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <component :is="currentComponent" class="view-component" />
    </main>
  </div>
</template>

<script>
import PagPrincipal from '@/dashboard/PagPrincipal.vue'
import ListaEventos from '@/dashboard/ListaEventos.vue'
import NotasUsuario from '@/dashboard/NotasUsuario.vue'

export default {
  name: 'DashboardPage',
  components: {
    PagPrincipal,
    ListaEventos,
    NotasUsuario
  },
  data() {
    return {
      currentView: 'home'
    }
  },
  computed: {
    currentComponent() {
      switch (this.currentView) {
        case 'events':
          return 'ListaEventos'
        case 'notes':
          return 'NotasUsuario'
        default:
          return 'PagPrincipal'
      }
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f2f5;
  font-family: 'Inter', sans-serif;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 1rem 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 0;
  z-index: 10;
}

.sidebar-item {
  width: 48px;
  height: 48px;
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #6b7280;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
  position: relative;
}

.sidebar-item svg {
  width: 24px;
  height: 24px;
}

.sidebar-item:hover,
.sidebar-item.active {
  background-color: #e6f0ff;
  color: #4a90e2;
}

.sidebar-item[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #4a90e2;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  z-index: 100;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  position: relative; 
}



.view-component {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  inset: 0;
}

</style>
