<template>
  <div class="configuracion-page">
    <aside class="config-sidebar">
      <div class="sidebar-title">Configuración</div>
      <nav class="menu-opciones">
        <button class="menu-item">
          <svg class="menu-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" stroke="#333" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 20c0-2.67 4-4 8-4s8 1.33 8 4" stroke="#333" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span>Mi perfil</span>
        </button>
      </nav>
    </aside>

    <main class="config-content">
      <MiPerfilConfigComponent />
    </main>
  </div>
</template>

<script>
import MiPerfilConfigComponent from '@/components/config/MiPerfilConfigComponent.vue';

export default {
  components: {
    MiPerfilConfigComponent,
  }
};
</script>


<style scoped>
.configuracion-page {
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.config-sidebar {
  width: 260px;
  background-color: #ffffff;
  border-right: 2px solid #e0e0e0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100vh;
  box-sizing: border-box;
}

.sidebar-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #2c3e50;
  padding-bottom: 8px;
  border-bottom: 2px solid #5dade2;
  text-align: center;
  letter-spacing: 0.5px;
}

.menu-opciones {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8f9fa;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.menu-item:hover {
  background-color: #d6eaff;
  color: #007acc;
}

.menu-icon {
  width: 18px;
  height: 18px;
  stroke: #333;
}

.config-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 8px 12px 12px;
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>