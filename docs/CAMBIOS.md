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

