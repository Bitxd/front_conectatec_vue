<template>
    <div class="universidad-label">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: 'UniversidadLabel',
    props: {
        text: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped>
.universidad-label {
    font-size: 1.125rem;
    /* 18px */
    font-weight: 600;
    color: #1a1a1a;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
    transition: color 0.3s ease;
    user-select: none;
}
</style>