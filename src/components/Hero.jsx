import { useEffect, useRef } from 'react'
import heroImg from '../assets/hero.webp'
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15 },
    )

    const targets = node.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
        }}
      />
      {/* Gradient overlay — left to right */}
      <div
        className="absolute inset-0 z-11"
        style={{
          background:
            'linear-gradient(to right, hsl(32 35% 92%) 30%, transparent 100%)',
        }}
      />

      {/* Content grid */}
      <div className="relative z-50 w-full px-[6%] sm:px-[8%] py-20 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center min-h-svh">
        {/* Text column */}
        <div className="flex flex-col gap-6 max-w-xl">
          <p
            className="reveal font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6"
            style={{
              color: 'var(--primary)',
            }}
          >
            Tu salón de confianza · Peluquería y manicura
          </p>

          <h1
            className="reveal font-display font-medium text-foreground text-balance leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: "clamp(2.75rem, 7vw, 6rem)",
            }}
          >
            Un rato para vos,
            <br />
            <span className="text-primary">entre vecinos y amigos.</span>
          </h1>

          <p
            className="reveal mt-8 max-w-xl text-lg sm:text-xl text-foreground/80"
            style={{
              color: 'var(--foreground-muted)',
            }}
          >
            Vení a cortarte el pelo, hacerte las uñas o darte un mimo.
            Acá se charla, se ríe y se pasa un buen rato mientras te cuidamos.
          </p>

          <div
            className="reveal flex flex-wrap gap-4 mt-2"
            style={{ transitionDelay: '300ms' }}
          >
            <a
              href="/reserva"
              className="bg-primary-hover hover:bg-primary inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white rounded-full min-h-11 min-w-11"
              style={{
                transition: 'background-color 0.2s',
              }}
            >
              Reservá tu turno
            </a>

            <a
              href="#catalogo"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full min-h-11 min-w-11"
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
              Conocé nuestros servicios
            </a>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">Descubrí más</span>
          <ArrowDown className="h-4 w-4 text-primary animate-bounce" style={{ animationDuration: "2.5s" }} />
        </div>
        {/* Right column — empty, lets the background show through */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  )
}
