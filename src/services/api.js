import { getClientToken } from '../lib/clientToken.js'

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

// ─── GET /availability/validate ─────────────────────────────────────
// Valida que un horario siga disponible antes de confirmar la reserva.
export async function validateSlot(serviceTypeIds, date, startTime) {
  const params = new URLSearchParams({ date, startTime })
  serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
  const res = await fetch(`${BASE_URL}/api/v1/availability/validate?${params}`)
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    if (res.status === 409 && err?.error === 'SlotUnavailable') {
      throw Object.assign(new Error('SlotUnavailable'), { code: 'SlotUnavailable' })
    }
    throw new Error(err?.message || 'Error al validar disponibilidad')
  }
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

// ─── GET /public/appointments/by-human-id/{humanId} ────────────────
// Consulta pública de turno por código. No requiere autenticación.
export async function fetchAppointmentByHumanId(humanId) {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}`)
  if (!res.ok) {
    if (res.status === 404) {
      throw Object.assign(new Error('NotFound'), { code: 'NotFound' })
    }
    throw new Error('Error al buscar el turno')
  }
  return res.json()
}

// ─── PATCH /public/appointments/by-human-id/{humanId}/cancel ───────
// Cancela un turno por código. Requiere email o phone del dueño.
export async function cancelAppointmentByHumanId(humanId, { email, phone, reason } = {}) {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}/cancel`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason, email: email || null, phone: phone || null }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    if (res.status === 403) {
      throw Object.assign(new Error('ContactMismatch'), { code: 'ContactMismatch', details: err?.details })
    }
    if (res.status === 409 && err?.error === 'CannotCancel') {
      throw Object.assign(new Error('CannotCancel'), { code: 'CannotCancel', details: err?.details })
    }
    throw new Error(err?.message || 'No se pudo cancelar el turno')
  }
  return res.json()
}

// ─── POST /public/appointments/by-human-id/{humanId}/reschedule ────
// Reprograma un turno por código. Requiere email o phone del dueño.
export async function rescheduleAppointmentByHumanId(humanId, { date, startTime, email, phone }) {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}/reschedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, startTime, email: email || null, phone: phone || null }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    if (res.status === 403) {
      throw Object.assign(new Error('ContactMismatch'), { code: 'ContactMismatch', details: err?.details })
    }
    if (res.status === 409 && err?.error === 'SlotUnavailable') {
      throw Object.assign(new Error('SlotUnavailable'), { code: 'SlotUnavailable' })
    }
    if (res.status === 409 && err?.error === 'CannotReschedule') {
      throw Object.assign(new Error('CannotReschedule'), { code: 'CannotReschedule', details: err?.details })
    }
    throw new Error(err?.message || 'No se pudo reprogramar el turno')
  }
  return res.json()
}
