import { MoveRight } from "lucide-react";

export default function PreFooterBanner() {
  return (
    <section
      className="px-[6%] sm:px-[8%] py-20 sm:py-28 bg-secondary"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">Te esperamos</p>
          <h2 className="font-display font-medium text-4xl sm:text-5xl leading-[1.05] text-balance">
            Reservá tu turno y vení a pasar un buen rato.
          </h2>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <a
            href="/reserva"
            aria-label="Reservar un turno en M&M Peluquería"
            className="font-mono text-sm font-semibold uppercase tracking-wide px-10 py-4 rounded-full bg-primary text-background hover:bg-primary/90 transition-colors inline-block"
          >
            <span className='flex gap-2 items-center '>
              Reservar turno 
              <MoveRight className="h-4 w-4 animate-bounce" style={{ animationDuration: "2.5s" }} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
