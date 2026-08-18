# 02 · Navbar

**Estado:** implementado ✅

## Qué hace

Un nav flotante fijo en la parte superior de la página que se mantiene visible mientras el usuario scrollea. Contiene el logo/nombre del salón a la izquierda y un botón CTA "Reservá tu turno" a la derecha. El nav tiene fondo semitransparente con blur que se vuelve sólido al hacer scroll.

## Por qué

El usuario necesita poder reservar en cualquier momento sin tener que volver al Hero. El CTA siempre visible reduce la fricción para conversiones. El nav flotante es el patrón estándar para landing pages con un objetivo de conversión claro.

## Criterios de aceptación

- [ ] El nav es `position: fixed` en la parte superior, visible en todo momento al scrollear.
- [ ] Contiene un botón CTA a la derecha.
- [ ] El nav tiene fondo transparente.
- [ ] El botón CTA tiene `min-height: 44px` y `min-width: 44px` (accesibilidad).
- [ ] En mobile el nav sigue visible con el botón CTA.
- [ ] El nav no tapa el contenido: se aplica `padding-top` al body o al primer elemento.
- [ ] Se respeta `prefers-reduced-motion: reduce` (sin transiciones).
- [ ] `pnpm lint` sin errores.
- [ ] `pnpm build` sin errores.

## Fuera de alcance

- Menú hamburguesa / navegación por secciones (no se pide en el roadmap).
- Links de navegación internos (las secciones aún no están todas implementadas).
- Animaciones de entrada del nav.
