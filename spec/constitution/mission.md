# Misión

## Qué construimos

M&M(web-app) es una landing page y sistema de reservas para un salón de barrio de peluquería y manicura. Resuelve el problema de agendar turnos de forma simple: el cliente ve los servicios, elige fecha y hora, y reserva en pocos pasos sin necesidad de llamar por teléfono.

Las piezas principales del producto son:

1. **Landing page descriptiva** — presenta los servicios, la filosofía del salón y la información de contacto con un diseño cálido y cercano.
2. **Catálogo de servicios** — muestra las 4 categorías (Corte, Tratamientos, Color, Uñas) con tabs, imágenes y selección múltiple de servicios.
3. **Booking engine** — wizard full-screen de 3 pasos para reservar un turno: selección de servicios → fecha y hora → datos del cliente, con confirmación visual.
4. **Consulta de turnos** — página `/mis-turnos` donde el cliente consulta el estado de su turno con el código de seguimiento (`humanId`).

## Para quién

- **Clientes del salón** — personas del barrio que buscan reservar un turno de peluquería o manicura de forma rápida y sin llamadas.
- **Dueña del salón** — quien recibe las reservas en el backend y gestiona la agenda (rol admin en el sistema).

## Principios

- **Simplicidad sobre elegancia** — la reserva tiene que ser más rápida que mandar un WhatsApp. Tres pasos, sin fricción.
- **Cercanía de barrio** — el tono del contenido, la paleta de colores y la tipografía transmiten calidez, no sofisticación corporativa.
- **Accesibilidad first** — targets de 44px, navegación por teclado, focus visible, respeto de `prefers-reduced-motion`. Cualquier persona tiene que poder usarlo.
- **Contenido en español argentino** — todo lo que ve el usuario está en español local, con el tono de un salón de barrio.
- **Estado mínimo en el frontend** — la lógica de reserva se resuelve en el backend; el frontend solo orquesta la UI y envía los datos.

## Qué NO es

- No es un sistema de gestión de salón (no tiene panel admin, reportes ni gestión de stock).
- No es una app de e-commerce ni vende productos.
- No es un marketplace de salones: es para un único salón.
- No maneja pagos ni integración con pasarelas de pago.
- No tiene sistema de notificaciones push, recordatorios ni recordatorios por SMS/email (está en backlog).
- No tiene autenticación de usuario para los clientes en la landing actual.
