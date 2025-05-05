<template>
    <div>
        <!-- Header modificado -->
        <div class="comentarios-header">
            <h3 class="title">Comentarios</h3>
            <span class="contador">{{ comentarios.length }} comentarios</span>
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

                        <!-- Menú de 3 puntos -->
                        <div class="menu-container">
                            <button class="menu-btn" @click.stop="toggleMenu(comentario.idComentario)">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </button>

                            <!-- Menú desplegable -->
                            <div v-show="showMenu[comentario.idComentario]" class="menu-dropdown">
                                <button v-if="esPropietario(comentario)"
                                    @click="eliminarComentario(comentario.idComentario)" class="menu-item">
                                    Eliminar
                                </button>
                                <button v-else @click="reportarComentario(comentario.idComentario)" class="menu-item">
                                    Reportar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="comentario-content">
                        <p>{{ comentario.contenido }}</p>
                    </div>
                </div>
            </div>

            <div v-else class="no-comentarios">
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Header estilizado */
.comentarios-header {
    background-color: #f8f9fa;
    padding: 12px 20px;
    margin: 0 15px 12px;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contador {
    color: #777;
    font-size: 0.9em;
    font-weight: 500;
}

/* Scroll en lista de comentarios */
.comentarios-container {
    height: calc(100vh - 250px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;
}

.comentarios-container::-webkit-scrollbar {
    width: 8px;
}

.comentarios-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.comentarios-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.comentarios-container::-webkit-scrollbar-thumb:hover {
    background: #555;
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

.comentarios-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 20px;
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
    position: relative;
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

.no-comentarios {
    text-align: center;
    padding: 20px;
    color: #777;
    font-style: italic;
    font-size: 0.9rem;
    width: 100%;
}

/* Estilos del menú */
.menu-container {
    position: relative;
    margin-left: 8px;
}

.menu-btn {
    border: none;
    background: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    gap: 2px;
    transition: opacity 0.2s;
}

.menu-btn:hover {
    opacity: 0.7;
}

.dot {
    width: 4px;
    height: 4px;
    background-color: #666;
    border-radius: 50%;
}

.menu-dropdown {
    position: absolute;
    right: 0;
    top: 24px;
    background: white;
    border: 1px solid #e1e1e1;
    border-radius: 6px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    min-width: 120px;
}

.menu-item {
    display: block;
    width: 100%;
    padding: 8px 12px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    color: #333;
    font-size: 0.85rem;
    transition: background-color 0.2s;
}

.menu-item:hover {
    background-color: #f5f5f5;
}

.menu-item:active {
    background-color: #eee;
}
</style>

<script>
import publicacionApi from '@/apis/publicacionApi';
import authService from '@/services/authService';

export default {
    name: 'ComentariosComponent',
    props: {
        id: String
    },
    data() {
        return {
            comentarios: [],
            showMenu: {}
        }
    },
    methods: {
        async fetchComentarios() {
            try {
                const response = await publicacionApi.obtenerComentariosPorId(this.id)
                this.comentarios = response.comentarios
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

        esPropietario(comentario) {
            return comentario.idUsuario === authService.getIdUser();
        },
        toggleMenu(comentarioId) {
            // Convertir a string para consistencia con las keys del objeto
            const id = comentarioId.toString();

            this.showMenu = {
                ...this.showMenu, // Mantener otros valores
                [id]: !this.showMenu[id] // Actualizar el valor actual
            };

            // Cerrar otros menús
            Object.keys(this.showMenu).forEach(key => {
                if (key !== id) {
                    this.showMenu[key] = false;
                }
            });
        },
        async eliminarComentario(idComentario) {
            alert("Intentando eliminar comentario");
            const token = authService.getToken();
            const resultado = await publicacionApi.eliminarComentario(idComentario, token);
            if (resultado)
            {
                window.location.reload();
                
            }

        },
        reportarComentario(idComentario) {
            console.log('Reportar comentario:', idComentario)
        },
        handleClickOutside(event) {
            if (!event.target.closest('.menu-container')) {
                Object.keys(this.showMenu).forEach(id => {
                    this.$set(this.showMenu, id, false)
                })
            }
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
        window.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        window.removeEventListener('click', this.handleClickOutside)
    }
}
</script>