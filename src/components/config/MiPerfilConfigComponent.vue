<template>
    <div class="perfil-config">
        <header class="config-header">
            <h2>Configuración de perfíl</h2>
            <hr class="config-separator" />
        </header>

        <div class="contenido">
            <!-- Panel izquierdo -->
            <div class="panel-izquierda">
                <div class="foto-container">
                    <img :src="fotoPreview || usuario.imagenPerfil || defaultImage" 
                         alt="Foto de perfil"
                         class="foto-previa" />
                    <input type="file" 
                           id="fileInput"
                           hidden
                           @change="cargarImagen" 
                           accept="image/*" />
                    <label for="fileInput" class="btn-cambiar-imagen">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H8L10 1H14L16 3H21C21.5304 3 22.0391 3.21071 22.4142 3.58579C22.7893 3.96086 23 4.46957 23 5V19Z" 
                                  stroke="currentColor" 
                                  stroke-width="2" 
                                  stroke-linecap="round" 
                                  stroke-linejoin="round"/>
                            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" 
                                  stroke="currentColor" 
                                  stroke-width="2" 
                                  stroke-linecap="round" 
                                  stroke-linejoin="round"/>
                        </svg>
                        Cambiar imagen
                    </label>
                </div>
            </div>

            <!-- Panel derecho -->
            <div class="panel-derecha">
                <div class="campos">
                    <!-- Campos existentes se mantienen igual -->
                    <div class="campo">
                        <label for="fullname">Nombre completo</label>
                        <div class="input-guardar">
                            <input id="fullname" v-model="usuario.fullname" type="text" @blur="guardarCampo('fullname')"
                                required />
                            <button @click.prevent="guardarCampo('fullname')" class="btn-small">Guardar</button>
                        </div>
                    </div>

                    <div class="campo">
                        <label for="email">Correo electrónico</label>
                        <div class="input-guardar">
                            <input id="email" v-model="usuario.email" type="email" @blur="guardarCampo('email')" required />
                            <button @click.prevent="guardarCampo('email')" class="btn-small">Guardar</button>
                        </div>
                    </div>

                    <div class="campo">
                        <label for="phone">Teléfono</label>
                        <div class="input-guardar">
                            <input id="phone" v-model="usuario.phone" type="tel" @blur="guardarCampo('phone')" />
                            <button @click.prevent="guardarCampo('phone')" class="btn-small">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contenido {
    flex: 1;
    overflow-y: auto;
    max-width: 800px;
    margin: 16px auto;
    padding: 0 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
}

.panel-izquierda,
.panel-derecha {
    display: flex;
    flex-direction: column;
}

.foto-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-cambiar-imagen {
    width: 120px;
    padding: 8px 12px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s ease;
    font-size: 0.875rem;
}

.btn-cambiar-imagen:hover {
    background: #357ab8;
}

.btn-cambiar-imagen svg {
    flex-shrink: 0;
}

/* Mantener estilos existentes y agregar */
.campos {
    margin-top: 1rem;
}

.config-separator {
    margin-top: 8px;
}

@media (max-width: 768px) {
    .contenido {
        grid-template-columns: 1fr;
    }
}
</style>



<script>
export default {
    data() {
        return {
            usuario: {
                username: '',
                fullname: '',
                email: '',
                phone: '',
                imagenPerfil: null,
            },
            fotoPreview: null,
            defaultImage: 'https://via.placeholder.com/120?text=Perfil'
        };
    },
    methods: {
        cargarImagen(event) {
            const file = event.target.files[0];
            if (file) {
                this.fotoPreview = URL.createObjectURL(file);
                this.usuario.imagenPerfil = this.fotoPreview;
                this.guardarCampo('imagenPerfil');
            }
        },
        guardarCampo(campo) {
            const stored = JSON.parse(localStorage.getItem('usuario')) || {};
            stored[campo] = this.usuario[campo];
            localStorage.setItem('usuario', JSON.stringify(stored));
        }
    },
    mounted() {
        const datos = JSON.parse(localStorage.getItem('usuario'));
        if (datos) {
            this.usuario = {
                username: datos.username || '',
                fullname: datos.fullname || '',
                email: datos.email || '',
                phone: datos.phone || '',
                imagenPerfil: datos.imagenPerfil || null,
            };
            if (datos.imagenPerfil) {
                this.fotoPreview = datos.imagenPerfil;
            }
        }
    }
};
</script>