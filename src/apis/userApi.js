import axios from 'axios';

// Peticion para iniciar sesion
const login = async (email, password) =>
{
    try
    {
        const response = await axios.post('http://localhost:5000/api/login', { email, password });
        
        // Guardar el token en el localStorage
        localStorage.setItem('token', response.data.token);

        return response; // Devolver la respuesta para el manejo posterior
    }
    catch (error)
    {
        if (error.response)
        {
            console.error('Error en login:', error.response.data.mensaje);
        }
        else
        {
            console.error('Hubo un problema al conectar con el servidor:', error.message);
        }
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
};

// Peticion get para obtener los datos del usuario
const obtenerPerfilUsuario = async (token) =>
{
  try
  {
    const response = await axios.get('http://localhost:5000/api/profile', {headers: { Authorization: `Bearer ${token}`, },});
    return response.data;
  }
  catch (error)
  {
    if (error.response)
    {
      console.error('Error en la respuesta:', error.response.data);
    }
    else if (error.request)
    {

      console.error('No se recibió respuesta del servidor:', error.request);
    }
    else
    {

      console.error('Error al configurar la petición:', error.message);
    }
    throw error;
  }
};

// Petición POST para establecer la universidad favorita del usuario
const establecerUniversidadFavorita = async (token, universidadId) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/favorita',
      { universidadId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error al establecer universidad favorita:', error.response.data);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};

// Petición GET para obtener la universidad favorita del usuario
const obtenerUniversidadFavorita = async (token) => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/favorita',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error al obtener universidad favorita:', error.response.data);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};

// Petición DELETE para eliminar la universidad favorita del usuario
const eliminarUniversidadFavorita = async (token) => {
  try {
    const response = await axios.delete(
      'http://localhost:5000/api/universidad-favorita',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error al eliminar universidad favorita:', error.response.data);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};

// Petición PUT para actualizar la universidad favorita del usuario
const actualizarUniversidadFavorita = async (token, universidadId) => {
  try {
    const response = await axios.put(
      'http://localhost:5000/api/universidad-favorita',
      { universidadId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error al actualizar universidad favorita:', error.response.data);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error; 
  }
};

export default { login, obtenerPerfilUsuario, establecerUniversidadFavorita, obtenerUniversidadFavorita, eliminarUniversidadFavorita, actualizarUniversidadFavorita};
