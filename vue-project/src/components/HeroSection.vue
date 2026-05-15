<script setup>
// Imagen del hero — Taxco, Guerrero
const heroImage = 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=900&q=85'
</script>

<template>
  <section class="hero" id="inicio">
    <div class="hero-bg"></div>
    <div class="hero-inner">
      <div class="hero-content fade-up">
        <span class="eyebrow">Agencia de viajes · Morelos</span>
        <h1 class="hero-title">
          Recorre México<br />
          con quien <span class="serif italic">lo conoce</span><br />
          de memoria.
        </h1>
        <p class="hero-sub">
          Excursiones, traslados privados y viajes a toda la República. Grupos pequeños, atención
          artesanal, experiencias reales — no de catálogo.
        </p>
        <div class="hero-btns">
          <a href="#cotizador" class="btn btn-primary">
            Cotizar mi viaje
            <svg class="icon" style="width: 14px; height: 14px"><use href="#i-arrow-right" /></svg>
          </a>
          <a href="#destinos" class="btn btn-secondary">Ver destinos</a>
        </div>
      </div>
      <div class="hero-visual fade-up">
        <div class="hero-image-wrap">
          <div class="hero-image-frame"></div>
          <img :src="heroImage" alt="Taxco, Guerrero" />
        </div>
        <div class="hero-badge">
          <div class="hero-badge-num">04</div>
          <div class="hero-badge-text">
            <strong>Años de experiencia</strong>
            recorriendo cada rincón del país
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  background: var(--ivory);
  display: flex;
  align-items: center;
  padding: 120px 5vw 80px;
  position: relative;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-bg::before {
  content: '';
  position: absolute;
  top: 20%;
  right: -10%;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(177, 88, 56, 0.07) 0%, transparent 70%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.hero-content > .eyebrow {
  display: inline-block;
  margin-bottom: 1.2rem;
}

.hero-title {
  font-family: 'Fraunces', serif;
  font-weight: 400;
  color: var(--charcoal);
  font-size: clamp(2.6rem, 5.5vw, 4.8rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin-bottom: 1.4rem;
}

.hero-title .italic {
  color: var(--terracotta);
  font-weight: 400;
}

.hero-sub {
  color: var(--charcoal-soft);
  font-size: 1.08rem;
  font-weight: 400;
  line-height: 1.65;
  max-width: 460px;
  margin-bottom: 2.4rem;
}

.hero-btns {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.hero-visual {
  position: relative;
}

.hero-image-wrap {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.hero-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image-frame {
  position: absolute;
  top: -16px;
  left: -16px;
  bottom: 16px;
  right: 16px;
  border: 1px solid var(--terracotta);
  border-radius: 4px;
  z-index: -1;
}

.hero-badge {
  position: absolute;
  bottom: 2rem;
  left: -2rem;
  background: var(--ivory);
  padding: 1.2rem 1.4rem;
  box-shadow: var(--shadow);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 280px;
}

.hero-badge-num {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 2.8rem;
  color: var(--terracotta);
  line-height: 1;
  font-weight: 500;
}

.hero-badge-text {
  font-size: 0.78rem;
  color: var(--charcoal-soft);
  line-height: 1.4;
  font-weight: 500;
}

.hero-badge-text strong {
  display: block;
  color: var(--charcoal);
  font-weight: 700;
  font-size: 0.92rem;
  margin-bottom: 2px;
}

@media (max-width: 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-badge {
    left: 1rem;
    bottom: 1rem;
  }
}
</style>
