<script setup>
import { inject } from 'vue'
const config = inject('config')
</script>

<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">México Lindo Tours</div>
          <div class="footer-brand-sub">Morelos · Agencia de viajes</div>
          <p class="footer-tagline">
            Tu agencia de confianza para recorrer México. Grupos pequeños, atención personalizada y
            experiencias reales.
          </p>
        </div>
        <div>
          <div class="footer-heading">Servicios</div>
          <ul class="footer-list">
            <li><a href="#servicios">Excursiones</a></li>
            <li><a href="#servicios">Traslados aeropuerto</a></li>
            <li><a href="#servicios">Viaje semanal CDMX</a></li>
            <li><a href="#servicios">Eventos sociales</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-heading">Navegación</div>
          <ul class="footer-list">
            <li><a href="#vehiculo">Nuestra unidad</a></li>
            <li><a href="#destinos">Destinos</a></li>
            <li><a href="#cotizador">Cotizar</a></li>
            <li><a href="#faq">Preguntas frecuentes</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-heading">Contacto</div>
          <div class="footer-contact">
            <span class="ico">
              <svg style="width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.6">
                <use href="#i-phone" />
              </svg>
            </span>
            <a :href="`tel:${config.phone1}`">734 126 1085</a>
          </div>
          <div class="footer-contact">
            <span class="ico">
              <svg style="width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.6">
                <use href="#i-phone" />
              </svg>
            </span>
            <a :href="`tel:${config.phone2}`">777 131 0805</a>
          </div>
          <div class="footer-contact">
            <span class="ico">
              <svg style="width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.6">
                <use href="#i-pin" />
              </svg>
            </span>
            Morelos, México
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">
          © {{ new Date().getFullYear() }} México Lindo Tours Morelos · Todos los derechos reservados
        </div>
        <div class="footer-social">
          <a :href="`https://wa.me/${config.whatsapp}`" target="_blank" title="WhatsApp">
            <span class="ico"><svg style="width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.6"><use href="#i-wa" /></svg></span>
          </a>
          <a :href="config.facebook" target="_blank" title="Facebook">
            <span class="ico"><svg style="width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.6"><use href="#i-fb" /></svg></span>
          </a>
          <a href="mailto:contacto@mexicolindotours.mx" title="Email">
            <span class="ico"><svg style="width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.6"><use href="#i-mail" /></svg></span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--charcoal);
  color: rgba(255, 255, 255, 0.6);
  padding: 70px 5vw 40px;
}

.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 2rem;
}

.footer-brand-name {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.6rem;
  color: var(--terracotta-soft);
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.footer-brand-sub {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

.footer-tagline {
  font-size: 0.88rem;
  line-height: 1.7;
  max-width: 320px;
}

.footer-heading {
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ivory);
  margin-bottom: 1.2rem;
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-list a {
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 400;
  transition: color 0.2s;
}

.footer-list a:hover {
  color: var(--terracotta-soft);
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.86rem;
  margin-bottom: 0.65rem;
}

.footer-contact .ico {
  width: 16px;
  height: 16px;
  color: var(--terracotta-soft);
  flex-shrink: 0;
}

.footer-contact a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-contact a:hover {
  color: var(--ivory);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
}

.footer-copy {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
}

.footer-social {
  display: flex;
  gap: 0.6rem;
}

.footer-social a {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.2s;
  border-radius: 2px;
}

.footer-social a:hover {
  background: var(--terracotta);
  border-color: var(--terracotta);
  color: var(--ivory);
}

.footer-social .ico {
  width: 16px;
  height: 16px;
}

@media (max-width: 860px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
  .footer-top > :first-child {
    grid-column: 1 / -1;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
