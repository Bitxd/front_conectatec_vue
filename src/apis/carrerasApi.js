import axios from 'axios';

// Petición GET para obtener todas las carreras según el ID de universidad
export const obtenerCarrerasPorIdEscuela = async (idEscuela) =>
{
    try 
    {
        const response = await axios.get(`http://localhost:5000/api/universidad/${idEscuela}/carreras`);
        return response.data;
    } 
    catch (error) 
    {
        console.error(`Error al obtener carreras para la escuela con ID ${idEscuela}:`, error);
        return null;
    }
};
