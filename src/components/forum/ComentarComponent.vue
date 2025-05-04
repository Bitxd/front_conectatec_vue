<template>
    <div class="comment-container">
        <div class="comment-box">
            <div class="input-wrapper">
                <input
                    type="text"
                    v-model="commentText"
                    class="comment-input"
                    placeholder="Escribe tu comentario..."
                    :maxlength="maxLength"
                />
                <button
                    class="submit-btn"
                    :disabled="!commentText"
                    @click="enviarComentario"
                >
                    Enviar
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.comment-container {
    margin: 15px 0;
    padding: 8px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.comment-input {
    width: 100%;
    height: 36px;
    padding: 8px 70px 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.comment-input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.submit-btn {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: #007bff;
    color: white;
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.15s ease;
    cursor: pointer;
    height: 28px;
}

.submit-btn:hover:not(:disabled) {
    background: #0069d9;
}

.submit-btn:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
}
</style>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue'
import publicacionApi from '@/apis/publicacionApi'

const props = defineProps({
    idPublicacion: {
        type: String,
        required: true
    }
})

const maxLength = 500
const commentText = ref('')

const enviarComentario = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
        alert('Debes iniciar sesión para comentar')
        return
    }

    try {
        console.log("Id de publicacion: ", props.idPublicacion);
        const resultado = await publicacionApi.agregarComentario(
            props.idPublicacion,
            commentText.value,
            token
        )


        if (resultado) {
            alert('Comentario enviado correctamente');
            window.location.reload();
            commentText.value = ''
        } else {
            alert('No se pudo enviar el comentario')
        }
    } catch (error) {
        console.log('Error al enviar comentario:', {
            mensaje: error.message,
            detalle: error.response?.data || 'Sin respuesta del servidor',
            status: error.response?.status || 'Desconocido'
        })
        alert('Ocurrió un error al enviar el comentario')
    }
}
</script>


