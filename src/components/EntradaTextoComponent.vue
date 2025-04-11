<template>
    <div class="input-container">
        <img v-if="icon" :src="icon" alt="icon" class="input-icon" />
        <input v-model="inputValue" @keyup.enter="handleEnter" :placeholder="placeholder" type="text" autofocus
            class="user-input" />
    </div>
</template>

<script>
export default {
    name: "EntradaTextoComponent",
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            inputValue: this.value
        };
    },
    methods: {
        handleEnter() {
            this.$emit("enter", this.inputValue);
        }
    },
    watch: {
        value(newVal) {
            this.inputValue = newVal;
        }
    }
};
</script>

<style scoped>
.input-container {
    position: relative;
    width: 100%;
}

.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    pointer-events: none;
}

.user-input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border-radius: 8px;
    border: 2px solid #CCCCCC;
    font-size: 16px;
    background-color: #FFFFFF;
    color: #333333;
    transition: all 0.3s ease;
}

.user-input:focus {
    border-color: #2D2D2D;
    box-shadow: 0 0 8px rgba(45, 45, 45, 0.2);
    outline: none;
}

.user-input::placeholder {
    color: #A0A0A0;
    font-style: italic;
}

.user-input:hover {
    border-color: #2D2D2D;
    box-shadow: 0 4px 6px rgba(45, 45, 45, 0.1);
}
</style>