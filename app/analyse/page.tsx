'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ExcelAnalyzer from '@/components/ExcelAnalyzer'
import LejlighederListe from '@/components/LejlighederListe'

export default function AnalysePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    // Check if user has access to analysis
    const hasAccess = localStorage.getItem('analysis_access')
    if (hasAccess !== 'true') {
      router.push('/')
      return
    }
    setIsLoading(false)
  }, [router])

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.03),transparent_50%)]"></div>
      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed left-0 top-0 h-full w-56 bg-gray-800/90 backdrop-blur-md border-r border-gray-700/50 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Kunder Logo"
                width={100}
                height={32}
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-3 space-y-1">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-2 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'overview' 
                    ? 'text-white bg-gray-700' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                Overview
              </button>
              <button
                onClick={() => setActiveTab('lejligheder')}
                className={`w-full flex items-center px-2 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'lejligheder' 
                    ? 'text-white bg-gray-700' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Lejligheder
              </button>
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-3 border-t border-gray-700/50">
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center px-2 py-2 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tilbage til forsiden
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Top Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed left-56 right-0 top-0 h-16 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50 z-40"
      >
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">
              {activeTab === 'overview' ? 'Overview' : 'Lejligheder'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="ml-56 pt-16 min-h-screen">
        <div className="p-4">
          {activeTab === 'overview' ? (
            <ExcelAnalyzer />
          ) : (
            <LejlighederListe />
          )}
        </div>
      </main>
    </motion.div>
  )
}
