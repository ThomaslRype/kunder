'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as XLSX from 'xlsx'

interface ExcelData {
  [key: string]: any
}

// Function to format Excel dates
const formatExcelDate = (value: any): string => {
  if (!value) return ''
  
  // If it's already a string that looks like a date, return as is
  if (typeof value === 'string' && (value.includes('/') || value.includes('-'))) {
    return value
  }
  
  // If it's a number (Excel serial date), convert it
  if (typeof value === 'number' && value > 1) {
    // Excel date serial number starts from 1900-01-01
    // But Excel incorrectly treats 1900 as a leap year, so we need to adjust
    const excelEpoch = new Date(1900, 0, 1)
    const date = new Date(excelEpoch.getTime() + (value - 2) * 24 * 60 * 60 * 1000)
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return value.toString()
    }
    
    // Format as DD/MM/YYYY
    return date.toLocaleDateString('da-DK')
  }
  
  return value.toString()
}

export default function LejlighederListe() {
  const [excelData, setExcelData] = useState<ExcelData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('alle')
  const [sortBy, setSortBy] = useState('adresse')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [priceComparison, setPriceComparison] = useState<{
    totalOldPrice: number
    totalNewPrice: number
    difference: number
    propertiesWithNewPrice: number
  } | null>(null)

  useEffect(() => {
    loadExcelData()
  }, [])

  // Function to calculate price comparison
  const calculatePriceComparison = (data: ExcelData[]) => {
    let totalOldPrice = 0
    let totalNewPrice = 0
    let propertiesWithNewPrice = 0

    console.log('🔍 Available columns:', Object.keys(data[0] || {}))

    data.forEach((row, index) => {
      // Try multiple column name variations
      const oldPrice = parseFloat(row['Rå leje'] || row['rå leje'] || row['Ra leje'] || row['Rå Leje'] || row['Månedlig leje'] || row['månedlig leje'] || 0)
      const newPrice = parseFloat(row['Ny pris'] || row['ny pris'] || row['Ny Pris'] || row['Ny Pris'] || 0)
      
      if (index < 3) { // Debug first 3 rows
        console.log(`Row ${index}:`, {
          allColumns: Object.keys(row),
          oldPriceValue: row['Rå leje'] || row['rå leje'] || row['Ra leje'] || row['Rå Leje'] || row['Månedlig leje'] || row['månedlig leje'],
          newPriceValue: row['Ny pris'] || row['ny pris'] || row['Ny Pris'],
          parsedOldPrice: oldPrice,
          parsedNewPrice: newPrice
        })
      }
      
      if (newPrice > 0) {
        totalOldPrice += oldPrice
        totalNewPrice += newPrice
        propertiesWithNewPrice++
        console.log(`💰 Property ${index}: Old=${oldPrice}, New=${newPrice}`)
      }
    })

    const difference = totalNewPrice - totalOldPrice

    console.log('💰 Final Price comparison:', {
      totalOldPrice,
      totalNewPrice,
      difference,
      propertiesWithNewPrice
    })

    setPriceComparison({
      totalOldPrice,
      totalNewPrice,
      difference,
      propertiesWithNewPrice
    })
  }

  const loadExcelData = async () => {
    try {
      setIsLoading(true)
      console.log('📁 Loading Excel data for lejligheder...')
      
      const response = await fetch('/Lykkebo analyse  - ny til møde.xlsx')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      
      // Try all sheets to find one with data
      let jsonData: any[] = []
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName]
        const testData = XLSX.utils.sheet_to_json(worksheet)
        if (testData.length > 0) {
          jsonData = testData
          console.log(`✅ Using sheet: ${sheetName} with ${testData.length} rows`)
          break
        }
      }

      if (jsonData.length === 0) {
        throw new Error('No data found in Excel file')
      }

      setExcelData(jsonData)
      console.log('✅ Excel data loaded successfully:', jsonData.length, 'properties')
      
      // Calculate price comparison
      calculatePriceComparison(jsonData)
      
    } catch (err) {
      console.error('❌ Error loading Excel data:', err)
      setError('Kunne ikke indlæse Excel filen. Kontroller at filen eksisterer.')
    } finally {
      setIsLoading(false)
    }
  }

  // Get unique status values
  const statusValues = Array.from(new Set(
    excelData.map(row => row['Status'] || row['status']).filter(Boolean)
  ))

  // Filter and sort data
  const filteredData = excelData
    .filter(row => {
      const matchesSearch = Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      const matchesStatus = statusFilter === 'alle' || 
        (row['Status'] || row['status']) === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortBy] || ''
      const bValue = b[sortBy] || ''
      
      if (sortOrder === 'asc') {
        return String(aValue).localeCompare(String(bValue))
      } else {
        return String(bValue).localeCompare(String(aValue))
      }
    })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/30 backdrop-blur-md rounded-xl p-6 border border-red-700/50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-300 mb-2">Fejl ved indlæsning</h3>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  // Get column names from first row, excluding Link/kommentar
  const columns = excelData.length > 0 
    ? Object.keys(excelData[0]).filter(col => 
        !col.toLowerCase().includes('link') && 
        !col.toLowerCase().includes('kommentar') &&
        !col.toLowerCase().includes('comment')
      ) 
    : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">Lejligheder</h2>
          <p className="text-gray-400 mt-1">
            {filteredData.length} af {excelData.length} lejligheder
          </p>
        </div>
      </motion.div>

      {/* Price Comparison Summary */}
      {priceComparison && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold text-white mb-4">💰 Pris Sammenligning</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-300 text-sm font-medium">Samlet Rå Leje</div>
              <div className="text-blue-400 text-xl font-bold">
                {priceComparison.totalOldPrice.toLocaleString()} kr
              </div>
            </div>
            <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/50">
              <div className="text-green-300 text-sm font-medium">Samlet Ny Pris</div>
              <div className="text-green-400 text-xl font-bold">
                {priceComparison.totalNewPrice.toLocaleString()} kr
              </div>
            </div>
            <div className={`rounded-lg p-4 border ${
              priceComparison.difference >= 0 
                ? 'bg-green-900/30 border-green-700/50' 
                : 'bg-red-900/30 border-red-700/50'
            }`}>
              <div className={`text-sm font-medium ${
                priceComparison.difference >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                Forskellen
              </div>
              <div className={`text-xl font-bold ${
                priceComparison.difference >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {priceComparison.difference >= 0 ? '+' : ''}{priceComparison.difference.toLocaleString()} kr
              </div>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/50">
              <div className="text-purple-300 text-sm font-medium">Lejligheder med ny pris</div>
              <div className="text-purple-400 text-xl font-bold">
                {priceComparison.propertiesWithNewPrice}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Søg
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søg i alle felter..."
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="alle">Alle statusser</option>
              {statusValues.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sorter efter
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {columns.map(column => (
                <option key={column} value={column}>{column}</option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rækkefølge
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="asc">Stigende</option>
              <option value="desc">Faldende</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Properties Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredData.map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.02 }}
                  className="hover:bg-gray-700/30 transition-colors duration-200"
                >
                  {columns.map((column, colIndex) => {
                    const value = row[column]
                    const isStatus = column.toLowerCase().includes('status')
                    const isRent = column.toLowerCase().includes('leje') || column.toLowerCase().includes('rent')
                    const isDate = column.toLowerCase().includes('dato') || column.toLowerCase().includes('date')
                    const isNumeric = typeof value === 'number' && !isRent && !isDate
                    
                    
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-3 text-sm text-gray-300"
                      >
                        {isStatus ? (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            String(value).toLowerCase().trim() === 'opsagt' 
                              ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50'
                              : String(value).toLowerCase().trim() === 'tomgang'
                              ? 'bg-red-900/30 text-red-300 border border-red-700/50'
                              : 'bg-green-900/30 text-green-300 border border-green-700/50'
                          }`}>
                            {value}
                          </span>
                        ) : isRent ? (
                          <span className="font-mono">
                            {typeof value === 'number' ? value.toLocaleString() + ' kr' : value}
                          </span>
                        ) : isDate ? (
                          <span className="font-mono">
                            {formatExcelDate(value)}
                          </span>
                        ) : isNumeric ? (
                          <span className="font-mono">
                            {value.toFixed(2)}
                          </span>
                        ) : (
                          <span>{value}</span>
                        )}
                      </td>
                    )
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Ingen lejligheder fundet</div>
            <div className="text-gray-500 text-sm mt-1">
              Prøv at ændre søgekriterierne
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
