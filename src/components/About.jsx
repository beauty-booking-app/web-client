import { useEffect, useRef } from 'react'
import { Scissors, Palette, Heart } from "lucide-react";

const CARDS = [
  {
    icon: Scissors,
    title: 'Peluquería',
    desc: 'Cortes, tratamientos y color para grandes y chicos. Te asesoramos con onda y sin apuros.',
  },
  {
    icon: Palette,
    title: 'Manicura',
    desc: 'Uñas semipermanentes, kapping y soft gel. Un ratito de mimo para tus manos.',
  },
  {
    icon: Heart,
    title: 'Buen ambiente',
    desc: 'Un lugar donde se charla, se ríe y se pasa un buen rato. Te recibimos como en casa.',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                entry.target.style.transitionDelay = '0ms'
              })
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const targets = node.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="bg-secondary py-24 sm:py-32 px-[6%] sm:px-[8%]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left column — headers */}
        <div className="lg:col-span-5">
          <p
            className="reveal text-sm font-semibold tracking-widest uppercase"
            style={{
              color: 'var(--primary)',
              transitionDelay: '0ms',
            }}
          >
            Sobre nosotros
          </p>
          <h2 
            className="reveal font-display font-medium text-4xl sm:text-5xl leading-[1.05] text-balance mb-8"
            style={{
                fontFamily: 'var(--font-display)',
                transitionDelay: '100ms',
              }}
          >
            Un salón de barrio, con calidez de casa
          </h2>
        </div>

        {/* Right column — text + cards */}
        <div className="lg:col-span-6 lg:col-start-7 space-y-8">
          <p
            className="reveal text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: 'var(--foreground-muted)',
              transitionDelay: '200ms',
            }}
          >
            Más que cortar el pelo o hacerte las uñas, queremos que te sientas bien.
            Por eso acá no hay apuros: te escuchamos, te aconsejamos y te cuidamos mientras
            charlamos de la vida, nos reímos un rato y te preparamos un café.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                className="reveal lift-card flex flex-col gap-3 p-6 rounded-2xl"
                style={{
                  backgroundColor: '#fff',
                  transitionDelay: `${300 + i * 100}ms`,
                }}
              >
                <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <card.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3
                  className="font-display text-xl mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--foreground)',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
