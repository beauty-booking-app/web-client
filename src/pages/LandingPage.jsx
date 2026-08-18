import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServiceCatalog from '../components/ServiceCatalog'
import About from '../components/About'
import PreFooterBanner from '../components/PreFooterBanner'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceCatalog />
      <About />
      <PreFooterBanner />
      <Footer />
    </>
  )
}
