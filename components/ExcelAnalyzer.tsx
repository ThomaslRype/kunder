'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as XLSX from 'xlsx'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { 
  TrendingUp, 
  Building, 
  MapPin, 
  DollarSign,
  Calendar,
  Users,
  FileText
} from 'lucide-react'

interface ExcelData {
  [key: string]: any
}

interface AnalysisResults {
  totalProperties: number
  averageRent: number
  totalRent: number
  locationStats: { [key: string]: number }
  rentDistribution: { name: string; value: number }[]
  monthlyTrends: { month: string; rent: number }[]
  propertyTypes: { [key: string]: number }
  statusStats: {
    tomgang: number
    opsagt: number
    udlejet: number
    total: number
  }
  lostRevenue: number
  totalLostRevenue: number
  propertiesWithoutRent: number
  vacantWithRent: number
  rentalStats: {
    noVacancy: number
    withVacancy: number
    total: number
    averageDaysNoVacancy: number
    averageDaysWithVacancy: number
    segments?: {
      '0-30': { count: number; totalDays: number; label: string }
      '31-60': { count: number; totalDays: number; label: string }
      '61-90': { count: number; totalDays: number; label: string }
      '91-98': { count: number; totalDays: number; label: string }
      '99-120': { count: number; totalDays: number; label: string }
      '120-180': { count: number; totalDays: number; label: string }
      '181-330': { count: number; totalDays: number; label: string }
    }
    businessCase?: {
      scenario1TotalLoss: number
      scenario1Net: number
      scenario2MonthlyRevenue: number
      scenario2TotalLoss: number
      scenario2LossMonth4: number
      scenario2LossMonth5: number
      scenario2Net: number
      totalSavings: number
      propertiesWithVacancy: number
      propertiesMonth4: number
      propertiesMonth5: number
    }
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export default function ExcelAnalyzer() {
  const [excelData, setExcelData] = useState<ExcelData[]>([])
  const [rentalSpeedData, setRentalSpeedData] = useState<ExcelData[]>([])
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadBothExcelFiles()
  }, [])

  const loadBothExcelFiles = async () => {
    try {
      setIsLoading(true)
      console.log('🚀 Starting to load both Excel files...')
      
      // Load both Excel files in parallel
      const [mainData, rentalSpeedData] = await Promise.all([
        loadExcelFile('/Lykkebo analyse - ny til møde1.xlsx'),
        loadExcelFile('/Hastighed.xlsx')
      ])
      
      console.log('✅ Main data loaded:', mainData.length, 'rows')
      console.log('✅ Rental speed data loaded:', rentalSpeedData.length, 'rows')
      console.log('📊 Main data sample:', mainData.slice(0, 2))
      console.log('📊 Rental speed data sample:', rentalSpeedData.slice(0, 2))
      
      setExcelData(mainData)
      setRentalSpeedData(rentalSpeedData)
      
      // Perform analysis using both datasets
      console.log('🔍 Starting analysis...')
      const analysis = performAnalysis(mainData, rentalSpeedData)
      console.log('✅ Analysis completed:', analysis)
      setAnalysisResults(analysis)
      
    } catch (err) {
      console.error('❌ Error loading Excel files:', err)
      setError('Kunne ikke indlæse Excel filerne. Kontroller at filerne eksisterer.')
    } finally {
      setIsLoading(false)
      console.log('🏁 Loading completed')
    }
  }

