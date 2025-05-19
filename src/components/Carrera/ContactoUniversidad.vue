<template>
  <div class="contacto-universidad" v-if="contacto">
    <h2 class="contacto-header">Información de Contacto</h2>
    <div class="contacto-cards">
      <div class="card">
        <svg class="icono" viewBox="0 0 24 24"><path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 01.95-.27 11.72 11.72 0 003.7.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.7 1 1 0 01-.27.95l-2.2 2.2z"/></svg>
        <div>
          <span class="label">Teléfono</span>
          <a :href="`tel:${contacto.telefono}`" class="value">{{ contacto.telefono }}</a>
        </div>
      </div>

      <div class="card">
        <svg class="icono" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <div>
          <span class="label">Correo</span>
          <a :href="`mailto:${contacto.correo_contacto}`" class="value">{{ contacto.correo_contacto }}</a>
        </div>
      </div>

      <div class="card">
        <svg class="icono" viewBox="0 0 24 24"><path d="M10.9 2H5c-1.1 0-2 .9-2 2v4.9c0 .5.2 1 .6 1.4l10 10c.4.4.9.6 1.4.6H19c1.1 0 2-.9 2-2v-5.1c0-.5-.2-1-.6-1.4l-10-10A1.993 1.993 0 0010.9 2zM12 4.5l6.5 6.5H12V4.5zm-6 2v12h12v-4h-5c-1.1 0-2-.9-2-2V6.5H6z"/></svg>
        <div>
          <span class="label">Sitio Web</span>
          <a :href="contacto.pagina_web" target="_blank" rel="noopener" class="value">
            {{ contacto.pagina_web }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactoUniversidad',
  props: {
    contacto: {
      type: Object,
      required: true,
      default: () => ({
        telefono: '+52 667 123 4567',
        correo_contacto: 'contacto@itculiacan.edu.mx',
        pagina_web: 'https://www.itculiacan.edu.mx'
      })
    }
  }
}
</script>

<style scoped>
.contacto-universidad {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.contacto-header {
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  border-bottom: 3px solid #22c1ff;
  padding-bottom: 8px;
  margin-bottom: 24px;
}

.contacto-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 240px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px 16px;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.icono {
  width: 32px;
  height: 32px;
  fill: #006eff;
}

.label {
  display: block;
  font-size: 0.85rem;
  color: #555;
}

.value {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
}

.value:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .contacto-cards {
    flex-direction: column;
  }
}
</style>
