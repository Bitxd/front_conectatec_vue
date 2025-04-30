<template>
    <div>
        <div class="comentarios-header">
            <h3 class="title">Comentarios</h3>
        </div>

        <div class="comentarios-container">
            <div v-if="comentarios.length > 0" class="comentarios-list">
                <div v-for="comentario in comentarios" :key="comentario.idComentario" class="comentario-card">
                    <div class="comentario-header">
                        <img :src="comentario.usuario.imagenPerfil || '/default-avatar.png'" class="usuario-avatar"
                            alt="Avatar" />
                        <div class="usuario-info">
                            <div class="usuario-nombres">
                                <span class="nombre">{{ comentario.usuario.fullname }}</span>
                                <span class="username">@{{ comentario.usuario.username }}</span>
                            </div>
                        </div>
                        <span class="fecha">{{ formatearFecha(comentario.fechaCreacion) }}</span>
                    </div>
                    <div class="comentario-content">
                        <p>{{ comentario.contenido }}</p>
                    </div>
                    <button class="like-btn" @click="meGustaComentario(comentario.idComentario)">
                        <span class="icon">👍</span>
                    </button>
                </div>
            </div>

            <div v-else class="no-comentarios">
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            </div>
        </div>
    </div>
</template>



<style scoped>
.comentarios-header {
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    color: #444;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: left;
    border-left: 4px solid #a551e9;
    padding-left: 10px;
    line-height: 1.4;
    margin: 0;
}

.comentarios-container {
    background-color: white;
    width: 100%;
    padding: 10px 0;
}

.comentarios-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.comentario-card {
    margin-left: 15px;
    background: #ffffff;
    padding: 16px;
    width: 95%;
    position: relative;
    border-bottom: 1px solid #f4f6f9;
    transition: background-color 0.3s ease, box-shadow 0.3s ease,
        border-color 0.3s ease;
    border-radius: 8px;
}

.comentario-card:hover {
    background-color: #f9f7fe;
    box-shadow: 0 2px 8px rgba(165, 81, 233, 0.15);
    border-color: #d7c2f3;
}

.comentario-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    width: 100%;
}

.usuario-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
}

.usuario-info {
    flex: 1;
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
}

.usuario-nombres {
    display: flex;
    align-items: baseline;
    gap: 8px;
    white-space: nowrap;
    overflow: hidden;
}

.nombre {
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.username {
    color: #777;
    font-size: 0.85rem;
    white-space: nowrap;
}

.fecha {
    color: #777;
    font-size: 0.8rem;
    margin-left: auto;
    padding-left: 12px;
    flex-shrink: 0;
}

.comentario-content {
    padding-left: 52px;
    margin-top: 4px;
}

.comentario-content p {
    text-align: left;
    margin: 0;
    color: #333;
    line-height: 1.5;
    word-break: break-word;
    font-size: 0.9rem;
}

.like-btn {
    position: absolute;
    bottom: 8px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #777;
    transition: all 0.2s ease;
}

.like-btn:hover {
    color: #dc3545;
    transform: scale(1.1);
}

.no-comentarios {
    text-align: center;
    padding: 20px;
    color: #777;
    font-style: italic;
    font-size: 0.9rem;
    width: 100%;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

@media (max-width: 480px) {
    .usuario-nombres {
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
    }

    .fecha {
        font-size: 0.75rem;
        padding-left: 8px;
    }
}
</style>

<script>
import publicacionApi from '@/apis/publicacionApi'

export default {
    name: 'ComentariosComponent',
    props: {
        id: String
    },
    data() {
        return {
            comentarios: []
        }
    },
    methods: {
        async fetchComentarios() {
            try {
                const response = await publicacionApi.obtenerComentariosPorId(this.id)
                this.comentarios = response.comentarios
                // Mostrar los comentarios en un alert
                alert(JSON.stringify(this.comentarios, null, 2))
            } catch (error) {
                console.error('Error al cargar comentarios:', error)
                this.comentarios = []
            }
        },
        formatearFecha(fechaIso) {
            if (!fechaIso) return ''
            return new Date(fechaIso).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        },
        meGustaComentario(idComentario) {
            console.log(`Me gusta al comentario con ID: ${idComentario}`)
            alert(`Me gusta al comentario con ID: ${idComentario}`)
        }
    },
    watch: {
        id(newId, oldId) {
            if (newId && newId !== oldId) {
                this.fetchComentarios()
            }
        }
    },
    mounted() {
        this.fetchComentarios()
    }
}
</script>