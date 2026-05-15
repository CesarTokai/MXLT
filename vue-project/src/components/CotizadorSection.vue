<script setup>
import { ref, inject, reactive } from 'vue'

const config = inject('config')

const servicios = [
  { value: 'Excursión', icon: 'i-mountain', name: 'Excursión', desc: 'Visitar destinos turísticos' },
  { value: 'Traslado aeropuerto', icon: 'i-plane', name: 'Aeropuerto', desc: 'Ida o vuelta al aeropuerto' },
  { value: 'Viaje semanal', icon: 'i-store', name: 'Semanal CDMX', desc: 'Para comerciantes' },
  { value: 'Evento social', icon: 'i-confetti', name: 'Evento social', desc: 'Boda · XV · graduación' }
]

const curStep = ref(1)
const form = reactive({
  servicio: '',
  destino: '',
  fecha: '',
  pasajeros: 2,
  notas: '',
  nombre: '',
  tel: '',
  como: ''
})

const success = ref(false)
const waLink = ref('#')

function selectService(v) {
  form.servicio = v
}

function changePax(d) {
  form.pasajeros = Math.max(1, Math.min(14, form.pasajeros + d))
}

function nextStep() {
  if (curStep.value === 1 && !form.servicio) {
    alert('Por favor selecciona un tipo de servicio.')
    return
  }
  if (curStep.value < 3) curStep.value++
}

function prevStep() {
  if (curStep.value > 1) curStep.value--
}

