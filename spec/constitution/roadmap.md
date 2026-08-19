# Roadmap

## Hecho ✅

1. **01 · Landing page** — Hero cinético + sección About. (`spec/features/01-landing-page/`)
2. **02 · Navbar** — Nav flotante fijo con CTA. (`spec/features/02-navbar/`)
3. **03 · Catálogo de servicios** — Sección interactiva con pestañas por categoría, imagen dinámica y lista de servicios. (`spec/features/03-catalogo-servicios/`)
4. **04 · Pre-Footer Banner** — Sección CTA con fondo terracota y botón "Reservá tu turno". (`spec/features/04-pre-footer-banner/`)
5. **05 · Footer** — Footer con grilla 4 columnas y barra inferior. (`spec/features/05-footer/`)
6. **006 · Booking engine** — Wizard full-screen de 3 pasos: servicios → fecha/hora → datos, con confirmación visual. (`spec/features/06-booking-engine/`)
7. **07 · Reserva anónima conectada al backend** — firma del `X-Client-Token` (JWT HS256 con `VITE_CLIENT_TOKEN_SECRET`), envío de los datos del cliente al crear la cita, y conexión del wizard con el backend real (manejo de errores 401/400/409). (`spec/features/07-reserva-anonima-backend/`)

## Siguiente 🔜

(ninguna feature pendiente)

## Backlog / ideas 💡

- **Notificaciones de turno** — recordatorio por email o WhatsApp un día antes del turno agendado.
- **Cancelar/reprogramar turno** — flujo para que el cliente cancele o cambie la fecha/hora de un turno existente.
- **Valoraciones** — permitir al cliente dejar una puntuación y comentario después de asistir al turno.
- **Servicios dinámicos** — cargar los servicios desde el backend en vez de tenerlos hardcodeados en services.js.
- **Galería de trabajos** — sección con fotos de trabajos realizados en el salón.
- **Integración con calendario** — exportar el turno al calendario del cliente (Google Calendar, iCal).
- **Turnos recurrentes** — reservar un turno semanal/mensual recurrente.

> Cada feature nueva se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.
