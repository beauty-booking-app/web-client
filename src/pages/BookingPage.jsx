import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useServices } from '../hooks/useServices'
import StepServices from '../components/booking/StepServices'
import StepDateTime from '../components/booking/StepDateTime'
import StepClient from '../components/booking/StepClient'
import StepConfirm from '../components/booking/StepConfirm'
import { createAppointment } from '../services/api'

const STEPS = [
  { id: 1, label: 'Servicios' },
  { id: 2, label: 'Fecha y hora' },
  { id: 3, label: 'Tus datos' },
]

export default function BookingPage() {
  const { selectedTypes, toggleType, clearSelectedTypes } = useServices()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [client, setClient] = useState({ name: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [appointment, setAppointment] = useState(null)

  const goNext = () => setStep((s) => Math.min(s + 1, 4))
  const goBack = () => {
    setSubmitError(null)
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleConfirm = async (clientData) => {
    if (submitting) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createAppointment({
        serviceTypeIds: selectedTypes,
        date,
        startTime: time,
        clientName: clientData.name,
        clientPhone: clientData.phone,
        clientEmail: clientData.email,
      })
      setAppointment(created)
      setStep(4)
    } catch (err) {
      setSubmitError(err.message || 'No se pudo crear la cita. Intentá de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="px-[6%] sm:px-[8%] pt-8 pb-6 border-b border-border">
        <Link
          to="/"
          aria-label="Volver al inicio"
          onClick={clearSelectedTypes}
          className="font-mono text-[10px] uppercase tracking-wide font-semibold text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-2 mb-6"
        >
          ← Volver al inicio
        </Link>

        {step <= 3 && (
          <nav aria-label="Pasos del reserva" className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[10px] h-7 w-7 flex items-center justify-center rounded-full border transition-colors ${
                      step > s.id
                        ? 'border-accent bg-accent text-accent-foreground'
                        : step === s.id
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-border text-foreground/40'
                    }`}
                    aria-current={step === s.id ? 'step' : undefined}
                  >
                    {step > s.id ? <Check className="h-3.5 w-3.5" /> : String(s.id).padStart(2, '0')}
                  </span>

                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide hidden sm:inline ${
                      step === s.id ? 'text-foreground' : 'text-foreground/40'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px bg-border mx-3" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-[6%] sm:px-[8%] py-10">
        {step === 1 && (
          <StepServices
            selected={selectedTypes}
            onToggle={toggleType}
            onNext={goNext}
          />
        )}

        {step === 2 && (
          <StepDateTime
            serviceTypeIds={selectedTypes}
            date={date}
            time={time}
            onDate={setDate}
            onTime={setTime}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 3 && (
          <StepClient
            client={client}
            onChange={setClient}
            onNext={handleConfirm}
            onBack={goBack}
            submitting={submitting}
            error={submitError}
          />
        )}

        {step === 4 && (
          <StepConfirm
            services={selectedTypes}
            date={date}
            time={time}
            client={client}
            appointment={appointment}
          />
        )}
      </main>
    </div>
  )
}
