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

// ─── POST /appointments ────────────────────────────────────────────
// Crea una cita anónima. Devuelve el Appointment creado.
export async function createAppointment({
  serviceTypeIds,
  date,
  startTime,
  referenceComment,
  clientName,
  clientPhone,
  clientEmail,
}) {
  if (BASE_URL) {
    const clientToken = await getClientToken()
    const res = await fetch(`${BASE_URL}/api/v1/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Token': clientToken,
      },
      body: JSON.stringify({
        serviceTypeIds,
        date,
        startTime,
        referenceComment: referenceComment || null,
        clientName,
        clientPhone,
        clientEmail,
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => null)
      const message = mapCreateError(res.status, err)
      throw new Error(message)
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
    client: { id: crypto.randomUUID(), name: clientName },
    startTime: start.toISOString().slice(0, 19),
    endTime: end.toISOString().slice(0, 19),
    durationMinutes: totalDuration,
    price: totalPrice,
    referenceImage: null,
    referenceComment: referenceComment || null,
    status: 'pendiente',
    statusDetail: 'Turno pendiente de confirmación',
  }
  return res.json()
}

// Traduce los errores del backend a mensajes claros para el usuario.
function mapCreateError(status, err) {
  if (status === 401) {
    return 'Tu sesión venció. Recargá la página y volvé a intentar.'
  }
  if (status === 400 && err?.error === 'ClientDataRequired') {
    return 'Completá tu nombre y email para reservar.'
  }
  if (status === 409 && err?.error === 'SlotUnavailable') {
    return 'Ese horario ya no está disponible. Elegí otro.'
  }
  return err?.message || 'No se pudo crear la cita. Intentá de nuevo.'
}
