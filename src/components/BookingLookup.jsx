import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { fetchAppointmentByHumanId } from '../services/api'
import AppointmentCard from './AppointmentCard'

export default function BookingLookup() {
  const [humanId, setHumanId] = useState('')
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const value = humanId.trim().toUpperCase()
    if (!value) return

    setLoading(true)
    setError(null)
    setNotFound(false)
    setAppointment(null)

    try {
      const result = await fetchAppointmentByHumanId(value)
      setAppointment(result)
    } catch (err) {
      if (err.code === 'NotFound') {
        setNotFound(true)
      } else {
        setError(err.message || 'Error al buscar el turno')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAppointmentUpdate = (updated) => {
    setAppointment(updated)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
        <input
          ref={inputRef}
          type="text"
          value={humanId}
          onChange={(e) => setHumanId(e.target.value.toUpperCase())}
          placeholder="Ej: A3F9K2"
          maxLength={6}
          pattern="[A-Za-z0-9]{1,6}"
          aria-label="Código de seguimiento"
          className="flex-1 px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors font-mono text-sm tracking-widest uppercase min-h-11"
        />
        <button
          type="submit"
          disabled={loading || !humanId.trim()}
          className="bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl min-h-11 min-w-11 cursor-pointer transition-colors"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </form>

      {loading && (
        <div className="mt-8 flex items-center gap-3 text-foreground-muted" role="status">
          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Buscando turno…</span>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
          {error}
        </div>
      )}

      {notFound && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm" role="alert">
          No encontramos un turno con ese código. Verificá que esté bien escrito y volvé a intentar.
        </div>
      )}

      {appointment && (
        <div className="mt-8">
          <AppointmentCard appointment={appointment} onUpdate={handleAppointmentUpdate} />
        </div>
      )}
    </div>
  )
}
