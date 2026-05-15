<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
const { state, close, nav } = inject('lightbox')

function onKey(e) {
  if (!state.value.open) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') nav(-1)
  if (e.key === 'ArrowRight') nav(1)
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div
    class="lightbox"
    :class="{ open: state.open }"
    role="dialog"
    @click.self="close"
  >
    <button class="lightbox-close" @click="close" aria-label="Cerrar">
      <svg class="icon" style="width: 18px; height: 18px"><use href="#i-x" /></svg>
    </button>
    <img :src="state.src" alt="" />
    <div class="lightbox-caption">{{ state.cap }}</div>
    <div class="lightbox-nav">
      <button class="lightbox-nav-btn" @click="nav(-1)" aria-label="Anterior">
        <svg class="icon" style="width: 18px; height: 18px"><use href="#i-arrow-left" /></svg>
      </button>
      <button class="lightbox-nav-btn" @click="nav(1)" aria-label="Siguiente">
        <svg class="icon" style="width: 18px; height: 18px"><use href="#i-arrow-right" /></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 12, 10, 0.95);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
}

.lightbox.open {
  display: flex;
  animation: lbIn 0.25s ease;
}

@keyframes lbIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox img {
  max-width: 90vw;
  max-height: 78vh;
  object-fit: contain;
}

.lightbox-caption {
  color: var(--ivory);
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.1rem;
}

.lightbox-close,
.lightbox-nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--ivory);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}

.lightbox-close:hover,
.lightbox-nav-btn:hover {
  background: var(--terracotta);
}

.lightbox-nav {
  display: flex;
  gap: 1rem;
}
</style>
