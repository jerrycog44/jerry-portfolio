import { MotionConfig } from 'framer-motion'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import ProjectGallery from './components/ProjectGallery'
import ServicesSection from './components/ServicesSection'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#projects"
        className="sr-only z-[200] rounded-md bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to projects
      </a>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectGallery />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionConfig>
  )
}
