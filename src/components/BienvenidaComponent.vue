<template>
    <section class="bienvenido">
        <div class="bienvenido-container">
            <h1 class="titulo">¡Bienvenido!</h1>
            <p class="subtitulo">Regístrate para comenzar a utilizar la plataforma</p>
            <div class="tarjetas">
                <div class="tarjeta" v-for="(item, index) in items" :key="index">
                    <div class="imagen">
                        <img :src="item.image" :alt="item.title" />
                    </div>
                    <h3 class="titulo-tarjeta">{{ item.title }}</h3>
                    <p class="descripcion">{{ item.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "BienvenidaComponent",
    data() {
        return {
            items: [
                {
                    image: "/images/chatbot.png",
                    title: "Chatbot",
                    description: "Conversa con el asistente inteligente para obtener respuestas rápidas."
                },
                {
                    image: "/images/calendario.png",
                    title: "Calendario con recordatorios",
                    description: "Accede al calendario de tu universidad para no perderte de ningun evento importante."
                },
                {
                    image: "/images/mapa.png",
                    title: "Mapa Virtual",
                    description: "Accede al mapa virtual para encontrar edificios más fácilmente y ver información sobre ellos."
                },
                {
                    image: "/images/foro.png",
                    title: "Foro",
                    description: "Participa en el foro para hacer preguntas y resolver dudas."
                }
            ]
        };
    }
};
</script>

<style scoped>
.bienvenido {
    background-color: #f4f6f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
}

.bienvenido-container {
    max-width: 1200px;
    width: 100%;
    text-align: center;
}

.titulo {
    font-size: 36px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
}

.subtitulo {
    font-size: 18px;
    font-weight: 400;
    color: #777;
    margin-bottom: 40px;
}

.tarjetas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px 50px;  /* Ajuste el gap para que haya más espacio horizontal (entre columnas) */
    justify-items: center;
}

.tarjeta {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    max-width: 300px;
    width: 100%;
}

.tarjeta:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.imagen img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 20px;
}

.titulo-tarjeta {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
}

.descripcion {
    font-size: 14px;
    color: #777;
    margin-top: 0;
}
</style>
