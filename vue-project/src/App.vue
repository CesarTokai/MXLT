<script setup>
import { ref, provide } from 'vue'
import { useReveal } from './composables/useReveal'

import SvgSprite from './components/icons/SvgSprite.vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import StatsMarquee from './components/StatsMarquee.vue'
import ServicesSection from './components/ServicesSection.vue'
import VehiculoSection from './components/VehiculoSection.vue'
import GallerySection from './components/GallerySection.vue'
import LightboxModal from './components/LightboxModal.vue'
import CountersSection from './components/CountersSection.vue'
import DestinosSection from './components/DestinosSection.vue'
import ExcursionesSection from './components/ExcursionesSection.vue'
import MapSection from './components/MapSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import CotizadorSection from './components/CotizadorSection.vue'
import TestimoniosSection from './components/TestimoniosSection.vue'
import FaqSection from './components/FaqSection.vue'
import CtaSection from './components/CtaSection.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsappFloat from './components/WhatsappFloat.vue'

// Configuración global compartida entre componentes
const config = {
  whatsapp: '527341261085',
  phone1: '7341261085',
  phone2: '7771310805',
  facebook: 'https://www.facebook.com/people/M%C3%A9xico-lindo-tours-Morelos/100063777866596/'
}
provide('config', config)

// Lightbox global controlado por evento
const lightbox = ref({ open: false, src: '', cap: '', images: [], idx: 0 })

function openLightbox({ images, idx }) {
  lightbox.value = { open: true, images, idx, src: images[idx].src, cap: images[idx].cap }
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightbox.value.open = false
  document.body.style.overflow = ''
}
function navLightbox(dir) {
  const len = lightbox.value.images.length
  const newIdx = (lightbox.value.idx + dir + len) % len
  lightbox.value.idx = newIdx
  lightbox.value.src = lightbox.value.images[newIdx].src
  lightbox.value.cap = lightbox.value.images[newIdx].cap
}

provide('lightbox', { open: openLightbox, close: closeLightbox, nav: navLightbox, state: lightbox })

// Activar animaciones de scroll
useReveal()

// Barra de progreso al hacer scroll
function onScroll() {
  const el = document.documentElement
  const p = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
  const bar = document.getElementById('progress-bar')
  if (bar) bar.style.width = p + '%'
}
window.addEventListener('scroll', onScroll, { passive: true })
</script>

<template>
  <SvgSprite />
  <div id="progress-bar"></div>

  <AppNav />
  <HeroSection />
  <StatsMarquee />
  <ServicesSection />
  <VehiculoSection />
  <GallerySection />
  <CountersSection />
  <DestinosSection />
  <ExcursionesSection />
  <MapSection />
  <FeaturesSection />
  <CotizadorSection />
  <TestimoniosSection />
  <FaqSection />
  <CtaSection />
  <AppFooter />
  <WhatsappFloat />

  <LightboxModal />
</template>
