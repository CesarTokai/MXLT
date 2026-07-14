<script setup>
import { ref } from 'vue'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#vehiculo', label: 'Unidad' },
  { href: '#destinos', label: 'Destinos' },
  { href: '#cotizador', label: 'Cotizar' },
  { href: '#faq', label: 'FAQ' }
]

const menuOpen = ref(false)
</script>

<template>
  <nav>
    <div class="nav-logo">
      <span class="brand">México Lindo Tours</span>
      <span class="sub">Morelos · Agencia</span>
    </div>
    <ul class="nav-links">
      <li v-for="l in links" :key="l.href"><a :href="l.href">{{ l.label }}</a></li>
    </ul>
    <div class="nav-right">
      <a href="#cotizador" class="nav-cta">Reservar</a>
      <button
        class="nav-burger"
        :aria-expanded="menuOpen"
        aria-label="Abrir menú"
        @click="menuOpen = !menuOpen"
      >
        <svg class="icon" style="width: 20px; height: 20px">
          <use :href="menuOpen ? '#i-x' : '#i-menu'" />
        </svg>
      </button>
    </div>
    <ul class="nav-mobile" :class="{ open: menuOpen }">
      <li v-for="l in links" :key="l.href">
        <a :href="l.href" @click="menuOpen = false">{{ l.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 2px;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5vw;
  height: 72px;
  background: rgba(251, 248, 241, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.nav-logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.nav-logo .brand {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--terracotta);
  letter-spacing: -0.01em;
}

.nav-logo .sub {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 4px;
}

.nav-links {
  display: flex;
  gap: 2.2rem;
  list-style: none;
}

.nav-links a {
  color: var(--charcoal-soft);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.88rem;
  transition: color 0.2s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--terracotta);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s;
}

.nav-links a:hover {
  color: var(--terracotta);
}

.nav-links a:hover::after {
  transform: scaleX(1);
}

.nav-cta {
  background: var(--charcoal);
  color: var(--ivory);
  font-weight: 500;
  padding: 0.65rem 1.2rem;
  border-radius: 2px;
  font-size: 0.82rem;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.2s;
}

.nav-cta:hover {
  background: var(--terracotta);
  transform: translateY(-1px);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.nav-burger {
  display: none;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 2px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--charcoal);
}

.nav-burger .icon {
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

.nav-mobile {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--ivory);
  border-bottom: 1px solid var(--line);
  list-style: none;
  flex-direction: column;
  padding: 0.6rem 5vw 1.2rem;
  box-shadow: var(--shadow);
}

.nav-mobile li a {
  display: block;
  padding: 0.9rem 0;
  color: var(--charcoal-soft);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  border-bottom: 1px solid var(--line);
}

.nav-mobile li:last-child a {
  border-bottom: none;
}

.nav-mobile li a:hover {
  color: var(--terracotta);
}

@media (max-width: 860px) {
  .nav-links {
    display: none;
  }
  .nav-burger {
    display: flex;
  }
  .nav-mobile.open {
    display: flex;
  }
}
</style>
