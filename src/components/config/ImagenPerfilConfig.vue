<template>
    <div class="avatar-container">
        <h2 class="metodos-title">Tu imagen principal</h2>
        <div class="avatar-wrapper">
            <div class="image-frame" @click="triggerFileDialog">
                <img :src="fotoPreview" alt="Avatar" class="profile-avatar" />
                <div class="hover-overlay"></div>
            </div>
          
        </div>
        <input type="file" accept="image/*" ref="fileInput" hidden @change="cargarImagen" />
    </div>
</template>



<style scoped>
.avatar-container {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 0 20px 20px;
    margin: 30px 5px 0;
    width: 35%;
    align-self: flex-start;
}

.metodos-title {
    font-size: 22px;
    margin: 0 -20px 12px;
    padding: 5px 12px;
    background: #e6f2ff;
    color: #333;
    border-radius: 6px 6px 0 0;
    text-align: left;
    font-weight: normal;
}

.avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
}

.image-frame {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: linear-gradient(45deg, #c3dafe, #93c5fd);
    padding: 6px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.profile-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
}

.button-container {
    display: flex;
    gap: 12px;
    margin-top: 15px;
}

.btn-eliminar,
.btn-guardar {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.3s ease;
}

.btn-eliminar:hover,
.btn-guardar:hover {
    transform: translateY(-3px);
}

.btn-eliminar {
    background: #fee2e2;
    color: #dc2626;
}

.btn-guardar {
    background: #dbeafe;
    color: #2563eb;
}

.icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 8px;
    fill: currentColor;
}
</style>


<script>
import userApi from '@/apis/userApi';

export default {
  props: {
    imagenPerfil: { type: String, default: null }
  },
  data() {
    return {
      defaultImage: 'https://placehold.co/180x180?text=Perfil',
      fotoPreview: this.imagenPerfil || 'https://placehold.co/180x180?text=Perfil',
      archivoSeleccionado: null
    };
  },
  watch: {
    imagenPerfil(newVal) {
      this.fotoPreview = newVal || this.defaultImage;
    }
  },
  mounted() {
    console.log('imagenPerfil recibida (prop):', this.imagenPerfil);
    console.log('fotoPreview inicial:', this.fotoPreview);
  },
  methods: {
    triggerFileDialog() {
      this.$refs.fileInput.click();
    },
    cargarImagen(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.archivoSeleccionado = file;
      this.fotoPreview = URL.createObjectURL(file);
      console.log('nueva fotoPreview (blob URL):', this.fotoPreview);
      e.target.value = '';
    },
    eliminarImagen() {
      this.fotoPreview = this.defaultImage;
      this.archivoSeleccionado = null;
      console.log('fotoPreview tras eliminar:', this.fotoPreview);
      this.$refs.fileInput.value = null;
    },
    async guardarCambios() {
      // 1) Obtener token directamente de localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token de autenticación.');
        return;
      }
      // 2) Verificar que haya un archivo seleccionado
      if (!this.archivoSeleccionado) {
        console.warn('No hay archivo nuevo seleccionado, no se hace petición.');
        return;
      }
      try {
        const response = await userApi.actualizarImagenPerfil(token, this.archivoSeleccionado);
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        usuario.imagenPerfil = response.imagenPerfil; 
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.fotoPreview = response.imagenPerfil;
        console.log('Imagen actualizada:', response.imagenPerfil);
        this.$emit('imagen-guardada', usuario.imagenPerfil);
      } catch (err) {
        console.error('Error al actualizar la imagen:', err);
      }
    }
  }
};
</script>