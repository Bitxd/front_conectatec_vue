import axios from 'axios';


// Peticion get para obtener las universidades
const obtenerUniversidades = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/universidades');
    return response.data;

  }
  catch (error) {
    console.error('Error al obtener las universidades:', error);
  }
};



// Petición GET para obtener una universidad por ID
const obtenerUniversidadPorId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/universidades/${id}`);
    return response.data;
  }
  catch (error) {
    console.error(`Error al obtener la universidad con ID ${id}:`, error);
  }
};


const obtenerCalendariosPorEscuela = async (escuelaId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/calendario/escuela/${escuelaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los calendarios de la escuela con ID ${escuelaId}:`, error);
  }
};

// Petición GET para obtener el mapa virtual de una escuela por ID
const obtenerMapaPorEscuela = async (escuelaId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/mapa/${escuelaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el mapa virtual para la escuela con ID ${escuelaId}:`, error);
  }
};



export default { obtenerUniversidades, obtenerUniversidadPorId, obtenerCalendariosPorEscuela, obtenerMapaPorEscuela};