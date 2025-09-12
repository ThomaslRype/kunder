'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const clients = [
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
]

export default function ClientLogos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Vores samarbejdspartnere</h3>
          <p className="text-gray-600 text-lg">Vi stolte partnere i udlejningsoptimering</p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -100 * clients.length / 2]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex space-x-16 items-center"
          >
            {clients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: "180px" }}
              >
                <div className="bg-white rounded-2xl p-8 w-full h-24 flex items-center justify-center group hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={client.name === "Aengaard" ? 320 : 120}
                    height={client.name === "Aengaard" ? 160 : 60}
                    className={`w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 ${client.name === "Aengaard" ? "max-h-32" : "max-h-12"}`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}