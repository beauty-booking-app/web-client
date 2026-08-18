# Arquitectura de Web-app

## Estructura del proyecto

```
web-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                # Imágenes, íconos SVG, fuentes
│   ├── components/            # Componentes de UI
│   │   ├── Hero.jsx           # Hero full-screen con CTA
│   │   ├── ServiceMonolith.jsx# Catálogo de servicios con tabs por categoría
│   │   ├── BookingEngine.jsx  # Wizard de reserva full-screen (3 pasos)
│   │   ├── About.jsx          # Sección "Sobre nosotras"
│   │   ├── FloatingNav.jsx    # Nav flotante superior + rail inferior
│   │   ├── Footer.jsx         # Footer con contacto, ubicación, horarios
│   │   ├── ScrollToTop.jsx    # Scroll-to-top / hash al navegar
│   │   ├── GoogleIcon.jsx     # Ícono SVG de Google
│   │   └── ui/                # Componentes Shadcn UI
│   ├── context/               # Estado global liviano (ej. servicio seleccionado)
│   │   └── BookingContext.tsx
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Lógica compartida
│   │   ├── services.js        # Catálogo de servicios (datos estáticos)
│   │   ├── utils.js           # Funciones auxiliares (cn/clsx)
│   ├── pages/                 # Las 2 páginas principales de la app
│   │   ├── ServicesPage.tsx
│   │   ├── BookingPage.tsx
│   │   └── PageNotFound.jsx   # Página no encontrada
│   ├── router/                # Configuración de rutas (React Router)
│   │   └── AppRouter.tsx
│   ├── services/              # Cliente API y peticiones HTTP
│   │   └── api.ts
│   ├── types/                 # Interfaces y tipos de TypeScript
│   ├── utils/                 # Funciones auxiliares (formateo de fechas, precios)
│   ├── App.jsx                # Componente raíz
│   ├── main.jsx               # Punto de entrada de React
│   └── index.css              # Estilos globales, variables CSS, Tailwind, fuentes
├── docs/                      # Documentación del proyecto
│   ├── ARQUITECTURA.md
│   ├── CONVENCIONES.md
│   └── CAMBIOS.md
├── spec/                     # Spec driven development
│   ├── constitution/         # misión, tech-stack, roadmap
│   └── features/             # spec, plan, tasks por feature
├── package.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── components.json            # Configuración de Shadcn UI
└── jsconfig.json
```

## Flujo de datos

1. `src/lib/services.js` define el catálogo de servicios: 4 categorías (Corte, Tratamientos, Color, Uñas) con sus servicios, imágenes y descripciones. También define los `TIME_SLOTS` (09:00–19:00, sin 13:00).
2. `Home.jsx` maneja el estado de la reserva.
3. `ServiceMonolith` consume el catálogo y expone `onToggleService` para seleccionar/quitar servicios.
4. `BookingEngine` recibe `preselectedServices` y gestiona el wizard de 3 pasos:
   - Paso 1: Selección de servicios (multi-select)
   - Paso 2: Selección de fecha (próximos 14 días) y hora (slots disponibles)
   - Paso 3: Datos del cliente (nombre, email, teléfono, notas)
5. Al confirmar, `BookingEngine` envía los datos al backend.
6. `FloatingNav` muestra la barra superior fija con el nombre del salón y botón "Reservar", y un rail inferior con accesos directos por categoría.


## Routing

| Ruta       | Descripción          | Componente principal |
|------------|----------------------|----------------------|
| `/`        | Landing page         | `Home`               |
| `/reserva` | Reserva              | `Home`               |
| `*`        | Página no encontrada | `PageNotFound`       |


## Modelo de datos

### Appointment (Turno)

| Campo              | Tipo           | Requerido | Descripción                                                |
|--------------------|----------------|-----------|------------------------------------------------------------|
| `client_name`      | string         | sí        | Nombre y apellido del cliente                              |
| `client_email`     | string (email) | sí        | Email del cliente                                          |
| `client_phone`     | string         | no        | Teléfono del cliente                                       |
| `services`         | string[]       | sí        | Lista de nombres de servicios seleccionados                |
| `appointment_date` | string (date)  | sí        | Fecha del turno (YYYY-MM-DD)                               |
| `appointment_time` | string         | sí        | Hora del turno (HH:MM)                                     |
| `notes`            | string         | no        | Comentarios o preferencias del cliente                     |
| `status`           | enum           | sí        | `pending` / `confirmed` / `cancelled` (default: `pending`) |


## Catálogo de servicios

| Categoría                  | Servicios                                                 |
|----------------------------|-----------------------------------------------------------|
| **Corte Unisex**           | Corte Dama, Corte Caballero, Corte Niño                   |
| **Tratamientos Capilares** | Nutrición, Botox Capilar, Anti Frizz, Alisado, Permanente |
| **Color**                  | Color Global, Mechas en Gorro, Banda                      |
| **Uñas**                   | Semipermanente, Kapping, Soft Gel                         |

Horarios disponibles: turnos horarios de 09:00 a 19:00 (sin turno a las 13:00).


## Dependencias principales

- **React 19.2** — Framework UI
- **Vite 8.1** — Build tool y dev server
- **React Router DOM 19.2** — Routing client-side
- **Tailwind CSS 4** — Utility-first CSS
- **Shadcn UI** — Componentes de UI (new-york style, neutral)
- **Lucide React** — Íconos
- **Framer Motion** — Animaciones (instalado, uso parcial)
- **React Hook Form + Zod** — Formularios y validación
- **date-fns / dayjs** — Utilidades de fechas (instalados, no usados activamente)

### Fuentes tipográficas

- **Fraunces** — Tipografía de display/headings
- **Nunito Sans** — Tipografía de cuerpo

## Paleta de colores

| Token          | Valor                 | Uso                              |
|----------------|-----------------------|----------------------------------|
| `--primary`    | `hsl(14, 52%, 56%)` | Terracota — botones, acentos     |
| `--accent`     | `hsl(90, 22%, 50%)` | Sage — confirmaciones, checks    |
| `--background` | `hsl(30, 33%, 97%)` | Crema — fondo principal          |
| `--card`       | `hsl(36, 40%, 98%)` | Crema claro — fondos de tarjetas |
| `--border`     | `hsl(32, 25%, 84%)` | Beige — bordes y separadores     |
| `--foreground` | `hsl(25, 35%, 22%)` | Marrón oscuro — texto principal  |
