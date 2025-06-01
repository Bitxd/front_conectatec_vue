<template>
  <div class="requisitos-inscripcion-card">
    <h2 class="header">Requisitos de Inscripción</h2>
    <div class="detalle">
      <span class="label">Precio de inscripción:</span>
      <span class="value">{{ formattedPrecio }}</span>
    </div>
    <div class="detalle">
      <span class="label">Fecha límite:</span>
      <span class="value">{{ formattedFecha }}</span>
    </div>
    <div class="documentos">
      <h3>Documentos solicitados:</h3>
      <ul>
        <li v-for="(doc, index) in documentos_solicitados" :key="index">
          <span class="doc-item">{{ doc }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.requisitos-inscripcion-card {
  max-width: 600px;
  margin: 30px auto;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.header {
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  border-bottom: 3px solid #22c1ff;
  padding-bottom: 8px;
}
.detalle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.label {
  font-weight: 500;
  color: #555;
}
.value {
  font-weight: 600;
  color: #2c3e50;
}
.documentos h3 {
  margin-top: 20px;
  margin-bottom: 8px;
  font-size: 20px;
  color: #2c3e50;
}
.documentos ul {
  list-style: none;
  padding: 0;
}
.documentos li {
  margin-bottom: 8px;
}
.doc-item {
  color: #2c3e50;
  font-weight: 500;
}
</style>

<script>
export default {
  name: 'RequisitosInscripcion',
  props: {
    precio_inscripcion: Number,
    fecha_inscripcion: String,
    documentos_solicitados: Array
  },
  computed: {
    formattedPrecio() {
      return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
        .format(this.precio_inscripcion);
    },
    formattedFecha() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(this.fecha_inscripcion).toLocaleDateString('es-MX', options);
    }
  }
};
</script>
