<script setup>
import { ref, computed } from 'vue'
import { destinosLista, filtros } from '../data/destinos'

const activeFilter = ref('all')

const destinos = computed(() =>
  destinosLista.map((d) => ({
    ...d,
    hidden: activeFilter.value !== 'all' && d.region !== activeFilter.value
  }))
)

function filterLabel(f) {
  if (f === 'all') return 'Todos'
  if (f === 'Edo. Méx.') return 'Estado de México'
  return f
}
</script>

<template>
  <section id="destinos" class="destinos-list">
    <div class="section-inner">
      <div class="section-head fade-up">
        <span class="eyebrow">Destinos · Toda la República</span>
        <h2 class="section-title">
          Hemos llegado <span class="italic">a casi todos lados</span>.
        </h2>
        <p class="section-sub">
          Desde balnearios cercanos a Morelos hasta la frontera México-Belice. Si tu destino no
          aparece aquí, lo cotizamos.
        </p>
      </div>
      <div class="dest-filters fade-up">
        <button
          v-for="f in filtros"
          :key="f"
          class="dest-filter-btn"
          :class="{ active: activeFilter === f }"
          @click="activeFilter = f"
        >
          {{ filterLabel(f) }}
        </button>
      </div>
      <div class="dest-grid stagger-children">
        <div
          v-for="d in destinos"
          :key="d.name"
          class="dest-pill"
          :class="{ hidden: d.hidden }"
        >
          <span class="dest-pill-name">{{ d.name }}</span>
          <span class="dest-pill-state">{{ d.region }}</span>
        </div>
      </div>
      <div class="dest-note fade-up">
        <div class="ico">
          <svg style="width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.6">
            <use href="#i-map" />
          </svg>
        </div>
        <p>
          <strong>¿No ves tu destino?</strong>
          Cotizamos rutas personalizadas a cualquier punto del país. Escríbenos y te respondemos en
          menos de una hora.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.destinos-list {
  background: var(--charcoal);
  color: var(--ivory);
  padding: 110px 5vw;
  position: relative;
}

.destinos-list :deep(.section-title) { color: var(--ivory); }
.destinos-list :deep(.section-sub) { color: rgba(255, 255, 255, 0.7); }
.destinos-list :deep(.eyebrow) { color: var(--terracotta-soft); }

.dest-filters {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.dest-filter-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.75);
  padding: 0.5rem 1.2rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  border-radius: 2px;
}

.dest-filter-btn:hover {
  color: var(--ivory);
  border-color: rgba(255, 255, 255, 0.5);
}

.dest-filter-btn.active {
  background: var(--terracotta);
  border-color: var(--terracotta);
  color: var(--ivory);
}

.dest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.dest-pill {
  padding: 1.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.25s;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.dest-pill:hover {
  background: rgba(255, 255, 255, 0.04);
}

.dest-pill.hidden {
  display: none;
}

.dest-pill-name {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--ivory);
  letter-spacing: -0.01em;
}

.dest-pill-state {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.dest-note {
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.04);
  border-left: 2px solid var(--terracotta);
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.dest-note .ico {
  width: 36px;
  height: 36px;
  color: var(--terracotta-soft);
  flex-shrink: 0;
}

.dest-note p {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  font-size: 0.96rem;
}

.dest-note strong {
  color: var(--ivory);
  display: block;
  margin-bottom: 0.2rem;
  font-family: 'Fraunces', serif;
  font-weight: 500;
}
</style>