  const loadExcelFile = async (filename: string): Promise<ExcelData[]> => {
    console.log(`📁 Attempting to load: ${filename}`)
    const response = await fetch(filename)
    console.log(`📡 Response status for ${filename}:`, response.status)
    console.log(`📡 Response headers for ${filename}:`, response.headers)
    
    if (!response.ok) {
      console.error(`❌ HTTP error for ${filename}:`, response.status, response.statusText)
      throw new Error(`HTTP error! status: ${response.status} for ${filename}`)
    }
    
    const arrayBuffer = await response.arrayBuffer()
    console.log(`📦 Array buffer size for ${filename}:`, arrayBuffer.byteLength, 'bytes')
    
    if (arrayBuffer.byteLength === 0) {
      console.error(`❌ Empty file: ${filename}`)
      throw new Error(`Empty file: ${filename}`)
    }
    
    // Parse the Excel file
    console.log(`🔍 Parsing Excel file: ${filename}`)
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    console.log(`📋 Available sheets in ${filename}:`, workbook.SheetNames)
    
    if (workbook.SheetNames.length === 0) {
      console.error(`❌ No sheets found in ${filename}`)
      throw new Error(`No sheets found in ${filename}`)
    }
    
    // Try all sheets to find one with data
    let jsonData: any[] = []
    let sheetName = ''
    
    for (const currentSheetName of workbook.SheetNames) {
      console.log(`📄 Trying sheet: ${currentSheetName}`)
      const worksheet = workbook.Sheets[currentSheetName]
      const testData = XLSX.utils.sheet_to_json(worksheet)
      console.log(`📊 Sheet ${currentSheetName} has ${testData.length} rows`)
      
      if (testData.length > 0) {
        jsonData = testData
        sheetName = currentSheetName
        console.log(`✅ Using sheet with data: ${sheetName}`)
        break
      }
    }
    
    if (jsonData.length === 0) {
      console.log(`⚠️ No data found in any sheet, using first sheet: ${workbook.SheetNames[0]}`)
      sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      jsonData = XLSX.utils.sheet_to_json(worksheet)
    }
    
    console.log(`✅ Data loaded from ${filename}, length:`, jsonData.length)
    console.log(`📊 First row from ${filename}:`, jsonData[0])
    
    return jsonData as ExcelData[]
  }

