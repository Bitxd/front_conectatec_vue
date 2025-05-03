<template>
    <div class="notificacion-config">
        <header class="config-header">
            <h2>Configuración de perfíl</h2>
            <hr class="config-separator" />
        </header>

        <div class="avatar-container">
            <div class="avatar-wrapper">
                <div class="avatar-label">
                    <span class="star">★</span>
                    Tu imagen principal
                </div>

                <div class="image-frame" @click="triggerFileDialog">
                    <img :src="fotoPreview || defaultImage" alt="Avatar" class="profile-avatar" />
                    <div class="hover-overlay"></div>
                </div>
            </div>
        </div>

        <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="cargarImagen" />
    </div>
</template>

<style scoped>
.notificacion-config {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.config-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
    padding-top: 0;
}

.config-header h2 {
    font-size: 26px;
    font-weight: normal;
    margin: 0 0 2px 8px;
    line-height: 1.1;
    margin-top: -4px;
    margin-bottom: 5px;
}

.config-separator {
    width: 100%;
    border: none;
    height: 2px;
    background-color: #000;
    border-radius: 4px;
    margin: 0;
}

.avatar-container {
    position: relative;
    display: flex;
    justify-content: center;
}

.avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
}

.image-frame {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: linear-gradient(45deg, #c3dafe, #93c5fd);
    padding: 6px;
    box-shadow: 0 8px 24px rgba(147, 197, 253, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.profile-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    transition: all 0.3s ease;
}

.hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-frame:hover {
    transform: scale(1.03);
}

.image-frame:hover .hover-overlay {
    opacity: 1;
}

.avatar-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #4a5568;
    letter-spacing: -0.2px;
}

.star {
    color: #93c5fd;
    font-size: 20px;
    filter: drop-shadow(0 2px 4px rgba(147, 197, 253, 0.3));
}
</style>

<script>
export default {
    data() {
        return {
            fotoPreview: null,
            defaultImage: 'https://via.placeholder.com/180?text=Perfil',
        };
    },
    methods: {
        triggerFileDialog() {
            this.$refs.fileInput.click();
        },
        cargarImagen(event) {
            const file = event.target.files[0];
            if (file) {
                const datos = JSON.parse(localStorage.getItem('usuario')) || {};
                const nuevaImagen = URL.createObjectURL(file);
                datos.imagenPerfil = nuevaImagen;
                localStorage.setItem('usuario', JSON.stringify(datos));
                this.fotoPreview = nuevaImagen;
            }
        },
    },
    mounted() {
        const datos = JSON.parse(localStorage.getItem('usuario'));
        this.fotoPreview = datos?.imagenPerfil || null;
    },
};
</script>