function submitForm() {
  if (!form.nombre.trim() || !form.tel.trim()) {
    alert('Por favor ingresa tu nombre y teléfono.')
    return
  }
  const msg = `Hola! Quisiera cotizar un viaje con México Lindo Tours.

Servicio: ${form.servicio}
Destino: ${form.destino || 'Por definir'}
Fecha: ${form.fecha || 'Por definir'}
Pasajeros: ${form.pasajeros}
Nombre: ${form.nombre}
Tel: ${form.tel}${form.notas ? '\nNotas: ' + form.notas : ''}

Gracias.`
  waLink.value = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`
  success.value = true
}

function stepClass(i) {
  if (i < curStep.value) return 'done'
  if (i === curStep.value) return 'active'
  return ''
}
</script>

<template>
  <section id="cotizador" class="cotizador">
    <div class="cotizador-inner">
      <div class="cotizador-head fade-up">
        <span class="eyebrow">Cotizar viaje</span>
        <h2 class="section-title" style="margin-top: 1rem">
          Tu cotización en <span class="italic">3 minutos</span>.
        </h2>
        <p class="section-sub" style="margin-left: auto; margin-right: auto">
          Sin compromiso. Respondemos por WhatsApp en menos de una hora.
        </p>
      </div>

      <!-- Indicadores -->
      <div class="cotizador-steps fade-up" v-if="!success">
        <div v-for="i in 3" :key="i" class="step-indicator">
          <div class="step-dot" :class="stepClass(i)">
            <svg
              v-if="stepClass(i) === 'done'"
              style="width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2"
            >
              <use href="#i-check" />
            </svg>
            <template v-else>{{ i }}</template>
          </div>
          <span class="step-label" :class="{ active: stepClass(i) === 'active' }">
            {{ ['Servicio', 'Detalles', 'Contacto'][i - 1] }}
          </span>
        </div>
      </div>

      <!-- Formulario -->
      <div class="cotizador-form fade-up" v-if="!success">
        <!-- Paso 1 -->
        <div v-show="curStep === 1">
          <h3>¿Qué tipo de viaje buscas?</h3>
          <p class="step-desc">Elige el servicio que necesitas.</p>
          <div class="service-options">
            <div
              v-for="s in servicios"
              :key="s.value"
              class="service-option"
              :class="{ selected: form.servicio === s.value }"
              @click="selectService(s.value)"
            >
              <div class="ico"><svg><use :href="`#${s.icon}`" /></svg></div>
              <div>
                <div class="service-option-name">{{ s.name }}</div>
                <div class="service-option-desc">{{ s.desc }}</div>
              </div>
            </div>
          </div>
          <div class="form-nav" style="justify-content: flex-end">
            <button class="btn-form-next" @click="nextStep">
              Siguiente
              <svg class="icon" style="width: 14px; height: 14px; vertical-align: middle">
                <use href="#i-arrow-right" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Paso 2 -->
        <div v-show="curStep === 2">
          <h3>Cuéntanos más</h3>
          <p class="step-desc">Entre más detalles, mejor cotizamos.</p>
          <div class="form-grid">
            <div class="form-field">
              <label>Destino / Ruta</label>
              <input
                v-model="form.destino"
                type="text"
                placeholder="Ej. Taxco, Acapulco, CDMX..."
              />
            </div>
            <div class="form-field">
              <label>Fecha</label>
              <input v-model="form.fecha" type="date" />
            </div>
            <div class="form-field full">
              <label>Pasajeros</label>
              <div class="pax-selector">
                <button class="pax-btn" @click="changePax(-1)">−</button>
                <div class="pax-num">{{ form.pasajeros }}</div>
                <button class="pax-btn" @click="changePax(1)">+</button>
                <div class="pax-label">personas · <small>máx. 14</small></div>
              </div>
            </div>
            <div class="form-field full">
              <label>Notas (opcional)</label>
              <textarea
                v-model="form.notas"
                placeholder="Horario, paradas especiales, necesidades particulares..."
              ></textarea>
            </div>
          </div>
          <div class="form-nav">
            <button class="btn-form-prev" @click="prevStep">
              <svg class="icon" style="width: 14px; height: 14px; vertical-align: middle">
                <use href="#i-arrow-left" />
              </svg>
              Atrás
            </button>
            <button class="btn-form-next" @click="nextStep">
              Siguiente
              <svg class="icon" style="width: 14px; height: 14px; vertical-align: middle">
                <use href="#i-arrow-right" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Paso 3 -->
        <div v-show="curStep === 3">
          <h3>¿Cómo te contactamos?</h3>
          <p class="step-desc">Te enviamos la cotización por WhatsApp.</p>
          <div class="form-grid">
            <div class="form-field">
              <label>Nombre</label>
              <input v-model="form.nombre" type="text" placeholder="Nombre completo" />
            </div>
            <div class="form-field">
              <label>WhatsApp</label>
              <input v-model="form.tel" type="tel" placeholder="7XX XXX XXXX" />
            </div>
            <div class="form-field full">
              <label>¿Cómo nos encontraste?</label>
              <select v-model="form.como">
                <option value="">Selecciona una opción</option>
                <option>Facebook</option>
                <option>Recomendación</option>
                <option>Google</option>
                <option>WhatsApp</option>
                <option>Otro</option>
              </select>
            </div>
          </div>
          <div class="form-nav">
            <button class="btn-form-prev" @click="prevStep">
              <svg class="icon" style="width: 14px; height: 14px; vertical-align: middle">
                <use href="#i-arrow-left" />
              </svg>
              Atrás
            </button>
            <button class="btn-form-next btn-form-submit" @click="submitForm">
              Enviar por WhatsApp
              <svg class="icon" style="width: 14px; height: 14px; vertical-align: middle">
                <use href="#i-wa" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Éxito -->
      <div class="cotizador-success" v-if="success">
        <div class="success-icon">
          <svg style="width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.5">
            <use href="#i-check" />
          </svg>
        </div>
        <h3 class="success-title">Cotización lista</h3>
        <p class="success-msg">
          Tu solicitud está preparada. Haz clic abajo para enviarla por WhatsApp — te respondemos en
          menos de una hora.
        </p>
        <a :href="waLink" target="_blank" class="btn btn-primary" style="background: var(--charcoal)">
          Abrir WhatsApp
          <svg class="icon" style="width: 16px"><use href="#i-wa" /></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cotizador {
  background: var(--ivory);
  padding: 110px 5vw;
}

.cotizador-inner {
  max-width: 920px;
  margin: 0 auto;
}

.cotizador-head {
  text-align: center;
  margin-bottom: 3rem;
}

.cotizador-head :deep(.eyebrow) {
  display: block;
  margin-bottom: 1rem;
}

.cotizador-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  position: relative;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 2.5rem;
}

