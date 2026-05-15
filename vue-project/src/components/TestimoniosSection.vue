<script setup>
import { testimonios } from '../data/testimonios'
</script>

<template>
  <section class="testimonios">
    <div class="testimonios-inner">
      <div class="section-head fade-up" style="text-align: center; max-width: none">
        <span class="eyebrow" style="display: inline-block">Lo que dicen los viajeros</span>
        <h2 class="section-title">Experiencias <span class="italic">reales</span>.</h2>
      </div>
      <div class="testimonios-grid stagger-children">
        <article v-for="t in testimonios" :key="t.name" class="testimonio-card">
          <div class="testimonio-mark">"</div>
          <div class="testimonio-stars">★★★★★</div>
          <p class="testimonio-quote">{{ t.quote }}</p>
          <div class="testimonio-author">
            <div class="testimonio-avatar">{{ t.initial }}</div>
            <div>
              <div class="testimonio-name">{{ t.name }}</div>
              <div class="testimonio-trip">{{ t.trip }}</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonios {
  background: var(--sand-light);
  padding: 110px 5vw;
}

.testimonios-inner {
  max-width: 1240px;
  margin: 0 auto;
}

.testimonios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
  margin-top: 3rem;
}

.testimonio-card {
  background: var(--ivory);
  padding: 2.2rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
}

.testimonio-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.testimonio-mark {
  font-family: 'Fraunces', serif;
  font-size: 4rem;
  line-height: 1;
  color: var(--terracotta);
  margin-bottom: 0.5rem;
  font-weight: 400;
  letter-spacing: -0.05em;
}

.testimonio-quote {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--charcoal);
  flex: 1;
  font-weight: 400;
  margin-bottom: 1.6rem;
}

.testimonio-stars {
  color: var(--terracotta);
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.8rem;
}

.testimonio-author {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
}

.testimonio-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--terracotta);
  color: var(--ivory);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 500;
  font-size: 1rem;
  flex-shrink: 0;
}

.testimonio-name {
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--charcoal);
}

.testimonio-trip {
  font-size: 0.78rem;
  color: var(--muted);
  letter-spacing: 0.04em;
}

@media (max-width: 900px) {
  .testimonios-grid { grid-template-columns: 1fr; }
}
</style>
