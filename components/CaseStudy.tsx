'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, CheckCircle, Calendar, DollarSign, MapPin, Building } from 'lucide-react'

const cases = [
  {
    id: 1,
    name: "Case A",
    location: "Aalborg og Nørresundby",
    date: "10. september 2025",
    before: { tomgang: 10, tilUdlejning: 21 },
    after: { tomgang: 0, tilUdlejning: 138 },
    meromsætning: 854945,
    period: "4 måneder",
    highlight: "854.945 kr portefølje optimering",
    details: {
      lejeniveau: 28284,
      emner: 13,
      beskrivelse: "Justeret lejeniveauer på 13 emner"
    }
  },
  {
    id: 2,
    name: "Case B",
    location: "Aalborg Øst",
    date: "10. september 2025",
    before: { tomgang: "Ukendt", tilUdlejning: "Ukendt" },
    after: { tomgang: 0, tilUdlejning: 319 },
    meromsætning: 0,
    period: "Siden Juni 2023",
    highlight: "319 fuldt udlejede lejemål med lang interesseliste",
    details: {
      konkurrent: { tomgang: 69, total: 249 },
      interesseliste: "Lang interesseliste på mange modeller",
      beskrivelse: "Fuldt udlejet vs konkurrent med 27,7% tomgang"
    }
  },
  {
    id: 3,
    name: "Case C",
    location: "Aalborg og Nørresundby",
    date: "10. september 2025",
    before: { tomgang: 14, tilUdlejning: 150 },
    after: { tomgang: 0, tilUdlejning: 150 },
    meromsætning: 904319,
    period: "Siden Q1 2022",
    highlight: "904.319 kr meromsætning"
  },
  {
    id: 4,
    name: "Case D",
    location: "Aalborg området",
    date: "10. september 2025",
    before: { tomgang: 13, tilUdlejning: 159 },
    after: { tomgang: 0, tilUdlejning: 159 },
    meromsætning: 1507104,
    period: "Siden Q2 2022",
    highlight: "1.507.104 kr meromsætning"
  },
  {
    id: 5,
    name: "Case E",
    location: "Aalborg C",
    date: "10. september 2025",
    before: { tomgang: 9, tilUdlejning: 150 },
    after: { tomgang: 0, tilUdlejning: 119 },
    meromsætning: 0,
    period: "Siden Q3 2024",
    highlight: "0% tomgang opnået"
  },
  {
    id: 6,
    name: "Case F",
    location: "Aalborg C",
    date: "10. september 2025",
    before: { tomgang: "Ukendt", tilUdlejning: "Ukendt" },
    after: { tomgang: 0.44, tilUdlejning: 900 },
    meromsætning: 0,
    period: "Siden Q2 2023",
    highlight: "77 dages udlejningshastighed på sværeste lejemål"
  }
]

export default function CaseStudy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 relative bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Vores Succeshistorier
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-6"
          >
            Se hvordan vi har transformeret udlejningsporteføljer og genereret millioner i ekstra omsætning
          </motion.p>
          
          {/* Tomgangsberegning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
          </motion.div>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="glass rounded-2xl p-6 group cursor-pointer relative overflow-hidden h-full flex flex-col"
            >
              {/* Subtle background on hover */}
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{caseItem.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{caseItem.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{caseItem.date}</div>
                    <div className="text-xs text-gray-400">{caseItem.period}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Aktive lejemål:</span>
                    <span className="font-semibold text-gray-800">{caseItem.after.tilUdlejning}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tomgang:</span>
                    <span className={`font-semibold ${caseItem.after.tomgang === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                      {caseItem.after.tomgang}%
                    </span>
                  </div>
                  {caseItem.meromsætning > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Meromsætning:</span>
                      <span className="font-bold text-green-600">
                        +{caseItem.meromsætning.toLocaleString('da-DK')} kr
                      </span>
                    </div>
                  )}
                </div>

                {/* Highlight */}
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <Building className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Nøgle-resultat</span>
                  </div>
                  <p className="text-sm text-gray-600">{caseItem.highlight}</p>
                </div>

                {/* Middle content with flex-grow */}
                <div className="flex-grow">
                  {/* Lejeniveau optimering for Case A */}
                  {caseItem.details && caseItem.details.lejeniveau && (
                    <div className="mt-4 bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Lejeniveau Optimering</span>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600 mb-1">
                          +{caseItem.details.lejeniveau.toLocaleString('da-DK')} kr/år
                        </div>
                        <div className="text-xs text-green-600">
                          {caseItem.details.emner} emner • {caseItem.details.beskrivelse}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Konkurrent sammenligning for Case B */}
                  {caseItem.details && caseItem.details.konkurrent && (
                    <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Konkurrent Sammenligning</span>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600 mb-1">
                          Lignende projekter i områet har mellem 5% og 27% tomgang
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom content - always at bottom */}
                <div className="mt-auto">
                  {/* Before/After for specific cases */}
                  {caseItem.before.tomgang !== "Ukendt" && caseItem.after.tomgang !== caseItem.before.tomgang && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-red-600">Før: {caseItem.before.tomgang} tomgang</span>
                        <span className="text-green-600">Efter: {caseItem.after.tomgang} tomgang</span>
                      </div>
                    </div>
                  )}

                  {/* Aktuel status for Case B */}
                  {caseItem.name === "Case B" && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Aktuel status:</span>
                        <span className="text-green-600 font-semibold">{caseItem.after.tilUdlejning} boliger • 0 i tomgang</span>
                      </div>
                    </div>
                  )}

                {/* Special message for Case F */}
                {caseItem.name === "Case F" && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-xs text-gray-600 leading-relaxed">
                          Vi står for de lejemål, de ikke har haft succes med at udleje
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