.cotizador-steps::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 10%;
  right: 10%;
  height: 1px;
  background: var(--line);
  z-index: 0;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  position: relative;
  z-index: 1;
  flex: 1;
}

.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--ivory);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 0.85rem;
  color: var(--muted);
  transition: all 0.3s;
  font-weight: 500;
}

.step-dot.active {
  background: var(--terracotta);
  border-color: var(--terracotta);
  color: var(--ivory);
}

.step-dot.done {
  background: var(--charcoal);
  border-color: var(--charcoal);
  color: var(--ivory);
}

.step-label {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.step-label.active {
  color: var(--terracotta);
}

.cotizador-form {
  background: var(--cream);
  border: 1px solid var(--line);
  padding: 3rem;
  border-radius: 4px;
}

.cotizador-form > div {
  animation: stepIn 0.35s ease;
}

@keyframes stepIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

.cotizador-form h3 {
  font-family: 'Fraunces', serif;
  color: var(--charcoal);
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.step-desc {
  color: var(--charcoal-soft);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field.full {
  grid-column: 1 / -1;
}

.form-field label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--charcoal-soft);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.form-field input,
.form-field select,
.form-field textarea {
  background: var(--ivory);
  border: 1px solid var(--line);
  border-radius: 2px;
  padding: 0.85rem 1rem;
  color: var(--charcoal);
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s;
  outline: none;
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: var(--muted);
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--terracotta);
}

.form-field textarea {
  resize: vertical;
  min-height: 90px;
}

.service-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.service-option {
  background: var(--ivory);
  border: 1px solid var(--line);
  border-radius: 2px;
  padding: 1.4rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.service-option:hover {
  border-color: var(--terracotta-soft);
}

.service-option.selected {
  background: var(--sand-light);
  border-color: var(--terracotta);
}

.service-option .ico {
  width: 32px;
  height: 32px;
  color: var(--terracotta);
  flex-shrink: 0;
}

.service-option .ico svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.service-option-name {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1rem;
  color: var(--charcoal);
  line-height: 1.2;
}

.service-option-desc {
  font-size: 0.78rem;
  color: var(--charcoal-soft);
  margin-top: 0.2rem;
}

.pax-selector {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.6rem 0;
}

.pax-btn {
  background: var(--ivory);
  border: 1px solid var(--line);
  color: var(--charcoal);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.pax-btn:hover {
  background: var(--terracotta);
  color: var(--ivory);
  border-color: var(--terracotta);
}

.pax-num {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 2.4rem;
  color: var(--terracotta);
  min-width: 56px;
  text-align: center;
  font-weight: 500;
  line-height: 1;
}

.pax-label {
  color: var(--charcoal-soft);
  font-size: 0.84rem;
  font-weight: 500;
}

.pax-label small {
  color: var(--muted);
  font-size: 0.72rem;
}

.form-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
  gap: 1rem;
}

.btn-form-prev {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--charcoal-soft);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.85rem 1.5rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-form-prev:hover {
  border-color: var(--charcoal);
  color: var(--charcoal);
}

.btn-form-next {
  background: var(--terracotta);
  border: none;
  color: var(--ivory);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.85rem 1.8rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-form-next:hover {
  background: var(--terracotta-deep);
}

.btn-form-submit {
  background: var(--charcoal);
}

.btn-form-submit:hover {
  background: var(--terracotta);
}

.cotizador-success {
  text-align: center;
  padding: 3rem 1rem;
  animation: stepIn 0.4s ease;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.4rem;
  color: var(--terracotta);
}

.success-title {
  font-family: 'Fraunces', serif;
  color: var(--charcoal);
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  letter-spacing: -0.01em;
}

.success-msg {
  color: var(--charcoal-soft);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 600px) {
  .form-grid { grid-template-columns: 1fr; }
  .service-options { grid-template-columns: 1fr; }
  .cotizador-form { padding: 2rem 1.4rem; }
}
</style>
