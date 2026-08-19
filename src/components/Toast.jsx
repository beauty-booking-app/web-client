import { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function Toast({ message, onClose, duration = 5000 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!message) return
    const raf = requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [message, duration, onClose])

  if (!message) return null

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-50 flex items-start gap-3 max-w-sm w-full bg-red-50 border border-red-200 rounded-2xl p-4 shadow-lg transition-all duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
      <p className="text-sm text-red-700 flex-1">{message}</p>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(onClose, 300)
        }}
        className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
