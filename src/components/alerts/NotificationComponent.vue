<template>
    <transition name="fade">
        <div v-if="message" class="notification" :class="notificationType">
            <div class="notification-content">
                <span class="icon" :class="iconClass"></span>
                <span class="message">{{ message }}</span>
                <button @click="clearMessage" class="close-btn">×</button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        message: String,
        notificationType: String,
    },
    computed: {
        iconClass() {
            return this.notificationType === 'success' ? 'icon-check-circle' : 'icon-exclamation-circle';
        },
    },
    methods: {
        clearMessage() {
            this.$emit('clear-message');
        },
    },
};
</script>

<style scoped>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    z-index: 1000;
    animation: slideIn 0.5s ease-out;
}

.notification.success {
    border-left: 5px solid #28a745;
}

.notification.error {
    border-left: 5px solid #dc3545;
}

.notification-content {
    display: flex;
    align-items: center;
    width: 100%;
}

.icon {
    font-size: 20px;
    margin-right: 10px;
}

.message {
    flex-grow: 1;
    font-size: 14px;
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    font-size: 18px;
    color: #999;
    cursor: pointer;
    transition: color 0.3s;
}

.close-btn:hover {
    color: #333;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}
</style>