import axios from 'axios';


// Peticion get para obtener las universidades
const obtenerUniversidades = async () =>
{
  try
  {
    const response = await axios.get('http://localhost:5000/api/universidades');
    return response.data;

  }
  catch (error)
  {
    console.error('Error al obtener las universidades:', error);
  }
};



// Petición GET para obtener una universidad por ID
const obtenerUniversidadPorId = async (id) =>
{
    try
    {
      const response = await axios.get(`http://localhost:5000/api/universidades/${id}`);
      return response.data;
    }
    catch (error)
    {
      console.error(`Error al obtener la universidad con ID ${id}:`, error);
    }
  };

export default { obtenerUniversidades, obtenerUniversidadPorId };