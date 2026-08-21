import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'

const BookingPage = lazy(() => import('../pages/BookingPage'))
const MyBookingsPage = lazy(() => import('../pages/MyBookingsPage'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reserva" element={<BookingPage />} />
          <Route path="/mis-turnos" element={<MyBookingsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
