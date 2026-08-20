export default function Navbar() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-99"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-end gap-4 px-[6%] sm:px-[8%] h-16 sm:h-20">
        <a
          href="/mis-turnos"
          className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm font-semibold rounded-full min-h-11 min-w-11 cursor-pointer"
          style={{
            color: 'var(--foreground)',
            border: '2px solid var(--border)',
            backgroundColor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(4px)',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = 'var(--primary)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = 'var(--border)')
          }
        >
          MIS TURNOS
        </a>
        <a
          href="/reserva"
          className="bg-primary hover:bg-primary-hover inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm font-semibold text-white rounded-full min-h-11 min-w-11 cursor-pointer"
          style={{
            transition: 'background-color 0.2s'
          }}
        >
          RESERVAR
        </a>
      </div>
    </nav>
  )
}
