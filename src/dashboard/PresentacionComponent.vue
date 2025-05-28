<template>
  <section class="presentacion-container">
    <div class="content">
      <img src="/images/estudiante.png" alt="Educación universitaria" class="hero-image">
      <div class="text-content">
        <h1 class="main-title">
          Tu espacio académico personalizado
        </h1>
        <p class="subtext">
          Selecciona tu universidad y carrera para comenzar
        </p>
        <button class="cta-button" @click="redirigirASeleccion">
          Comenzar ahora
        </button>
      </div>
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
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  font-family: 'Inter', sans-serif;
}


.content {
  display: flex;
  align-items: center;
  gap: 40px;
  max-width: 1000px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-image {
  max-width: 320px;
  width: 100%;
}

.text-content {
  max-width: 500px;
  text-align: left;
}

.main-title {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1.3;
}

.subtext {
  color: #64748b;
  margin-bottom: 30px;
  line-height: 1.5;
  font-size: 1rem;
}

.cta-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    text-align: center;
  }

  .text-content {
    text-align: center;
  }

  .main-title {
    font-size: 1.6rem;
  }

  .hero-image {
    max-width: 240px;
  }

  .cta-button {
    width: 100%;
    padding: 14px 20px;
  }
}
</style>
