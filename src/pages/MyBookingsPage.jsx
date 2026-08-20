import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BookingLookup from '../components/BookingLookup'

export default function MyBookingsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-[6%] sm:px-[8%]">
        <Link
          to="/"
          aria-label="Volver al inicio"
          className="font-mono text-[10px] uppercase tracking-wide font-semibold text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-2 mb-8"
        >
          ← Volver al inicio
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
          Mis turnos
        </h1>
        <p className="text-foreground-muted mb-10">
          Ingresá el código de seguimiento que recibiste al reservar para ver el estado de tu turno.
        </p>

        <BookingLookup />
      </main>
    </>
  )
}
