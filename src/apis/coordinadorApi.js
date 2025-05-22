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

// Obtener un coordinador por id de carrera
export const obtenerCoordinadorPorIdCarrera = async (idCarrera) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/carreras/${idCarrera}/coordinador`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el coordinador para la carrera con ID ${idCarrera}:`, error);
    return null;
  }
};