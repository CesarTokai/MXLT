<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { galeria } from '../data/destinos'

const { open: openLightbox } = inject('lightbox')

const trackRef = ref(null)
const cur = ref(0)
let intervalId = null

function perView() {
  if (typeof window === 'undefined') return 3
  return window.innerWidth <= 580 ? 1 : window.innerWidth <= 900 ? 2 : 3
}
function maxIdx() {
  return Math.max(0, galeria.length - perView())
}
function goTo(idx) {
  cur.value = Math.max(0, Math.min(idx, maxIdx()))
  const card = trackRef.value?.firstElementChild
  if (!card) return
  const w = card.offsetWidth + 16
  trackRef.value.style.transform = `translateX(-${cur.value * w}px)`
}
function prev() { goTo(cur.value - 1) }
function next() { goTo(cur.value + 1) }

function onResize() { goTo(cur.value) }

function openImg(i) {
  const images = galeria.map((d) => ({
    src: `${d.img}?w=1400&q=90`,
    cap: `${d.name}, ${d.region}`
  }))
  openLightbox({ images, idx: i })
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  intervalId = setInterval(() => {
    goTo(cur.value >= maxIdx() ? 0 : cur.value + 1)
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section class="gallery-section">
    <div class="gallery-head fade-up">
      <div>
        <span class="eyebrow">Galería de destinos</span>
        <h2 class="section-title" style="margin-top: 1rem">
          Lugares <span class="italic">para recordar</span>
        </h2>
      </div>
      <div class="gallery-controls">
        <button @click="prev" aria-label="Anterior">
          <svg class="icon" style="width: 18px; height: 18px"><use href="#i-arrow-left" /></svg>
        </button>
        <button @click="next" aria-label="Siguiente">
          <svg class="icon" style="width: 18px; height: 18px"><use href="#i-arrow-right" /></svg>
        </button>
      </div>
    </div>
    <div class="carousel-wrapper">
      <div class="carousel-track" ref="trackRef">
        <div
          v-for="(dest, i) in galeria"
          :key="dest.name"
          class="dest-card"
          @click="openImg(i)"
        >
          <img :src="`${dest.img}?w=700&q=85`" :alt="dest.name" />
          <div class="dest-card-zoom">
            <svg class="icon" style="width: 16px; height: 16px"><use href="#i-search" /></svg>
          </div>
          <div class="dest-card-overlay">
            <div class="dest-card-region">{{ dest.region }}</div>
            <div class="dest-card-name">{{ dest.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  background: var(--ivory);
  padding-bottom: 110px;
}

.gallery-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 5vw;
}

.gallery-controls {
  display: flex;
  gap: 0.5rem;
}

.gallery-controls button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--ivory);
  border: 1px solid var(--line);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--charcoal);
  transition: all 0.2s;
}

.gallery-controls button:hover {
  background: var(--terracotta);
  color: var(--ivory);
  border-color: var(--terracotta);
}

.carousel-wrapper {
  overflow: hidden;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 5vw;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dest-card {
  flex: 0 0 calc((100% - 2rem) / 3);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 3/4;
  box-shadow: var(--shadow);
  cursor: pointer;
  background: var(--sand);
}

.dest-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}

.dest-card:hover img {
  transform: scale(1.05);
}

.dest-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(31, 24, 21, 0.75) 0%, rgba(31, 24, 21, 0.1) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.8rem 1.4rem;
}

.dest-card-region {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.dest-card-name {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  color: var(--ivory);
  line-height: 1.1;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.dest-card-zoom {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--ivory);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--charcoal);
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.2s, transform 0.2s;
}

.dest-card:hover .dest-card-zoom {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 900px) {
  .dest-card { flex: 0 0 calc((100% - 1rem) / 2); }
}

@media (max-width: 580px) {
  .dest-card { flex: 0 0 80%; }
}
</style>
