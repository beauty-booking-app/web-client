# 01 · Landing page

**Estado:** implementado ✅

## Qué hace

La landing page presenta el salón M&M al visitante con dos secciones:

1. **Hero** — pantalla completa con imagen de fondo difuminada del interior del salón, un overlay cálido (sepia/rosado) que unifica el tono, y contenido superpuesto en grid de dos columnas: a la izquierda una volanta, un título, una bajada y dos botones CTA alineados horizontalmente; a la derecha se deja ver la imagen de fondo.

2. **About** — sección con fondo crema que presenta la filosofía del salón en un layout asimétrico: a la izquierda los encabezados de sección, a la derecha un párrafo descriptivo y un grid de 3 tarjetas (ícono, título, descripción) que resumen los valores del salón.

El usuario puede leer la propuesta de valor, entender qué ofrece el salón y navegar a las acciones principales (reservar turno, ver servicios).

## Por qué

Es la primera impresión del cliente. Tiene que transmitir calidez de barrio, legibilidad y confianza en menos de 5 segundos. Establece la paleta, tipografía y tono visual que el resto de la app va a heredar.

## Criterios de aceptación

- [ ] El Hero ocupa toda la pantalla (100svh) con imagen de fondo cubierta.
- [ ] La imagen de fondo tiene `filter: blur(8px)` y escala ligeramente para cubrir bordes.
- [ ] Un overlay semitransparente sepia/rosado está sobre la imagen, sobre el texto.
- [ ] El grid del Hero tiene dos columnas: texto (izq, ~60%) e imagen visible (der, ~40%).
- [ ] El Hero muestra: volanta, h1, párrafo bajada, y 2 botones CTA horizontales.
- [ ] Todo el texto del Hero está alineado a la izquierda.
- [ ] El About tiene fondo crema (`--background`) uniforme.
- [ ] El About usa un layout asimétrico: encabezados (izq) + párrafo y 3 tarjetas (der).
- [ ] Cada tarjeta del About tiene ícono SVG, título y descripción corta.
- [ ] Las tarjetas tienen efecto hover de elevación (`.lift-card`).
- [ ] Los elementos entran con animación `.reveal` (fade-in + slide-up) al hacer scroll.
- [ ] La landing es responsive: en mobile el grid pasa a una sola columna.
- [ ] Se respeta `prefers-reduced-motion: reduce` (sin animaciones).
- [ ] Targets interactivos mínimos de 44px.
- [ ] Todo el contenido visible está en español argentino.
- [ ] `pnpm lint` no arroja errores.
- [ ] `pnpm dev` compila sin errores.

## Fuera de alcance

- Navbar flotante (feature 02).
- Catálogo de servicios con tabs (feature 03).
- Pre-Footer Banner (feature 04).
- Footer (feature 05).
- Routing entre páginas (se agregará con React Router en la feature de Booking engine).
- Imagen real de salón: por ahora se usa `hero.jpg` como placeholder.
