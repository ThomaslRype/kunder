'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Camera, 
  Users, 
  Home, 
  TrendingUp, 
  Eye, 
  CreditCard, 
  GraduationCap,
  BarChart3,
  Zap,
  Shield
} from 'lucide-react'

const coreFeatures = [
  {
    icon: BarChart3,
    title: "Fremvisning",
    description: "Professionel præsentation af dine lejemål",
    expandedText: "Vores team har bevist, og beviser stadig, at vi er de bedste fremvisere i landet. Vi lader aldrig lejeren fremvise selv, og er derfor altid til stede ved fremvisninger. Uanset stand, lejepris eller honorar. Alle boliger får nøjagtig den kærlighed. Derfor er vores tomgangsprocent så lav!"
  },
  {
    icon: Zap,
    title: "Effektivisering",
    description: "Strømlinede processer for maksimal effektivitet",
    expandedText: "Vi har optimeret hver enkelt del af udlejningsprocessen for at sikre maksimal effektivitet. Fra den første kontakt til kontraktunderskrivelse - alt er gennemtænkt og strømlinet for at spare tid og ressourcer."
  },
  {
    icon: Shield,
    title: "Optimering",
    description: "Data-drevet optimering af lejemål",
    expandedText: "Vi bruger avancerede dataanalyser og markedsindsigt til at optimere hvert enkelt lejemål. Fra prissætning til markedsføring - alt er baseret på konkrete data for at sikre det bedste resultat."
  }
]

const services = [
  {
    icon: Camera,
    title: "Markedsføring",
    description: "Billeder og video"
  },
  {
    icon: Users,
    title: "Stor kundegruppe",
    description: "På sociale medier og lejekartotek"
  },
  {
    icon: Home,
    title: "Besigtigelse",
    description: "Af lejemål og opgange"
  },
  {
    icon: TrendingUp,
    title: "Optimering",
    description: "Af lejeniveau"
  },
  {
    icon: Eye,
    title: "Fremvisning",
    description: "Vi fremviser altid, selvom der bor lejere"
  },
  {
    icon: CreditCard,
    title: "Kreditvurdering",
    description: "Vi laver kreditvurderinger"
  },
  {
    icon: GraduationCap,
    title: "Stærkt team",
    description: "Der løbende bliver uddannet i salg"
  }
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hvad vi tilbyder
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professionel udlejningsoptimering med imponerende resultater
          </p>
        </motion.div>

        {/* Core Features - Modern Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Vores kernekompetencer</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vores kernekompentencer skiller os ud fra mængden.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 h-full border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-700 ease-in-out text-center relative overflow-hidden group-hover:max-h-none max-h-80 group-hover:pb-12">
                  {/* Subtle background pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Expanded text on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-300 transform translate-y-6 group-hover:translate-y-0">
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {feature.expandedText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Section - Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent rounded-3xl"></div>
          
          <div className="relative z-10 p-12">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="inline-block"
              >
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-4 py-2 rounded-full">
                  Vores Services
                </span>
              </motion.div>
              
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-6"
              >
                Hvad vi gør for at udleje
              </motion.h4>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Konkrete tiltag og services der sikrer optimal udlejning af dine lejemål
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  whileHover={{ 
                    y: -4,
                    scale: 1.01,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  className="group relative"
                >
                  {/* Minimalist card */}
                  <div className="bg-white rounded-xl p-6 h-full border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                    {/* Simple icon */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors duration-200">
                      <service.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}