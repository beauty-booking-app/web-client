# 06 · Booking engine — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

### Routing y estructura
- [x] Crear `src/router/AppRouter.jsx` con rutas `/` y `/reserva`.
- [x] Mover contenido de la landing a `src/pages/LandingPage.jsx`.
- [x] Crear `src/pages/BookingPage.jsx` con layout full-screen y estado del wizard.
- [x] Actualizar `src/App.jsx` para importar `<AppRouter />`.

### Paso 1 — Servicios
- [x] Crear `src/components/booking/StepServices.jsx`.
- [x] Importar `ALL_SERVICES` de `src/lib/services.js`.
- [x] Renderizar lista de servicios con botón toggle (seleccionar/deseleccionar).
- [x] Estado seleccionado con `--accent` y borde.
- [x] Contador de servicios seleccionados.
- [x] Botón "Siguiente" habilitado si `services.length > 0`.

### Paso 2 — Fecha/Hora
- [x] Crear `src/components/booking/StepDateTime.jsx`.
- [x] Generar array de 14 días a partir de hoy.
- [x] Renderizar grilla horizontal de fechas con día de la semana + fecha.
- [x] Renderizar grilla de horarios de `TIME_SLOTS`.
- [x] Botón "Siguiente" habilitado si `date && time`.

### Paso 3 — Datos del cliente
- [x] Crear `src/components/booking/StepClient.jsx`.
- [x] Implementar formulario con React Hook Form + Zod.
- [x] Campos: nombre (mín. 2 chars), teléfono (mín. 8 chars), email (válido).
- [x] Mostrar errores debajo de cada campo.
- [x] Botón "Confirmar" habilitado si el formulario es válido.

### Confirmación
- [x] Crear `src/components/booking/StepConfirm.jsx`.
- [x] Mostrar resumen: servicios, fecha, hora, nombre.
- [x] Botón "Volver al inicio" → redirige a `/`.

### Navegación y UI
- [x] Implementar header con pasos (1 → 2 → 3) y check visual.
- [x] Botones "Atrás" / "Siguiente" con navegación entre pasos.
- [x] Full-screen: sin navbar ni footer.
- [x] Focus management al cambiar de paso.

### Validación
- [x] Validar `pnpm build` sin errores.
- [x] Validar `pnpm lint` sin errores.
- [x] Verificar que los botones CTA apuntan a `/reserva`.
- [x] Verificar que el wizard funciona de principio a fin.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Actualizar `docs/CAMBIOS.md`.
