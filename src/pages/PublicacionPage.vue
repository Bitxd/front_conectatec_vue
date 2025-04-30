<template>
    <div class="publicacion-fullwidth">
      <!-- Columna izquierda: tarjeta de publicación -->
      <div class="publicacion-card">
        <!-- Header de usuario -->
        <div class="usuario-header">
          <img
            :src="publicacion.usuario.imagenPerfil || '/default-avatar.png'"
            class="usuario-avatar"
            alt="Avatar"
          />
          <div class="usuario-info">
            <div class="usuario-nombres">
              <span class="usuario-fullname">{{ publicacion.usuario.fullname }}</span>
              <span class="usuario-username">@{{ publicacion.usuario.username }}</span>
            </div>
            <div class="publicacion-meta">
              <span class="publicacion-fecha">
                {{ formatearFecha(publicacion.usuario.fechaPublicacion) }}
              </span>
              <span class="publicacion-categoria">{{ publicacion.categoria }}</span>
            </div>
          </div>
        </div>
  
        <!-- Contenido principal -->
        <div class="publicacion-content">
          <h1 class="publicacion-titulo">{{ publicacion.titulo }}</h1>
          <p class="publicacion-texto">{{ publicacion.contenido }}</p>
          <template v-if="publicacion.imagen">
            <img
              :src="publicacion.imagen"
              class="publicacion-imagen"
              alt="Imagen de publicación"
            />
          </template>
        </div>
  
        <!-- Footer de interacciones -->
        <div class="publicacion-footer">
          <div class="interacciones">
            <LikeButtonComponent />
            <button class="interaccion-btn comentario-btn">
              💬 {{ publicacion.totalComentarios }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Separador vertical -->
      <div class="vertical-separator"></div>
  
      <!-- Columna derecha: lista de comentarios + formulario -->
      <div class="comentarios-container">
        <ComentariosComponent
          v-if="publicacion.idPublicacion"
          :id="publicacion.idPublicacion"
        />
        <ComentarComponent
          :idPublicacion="publicacion.idPublicacion"
          class="comentar-form"
        />
      </div>
    </div>
  </template>
  
  <style scoped>
  .publicacion-fullwidth {
    display: flex;
    align-items: stretch;
    gap: 0;
    width: 100%;
    background-color: white;
    padding: 20px 0;
    box-sizing: border-box;
  }
  
  .publicacion-card,
  .comentarios-container {
    flex: 1;
    padding: 0 20px;
  }
  
  .vertical-separator {
    width: 4px;
    background: linear-gradient(to bottom, #d0d0d0, #f0f0f0);
    border-radius: 4px;
    margin: 0;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
  }
  
  /* Comentarios */
  .comentarios-container {
    display: flex;
    flex-direction: column;
  }
  
  .comentarios-container > * {
    width: 100%;
  }
  
  .comentar-form {
    margin-top: 16px;
  }
  
  /* Estilos de la publicación */
  .usuario-header {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: white;
    text-align: left;
  }
  
  .usuario-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
  }
  
  .usuario-info {
    flex: 1;
    text-align: left;
  }
  
  .usuario-nombres {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .usuario-fullname {
    font-weight: 600;
    color: #333333;
    text-align: left;
  }
  
  .usuario-username {
    color: #777777;
    font-size: 0.9em;
    text-align: left;
  }
  
  .publicacion-meta {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    font-size: 0.85em;
    color: #777777;
    justify-content: flex-start;
  }
  
  .publicacion-categoria {
    background-color: #f7f7f7;
    padding: 2px 8px;
    border-radius: 4px;
    color: #007bff;
  }
  
  .publicacion-content {
    padding: 16px;
    text-align: left;
  }
  
  .publicacion-titulo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333333;
    margin-bottom: 12px;
    text-align: left;
  }
  
  .publicacion-texto {
    color: #333333;
    line-height: 1.6;
    margin-bottom: 16px;
    text-align: left;
  }
  
  .publicacion-imagen {
    max-width: 100%;
    max-height: 400px;
    margin-top: 12px;
    object-fit: contain;
    display: block;
  }
  
  .publicacion-texto:last-child {
    margin-bottom: 0;
  }
  
  .publicacion-footer {
    padding: 12px 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    text-align: left;
  }
  
  .interacciones {
    display: flex;
    gap: 12px;
    justify-content: flex-start;
  }
  
  .interaccion-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    background-color: #f7f7f7;
    color: #333333;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .interaccion-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .like-btn.liked {
    color: #dc3545;
    background-color: rgba(220, 53, 69, 0.1);
  }
  
  .comentario-btn:hover {
    background-color: rgba(0, 123, 255, 0.1);
    color: #007bff;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .publicacion-fullwidth {
      display: block;
    }
  
    .vertical-separator {
      display: none;
    }
  
    .publicacion-card,
    .comentarios-container {
      padding: 0 16px;
    }
  }
  </style>
  

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import publicacionApi from '@/apis/publicacionApi';
import LikeButtonComponent from '@/components/buttons/LikeButtonComponent.vue';
import ComentariosComponent from '@/components/forum/ComentariosComponent.vue';
import ComentarComponent from '@/components/forum/ComentarComponent.vue';

const publicacion = ref({
    idPublicacion: '',
    categoria: '',
    usuario: {
        idUsuario: '',
        imagenPerfil: '',
        username: '',
        fullname: '',
        fechaPublicacion: ''
    },
    titulo: 'Cargando...',
    contenido: 'Cargando publicación...',
    imagen: null,
    totalMeGusta: 0,
    totalComentarios: 0
});

onMounted(async () => {
    const datosLocal = localStorage.getItem('publicacion-actual');
    if (datosLocal) {
        publicacion.value = JSON.parse(datosLocal);
    } else {
        const id = window.location.pathname.split('/').pop();
        const data = await publicacionApi.obtenerPublicacionId(id);
        if (data) publicacion.value = data;
    }
});

onBeforeUnmount(() => {
    localStorage.removeItem('publicacion-actual');
});

const formatearFecha = (fechaIso) => {
    if (!fechaIso) return '';
    return new Date(fechaIso).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>