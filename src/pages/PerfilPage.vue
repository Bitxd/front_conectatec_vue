<template>
  <div class="perfil-page">
    <h1>Mi Perfil</h1>
    <div class="perfil-info">
      <img :src="usuario.imagenPerfil" alt="Foto de perfil" class="perfil-avatar" />
      <div class="datos-usuario">
        <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
        <p><strong>Correo:</strong> {{ usuario.email }}</p>
        <p><strong>Usuario:</strong> {{ usuario.username }}</p>
      </div>
    </div>
    <button @click="editarPerfil">Editar Perfil</button>
  </div>
</template>

<script>
export default {
  name: 'PerfilPage',
  data() {
    return {
      usuario: {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        username: 'juanp',
        imagenPerfil: 'https://jeffjbutler.com//wp-content/uploads/2018/01/default-user-300x300.png',
      }
    }
  },
  methods: {
    editarPerfil() {
      // Aquí iría la lógica para editar perfil, como redirigir a un formulario
      alert('Función de editar perfil aún no implementada');
    }
  }
}
</script>

<style scoped>
.perfil-page {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.perfil-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.perfil-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.datos-usuario p {
  margin: 0.3rem 0;
  font-size: 1.1rem;
}

button {
  padding: 0.5rem 1.2rem;
  background-color: #5ac3f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3a9bdc;
}
</style>
