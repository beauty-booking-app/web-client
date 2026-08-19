# 07 · Reserva anónima conectada al backend — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

## Token de cliente
- [x] Crear `src/lib/clientToken.js` con:
  - [x] `base64UrlEncode` / `base64UrlDecode` (sin Buffer, para navegador).
  - [x] `hmacSha256(data, secret)` vía `crypto.subtle` (Web Crypto).
  - [x] `signJwt(payload, secret)` — header `{alg:'HS256', typ:'JWT'}` + firma.
  - [x] `getOrCreateJti()` — `jti` persistente en `localStorage` (`crypto.randomUUID()`).
  - [x] `getClientToken()` — reusa token de `localStorage` si `exp` no venció; si no, firma y persiste.

## API
- [x] `src/services/api.js` — `createAppointment` recibe `clientName`/`clientPhone`/`clientEmail`.
- [x] Envía header `X-Client-Token` (con `await getClientToken()`).
- [x] Body incluye `clientName`/`clientPhone`/`clientEmail` + los ids/fecha/hora actuales.
- [x] Mapeo de errores: 401, 400 (`ClientDataRequired`), 409 (`SlotUnavailable`) → mensajes claros en español.
- [x] Fallback mock mantiene los campos del cliente (flujo offline).

## Tipos / config
- [x] `VITE_CLIENT_TOKEN_SECRET` en `.env.example` (sin valor) y `.env.local` (dev, gitignored).
- [ ] Nota: el repo es JS (`.jsx`) sin `tsconfig.json`; `import.meta.env` funciona sin declaración de tipos, por lo que no se creó `vite-env.d.ts`.

## Wizard
- [x] `src/pages/BookingPage.jsx` — `handleConfirm` al confirmar (paso 3):
  - [x] Estado `submitting` / `submitError`.
  - [x] Llamar `createAppointment` con los datos seleccionados y los de `client`.
  - [x] Éxito → `StepConfirm` con el turno real (`humanId`).
  - [x] Error → `StepClient` muestra el mensaje (rol="alert") y permite reintentar; no avanza a "confirmado" si falló.
  - [x] Offline (sin backend) → conserva la confirmación local actual (fallback mock).

## Validación
- [x] `pnpm lint` sin errores.
- [x] `pnpm build` sin errores.
- [ ] `pnpm typecheck` — **falla pre-existente**: no hay `tsconfig.json` en el repo (todo el código es `.jsx`); no lo introduce esta feature.
- [ ] Smoke local con backend levantado + `VITE_CLIENT_TOKEN_SECRET` seteada (requiere backend y clave real; pendiente de ejecutar).
- [x] Actualizar `docs/CAMBIOS.md` y mover la feature a "Hecho" en `spec/constitution/roadmap.md`.

## Notas
- La firma HS256 es compatible con la del backend (PyJWT, `alg=HS256`, misma clave compartida).
- El `jti` es estable por navegador: aunque el token se re-emita al vencer, la sesión no cambia.
