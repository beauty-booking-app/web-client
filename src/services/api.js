const BASE_URL = import.meta.env.VITE_API_URL || 'https://api-backend-rho-vert.vercel.app'

export async function fetchServices() {
  const res = await fetch(`${BASE_URL}/api/v1/public/services`)
  if (!res.ok) throw new Error('Error al cargar servicios')
  return res.json()
}

export async function fetchAvailableDates(serviceTypeIds, month) {
  const params = new URLSearchParams({ month })
  serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
  const res = await fetch(`${BASE_URL}/api/v1/availability/calendar?${params}`)
  if (!res.ok) throw new Error('Error al cargar disponibilidad')
  return res.json()
}

export async function fetchSlots(serviceTypeIds, date) {
  const params = new URLSearchParams({ date })
  serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
  const res = await fetch(`${BASE_URL}/api/v1/availability/slots?${params}`)
  if (!res.ok) throw new Error('Error al cargar horarios')
  return res.json()
}

export async function createAppointment({ serviceTypeIds, date, startTime, referenceComment }) {
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
