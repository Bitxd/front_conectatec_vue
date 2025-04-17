<template>
    <div class="publicacion-fullwidth">
        <div class="publicacion-card">
            <!-- Header de usuario -->
            <div class="usuario-header">
                <img :src="publicacion.usuario.imagenPerfil || '/default-avatar.png'" class="usuario-avatar" alt="Avatar" />
                <div class="usuario-info">
                    <div class="usuario-nombres">
                        <span class="usuario-fullname">{{ publicacion.usuario.fullname }}</span>
                        <span class="usuario-username">@{{ publicacion.usuario.username }}</span>
                    </div>
                    <div class="publicacion-meta">
                        <span class="publicacion-fecha">{{ formatearFecha(publicacion.usuario.fechaPublicacion) }}</span>
                        <span class="publicacion-categoria">{{ publicacion.categoria }}</span>
                    </div>
                </div>
            </div>

            <!-- Contenido principal -->
            <div class="publicacion-content">
                <h1 class="publicacion-titulo">{{ publicacion.titulo }}</h1>
                <p class="publicacion-texto">{{ publicacion.contenido }}</p>

                <template v-if="publicacion.imagen">
                    <img :src="publicacion.imagen" class="publicacion-imagen" alt="Imagen de publicación" />
                </template>
            </div>

            <div class="publicacion-footer">
                <div class="interacciones">
                    <LikeButtonComponent />
                    <button class="interaccion-btn comentario-btn">
                        💬 {{ publicacion.totalComentarios }}
                    </button>
                </div>
            </div>

            <!-- Componente de comentarios integrado -->
            <ComentarComponent :idPublicacion="publicacion.idPublicacion" />

        </div>

        <div class="modern-separator"></div>
        <ComentariosComponent :id="publicacion.idPublicacion" />
    </div>
</template>

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
    imagenPublicacion: null,
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

<style scoped>
.publicacion-fullwidth {

    width: 100%;
    background-color: white;
    padding: 20px 0;
}


.publicacion-card {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


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

/* Ajuste cuando no hay imagen */
.publicacion-texto:last-child {
    margin-bottom: 0;
}

/* Footer de interacciones */
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

/* Botones de interacción */
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


.modern-separator {
    width: 90%;
    margin: 30px auto;
    border: none;
    border-top: 2px solid #e0e0e0;
    position: relative;
}

.modern-separator::after {
    content: "";
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    border-top: 3px solid #007bff;
}

/* Responsive para móviles */
@media (max-width: 768px) {
    .publicacion-content {
        padding: 16px 12px;
    }

    .publicacion-titulo {
        font-size: 1.3rem;
    }

    .publicacion-texto {
        font-size: 0.95rem;
    }

    .publicacion-imagen {
        max-height: 300px;
    }
}
</style>