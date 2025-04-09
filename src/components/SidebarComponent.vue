<template>
    <div class="sidebar">
        <div class="hamburger" @click="toggleSidebar">
            &#9776; 
        </div>
    </div>
</template>

<script>
export default
{
    name: "SidebarComponent",
    methods:
    {
        toggleSidebar()
        {

            console.log("Sidebar clicked");
        },
    },
};
</script>

<style scoped>
.sidebar {
    position: fixed;
    left: 20px;
    top: 7px;
    z-index: 1000;
}

.hamburger {
    font-size: 25px;
    color: #000000;
    cursor: pointer;
    transition: transform 0.3s ease, color 0.3s ease;
}

.hamburger:hover {
    color: #007bff;
    transform: scale(1.1); 
}
</style>
