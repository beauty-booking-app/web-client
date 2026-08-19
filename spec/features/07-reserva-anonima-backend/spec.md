# 07 · Reserva anónima conectada al backend

**Estado:** propuesto 📝

## Qué hace

Conecta el wizard de reserva (feature 06) con el **backend real** y lo hace funcionar con la **reserva anónima** que el backend preparó en su feature 008. Tres piezas:

1. **Token de cliente firmado** — `src/lib/clientToken.js` genera y guarda en `localStorage` un **JWT firmado (HS256)** con la clave compartida (`VITE_CLIENT_TOKEN_SECRET`), con `sub="web-client"`, `jti` persistente, `exp` (90 días) y `client_version`. Reemite el token si está vencido.
2. **API conectada** — `src/services/api.js` manda el token en `X-Client-Token` y los datos del cliente (`clientName`, `clientPhone`, `clientEmail`) al crear la cita (`POST /appointments`).
3. **Wizard que crea la cita** — `src/pages/BookingPage.jsx` llama a `createAppointment` al confirmar (paso 3 → mostrar confirmación de éxito o error), y muestra los errores del backend (401/400/409).

## Por qué

Hoy el booking engine es puramente visual: `StepConfirm` solo muestra un resumen y `createAppointment` de `api.js` es código muerto (nunca se llama). Si el usuario confirma, **no se crea ningún turno en el backend**. La feature 008 del backend ya permite reservas anónimas (sin login) mediante el `X-Client-Token`; este es el lado frontend que lo usa.

## Criterios de aceptación

### Token de cliente
- [ ] `src/lib/clientToken.js` expone `getClientToken()`:
  - [ ] Devuelve el token válido de `localStorage` si existe y su `exp` no venció.
  - [ ] Si no existe / está vencido, firma uno nuevo con el `jti` persistente (o lo crea) y lo guarda.
- [ ] El `jti` se genera **una vez** y persiste en `localStorage` (la sesión no cambia entre re-emisiones).
- [ ] El token NO se loguea ni se guarda en ningún lugar que no sea `localStorage`.

### API
- [ ] `createAppointment` envía `X-Client-Token` y los campos `clientName`/`clientPhone`/`clientEmail` en el body.
- [ ] Ante `401` → error claro ("tu sesión venció"); ante `400 ClientDataRequired` → error claro; ante `409 SlotUnavailable` → error claro ("ese horario ya no está disponible").
- [ ] El fallback a mocks (`if (BASE_URL)`) se mantiene para cuando no haya backend, pero ya incluye los campos del cliente.

### Wizard
- [ ] Al confirmar (paso 3), `BookingPage` llama a `createAppointment` con los datos seleccionados.
- [ ] Si falla, muestra un mensaje de error accesible (no deja al usuario "confirmado" sin turno).
- [ ] Si la creación es exitosa, muestra la confirmación con el turno real (puede incluir `humanId`).
- [ ] No se rompe el flujo offline (sin backend → confirmación local como hasta ahora).

## Fuera de alcance

- Cancelar/reprogramar desde el cliente (backlog del web-client).
- Servicios dinámicos desde el backend (backlog del web-client) — acá solo se conecta la creación de la cita.
- Verificación de disponibilidad en vivo + validación de slots en el cliente (el backend ya la hace al crear; el 409 lo cubre).
- Cualquier cambio en el backend (`api-backend`).
