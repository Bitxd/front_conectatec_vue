<template>
    <div class="notificacion-config">
      <header class="config-header">
        <h2>Configuración de perfil</h2>
        <hr class="config-separator" />
      </header>
  
      <ImagenPerfilConfig :imagenPerfil="usuario?.imagenPerfil" />
    </div>
  </template>
  
  <script>
  import ImagenPerfilConfig from './ImagenPerfilConfig.vue'
  
  export default {
    components: { ImagenPerfilConfig },
    data() {
      return {
        usuario: null
      }
    },
    mounted() {
      // 1) Leer en crudo
      const raw = localStorage.getItem('usuario')
      console.log('raw localStorage[usuario]:', raw)
  
      try {
        // 2) Parsear y asignar
        const parsed = JSON.parse(raw)
        console.log('parsed usuario:', parsed)
        this.usuario = (parsed && typeof parsed === 'object') ? parsed : null
      } catch (e) {
        console.error('Error parseando localStorage[usuario]:', e)
      }
  
      console.log('USUARIO final en data():', this.usuario)
    }
  }
  </script>
  



<style>
.notificacion-config {
    padding: 8px;
    width: 100%;
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
</style>