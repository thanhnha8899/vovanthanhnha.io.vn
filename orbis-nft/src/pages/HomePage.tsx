import { Footer, Navbar } from '../components/layout'
import {
  AboutSection,
  ContactSection,
  CtaStripSection,
  FaqSection,
  FeaturesSection,
  FreeToolsSection,
  HeroSection,
  PricingSection,
  ProjectsSection,
  ServicesSection,
  TestimonialsSection,
} from '../components/sections'

export function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <FreeToolsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <CtaStripSection />
      <Footer />
    </main>
  )
}
