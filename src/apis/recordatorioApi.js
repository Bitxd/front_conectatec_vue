// src/apis/recordatorioApi.js
import axios from 'axios';

export const obtenerMisRecordatorios = async (token) => {
  console.log("Entrando a api de obtener recordatorios");
  try {
    const response = await axios.get('http://localhost:5000/api/recordatorios/usuario', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.recordatorios;
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta del servidor:', error.response.status, error.response.data);
      throw error.response.data;
    } else {
      console.error('Error al hacer la solicitud:', error.message);
      throw new Error('Error de red o servidor no disponible');
    }
  }
};
