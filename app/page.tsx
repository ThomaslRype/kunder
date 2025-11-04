'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import ContactModal from '@/components/ContactModal'
import AnalysisModal from '@/components/AnalysisModal'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CaseStudy from '@/components/CaseStudy'
import Footer from '@/components/Footer'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('kunder_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Define password-to-route mapping
    const passwordRoutes: { [key: string]: string } = {
      'dmudlejning2025': 'home', // Main landing page
      'Lykkebo2025': 'analyse', // Analysis page
      'Teglgaarden2025': 'teglgaarden', // Teglgaarden project page
    }
    
    const route = passwordRoutes[code]
    
    if (route === 'home') {
      localStorage.setItem('kunder_authenticated', 'true')
      setIsAuthenticated(true)
    } else if (route === 'analyse') {
      localStorage.setItem('analysis_access', 'true')
      window.location.href = '/analyse'
    } else if (route === 'teglgaarden') {
      localStorage.setItem('teglgaarden_access', 'true')
      window.location.href = '/teglgaarden'
    } else {
      alert('Forkert adgangskode. Prøv igen.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('kunder_authenticated')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full"
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex">
        {/* Left Panel - Dark Theme */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-900 text-white p-12 flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto text-center"
          >
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="bg-gray-800 rounded-xl p-4 w-fit">
                <Image
                  src="/Logo-dmudlejning.png"
                  alt="DM Udlejning Logo"
                  width={120}
                  height={60}
                  className="h-8 w-auto"
                />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold mb-6">
              Teglgaarden<br />
              på Stigsborg
            </h1>
            
            {/* Description */}
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              <span className="text-white font-semibold text-xl">Nye lejeboliger hvor kvalitet og varme mødes</span>
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8 justify-items-center">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">🏠</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Moderne boliger</h3>
                  <p className="text-gray-400 text-xs">Lyse boliger med plantegninger</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">🌿</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Fællesfaciliteter</h3>
                  <p className="text-gray-400 text-xs">Fællesrum og byliv</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Stigsborg Parkvej</h3>
                  <p className="text-gray-400 text-xs">Perfekt placering</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">🧑‍🤝‍🧑</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Fællesskab</h3>
                  <p className="text-gray-400 text-xs">Byggeri med omtanke</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">🏢</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">A. Enggaard A/S</h3>
                  <p className="text-gray-400 text-xs">Erfaren bygherre</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">📋</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Planer og priser</h3>
                  <p className="text-gray-400 text-xs">Se alle lejligheder</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center space-y-2 mb-4">
              <p className="text-white font-semibold text-lg">Ring til os</p>
              <a href="tel:72170008" className="text-gray-300 text-lg hover:text-white transition-colors">
                72 17 00 08
              </a>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Klar til indflytning</span>
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Light Theme - Login Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm mx-auto px-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Hop ind og kig</h2>
              <p className="text-gray-600 text-base">Brug kodeordet vi sendte i mailen</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mx-auto">
              <form onSubmit={handleAuthSuccess} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adgangskode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Indtast adgangskode"
                      className="w-full px-4 py-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      aria-label={showPassword ? "Skjul adgangskode" : "Vis adgangskode"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg"
                >
                  <span>Log ind</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Sikker login med 256-bit SSL kryptering
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Har du problemer med at logge ind, kontakt os på <span className="font-semibold text-gray-800">25 40 09 05</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Kunder Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-600 hidden sm:block">
                  Din Udlejningsmægler
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Analysis button clicked')
                  setShowAnalysisModal(true)
                }}
                className="btn-secondary text-sm whitespace-nowrap"
              >
                Ejendomssystem
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Contact button clicked')
                  setShowContactModal(true)
                }}
                className="btn-secondary text-sm"
              >
                Gratis vurdering af portefølje
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Log ud
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        <Hero />
        
        {/* Pain Points & Solutions Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-16"
              >
                Kender du en eller flere af disse udfordringer?
              </motion.h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Boliger står tomme i måneder</h3>
                  <p className="text-gray-600">Længere tomgangsperioder end nødvendigt på grund af ineffektiv markedsføring og fremvisning</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">For lav lejeindtægt ift. markedet</h3>
                  <p className="text-gray-600">Prissætning der ikke reflekterer den faktiske markedsværdi af dine lejemål</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Lav intensitet på fremvisninger og markedsføring</h3>
                  <p className="text-gray-600">Manglende fokus på aktiv markedsføring og professionel fremvisning af lejemålene</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 md:p-12 text-white"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Vi klarer markedsføring, fremvisninger, lejer-screening og optimering</h3>
                <p className="text-xl text-gray-200">Så DU kan få en utrolig attraktiv og optimeret portefølje.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <Features />
        
        {/* Getting Started Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-16"
              >
                Hvad skal der til for at komme igang?
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                      Det eneste vi skal bruge fra dig, er en lejeliste
                    </h3>
                    <div className="space-y-4 text-gray-600">
                      <p>Vi analyserer lejelisten og kommer med forslag til lejeniveau. Vi besigter ejendommene og lejemålene.</p>
                      <p><strong>Indenfor en uge</strong> kan alle boligerne være klar til at blive markedsført.</p>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Vi tager os af alt - hurtigt, nemt og uden opstartsproblemer
                    </h4>
                    <div className="space-y-4 text-gray-600">
                      <p>Kommunikationen til evt. administrator tager vi os af, så onboarding bliver utrolig hurtig og simpel.</p>
                      <p>Vi har prøvet det før, og noget som virker som en uoverskuelig proces, bliver <strong>ekstremt overskuelig</strong>.</p>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 pt-8 border-t border-gray-200"
                >
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✓ Ingen opstartsproblemer</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">✓ Hurtig onboarding</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">✓ Professionel håndtering</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <CaseStudy />
        <Footer />
      </main>
      
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
      
      <AnalysisModal
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
      />
    </motion.div>
  )
}
