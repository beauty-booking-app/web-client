# 08 · Mis turnos — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._
_Actualizado: 2026-08-20 — alineado con backend feature 009_

### Routing y estructura
- [x] Agregar ruta `/mis-turnos` en `src/router/AppRouter.jsx`.
- [x] Crear `src/pages/MyBookingsPage.jsx` con layout y título.

### Navbar
- [x] Agregar botón "Mis turnos" en `src/components/Navbar.jsx` al lado del botón RESERVAR.
- [x] Verificar que ambos botones son visibles y accesibles (target 44px).

### API — endpoints públicos (feature 009)
- [x] Agregar `fetchAppointmentByHumanId(humanId)` en `src/services/api.js` — GET público, sin auth.
- [x] Agregar `cancelAppointmentByHumanId(humanId, { reason, verificationContact })` — PATCH público.
- [x] Agregar `rescheduleAppointmentByHumanId(humanId, { date, startTime, verificationContact })` — POST público.
- [x] Manejar errores: 404 → NotFound, 403 → ContactMismatch, 409 → CannotCancel/CannotReschedule/SlotUnavailable, otros → error genérico.
- [x] **No** usar `getClientToken()` — los endpoints son públicos.

### Componentes — Búsqueda
- [x] Crear `src/components/BookingLookup.jsx` con input + botón + estados (loading/error/notFound/result).
- [x] Implementar validación del input (no vacío, alfanumérico, 6 chars).

### Componentes — Tarjeta del turno
- [x] Crear `src/components/AppointmentCard.jsx` con: humanId, servicios, fecha, hora, duración, precio total, estado, nombre del cliente.
- [x] Agregar botones "Cancelar" y "Reprogramar" condicionados por el estado del turno.

### Componentes — Modal cancelación
- [x] Crear `src/components/CancelAppointmentModal.jsx`.
- [x] Campos: textarea de motivo (opcional), input de verificación (email o teléfono).
- [x] Manejar errores: ContactMismatch, CannotCancel.
- [x] Actualizar tarjeta al cancelar exitosamente.

### Componentes — Modal reprogramación
- [x] Crear `src/components/RescheduleModal.jsx`.
- [x] Campos: input de fecha, input de horario, input de verificación (email o teléfono).
- [x] Manejar errores: ContactMismatch, SlotUnavailable, CannotReschedule.
- [x] Actualizar tarjeta al reprogramar exitosamente.

### UI y accesibilidad
- [x] `aria-label="Código de seguimiento"` en el input de búsqueda.
- [x] `role="alert"` en mensajes de error y "no encontrado".
- [x] Focus automático en el input al montar.
- [x] Modales accesibles: focus trap, escape para cerrar, `aria-labelledby`.
- [x] Respetar `prefers-reduced-motion: reduce`.

### Validación
- [x] `pnpm build` sin errores.
- [x] `pnpm lint` sin errores (3 pre-existentes en ServiceCatalog.jsx y api.js mock).
- [x] Verificar que el botón "Mis turnos" del navbar lleva a `/mis-turnos`.
- [x] Verificar que la búsqueda funciona con un `humanId` válido.
- [x] Verificar el flujo de error (404, error de red).
- [x] Verificar cancelación con contacto correcto e incorrecto.
- [x] Verificar reprogramación con contacto correcto e incorrecto.
