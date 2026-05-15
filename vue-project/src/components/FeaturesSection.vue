<script setup>
const features = [
  {
    icon: 'i-shield',
    title: 'Unidades aseguradas',
    desc: 'Seguro vehicular vigente y chofer profesional con licencia federal.'
  },
  {
    icon: 'i-users',
    title: 'Grupos pequeños',
    desc: 'Máximo 14 personas. Atención personalizada de principio a fin.'
  },
  {
    icon: 'i-phone',
    title: 'Respuesta rápida',
    desc: 'Cotizamos en menos de una hora por WhatsApp, sin compromiso.'
  },
  {
    icon: 'i-check',
    title: 'Sin cargos ocultos',
    desc: 'Combustible, casetas y viáticos del chofer incluidos en la tarifa.'
  }
]
</script>

<template>
  <section class="features">
    <div class="section-inner">
      <div class="section-head fade-up">
        <span class="eyebrow">Por qué elegirnos</span>
        <h2 class="section-title">
          Comodidad seria.<br /><span class="italic">Sin letras chiquitas.</span>
        </h2>
      </div>
      <div class="features-grid stagger-children">
        <div v-for="f in features" :key="f.title" class="feature-item">
          <div class="feature-icon"><svg><use :href="`#${f.icon}`" /></svg></div>
          <h4 class="feature-title">{{ f.title }}</h4>
          <p class="feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  background: var(--cream);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
}

.feature-item {
  padding: 2.4rem 1.6rem;
  border-bottom: 1px solid var(--line);
  border-right: 1px solid var(--line);
}

.feature-item:nth-child(4n) {
  border-right: none;
}

.feature-icon {
  width: 36px;
  height: 36px;
  color: var(--terracotta);
  margin-bottom: 1.4rem;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.6;
  stroke: currentColor;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.feature-title {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.15rem;
  color: var(--charcoal);
  margin-bottom: 0.4rem;
}

.feature-desc {
  font-size: 0.86rem;
  color: var(--charcoal-soft);
  line-height: 1.6;
}

@media (max-width: 960px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .feature-item:nth-child(2n) { border-right: none; }
  .feature-item:nth-child(4n) { border-right: 1px solid var(--line); }
}

@media (max-width: 560px) {
  .features-grid { grid-template-columns: 1fr; }
  .feature-item { border-right: none !important; }
}
</style>
