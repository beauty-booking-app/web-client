# 05 · Footer

**Estado:** propuesta
**Autor:** opencode
**Fecha:** 2026-07-22

## Resumen

Pie de página de la landing page. Contenedor global dividido en dos bloques: una grilla de 4 columnas en la parte superior (cada columna con título y contenido) y una barra inferior separada por un borde horizontal fino con texto informativo.

## Contexto técnico

- El componente se renderiza en la landing page (`App.jsx`), como último elemento.
- Se reutilizan tokens de diseño existentes.
- No hay estado: componente puro sin estado local.
- Los datos de servicios están en `src/lib/services.js`.

## Criterios de aceptación

1. La sección se renderiza con fondo `--foreground` (marrón oscuro) y padding consistente (`px-[6%] sm:px-[8%]`).
2. Layout superior: grilla de 4 columnas en desktop (`lg:grid-cols-4`), 2 columnas en mobile (`grid-cols-2`).
3. Cada columna tiene un título (`font-display`, bold, color blanco) y contenido (lista de links o texto, color blanco con opacidad 0.7).
4. Columna 1: "Tammi" — nombre del salón + descripción corta.
5. Columna 2: "Servicios" — lista de las 4 categorías de servicios como links.
6. Columna 3: "Contacto" — dirección, teléfono, horarios.
7. Columna 4: "Redes" — links a Instagram y WhatsApp.
8. Barra inferior: borde superior `border-white/10`, texto centrado "Hecho con amor en Tammi Salón de belleza · 2026".
9. `pnpm build` y `pnpm lint` pasan sin errores.
10. Accesibilidad: links con `aria-label` descriptivos, `role="contentinfo"` en el footer.

## Fuera de alcance

- Formulario de newsletter.
- Links a política de privacidad.
- Mapa de ubicación.
