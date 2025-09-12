'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 bg-gray-100/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Din Udlejningsmægler</h3>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Vi er specialister i at fremvise, effektivisere og optimere lejemål for investorer. 
              Vores mission er at maksimere værdien af dine investeringer gennem intelligent strategi og professionel håndtering.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Tjenester</h4>
            <ul className="space-y-3">
              {['Lejemålsfremvisning', 'Markedsanalyse', 'Lejer-screening', 'Ejendomsoptimering', 'Investeringsrådgivning'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">thomas@dmbolig.dk</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">25 40 09 05</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Hadsundvej 5, 9000 Aalborg</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Din Udlejningsmægler. Alle rettigheder forbeholdes.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Privatlivspolitik
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Vilkår
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
