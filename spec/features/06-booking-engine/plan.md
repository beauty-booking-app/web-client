# 06 · Booking engine — Plan

## Arquitectura

Página independiente con wizard de 3 pasos. React Router para routing. Estado compartido entre pasos.

### Estructura de archivos

```
src/
├── pages/
│   └── BookingPage.jsx        ← página full-screen del wizard
├── components/
│   ├── booking/
│   │   ├── StepServices.jsx   ← paso 1: selección de servicios
│   │   ├── StepDateTime.jsx   ← paso 2: selección de fecha/hora
│   │   ├── StepClient.jsx     ← paso 3: formulario datos cliente
│   │   └── StepConfirm.jsx    ← pantalla de confirmación
│   └── ...
├── router/
│   └── AppRouter.jsx          ← configuración de rutas
└── App.jsx                    ← importa AppRouter
```

### Routing

```jsx
// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import BookingPage from '../pages/BookingPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reserva" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Estado del wizard

Estado elevado en `BookingPage.jsx` con `useState`:

```js
const [step, setStep] = useState(1)           // 1 | 2 | 3 | 4 (confirmación)
const [services, setServices] = useState([])   // array de ids seleccionados
const [date, setDate] = useState(null)         // string "YYYY-MM-DD"
const [time, setTime] = useState(null)         // string "HH:00"
const [client, setClient] = useState({         // { name, phone, email }
  name: '', phone: '', email: ''
})
```

### Layout del wizard

- Full-screen: `min-h-screen`, sin navbar ni footer.
- Fondo: `var(--background)`.
- Header fijo arriba: pasos (1 → 2 → 3) con check visual.
- Contenido centrado.
- Botones de navegación abajo.

### Paso 1 — StepServices

- Lista de todos los servicios de `ALL_SERVICES`.
- Cada servicio es un botón toggle: seleccionado = fondo `--accent`, borde `--accent`.
- Contador de servicios seleccionados.
- Botón "Siguiente" habilitado si `services.length > 0`.

### Paso 2 — StepDateTime

- **Fechas:** grilla horizontal de los próximos 14 días. Cada fecha es un botón con día de la semana + fecha.
- **Horarios:** grilla de botones con `TIME_SLOTS`. Slot seleccionado = fondo `--accent`.
- Botón "Siguiente" habilitado si `date && time`.

### Paso 3 — StepClient

- Formulario con React Hook Form + Zod:
  - `name`: string, mínimo 2 caracteres, requerido.
  - `phone`: string, mínimo 8 caracteres, requerido.
  - `email`: string, email válido, requerido.
- Errores mostrados debajo de cada campo.
- Botón "Confirmar" habilitado si el formulario es válido.

### StepConfirm

- Pantalla de éxito con ícono check.
- Resumen: servicios seleccionados, fecha, hora, nombre.
- Botón "Volver al inicio" → redirige a `/`.

### Navegación entre pasos

- Botón "Atrás" → `setStep(step - 1)`.
- Botón "Siguiente" → `setStep(step + 1)`.
- Botones deshabilitados según validación de cada paso.
- Transición suave entre pasos.

### Accesibilidad

- `aria-label` en botones de navegación.
- `role="alert"` para errores de formulario.
- `aria-current="step"` en el paso activo.
- Focus management al cambiar de paso.
