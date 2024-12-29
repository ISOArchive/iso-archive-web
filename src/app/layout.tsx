import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'ISO Archive',
  description: 'A collection of ISOs for various operating systems'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <div className='container mx-auto px-4'>
          <NavBar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
