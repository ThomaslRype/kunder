'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AccessCodeModal from '@/components/AccessCodeModal'
import ContactModal from '@/components/ContactModal'
import AnalysisModal from '@/components/AnalysisModal'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CaseStudy from '@/components/CaseStudy'
import Footer from '@/components/Footer'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
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

  const handleAuthSuccess = () => {
    localStorage.setItem('kunder_authenticated', 'true')
    setIsAuthenticated(true)
    setShowModal(false)
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-gray-300/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-gray-400/30 rounded-full blur-xl"
          />
        </div>

        <div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Kunder
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Fremviser, effektiviserer og optimerer lejemål for investorer
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="btn-primary text-xl px-8 py-4"
          >
            Få adgang til platformen
          </motion.button>
        </div>

        <AccessCodeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleAuthSuccess}
        />
        
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
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
                Analysværktøj
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Contact button clicked')
                  setShowContactModal(true)
                }}
                className="btn-secondary"
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
                  <p className="text-gray-600">Suboptimal prissætning der ikke reflekterer den faktiske markedsværdi af dine lejemål</p>
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
