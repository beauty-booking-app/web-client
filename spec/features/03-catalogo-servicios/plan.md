# 03 · Catálogo de servicios — Plan

## Arquitectura

Un solo componente `ServiceCatalog` que maneja el estado local de la categoría activa.

### Componente: `src/components/ServiceCatalog.jsx`

```
┌─────────────────────────────────────────────┐
│  Volanta + Título                           │
│                                             │
│  [Corte] [Tratamientos] [Color] [Uñas]     │  ← pestañas
│                                             │
│  ┌──────────────┐  ┌────────────────────┐  │
│  │              │  │ Título (pillar)    │  │
│  │   Imagen     │  │ Descripción        │  │
│  │  dinámica    │  │                    │  │
│  │              │  │ ┌────────────────┐ │  │
│  │              │  │ │ Servicio 1     │ │  │
│  │              │  │ └────────────────┘ │  │
│  │              │  │ ┌────────────────┐ │  │
│  │              │  │ │ Servicio 2     │ │  │
│  │              │  │ └────────────────┘ │  │
│  └──────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Estado

```js
const [activeId, setActiveId] = useState("corte")
```

### Datos

Importar `SERVICE_CATEGORIES` de `src/lib/services.js`.

### Layout

- **Mobile (< `lg`):** columna única, imagen arriba, lista abajo.
- **Desktop (`lg+`):** grid de 2 columnas (`lg:grid-cols-[3fr_4fr]`), imagen izquierda, contenido derecha.
- Padding: `py-20 sm:py-28 px-[6%] sm:px-[8%]`.
- Fondo: `var(--background)`.

### Pestañas

- Container horizontal con `role="tablist"`.
- Cada botón con `role="tab"`, `aria-selected`, `onClick`.
- Estado activo: fondo `var(--accent)`, texto blanco.
- Estado inactivo: fondo transparente, borde `var(--border)`, texto `var(--foreground-muted)`.
- Altura mínima `min-h-[44px]` para touch targets.

### Imagen

- `<img>` con `src` dinámico según categoría activa.
- `rounded-2xl`, `object-cover`, `aspect-[3/4]`.
- En mobile se muestra arriba del contenido.

### Servicios

- Cada servicio es un `<div>` con `lift-card`, fondo blanco, borde `var(--border)`, `rounded-xl`, `p-4`.
- Nombre en `font-display` bold, descripción en `--foreground-muted`.
- Transición con `.reveal` al entrar al viewport.

### Accesibilidad

- Pestañas: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`.
- Contenido: `role="tabpanel"`, `id` que matchea con `aria-controls`.
- Imagen: `alt` con el nombre de la categoría.
- `prefers-reduced-motion`: las clases `.reveal` y `.lift-card` ya lo respetan via CSS.
