import axios from 'axios';

const actualizarCorreo = async (token, nuevoEmail) => {
  try {
    console.log('Intentando actualizar el correo...');

    const response = await axios.put(
      'http://localhost:5000/api/profile/email',
      { email: nuevoEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Correo actualizado correctamente:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error al actualizar el correo:', error.response.data);
      alert(`Error: ${error.response.data.mensaje}`);
    } else {
      console.error('Error de conexión con el servidor:', error.message);
      alert(`Error de conexión: ${error.message}`);
    }
    throw error;
  }
};

export default {
  actualizarCorreo,
};
