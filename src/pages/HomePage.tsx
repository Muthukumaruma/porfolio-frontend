import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Experience from '../components/sections/Experience'
import Skills from '../components/sections/Skills'
import Portfolio from '../components/sections/Portfolio'
import GitHub from '../components/sections/GitHub'
import Contact from '../components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Skills />
        <Portfolio />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
