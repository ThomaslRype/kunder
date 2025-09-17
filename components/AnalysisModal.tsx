'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BarChart3, TrendingUp, PieChart } from 'lucide-react'
import Image from 'next/image'

interface AnalysisModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AnalysisModal({ isOpen, onClose }: AnalysisModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  console.log('AnalysisModal isOpen:', isOpen)

  const analysisTools = [
    {
      image: '/Dashboard.png',
      title: 'Dashboard',
      description: 'Overblik over din portefølje',
      icon: BarChart3
    },
    {
      image: '/Statisklejebolig.png',
      title: 'Lejebolig Statistik',
      description: 'Detaljeret analyse af lejeboliger',
      icon: TrendingUp
    },
    {
      image: '/Statistikdemo.png',
      title: 'Statistik Demo',
      description: 'Interaktiv statistik demonstration',
      icon: PieChart
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl p-8 max-w-6xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Analysværktøj du får adgang til
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Få adgang til vores avancerede analysværktøjer for at optimere din udlejningsportefølje
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {analysisTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                    {/* Image */}
                    <div 
                      className="mb-6 rounded-lg overflow-hidden shadow-xl cursor-pointer group-hover:shadow-2xl transition-all duration-300"
                      onClick={() => {
                        console.log('Image clicked:', tool.image)
                        setSelectedImage(tool.image)
                      }}
                    >
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        width={500}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <tool.icon className="w-6 h-6 text-gray-600" />
                        <h4 className="text-xl font-semibold text-gray-800">
                          {tool.title}
                        </h4>
                      </div>
                      <p className="text-base text-gray-600">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-8"
            >
              <p className="text-gray-600 mb-2">
                Få adgang til disse værktøjer når du udlejer gennem os
              </p>
              <p className="text-sm text-gray-500">
                * Billederne viser kun demo-data - ikke faktiske tal
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Image */}
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt="Full size"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
