import axios from 'axios';

// Petición para iniciar sesión
const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', { email, password });

    localStorage.setItem('token', response.data.token);


    const { usuario } = response.data;
    localStorage.setItem('usuario', JSON.stringify(usuario));


    localStorage.setItem('configuracion', JSON.stringify(usuario.configuracion));


    localStorage.setItem('recordatorios', JSON.stringify(usuario.recordatorios));

    return response;
  } catch (error) {
    if (error.response) {
      console.error('Error en login:', error.response.data.mensaje);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error;
  }
};


// Petición para registrar un nuevo usuario
const registrar = async (fullname, username, email, password, confirmpassword, phone = '') => {
  try {
    const response = await axios.post('http://localhost:5000/api/register', {
      fullname,
      username,
      email,
      password,
      confirmpassword,
      phone
    });

    console.log('Registro exitoso:', response.data.mensaje);
    return response; // Puedes retornar para manejarlo después si quieres
  }
  catch (error) {
    if (error.response) {
      console.error('Error en registro:', error.response.data.mensaje);
    }
    else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error; // Para manejar el error en el componente que lo llama
  }
};


// Peticion get para obtener los datos del usuario
const obtenerPerfilUsuario = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/api/profile', { headers: { Authorization: `Bearer ${token}`, }, });
    return response.data;
  }
  catch (error) {
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
    }
    else if (error.request) {

      console.error('No se recibió respuesta del servidor:', error.request);
    }
    else {

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



// Peticion para obtener la configuracion del usuario
const obtenerConfiguracionUsuario = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/api/configuracion', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Configuración obtenida:', response.data);
  } catch (error) {
    console.error('Error al obtener la configuración:', error);
  }
};



const actualizarImagenPerfil = async (token, imagenPerfil) => {
  alert(`Token: ${token}\nImagen: ${imagenPerfil?.name || 'Archivo no válido'}`);
  try {
    const formData = new FormData();
    formData.append('imagenPerfil', imagenPerfil);

    const response = await axios.post(
      'http://localhost:5000/api/usuario/imagen',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error al subir imagen:', error.response.data);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error;
  }
};


// Retorna los datos del recordatorio si existe, o null si no existe
const verificarRecordatorio = async (calendarioId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/calendarios/${calendarioId}/recordatorio`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data ? response.data : null;
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error;
  }
};


// Crea un nuevo recordatorio para un calendario específico
const crearRecordatorio = async (calendarioId, token, datos) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/calendarios/${calendarioId}/recordatorio`,
      {
        titulo: datos.titulo,
        fechaRecordatorio: datos.fechaRecordatorio, // formato ISO o 'YYYY-MM-DD'
        horaRecordatorio: datos.horaRecordatorio,   // formato 'HH:mm'
        metodoNotificacion: datos.metodoNotificacion || 'email' // opcional
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
    } else {
      console.error('Hubo un problema al conectar con el servidor:', error.message);
    }
    throw error;
  }
};


const actualizarRecordatorio = async (recordatorioId, token, datos) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/recordatorios/${recordatorioId}`,
      {
        titulo: datos.titulo,
        fechaRecordatorio: datos.fechaRecordatorio, // ISO o 'YYYY-MM-DD'
        horaRecordatorio: datos.horaRecordatorio    // 'HH:mm'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta al actualizar:', error.response.data);
    } else {
      console.error('Problema de conexión al actualizar:', error.message);
    }
    throw error;
  }
};


const eliminarRecordatorio = async (recordatorioId, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/recordatorios/${recordatorioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta al eliminar:', error.response.data);
    } else {
      console.error('Problema de conexión al eliminar:', error.message);
    }
    throw error;
  }
};



export default {
  login,
  registrar,
  obtenerPerfilUsuario,
  establecerUniversidadFavorita,
  obtenerUniversidadFavorita,
  eliminarUniversidadFavorita,
  actualizarUniversidadFavorita,
  verificarRecordatorio,
  crearRecordatorio,
  obtenerConfiguracionUsuario,
  actualizarImagenPerfil,
  actualizarRecordatorio,
  eliminarRecordatorio
};
