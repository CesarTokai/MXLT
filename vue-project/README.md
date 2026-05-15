# México Lindo Tours — Vue 3

Conversión del landing page a **Vue 3 + Vite** con Composition API y Single File Components.

## 📁 Estructura del proyecto

```
vue-project/
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── src/
    ├── main.js
    ├── App.vue
    ├── assets/
    │   └── styles.css          # Variables CSS + utilidades globales
    ├── data/
    │   ├── destinos.js         # Array de destinos
    │   ├── servicios.js        # Array de servicios
    │   ├── testimonios.js
    │   └── faqs.js
    ├── composables/
    │   ├── useReveal.js        # Animación scroll/reveal
    │   └── useCounter.js       # Contadores animados
    └── components/
        ├── icons/
        │   └── SvgSprite.vue   # Sprite de iconos SVG
        ├── AppNav.vue
        ├── HeroSection.vue
        ├── StatsMarquee.vue
        ├── ServicesSection.vue
        ├── VehiculoSection.vue
        ├── GallerySection.vue
        ├── LightboxModal.vue
        ├── CountersSection.vue
        ├── DestinosSection.vue
        ├── FeaturesSection.vue
        ├── CotizadorSection.vue
        ├── TestimoniosSection.vue
        ├── FaqSection.vue
        ├── CtaSection.vue
        ├── AppFooter.vue
        └── WhatsappFloat.vue
```

## 🚀 Cómo correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Modo desarrollo (hot reload)
npm run dev

# 3. Build para producción
npm run build

# 4. Preview del build
npm run preview
```

Requiere **Node.js 18+** y npm.

## 🎨 Paleta y tipografía

Las variables CSS están en `src/assets/styles.css`. Cambiar la paleta solo requiere editar las custom properties en `:root`.

- **Tipografías**: Fraunces (serif italic) + Inter (cuerpo). Cargadas desde Google Fonts en `index.html`.
- **Color primario**: `--terracotta` (#b15838)
- **Fondo**: `--ivory` (#fbf8f1)

## 📦 Stack

- **Vue 3.4** (Composition API + `<script setup>`)
- **Vite 5** (dev server + build)
- CSS plano con variables (sin Tailwind, sin preprocesadores) — fácil de portar

## 🔌 Componentes destacados

- **CotizadorSection** — formulario multi-paso con estado reactivo, valida campos y genera link de WhatsApp.
- **GallerySection + LightboxModal** — carrusel auto-rotativo + lightbox modal con teclas ←→ Esc.
- **DestinosSection** — filtros reactivos por estado.
- **CountersSection** — contadores animados al entrar en viewport (composable reusable).
- **useReveal** — composable para animaciones fade-up basadas en IntersectionObserver.

## 📝 Notas

- El comportamiento e interacciones son **idénticos** al HTML original.
- Las imágenes se cargan desde Unsplash (CDN externo) — si quieres alojarlas localmente, mueve a `src/assets/img/` y ajusta rutas.
- El número de WhatsApp se centraliza en `App.vue` y se pasa como prop.
