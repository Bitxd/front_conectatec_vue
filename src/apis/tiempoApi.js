import axios from 'axios';


const agregarTiempoSeccion = async (token, tiempoData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/tiempo-seccion`, 
      tiempoData, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pasando el token de autenticación
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al agregar tiempo a la sección:', error);
    return null;
  }
};

export default agregarTiempoSeccion;
