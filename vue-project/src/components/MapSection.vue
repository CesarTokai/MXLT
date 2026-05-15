<script setup>
import { ref, onMounted } from 'vue'
import { destinosLista } from '../data/destinos'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref(null)
let map = null

onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([19.0, -99.0], 7)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // Agregar marcadores para cada destino
  destinosLista.forEach(destino => {
    if (destino.lat && destino.lng) {
      L.circleMarker([destino.lat, destino.lng], {
        radius: 6,
        fillColor: '#b15838',
        color: '#1f1815',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.8
      })
        .bindPopup(`<strong>${destino.name}</strong><br>${destino.region}`)
        .addTo(map)
    }
  })

  // Marcador frontera Guatemala - Tapachula
  L.circleMarker([14.8935, -92.2639], {
    radius: 8,
    fillColor: '#ffc107',
    color: '#1f1815',
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.9
  })
    .bindPopup('<strong>Frontera Guatemala</strong><br>Tapachula, Chiapas')
    .addTo(map)

  // Marcador Michoacán - Morelia
  L.circleMarker([19.7030, -101.1860], {
    radius: 8,
    fillColor: '#ffc107',
    color: '#1f1815',
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.9
  })
    .bindPopup('<strong>Michoacán</strong><br>Morelia (Capital)')
    .addTo(map)

  // Marcador Michoacán - Pátzcuaro
  L.circleMarker([19.5167, -101.6167], {
    radius: 8,
    fillColor: '#ffc107',
    color: '#1f1815',
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.9
  })
    .bindPopup('<strong>Michoacán</strong><br>Pátzcuaro')
    .addTo(map)

  // Marcador Michoacán - Lázaro Cárdenas
  L.circleMarker([17.9550, -102.2034], {
    radius: 8,
    fillColor: '#ffc107',
    color: '#1f1815',
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.9
  })
    .bindPopup('<strong>Michoacán</strong><br>Lázaro Cárdenas (Costa)')
    .addTo(map)
})
</script>

<template>
  <section id="mapa" class="map-section">
    <div class="section-inner">
      <div class="section-head fade-up">
        <span class="eyebrow">Ubicaciones · Mapa Interactivo</span>
        <h2 class="section-title">
          Destinos en el <span class="italic">mapa</span>
        </h2>
        <p class="section-sub">
          Explora todos nuestros destinos en el mapa interactivo. Haz clic en cada marcador para ver más detalles.
        </p>
      </div>
      <div ref="mapContainer" class="map-container fade-up"></div>
    </div>
  </section>
</template>

<style scoped>
.map-section {
  background: var(--ivory);
  padding: 110px 5vw;
  position: relative;
}

.map-section :deep(.section-title) {
  color: var(--charcoal);
}

.map-section :deep(.section-sub) {
  color: rgba(0, 0, 0, 0.7);
}

.map-section :deep(.eyebrow) {
  color: var(--terracotta);
}

.map-container {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.map-container :deep(.leaflet-container) {
  font-family: inherit;
}

.map-container :deep(.leaflet-popup-content-wrapper) {
  background: var(--charcoal);
  border-radius: 4px;
  padding: 8px;
}

.map-container :deep(.leaflet-popup-content) {
  color: var(--ivory);
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.map-container :deep(.leaflet-popup-content strong) {
  color: var(--terracotta-soft);
  display: block;
  margin-bottom: 4px;
}

.map-container :deep(.leaflet-popup-tip) {
  background: var(--charcoal);
}

.map-container :deep(.leaflet-control-attribution) {
  background: rgba(0, 0, 0, 0.5) !important;
  color: rgba(255, 255, 255, 0.7) !important;
}

.map-container :deep(.leaflet-control-attribution a) {
  color: var(--terracotta-soft) !important;
}

@media (max-width: 768px) {
  .map-container {
    height: 350px;
  }
}
</style>
