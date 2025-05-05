import axios from 'axios';

const obtenerPublicacionId = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/publicaciones/${id}`);
    return data;
  }
  catch (error) {
    const mensaje = error.response?.data?.mensaje || 'Error al obtener la publicación';
    console.error('Error:', mensaje);
    return null;
  }
};

export const obtenerPublicacionesIdForo = async (idForo) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/foro/${idForo}/publicaciones`);

    return response.data;
  }
  catch (error) {
    const mensaje = error.response?.data?.mensaje || 'Error al obtener las publicaciones';
    console.error('Error:', mensaje);
    return null;
  }
};

const eliminarPublicacion = async (id, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/publicaciones/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.mensaje || 'Error al eliminar la publicación';
    console.error('Error:', mensaje);
    return null;
  }
};


// Función para obtener los comentarios de una publicación por su ID
const obtenerComentariosPorId = async (idPublicacion) => {
  console.log(`Iniciando solicitud para comentarios de publicación ${idPublicacion}`);
  try {
    const response = await axios.get(
      `http://localhost:5000/api/publicaciones/${idPublicacion}/comentarios`
    );
    console.log('Respuesta recibida:', response.data);
    return response.data;
  }
  catch (error) {
    console.error('Error completo:',
      {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    return null;
  }
};

const agregarComentario = async (idPublicacion, contenido, token) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/publicaciones/${idPublicacion}/comentarios`,
      { contenido },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }
  catch (error) {
    const mensaje = error.response?.data?.mensaje || 'Error al agregar el comentario';
    console.error('Error:', mensaje);
    return null;
  }
};


// Versión corregida
const eliminarComentario = async (idComentario, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/comentarios/${idComentario}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.mensaje || 'Error al eliminar el comentario';
    console.error('Error:', mensaje);
    return null;
  }
};




export default { obtenerPublicacionId, obtenerPublicacionesIdForo, eliminarPublicacion, obtenerComentariosPorId, agregarComentario, eliminarComentario};