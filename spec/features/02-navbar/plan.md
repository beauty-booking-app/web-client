# 02 · Navbar — Plan

_Cómo se implementa lo descrito en `spec.md`. Respeta la `constitution/`._

## Enfoque

Crear un componente `Navbar.jsx` que se renderiza en `App.jsx` por encima de las demás secciones. Usa `position: fixed` y un `useEffect` con `IntersectionObserver` (o scroll listener) para detectar el scroll y cambiar el estilo de fondo. No se instalan dependencias nuevas.

## Implementación

1. **`src/components/Navbar.jsx`** — componente nuevo:
   - `<nav>` fijo arriba (`fixed top-0 inset-x-0 z-50`).
   - Contenedor interno con `px-[6%] sm:px-[8%]` (consistente con el resto).
   - Izquierda: texto "M&M" con `font-display` (Fraunces).
   - Derecha: botón CTA "Reservá tu turno" con estilo primario (`bg-primary`, `text-white`, `rounded-full`).
   - Estado inicial: fondo transparente.
   - Al scrollear > 50px: fondo blanco sólido con sombra (`shadow-md`).
   - Transición de fondo suave (`transition-colors`).
   - `useEffect` con `scroll` event listener para actualizar estado `scrolled`.
   - Cleanup del listener en return.
   - Target del botón: `min-h-[44px] min-w-[44px]`.

2. **`src/index.css`** — agregar regla para compensar el nav fijo:
   - Opción A: `padding-top` en el Hero (ya es `min-h-svh`, no necesita cambio).
   - Opción B: usar `scroll-padding-top` en `html` para anchors.
   - Decisión: agregar `scroll-padding-top: 80px` en `:root` para que los links `#reserva` y `#servicios` no queden tapados por el nav.

3. **`src/App.jsx`** — importar y renderizar `<Navbar />` antes de `<Hero />`.

## Decisiones

- **Scroll listener vs IntersectionObserver** — un simple `scroll` listener con throttling es más directo para detectar posición de scroll. IntersectionObserver es para detectar elementos en viewport, no para saber cuánto se scrolleó.
- **Fondo transparente → sólido** — patrón estándar de nav flotante. No se usa glassmorphism excesivo para mantener la estética cálida del salón.
- **Sin links de navegación** — el roadmap solo pide "un botón flotante CTA a la derecha". Los links internos se agregarán cuando existan todas las secciones.

## Riesgos

- **Nav tapa el Hero** — el Hero usa `min-h-svh` y el contenido está centrado, así que el nav flotante no debería tapar nada importante. Pero si se usa `scroll-padding-top` para anchors, hay que verificar que funcione.
- **Performance del scroll listener** — mitigado con throttle simple o `requestAnimationFrame`.
