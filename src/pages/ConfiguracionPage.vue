<template>
    <div class="configuracion-page">
        <h1>Configuración de Notificaciones</h1>
        <p>Aquí puedes gestionar las configuraciones de notificaciones para tu cuenta.</p>
        <form @submit.prevent="guardarConfiguracion">
            <div>
                <label for="activar-notificaciones">Activar notificaciones:</label>
                <input type="checkbox" id="activar-notificaciones" v-model="configuracion.activarNotificaciones" />
            </div>

            <div v-if="configuracion.activarNotificaciones">
                <label for="frecuencia-notificaciones">Frecuencia de notificaciones:</label>
                <select id="frecuencia-notificaciones" v-model="configuracion.frecuenciaNotificaciones">
                    <option value="diaria">Diaria</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                </select>
            </div>

            <div>
                <button type="submit">Guardar Configuración</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            configuracion: {
                activarNotificaciones: false,
                frecuenciaNotificaciones: 'diaria',
            },
        };
    },
    methods: {
        guardarConfiguracion()
        {
            console.log("Configuración guardada:", this.configuracion);
        },
    },
};
</script>

<style scoped>
.configuracion-page {
    padding: 20px;
}

h1 {
    font-size: 24px;
}

form {
    margin-top: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="checkbox"] {
    margin-right: 10px;
}

select {
    margin-left: 10px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>