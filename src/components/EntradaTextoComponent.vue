<template>
    <div class="input-container">
        <img v-if="icon" :src="icon" alt="icon" class="input-icon" />
        <input 
            v-model="inputValue" 
            @keyup.enter="handleEnter" 
            :placeholder="placeholder" 
            type="text" 
            autofocus
            class="user-input" 
        />
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
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
}

.input-icon {
    position: absolute;
    left: 12px;  
    width: 18px;  
    height: 18px;
}

.user-input {
    width: 100%;
    padding: 12px;
    padding-left: 40px;  
    border-radius: 8px;  
    border: 2px solid #b668ff;
    font-size: 16px;
    background-color: #FFF3E0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    color: #333;
}

.user-input:focus {
    border-color: #883deb;
    box-shadow: 0 0 8px rgba(255, 69, 0, 0.3);
    outline: none;
}

.user-input::placeholder {
    color: #8E8E8E;
    font-style: italic;
}

.user-input:hover {
    border-color: #ae4fee;
    box-shadow: 0 4px 6px rgba(255, 140, 0, 0.2);
}
</style>
