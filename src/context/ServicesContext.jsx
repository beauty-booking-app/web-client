import { useEffect, useMemo, useState } from 'react'
import { fetchServices } from '../services/api'
import { ServicesContext } from './servicesContext'

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

  // Derivar categorías a partir de los services (campo `category` del mock)
  const categories = useMemo(() => {
    const map = new Map()
    services.forEach((svc) => {
      const key = svc.category
      if (!map.has(key)) {
        map.set(key, {
          id: key.toLowerCase().replace(/\s+/g, '-'),
          label: svc.category,
          pillar: svc.pillar,
          description: svc.description,
          image: svc.referenceImage?.url || null,
          services: [],
        })
      }
      map.get(key).services.push(svc)
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
          category: svc.category,
          cancelable: svc.cancelable,
          cancellationPeriodHours: svc.cancellationPeriodHours,
        })),
      ),
    [services],
  )

  return (
    <ServicesContext.Provider
      value={{ services, categories, allTypes, selectedTypes, toggleType, loading, error }}
    >
      {children}
    </ServicesContext.Provider>
  )
}
