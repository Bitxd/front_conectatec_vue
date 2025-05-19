import axios from 'axios';

// Petición GET para obtener todas las residencias según el ID de carrera
export const obtenerResidenciasPorIdCarrera = async (idCarrera) =>
{
    try
    {
        const response = await axios.get(`http://localhost:5000/api/carrera/${idCarrera}/residencias`);
        return response.data;
    }
    catch (error)
    {
        console.error(`Error al obtener residencias para la carrera con ID ${idCarrera}:`, error);
        return null;
    }
};
