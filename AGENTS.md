# AGENTS.md - Web-app

Sitio web para un salón de belleza. 
Está conformada por una landing page para mostrar los servicios y un sistema de
reservas para agendar una cita.
Está dirigido a cualquier usuario que desee usar los servicios del salón.

## Stack

- **React + Vite.js** (SPA)
- **React Router v6+**
- **Zod + React Hook Form**
- **Tailwind CSS 4**
- **Lucide React** (íconos)
- **TypeScript**
- **pnpm** como package manager


No hay base de datos.

## Comandos

```bash
pnpm dev        # servidor de desarrollo
pnpm build      # build de producción
pnpm start      # iniciar servidor de producción
```

## Estructura del proyecto
```
web-app/
├── public/
│   ├── favicon.ico
│   └── vite.svg
├── src/
│   ├── assets/                # Imágenes, íconos SVG, fuentes
│   ├── components/            # Componentes reutilizables de UI
│   ├── context/               # Estado global liviano (ej. servicio seleccionado)
│   │   └── BookingContext.tsx
│   ├── hooks/                 # Custom Hooks (lógica separada de la UI)
│   ├── pages/                 # Las 2 páginas principales de la app
│   │   ├── ServicesPage.tsx
│   │   └── BookingPage.tsx
│   │   └── PageNotFound.jsx   # Página no encontrada
│   ├── router/                # Configuración de rutas (React Router)
│   │   └── AppRouter.tsx
│   ├── services/              # Cliente API y peticiones HTTP
│   │   └── api.ts
│   ├── types/                 # Interfaces y tipos de TypeScript
│   ├── utils/                 # Funciones auxiliares (formateo de fechas, precios)
│   ├── App.tsx                # Componente raíz
│   ├── index.css              # Estilos globales (Tailwind / CSS)
│   ├── main.tsx               # Punto de entrada principal
│   └── vite-env.d.ts          # Declaraciones de tipos para Vite
├── docs/                     # Documentación
├── spec/                     # Spec driven development
│   ├── constitution/         # misión, tech-stack, roadmap
│   └── features/             # spec, plan, tasks por feature
├── AGENTS.md
├── .env.example               # Plantilla para variables de entorno (ej. VITE_API_URL)
├── .eslintrc.cjs              # Reglas de linter
├── index.html                 # Plantilla HTML principal
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración de TypeScript
└── vite.config.ts             # Configuración de Vite

```

## Convenciones

- Todo el contenido visible en español.
- Interfaces compartidas en `src/types/`.
- Seguir `docs/CONVENCIONES.md` para reglas detalladas.
- Documentar cambios en `docs/CAMBIOS.md`.

## No hagas

- No instalar dependencias sin avisar.
- No usar `any` en TypeScript sin justificarlo.


## Herramientas

- **Context7**: Usar `context7_resolve-library-id` y `context7_query-docs` para consultar documentación actualizada de cualquier librería o framework antes de implementar.
- **frontend-design**: Usar la skill `frontend-design` para tareas de UI/visual. Cargar con `skill("frontend-design")` antes de diseñar o implementar componentes visuales.
- **react-best-practices**: Usar la skill `react-best-practices` al definir modelos de datos, props de componentes, respuestas de la API y contratos de validación.
- **typescript-best-practices**: Usar la skill `typescript-best-practices` para autocompletado, tipos estrictos y prevención de bugs silenciosos.
- **api-security-best-practices**: Usar la skill `api-security-best-practices` al definir la api.

## Flujo de trabajo

1. **Spec primero:** para cada feature, crear `spec/features/NN-nombre/` con `spec.md`, `plan.md` y `tasks.md`. Esperar a que el usuario revise y dé OK antes de tocar código.
2. **Implementar solo con OK:** una vez aprobado el spec, implementar las tareas de `tasks.md` de a una.
3. **Una tarea a la vez; al terminar**, decir qué se cambió para que el usuario lo revise.
4. **Si no estás seguro al 80%,** preguntar. No inventar.
5. **Al terminar,** marcar las tareas en `tasks.md`, mover la feature a "Hecho" en `roadmap.md` y actualizar documentación.

## Documentación

- Referencias a más reglas, contexto, documentación y especificaciones.

## Datos de la app

- **Entorno:** Single Page Application (SPA) construida con **React + Vite**.
- **Restricción Clave:** NO estamos usando un framework full-stack (como Next.js). Todo el código corre en el cliente.
- **Backend/API:** Consumo de APIs externas vía HTTP.

- 4 servicios: CORTE UNISEX, TRATAMIENTOS CAPILARES, COLOR y UÑAS.
- por ahora la memoria no persiste.
- Routing: `/` (landing page con todos los servicios), `/reserva` (para reserva de citas).
- Accesibilidad: aria-labels, focus-visible, roles semánticos.

Cómo usarla:
1. **Antes de implementar**, leer la `constitution/` para no contradecirla.
2. **Para una feature nueva**, crear `spec/features/NN-nombre/` (siguiente número libre) con `spec.md` → `plan.md` → `tasks.md`.
3. **Esperar OK del usuario** antes de escribir código.
4. **Al terminar**, marcar las tareas en `tasks.md` y mover la feature a "Hecho" en `roadmap.md`.
5. La constitución manda: si una feature choca con `mission.md` o `tech-stack.md` (p. ej. pide un build o una dependencia) se replantea la feature, no la constitución.