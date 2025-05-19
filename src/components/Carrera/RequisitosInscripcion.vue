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
        <li v-for="(doc, index) in enlaces" :key="index">
          <a :href="doc.url" target="_blank" rel="noopener" class="doc-link">
            {{ doc.name }}
            <svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/>
              <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z"/>
            </svg>
          </a>
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
.doc-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #006eff;
  font-weight: 500;
  transition: color 0.2s ease;
}
.doc-link:hover {
  color: #004bb5;
}
.external-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  margin-left: 4px;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'RequisitosInscripcion',
  props: {
    precio_inscripcion: Number,
    fecha_inscripcion: String,
    documentos_solicitados: Array
  },
  data() {
    return {
      enlaces: []
    };
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
  },
  async mounted() {
    this.enlaces = this.documentos_solicitados.map(name => ({ name, url: null }));
    await Promise.all(
      this.enlaces.map(async item => {
        try {
          const response = await axios.get('https://api.duckduckgo.com/', {
            params: { q: `${item.name} site:gob.mx México`, format: 'json' }
          });
          const data = response.data;
          // Prioriza AbstractURL, si no existe usa FirstURL del primer RelatedTopic
          let url = data.AbstractURL ||
                    (data.RelatedTopics && data.RelatedTopics[0] && data.RelatedTopics[0].FirstURL) ||
                    '#';
          item.url = url;
        } catch (e) {
          console.error('Error obteniendo enlace para', item.name, e);
          item.url = '#';
        }
      })
    );
  }
};
</script>
