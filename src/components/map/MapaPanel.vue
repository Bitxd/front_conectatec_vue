<template>
    <div class="overlay" @click.self="close">
      <div class="modal">
        <header class="modal-header">
          <h3>Vista en el Mapa</h3>
          <button class="btn-close" @click="close">&times;</button>
        </header>
        <div class="modal-body">
          <!-- Usamos ref en lugar de id -->
          <div ref="mapContainer" class="map"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Map, MapStyle } from '@maptiler/sdk';
  import maplibregl from 'maplibre-gl';
  
  export default {
    name: 'MapaPanel',
    emits: ['close'],
    setup(_, { emit }) {
      const mapContainer = ref(null);
  
      const close = () => {
        emit('close');
      };
  
      onMounted(() => {
        // Aquí pasamos mapContainer.value (HTMLElement) como container
        const map = new Map({
          container: mapContainer.value,
          key: 'vdDBb2kfjtGOosaJQUyW',    // Tu API key
          style: MapStyle.OUTDOOR,         // Estilo Outdoor
          center: [-107.39635011128371, 24.78911546232657],
          zoom: 14,
          terrain: true,
          terrainControl: true,
          pitch: 61,
          bearing: 172,
          maxPitch: 85,
          maxZoom: 14
        });
  
        // Ejemplo de marcador personalizado
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.style.backgroundImage = 'url(/path/to/your/icon.svg)';
        markerEl.style.width = '32px';
        markerEl.style.height = '32px';
        markerEl.style.backgroundSize = '100%';
  
        new maplibregl.Marker(markerEl)
          .setLngLat([-107.39635011128371, 24.78911546232657])
          .addTo(map);
      });
  
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
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    border-radius: 8px;
    width: 95%;
    max-width: 800px;
    height: 80vh;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .modal-header {
    padding: 0.8rem 1.5rem;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: 0.5px;
  }
  
  .btn-close {
    background: transparent;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: #64748b;
    transition: color 0.2s ease;
  }
  
  .btn-close:hover {
    color: #475569;
  }
  
  .modal-body {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
  }
  
  .map {
    flex: 1;
    width: 100%;
    height: 100%;
  }
  
  .custom-marker {
    cursor: pointer;
    background-size: contain;
  }
  </style>
  