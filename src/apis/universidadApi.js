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
    console.log('Accediendo a la api de calendario con el id  ' + escuelaId)  
    const response = await axios.get(`http://localhost:5000/api/calendarios/${escuelaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los calendarios de la escuela con ID ${escuelaId}:`, error);
  }
};

export default { obtenerUniversidades, obtenerUniversidadPorId, obtenerCalendariosPorEscuela};