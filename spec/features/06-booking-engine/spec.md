# 06 · Booking engine

**Estado:** propuesta
**Autor:** opencode
**Fecha:** 2026-07-22

## Resumen

Wizard full-screen de 3 pasos para reservar un turno: selección de servicios → selección de fecha/hora → datos del cliente, con pantalla de confirmación visual. Es una página independiente (`/reserva`) accesible desde el CTA del navbar, hero y pre-footer banner.

## Datos existentes

- **`SERVICE_CATEGORIES`** y **`ALL_SERVICES`** en `src/lib/services.js`.
- **`TIME_SLOTS`**: horarios disponibles (`["09:00", "10:00", ..., "19:00"]`).
- No hay backend: el estado se maneja en memoria (no persiste).

## Contexto técnico

- **Página independiente:** `/reserva` con React Router.
- **Routing:** Se necesita configurar React Router en `App.jsx` (landing en `/`, booking en `/reserva`).
- **Estado del wizard:** Contexto o estado elevado para compartir datos entre pasos.
- **Validación:** Zod + React Hook Form para el paso de datos del cliente.
- **Full-screen:** La página ocupa toda la ventana, sin el navbar ni footer de la landing.
- **Sin backend:** La confirmación es visual, no se guarda en ningún lado.

## Criterios de aceptación

1. La ruta `/reserva` renderiza el wizard full-screen.
2. El wizard tiene 3 pasos visibles: Servicios → Fecha/Hora → Datos.
3. **Paso 1 (Servicios):** el usuario selecciona uno o más servicios de la lista. Se muestra el total de servicios seleccionados. Botón "Siguiente" habilitado solo si hay al menos 1 servicio.
4. **Paso 2 (Fecha/Hora):** se muestra una grilla de fechas (próximos 14 días) y horarios disponibles (`TIME_SLOTS`). El usuario selecciona 1 fecha y 1 horario. Botón "Siguiente" habilitado solo si hay fecha + hora.
5. **Paso 3 (Datos):** formulario con nombre, teléfono y email. Validado con Zod. Botón "Confirmar" habilitado solo si el formulario es válido.
6. **Confirmación:** pantalla de éxito con resumen del turno (servicios, fecha, hora, nombre). Botón "Volver al inicio".
7. El usuario puede navegar entre pasos con botones "Atrás" / "Siguiente".
8. Los pasos completados se muestran con un check visual.
9. Full-screen: sin navbar ni footer de la landing.
10. `pnpm build` y `pnpm lint` pasan sin errores.
11. `prefers-reduced-motion: reduce` desactiva transiciones.
12. Accesibilidad: `aria-label` en botones, `role` semánticos, errores de formulario anunciados.

## Fuera de alcance

- Persistencia de datos (backend, localStorage).
- Disponibilidad real de turnos (se asume que todos los slots están libres).
- Envío de confirmación por email/WhatsApp.
- Modificación o cancelación de turnos.
