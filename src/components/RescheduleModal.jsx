import { useState, useEffect, useRef } from 'react'
import { RotateCcw } from 'lucide-react'
import { rescheduleAppointmentByHumanId } from '../services/api'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function parseStartTime(isoString) {
  if (!isoString) return { date: '', time: '' }
  const dt = new Date(isoString)
  return { date: dt.toISOString().slice(0, 10), time: dt.toISOString().slice(11, 16) }
}

export default function RescheduleModal({ open, humanId, currentStartTime, onClose, onConfirmed }) {
  const initial = parseStartTime(currentStartTime)
  const [date, setDate] = useState(initial.date)
  const [startTime, setStartTime] = useState(initial.time)
  const [contactValue, setContactValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dialogRef = useRef(null)
  const prevOpen = useRef(false)

  useEffect(() => {
    if (open && !prevOpen.current) {
      dialogRef.current?.focus()
    }
    prevOpen.current = open
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const handleClose = () => {
    const fresh = parseStartTime(currentStartTime)
    setDate(fresh.date)
    setStartTime(fresh.time)
    setContactValue('')
    setError(null)
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const contact = contactValue.trim()
    if (!date || !startTime || !contact) return

    setLoading(true)
    setError(null)

    const contactPayload = isEmail(contact)
      ? { email: contact, phone: null }
      : { email: null, phone: contact }

    try {
      const updated = await rescheduleAppointmentByHumanId(humanId, {
        date,
        startTime,
        ...contactPayload,
      })
      onConfirmed(updated)
    } catch (err) {
      if (err.code === 'ContactMismatch') {
        setError('El dato de contacto no coincide con el registrado.')
      } else if (err.code === 'SlotUnavailable') {
        setError('Ese horario ya no está disponible. Elegí otro.')
      } else if (err.code === 'CannotReschedule') {
        setError('Este turno no se puede reprogramar (está cancelado o completado).')
      } else {
        setError(err.message || 'No se pudo reprogramar el turno.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reschedule-modal-title"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative bg-white border border-border rounded-2xl p-8 max-w-md w-full shadow-xl outline-none"
      >
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-50 mx-auto mb-6">
          <RotateCcw className="h-7 w-7 text-blue-500" strokeWidth={1.5} />
        </div>

        <h2 id="reschedule-modal-title" className="font-display text-2xl text-center mb-2">
          Reprogramar turno
        </h2>
        <p className="text-foreground/70 text-center text-sm mb-6">
          Elegí una nueva fecha y horario, y verificá tu identidad.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reschedule-date" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1.5">
                Nueva fecha *
              </label>
              <input
                id="reschedule-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().slice(0, 10)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm min-h-11"
              />
            </div>

            <div>
              <label htmlFor="reschedule-time" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1.5">
                Nuevo horario *
              </label>
              <input
                id="reschedule-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm min-h-11"
              />
            </div>
          </div>

          <div>
            <label htmlFor="reschedule-contact" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1.5">
              Email o teléfono de verificación *
            </label>
            <input
              id="reschedule-contact"
              type="text"
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder="Ej: juan@example.com o +541112345678"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm min-h-11"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border border-border text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors cursor-pointer min-h-11"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={loading || !date || !startTime || !contactValue.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer min-h-11"
            >
              {loading ? 'Reprogramando…' : 'Reprogramar'}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  )
}
