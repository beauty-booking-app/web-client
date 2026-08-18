import { useContext } from 'react'
import { ServicesContext } from '../context/servicesContext'

export function useServices() {
  const ctx = useContext(ServicesContext)
  if (!ctx) throw new Error('useServices debe usarse dentro de ServicesProvider')
  return ctx
}
