<script setup>
import { ref, computed } from 'vue'
import { excursionesLista, filtrosExcursiones } from '../data/excursiones'

const activeFilter = ref('all')

// Carga dinámicamente todas las imágenes de la carpeta
const imagenes = import.meta.glob('../assets/imganes/*.jpg', { eager: true })

const excursiones = computed(() =>
  excursionesLista
    .filter(e => activeFilter.value === 'all' || e.region === activeFilter.value)
    .sort((a, b) => {
      if (!a.fecha) return 1
      if (!b.fecha) return -1
      return new Date(b.fecha) - new Date(a.fecha)
    })
)

function getImageUrl(filename) {
  if (!filename) return null
  const path = `../assets/imganes/${filename}`
  const img = imagenes[path]
  return img ? img.default : null
}

function filterLabel(f) {
  if (f === 'all') return 'Todas'
  return f
}

function formatCosto(costo) {
  if (!costo) return 'Consulta'
  return `$${costo}`
}
</script>

<template>
  <section id="excursiones" class="excursiones-section">
    <div class="section-inner">
      <div class="section-head fade-up">
        <span class="eyebrow">Publicaciones · Viajes Realizados</span>
        <h2 class="section-title">
          Momentos <span class="italic">que hemos vivido juntos</span>
        </h2>
        <p class="section-sub">
          Galería de viajes y excursiones realizadas. Revisa nuestras aventuras pasadas e inspírate para
          tu próximo viaje.
        </p>
      </div>

      <div class="filters fade-up">
        <button
          v-for="f in filtrosExcursiones"
          :key="f"
          class="filter-btn"
          :class="{ active: activeFilter === f }"
          @click="activeFilter = f"
        >
          {{ filterLabel(f) }}
        </button>
      </div>

      <div class="excursiones-grid stagger-children">
        <article
          v-for="excursion in excursiones"
          :key="excursion.id"
          class="excursion-card fade-up"
        >
          <!-- Imagen principal -->
          <div v-if="excursion.imagenes.length" class="card-img">
            <img
              :src="getImageUrl(excursion.imagenes[0])"
              :alt="excursion.titulo"
              loading="lazy"
            />
          </div>
          <div v-else class="card-img-placeholder">
            <span>{{ excursion.destino }}</span>
          </div>

          <!-- Contenido -->
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ excursion.titulo }}</h3>
              <span class="card-region">{{ excursion.region }}</span>
            </div>

            <p v-if="excursion.descripcion" class="card-desc">
              {{ excursion.descripcion }}
            </p>

            <!-- Info key -->
            <div class="card-info">
              <div v-if="excursion.fechaFormato" class="info-item">
                <span class="info-label">Fecha</span>
                <span class="info-value">{{ excursion.fechaFormato }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Costo p/p</span>
                <span class="info-value price">{{ formatCosto(excursion.costo) }}</span>
              </div>
            </div>

            <!-- Visitamos -->
            <div v-if="excursion.visitamos.length" class="card-section">
              <h4>Visitamos:</h4>
              <ul class="list">
                <li v-for="lugar in excursion.visitamos" :key="lugar">
                  {{ lugar }}
                </li>
              </ul>
            </div>

            <!-- Puntos de salida -->
            <div v-if="excursion.puntosSalida.length" class="card-section">
              <h4>Salidas desde:</h4>
              <div class="tags">
                <span v-for="punto in excursion.puntosSalida" :key="punto" class="tag">
                  {{ punto }}
                </span>
              </div>
            </div>

            <!-- Incluye -->
            <div v-if="excursion.incluye.length" class="card-section">
              <h4>Incluye:</h4>
              <ul class="list">
                <li v-for="item in excursion.incluye" :key="item">
                  ✓ {{ item }}
                </li>
              </ul>
            </div>

            <!-- Formas de pago -->
            <div v-if="excursion.formasPago && excursion.formasPago.length" class="card-section">
              <h4>Formas de pago:</h4>
              <ul class="list">
                <li v-for="forma in excursion.formasPago" :key="forma">
                  {{ forma }}
                </li>
              </ul>
            </div>

            <!-- Deposito info -->
            <div v-if="excursion.deposito" class="card-deposit">
              <span class="deposit-label">Aparta con</span>
              <span class="deposit-value">${{ excursion.deposito }}</span>
            </div>

            <!-- Botón contacto -->
            <a
              href="#"
              class="card-cta"
              @click.prevent="$emit('contact')"
            >
              Consultar próximas fechas
              <svg style="width: 16px; height: 16px; fill: currentColor;">
                <use href="#i-arrow-right" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.excursiones-section {
  background: var(--charcoal);
  color: var(--ivory);
  padding: 110px 5vw;
  position: relative;
}

.excursiones-section :deep(.section-title) { color: var(--ivory); }
.excursiones-section :deep(.section-sub) { color: rgba(255, 255, 255, 0.7); }
.excursiones-section :deep(.eyebrow) { color: var(--terracotta-soft); }

.filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.filter-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.75);
  padding: 0.6rem 1.3rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  border-radius: 2px;
}

.filter-btn:hover {
  color: var(--ivory);
  border-color: rgba(255, 255, 255, 0.5);
}

.filter-btn.active {
  background: var(--terracotta);
  border-color: var(--terracotta);
  color: var(--ivory);
}

.excursiones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.excursion-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.excursion-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
}

.card-img {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s;
  display: block;
}

.excursion-card:hover .card-img img {
  transform: scale(1.05);
}

.card-img-placeholder {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, var(--terracotta-soft) 0%, var(--terracotta) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ivory);
  font-weight: 500;
  font-size: 1.1rem;
}

.card-content {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1;
}

.card-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
}

.card-title {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--ivory);
  line-height: 1.2;
  margin: 0;
}

.card-region {
  background: rgba(var(--terracotta-rgb), 0.15);
  color: var(--terracotta-soft);
  padding: 0.4rem 0.8rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: 2px;
  white-space: nowrap;
}

.card-desc {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.card-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 2px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.info-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  color: var(--ivory);
  font-weight: 500;
}

.info-value.price {
  color: var(--terracotta-soft);
  font-size: 1.2rem;
  font-weight: 600;
}

.card-section {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.card-section h4 {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--ivory);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.list li {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(var(--terracotta-rgb), 0.1);
  color: var(--terracotta-soft);
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 2px;
  border: 1px solid rgba(var(--terracotta-rgb), 0.2);
}

.card-deposit {
  background: rgba(var(--terracotta-rgb), 0.08);
  border-left: 2px solid var(--terracotta);
  padding: 0.8rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.deposit-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.deposit-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--terracotta-soft);
}

.card-cta {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: var(--terracotta);
  color: var(--ivory);
  padding: 0.8rem 1.2rem;
  border-radius: 2px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.card-cta:hover {
  background: var(--terracotta-dark);
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .excursiones-grid {
    grid-template-columns: 1fr;
  }

  .card-info {
    grid-template-columns: 1fr;
  }
}
</style>
