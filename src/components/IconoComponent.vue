<template>
    <img :src="icono" alt="icono" class="icono" />
</template>

<script>
export default {
    name: 'IconoComponent',
    props: {
        icono: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.icono {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.icono:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>