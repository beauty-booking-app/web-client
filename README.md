# Tammi · Salón de belleza

Web app para un salón de belleza de barrio: landing con catálogo de servicios y
sistema de reservas de turnos online, sin necesidad de crear cuenta.

## Funcionalidades

- **Landing page** (`/`): hero, catálogo interactivo por categoría (corte unisex,
  tratamientos capilares, color y uñas), sección "nosotras" y contacto.
- **Reserva de turnos** (`/reserva`): wizard de 3 pasos — selección de servicios,
  fecha y horario según disponibilidad del backend, y datos de contacto. Reserva
  anónima firmada con un token propio del navegador.
- **Mis turnos** (`/mis-turnos`): consulta de un turno por código, con opciones
  para reprogramar o cancelar verificando email o teléfono.

## Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev) (SPA)
- [React Router v7](https://reactrouter.com) — rutas `/`, `/reserva`, `/mis-turnos`
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — formulario y validación del paso de datos
- [Tailwind CSS 4](https://tailwindcss.com) — estilos vía plugin de Vite
- [Lucide React](https://lucide.dev) — íconos
- Fuentes self-hosteadas con [@fontsource](https://fontsource.org) (Fraunces + Nunito Sans variables)

No hay base de datos ni backend propio: el frontend consume una API REST externa.

## Requisitos

- Node.js 20+
- [pnpm](https://pnpm.io) 10+

## Puesta en marcha

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local

# 3. Levantar el servidor de desarrollo
pnpm dev
```

Por defecto la app apunta al backend de producción. Para desarrollo local,
descomentá `VITE_API_URL` en `.env.local` y apuntalo a tu backend.

### Scripts

| Comando        | Descripción                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Servidor de desarrollo con HMR       |
| `pnpm build`   | Build de producción en `dist/`       |
| `pnpm start`   | Sirve el build de producción         |
| `pnpm lint`    | ESLint                               |
| `pnpm typecheck` | Chequeo de tipos TypeScript        |

### Variables de entorno

| Variable                   | Descripción                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `VITE_API_URL`             | URL base del backend. Si falta, se usa la URL de producción.        |
| `VITE_CLIENT_TOKEN_SECRET` | Clave compartida para firmar el token de reserva anónima. Debe coincidir con el backend (`openssl rand -hex 32`). |

## Estructura del proyecto

```
src/
├── assets/            # Imágenes y fuentes
├── components/        # Componentes de UI reutilizables
│   └── booking/       # Pasos del wizard de reserva
├── context/           # Estado global liviano (servicios seleccionados)
├── hooks/             # Custom hooks (ej. useServices)
├── lib/               # Utilidades (token de reserva anónima)
├── pages/             # LandingPage, BookingPage, MyBookingsPage
├── router/            # Configuración de React Router (lazy loading por ruta)
├── services/          # Cliente HTTP contra la API
└── index.css          # Tokens de diseño y estilos globales (Tailwind 4)
```

## Documentación

- [`AGENTS.md`](./AGENTS.md) — contexto para asistentes de código, convenciones y flujo de trabajo.
- [`docs/ARQUITECTURA.md`](./docs/ARQUITECTURA.md) — decisiones de arquitectura.
- [`docs/CONVENCIONES.md`](./docs/CONVENCIONES.md) — reglas detalladas del proyecto.
- [`docs/CAMBIOS.md`](./docs/CAMBIOS.md) — registro de cambios por feature.
