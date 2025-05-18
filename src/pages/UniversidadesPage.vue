<template>
    <div class="universidades-page">
        <header class="header">
            <h1>Explora las universidades</h1>
            <p class="subtitle">Encuentra la institución perfecta para tu futuro</p>
            <div class="search-container">
                <EntradaTextoComponent v-model="searchQuery" placeholder="Buscar universidades..."
                    icon="icons/busqueda-icon.svg" />
            </div>
        </header>

        <div class="cards-wrapper">
            <div class="cards-container">
                <div v-for="university in filteredUniversities" :key="university._id" class="university-card"
                    @click="goToUniversityDetails(university._id)">
                    <div class="card-image-container">
                        <img :src="university.logoUrl" :alt="'Logo de ' + university.nombre" class="university-logo"
                            @error="onImageError($event)" />
                    </div>
                    <div class="card-content">
                        <h3 class="university-name">{{ university.nombre }}</h3>
                        <p class="university-description">{{ truncateDescription(university.descripcion) }}</p>
                    </div>
                    <!-- Se utiliza la función isFavorite para definir el estado del botón -->
                    <div class="like-button" @click.stop="handleFavorite(university)">
                        <BotonCorazon :liked="isFavorite(university)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
/* Contenedor general */
.universidades-page {
    background-color: #f4f6f9;
    min-height: 100vh;
    padding: 3rem 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header y búsqueda */
.header {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto 3rem;
    padding: 0 2rem;
}

.header h1 {
    font-size: 2.8rem;
    color: #111;
    font-weight: 700;
    margin-bottom: 0.8rem;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 1.2rem;
    color: #666;
    font-weight: 400;
    margin-bottom: 2.5rem;
}

.search-container {
    max-width: 700px;
    margin: 0 auto;
}

/* Contenedor de tarjetas */
.cards-wrapper {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
}

.cards-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    width: 100%;
}

/* Tarjeta rediseñada */
.university-card {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 20px;
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.03);
}

.university-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.05);
}

/* Imagen de la universidad */
.card-image-container {
    flex-shrink: 0;
    width: 180px;
    height: 180px;
    border-radius: 10px;
    overflow: hidden;
    background: #f7f7f7;
    display: flex;
    align-items: center;
    justify-content: center;
}

.university-logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.3s ease;
}

.university-card:hover .university-logo {
    filter: grayscale(0%);
}

/* Contenido textual de la tarjeta */
.card-content {
    flex: 1;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.university-name {
    font-size: 1.8rem;
    color: #111;
    margin: 0 0 0.5rem;
    font-weight: 600;
    letter-spacing: -0.3px;
}

.university-description {
    font-size: 1rem;
    color: #555;
    margin: 0;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

/* Botón de corazón */
.like-button {
    flex-shrink: 0;
    margin-left: auto;
    align-self: flex-start;
}

/* Responsive */
@media (max-width: 768px) {
    .university-card {
        flex-direction: column;
        align-items: stretch;
        padding: 1rem;
    }

    .card-image-container {
        width: 100%;
        height: 200px;
    }

    .card-content {
        padding: 1rem 0;
    }

    .like-button {
        align-self: flex-end;
        margin-top: 0.5rem;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 0 1.5rem;
    }

    .header h1 {
        font-size: 2rem;
    }

    .cards-wrapper {
        padding: 0 1.5rem;
    }

    .university-name {
        font-size: 1.5rem;
    }

    .university-description {
        font-size: 0.95rem;
    }
}
</style>



<script>
import EntradaTextoComponent from '@/components/EntradaTextoComponent.vue';
import BotonCorazon from '@/components/BotonCorazon.vue';
import universidadApi from '@/apis/universidadApi';
import userApi from '@/apis/userApi';
import tiempoSeccion from '@/services/tiempoSeccion';

export default {
    name: 'UniversidadesPage',
    components: {
        EntradaTextoComponent,
        BotonCorazon
    },
    data() {
        return {
            searchQuery: '',
            universities: [],
            favoriteUniversityId: null, // Almacena el _id de la universidad favorita actual
            startTime: null  // Almacena el inicio del conteo de tiempo para la sección
        };
    },
    computed: {
        filteredUniversities() {
            if (!this.searchQuery) return this.universities;
            const query = this.searchQuery.toLowerCase();
            return this.universities.filter(u =>
                u.nombre.toLowerCase().includes(query) ||
                (u.descripcion && u.descripcion.toLowerCase().includes(query))
            );
        }
    },
    async mounted() {
        // Inicia el conteo de tiempo para esta sección
        this.startTime = tiempoSeccion.iniciarConteo();

        // Primero se carga la lista de universidades y luego se obtiene la favorita.
        await this.loadUniversities();
        await this.loadFavoriteUniversity();
    },
    beforeUnmount() {
        // Finaliza el conteo cuando el usuario deje la página
        tiempoSeccion.finalizarConteo(this.startTime, 'universidades');
    },
    methods: {
        // Obtiene la lista de universidades del API
        async loadUniversities() {
            try {
                this.universities = await universidadApi.obtenerUniversidades();
            } catch (error) {
                console.error("Error loading universities:", error);
            }
        },
        // Obtiene la universidad favorita del usuario y actualiza favoriteUniversityId
        async loadFavoriteUniversity() {
            try {
                const token = localStorage.getItem('token');
                const response = await userApi.obtenerUniversidadFavorita(token);
                if (response && response.universidadFavorita) {
                    this.favoriteUniversityId = response.universidadFavorita._id;
                } else {
                    this.favoriteUniversityId = null;
                }
            } catch (error) {
                console.error("Error loading favorite university:", error);
            }
        },
        // Función de ayuda para determinar si una universidad es la favorita
        isFavorite(university) {
            return this.favoriteUniversityId === university._id;
        },
        // Maneja el clic en el botón de "corazón"
        async handleFavorite(university) {
            const token = localStorage.getItem('token');

            // Si la universidad clickeada es la favorita actual, se elimina.
            if (this.isFavorite(university)) {
                try {
                    const res = await userApi.eliminarUniversidadFavorita(token);
                    if (res && res.mensaje) {
                        this.favoriteUniversityId = null;
                    }
                } catch (error) {
                    console.error("Error removing favorite:", error);
                }
            } else {
                // Si ya existe una favorita distinta, se actualiza (PUT); si no, se establece (POST)
                try {
                    if (this.favoriteUniversityId) {
                        const res = await userApi.actualizarUniversidadFavorita(token, university._id);
                        if (res && res.mensaje) {
                            this.favoriteUniversityId = university._id;
                        }
                    } else {
                        const res = await userApi.establecerUniversidadFavorita(token, university._id);
                        if (res && res.mensaje) {
                            this.favoriteUniversityId = university._id;
                        }
                    }
                } catch (error) {
                    console.error("Error setting/updating favorite university:", error);
                }
            }
        },
        // Navega a la página de detalles de la universidad
        goToUniversityDetails(id) {
            this.$router.push({ name: 'DetallesUniversidad', params: { id } });
        },
        // Trunca la descripción a 120 caracteres
        truncateDescription(desc) {
            if (!desc) return 'Descripción no disponible';
            return desc.length > 120 ? desc.substring(0, 120) + '...' : desc;
        },
        // Si hay error al cargar la imagen, asigna una imagen por defecto
        onImageError(event) {
            event.target.src = '/placeholder-university.png';
        }
    }
};
</script>