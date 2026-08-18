# 01 · Landing page — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

- [x] Configurar Tailwind CSS 4 en `vite.config.js` (agregar plugin `@tailwindcss/vite`).
- [x] Actualizar `index.html`: `lang="es"`, título "M&M Peluquería", Google Fonts (Fraunces + Nunito Sans).
- [x] Reescribir `src/index.css`: importar Tailwind, definir tokens CSS (`--primary`, `--accent`, `--background`, `--foreground`), tipografía base, utilidades `.reveal` y `.lift-card`.
- [x] Crear `src/components/Hero.jsx`: full-screen, imagen difuminada, overlay, grid 2 columnas, volanta, título, bajada, 2 botones CTA.
- [x] Crear `src/components/About.jsx`: fondo crema, layout asimétrico, volanta, título, párrafo, 3 tarjetas con ícono/título/descripción.
- [x] Reemplazar `src/App.jsx`: eliminar boilerplate, importar Hero y About.
- [x] Eliminar `src/App.css`.
- [x] Validar `pnpm build` compila sin errores.
- [x] Validar `pnpm lint` sin errores.
- [ ] Verificar responsive en mobile (grid a 1 columna).
- [ ] Verificar `prefers-reduced-motion` (sin animaciones cuando está activado).
- [ ] Verificar targets interactivos ≥ 44px.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.
- [ ] Actualizar `docs/CAMBIOS.md` si existe.
