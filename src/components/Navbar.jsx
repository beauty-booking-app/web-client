export default function Navbar() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-99"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-end px-[6%] sm:px-[8%] h-16 sm:h-20">
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
