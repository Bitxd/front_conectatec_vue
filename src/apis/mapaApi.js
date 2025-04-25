import axios from 'axios';

const obtenerMapa = async (idEscuela) =>
{
    try
    {
        const response = await axios.get(`http://localhost:5000/api/escuela/${idEscuela}/mapa`);
        return response.data;
    }
    catch (error)
    {
        console.error('Error al obtener mapa:', error);
        return null;
    }
};

export default obtenerMapa;
