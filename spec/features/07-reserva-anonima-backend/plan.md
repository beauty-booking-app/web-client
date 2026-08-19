# 07 · Reserva anónima conectada al backend — Plan

_Cómo se implementa lo descrito en `spec.md`. Respeta `constitution/tech-stack.md`._

## Enfoque

Se agrega un módulo `lib/clientToken.js` que firma el JWT de reserva anónima (contrato documentado en `api-backend/ia-docs/frontend/jwt-client-token.md`), se conecta `api.js` para mandar `X-Client-Token` + datos del cliente, y `BookingPage` llama a `createAppointment` al confirmar. Sin nuevas dependencias si `crypto.subtle` nos alcanza para HMAC-SHA256 (ver decisión).

## Implementación

1. **Dependencia (a evaluar)** — firmar HS256 en navegador: `Web Crypto` (`crypto.subtle.importKey` + `sign`) calcula HMAC-SHA256 sin librerías y está disponible en todo navegador moderno (ES2020+, requiere contexto seguro HTTPS/localhost). Alternativa: instalar `jose`. **Se decide por Web Crypto** para no agregar dependencias (regla del `tech-stack.md`). — `src/lib/clientToken.js`.
2. **`src/lib/clientToken.js`** — helpers:
   - `base64UrlEncode(buffer)` / `base64UrlDecode(str)` manuales (sin `Buffer`, fijo en navegador).
   - `hmacSha256(secretB64?)` — o usar la clave como string; ver sección "clave" abajo.
   - `signJwt(payload, secret)` — header `{alg:'HS256', typ:'JWT'}`, payload, firma, string `header.payload.signature`.
   - `getClientToken()` — lee `localStorage` (`beauty-session-token`), decodifica payload para mirar `exp`; si válido lo devuelve; si no, firma nuevo y persiste.
   - `getOrCreateJti()` — `jti` persistente en `localStorage` (`beauty-session-jti`), creado con `crypto.randomUUID()`.
3. **`src/services/api.js`** —
   - `createAppointment` acepta `clientName`, `clientPhone`, `clientEmail` y usa `await getClientToken()` para el header `X-Client-Token`.
   - Envía `{ serviceTypeIds, date, startTime, referenceComment, clientName, clientPhone, clientEmail }`.
   - Mapeo de errores: 401 → "Tu sesión venció, volvé a intentarlo"; 400 `ClientDataRequired` → "Completá tus datos"; 409 `SlotUnavailable` → "Ese horario ya no está disponible, elegí otro".
   - Fallback mock: incluye los campos del cliente (para flujo offline).
4. **`vite-env.d.ts` / tipos** — tipar `import.meta.env.VITE_CLIENT_TOKEN_SECRET`.
5. **`src/pages/BookingPage.jsx`** — al pasar del paso 3 al 4, `onConfirm`:
   - Estado `submitting` y `submitError`.
   - Llama `createAppointment({ serviceTypeIds, date, startTime, clientName, clientPhone, clientEmail })`.
   - Éxito → muestra `StepConfirm` con el turno real (y `humanId`).
   - Error → muestra el mensaje de `submitError` y permite reintentar (sin avanzar a "confirmado").
   - En modo offline (sin backend) conserva la confirmación local actual.
6. **`src/pages/BookingPage.jsx`/`StepClient`** — `StepClient` ya captura `name/phone/email`; se pasa como `clientName/clientPhone/clientEmail` de `client`.
7. **Config** — `src/.env` (local) con `VITE_CLIENT_TOKEN_SECRET`; documentada en `.env.example` (sin valor real). No se commitea.

## Decisiones

- **Firma con Web Crypto (`crypto.subtle`), sin librería** — evita agregar dependencias (regla dura del `tech-stack.md`). HMAC-SHA256 es trivial de montar con `crypto.subtle`. Requiere contexto seguro (localhost y HTTPS de producción cumplen). Si Web Crypto no estuviera disponible (muy raro hoy), se evalúa `jose`.
- **Clave como string en `VITE_CLIENT_TOKEN_SECRET`** — el secreto se usa directamente como clave HMAC (bytes UTF-8). El backend valida contra el mismo string. Se permite hasta 64+ bytes para cumple el mínimo 32 recomendado por JWT.
- **El `jti` persiste** — a diferencia del token (que se re-emite), el `jti` es estable: otra sesión del mismo navegador mantiene sus citas.
- **`exp` de 90 días** — balance entre no romper sesiones y no tener tokens eternos.
- **Manejo de errores en el wizard** — clave porque el 409 indica que otro tomó el horario entre que se eligió y se confirmó; el usuario debe poder elegir otro o reintentar.

## Riesgos

- **`crypto.subtle` solo en contexto seguro** — en `http://` de red local (no localhost) fallaría; se documenta que producción va por HTTPS y dev por localhost.
- **Clave en el bundle** — es un token de reserva anónima (no autenticación fuerte); se acota a eso y se documenta.
- **`createAppointment` era dead code** — ahora tiene uso real; hay que asegurar que no rompa el flujo offline (fallback mock).
- **Dependencia nueva evitada** — si `crypto.subtle` no alcanzara para algún detalle del JWT (no es el caso), plan B es instalar `jose`.
