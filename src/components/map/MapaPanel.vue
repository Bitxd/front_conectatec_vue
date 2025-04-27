<template>
    <div class="overlay" @click.self="close">
        <div class="modal">
            <header class="modal-header">
                <h3>Vista en el Mapa</h3>
                <button class="btn-close" @click="close">&times;</button>
            </header>
            <div class="modal-body">
                <p>Aquí irá el mapa o cualquier texto que necesites mostrar.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal {
    background: white;
    border-radius: 8px;
    width: 95%;
    max-width: 800px;
    height: 80vh;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: 0.8rem 1.5rem; /* Reducido el padding vertical */
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0; /* Añadido borde inferior sutil */
}

.modal-header h3 {
    margin: 0;
    font-size: 1.2rem; /* Tamaño más pequeño y elegante */
    font-weight: 600; /* Negrita moderada */
    color: #1e293b; /* Color de texto más oscuro */
    letter-spacing: 0.5px; /* Pequeño espaciado entre letras */
}

.btn-close {
    background: transparent;
    border: none;
    font-size: 1.8rem; /* Tamaño ligeramente reducido */
    line-height: 1;
    cursor: pointer;
    padding: 0 0.3rem;
    color: #64748b; /* Color gris para el botón */
    transition: color 0.2s ease; /* Transición suave */
}

.btn-close:hover {
    color: #475569; /* Color más oscuro al hover */
}

.modal-body {
    padding: 1.5rem;
    color: #334155;
    flex-grow: 1;
    overflow-y: auto;
    font-size: 1.1rem;
}

.btn-ok {
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1rem;
}

.btn-ok:hover {
    background-color: #2563eb;
}
</style>


<script>
export default {
    name: 'MapaPanel',
    emits: ['close'],
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>