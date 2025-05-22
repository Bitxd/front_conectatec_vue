import axios from 'axios';

// Petición GET para obtener todos los profesores según el ID de universidad
export const obtenerProfesoresPorIdEscuela = async (idEscuela) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/universidad/${idEscuela}/profesores`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener profesores para la escuela con ID ${idEscuela}:`, error);
        return null; 
    }
};


// Petición GET para obtener profesores según el ID de departamento
export const obtenerProfesoresPorIdDepartamento = async (idDepartamento) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/departamento/${idDepartamento}/profesores`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener profesores para el departamento con ID ${idDepartamento}:`, error);
    return null;
  }
};
