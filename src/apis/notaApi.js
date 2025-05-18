import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Cambia según tu URL base


const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const crearNota = async (token, { titulo, contenido }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/notas`,
      { titulo, contenido },
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const obtenerNotasUsuario = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/notas/usuario`,
      getAuthHeaders(token)
    );
    return response.data.notas;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const modificarNota = async (token, notaId, { titulo, contenido }) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/notas/${notaId}`,
      { titulo, contenido },
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const eliminarNota = async (token, notaId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/notas/${notaId}`,
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
