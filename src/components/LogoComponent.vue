<template>
    <div class="logo-container">
        <label class="logo-text">Conecta<span class="tec">TEC</span></label>
    </div>
</template>

<script>
export default {
    name: "LogoComponent",
};
</script>

<style scoped>
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -35px;
    top: 7;
}

.logo-text {
    font-size: 25px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    font-family: 'Arial', sans-serif;
    display: flex;
    align-items: center;
    transition: transform 0.3s ease, color 0.3s ease;
}

.tec {
    color: #8d00b8;
    font-size: 25px;
    font-weight: 600;
    margin-left: 5px;
    text-transform: uppercase;
}

.logo-text:hover {
    transform: scale(1.1);
}

</style>
