<script setup>
const items = [
  '14 pasajeros por unidad',
  '30+ estados recorridos',
  'Más de 100 viajes',
  'Frontera México–Guatemala',
  'Grupos privados',
  'Traslados hacia el aeropuerto',
  'Viajes estudiantiles'
]
// Repetimos para crear loop infinito visualmente continuo
const looped = [...items, ...items]
</script>

<template>
  <div class="stats-strip">
    <div class="stats-marquee">
      <div v-for="(item, i) in looped" :key="i" class="stats-marquee-item">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.stats-strip {
  background: var(--charcoal);
  color: var(--ivory);
  padding: 0;
  overflow: hidden;
}

.stats-marquee {
  display: flex;
  gap: 4rem;
  padding: 1.5rem 0;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}

.stats-marquee-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.85;
}

.stats-marquee-item::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--terracotta);
  border-radius: 50%;
  flex-shrink: 0;
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
