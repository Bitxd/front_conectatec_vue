<template>
  <section class="presentacion-container">
    <div class="content">
      <h1 class="main-title">
        Tu espacio académico personalizado
      </h1>
      <p class="subtext">
        Selecciona tu universidad y carrera para comenzar a organizar tu futuro profesional.
      </p>
      <button class="cta-button" @click="redirigirASeleccion">
        Comenzar ahora
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PresentacionComponent',
  methods: {
    redirigirASeleccion() {
      this.$router.push('Universidades');
    }
  }
};
</script>

<style scoped>
.presentacion-container {
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

.content {
  max-width: 700px;
  text-align: center;
  background: #ffffff;
  padding: 48px 32px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.main-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3436;
  position: relative;
  padding-left: 28px;
  margin-bottom: 16px;
}



.subtext {
  font-size: 1.1rem;
  color: #4b5563;
  margin-bottom: 32px;
  line-height: 1.6;
}

.cta-button {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  background: #357abd;
  box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
}
</style>
