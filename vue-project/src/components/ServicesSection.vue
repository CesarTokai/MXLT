<script setup>
import { servicios } from '../data/servicios'

function scrollToCotizador() {
  document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="servicios" class="services">
    <div class="section-inner">
      <div class="section-head fade-up">
        <span class="eyebrow">Nuestros servicios</span>
        <h2 class="section-title">
          Cuatro formas de viajar.<br />
          <span class="italic">Una sola promesa.</span>
        </h2>
        <p class="section-sub">
          Adaptamos cada viaje al ritmo de tu grupo. Sin paquetes rígidos, sin sorpresas.
        </p>
      </div>
      <div class="services-grid stagger-children">
        <div
          v-for="svc in servicios"
          :key="svc.num"
          class="service-card"
          @click="scrollToCotizador"
        >
          <div class="service-card-num">{{ svc.num }}</div>
          <div class="service-icon"><svg><use :href="`#${svc.icon}`" /></svg></div>
          <h3 class="service-name">{{ svc.name }}</h3>
          <p class="service-desc">{{ svc.desc }}</p>
          <span class="service-link">
            Cotizar
            <svg class="icon" style="width: 12px"><use href="#i-arrow-right" /></svg>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--ivory);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.service-card {
  background: var(--ivory);
  padding: 2.4rem 1.8rem;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
}

.service-card:hover {
  background: var(--cream);
}

.service-card-num {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 0.85rem;
  color: var(--terracotta);
  margin-bottom: 1.6rem;
  opacity: 0.6;
}

.service-icon {
  width: 44px;
  height: 44px;
  margin-bottom: 1.4rem;
  color: var(--terracotta);
  transition: transform 0.3s;
}

.service-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.4;
  stroke: currentColor;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
}

.service-name {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 0.6rem;
  color: var(--charcoal);
  letter-spacing: -0.01em;
}

.service-desc {
  font-size: 0.88rem;
  color: var(--charcoal-soft);
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.service-link {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--terracotta);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: gap 0.2s;
}

.service-card:hover .service-link {
  gap: 0.7rem;
}

@media (max-width: 960px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
