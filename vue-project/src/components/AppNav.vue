<script setup>
import { inject } from 'vue'
const config = inject('config')
</script>

<template>
  <nav>
    <div class="nav-logo">
      <span class="brand">México Lindo Tours</span>
      <span class="sub">Morelos · Agencia</span>
    </div>
    <ul class="nav-links">
      <li><a href="#servicios">Servicios</a></li>
      <li><a href="#vehiculo">Unidad</a></li>
      <li><a href="#destinos">Destinos</a></li>
      <li><a href="#cotizador">Cotizar</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <a href="#cotizador" class="nav-cta">Reservar</a>
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

@media (max-width: 860px) {
  .nav-links {
    display: none;
  }
}
</style>
