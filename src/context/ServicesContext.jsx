import { useEffect, useMemo, useState } from 'react'
import { fetchServices } from '../services/api'
import { ServicesContext } from './servicesContext'

// El backend real no expone `category`/`pillar` (metadata local del mock).
// Se derivan del nombre del Service para que funcione con datos reales.
const CATEGORIAS_POR_NOMBRE = [
  { match: 'CORTE UNISEX', label: 'Corte', pillar: 'Corte' },
  { match: 'TRATAMIENTOS', label: 'Tratamientos', pillar: 'Tratamientos' },
  { match: 'COLOR', label: 'Color', pillar: 'Color' },
  { match: 'UÑAS', label: 'Uñas', pillar: 'Uñas' },
]

function categoriaDeService(svc) {
  if (svc.category) {
    return { label: svc.category, pillar: svc.pillar || svc.category }
  }
  const nombre = (svc.name || '').trim().toUpperCase()
  const match =
    CATEGORIAS_POR_NOMBRE.find((c) => nombre.includes(c.match)) ??
    CATEGORIAS_POR_NOMBRE.find((c) => c.match.includes(nombre))
  return match ?? { label: svc.name || 'Servicio', pillar: svc.name || 'Servicio' }
}

export function ServicesProvider({ children }) {
  const [services, setServices] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const toggleType = (typeId) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId],
    )
  }

  const clearSelectedTypes = () => setSelectedTypes([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchServices()
        if (!cancelled) setServices(data)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  // Derivar categorías a partir de los services (campo `category` del mock
  // o nombre del Service cuando viene del backend real)
  const categories = useMemo(() => {
    const map = new Map()
    services.forEach((svc) => {
      const { label, pillar } = categoriaDeService(svc)
      if (!map.has(label)) {
        map.set(label, {
          id: label.toLowerCase().replace(/\s+/g, '-'),
          label,
          pillar,
          description: svc.description,
          image: svc.referenceImage?.url || null,
          services: [],
        })
      }
      map.get(label).services.push(svc)
    })
    return Array.from(map.values())
  }, [services])

  // Lista plana de todos los ServiceType con referencia a su Service
  const allTypes = useMemo(
    () =>
      services.flatMap((svc) =>
        svc.types.map((t) => ({
          ...t,
          serviceId: svc.id,
          serviceName: svc.name,
          category: categoriaDeService(svc).label,
          cancelable: svc.cancelable,
          cancellationPeriodHours: svc.cancellationPeriodHours,
        })),
      ),
    [services],
  )

  return (
    <ServicesContext.Provider
      value={{ services, categories, allTypes, selectedTypes, toggleType, clearSelectedTypes, loading, error }}
    >
      {children}
    </ServicesContext.Provider>
  )
}
