<template>
    <div class="chatbot-container">
        <div class="chatbot-messages" ref="messages">
            <MensajeComponent v-for="(message, index) in messages" :key="index" :message="message" />
        </div>

        <div class="chatbot-input">
            <EntradaTextoComponent v-model="userInput" @enter="sendMessage" :placeholder="'Escribe tu mensaje aquí...'"
                :icon="'icons/chatbot-icon.svg'" />

            <BotonTextoImagenComponent image="icons/enviar-icon.svg" altText="Enviar mensaje" text="Enviar"
                @click="sendMessage" />
        </div>
    </div>
</template>

<script>
import BotonTextoImagenComponent from '@/components/BotonTextoImagenComponent.vue';
import MensajeComponent from '@/components/MensajeComponent.vue';
import EntradaTextoComponent from '@/components/EntradaTextoComponent.vue';

export default {
    components: {
        BotonTextoImagenComponent,
        MensajeComponent,
        EntradaTextoComponent
    },
    data() {
        return {
            userInput: '',
            messages: [
                { text: '¡Hola! ¿Cómo puedo ayudarte?', type: 'bot' },
            ],
        };
    },
    methods: {
        sendMessage() {
            if (this.userInput.trim()) {
                this.messages.push({ text: this.userInput, type: 'user' });

                setTimeout(() => {
                    this.messages.push({ text: 'El chatbot aún está en desarrollo', type: 'bot' });
                    this.scrollToBottom();
                }, 500);

                this.userInput = '';
            }
        },
        scrollToBottom() {
            const messagesContainer = this.$refs.messages;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.chatbot-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    padding-top: 20px;
}

.chatbot-messages {
    flex-grow: 1;
    padding: 20px;
    padding-bottom: 80px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message {
    padding: 12px;
    border-radius: 20px;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    display: inline-block;
}

.message.bot {
    background-color: #e5e7eb;
    color: #111827;
    text-align: left;
    align-self: flex-start;
    border-radius: 20px 20px 20px 5px;
}

.message.user {
    background-color: #2563eb;
    color: white;
    text-align: right;
    align-self: flex-end;
    border-radius: 20px 20px 5px 20px;
}

.message:hover {
    transform: scale(1.02);
}

.chatbot-input {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    padding: 12px;
    background-color: #ffffff;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
    padding-left: 20px;
    padding-right: 20px;
}

.chatbot-input .user-input {
    width: 90%;
    height: 40px;
    padding: 12px;
    border-radius: 30px;
    border: 1px solid #d1d5db;
    background-color: #f3f4f6;
    font-size: 16px;
    color: #111827;
}

.chatbot-input .send-button {
    padding: 10px 14px;
    border: none;
    background-color: #2563eb;
    color: white;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    height: 40px;
    width: 40px;
    margin-left: 50px;
}

.chatbot-input .send-button:hover {
    background-color: #1d4ed8;
}

.chatbot-input .send-button:active {
    background-color: #2563eb;
}
</style>
