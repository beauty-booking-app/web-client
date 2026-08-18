import { Check, MoveRight } from 'lucide-react'
import { useServices } from '../../hooks/useServices'

function formatPrice(n) {
  return n.toLocaleString('es-AR')
}

export default function StepServices({ selected, onToggle, onNext }) {
  const { categories, loading } = useServices()

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-foreground/50 text-center font-mono text-xs uppercase tracking-wide py-20">Cargando servicios...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
        Paso 01
      </p>
      <h1 className="font-display text-3xl sm:text-4xl mb-2">
        Elegí tus servicios
      </h1>
      <p className="text-foreground/70 text-sm mb-10">
        Podés combinar varios servicios. Elegí los que quieras.
      </p>

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-baseline gap-4 mb-5 border-b border-border pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {cat.pillar}
              </span>
              <h2 className="font-display text-xl text-foreground">{cat.label}</h2>
            </div>

            {cat.services.map((svc) => (
              <div key={svc.id} className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-3">
                  {svc.name}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {svc.types.map((type) => {
                    const isSelected = selected.includes(type.id)
                    return (
                      <button
                        key={type.id}
                        onClick={() => onToggle(type.id)}
                        className={`group text-left p-5 rounded-2xl border transition-all min-h-11 lift-card cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                        aria-label={`${isSelected ? 'Quitar' : 'Seleccionar'} ${type.name}`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-lg leading-tight">{type.name}</p>
                            <p className="text-xs text-foreground/50 font-mono mt-1">
                              ${formatPrice(type.price)} · {type.durationMinutes} min
                            </p>
                          </div>
                          <span
                            className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-accent bg-accent' : 'border-border'
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3 text-accent-foreground" />}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-8">
        <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/60">
          {selected.length} servicio{selected.length !== 1 ? 's' : ''} seleccionado{selected.length !== 1 ? 's' : ''}
        </span>

        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className="font-mono text-[10px] sm:text-xs uppercase tracking-wide font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
        >
          Siguiente
          <MoveRight className="h-4 w-4 animate-bounce" style={{ animationDuration: "2.5s" }} />
        </button>
      </div>
    </div>
  )
}