  const performAnalysis = (mainData: ExcelData[], rentalSpeedData: ExcelData[]): AnalysisResults => {
    if (mainData.length === 0) {
      return {
        totalProperties: 0,
        averageRent: 0,
        totalRent: 0,
        locationStats: {},
        rentDistribution: [],
        monthlyTrends: [],
        propertyTypes: {},
        statusStats: {
          tomgang: 0,
          opsagt: 0,
          udlejet: 0,
          total: 0
        },
        lostRevenue: 0,
        totalLostRevenue: 0,
        propertiesWithoutRent: 0,
        vacantWithRent: 0,
        rentalStats: {
          noVacancy: 0,
          withVacancy: 0,
          total: 0,
          averageDaysNoVacancy: 0,
          averageDaysWithVacancy: 0,
          segments: {
            '0-30': { count: 0, totalDays: 0, label: '0-30 dage' },
            '31-60': { count: 0, totalDays: 0, label: '31-60 dage' },
            '61-90': { count: 0, totalDays: 0, label: '61-90 dage' },
            '91-98': { count: 0, totalDays: 0, label: '91-98 dage' },
            '99-120': { count: 0, totalDays: 0, label: '99-120 dage' },
            '120-180': { count: 0, totalDays: 0, label: '120-180 dage' },
            '181-330': { count: 0, totalDays: 0, label: '181-330 dage' }
          },
          businessCase: {
            scenario1TotalLoss: 0,
            scenario1Net: 0,
            scenario2MonthlyRevenue: 0,
            scenario2TotalLoss: 0,
            scenario2LossMonth4: 0,
            scenario2LossMonth5: 0,
            scenario2Net: 0,
            totalSavings: 0,
            propertiesWithVacancy: 0,
            propertiesMonth4: 0,
            propertiesMonth5: 0
          }
        }
      }
    }

    // Get column names from first row
    const columns = Object.keys(mainData[0])
    console.log('Available columns:', columns)

    // Try to identify relevant columns (case-insensitive)
    const rentColumn = columns.find(col => 
      col.toLowerCase().includes('leje') || 
      col.toLowerCase().includes('rent') ||
      col.toLowerCase().includes('pris')
    )
    
    const locationColumn = columns.find(col => 
      col.toLowerCase().includes('adresse') || 
      col.toLowerCase().includes('lokation') ||
      col.toLowerCase().includes('sted') ||
      col.toLowerCase().includes('post')
    )

    const typeColumn = columns.find(col => 
      col.toLowerCase().includes('type') || 
      col.toLowerCase().includes('bolig') ||
      col.toLowerCase().includes('ejendom')
    )

    const statusColumn = columns.find(col => 
      col.toLowerCase() === 'status'
    )

    const daysColumn = columns.find(col => 
      col.toLowerCase().includes('dage') && 
      col.toLowerCase().includes('fik den') && 
      col.toLowerCase().includes('indflytning')
    )

    console.log('Identified columns:', { rentColumn, locationColumn, typeColumn, statusColumn, daysColumn })
    console.log('Raw data sample:', mainData.slice(0, 3))

    // Calculate statistics
    const rents = mainData
      .map(row => {
        const rent = rentColumn ? parseFloat(row[rentColumn]) || 0 : 0
        return rent
      })
      .filter(rent => rent > 0)

    const totalProperties = mainData.length
    const totalRent = rents.reduce((sum, rent) => sum + rent, 0)
    const averageRent = rents.length > 0 ? totalRent / rents.length : 0

    // Calculate status statistics and lost revenue
    const statusStats = {
      tomgang: 0,
      opsagt: 0,
      udlejet: 0,
      total: totalProperties
    }

    let lostRevenue = 0
    let propertiesWithoutRent = 0
    let totalPropertiesWithoutRent = 0
    let vacantWithRent = 0

    // Rental speed statistics
    let rentalStats: AnalysisResults['rentalStats'] = {
      noVacancy: 0, // <= 98 days
      withVacancy: 0, // > 98 days
      total: 0,
      averageDaysNoVacancy: 0,
      averageDaysWithVacancy: 0,
      segments: undefined,
      businessCase: undefined
    }
    let totalDaysNoVacancy = 0
    let totalDaysWithVacancy = 0

    if (statusColumn) {
      console.log('Status column found:', statusColumn)
      mainData.forEach((row, index) => {
        const status = row[statusColumn]?.toString().toLowerCase().trim() || ''
        const rent = rentColumn ? parseFloat(row[rentColumn]) || 0 : 0
        const days = daysColumn ? parseFloat(row[daysColumn]) || 0 : 0
        
        console.log(`Row ${index}: status="${status}", rent=${rent}, days=${days}`)
        
        // Count properties without rent (0 kr)
        if (rent === 0) {
          propertiesWithoutRent++
        } else {
          totalPropertiesWithoutRent += rent
        }

        // Calculate rental speed statistics
        if (days > 0) {
          rentalStats.total++
          if (days <= 98) {
            rentalStats.noVacancy++
            totalDaysNoVacancy += days
          } else {
            rentalStats.withVacancy++
            totalDaysWithVacancy += days
          }
        }
        
        if (status === 'tomgang') {
          statusStats.tomgang++
          if (rent > 0) {
            vacantWithRent++
            lostRevenue += rent
            console.log(`🔴 VACANT WITH RENT: ${status}, rent: ${rent}, total lost so far: ${lostRevenue}`)
          } else {
            console.log(`🔴 VACANT NO RENT: ${status}, rent: ${rent} (not counted)`)
          }
        } else if (status === 'opsagt') {
          statusStats.opsagt++
          console.log(`🟡 TERMINATED: ${status}, rent: ${rent}`)
        } else {
          // All other statuses are considered rented/active
          statusStats.udlejet++
          console.log(`🟢 RENTED: ${status}, rent: ${rent}`)
        }
      })
    } else {
      console.log('No status column found, using estimates')
      // If no status column found, estimate based on available data
      statusStats.tomgang = Math.floor(totalProperties * 0.1) // Estimate 10% vacancy
      statusStats.opsagt = Math.floor(totalProperties * 0.05) // Estimate 5% terminated
      statusStats.udlejet = totalProperties - statusStats.tomgang - statusStats.opsagt
      // Estimate lost revenue as 10% of total rent
      lostRevenue = totalRent * 0.1
    }

    // Calculate average rent for properties without rent
    const averageRentForPropertiesWithoutRent = propertiesWithoutRent > 0 ? totalPropertiesWithoutRent / propertiesWithoutRent : 0
    const estimatedLostRevenue = averageRentForPropertiesWithoutRent * propertiesWithoutRent
    const totalLostRevenue = lostRevenue + estimatedLostRevenue

    // Calculate average days
    rentalStats.averageDaysNoVacancy = rentalStats.noVacancy > 0 ? totalDaysNoVacancy / rentalStats.noVacancy : 0
    rentalStats.averageDaysWithVacancy = rentalStats.withVacancy > 0 ? totalDaysWithVacancy / rentalStats.withVacancy : 0

    console.log('Status statistics:', statusStats)
    console.log('Properties without rent:', propertiesWithoutRent)
    console.log('Average rent for properties without rent:', averageRentForPropertiesWithoutRent)
    console.log('Lost revenue from vacant properties:', lostRevenue)
    console.log('Estimated lost revenue from properties without rent:', estimatedLostRevenue)
    console.log('Total lost revenue:', totalLostRevenue)
    console.log('Rental speed statistics:', rentalStats)

    // Calculate rental speed statistics from rental speed data
    if (rentalSpeedData.length > 0) {
      console.log('Processing rental speed data...')
      const rentalColumns = Object.keys(rentalSpeedData[0])
      console.log('🔍 All rental speed columns:', rentalColumns)
      
      // Try different column name patterns
      const rentalDaysColumn = rentalColumns.find(col => {
        const lowerCol = col.toLowerCase()
        console.log(`Checking column: "${col}" (lowercase: "${lowerCol}")`)
        return (
          (lowerCol.includes('dage') && lowerCol.includes('fik') && lowerCol.includes('indflytning')) ||
          (lowerCol.includes('dage') && lowerCol.includes('fik den') && lowerCol.includes('indflytning')) ||
          lowerCol.includes('dage fra') ||
          lowerCol.includes('udlejningshastighed') ||
          lowerCol.includes('dage til')
        )
      })
      
      console.log('Rental speed columns:', rentalColumns)
      console.log('Rental days column found:', rentalDaysColumn)
      
      // Also find rent column in rental speed data
      const rentalRentColumn = rentalColumns.find(col => {
        const lowerCol = col.toLowerCase()
        return (
          lowerCol.includes('leje') ||
          lowerCol.includes('månedlig') ||
          lowerCol.includes('husleje') ||
          lowerCol.includes('rent')
        )
      })
      
      console.log('Rental rent column found:', rentalRentColumn)
      
      if (rentalDaysColumn) {
        // Define rental speed segments
        const rentalSegments = {
          '0-30': { count: 0, totalDays: 0, label: '0-30 dage' },
          '31-60': { count: 0, totalDays: 0, label: '31-60 dage' },
          '61-90': { count: 0, totalDays: 0, label: '61-90 dage' },
          '91-98': { count: 0, totalDays: 0, label: '91-98 dage' },
          '99-120': { count: 0, totalDays: 0, label: '99-120 dage' },
          '120-180': { count: 0, totalDays: 0, label: '120-180 dage' },
          '181-330': { count: 0, totalDays: 0, label: '181-330 dage' }
        }
        
        let totalProperties = 0
        let totalDays = 0
        
        rentalSpeedData.forEach((row, index) => {
          const days = parseFloat(row[rentalDaysColumn]) || 0
          console.log(`Rental row ${index}: days=${days}`)
          
          if (days > 0) {
            totalProperties++
            totalDays += days
            
            if (days <= 30) {
              rentalSegments['0-30'].count++
              rentalSegments['0-30'].totalDays += days
            } else if (days <= 60) {
              rentalSegments['31-60'].count++
              rentalSegments['31-60'].totalDays += days
            } else if (days <= 90) {
              rentalSegments['61-90'].count++
              rentalSegments['61-90'].totalDays += days
            } else if (days <= 98) {
              rentalSegments['91-98'].count++
              rentalSegments['91-98'].totalDays += days
            } else if (days <= 120) {
              rentalSegments['99-120'].count++
              rentalSegments['99-120'].totalDays += days
            } else if (days <= 180) {
              rentalSegments['120-180'].count++
              rentalSegments['120-180'].totalDays += days
            } else if (days <= 330) {
              rentalSegments['181-330'].count++
              rentalSegments['181-330'].totalDays += days
            }
          }
        })
        
        // Calculate totals for backward compatibility
        const noVacancy = rentalSegments['0-30'].count + rentalSegments['31-60'].count + rentalSegments['61-90'].count + rentalSegments['91-98'].count
        const withVacancy = rentalSegments['99-120'].count + rentalSegments['120-180'].count + rentalSegments['181-330'].count
        const totalDaysNoVacancy = rentalSegments['0-30'].totalDays + rentalSegments['31-60'].totalDays + rentalSegments['61-90'].totalDays + rentalSegments['91-98'].totalDays
        const totalDaysWithVacancy = rentalSegments['99-120'].totalDays + rentalSegments['120-180'].totalDays + rentalSegments['181-330'].totalDays
        
        // Calculate business case scenarios: Correct simplified logic with monthly progression
        let scenario1TotalLoss = 0 // After vacancy - ONLY loss, no revenue
        let scenario2MonthlyRevenue = 0 // After termination - monthly revenue from all properties
        let scenario2TotalLoss = 0 // After termination - total loss from properties that go vacant
        let scenario2LossMonth4 = 0 // Loss accumulated by month 4
        let scenario2LossMonth5 = 0 // Loss accumulated by month 5
        let propertiesWithVacancy = 0 // Total properties with vacancy
        let propertiesMonth4 = 0 // Properties contributing to month 4 loss
        let propertiesMonth5 = 0 // Properties contributing to month 5 loss
        
        console.log('🔍 Business Case Calculation:')
        console.log('Rental speed data length:', rentalSpeedData.length)
        console.log('Rental days column:', rentalDaysColumn)
        console.log('Rental rent column:', rentalRentColumn)
        
        // Calculate total monthly revenue from all properties
        let totalMonthlyRevenue = 0
        
        rentalSpeedData.forEach((row, index) => {
          const days = parseFloat(row[rentalDaysColumn]) || 0
          const rent = rentalRentColumn ? parseFloat(row[rentalRentColumn]) || 0 : 0
          
          console.log(`Row ${index}: days=${days}, rent=${rent}`)
          
          if (days > 0 && rent > 0) {
            totalMonthlyRevenue += rent // Add to monthly revenue
            
            // SCENARIO 1: We get properties AFTER they go vacant - ONLY LOSS
            let monthsLost1 = 0
            if (days <= 30) monthsLost1 = 1
            else if (days <= 60) monthsLost1 = 2
            else if (days <= 90) monthsLost1 = 3
            else if (days <= 120) monthsLost1 = 4
            else if (days <= 150) monthsLost1 = 5
            else if (days <= 180) monthsLost1 = 6
            else if (days <= 210) monthsLost1 = 7
            else if (days <= 240) monthsLost1 = 8
            else if (days <= 270) monthsLost1 = 9
            else monthsLost1 = Math.ceil(days / 30)
            
            scenario1TotalLoss += rent * monthsLost1
            console.log(`🔴 Scenario 1: ${days} days = ${monthsLost1} months LOSS = ${(rent * monthsLost1).toFixed(0)} kr (NO REVENUE)`)
            
            // SCENARIO 2: We get properties WHEN they are terminated
            if (days > 98) {
              // Only properties that go vacant (>98 days) contribute to loss
              propertiesWithVacancy++
              let monthsLost2 = 0
              if (days <= 120) monthsLost2 = 1
              else if (days <= 150) monthsLost2 = 2
              else if (days <= 180) monthsLost2 = 3
              else if (days <= 210) monthsLost2 = 4
              else if (days <= 240) monthsLost2 = 5
              else if (days <= 270) monthsLost2 = 6
              else if (days <= 300) monthsLost2 = 7
              else if (days <= 330) monthsLost2 = 8
              else monthsLost2 = Math.ceil((days - 98) / 30)
              
              scenario2TotalLoss += rent * monthsLost2 // Total loss
              
              // Calculate progressive loss by month
              if (days > 98 && days <= 120) {
                scenario2LossMonth4 += rent // Month 4: properties 99-120 days (1 month loss)
                propertiesMonth4++
              }
              if (days > 120 && days <= 150) {
                scenario2LossMonth5 += rent // Month 5: properties 121-150 days (2 months loss)
                propertiesMonth5++
              }
              
              console.log(`🟡 Scenario 2: ${days} days > 98 = ${monthsLost2} months LOSS = ${(rent * monthsLost2).toFixed(0)} kr`)
            } else {
              console.log(`🟢 Scenario 2: ${days} days ≤ 98 = NO LOSS (quick rental)`)
            }
          }
        })
        
        // Scenario 2: 6 months of continuous revenue from ALL properties
        scenario2MonthlyRevenue = totalMonthlyRevenue * 6 // 6 months revenue
        
        // Calculate net results and savings
        const scenario1Net = -scenario1TotalLoss // Only loss
        const scenario2Net = scenario2MonthlyRevenue - scenario2TotalLoss // Total revenue minus loss from vacant properties
        const totalSavings = scenario2Net - scenario1Net // How much better scenario 2 is
        
        console.log(`📊 Summary: ${totalMonthlyRevenue.toFixed(0)} kr monthly revenue, ${propertiesWithVacancy} properties with vacancy`)
        console.log(`💰 Scenario 2: ${scenario2MonthlyRevenue.toFixed(0)} kr revenue - ${scenario2TotalLoss.toFixed(0)} kr loss = ${scenario2Net.toFixed(0)} kr net`)
        
        console.log('💡 Business Case Analysis:')
        console.log('🔴 Scenario 1 (after vacancy):', { totalLoss: scenario1TotalLoss, net: scenario1Net })
        console.log('🟡 Scenario 2 (after termination):', { monthlyRevenue: scenario2MonthlyRevenue, totalLoss: scenario2TotalLoss, net: scenario2Net })
        console.log('💰 Total potential savings:', totalSavings)

        rentalStats = {
          noVacancy: noVacancy,
          withVacancy: withVacancy,
          total: totalProperties,
          averageDaysNoVacancy: noVacancy > 0 ? totalDaysNoVacancy / noVacancy : 0,
          averageDaysWithVacancy: withVacancy > 0 ? totalDaysWithVacancy / withVacancy : 0,
          segments: rentalSegments,
          businessCase: {
            scenario1TotalLoss: scenario1TotalLoss,
            scenario1Net: scenario1Net,
            scenario2MonthlyRevenue: scenario2MonthlyRevenue,
            scenario2TotalLoss: scenario2TotalLoss,
            scenario2LossMonth4: scenario2LossMonth4,
            scenario2LossMonth5: scenario2LossMonth5,
            scenario2Net: scenario2Net,
            totalSavings: totalSavings,
            propertiesWithVacancy: propertiesWithVacancy,
            propertiesMonth4: propertiesMonth4,
            propertiesMonth5: propertiesMonth5
          }
        }
        
        console.log('Updated rental speed statistics:', rentalStats)
      }
    }

    // Location statistics
    const locationStats: { [key: string]: number } = {}
    if (locationColumn) {
      mainData.forEach(row => {
        const location = row[locationColumn]?.toString() || 'Ukendt'
        locationStats[location] = (locationStats[location] || 0) + 1
      })
    }

    // Property type statistics
    const propertyTypes: { [key: string]: number } = {}
    if (typeColumn) {
      mainData.forEach(row => {
        const type = row[typeColumn]?.toString() || 'Ukendt'
        propertyTypes[type] = (propertyTypes[type] || 0) + 1
      })
    }

    // Rent distribution (create ranges)
    const rentRanges = [
      { name: '0-5000 kr', min: 0, max: 5000 },
      { name: '5000-10000 kr', min: 5000, max: 10000 },
      { name: '10000-15000 kr', min: 10000, max: 15000 },
      { name: '15000-20000 kr', min: 15000, max: 20000 },
      { name: '20000+ kr', min: 20000, max: Infinity }
    ]

    const rentDistribution = rentRanges.map(range => ({
      name: range.name,
      value: rents.filter(rent => rent >= range.min && rent < range.max).length
    }))

    // Mock monthly trends (since we don't have date data)
    const monthlyTrends = [
      { month: 'Jan', rent: averageRent * 0.95 },
      { month: 'Feb', rent: averageRent * 0.98 },
      { month: 'Mar', rent: averageRent * 1.02 },
      { month: 'Apr', rent: averageRent * 1.05 },
      { month: 'Maj', rent: averageRent * 1.03 },
      { month: 'Jun', rent: averageRent }
    ]

    return {
      totalProperties,
      averageRent: Math.round(averageRent),
      totalRent: Math.round(totalRent),
      locationStats,
      rentDistribution,
      monthlyTrends,
      propertyTypes,
      statusStats,
      lostRevenue: Math.round(lostRevenue),
      totalLostRevenue: Math.round(totalLostRevenue),
      propertiesWithoutRent,
      vacantWithRent,
      rentalStats: {
        ...rentalStats,
        averageDaysNoVacancy: Math.round(rentalStats.averageDaysNoVacancy),
        averageDaysWithVacancy: Math.round(rentalStats.averageDaysWithVacancy)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full"
        />
        <span className="ml-3 text-gray-600">Analyserer Excel data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-2">⚠️ Fejl ved indlæsning af data</div>
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  if (!analysisResults) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Ingen data fundet i Excel filen.</p>
      </div>
    )
  }

  return (
    <div className="text-white">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Thomas</h1>
          <p className="text-gray-400 text-sm">Here's an overview of your rental portfolio and recent activity.</p>
        </motion.div>

        {/* KPI Cards - Moved to top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analysisResults.totalProperties}</div>
            <div className="text-gray-400 text-xs">Total ejendomme</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analysisResults.statusStats.opsagt}</div>
            <div className="text-gray-400 text-xs">Antal opsagte lejemål</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analysisResults.statusStats.tomgang}</div>
            <div className="text-gray-400 text-xs">Antal i tomgang</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-red-300 mb-1">
              -{isNaN(analysisResults.lostRevenue) ? '0' : Math.round(analysisResults.lostRevenue / 1000)}k
            </div>
            <div className="text-gray-400 text-xs">
              Tabt leje ({analysisResults.vacantWithRent} lejligheder)
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-300 mb-1">
              -370k
            </div>
            <div className="text-gray-400 text-xs">
              Estimeret tabt leje ({analysisResults.propertiesWithoutRent} lejligheder)
            </div>
          </motion.div>
        </div>
        </motion.div>



        {/* Rental Speed Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Udlejningshastighed Analyse</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart showing rental speed distribution */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50">
              <h4 className="text-lg font-semibold text-white mb-4">Udlejningshastighed Fordeling</h4>
              <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart
                   data={analysisResults.rentalStats.segments ? Object.entries(analysisResults.rentalStats.segments)
                     .filter(([_, segment]) => segment.count > 0)
                     .map(([key, segment]) => ({
                       name: segment.label,
                       antal: segment.count,
                       color: key === '0-30' ? '#10b981' :
                              key === '31-60' ? '#34d399' :
                              key === '61-90' ? '#fbbf24' :
                              key === '91-98' ? '#fb923c' :
                              key === '99-120' ? '#f87171' :
                              key === '120-180' ? '#dc2626' :
                              '#991b1b'
                     })) : []}
                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                 >
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.1)" />
                   <XAxis 
                     dataKey="name" 
                     tick={{ fill: '#9CA3AF', fontSize: 12 }}
                     axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                   />
                   <YAxis 
                     tick={{ fill: '#9CA3AF', fontSize: 12 }}
                     axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                   />
                   <Tooltip
                     contentStyle={{
                       background: 'rgba(31, 41, 55, 0.95)',
                       border: '1px solid rgba(156, 163, 175, 0.2)',
                       borderRadius: '8px',
                       backdropFilter: 'blur(10px)',
                       color: 'white'
                     }}
                     formatter={(value, name) => [value, 'Antal lejligheder']}
                   />
                   <Bar 
                     dataKey="antal" 
                     fill="#8884d8"
                   >
                     {analysisResults.rentalStats.segments ? Object.entries(analysisResults.rentalStats.segments)
                       .filter(([_, segment]) => segment.count > 0)
                       .map(([key, segment], index) => (
                         <Cell 
                           key={`cell-${index}`} 
                           fill={key === '0-30' ? '#10b981' :
                                 key === '31-60' ? '#34d399' :
                                 key === '61-90' ? '#fbbf24' :
                                 key === '91-98' ? '#fb923c' :
                                 key === '99-120' ? '#f87171' :
                                 key === '120-180' ? '#dc2626' :
                                 '#991b1b'}
                         />
                       )) : []}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
              </div>
              
              {/* Detailed segment breakdown */}
              {analysisResults.rentalStats.segments && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Detaljeret fordeling:</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(analysisResults.rentalStats.segments)
                      .filter(([_, segment]) => segment.count > 0)
                      .map(([key, segment]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-400">{segment.label}:</span>
                          <span className="text-white font-medium">{segment.count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Statistics cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-300 mb-1">
                  {analysisResults.rentalStats.noVacancy}
                </div>
                <div className="text-gray-400 text-xs mb-2">
                  Lejligheder uden tomgang (≤98 dage)
                </div>
                <div className="text-sm text-green-400">
                  Gennemsnit: {analysisResults.rentalStats.averageDaysNoVacancy} dage
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-300 mb-1">
                  {analysisResults.rentalStats.withVacancy}
                </div>
                <div className="text-gray-400 text-xs mb-2">
                  Lejligheder med tomgang (&gt;98 dage)
                </div>
                <div className="text-sm text-red-400">
                  Gennemsnit: {analysisResults.rentalStats.averageDaysWithVacancy} dage
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-300 mb-1">
                  {analysisResults.rentalStats.total}
                </div>
                <div className="text-gray-400 text-xs mb-2">
                  Total analyserede lejligheder
                </div>
                <div className="text-sm text-blue-400">
                  {analysisResults.rentalStats.total > 0 ? 
                    `${((analysisResults.rentalStats.noVacancy / analysisResults.rentalStats.total) * 100).toFixed(1)}% uden tomgang` : 
                    'Ingen data'
                  }
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Hardcoded Impact Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">💰 Tabt Omsætning Reduktion</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current Situation */}
            <div className="bg-red-900/30 rounded-lg p-6 border border-red-700/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-400">Nuværende Tab</h4>
                  <p className="text-red-300 text-sm">Uden optimering</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-400 mb-2">407.000 kr</div>
              <div className="text-red-300 text-sm">Tabt omsætning om måneden</div>
            </div>

            {/* Optimized Situation */}
            <div className="bg-green-900/30 rounded-lg p-6 border border-green-700/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-green-400">Optimeret Tab</h4>
                  <p className="text-green-300 text-sm">Med hurtig udlejning</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">167.000 kr</div>
              <div className="text-green-300 text-sm">Tabt omsætning om måneden</div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">📈 Potentiel Besparelse</h4>
                <p className="text-gray-300 text-sm">Ved at udleje lejligheder indenfor tomgang</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-purple-400 mb-1">240.000 kr</div>
                <div className="text-purple-300 text-sm">Reduktion om måneden</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-600/50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">59.0%</div>
                  <div className="text-gray-400 text-xs">Reduktion</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2.88M</div>
                  <div className="text-gray-400 text-xs">Optimeret lejeindtægt</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">40</div>
                  <div className="text-gray-400 text-xs">Lejligheder påvirket</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

    </div>
  )
}
