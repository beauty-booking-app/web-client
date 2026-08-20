import { useState } from 'react'
import { Calendar, Clock, User, CircleCheck, CircleX, RotateCcw } from 'lucide-react'
import CancelAppointmentModal from './CancelAppointmentModal'
import RescheduleModal from './RescheduleModal'

const STATUS_STYLES = {
  pendiente: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Pendiente' },
  confirmado: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Confirmado' },
  reprogramado: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Reprogramado' },
  completado: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: 'Completado' },
  cancelado: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Cancelado' },
  no_asiste: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'No asistió' },
}

function formatDateTime(isoString) {
  const date = new Date(isoString)
  return {
    date: date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
  }
}

function formatPrice(cents) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(cents)
}

export default function AppointmentCard({ appointment, onUpdate }) {
  const [showCancel, setShowCancel] = useState(false)
  const [showReschedule, setShowReschedule] = useState(false)

  const status = STATUS_STYLES[appointment.status] || STATUS_STYLES.pendiente
  const start = formatDateTime(appointment.startTime)
  const end = formatDateTime(appointment.endTime)
  const canModify = ['pendiente', 'confirmado', 'reprogramado'].includes(appointment.status)

  const handleCancelled = (updated) => {
    setShowCancel(false)
    onUpdate(updated)
  }

  const handleRescheduled = (updated) => {
    setShowReschedule(false)
    onUpdate(updated)
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="font-mono text-lg tracking-widest font-bold text-foreground">
            {appointment.humanId}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}>
            {appointment.status === 'cancelado' ? (
              <CircleX className="h-3.5 w-3.5" />
            ) : (
              <CircleCheck className="h-3.5 w-3.5" />
            )}
            {status.label}
          </span>
        </div>

        {/* Client */}
        {appointment.client?.name && (
          <div className="flex items-center gap-2 text-sm text-foreground-muted mb-4">
            <User className="h-4 w-4" />
            <span>{appointment.client.name}</span>
          </div>
        )}

        {/* Date & Time */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-foreground-muted" />
            <span className="capitalize">{start.date}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-foreground-muted" />
            <span>{start.time} – {end.time}</span>
            <span className="text-foreground-muted">({appointment.durationMinutes} min)</span>
          </div>
        </div>

        {/* Services */}
        <div className="border-t border-border pt-4 mt-4">
          <p className="text-xs uppercase tracking-wide text-foreground-muted font-semibold mb-3">Servicios</p>
          <ul className="space-y-2">
            {appointment.serviceTypes.map((svc) => (
              <li key={svc.id} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{svc.name}</span>
                <span className="text-foreground-muted">{formatPrice(svc.price)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-sm font-semibold mt-3 pt-3 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(appointment.price)}</span>
          </div>
        </div>

        {/* Status detail */}
        {appointment.statusDetail && (
          <p className="mt-4 text-xs text-foreground-muted">{appointment.statusDetail}</p>
        )}

        {/* Actions */}
        {canModify && (
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setShowReschedule(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl border border-border text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors cursor-pointer min-h-11"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reprogramar
            </button>
            <button
              onClick={() => setShowCancel(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer min-h-11"
            >
              <CircleX className="h-3.5 w-3.5" />
              Cancelar
            </button>
          </div>
        )}
      </div>

      <CancelAppointmentModal
        open={showCancel}
        humanId={appointment.humanId}
        onClose={() => setShowCancel(false)}
        onConfirmed={handleCancelled}
      />

      <RescheduleModal
        open={showReschedule}
        humanId={appointment.humanId}
        currentStartTime={appointment.startTime}
        onClose={() => setShowReschedule(false)}
        onConfirmed={handleRescheduled}
      />
    </>
  )
}
