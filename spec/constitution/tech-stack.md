# Tech stack y convenciones


## Tecnologías

- **Lenguaje:** TypeScript
- **Framework / runtime:** React 19.2, Vite 8.1, Tailwind CSS 4
- **Íconos:** Lucide React
- **Base de datos:** Backend externo. Entidades definidas en `src/entities/` como JSON schemas (`Appointment`).
- **Tests:** ninguno
- **Despliegue:** Vía `vite build`.
- **pnpm** como package manager


## Archivos / módulos clave

- `src/main.jsx` — Punto de entrada: renderiza `<App />` en el DOM.
- `src/App.jsx` — Componente raíz: importa y renderiza las secciones de la landing (Hero, About).
- `src/components/Hero.jsx` — Sección hero full-screen: imagen difuminada, overlay cálido, grid 2 columnas, CTA.
- `src/components/About.jsx` — Sección About: fondo crema, layout asimétrico, tarjetas con íconos.
- `src/components/ServiceCatalog.jsx` — Catálogo de servicios: pestañas por categoría, imagen dinámica, lista de servicios.
- `src/components/PreFooterBanner.jsx` — Banner CTA: fondo terracota, volanta + título, botón "Reservá tu turno".
- `src/components/Footer.jsx` — Footer: fondo marrón oscuro, grilla 4 columnas, barra inferior.
- `src/components/booking/StepServices.jsx` — Paso 1 del wizard: selección de servicios.
- `src/components/booking/StepDateTime.jsx` — Paso 2 del wizard: selección de fecha/hora.
- `src/components/booking/StepClient.jsx` — Paso 3 del wizard: formulario con Zod.
- `src/components/booking/StepConfirm.jsx` — Confirmación del turno.
- `src/pages/LandingPage.jsx` — Página de la landing page.
- `src/pages/BookingPage.jsx` — Página del wizard de reserva.
- `src/router/AppRouter.jsx` — Configuración de rutas (React Router).
- `src/components/Navbar.jsx` — Nav fijo flotante: logo "M&M", botón CTA, fondo transparente.
- `src/lib/services.js` — Catálogo estático de servicios: 4 categorías, 16 servicios, time slots.
- `src/entities/Appointment.jsonc` — Schema JSON de la entidad Appointment.
- `src/index.css` — Estilos globales: Tailwind import, tokens CSS (paleta, tipografía), utilidades `.reveal`, `.lift-card`.

## Comandos

```bash
pnpm dev        # arranca el dev server de Vite
pnpm build      # compila para producción
pnpm start      # sirve la build de producción (alias de preview)
pnpm lint       # revisa estilo con ESLint
pnpm lint:fix   # corrige automáticamente lo que pueda
pnpm typecheck  # chequeo de tipos con TypeScript (solo lectura, no compila)
pnpm preview    # vista previa de la build de producción
```

## Modelo de datos / dominio

### Appointment (Turno)

| Campo | Tipo | Reglas |
|-------|------|--------|
| `client_name` | string | Requerido. Nombre y apellido. |
| `client_email` | string (email) | Requerido. Email del cliente. |
| `client_phone` | string | Opcional. Teléfono con formato argentino. |
| `services` | string[] | Requerido. Lista de nombres de servicios (no IDs). |
| `appointment_date` | string | Requerido. Formato `YYYY-MM-DD`. |
| `appointment_time` | string | Requerido. Formato `HH:MM`. Debe pertenecer a `TIME_SLOTS`. |
| `notes` | string | Opcional. Comentarios o preferencias. |
| `status` | enum | `pending` / `confirmed` / `cancelled`. Default: `pending`. |

### Catálogo de servicios (estático en `services.js`)

Cada categoría tiene: `id`, `label`, `pillar`, `description`, `image`, `texture` y un array de `services` (cada uno con `id`, `name`, `desc`). Los services se aplanan en `ALL_SERVICES` agregando `category` y `categoryId`.

`TIME_SLOTS`: 10 turnos horarios de 09:00 a 19:00, sin 13:00.

## Convenciones

- **Idioma:** todo el contenido visible al usuario en español argentino.
- **Nombres de archivos:** componentes en PascalCase (`BookingEngine.jsx`), utilidades en kebab-case (`app-params.js`), hooks en kebab-case con prefijo `use-` (`use-mobile.jsx`).
- **Imports:** usar alias `@/` mapeado en `tsconfig.json` (ej. `@/components/ui/button`, `@/lib/services`).
- **Formularios:** React Hook Form + Zod (paquetes ya instalados: `react-hook-form`, `zod`, `@hookform/resolvers`).
- **Estilos:** Tailwind CSS 4 utility-first vía `@tailwindcss/vite`. No hay CSS modules ni styled-components.
- **Accesibilidad:** `aria-label`, `aria-pressed`, `aria-modal`, `role="dialog"`, targets mínimo 44px, `prefers-reduced-motion` respetado.
- **No hay tests:** la validación es lint + typecheck. Si se agregan tests en el futuro, usar Vitest.

## Estilo visual

- **Paleta:** terracota (`--primary: hsl(14, 52%, 56%)`) para botones/accent, sage (`--accent: hsl(90, 22%, 50%)`) para confirmaciones, crema (`--background: hsl(30, 33%, 97%)`) para fondos, marrón oscuro (`--foreground: hsl(25, 35%, 22%)`) para texto.
- **Tipografías:** Fraunces (display/headings) + Nunito Sans (cuerpo), cargadas desde Google Fonts.
- **Tokens:** usar las variables CSS definidas en `index.css` (`--primary`, `--accent`, `--background`, `--foreground`, etc.) en vez de valores hardcodeados.
- **Layout:** padding lateral `px-[6%] sm:px-[8%]` consistente en todas las secciones. Breakpoints de Tailwind (sm, lg).
- **Animaciones:** `.reveal` (fade-in + slide-up on scroll), `.lift-card` (hover elevación), transiciones escalonadas en Hero. Respetar `prefers-reduced-motion: reduce`.
- **Border radius:** `rounded-full` para botones, `rounded-2xl` para cards, `rounded-3xl` para imágenes grandes.

## Límites duros

- No agregar dependencias sin evaluar. Verificar antes de instalar algo nuevo.
- No commitear `.env*` ni `node_modules/`.
- No hardcodear valores de colores: usar las variables CSS de `index.css`.
- No romper la paleta ni la tipografía sin actualizar las variables CSS en `index.css`.
- No desactivar la accesibilidad (targets 44px, aria labels, reduced-motion).
- No cambiar el idioma del contenido visible al usuario (siempre español argentino).
- No montar rutas nuevas sin verificar que el componente esté importado en `App.jsx`.
