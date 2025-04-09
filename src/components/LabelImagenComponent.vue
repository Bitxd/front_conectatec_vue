<template>
    <div class="label-imagen-component" :class="{ clickable }" @click="handleClick">
        <img v-if="icono" :src="icono" alt="icon" class="icono" />
        <div class="texto">{{ texto }}</div>
    </div>
</template>

<script>
export default {
    name: 'LabelImagenComponent',
    props: {
        icono: {
            type: String,
            default: ''
        },
        texto: {
            type: String,
            default: ''
        },
        clickable: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            if (this.clickable) {
                this.$emit('click');
            }
        }
    }
};
</script>

<style scoped>
.label-imagen-component {
    display: flex;
    align-items: center;
    background: transparent;
    padding: 5px 10px;
    transition: background-color 0.3s ease;
}
.label-imagen-component.clickable {
    cursor: pointer;
}
.label-imagen-component.clickable:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
.icono {
    margin-right: 10px;
    width: 24px;
    height: 24px;
}
.texto {
    font-size: 16px;
    color: #333;
    font-weight: 600;
}
</style>
