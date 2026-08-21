# 01 · Landing page — Plan

_Cómo se implementa lo descrito en `spec.md`. Respeta la `constitution/`._

## Enfoque

Reemplazar el boilerplate de Vite por dos componentes de sección (`Hero` y `About`) renderizados directamente en `App.jsx`. Tailwind CSS 4 se configura como plugin de Vite y se importa en `index.css`. Los tokens de color, tipografía y animaciones se definen como variables CSS en `:root`. No se instalan dependencias nuevas: todo se resuelve con CSS vanilla + Tailwind.

## Implementación

1. **`vite.config.js`** — agregar `@tailwindcss/vite` al array de plugins.
2. **`index.html`** — cambiar `lang="es"`, actualizar `<title>` a "Tammi", agregar preconnect a Google Fonts y los `<link>` para Fraunces (display) y Nunito Sans (body).
3. **`src/index.css`** — reemplazar completamente:
   - Importar Tailwind (`@import "tailwindcss"`).
   - Definir tokens CSS en `:root`: `--primary` (terracota), `--accent` (sage), `--background` (crema), `--foreground` (marrón oscuro).
   - Configurar `font-family` base con Nunito Sans.
   - Estilos globales: `body` sin margin, `#root` sin restricciones de ancho.
   - Definir utilidades `.reveal` y `.lift-card` con `@media (prefers-reduced-motion)` guard.
4. **`src/components/Hero.jsx`** — componente nuevo:
   - Section full-screen (`min-h-svh`) con imagen de fondo (`hero.jpg`) posicionada y blurada.
   - Overlay semitransparente con `bg-[rgba(180,120,90,0.35)]`.
   - Grid de 2 columnas (`grid grid-cols-1 lg:grid-cols-[3fr_2fr]`).
   - Columna izquierda: volanta (texto pequeño terracota), h1 (Fraunces, grande), párrafo bajada, flex row con 2 botones.
   - Columna derecha: vacía (muestra la imagen de fondo difuminada).
   - Botones: primario (bg terracota, texto blanco, `rounded-full`) y secundario (borde, fondo transparente, `rounded-full`).
   - Animación `.reveal` en los elementos hijos con `stagger` via `animation-delay` inline.
5. **`src/components/About.jsx`** — componente nuevo:
   - Section con `bg-[var(--background)]` y padding vertical.
   - Grid asimétrico (`grid grid-cols-1 lg:grid-cols-[2fr_3fr]`).
   - Columna izquierda: volanta + h2.
   - Columna derecha: párrafo + grid de 3 tarjetas (`grid grid-cols-1 sm:grid-cols-3 gap-6`).
   - Cada tarjeta: fondo blanco, `rounded-2xl`, padding, borde sutil, `.lift-card` en hover.
   - Íconos SVG inline (scissors, leaf, heart) en color terracota.
6. **`src/App.jsx`** — reemplazar todo el boilerplate por:
   ```jsx
   import Hero from './components/Hero'
   import About from './components/About'
   
   function App() {
     return (
       <>
         <Hero />
         <About />
       </>
     )
   }
   export default App
   ```
7. **Eliminar `src/App.css`** — ya no se usa.
8. **Validar** — `pnpm dev` compila, `pnpm lint` sin errores, revisar en browser.

## Decisiones

- **Tailwind vía plugin de Vite (no PostCSS)** — Tailwind CSS 4 ofrece `@tailwindcss/vite` como integración nativa. Más rápido y simple que el setup PostCSS de v3.
- **Variables CSS en `:root` en vez de `tailwind.config.js`** — Tailwind CSS 4 no usa `tailwind.config.js`. Los tokens se definen como CSS custom properties y se referencian con `var(--token)` o `theme()` de Tailwind.
- **Componentes en JSX (no TSX)** — el proyecto actualmente usa `.jsx`. Se mantiene consistencia hasta que se migre a TypeScript globalmente.
- **Imagen placeholder** — `hero.jpg` se usa tal cual. Si la imagen no es un interior de salón, se reemplaza después sin cambiar código.
- **Sin React Router todavía** — la landing es una sola página. El router se agrega en la feature 006 (Booking engine).

## Riesgos

- **Tipografías no cargadas** — si Google Fonts falla, el fallback `system-ui` se ve genérico. Mitigación: los font-display son `swap`, el contenido sigue siendo legible.
- **Imagen hero.jpg muy pesada** — puede lento el LCP. Mitigación: verificar tamaño; si es necesario, comprimir o usar `loading="lazy"` en la imagen (aunque en hero probablemente convenga `eager`).
- **Overlay oscurece demasiado** — el valor `0.35` de opacidad es un punto de partida. Puede ajustarse según se vea con la imagen real.
