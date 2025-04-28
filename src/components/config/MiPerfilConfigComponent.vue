<template>
    <div class="perfil-config">
        <form @submit.prevent="guardarCambios">
            <div class="fabricando">
                <p>Estamos desarrollando esta página...</p>
            </div>
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
            console.log("Cambios guardados:", this.usuario);
        }
    },
    mounted() {
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

.fabricando {
    margin: 20px 0;
    text-align: center;
    font-size: 16px;
    color: #555;
}
</style>
