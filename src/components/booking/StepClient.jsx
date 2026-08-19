import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, MoveLeft } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres'),
  email: z.string().email('Ingresá un email válido'),
})

export default function StepClient({ client, onChange, onConfirm, onBack, submitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: client,
  })

  const onSubmit = (data) => {
    onChange(data)
    onConfirm(data)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
        Paso 03
      </p>
      <h1 className="font-display text-3xl sm:text-4xl mb-2">
        Decinos quién sos
      </h1>
      <p className="text-foreground/70 text-sm mb-10">
        Así nos acordamos de vos cuando vengas.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 mb-3"
          >
            <User className="h-3.5 w-3.5" strokeWidth={1.5} /> Nombre y apellido *
          </label>

          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full bg-card border border-border rounded-xl py-3 px-4 text-lg focus:border-primary focus:outline-none transition-colors"
            placeholder="Tu nombre"
          />

          {errors.name && (
            <p role="alert" className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label
            htmlFor="phone"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 mb-3 block"
          >
            Teléfono *
          </label>

          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full bg-card border border-border rounded-xl py-3 px-4 text-lg focus:border-primary focus:outline-none transition-colors"
            placeholder="+54 ..."
          />

          {errors.phone && (
            <p role="alert" className="text-sm text-red-500 mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 mb-3 block"
          >
            Email *
          </label>

          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full bg-card border border-border rounded-xl py-3 px-4 text-lg focus:border-primary focus:outline-none transition-colors"
            placeholder="tu@email.com"
          />

          {errors.email && (
            <p role="alert" className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Navegación */}
        <div className="sm:col-span-2 flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={submitting}
            className="font-mono text-[10px] uppercase tracking-wide font-semibold text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-30"
          >
            <MoveLeft className="h-3 w-3 animate-bounce" style={{ animationDuration: "2.5s" }} />
            Atrás
          </button>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="font-mono text-[10px] sm:text-xs uppercase tracking-wide font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
          >
            {submitting ? 'Confirmando...' : 'Confirmar'}
          </button>
        </div>
      </form>
    </div>
  )
}
