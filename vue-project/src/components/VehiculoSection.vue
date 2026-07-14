<script setup>
import { inject } from 'vue'
const { open: openLightbox } = inject('lightbox')
import urvan1 from '../assets/imagenes/urvan1.jpg'
import urvan2 from '../assets/imagenes/urvan2.jpg'
import urvan3 from '../assets/imagenes/urvan3.jpg'

const galleryImgs = [
  {
    src: urvan3,
    lb: urvan3,
    alt: 'Nissan Urvan NP300 - Vista frontal',
    cap: 'Nissan Urvan NP300 - Vista frontal'
  },
  {
    src: urvan2,
    lb: urvan2,
    alt: 'Nissan Urvan NP300 - Interior',
    cap: 'Nissan Urvan NP300 - Interior'
  },
  {
    src: urvan1,
    lb: urvan1,
    alt: 'Nissan Urvan NP300 - Lateral',
    cap: 'Nissan Urvan NP300 - Lateral'
  }
]

const specs = [
  { icon: 'i-users', title: '14 pasajeros', desc: '+ chofer profesional' },
  { icon: 'i-snow', title: 'Aire acondicionado', desc: 'Frontal y trasero' },
  { icon: 'i-music', title: 'Audio Bluetooth', desc: 'Tu música, tu playlist' },
  { icon: 'i-luggage', title: 'Cajuela amplia', desc: 'Maletas y equipaje' }
]

function openImg(idx) {
  openLightbox({
    images: galleryImgs.map((g) => ({ src: g.lb, cap: g.cap })),
    idx
  })
}
</script>

<template>
  <section id="vehiculo" class="vehiculo">
    <div class="vehiculo-grid">
      <div class="vehiculo-gallery fade-up">
        <img
          v-for="(img, i) in galleryImgs"
          :key="i"
          :src="img.src"
          :alt="img.alt"
          loading="lazy"
          @click="openImg(i)"
        />
        <span class="vehiculo-badge">Nuestra unidad</span>
      </div>
      <div class="fade-up">
        <span class="eyebrow">El vehículo</span>
        <h2 class="section-title" style="margin-top: 1rem">
          Nissan Urvan <span class="italic">NP300</span>
        </h2>
        <p class="section-sub">
          La van más confiable de México. Espaciosa, cómoda y equipada para que el viaje sea tan
          agradable como el destino.
        </p>
        <div class="vehiculo-specs">
          <div v-for="spec in specs" :key="spec.title" class="vehiculo-spec">
            <div class="ico"><svg><use :href="`#${spec.icon}`" /></svg></div>
            <div>
              <strong>{{ spec.title }}</strong>
              <small>{{ spec.desc }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vehiculo {
  background: var(--cream);
  position: relative;
}

.vehiculo-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 5rem;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
}

.vehiculo-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.8rem;
  height: 540px;
  position: relative;
}

.vehiculo-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: var(--shadow);
  transition: transform 0.5s;
  cursor: pointer;
  background: var(--sand);
}

.vehiculo-gallery img:hover {
  transform: scale(1.02);
}

.vehiculo-gallery img:nth-child(1) {
  grid-row: 1/3;
}

.vehiculo-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--ivory);
  padding: 0.5rem 0.9rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--terracotta);
  border-radius: 2px;
  box-shadow: var(--shadow-sm);
}

.vehiculo-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  margin-top: 2rem;
  border-top: 1px solid var(--line);
}

.vehiculo-spec {
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vehiculo-spec:nth-child(odd) {
  padding-right: 1.2rem;
  border-right: 1px solid var(--line);
}

.vehiculo-spec:nth-child(even) {
  padding-left: 1.2rem;
}

.vehiculo-spec .ico {
  width: 28px;
  height: 28px;
  color: var(--terracotta);
  flex-shrink: 0;
}

.vehiculo-spec .ico svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.4;
  stroke: currentColor;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.vehiculo-spec strong {
  display: block;
  font-family: 'Fraunces', serif;
  font-size: 1.05rem;
  color: var(--charcoal);
  font-weight: 500;
}

.vehiculo-spec small {
  display: block;
  font-size: 0.78rem;
  color: var(--muted);
  margin-top: 2px;
}

@media (max-width: 960px) {
  .vehiculo-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .vehiculo-gallery {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .vehiculo-specs {
    grid-template-columns: 1fr;
  }
  .vehiculo-spec:nth-child(odd) {
    padding-right: 0;
    border-right: none;
  }
  .vehiculo-spec:nth-child(even) {
    padding-left: 0;
  }
}
</style>
