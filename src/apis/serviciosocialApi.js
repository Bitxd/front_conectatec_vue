import axios from 'axios';

// Petición GET para obtener todos los servicios sociales según el ID de escuela
export const obtenerServiciosSocialesPorIdEscuela = async (idEscuela) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/universidad/${idEscuela}/serviciossociales`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener servicios sociales para la escuela con ID ${idEscuela}:`, error);
    return null;
  }
};
