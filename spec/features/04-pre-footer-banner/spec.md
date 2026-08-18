# 04 · Pre-Footer Banner

**Estado:** propuesta
**Autor:** opencode
**Fecha:** 2026-07-22

## Resumen

Sección de llamada a la acción (CTA) que aparece antes del Footer. Contenedor flexible alineado horizontalmente con un título a la izquierda y un botón CTA a la derecha.

## Contexto técnico

- El componente se renderiza en la landing page (`App.jsx`), debajo de About y antes del Footer (feature 05).
- Se reutilizan tokens de diseño existentes.
- No hay estado: componente puro sin estado local.

## Criterios de aceptación

1. La sección se renderiza con fondo `--primary` (terracota) y padding consistente (`px-[6%] sm:px-[8%]`).
2. Layout horizontal en desktop (`lg:flex-row`), vertical en mobile (`flex-col`).
3. Lado izquierdo: volanta (`text-sm`, `uppercase`, `tracking-widest`) y título (`font-display`, bold) en color blanco.
4. Lado derecho: botón CTA con fondo blanco, texto `--primary`, targets ≥ 44px.
5. El botón CTA apunta a `/reserva` (ruta futura del booking engine).
6. `pnpm build` y `pnpm lint` pasan sin errores.
7. `prefers-reduced-motion: reduce` desactiva animaciones.
8. Accesibilidad: el botón CTA tiene `aria-label` descriptivo.

## Fuera de alcance

- Animaciones de entrada (se pueden agregar después).
- Contenido del Footer (será feature 05).
