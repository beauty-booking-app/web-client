# 04 · Pre-Footer Banner — Plan

## Arquitectura

Componente puro sin estado. Un solo archivo `PreFooterBanner.jsx`.

### Componente: `src/components/PreFooterBanner.jsx`

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Volanta          ┌──────────────────────────┐  │
│  Título           │  Reservá tu turno →       │  │
│                   └──────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Layout

- **Mobile (`< lg`):** columna vertical, texto arriba, botón abajo.
- **Desktop (`lg+`):** fila horizontal (`lg:flex-row`), texto izquierda, botón derecha, `items-center justify-between`.
- Padding: `py-16 sm:py-20 px-[6%] sm:px-[8%]`.
- Fondo: `var(--primary)`.

### Tipografía

- Volanta: `text-sm font-semibold tracking-widest uppercase`, color blanco con opacidad 0.8.
- Título: `text-2xl sm:text-3xl font-bold font-display`, color blanco.

### Botón CTA

- Estilo: fondo blanco, texto `var(--primary)`, `font-semibold`, `rounded-full`, `min-h-[44px]`.
- Link: `<a href="/reserva">` (ruta futura).
- `aria-label` descriptivo.

### Accesibilidad

- `aria-label` en el botón CTA.
- `prefers-reduced-motion`: no hay animaciones en este componente.
