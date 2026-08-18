# Convenciones del proyecto

## Regla de documentación

Cada cambio significativo debe documentarse en `docs/`:
- Nuevas funciones o componentes → actualizar `ARQUITECTURA.md`
- Cambios de convención → actualizar este archivo
- Bugs corregidos → agregar nota en `CAMBIOS.md`

## Código

- **Idioma**: todo el contenido visible al usuario en español (argentino).
- **Tipos**: las entidades se definen en `src/types/`.
- **Estilos**: Tailwind CSS utility-first. No hay CSS modules ni styled-components.
- **Íconos**: Lucide React para íconos SVG.
- **Namespaces de componentes**: Shadcn UI en `src/components/ui/`, componentes de negocio en `src/components/`.
- **Estado**: el estado de la reserva se maneja en `BookingContext.jsx`.
- **Formularios**: React Hook Form + Zod para formularios.
- **Archivos de configuración**: los archivos de config van en la raíz del proyecto (`vite.config.js`, `tailwind.config.js`, `components.json`, etc.).

## Accesibilidad (a11y)

- `aria-label` en botones interactivos.
- `aria-pressed` en botones de selección (toggle de servicios, fecha, hora).
- `aria-modal="true"` y `role="dialog"` en el `BookingEngine`.
- `:focus-visible` con outline visible en todos los elementos interactivos.
- Jerarquía de headings correcta (h1 → h2 → h3).
- Tap targets mínimo de 44px en todos los elementos interactivos.
- Soporte para `prefers-reduced-motion`: desactiva animaciones de reveal y lift-card.

## Animaciones

- **Reveal on scroll**: fade-in + slide-up con clase `.reveal` (activada por `IntersectionObserver`).
- **Hover en cards**: elevación (`translateY(-6px)`) + sombra con clase `.lift-card`.
- **Hero**: animaciones de entrada escalonadas al montar el componente.
- **BookingEngine**: transiciones entre pasos del wizard.
- Respeto estricto de `prefers-reduced-motion: reduce`.

## Paleta y tipografía

- Terracota (`--primary`) para botones y acentos principales.
- Sage (`--accent`) para confirmaciones y estados positivos.
- Crema (`--background`) para fondos.
- **Fraunces** para headings/display, **Nunito Sans** para cuerpo.
- Utilizar tokens de Tailwind (`text-primary`, `bg-card`, `border-border`) en lugar de valores hardcodeados.

## Git

- Commits descriptivos en español.
- No commitear `node_modules/` ni archivos de build.

## Estructura de componentes

- Componentes de negocio: `src/components/` (Hero, BookingEngine, etc.).
- Componentes de UI reutilizables: `src/components/ui/` (Shadcn UI).
- Cada componente de negocio es un archivo JSX aparte.
- Los componentes de Shadcn UI se importan con alias `@/components/ui/`.
- Los hooks custom van en `src/hooks/`.
