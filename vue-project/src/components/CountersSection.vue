<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stats = [
  { target: 40, suffix: '+', label: 'Estados recorridos' },
  { target: 100, suffix: '+', label: 'Viajes realizados' },
  { target: 14, suffix: '', label: 'Pasajeros · unidad' },
  { target: 500, suffix: '%', label: 'Recomendados' }
]

// Estado reactivo de cada contador
const counts = ref(stats.map(() => 0))
// Refs a los elementos para observar
const refsArr = ref([])
function setRef(el, idx) {
  if (el) refsArr.value[idx] = el
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const idx = Number(entry.target.dataset.idx)
        const target = stats[idx].target
        const dur = 1800
        const step = Math.max(1, Math.round(target / (dur / 16)))
        const timer = setInterval(() => {
          counts.value[idx] = Math.min(counts.value[idx] + step, target)
          if (counts.value[idx] >= target) clearInterval(timer)
        }, 16)
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.5 }
  )
  refsArr.value.forEach((el) => el && observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="counters">
    <div class="counters-inner">
      <div
        v-for="(s, i) in stats"
        :key="i"
        class="counter-item"
        :ref="(el) => setRef(el, i)"
        :data-idx="i"
      >
        <div class="counter-num">
          <span>{{ counts[i] }}</span><span v-if="s.suffix" style="font-size: 0.6em">{{ s.suffix }}</span>
        </div>
        <div class="counter-label">{{ s.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.counters {
  background: var(--cream);
  padding: 70px 5vw;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.counters-inner {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.counter-item {
  text-align: center;
  padding: 0 1rem;
  position: relative;
}

.counter-item + .counter-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 1px;
  background: var(--line);
}

.counter-num {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: clamp(2.6rem, 4.5vw, 3.6rem);
  color: var(--terracotta);
  line-height: 1;
  font-weight: 500;
}

.counter-label {
  color: var(--charcoal-soft);
  font-weight: 500;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-top: 0.6rem;
}

@media (max-width: 720px) {
  .counters-inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 0;
  }
  .counter-item + .counter-item::before {
    display: none;
  }
}
</style>
