<script setup>
import { inject } from 'vue'
const config = inject('config')
</script>

<template>
  <section class="cta">
    <div class="cta-inner">
      <span class="eyebrow">Empieza hoy</span>
      <h2 class="cta-title">
        Tu próximo viaje<br /><span class="italic">empieza con un mensaje</span>.
      </h2>
      <p class="cta-sub">
        Grupos privados de hasta 14 pasajeros. Cotización sin compromiso en minutos.
      </p>
      <div class="cta-btns">
        <a :href="`https://wa.me/${config.whatsapp}`" target="_blank" class="btn btn-primary">
          <svg class="icon" style="width: 16px; height: 16px"><use href="#i-wa" /></svg>
          Escribir por WhatsApp
        </a>
        <a :href="`tel:${config.phone1}`" class="btn btn-secondary">
          <svg class="icon" style="width: 14px; height: 14px"><use href="#i-phone" /></svg>
          {{ config.phone1.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: var(--terracotta);
  color: var(--ivory);
  padding: 110px 5vw;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 740px;
  margin: 0 auto;
}

.cta :deep(.eyebrow) {
  color: var(--sand);
  display: inline-block;
  margin-bottom: 1.2rem;
}

.cta-title {
  font-family: 'Fraunces', serif;
  font-weight: 400;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.2rem;
}

.cta-title .italic {
  color: var(--charcoal);
}

.cta-sub {
  font-size: 1.05rem;
  opacity: 0.9;
  margin-bottom: 2.4rem;
  line-height: 1.6;
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btns {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta :deep(.btn-primary) {
  background: var(--charcoal);
}

.cta :deep(.btn-primary):hover {
  background: var(--ivory);
  color: var(--charcoal);
}

.cta :deep(.btn-secondary) {
  color: var(--ivory);
  border-color: var(--ivory);
}

.cta :deep(.btn-secondary):hover {
  background: var(--ivory);
  color: var(--terracotta);
}
</style>
