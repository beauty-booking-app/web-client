# 03 · Catálogo de servicios — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

- [x] Crear `src/components/ServiceCatalog.jsx` con estado local `activeId`.
- [x] Importar `SERVICE_CATEGORIES` de `src/lib/services.js`.
- [x] Renderizar sección con fondo `--background`, padding consistente, volanta + título.
- [x] Implementar barra de pestañas con `role="tablist"`, `aria-selected`, targets ≥ 44px.
- [x] Implementar grid 2 columnas (`lg:grid-cols-[3fr_4fr]`): imagen izquierda, contenido derecha.
- [x] Renderizar imagen dinámica con `alt` correcto y `rounded-2xl`.
- [x] Renderizar columna derecha: título (`pillar`), descripción de categoría, lista de servicios.
- [x] Cada servicio con `lift-card`, nombre bold, descripción en `--foreground-muted`.
- [x] Animación `.reveal` con IntersectionObserver al scroll.
- [x] Importar `<ServiceCatalog />` en `src/App.jsx` entre `<Hero />` y `<About />`.
- [x] Validar `pnpm build` sin errores.
- [x] Validar `pnpm lint` sin errores.
- [x] Verificar que las pestañas cambian imagen y contenido.
- [x] Verificar que la primera categoría ("Corte Unisex") está activa por defecto.
- [x] Verificar `prefers-reduced-motion` desactiva animaciones.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Actualizar `docs/CAMBIOS.md`.
