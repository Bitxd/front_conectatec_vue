<template>
    <div class="comment-container">
        <h3 class="title">Deja tu comentario</h3>
        <div class="comment-box">
            <textarea
                v-model="commentText"
                class="comment-input"
                placeholder="Escribe tu comentario aquí..."
                :maxlength="maxLength"
            ></textarea>
            <div class="comment-footer">
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




<style scoped>
.comment-container {
    margin: 25px 0;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.title {
    color: #444;
    margin-bottom: 14px;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: left;
    border-left: 4px solid #007bff;
    padding-left: 10px;
    line-height: 1.4;
}

.comment-box {
    background: white;
    border-radius: 8px;
    /* borde eliminado */
    padding: 18px;
}

.comment-input {
    width: 100%;
    min-height: 100px;
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    transition: all 0.25s ease;
}

.comment-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.comment-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
}

.submit-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 22px;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.submit-btn:hover:not(:disabled) {
    background: #0069d9;
    transform: translateY(-1px);
}

.submit-btn:disabled {
    background: #f7f7f7;
    color: rgba(0, 0, 0, 0.4);
    cursor: not-allowed;
}

.submit-btn:active:not(:disabled) {
    transform: translateY(0);
}
</style>