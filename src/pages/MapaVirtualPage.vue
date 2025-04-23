<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapaVirtualPage',
  data() {
    return {
      map: null,
      coords: [
        [-107.39948689766777, 24.789276910885746],
        [-107.39876540210257, 24.789285529491366],
        [-107.3982907339672, 24.78929414809636],
        [-107.39785403928292, 24.78929414809636],
        [-107.39736038442224, 24.789320003908642],
        [-107.39681926274834, 24.789363096915707],
        [-107.39631611452504, 24.78938033411434],
        [-107.39602182028098, 24.789414808504432],
        [-107.39596486010508, 24.78925967367273],
        [-107.3959458733793, 24.789173487571773],
        [-107.39584144638968, 24.788949403427353],
        [-107.39579397957642, 24.788664988353958],
        [-107.39568005922368, 24.788406428631205],
        [-107.39561360568464, 24.788216817824278],
        [-107.39555664550875, 24.787949638469755],
        [-107.3954237384307, 24.787604890063832],
        [-107.39530032471576, 24.787303234423348],
        [-107.39508197737338, 24.786863677749352],
        [-107.39492059223653, 24.786402148622344],
        [-107.3947307249821, 24.785953969918793],
        [-107.39457883117922, 24.785609215968563],
        [-107.3945123776402, 24.785359268756082],
        [-107.3945503510908, 24.785204128853437],
        [-107.39461680462983, 24.785092083247264],
        [-107.39479717852112, 24.785040369856844],
        [-107.39504400595145, 24.785057607656015],
        [-107.39589840859473, 24.78501451315269],
        [-107.3962116895641, 24.784997275347536],
        [-107.39668635769944, 24.784997275347536],
        [-107.39727494618708, 24.78498003753994],
        [-107.39761670724438, 24.784945561917596],
        [-107.39791100148796, 24.784954180824087],
        [-107.3979964417523, 24.785005894250403],
        [-107.3979964417523, 24.785178272183373],
        [-107.39797745502699, 24.785342030997953],
        [-107.39794897493906, 24.7854540763784],
        [-107.39812934883034, 24.785488551859444],
        [-107.3985185767009, 24.785540265063943],
        [-107.39877489749388, 24.785626453688764],
        [-107.3986609771416, 24.78601430176218],
        [-107.39862300369053, 24.786091871230823],
        [-107.39903121828686, 24.786186678294214],
        [-107.39932551253092, 24.786290104098867],
        [-107.39970524703882, 24.786402148622344],
        [-107.39998055455757, 24.78666933131018],
        [-107.39999004792024, 24.786953750958446],
        [-107.40001852800818, 24.787324357400195],
        [-107.400103860936, 24.78761767116322],
        [-107.400103860936, 24.787936563438407],
        [-107.40005639412227, 24.78822959886064],
        [-107.40005639412227, 24.78837611631225],
        [-107.40005639412227, 24.788462302967133],
        [-107.39986652686831, 24.788445065640943],
        [-107.39952476581102, 24.788462302967133],
        [-107.3991640180284, 24.788462302967133],
        [-107.39915452466575, 24.78868638799139],
        [-107.39923996493008, 24.7888329049035],
        [-107.399363378645, 24.789039752013935],
        [-107.39947729899728, 24.78918626850873],
        [-107.39951527244837, 24.789263835995158]
      ],
      labels: [
        { coord: [-107.39948689766777, 24.789276910885746], text: "Entrada Principal" },
        { coord: [-107.3945503510908, 24.785204128853437], text: "Área Recreativa" }
      ],
      labelMarkers: []
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    addLabels() {
      this.labels.forEach(label => {
        const div = document.createElement('div');
        div.className = 'map-label';
        div.innerHTML = label.text;

        const marker = L.marker([label.coord[1], label.coord[0]], {
          icon: L.divIcon({
            className: 'label-icon',
            html: div,
            iconSize: [null, null], // Tamaño automático
            iconAnchor: [0, -10] // Posicionamiento
          })
        }).addTo(this.map);

        this.labelMarkers.push({ marker, div });
      });

      // Actualizar tamaños iniciales
      this.updateLabelSizes();
    },

    updateLabelSizes() {
      const currentZoom = this.map.getZoom();
      const maxZoom = 22;
      const scaleFactor = currentZoom / maxZoom;

      this.labelMarkers.forEach(({ div }) => {
        div.style.fontSize = `${Math.max(8, 14 * scaleFactor)}px`;
        div.style.padding = `${2 * scaleFactor}px ${4 * scaleFactor}px`;
      });
    },
    initializeMap() {
      // 1) Crear el mapa
      this.map = L.map('map', {
        zoomControl: true,
        maxBoundsViscosity: 1.0
      });

      // 2) Capa base OSM con zoom alto
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22
      }).addTo(this.map);

      // 3) Bounds y zoom
      const inner = this.coords.map(c => [c[1], c[0]]);
      const bounds = L.latLngBounds(inner);
      this.map.fitBounds(bounds, { padding: [2, 2] });
      this.map.setMinZoom(17.3);
      this.map.setMaxZoom(22);
      this.map.setMaxBounds(bounds);

      // 4) Máscara exterior
      const outer = [
        [90, -180],
        [90, 180],
        [-90, 180],
        [-90, -180],
        [90, -180]
      ];
      L.polygon([outer, inner], {
        fillColor: '#fff',
        fillOpacity: 1,
        weight: 0,
        stroke: false,
        fillRule: 'evenodd'
      }).addTo(this.map);

      // 5) Borde interior (nuevo)
      L.polygon(inner, {
        color: '#006080',
        weight: 3,
        opacity: 1,
        fill: false
      }).addTo(this.map);


      this.addLabels();

      this.map.on('zoomend', () => {
        this.updateLabelSizes();
      });

    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 90vh;
}

#map {
  width: 50%;
  height: 100%;
  background: white;
  border: 3px solid #4682b4;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-left: 1rem;
}

.map-label {
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: #fff;
  background: #006080cc;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  transition: all 0.3s ease;
  border: 1px solid #ffffff88;
}

.label-icon {
  background: transparent !important;
  border: none !important;
}
</style>
