import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kunder - Udlejningsselskab',
  description: 'Fremviser, effektiviserer og optimerer lejemål for investorer',
  keywords: 'udlejning, lejemål, investering, ejendom, optimering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
