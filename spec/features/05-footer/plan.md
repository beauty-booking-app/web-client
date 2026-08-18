# 05 · Footer — Plan

## Arquitectura

Componente puro sin estado. Un solo archivo `Footer.jsx`.

### Componente: `src/components/Footer.jsx`

```
┌─────────────────────────────────────────────────────┐
│  M&M         Servicios     Contacto      Redes      │
│  Peluquería                                              │
│  Descripción   Corte        Dirección    Instagram   │
│               Tratamientos  Teléfono     WhatsApp    │
│               Color         Horarios                 │
│               Uñas                                   │
├─────────────────────────────────────────────────────┤
│         Hecho con amor en M&M Peluquería · 2026      │
└─────────────────────────────────────────────────────┘
```

### Layout

- **Mobile (`< lg`):** grid 2 columnas (`grid-cols-2`).
- **Desktop (`lg+`):** grid 4 columnas (`lg:grid-cols-4`).
- Padding: `py-16 sm:py-20 px-[6%] sm:px-[8%]`.
- Fondo: `var(--foreground)` (marrón oscuro).

### Columnas

1. **M&M Peluquería:** título "M&M" en `font-display` bold, descripción corta del salón.
2. **Servicios:** título "Servicios", lista de links a cada categoría de servicios.
3. **Contacto:** título "Contacto", dirección, teléfono, horarios.
4. **Redes:** título "Redes", links a Instagram y WhatsApp.

### Barra inferior

- Borde superior `border-t border-white/10`.
- Texto centrado, color blanco con opacidad 0.5, texto pequeño.
- Contenido: "Hecho con amor en M&M Peluquería · 2026".

### Accesibilidad

- `<footer role="contentinfo">`.
- Links con `aria-label` descriptivos.
- Color blanco con opacidad para contraste suficiente sobre fondo marrón oscuro.
