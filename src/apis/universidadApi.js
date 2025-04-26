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

const obtenerDepartamentosID = async (escuelaId) => {
  try {
      const response = await axios.get(`http://localhost:5000/api/universidad/${escuelaId}/departamentos`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener departamentos:', error);
      return null;
  }
};

const obtenerEncargadosIdDepartamento= async (departamentoId) => {
  try {
      const response = await axios.get(`http://localhost:5000/api/departamento/${departamentoId}/encargados`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener departamentos:', error);
      return null;
  }
};

export default { obtenerUniversidades, obtenerUniversidadPorId, obtenerCalendariosPorEscuela, obtenerMapaPorEscuela, obtenerDepartamentosID, obtenerEncargadosIdDepartamento};