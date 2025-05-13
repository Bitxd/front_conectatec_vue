<template>
  <div class="herramientas-universidad">
    <BotonImagenComponent
      image="/icons/menu-aplicaciones-icon.svg"
      alt-text="Botón"
      description="Herramientas"
      @click="toggleMenu"
    />
    <div v-if="menuVisible" class="menu-flotante" ref="menuFlotante">
      <div class="descripcion">
        <p>Seleccione una opción para explorar más detalles</p>
      </div>
      <div class="menu-items">
        <div class="menu-item">
          <BotonTextoImagenComponent
            image="/icons/carrera-universitaria-icon.svg"
            text="Carreras"
            @click="goCarreras"
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
            @click="goCoordinadores"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BotonImagenComponent from './BotonImagenComponent.vue'
import BotonTextoImagenComponent from './BotonTextoImagenComponent.vue'

export default {
  name: 'HerramientasUniversidadComponent',
  components: {
    BotonImagenComponent,
    BotonTextoImagenComponent
  },
  props: {
    idEscuela: {
      type: String,
      required: true
    },
    nombreUniversidad: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuVisible: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
    handleClickOutside(event) {
      if (this.menuVisible && !this.$refs.menuFlotante.contains(event.target)) {
        this.menuVisible = false
      }
    },
    goCarreras() {
      this.$router.push({ name: 'Carreras', params: { id: this.idEscuela }, query: { nombre: this.nombreUniversidad } })
      this.menuVisible = false
    },
    goCoordinadores() {
      this.$router.push({ name: 'Coordinadores', params: { id: this.idEscuela }, query: { nombre: this.nombreUniversidad } })
      this.menuVisible = false
    }
  },
  mounted() {
    console.log(`Universidad: ${this.nombreUniversidad}`)
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>


<style scoped>
.herramientas-universidad {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}


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


.descripcion {
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}


.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}


.menu-item {
  display: flex;
  justify-content: center;
}


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