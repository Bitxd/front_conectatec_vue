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

export default { login, obtenerPerfilUsuario };
