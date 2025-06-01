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


// Peticion post para publicar en el foro
const crearPublicacion = async (token, formData) => {
  try {
    // Enviamos el FormData; axios se encargará de establecer el Content-Type adecuado
    const response = await axios.post('http://localhost:5000/api/foro/publicar', formData, { 
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    // Retornamos la respuesta de la petición
    return response.data;
  } catch (error) {
    // Si hay error se va a imprimir el error
    if(error.response) {
      console.error('Error al subir la publicacion:', error.response.data);
      alert(`Error al subir la publicación: ${error.response.data}`);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error;
  }
};


export default { obtenerForoPorEscuela, crearPublicacion };
