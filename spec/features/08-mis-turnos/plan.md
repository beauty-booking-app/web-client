# 08 · Mis turnos — Plan

**Actualizado:** 2026-08-20 — alineado con backend feature 009

## Arquitectura

Página independiente con formulario de búsqueda + tarjeta de resultado + modales de cancelar/reprogramar. Consumo de los endpoints **públicos** del backend (sin autenticación).

### Estructura de archivos

```
src/
├── pages/
│   └── MyBookingsPage.jsx           ← nueva página
├── components/
│   ├── BookingLookup.jsx            ← formulario de búsqueda + resultado
│   ├── AppointmentCard.jsx          ← tarjeta del turno con acciones
│   ├── CancelAppointmentModal.jsx   ← modal de cancelación
│   ├── RescheduleModal.jsx          ← modal de reprogramación
│   └── Navbar.jsx                   ← modificado: se agrega botón "Mis turnos"
├── services/
│   └── api.js                       ← se agregan 3 funciones públicas
└── router/
    └── AppRouter.jsx                ← se agrega ruta /mis-turnos
```

### Routing

```jsx
// src/router/AppRouter.jsx
import MyBookingsPage from '../pages/MyBookingsPage'

// Se agrega:
<Route path="/mis-turnos" element={<MyBookingsPage />} />
```

### Navbar

```jsx
// src/components/Navbar.jsx
// Se agrega al lado del botón RESERVAR:
<a
  href="/mis-turnos"
  className="font-mono text-[10px] uppercase tracking-wide font-semibold text-foreground/60 hover:text-foreground transition-colors"
>
  Mis turnos
</a>
```

Se mantiene la jerarquía visual: "Mis turnos" es un link de texto, "RESERVAR" es el botón CTA principal.

### API — Endpoints públicos (feature 009 backend)

Los 3 endpoints son **públicos** (sin `X-Client-Token` ni Bearer). El `humanId` es el identificador público por diseño.

```js
// src/services/api.js

// GET — consulta del turno
export async function fetchAppointmentByHumanId(humanId) {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}`)
  if (!res.ok) {
    if (res.status === 404) {
      throw Object.assign(new Error('NotFound'), { code: 'NotFound' })
    }
    throw new Error('Error al buscar el turno')
  }
  return res.json()
}

// PATCH — cancelar (requiere verificationContact)
export async function cancelAppointmentByHumanId(humanId, { reason, verificationContact }) {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}/cancel`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason: reason || null, verificationContact }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    if (res.status === 403) {
      throw Object.assign(new Error('ContactMismatch'), { code: 'ContactMismatch', details: err?.details })
    }
    if (res.status === 409 && err?.error === 'CannotCancel') {
      throw Object.assign(new Error('CannotCancel'), { code: 'CannotCancel', details: err?.details })
    }
    throw new Error(err?.message || 'No se pudo cancelar el turno')
  }
  return res.json()
}

// POST — reprogramar (requiere verificationContact)
export async function rescheduleAppointmentByHumanId(humanId, { date, startTime, verificationContact }) {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}/reschedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, startTime, verificationContact }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    if (res.status === 403) {
      throw Object.assign(new Error('ContactMismatch'), { code: 'ContactMismatch', details: err?.details })
    }
    if (res.status === 409 && err?.error === 'SlotUnavailable') {
      throw Object.assign(new Error('SlotUnavailable'), { code: 'SlotUnavailable' })
    }
    if (res.status === 409 && err?.error === 'CannotReschedule') {
      throw Object.assign(new Error('CannotReschedule'), { code: 'CannotReschedule', details: err?.details })
    }
    throw new Error(err?.message || 'No se pudo reprogramar el turno')
  }
  return res.json()
}
```

**Nota:** no se necesita `getClientToken()` en estos endpoints — son públicos.

### BookingLookup — Componente

Componente que maneja el flujo de búsqueda:

1. **Estado:** `humanId` (input), `appointment` (resultado), `loading`, `error`, `notFound`.
2. **Input:** campo de texto con validación local (mínimo 1 char, formato alfanumérico, 6 chars).
3. **Submit:** llama a `fetchAppointmentByHumanId`, maneja respuesta/error.
4. **Resultado:** renderiza `AppointmentCard` si existe, o mensajes de error/not found.

### AppointmentCard — Tarjeta del turno

Muestra la info del turno y las acciones disponibles:

- **Header:** Código del turno (`humanId`) con estilo mono + badge de estado.
- **Servicios:** lista con nombre y precio de cada servicio.
- **Detalle:** fecha, hora, duración total, precio total.
- **Cliente:** nombre.
- **Acciones:** botones "Cancelar" y "Reprogramar" (habilitados según el estado del turno y `cancellation_eligibility` si viene en la respuesta).

### CancelAppointmentModal — Modal de cancelación

- **Campos:** textarea para motivo (opcional), input para email o teléfono de verificación.
- **Envío:** llama a `cancelAppointmentByHumanId` con `reason` y `verificationContact`.
- **Errores:** `ContactMismatch` → "El dato de contacto no coincide con el registrado.", `CannotCancel` → mostrar motivo del backend.
- **Éxito:** cerrar modal, actualizar estado del turno en la tarjeta.

### RescheduleModal — Modal de reprogramación

- **Campos:** input de fecha (type date), select/input de horario, input para email o teléfono de verificación.
- **Nota:** el frontend puede reutilizar `fetchAvailableDates` y `fetchSlots` de `api.js` para mostrar horarios disponibles, o delegar la validación al backend (`409 SlotUnavailable`).
- **Envío:** llama a `rescheduleAppointmentByHumanId` con `date`, `startTime` y `verificationContact`.
- **Errores:** `ContactMismatch` → "El dato de contacto no coincide.", `SlotUnavailable` → "Ese horario ya no está disponible.", `CannotReschedule` → mostrar motivo.
- **Éxito:** cerrar modal, actualizar tarjeta con nueva fecha/hora y estado "reprogramado".

### Estilos

Se usan los tokens CSS existentes del proyecto:
- Fondo: `var(--background)`
- Borde: `var(--border)`
- Texto principal: `var(--foreground)`
- Acento de estado: `var(--accent)` para confirmados, `var(--primary)` para pendientes.
- Cards: `rounded-2xl`, `border border-border`, `bg-card` (si existe) o `bg-white`.
- Botones: mismo estilo del botón RESERVAR del navbar.
- Modales: overlay con `bg-black/50`, contenido centrado, `rounded-2xl`.

### Accesibilidad

- `aria-label="Código de seguimiento"` en el input de búsqueda.
- `role="alert"` en mensajes de error y not found.
- Focus automático en el input al cargar la página.
- Botón "Buscar" deshabilitado mientras se carga.
- Target mínimo 44px en todos los elementos interactivos.
- Modales: focus trap, escape para cerrar, `aria-labelledby`.
