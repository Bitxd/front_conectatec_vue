import axios from 'axios';

// Peticion get para obtener todas las categorias
const obtenerCategorias = async () =>
{
    try
    {
        const response = await axios.get(`http://localhost:5000/api/categorias`);
        return response.data;
    }
    catch (error)
    {
        console.error('Error al obtener categorias:', error);
        return null;
    }
};

export default obtenerCategorias;
