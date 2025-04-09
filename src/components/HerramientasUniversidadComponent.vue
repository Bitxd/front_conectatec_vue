<template>
    <div class="herramientas-universidad">
      <!-- Botón de herramientas -->
      <BotonImagenComponent 
        image="/icons/menu-aplicaciones-icon.svg" 
        alt-text="Botón" 
        description="Herramientas" 
        @click="toggleMenu" 
      />
  
      <!-- Menú flotante (Grid) -->
      <div v-if="menuVisible" class="menu-flotante" ref="menuFlotante">
        <!-- Descripción del menú -->
        <div class="descripcion">
          <p>Seleccione una opción para explorar más detalles</p>
        </div>
  
        <!-- Elementos del menú -->
        <div class="menu-items">
          <div class="menu-item">
            <BotonTextoImagenComponent 
              image="/icons/carrera-universitaria-icon.svg" 
              text="Carreras" 
            />
          </div>
          <div class="menu-item">
            <BotonTextoImagenComponent 
              image="/icons/libreria-icon.svg" 
              text="Librería" 
            />
          </div>
          <div class="menu-item">
            <BotonTextoImagenComponent 
              image="/icons/materias-icon.svg" 
              text="Materias" 
            />
          </div>
          <div class="menu-item">
            <BotonTextoImagenComponent 
              image="/icons/logros-icon.svg" 
              text="Logros" 
            />
          </div>
          <div class="menu-item">
            <BotonTextoImagenComponent 
              image="/icons/coordinador-icon.svg" 
              text="Coordinadores" 
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BotonImagenComponent from './BotonImagenComponent.vue';
  import BotonTextoImagenComponent from './BotonTextoImagenComponent.vue';
  
  export default {
    name: 'HerramientasUniversidadComponent',
    components: {
      BotonImagenComponent,
      BotonTextoImagenComponent
    },
    data() {
      return {
        menuVisible: false // Controla si el menú está visible o no
      };
    },
    methods: {
      // Toggle para mostrar/ocultar el menú flotante
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      // Cierra el menú si el clic es fuera de él
      handleClickOutside(event) {
        if (this.menuVisible && !this.$refs.menuFlotante.contains(event.target)) {
          this.menuVisible = false;
        }
      }
    },
    mounted() {
      // Detectar clics fuera del menú
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
      // Limpiar el evento cuando el componente se destruya
      document.removeEventListener('click', this.handleClickOutside);
    }
  };
  </script>
  
  <style scoped>
  .herramientas-universidad {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  /* Menú flotante con animación, fondo blanco y sombra */
  .menu-flotante {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    width: 350px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    z-index: 999;
    animation: fadeIn 0.3s ease-out;
  }
  
  /* Animación para suavizar aparición del menú */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }
  
  /* Descripción en la parte superior del menú */
  .descripcion {
    text-align: center;
    font-size: 16px;
    color: #333;
    margin-bottom: 16px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  
  /* Rejilla para los botones del menú */
  .menu-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }
  
  /* Alineación de cada item */
  .menu-item {
    display: flex;
    justify-content: center;
  }
  
  /* Ajustes responsivos */
  @media (max-width: 768px) {
    .menu-flotante {
      width: 90%;
      top: 50px;
    }
    
    .menu-items {
      grid-template-columns: 1fr;
    }
  }
  </style>
  