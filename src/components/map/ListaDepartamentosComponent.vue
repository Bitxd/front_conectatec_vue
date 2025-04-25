<template>
    <div class="departamentos-container">
        <h2>Departamentos</h2>
        <ul class="departamentos-list">
            <li v-for="departamento in departamentos" :key="departamento._id.$oid" class="departamento-item">
                {{ departamento.nombre }}
            </li>
        </ul>
    </div>
</template>

<script>
import universidadApi from "@/apis/universidadApi";  

export default {
    props: {
        escuelaId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            departamentos: []
        };
    },
    async created() {
        await this.cargarDepartamentos();
    },
    methods: {
        async cargarDepartamentos() {
            alert('ID de la escuela a enviar: ' + this.escuelaId);

            const datos = await universidadApi.obtenerDepartamentosID(this.escuelaId);
            if (datos) {
                this.departamentos = datos;
            }
        }
    }
};
</script>

<style scoped>
.departamentos-container {
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
    margin-bottom: 10px;
}

.departamentos-list {
    list-style-type: none;
    padding: 0;
}

.departamento-item {
    padding: 10px;
    margin: 5px 0;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.departamento-item:hover {
    background-color: #f0f0f0;
}
</style>