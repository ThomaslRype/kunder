'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import Image from 'next/image'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  console.log('ContactModal isOpen:', isOpen)
  
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
            className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Content */}
            <div className="text-center">
              {/* Thomas image */}
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
                  <Image
                    src="/Thomas.png"
                    alt="Thomas"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ring til Thomas
              </h3>

              {/* Phone number */}
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gray-700" />
                </div>
                <a
                  href="tel:25400905"
                  className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200"
                >
                  25 40 09 05
                </a>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                Få en personlig vurdering af din portefølje og hør hvordan vi kan hjælpe dig med at optimere dine lejemål.
              </p>

              {/* Call to action */}
              <motion.a
                href="tel:25400905"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 mt-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Ring nu
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
