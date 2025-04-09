<template>
    <div :class="['message', message.type]">
        <p>{{ message.text }}</p>
    </div>
</template>

<script>
export default
{
    name: "MensajeComponent",
    props:
    {
        message:
        {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
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
</style>