<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <header class="modal-header">
        <h3>Vista en el Mapa</h3>
        <button class="btn-close" @click="close">&times;</button>
      </header>
      <div class="modal-body">
        <div ref="mapContainer" class="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'maplibre-gl/dist/maplibre-gl.css';
import { ref, onMounted } from 'vue';
import { Map } from '@maptiler/sdk';
import maplibregl from 'maplibre-gl';

export default {
  name: 'MapaPanel',
  emits: ['close'],
  setup(_, { emit }) {
    const mapContainer = ref(null);
    const close = () => emit('close');

    onMounted(() => {
      if (!mapContainer.value) return;

      const map = new Map({
        container: mapContainer.value,
        style: 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=vdDBb2kfjtGOosaJQUyW',
        center: [-107.39635011128371, 24.78911546232657],
        zoom: 18,
        pitch: 0,
        bearing: 0,
        maxPitch: 0,
        maxZoom: 20
      });

      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/centro-computo.png', 'Centro de Computo')
      })
        .setLngLat([-107.39864493344014, 24.788977216613265])
        .addTo(map);

      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/cafeteria.png', 'Cafetería')
      })
        .setLngLat([-107.3975430735867, 24.78857462857472])
        .addTo(map);

      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/biblioteca.png', 'Biblioteca')
      })
        .setLngLat([-107.3973856551091, 24.78890005908309])
        .addTo(map);


      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/oficinas-administrativas.png', 'Edificio\nadministrativo')
      })
        .setLngLat([-107.39623341540175, 24.7888743767061])
        .addTo(map);


      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/jefatura.png', 'Jefatura\nSistemas')
      })
        .setLngLat([-107.39801253408456, 24.788971215458727])
        .addTo(map);


      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/ing-sistemas.png', 'Aula de sistemas y TICS')
      })
        .setLngLat([-107.39816416061161, 24.788735811387255])
        .addTo(map);


      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/ing-sistemas.png', 'Aula de sistemas')
      })
        .setLngLat([-107.39828320015589, 24.788507665584664])
        .addTo(map);

      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/ing-bioquimica.png', 'Aulas de bioquimica')
      })
        .setLngLat([-107.39811739021332, 24.788218754902374])
        .addTo(map);

      new maplibregl.Marker({
        element: createMarkerElement('/mapsImage/ing-bioquimica.png', 'Laboratorio triple de bioquimica')
      })
        .setLngLat([-107.39825856641362, 24.787975830179978])
        .addTo(map);









    });

    const createMarkerElement = (iconUrl, label) => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';

      const img = document.createElement('img');
      img.src = iconUrl;
      img.style.width = '24px';
      img.style.height = '24px';
      img.style.objectFit = 'contain';
      img.style.cursor = 'pointer';

      const span = document.createElement('span');
      span.textContent = label;
      span.style.marginTop = '4px'; // Un poco más de separación
      span.style.fontSize = '12px'; // Aumenté el tamaño de 10px a 12px
      span.style.color = '#1e293b';
      span.style.fontWeight = 'bold';
      span.style.textAlign = 'center';

      container.appendChild(img);
      container.appendChild(span);

      return container;
    };

    return {
      mapContainer,
      close
    };
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 8px;
  width: 95%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 0.8rem 1.5rem;
  background: #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s;
}

.btn-close:hover {
  color: #475569;
}

.modal-body {
  flex: 1;
  display: flex;
  padding: 0;
}

.map {
  flex: 1;
  position: relative;
}
</style>
