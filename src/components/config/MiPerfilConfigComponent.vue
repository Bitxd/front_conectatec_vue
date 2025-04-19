<template>
    <div class="perfil-config">
        <h2>Configuración de Perfil</h2>
        <form @submit.prevent="guardarCambios">
            <div class="campo">
                <label for="username">Nombre de Usuario:</label>
                <input type="text" id="username" v-model="usuario.username" required />
            </div>

            <div class="campo">
                <label for="fullname">Nombre Completo:</label>
                <input type="text" id="fullname" v-model="usuario.fullname" required />
            </div>

            <div class="campo">
                <label for="fotoPerfil">Foto de Perfil:</label>
                <input type="file" id="fotoPerfil" @change="cargarImagen" />
                <img v-if="fotoPreview" :src="fotoPreview" alt="Vista previa de la foto" class="foto-previa" />
            </div>

            <button type="submit">Guardar Cambios</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuario: {
                username: '',
                fullname: '',
                fotoPerfil: null,
            },
            fotoPreview: null,
        };
    },
    methods: {
        cargarImagen(event) {
            const file = event.target.files[0];
            if (file) {
                this.fotoPreview = URL.createObjectURL(file);
                this.usuario.fotoPerfil = file;
            }
        },
        guardarCambios() {
            // Lógica para guardar los cambios en el perfil
            console.log("Cambios guardados:", this.usuario);
        }
    },
    mounted() {
        // Aquí puedes cargar los datos actuales del usuario si es necesario
        this.usuario = {
            username: 'johndoe',
            fullname: 'John Doe',
            fotoPerfil: null,
        };
    }
};
</script>

<style scoped>
.perfil-config {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.campo {
    margin-bottom: 20px;
}

.campo label {
    display: block;
    margin-bottom: 8px;
}

.campo input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.foto-previa {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>