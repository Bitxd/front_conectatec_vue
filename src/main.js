import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; // Importa el router (asume que tu archivo está en ./router/index.js)

const app = createApp(App);

app.use(router); // Registra el router en la aplicación

app.mount('#app'); // Monta la aplicación