<template>
  <div class="modal-mask">
    <div class="modal-container">
      <header class="modal-header">
        <h3>Crear Publicación</h3>
        
        <div class="categoria-section">
          <span v-if="categoria" class="categoria-activa">{{ categoria.nombre }}</span>
          <span v-else class="categoria-faltante">Selecciona una categoría</span>
          <BotonTextoImagenComponent 
            image="/icons/categoria-icon.svg" 
            altText="Categoria" 
            text="Categoria"
            @click="mostrarSelectorCategoria = !mostrarSelectorCategoria" 
          />
          <div v-if="mostrarSelectorCategoria" class="categoria-selector">
            <div 
              v-for="cat in categorias" 
              :key="cat._id.$oid" 
              class="categoria-item"
              @click="seleccionarCategoria(cat)"
            >
              {{ cat.nombre }}
            </div>
          </div>
        </div>
      </header>

      <div class="modal-content">
        <div class="content-row">
          <div class="image-upload-section">
            <div class="image-preview" v-if="imagenSeleccionada"
              :style="{ backgroundImage: 'url(' + imagenSeleccionada + ')' }"></div>
            <div class="image-placeholder" v-else>
              <span>Vista previa de la imagen</span>
            </div>
            <input type="file" ref="fileInput" class="file-input" @change="seleccionarImagen" accept="image/*" />
            <div class="image-buttons">
              <BotonTextoImagenComponent image="/icons/agregar-imagen-icon.svg" altText="Añadir imagen"
                text="Añadir imagen" @click="abrirSelectorImagen" />
              <BotonTextoImagenComponent image="/icons/eliminar-icon.svg" altText="Eliminar imagen"
                text="Eliminar imagen" :disabled="!imagenSeleccionada" @click="eliminarImagen" />
            </div>
          </div>
          <div class="text-fields">
            <input type="text" class="title-input" placeholder="Título de la publicación" v-model="titulo" />
            <textarea class="body-input" placeholder="Escribe el contenido aquí..." v-model="contenido"></textarea>

            <p v-if="errorMensaje" class="error-text">{{ errorMensaje }}</p>
          </div>
        </div>
      </div>

      <footer class="modal-footer">
        <BotonTextoImagenComponent image="/icons/agregar-icon.svg" altText="Publicar" text="Publicar"
          @click="publicar" />
        <BotonTextoImagenComponent image="/icons/cancelar-icon.svg" altText="Cancelar" text="Cancelar"
          @click="cerrarModal" />
      </footer>
    </div>
  </div>
</template>

<script>
import BotonTextoImagenComponent from '@/components/BotonTextoImagenComponent.vue'
import obtenerCategorias from '@/apis/categoriaApi'

export default {
  name: 'CrearPublicacionComponent',
  components: {
    BotonTextoImagenComponent,
  },
  data() {
    return {
      categorias: [],
      imagenSeleccionada: null,
      titulo: '',
      contenido: '',
      categoria: null,
      errorMensaje: '',
      mostrarSelectorCategoria: false
    }
  },
  async mounted() {
    await this.loadCategorias();
  },
  methods: {
    async loadCategorias() {
      try {
        this.categorias = await obtenerCategorias();
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        this.errorMensaje = 'No se pudieron cargar las categorías';
      }
    },
    abrirSelectorImagen() {
      this.$refs.fileInput.click();
    },
    seleccionarImagen(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagenSeleccionada = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    eliminarImagen() {
      this.imagenSeleccionada = null
      this.$refs.fileInput.value = null
    },
    seleccionarCategoria(categoria) {
      this.categoria = categoria;
      this.mostrarSelectorCategoria = false;
    },
    publicar() {
      this.errorMensaje = ''

      if (!this.titulo.trim()) {
        this.errorMensaje = 'Por favor ingresa un título para la publicación.';
        return;
      }

      if (!this.contenido.trim()) {
        this.errorMensaje = 'Por favor escribe el contenido de la publicación.';
        return;
      }

      if (!this.categoria) {
        this.errorMensaje = 'Por favor selecciona una categoría antes de publicar.';
        return;
      }

      console.log('Publicación creada:', {
        titulo: this.titulo,
        contenido: this.contenido,
        categoria: this.categoria,
        imagen: this.imagenSeleccionada
      })

      this.cerrarModal()
    },
    cerrarModal() {
      this.$emit('cerrar-modal')
    },
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 80%;
  height: 90%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #f7f7f7;
  position: relative;
}

.modal-header h3 {
  margin: 0;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
  position: relative;
  padding-left: 30px;
}

.modal-header h3::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  width: 0;
  height: 0;
  border-left: 10px solid #7f3fbf;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transform: translateY(-50%);
}

.categoria-section {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.categoria-selector {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #f7f7f7;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.categoria-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.categoria-item:hover {
  background-color: #f7f7f7;
}

.modal-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
}

.content-row {
  display: flex;
  gap: 25px;
}

.image-upload-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-preview {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
  border: 1px solid #f7f7f7;
  margin-bottom: 15px;
}

.image-placeholder {
  width: 100%;
  height: 250px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777777;
  margin-bottom: 15px;
}

.file-input {
  display: none;
}

.image-buttons {
  display: flex;
  gap: 15px;
}

.text-fields {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.title-input,
.body-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #f7f7f7;
  border-radius: 4px;
  font-size: 16px;
}

.title-input {
  height: 45px;
}

.body-input {
  height: 80%;
  resize: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 5px 10px;
  background-color: white;
  border-top: 1px solid #f7f7f7;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  top: -10px;
}

.categoria-activa {
  font-size: 0.95rem;
  color: #4caf50;
}

.categoria-faltante {
  font-size: 0.95rem;
  color: #ff9800;
}

.error-text {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>