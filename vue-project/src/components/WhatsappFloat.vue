<script setup>
import { inject } from 'vue'
const config = inject('config')
</script>

<template>
  <a
    :href="`https://wa.me/${config.whatsapp}`"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-float"
    title="WhatsApp"
  >
    <svg class="icon"><use href="#i-wa" /></svg>
  </a>
</template>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 200;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--charcoal);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ivory);
  text-decoration: none;
  box-shadow: var(--shadow-lg);
  transition: all 0.25s;
}

.whatsapp-float:hover {
  background: var(--terracotta);
  transform: scale(1.08);
}

.whatsapp-float .icon {
  width: 26px;
  height: 26px;
}
</style>
