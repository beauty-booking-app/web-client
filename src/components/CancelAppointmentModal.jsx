import { useState, useEffect, useRef } from 'react'
import { CircleX } from 'lucide-react'
import { cancelAppointmentByHumanId } from '../services/api'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function CancelAppointmentModal({ open, humanId, onClose, onConfirmed }) {
  const [reason, setReason] = useState('')
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
    setReason('')
    setContactValue('')
    setError(null)
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const contact = contactValue.trim()
    if (!contact) return

    setLoading(true)
    setError(null)

    const payload = isEmail(contact)
      ? { email: contact, phone: null }
      : { email: null, phone: contact }

    try {
      const updated = await cancelAppointmentByHumanId(humanId, {
        reason: reason.trim() || null,
        ...payload,
      })
      onConfirmed(updated)
    } catch (err) {
      if (err.code === 'ContactMismatch') {
        setError('El dato de contacto no coincide con el registrado.')
      } else if (err.code === 'CannotCancel') {
        setError(err.details?.services?.[0]?.reason || 'Este turno no se puede cancelar en este momento.')
      } else {
        setError(err.message || 'No se pudo cancelar el turno.')
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
      aria-labelledby="cancel-modal-title"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative bg-white border border-border rounded-2xl p-8 max-w-md w-full shadow-xl outline-none"
      >
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-50 mx-auto mb-6">
          <CircleX className="h-7 w-7 text-red-500" strokeWidth={1.5} />
        </div>

        <h2 id="cancel-modal-title" className="font-display text-2xl text-center mb-2">
          Cancelar turno
        </h2>
        <p className="text-foreground/70 text-center text-sm mb-6">
          Ingresá el email o teléfono con el que reservaste para confirmar.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cancel-reason" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1.5">
              Motivo *
            </label>
            <textarea
              id="cancel-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              placeholder="Ej: Tengo un imprevisto"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-none"
            />
          </div>

          <div>
            <label htmlFor="cancel-contact" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1.5">
              Email o teléfono de verificación *
            </label>
            <input
              id="cancel-contact"
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
              disabled={loading || !reason.trim() || !contactValue.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer min-h-11"
            >
              {loading ? 'Cancelando…' : 'Cancelar turno'}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  )
}
