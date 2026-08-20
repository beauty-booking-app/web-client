import { useServices } from '../hooks/useServices';
import { Mail, MapPin, Clock, Phone } from "lucide-react";
import logo from '../assets/logo.png'

export default function Footer() {
  const { categories: SERVICE_CATEGORIES } = useServices();
  return (
    <footer
      role="contentinfo"
      className="py-16 sm:py-20 px-[6%] sm:px-[8%] bg-background"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
        {/* Col 1 — Marca */}
        <div className="flex flex-col gap-3 w-50">
          <img
            src={logo}
            alt="Tammi"
            className="w-full"
          />

          <p className="text-sm leading-relaxed text-center">
            Un salón de barrio donde te sentís como en casa. Corte,
            tratamiento, color y uñas con cariño y paciencia.
          </p>
        </div>

        {/* Col 2 — Servicios */}
        <div className="flex flex-col gap-3">
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Servicios
          </h3>

          <ul className="flex flex-col gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#catalogo`}
                  aria-label={`Ver servicios de ${cat.label}`}
                  className="text-sm transition-colors"
                >
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contacto */}
        <div className="flex flex-col gap-3">
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Contacto
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span>Av. Principal 1234<br />Tu barrio</span>
              </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span>Lun a Sáb: 9 a 19 hs</span>
              </li>
          </ul>
        </div>

        {/* Col 4 — Redes */}
        <div className="flex flex-col gap-3">
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Redes
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <a
                href="https://instagram.com/mpeluqueria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguinos en Instagram"
                className="text-sm hover:text-primary transition-colors"
              >
                @Tammi
              </a>
              
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <a
                href="https://wa.me/541155551234"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribinos por WhatsApp"
                className="text-sm hover:text-primary transition-colors"
              >
                541155551234
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-primary/20 pt-8 text-center">
        <p className="text-xs text-primary">
          Hecho con amor en M&amp;M Peluquería · 2026
        </p>
      </div>
    </footer>
  )
}
