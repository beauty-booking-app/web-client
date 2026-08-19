import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useServices } from '../../hooks/useServices'

function formatPrice(n) {
  return n.toLocaleString('es-AR')
}

export default function StepConfirm({ services, date, time, client }) {
  const { allTypes, clearSelectedTypes } = useServices()
  const selectedTypes = allTypes.filter((t) => services.includes(t.id))
  const totalPrice = selectedTypes.reduce((sum, t) => sum + t.price, 0)

  const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <div className="h-16 w-16 mx-auto mb-8 rounded-full bg-accent flex items-center justify-center">
        <Check className="h-8 w-8 text-accent-foreground" strokeWidth={1.5} />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
        ¡Listo!
      </p>

      <h1 className="font-display text-4xl sm:text-5xl mb-6 leading-tight">
        ¡Turno confirmado!
      </h1>

      <p className="text-foreground/70 text-lg mb-10 max-w-md mx-auto">
        Te esperamos, {client.name}. Tu turno ya está reservado.
      </p>

      {/* Resumen */}
      <div className="border border-border rounded-2xl p-8 text-left space-y-4 bg-card">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
            Servicios
          </p>
          <div className="space-y-1">
            {selectedTypes.map((t) => (
              <p key={t.id} className="font-display text-lg flex items-center justify-between">
                <span>{t.name}</span>
                <span className="font-mono text-sm text-foreground/50">${formatPrice(t.price)}</span>
              </p>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-foreground/50">Total</span>
            <span className="font-display text-xl font-semibold">${formatPrice(totalPrice)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
              Día
            </p>
            <p className="font-display text-lg capitalize">{formattedDate}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
              Hora
            </p>
            <p className="font-display text-lg">{time} hs</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
            Datos
          </p>
          <p className="font-display text-lg">{client.name} · {client.phone}</p>
          <p className="text-sm text-foreground/60">{client.email}</p>
        </div>
      </div>

      <Link
        to="/"
        onClick={clearSelectedTypes}
        className="mt-10 font-mono text-[10px] uppercase tracking-wide font-semibold px-10 py-4 rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-foreground transition-colors inline-flex items-center"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
