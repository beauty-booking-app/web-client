# 03 · Catálogo de servicios

**Estado:** implementado ✅
**Autor:** opencode
**Fecha:** 2026-07-22

## Resumen

Sección interactiva donde el usuario navega por las 4 categorías de servicios del salón (Corte Unisex, Tratamientos Capilares, Color, Uñas) mediante pestañas horizontales. Cada categoría muestra una imagen dinámica a la izquierda y la lista de servicios con descripción a la derecha.

## Datos existentes

- **Archivo:** `src/lib/services.js`
- **`SERVICE_CATEGORIES`:** array de 4 categorías, cada una con `id`, `label`, `pillar`, `description`, `image` (URL externa), `texture`, y `services[]` (cada servicio con `id`, `name`, `desc`).

## Contexto técnico

- El componente se renderiza en la landing page (`App.jsx`), debajo del Hero, arriba del About.
- No se muestra precio (no hay datos de precio).
- Las imágenes son URLs externas de `media.base44.com`.
- Se reutilizan tokens de diseño existentes (`--primary`, `--accent`, `--background`, `--foreground`, etc.).
- Se reutilizan clases `.reveal` y `.lift-card` existentes.
- No hay estado global: la categoría seleccionada es estado local del componente.

## Criterios de aceptación

1. La sección se renderiza con fondo `--background` (crema) y padding consistente (`px-[6%] sm:px-[8%]`).
2. Se muestran 4 pestañas horizontales (una por categoría) con `--accent` activo.
3. Al hacer click en una pestaña, la imagen de la izquierda y la lista de servicios de la derecha se actualizan.
4. La imagen se muestra en la columna izquierda del grid a partir de `lg:`.
5. La columna derecha muestra: título (`pillar`), descripción de la categoría, y una lista de servicios.
6. Cada servicio se muestra como tarjeta sutil con `lift-card`, nombre (`name`) y descripción (`desc`).
7. La primera categoría ("Corte Unisex") está activa por defecto.
8. Los botones de pestaña tienen targets mínimos de 44px.
9. Los elementos `.reveal` se animan al scroll.
10. `pnpm build` y `pnpm lint` pasan sin errores.
11. `prefers-reduced-motion: reduce` desactiva animaciones.
12. Accesibilidad: `role="tablist"` en el contenedor de pestañas, `role="tab"` en cada botón, `aria-selected` y `aria-controls`.

## Fuera de alcance

- Selección de servicios para reserva (será feature 06).
- Precios de servicios.
- Lazy loading de imágenes.
- Filtros o búsqueda.
