import AppRouter from './router/AppRouter'
import { ServicesProvider } from './context/ServicesContext'

export default function App() {
  return (
    <ServicesProvider>
      <AppRouter />
    </ServicesProvider>
  )
}
