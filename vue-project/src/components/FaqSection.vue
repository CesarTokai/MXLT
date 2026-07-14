<script setup>
import { ref, inject } from 'vue'
import { faqs } from '../data/faqs'

const config = inject('config')
const openIdx = ref(null)

function toggle(i) {
  openIdx.value = openIdx.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="faq">
    <div class="faq-inner">
      <aside class="faq-aside fade-up">
        <span class="eyebrow">Preguntas frecuentes</span>
        <h2 class="section-title" style="margin-top: 1rem">
          Lo que más nos<br /><span class="italic">preguntan</span>.
        </h2>
        <p class="section-sub" style="margin-top: 1.4rem">¿Tu duda no está aquí? Escríbenos.</p>
        <a
          :href="`https://wa.me/${config.whatsapp}`"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
          style="margin-top: 1.6rem"
        >
          <svg class="icon" style="width: 16px; height: 16px"><use href="#i-wa" /></svg>
          Preguntar ahora
        </a>
      </aside>
      <div class="faq-list fade-up">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openIdx === i }"
        >
          <div class="faq-question" @click="toggle(i)">
            <span class="faq-q-text">{{ item.q }}</span>
            <span class="faq-chevron">
              <svg class="icon" style="width: 100%; height: 100%"><use href="#i-plus" /></svg>
            </span>
          </div>
          <div class="faq-answer">
            <div class="faq-answer-inner">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: var(--ivory);
  padding: 110px 5vw;
}

.faq-inner {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  align-items: flex-start;
}

.faq-aside {
  position: sticky;
  top: 100px;
}

.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-top: 1px solid var(--line);
}

.faq-item:last-child {
  border-bottom: 1px solid var(--line);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 0;
  cursor: pointer;
  gap: 1rem;
  transition: color 0.2s;
}

.faq-question:hover {
  color: var(--terracotta);
}

.faq-q-text {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.faq-chevron {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  color: var(--terracotta);
  transition: transform 0.3s;
}

.faq-item.open .faq-chevron {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.faq-item.open .faq-answer {
  max-height: 400px;
}

.faq-answer-inner {
  padding: 0 0 1.6rem;
  color: var(--charcoal-soft);
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 560px;
}

@media (max-width: 860px) {
  .faq-inner { grid-template-columns: 1fr; gap: 2rem; }
  .faq-aside { position: static; }
}
</style>
