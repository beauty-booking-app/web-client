import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import BookingPage from '../pages/BookingPage'
import MyBookingsPage from '../pages/MyBookingsPage'

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reserva" element={<BookingPage />} />
        <Route path="/mis-turnos" element={<MyBookingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
