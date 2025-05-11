import agregarTiempoSeccion from '@/apis/tiempoApi';
import authService from './authService';

export default {
    iniciarConteo() {
        return new Date();
    },

    async finalizarConteo(startTime, section) {
        if (!startTime) return;

        const endTime = new Date();
        const timeSpent = (endTime - startTime) / 1000; 

        const tiempoData = {
            section,
            timeSpent,
            startTime,
            endTime
        };

        const token = authService.getToken();
        await agregarTiempoSeccion(token, tiempoData);
    }
};
