import { onMounted, onUnmounted } from 'vue'

/**
 * Aplica la clase `visible` a elementos con `.fade-up` o `.stagger-children`
 * cuando entran al viewport. Si ya están visibles al montar, los muestra sin animación.
 */
export function useReveal() {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-up, .stagger-children').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        // Ya visible al cargar → mostrar inmediatamente
        el.style.transition = 'none'
        el.classList.add('visible')
        requestAnimationFrame(() => {
          el.style.transition = ''
        })
      } else {
        observer.observe(el)
      }
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
