import { useEffect, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function SlotUnavailableModal({ open, onReschedule, onCancel }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    dialogRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="slot-unavailable-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-xl outline-none"
      >
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-50 mx-auto mb-6">
          <AlertTriangle className="h-7 w-7 text-red-500" strokeWidth={1.5} />
        </div>

        <h2
          id="slot-unavailable-title"
          className="font-display text-2xl text-center mb-3"
        >
          Turno no disponible
        </h2>

        <p className="text-foreground/70 text-center text-sm mb-8">
          Ese horario ya fue reservado por otra persona. ¿Querés elegir otro
          turno?
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReschedule}
            className="flex-1 font-mono text-[10px] sm:text-xs uppercase tracking-wide font-semibold px-6 py-3.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Elegir otro turno
          </button>

          <button
            onClick={onCancel}
            className="flex-1 font-mono text-[10px] sm:text-xs uppercase tracking-wide font-semibold px-6 py-3.5 rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
