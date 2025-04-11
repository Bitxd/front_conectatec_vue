import axios from 'axios';

// Función para obtener el foro y sus publicaciones por ID de escuela
const obtenerForoPorEscuela = async (idEscuela) =>
{
  try
  {
    const response = await axios.get(`http://localhost:5000/api/escuelas/${idEscuela}/foro`);
    return response.data;
  }
  catch (error)
  {
    console.error('Error al obtener el foro:', error);
    return null;
  }
};

export default obtenerForoPorEscuela;
