# Registro de cambios

## 01 · Landing page

- Configurado Tailwind CSS 4 como plugin de Vite (`@tailwindcss/vite`).
- Actualizado `index.html`: `lang="es"`, título "M&M Peluquería", Google Fonts (Fraunces + Nunito Sans).
- Reescrito `src/index.css`: tokens CSS del proyecto (`--primary`, `--accent`, `--background`, `--foreground`), utilidades `.reveal` y `.lift-card`, soporte `prefers-reduced-motion`.
- Creado `src/components/Hero.jsx`: sección full-screen con imagen difuminada, overlay sepia/rosado, grid 2 columnas, volanta, título, bajada, 2 botones CTA.
- Creado `src/components/About.jsx`: sección con fondo crema, layout asimétrico, volanta, título, párrafo, 3 tarjetas con íconos SVG.
- Reemplazado `src/App.jsx`: eliminado boilerplate de Vite, importados Hero y About.
- Eliminado `src/App.css`.

## 02 · Navbar

- Creado `src/components/Navbar.jsx`: nav fijo arriba, "M&M" a la izquierda, botón CTA "Reservá tu turno" a la derecha, fondo transparente.
- Agregado `scroll-padding-top: 80px` en `src/index.css` para compensar el nav fijo.
- Importado `<Navbar />` en `src/App.jsx` antes de `<Hero />`.

## 03 · Catálogo de servicios

- Creado `src/components/ServiceCatalog.jsx`: sección interactiva con pestañas por categoría, grid 2 columnas (imagen dinámica + lista de servicios), animaciones `.reveal` y `.lift-card`.
- Importado `<ServiceCatalog />` en `src/App.jsx` entre `<Hero />` y `<About />`.

## 04 · Pre-Footer Banner

- Creado `src/components/PreFooterBanner.jsx`: sección CTA con fondo terracota, volanta + título a la izquierda, botón "Reservá tu turno" a la derecha apuntando a `/reserva`.
- Importado `<PreFooterBanner />` en `src/App.jsx` debajo de `<About />`.

## 05 · Footer

- Creado `src/components/Footer.jsx`: footer con fondo marrón oscuro, grilla 4 columnas (Marca, Servicios, Contacto, Redes), barra inferior con crédito.
- Importado `<Footer />` en `src/App.jsx` como último elemento.

## 06 · Booking engine

- Configurado React Router en `src/router/AppRouter.jsx` con rutas `/` (landing) y `/reserva` (booking).
- Movido contenido de la landing a `src/pages/LandingPage.jsx`.
- Creado `src/pages/BookingPage.jsx`: wizard full-screen de 3 pasos con estado compartido.
- Creado `src/components/booking/StepServices.jsx`: selección múltiple de servicios con toggle.
- Creado `src/components/booking/StepDateTime.jsx`: grilla de 14 días + horarios de `TIME_SLOTS`.
- Creado `src/components/booking/StepClient.jsx`: formulario con React Hook Form + Zod.
- Creado `src/components/booking/StepConfirm.jsx`: resumen del turno + botón "Volver al inicio".
- Actualizado `src/App.jsx` para importar `<AppRouter />`.


## 07 · Reserva anónima conectada al backend

- Creado `src/lib/clientToken.js`: firma el JWT de reserva anónima (HMAC-SHA256 con Web Crypto) usando `VITE_CLIENT_TOKEN_SECRET`; persiste el `jti` y el token en `localStorage`; reemite el token si venció (`exp` 90 días). Claims: `sub=web-client`, `jti`, `client_version`, `iat`, `exp`.
- Actualizado `src/services/api.js`: `createAppointment` ahora envía el header `X-Client-Token` y los datos del cliente (`clientName`/`clientPhone`/`clientEmail`); mapea errores del backend (401, 400 ClientDataRequired, 409 SlotUnavailable) a mensajes claros; el fallback offline conserva los campos del cliente.
- Actualizado `src/pages/BookingPage.jsx`: al confirmar (paso 3) llama `createAppointment`; maneja estados `submitting`/`submitError`; muestra el error y permite reintentar; en éxito pasa a la confirmación con el turno real.
- Actualizado `src/components/booking/StepClient.jsx`: muestra el error de creación (rol="alert"), deshabilita el botón mientras reserva ("Reservando…").
- Actualizado `src/components/booking/StepConfirm.jsx`: muestra el `humanId` real del turno cuando la creación es exitosa.
- Agregado `VITE_CLIENT_TOKEN_SECRET` a `.env.example` (sin valor) y `.env.local` (dev, gitignored).

## 08 · Mis turnos

- Creado `src/pages/MyBookingsPage.jsx`: página `/mis-turnos` con layout, título, botón "Volver al inicio" y componente `BookingLookup`.
- Creado `src/components/BookingLookup.jsx`: formulario de búsqueda por `humanId` (input alfanumérico + botón), maneja estados loading/error/notFound/result. Focus automático al montar.
- Creado `src/components/AppointmentCard.jsx`: tarjeta del turno con humanId, badge de estado (6 estados con colores), cliente, fecha/hora, duración, lista de servicios con precios, total, y botones "Reprogramar"/"Cancelados" condicionados por el estado.
- Creado `src/components/CancelAppointmentModal.jsx`: modal con textarea de motivo (opcional), input de verificación (email o teléfono), manejo de errores 403 ContactMismatch y 409 CannotCancel.
- Creado `src/components/RescheduleModal.jsx`: modal con inputs de fecha/horario, input de verificación, manejo de errores 403 ContactMismatch, 409 SlotUnavailable y 409 CannotReschedule.
- Actualizado `src/services/api.js`: agregadas 3 funciones públicas (sin `X-Client-Token`) — `fetchAppointmentByHumanId` (GET), `cancelAppointmentByHumanId` (PATCH), `rescheduleAppointmentByHumanId` (POST). Mapeo de errores del backend feature 009.
- Actualizado `src/router/AppRouter.jsx`: agregada ruta `/mis-turnos`.
- Actualizado `src/components/Navbar.jsx`: agregado botón de texto "Mis turnos" al lado del botón RESERVAR.

## 08b · Validación de disponibilidad antes de confirmar

- Creado `src/services/api.js` → `validateSlot`: llama a `GET /availability/validate` antes de crear la cita. Lanza `SlotUnavailable` cuando el horario ya no está libre.
- Creado `src/components/booking/SlotUnavailableModal.jsx`: modal que informa que el turno no está disponible y ofrece dos opciones — "Elegir otro turno" (vuelve al paso 1 del stepper) o "Volver al inicio" (redirige a la landing).
- Actualizado `src/pages/BookingPage.jsx`: `handleConfirm` ahora valida la disponibilidad con `validateSlot` antes de llamar a `createAppointment`. Si la validación falla con `SlotUnavailable`, abre el modal. Al reprogramar se limpian fecha/hora y se vuelve al paso 1. Al elegir volver al inicio se limpian los servicios seleccionados y se navega a `/`.
