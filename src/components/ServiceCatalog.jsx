import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { Plus, Check, MoveRight } from "lucide-react";

function formatPrice(n) {
  return n.toLocaleString('es-AR')
}

export default function ServiceCatalog() {
  const { categories, loading, selectedTypes, toggleType } = useServices()
  const [activeId, setActiveId] = useState(null)
  const sectionRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && categories.length > 0 && activeId === null) {
      setActiveId(categories[0].id)
    }
  }, [loading, categories, activeId])

  const activeCategory = categories.find((c) => c.id === activeId) || categories[0]

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 },
    )

    const targets = node.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeId, loading])

  if (loading) {
    return (
      <section id="catalogo" className="py-20 sm:py-28 px-[6%] sm:px-[8%]">
        <div className="animate-pulse">
          <div className="h-3 w-40 bg-foreground/10 rounded mb-4" />
          <div className="h-10 w-96 max-w-full bg-foreground/10 rounded mb-12" />

          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-24 bg-foreground/10 rounded-t-xl" />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-10 lg:gap-16">
            <div className="h-80 bg-foreground/10 rounded-2xl" />
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-foreground/10 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="py-20 sm:py-28 px-[6%] sm:px-[8%]"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
        <div>
          <p
            className="reveal font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3"
            style={{ transitionDelay: '0ms' }}
          >
            Nuestros servicios
          </p>
          <h2
            className="reveal font-display font-medium text-4xl sm:text-5xl leading-[1.05] text-balance max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', transitionDelay: '100ms' }}
          >
            Todo lo que necesitás para verte y sentirte bien
          </h2>
        </div>
        <p className="reveal max-w-sm text-foreground/70 text-base">
          Cuatro rubros para toda la familia. Elegí uno o combiná varios y te reservamos el turno.
        </p>
      </div>

      {/* Tabs */}
      <div role="tablist" className="reveal mb-10" style={{ transitionDelay: '200ms' }}>
        <div className='flex gap-2 border-b border-border overflow-x-auto no-scrollbar'>
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeId === cat.id}
              aria-controls={`panel-${cat.id}`}
              onClick={() => setActiveId(cat.id)}
              className={`font-mono text-xs font-semibold uppercase tracking-wide px-5 py-3 whitespace-nowrap rounded-t-xl border-b-2 transition-all duration-300 cursor-pointer ${
                activeId === cat.id
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
              aria-label={`Ver servicios de ${cat.label}`}
            >
              {cat.pillar}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      {activeCategory && (
        <div
          role="tabpanel"
          id={`panel-${activeId}`}
          className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-10 lg:gap-16 items-start"
        >
          {/* Image / Description */}
          <div className="reveal relative" style={{ transitionDelay: '0ms' }}>
            {activeCategory.image ? (
              <>
                <img
                  src={activeCategory.image}
                  alt={activeCategory.label}
                  className="w-full rounded-2xl object-cover aspect-3/4"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/10 to-transparent rounded-2xl" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="font-display text-xl sm:text-2xl text-primary max-w-xs leading-tight">
                    {activeCategory.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-2xl bg-card border border-border p-8">
                <p className="font-display text-xl sm:text-2xl text-primary max-w-xs leading-tight">
                  {activeCategory.description}
                </p>
              </div>
            )}
          </div>

          {/* Services + types list */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {activeCategory.services.map((svc) => (
                <div key={svc.id}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
                    {svc.name}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {svc.types.map((type) => {
                      const isSelected = selectedTypes.includes(type.id)
                      return (
                        <div
                          key={type.id}
                          className={`group flex items-start justify-between gap-6 p-5 rounded-2xl border transition-all duration-300 lift-card ${
                            isSelected ? "border-primary bg-primary/5" : "border-border bg-card"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-3 mb-1">
                              <h4 className="font-display text-xl sm:text-2xl text-foreground">
                                {type.name}
                              </h4>
                            </div>
                            <p className="text-foreground/70 text-sm max-w-md mb-2">
                              {type.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-foreground/50 font-mono">
                              <span>${formatPrice(type.price)}</span>
                              <span>{type.durationMinutes} min</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleType(type.id)}
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? "border-accent bg-accent text-accent-foreground"
                                : "border-border text-foreground/50 hover:border-primary hover:text-primary hover:bg-primary/5"
                            }`}
                            aria-label={`${isSelected ? "Quitar" : "Seleccionar"} ${type.name}`}
                            aria-pressed={isSelected}
                          >
                            {isSelected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer de selección */}
            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap p-5 rounded-2xl bg-secondary">
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground/70 px-4">
                {selectedTypes.length} servicio{selectedTypes.length !== 1 ? 's' : ''} seleccionado{selectedTypes.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={() => navigate('/reserva')}
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white rounded-full min-h-11 min-w-11 transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--primary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
              >
                <span className='flex gap-2 items-center'>
                  Reservar turno
                  <MoveRight className="h-4 w-4 animate-bounce" style={{ animationDuration: "2.5s" }} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
