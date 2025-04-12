<template>
    <div class="tarjeta-publicacion" @click="handleClick">
      <div class="tarjeta-header">
        <img
          class="perfil-img"
          :src="publicacion.usuario.imagenPerfil"
          alt="Imagen de perfil"
        />
        <div class="contenido-principal">
          <div class="titulo-e-interacciones">
            <h2 class="tarjeta-titulo">{{ publicacion.titulo }}</h2>
            <div class="interacciones-horizontales">
              <div class="interaccion">
                <span class="label">Likes</span>
                <span class="valor">{{ publicacion.totalMeGusta }}</span>
              </div>
              <div class="interaccion">
                <span class="label">Comentarios</span>
                <span class="valor">{{ publicacion.totalComentarios }}</span>
              </div>
            </div>
          </div>
          <div class="info-segunda-linea">
            <div class="user-info-container">
              <h3 class="username">{{ publicacion.usuario.username }}</h3>
              <div class="categoria">
                <span class="categoria-punto"></span>
                <span>{{ publicacion.categoria }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TarjetaPublicacionComponent',
    props: {
      publicacion: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.$emit('seleccionada', this.publicacion)
      }
    }
  }
  </script>
  
  <style scoped>
  .tarjeta-publicacion {
    background-color: #fff;
    border: none;
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    transition: all 0.3s ease;
  }
  .tarjeta-publicacion:hover {
    background-color: #f4f4f4;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .tarjeta-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .perfil-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .contenido-principal {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .titulo-e-interacciones {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tarjeta-titulo {
    font-size: 18px;
    color: #333;
    margin: 0;
    text-align: left;
  }
  .interacciones-horizontales {
    display: flex;
    gap: 16px;
  }
  .interaccion {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .interaccion .label {
    font-size: 13px;
    font-weight: 600;
    color: #555;
  }
  .interaccion .valor {
    font-size: 15px;
    font-weight: bold;
    color: #222;
  }
  .info-segunda-linea {
    margin-top: 4px;
  }
  .user-info-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .username {
    margin: 0;
    font-size: 15px;
    color: #333;
  }
  .categoria {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #6c5ce7;
    font-weight: 400;
    font-size: 14px;
  }
  .categoria-punto {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #6c5ce7;
    box-shadow: 0 0 6px #6c5ce7;
  }
  </style>
  