'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, Award } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.1, 0.05]
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
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gray-400/30 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto pt-16 md:pt-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Fremvisning
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                  Effektivisering
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
                  Optimering
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Vi hjælper ejendomsejere og investorer med at få udlejet deres lejemål - hurtigere og ekstremt effektivt. 
                Resultat: <span className="text-gray-700 font-semibold">1.785 aktive lejemål</span> - 
                <span className="text-3xl md:text-4xl font-black text-gray-800"> 0,22% tomgang!</span>
              </p>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 max-w-lg"
            >
              <div className="relative group">
                {/* Simple gradient background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                
                {/* Clean video container */}
                <div className="relative bg-white rounded-2xl p-4 shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      playsInline
                      controls
                    >
                      <source src="/Teglgaarden.mp4" type="video/mp4" />
                      {/* Simple fallback */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 5v10l8-5-8-5z"/>
                            </svg>
                          </div>
                          <p className="text-gray-600 font-medium">Teglgaarden Video</p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-4 text-center group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-200 transition-colors">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1.785</h3>
              <p className="text-gray-600 text-xs">Aktive Lejemål</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-4 text-center group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">0,22%</h3>
              <p className="text-gray-600 text-xs">Tomgang (vs 5,40% markedet)</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-4 text-center group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-200 transition-colors">
                <Award className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">6</h3>
              <p className="text-gray-600 text-xs">Aktive Cases</p>
            </motion.div>
          </motion.div>

          {/* Client Logos Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Vores samarbejdspartnere</h3>
              <p className="text-gray-600">Vi stolte partnere i udlejningsoptimering</p>
            </div>

            <div className="relative overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -100 * 6]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
                className="flex space-x-12 items-center"
              >
                {[
                  { name: "Aengaard", logo: "/aengaard.png" },
                  { name: "Escot", logo: "/escot.svg" },
                  { name: "Gobolig", logo: "/gobolig.png" },
                  { name: "Koncenton", logo: "/koncenton.png" },
                  { name: "PKA Ejendomme", logo: "/pkaejendomme.png" },
                  { name: "Vindinggruppen", logo: "/vindinggruppen.png" },
                  // Duplicate for seamless loop
                  { name: "Aengaard", logo: "/aengaard.png" },
                  { name: "Escot", logo: "/escot.svg" },
                  { name: "Gobolig", logo: "/gobolig.png" },
                  { name: "Koncenton", logo: "/koncenton.png" },
                  { name: "PKA Ejendomme", logo: "/pkaejendomme.png" },
                  { name: "Vindinggruppen", logo: "/vindinggruppen.png" },
                ].map((client, index) => (
                  <motion.div
                    key={`${client.name}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: "160px" }}
                  >
                    <div className="bg-white rounded-2xl p-6 w-full h-20 flex items-center justify-center group hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        width={client.name === "Aengaard" ? 280 : 100}
                        height={client.name === "Aengaard" ? 140 : 50}
                        className={`w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 ${client.name === "Aengaard" ? "max-h-16" : "max-h-10"}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
