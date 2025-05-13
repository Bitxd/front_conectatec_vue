import axios from 'axios';

// Petición GET para obtener todos los coordinadores según el ID de universidad
export const obtenerCoordinadoresPorIdEscuela = async (idEscuela) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/universidad/${idEscuela}/coordinadores`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener coordinadores para la escuela con ID ${idEscuela}:`, error);
        return null;
    }
};
