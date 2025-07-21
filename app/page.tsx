import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
    </main>
  )
}

