# 08 · Mis turnos

**Estado:** propuesta
**Autor:** opencode
**Fecha:** 2026-08-19
**Actualizado:** 2026-08-20 — alineado con backend feature 009 (endpoints públicos + cancelar/reprogramar)

## Resumen

Página `/mis-turnos` donde el cliente consulta el estado de su turno ingresando el código de seguimiento (`humanId`) que recibió al confirmar la reserva. La página muestra los datos del turno (servicios, fecha, hora, estado, precio) **sin necesidad de login** (endpoint público). Desde el resultado, el cliente puede **cancelar** o **reprogramar** el turno validando su identidad con el email o teléfono usado al reservar. También se agrega un botón "Mis turnos" al navbar de la landing para acceder directamente.

## Datos existentes

- **`humanId`** — identificador corto (ej. `A3F9K2`) devuelto por `POST /appointments` y visible en `StepConfirm`.
- **Backend feature 009** — expone endpoints **públicos** (sin autenticación):
  - `GET /api/v1/public/appointments/by-human-id/{humanId}` — detalle del turno
  - `POST /api/v1/public/appointments/by-human-id/{humanId}/reschedule` — reprogramar (requiere `verificationContact`)
  - `PATCH /api/v1/public/appointments/by-human-id/{humanId}/cancel` — cancelar (requiere `verificationContact`)

## Contexto técnico

- **Página independiente:** `/mis-turnos` con React Router.
- **Navbar:** se agrega botón "Mis turnos" al lado del botón "RESERVAR".
- **API:** los endpoints son **públicos** (sin `X-Client-Token` ni Bearer). La verificación de identidad se hace enviando `verificationContact` (email o teléfono) en el body de cancelar/reprogramar.
- **Estado:** formulario de búsqueda + tarjeta de resultado + modales de cancelar/reprogramar.

## Criterios de aceptación

### Consulta por código

1. La ruta `/mis-turnos` renderiza la página con un formulario de búsqueda.
2. El formulario tiene un input para el código de seguimiento (`humanId`) y un botón "Buscar".
3. El input valida que no esté vacío y que tenga formato alfanumérico (6 caracteres).
4. Al enviar, se llama a `GET /api/v1/public/appointments/by-human-id/{humanId}` **sin autenticación**.
5. Si la cita existe, se muestra una tarjeta con: código, servicios (nombres + precios), fecha, hora, duración, estado, precio total, y nombre del cliente.
6. Si no se encuentra, se muestra un mensaje claro: "No encontramos un turno con ese código".
7. Si hay error de red o del servidor, se muestra un mensaje de error accesible.

### Cancelar turno

8. En la tarjeta del turno, si el estado lo permite, se muestra un botón "Cancelar turno".
9. Al hacer clic, se abre un modal/dialog que pide: motivo de cancelación (opcional) y **verificación** (email o teléfono).
10. Se envía `PATCH /api/v1/public/appointments/by-human-id/{humanId}/cancel` con `{ reason, verificationContact }`.
11. Si el contacto no coincide → mostrar error "El dato de contacto no coincide con el registrado."
12. Si el turno no se puede cancelar (ya cancelado/completado, ventana vencida) → mostrar el motivo del backend (`409 CannotCancel`).
13. Si se cancela exitosamente → actualizar el estado del turno en la tarjeta a "cancelado".

### Reprogramar turno

14. En la tarjeta del turno, si el estado lo permite, se muestra un botón "Reprogramar".
15. Al hacer clic, se abre un modal/dialog con: selector de fecha, selector de horario, y campo de **verificación** (email o teléfono).
16. Se valida disponibilidad del nuevo slot antes de enviar.
17. Se envía `POST /api/v1/public/appointments/by-human-id/{humanId}/reschedule` con `{ date, startTime, verificationContact }`.
18. Si el contacto no coincide → mostrar error "El dato de contacto no coincide con el registrado."
19. Si el slot no está disponible → mostrar error (`409 SlotUnavailable`).
20. Si se reprograma exitosamente → actualizar la tarjeta con la nueva fecha/hora y estado "reprogramado".

### Navbar y navegación

21. El botón "Mis turnos" en el navbar lleva a `/mis-turnos`.
22. El botón "RESERVAR" del navbar sigue llevando a `/reserva`.

### Accesibilidad y calidad

23. `aria-label` en el input de búsqueda.
24. `role="alert"` en mensajes de error y "no encontrado".
25. Focus automático en el input al cargar la página.
26. Modales accesibles: focus trap, escape para cerrar, `aria-labelledby`.
27. `pnpm build` y `pnpm lint` pasan sin errores.

## Fuera de alcance

- Historial de turnos múltiples (un solo turno por búsqueda).
- Login de usuario (los endpoints son públicos).
- Persistencia del código en localStorage.
- Verificación OTP/código por email/WhatsApp (la verificación es contacto exacto, nivel deliberadamente bajo).
