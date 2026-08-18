import { useState, useEffect } from 'react'
import { Calendar, Clock, MoveRight, MoveLeft } from 'lucide-react'
import { useServices } from '../../hooks/useServices'
import { fetchAvailableDates, fetchSlots } from '../../services/api'

export default function StepDateTime({ serviceTypeIds, date, time, onDate, onTime, onNext, onBack }) {
  const { loading: servicesLoading } = useServices()
  const [availableDates, setAvailableDates] = useState(null)
  const [slots, setSlots] = useState({ date: null, data: null })
  const canNext = date && time

  // Cargar días disponibles cuando se seleccionan los serviceTypes
  useEffect(() => {
    if (servicesLoading || serviceTypeIds.length === 0) return

    let cancelled = false

    const now = new Date()
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    fetchAvailableDates(serviceTypeIds, month)
      .then((res) => {
        if (!cancelled) setAvailableDates(res.availableDates)
      })
      .catch(() => {
        if (!cancelled) setAvailableDates([])
      })

    return () => { cancelled = true }
  }, [serviceTypeIds, servicesLoading])

  // Cargar slots cuando se selecciona una fecha
  useEffect(() => {
    if (!date || serviceTypeIds.length === 0) return
    if (slots.date === date) return

    let cancelled = false

    fetchSlots(serviceTypeIds, date)
      .then((res) => {
        if (!cancelled) setSlots({ date, data: res.slots })
      })
      .catch(() => {
        if (!cancelled) setSlots({ date, data: [] })
      })

    return () => { cancelled = true }
  }, [date, serviceTypeIds, slots.date])

  const loadingDates = servicesLoading || availableDates === null
  const loadingSlots = date !== null && slots.date !== date
  const currentSlots = slots.date === date ? slots.data : null

  if (loadingDates) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-foreground/50 text-center font-mono text-xs uppercase tracking-wide py-20">Cargando disponibilidad...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
        Paso 02
      </p>
      <h1 className="font-display text-3xl sm:text-4xl mb-2">
        Elegí fecha y hora
      </h1>
      <p className="text-foreground/70 text-sm mb-10">
        Seleccioná el día y el horario que te quede mejor.
      </p>

      {/* Fechas */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">Día</p>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {availableDates.map((key) => {
            const d = new Date(key + 'T12:00:00')
            const isSelected = date === key
            const dayNum = d.getDate()
            const dayName = d.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '')
            const monthName = d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '')

            return (
              <button
                key={key}
                onClick={() => onDate(key)}
                className={`shrink-0 w-20 py-5 rounded-2xl border flex flex-col items-center gap-1 transition-all min-h-22 lift-card cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card'
                }`}
                aria-label={`Seleccionar ${dayName} ${dayNum} ${monthName}`}
                aria-pressed={isSelected}
              >
                <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50">
                  {dayName}
                </span>
                <span className="font-display text-2xl leading-none">{dayNum}</span>
                <span className="font-mono text-[9px] uppercase text-foreground/40">
                  {monthName}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Horarios */}
      {date && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">Hora</p>
          </div>

          {loadingSlots ? (
            <p className="text-foreground/50 font-mono text-xs uppercase tracking-wide py-8 text-center">Cargando horarios...</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {currentSlots.filter((s) => s.available).map((slot) => {
                const isSelected = time === slot.startTime
                return (
                  <button
                    key={slot.startTime}
                    onClick={() => onTime(slot.startTime)}
                    className={`py-4 rounded-xl border font-mono text-sm tracking-wide transition-all min-h-11 lift-card cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-card text-foreground'
                    }`}
                    aria-label={`Seleccionar hora ${slot.startTime}`}
                    aria-pressed={isSelected}
                  >
                    {slot.startTime}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Navegación */}
      <div className="flex items-center justify-between pt-8">
        <button
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-wide font-semibold text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer"
        >
          <MoveLeft className="h-3 w-3 animate-bounce" style={{ animationDuration: "2.5s" }} />
          Atrás
        </button>

        <button
          onClick={onNext}
          disabled={!canNext}
          className="font-mono text-[10px] sm:text-xs uppercase tracking-wide font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
        >
          Siguiente
          <MoveRight className="h-4 w-4 animate-bounce" style={{ animationDuration: "2.5s" }} />
        </button>
      </div>
    </div>
  )
}
