import {
  MOCK_SERVICES,
  MOCK_SLOTS,
  generateMockAvailableDates,
} from './mockData'

const BASE_URL = import.meta.env.VITE_API_URL

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── GET /public/services ───────────────────────────────────────────
// Devuelve Service[] con sus ServiceType[] anidados.
export async function fetchServices() {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/api/v1/public/services`)
    if (!res.ok) throw new Error('Error al cargar servicios')
    return res.json()
  }

  await delay(300)
  return MOCK_SERVICES
}

// ─── GET /availability/calendar ─────────────────────────────────────
// Devuelve los días disponibles del mes para los serviceTypeIds dados.
export async function fetchAvailableDates(serviceTypeIds, month) {
  if (BASE_URL) {
    const params = new URLSearchParams({ month })
    serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
    const res = await fetch(`${BASE_URL}/api/v1/availability/calendar?${params}`)
    if (!res.ok) throw new Error('Error al cargar disponibilidad')
    return res.json()
  }

  await delay(200)
  return {
    month,
    availableDates: generateMockAvailableDates(),
  }
}

// ─── GET /availability/slots ────────────────────────────────────────
// Devuelve los horarios disponibles para una fecha y lista de types.
export async function fetchSlots(serviceTypeIds, date) {
  if (BASE_URL) {
    const params = new URLSearchParams({ date })
    serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
    const res = await fetch(`${BASE_URL}/api/v1/availability/slots?${params}`)
    if (!res.ok) throw new Error('Error al cargar horarios')
    return res.json()
  }

  await delay(200)

  const selectedTypes = MOCK_SERVICES.flatMap((s) => s.types).filter((t) =>
    serviceTypeIds.includes(t.id),
  )
  const totalDuration = selectedTypes.reduce((sum, t) => sum + t.durationMinutes, 0)
  const totalPrice = selectedTypes.reduce((sum, t) => sum + t.price, 0)

  return {
    serviceTypes: selectedTypes.map(({ id, name, durationMinutes, price }) => ({ id, name, durationMinutes, price })),
    date,
    durationMinutes: totalDuration,
    price: totalPrice,
    slots: MOCK_SLOTS,
  }
}

// ─── POST /appointments ────────────────────────────────────────────
// Crea una cita. Devuelve el Appointment creado.
export async function createAppointment({ serviceTypeIds, date, startTime, referenceComment }) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/api/v1/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceTypeIds, date, startTime, referenceComment }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => null)
      throw new Error(err?.message || 'Error al crear la cita')
    }
    return res.json()
  }

  await delay(400)

  const allTypes = MOCK_SERVICES.flatMap((s) => s.types)
  const selectedTypes = allTypes.filter((t) => serviceTypeIds.includes(t.id))
  const totalDuration = selectedTypes.reduce((sum, t) => sum + t.durationMinutes, 0)
  const totalPrice = selectedTypes.reduce((sum, t) => sum + t.price, 0)

  const start = new Date(`${date}T${startTime}:00`)
  const end = new Date(start.getTime() + totalDuration * 60000)

  return {
    id: crypto.randomUUID(),
    humanId: Math.random().toString(36).substring(2, 8).toUpperCase(),
    serviceTypes: selectedTypes.map(({ id, name, durationMinutes, price }) => ({ id, name, durationMinutes, price })),
    client: { id: crypto.randomUUID(), name: '' },
    startTime: start.toISOString().slice(0, 19),
    endTime: end.toISOString().slice(0, 19),
    durationMinutes: totalDuration,
    price: totalPrice,
    referenceImage: null,
    referenceComment: referenceComment || null,
    status: 'pendiente',
    statusDetail: 'Turno pendiente de confirmación',
  }
}
