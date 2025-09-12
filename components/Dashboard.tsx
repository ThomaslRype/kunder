'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  TrendingUp, 
  CheckCircle, 
  DollarSign, 
  Building, 
  Users, 
  Clock,
  Target,
  BarChart3
} from 'lucide-react'

const dashboardItems = [
  {
    icon: Building,
    title: "1.500",
    subtitle: "Aktive Lejemål",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: CheckCircle,
    title: "0,43%",
    subtitle: "Tomgang",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    icon: TrendingUp,
    title: "10%",
    subtitle: "Øget Omsætning",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: DollarSign,
    title: "1,2M",
    subtitle: "Årlig Meromsætning",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600"
  },
  {
    icon: Users,
    title: "5",
    subtitle: "Aktive Cases",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600"
  },
  {
    icon: Clock,
    title: "24/7",
    subtitle: "Support",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  }
]

const bulletPoints = [
  "Fremviser, effektiviserer og optimerer lejemål for investorer",
  "1.778 aktive lejemål med kun 0,2% gennemsnitlig tomgang",
  "Specialister i de sværeste lejemål andre ikke kan udleje",
  "Genererer over 1,2 millioner kr i årlig meromsætning",
  "6 aktive cases med imponerende resultater",
  "77 dages gennemsnitsliggetid på sværeste lejemål"
]

export default function Dashboard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className={`${item.bgColor} rounded-xl p-4 text-center group cursor-pointer border border-gray-200`}
            >
              <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1`}>
                {item.title}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {item.subtitle}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bullet Points Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Hvad vi tilbyder</h3>
            <p className="text-lg text-gray-600">Professionel udlejningsoptimering med konkrete resultater</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {bulletPoints.slice(0, 3).map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {bulletPoints.slice(3, 6).map((point, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index + 3) * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
